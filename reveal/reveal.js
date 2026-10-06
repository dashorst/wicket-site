/* Apache Wicket homepage sketch: Reveal.
   1. Copy button for the Maven dependency.
   2. The scroll reveal: on wide screens with motion allowed, the steps' code and tree move into one
      sticky stage that follows the step in the middle of the viewport. Everywhere else the page keeps
      its static layout, where every step shows its own tree and code. */
(function () {
  'use strict';
  var root = document.documentElement;

  /* ------------------------------------------------- install: line, tool, copy */
  (function () {
    var box = document.querySelector('.cmd');
    var dataEl = document.getElementById('install-data');
    if (!box || !dataEl) return;
    var data = JSON.parse(dataEl.textContent);
    var show = document.getElementById('cmd-show');
    var tool = document.getElementById('cmd-tool');
    var copy = box.querySelector('.cmd-copy');
    var status = box.querySelector('.cmd-status');
    var radios = box.querySelectorAll('[data-line]');
    var modes = box.querySelectorAll('[data-mode]');
    var line = 'current', mode = 'dependency', timer;

    function fill(template) {
      var v = data.lines[line].version, p = v.split('.');
      return template.replace(/\{groupId\}/g, data.defaults.groupId)
        .replace(/\{artifactId\}/g, data.defaults.artifactId)
        .replace(/\{version\}/g, v).replace(/\{major\}/g, p[0])
        .replace(/\{minor\}/g, p[1]).replace(/\{patch\}/g, p[2]).replace(/\{guide\}/g, data.guide);
    }
    function render() {
      var t = data[mode][tool.value];
      show.textContent = fill(t.show);
      box.classList.toggle('is-project', mode === 'project');
      modes.forEach(function (m) { m.setAttribute('aria-checked', String(m.getAttribute('data-mode') === mode)); });
      show.title = fill(t.copy);
      radios.forEach(function (r) { r.setAttribute('aria-checked', String(r.getAttribute('data-line') === line)); });
    }
    function say(msg) {
      status.textContent = msg;
      clearTimeout(timer);
      timer = setTimeout(function () { status.textContent = ''; }, 2600);
    }
    radios.forEach(function (r) {
      r.addEventListener('click', function () { line = r.getAttribute('data-line'); render(); });
      r.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        var next = radios[(Array.prototype.indexOf.call(radios, r) + 1) % radios.length];
        line = next.getAttribute('data-line'); render(); next.focus(); e.preventDefault();
      });
    });
    tool.addEventListener('change', render);
    modes.forEach(function (m) {
      m.addEventListener('click', function () { mode = m.getAttribute('data-mode'); render(); });
      m.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        var next = modes[(Array.prototype.indexOf.call(modes, m) + 1) % modes.length];
        mode = next.getAttribute('data-mode'); render(); next.focus(); e.preventDefault();
      });
    });
    copy.addEventListener('click', function () {
      var t = data[mode][tool.value], text = fill(t.copy);
      var done = 'The ' + t.what + ' for ' + data.lines[line].version + ' is on your clipboard.';
      var fallback = function () {
        var ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', '');
        ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        ta.remove();
        say(ok ? done : 'Your browser blocked the clipboard. The dependency is on the download page.');
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { say(done); }, fallback);
      } else {
        fallback();
      }
    });
    box.querySelector('.cmd-controls').hidden = false;
    copy.hidden = false;
    render();
  })();

  /* ---------------------------------------------------------------- reveal */
  var section = document.querySelector('.reveal');
  if (!section || !('IntersectionObserver' in window)) return;

  var stage = section.querySelector('.stage');
  var steps = Array.prototype.slice.call(section.querySelectorAll('.step'));
  var code = stage.querySelector('.stage-code');
  var caption = stage.querySelector('.stage-caption');
  var counter = stage.querySelector('.stage-n');
  var nodes = Array.prototype.slice.call(stage.querySelectorAll('li.n'));
  var lists = Array.prototype.slice.call(stage.querySelectorAll('ul'));

  // One pane per step, cloned from the step's own code. The stage is aria-hidden: screen readers
  // read the code in the steps, which stays in the document.
  var panes = steps.map(function (step) {
    var pane = document.createElement('div');
    pane.className = 'pane';
    var files = step.querySelector('.files').cloneNode(true);
    files.querySelectorAll('[tabindex]').forEach(function (el) { el.removeAttribute('tabindex'); });
    files.querySelectorAll('.ln.new').forEach(function (ln, i) { ln.style.setProperty('--i', i); });
    pane.appendChild(files);
    code.appendChild(pane);
    return pane;
  });

  var current = 0;
  function show(n) {
    if (n === current) return;
    current = n;
    steps.forEach(function (s, i) { s.classList.toggle('is-active', i + 1 === n); });
    panes.forEach(function (p, i) { p.classList.toggle('is-active', i + 1 === n); });
    nodes.forEach(function (li) {
      var from = +li.dataset.from, until = +li.dataset.until;
      var hl = li.dataset.hl ? li.dataset.hl.split(' ').map(Number) : [];
      li.classList.toggle('is-shown', from <= n && n <= until);
      li.classList.toggle('on', from === n || hl.indexOf(n) !== -1);
    });
    // The connector below the last visible child of each branch stops at that child.
    lists.forEach(function (ul) {
      var kids = Array.prototype.filter.call(ul.children, function (li) { return li.classList.contains('is-shown'); });
      Array.prototype.forEach.call(ul.children, function (li) { li.classList.toggle('last', li === kids[kids.length - 1]); });
    });
    caption.innerHTML = steps[n - 1].querySelector('.step-fig').getAttribute('data-caption');
    counter.textContent = (n < 10 ? '0' : '') + n;
  }

  var mq = window.matchMedia('(min-width: 1000px) and (prefers-reduced-motion: no-preference)');
  var io = null;
  function mode() {
    var on = mq.matches;
    root.classList.toggle('is-reveal', on);
    if (on && !io) {
      current = 0;
      show(1);
      // The step whose box crosses the band just above the middle of the viewport is the active one.
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) show(+e.target.dataset.step); });
      }, { rootMargin: '-44% 0px -55% 0px' });
      steps.forEach(function (s) { io.observe(s); });
    } else if (!on && io) {
      io.disconnect();
      io = null;
      steps.forEach(function (s) { s.classList.remove('is-active'); });
    }
  }
  mode();
  if (mq.addEventListener) mq.addEventListener('change', mode); else mq.addListener(mode);
})();
