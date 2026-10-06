/* Apache Wicket site behaviour.
   1. Homepage install box: what to copy, release line, build tool, copy.
   2. Homepage reveal: on wide screens with motion allowed, the steps' code and tree move into one
      sticky stage that follows the step in the middle of the viewport. Everywhere else the page keeps
      its static layout, where every step shows its own tree and code.
   3. Copy buttons: <button data-copy="#id"> copies the text of the target, or its value for a field.
   4. Reading rail: marks the section in view. */

/* ---------------------------------------------------------------- 1. install box */
(function () {
    'use strict';
    var box = document.querySelector('.cmd');
    var dataEl = document.getElementById('install-data');
    if (!box || !dataEl) return;
    var data = JSON.parse(dataEl.textContent);
    var show = document.getElementById('cmd-show');
    var tool = document.getElementById('cmd-tool');
    var copy = box.querySelector('.cmd-copy');
    var status = box.querySelector('.cmd-status');
    var hint = document.getElementById('cmd-hint');
    var radios = Array.prototype.slice.call(box.querySelectorAll('[data-line]'));
    var modes = Array.prototype.slice.call(box.querySelectorAll('[data-mode]'));
    var line = 'current', mode = 'dependency', timer;

    function fill(template) {
      var v = data.lines[line].version, p = v.split('.');
      return template.replace(/\{groupId\}/g, data.defaults.groupId)
        .replace(/\{artifactId\}/g, data.defaults.artifactId)
        .replace(/\{version\}/g, v).replace(/\{major\}/g, p[0])
        .replace(/\{minor\}/g, p[1]).replace(/\{patch\}/g, p[2]).replace(/\{guide\}/g, data.guide);
    }
    // A radio group: only the checked button is a tab stop, the arrow keys move the choice.
    function check(group, attr, value) {
      group.forEach(function (b) {
        var on = b.getAttribute(attr) === value;
        b.setAttribute('aria-checked', String(on));
        b.tabIndex = on ? 0 : -1;
      });
    }
    function render() {
      var t = data[mode][tool.value];
      show.textContent = fill(t.show);
      show.title = fill(t.copy);
      hint.textContent = fill(t.hint);
      box.classList.toggle('is-project', mode === 'project');
      box.classList.toggle('is-prose', !!t.prose);
      box.classList.remove('is-by-hand');
      check(modes, 'data-mode', mode);
      check(radios, 'data-line', line);
      say('');
    }
    // The status replaces the hint under the box while it shows.
    function say(msg) {
      status.textContent = msg;
      box.classList.toggle('has-status', msg !== '');
      clearTimeout(timer);
      if (msg) timer = setTimeout(function () { say(''); }, 3200);
    }
    function arrows(group, attr, set) {
      group.forEach(function (b, i) {
        b.addEventListener('click', function () { set(b.getAttribute(attr)); render(); });
        b.addEventListener('keydown', function (e) {
          var step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
          if (!step) return;
          var next = group[(i + step + group.length) % group.length];
          set(next.getAttribute(attr)); render(); next.focus(); e.preventDefault();
        });
      });
    }
    arrows(radios, 'data-line', function (v) { line = v; });
    arrows(modes, 'data-mode', function (v) { mode = v; });
    tool.addEventListener('change', render);
    copy.addEventListener('click', function () {
      var t = data[mode][tool.value], text = fill(t.copy);
      var done = 'The ' + t.what + ' for ' + data.lines[line].version + ' is on your clipboard.';
      // Without the clipboard: show exactly what would have been copied, selected, to copy by hand.
      var byHand = function () {
        show.textContent = text;
        box.classList.add('is-by-hand');
        var range = document.createRange();
        range.selectNodeContents(show);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        say('Your browser blocked the clipboard. The text is selected: copy it by hand.');
      };
      var fallback = function () {
        var ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', '');
        ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        ta.remove();
        if (ok) say(done); else byHand();
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

/* ---------------------------------------------------------------- 2. reveal */
(function () {
  'use strict';
  var root = document.documentElement;
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
    // The step figures are visually hidden while the stage shows their code: no tab stops in them.
    section.querySelectorAll('.step-fig pre.code').forEach(function (pre) { pre.tabIndex = on ? -1 : 0; });
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

/* ---------------------------------------------------------------- 3. copy buttons */
(function () {
  'use strict';
  if (!navigator.clipboard) return;
  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (button) {
    button.hidden = false;
    var label = button.textContent;
    // Announces the outcome to screen readers; the button text alone changes silently.
    var status = document.createElement('span');
    status.className = 'visually-hidden';
    status.setAttribute('role', 'status');
    button.parentNode.appendChild(status);
    button.addEventListener('click', function () {
      var target = document.querySelector(button.getAttribute('data-copy'));
      if (!target) return;
      var text = 'value' in target ? target.value : target.textContent;
      navigator.clipboard.writeText(text.trim()).then(function () {
        button.textContent = 'Copied';
        button.classList.add('is-copied');
        status.textContent = 'Copied to the clipboard';
        setTimeout(function () {
          button.textContent = label;
          button.classList.remove('is-copied');
          status.textContent = '';
        }, 1800);
      }, function () {
        // Select the text so the visitor can copy it by hand.
        if ('select' in target) {
          target.select();
        } else {
          var range = document.createRange();
          range.selectNodeContents(target);
          var selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
        }
        button.textContent = 'Selected, copy by hand';
        status.textContent = 'Copying failed. The text is selected; copy it by hand.';
      });
    });
  });
})();

/* ---------------------------------------------------------------- 4. reading rail */
(function () {
  'use strict';
  var links = document.querySelectorAll('.rail a[href^="#"]');
  if (!links.length || !('IntersectionObserver' in window)) return;
  var byId = {};
  Array.prototype.forEach.call(links, function (a) {
    byId[decodeURIComponent(a.getAttribute('href').slice(1))] = a;
  });
  var headings = Object.keys(byId).map(function (id) { return document.getElementById(id); }).filter(Boolean);
  var current = null;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      if (current) current.classList.remove('is-current');
      current = byId[entry.target.id];
      if (current) current.classList.add('is-current');
    });
  }, { rootMargin: '0px 0px -70% 0px' });
  headings.forEach(function (h) { observer.observe(h); });
})();
