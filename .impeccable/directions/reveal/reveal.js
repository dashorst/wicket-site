/* Apache Wicket homepage sketch: Reveal.
   1. Copy button for the Maven dependency.
   2. The scroll reveal: on wide screens with motion allowed, the steps' code and tree move into one
      sticky stage that follows the step in the middle of the viewport. Everywhere else the page keeps
      its static layout, where every step shows its own tree and code. */
(function () {
  'use strict';
  var root = document.documentElement;

  /* ---------------------------------------------------------------- copy */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    var src = document.getElementById(btn.getAttribute('data-copy'));
    var status = btn.parentElement.querySelector('.cmd-status');
    var timer;
    function say(msg) {
      status.textContent = msg;
      clearTimeout(timer);
      timer = setTimeout(function () { status.textContent = ''; }, 2600);
    }
    btn.addEventListener('click', function () {
      var text = src.textContent;
      var fallback = function () {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        ta.remove();
        say(ok ? 'The <dependency> element for 11.0.0 is on your clipboard.'
               : 'Your browser blocked the clipboard. The dependency is on the download page.');
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () {
          say('The <dependency> element for 11.0.0 is on your clipboard.');
        }, fallback);
      } else {
        fallback();
      }
    });
  });

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
