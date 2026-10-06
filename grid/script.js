(() => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- menu on narrow screens ---------- */
  const toggle = document.querySelector('.menu-toggle');
  const list = document.getElementById('nav-list');
  const narrow = matchMedia('(max-width: 1099px)');
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    if (open) delete list.dataset.collapsed; else list.dataset.collapsed = '';
  };
  const syncMenu = () => {
    toggle.hidden = !narrow.matches;
    if (narrow.matches) setOpen(false); else { delete list.dataset.collapsed; toggle.setAttribute('aria-expanded', 'false'); }
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && narrow.matches && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
  });
  narrow.addEventListener('change', syncMenu);
  syncMenu();

  /* ---------- copy the Maven dependency ---------- */
  document.querySelectorAll('.copy').forEach((btn) => {
    const status = btn.parentElement.querySelector('.copy-status');
    const label = btn.textContent;
    let timer;
    btn.addEventListener('click', async () => {
      const code = document.getElementById(btn.dataset.copy);
      clearTimeout(timer);
      try {
        if (!navigator.clipboard) throw new Error('no clipboard');
        await navigator.clipboard.writeText(code.textContent);
        btn.textContent = 'Copied';
        status.textContent = 'The dependency is on your clipboard.';
      } catch (e) {
        const range = document.createRange();
        range.selectNodeContents(code);
        const sel = getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        status.textContent = 'Copying was blocked. The snippet is selected: press Ctrl+C or Cmd+C.';
      }
      timer = setTimeout(() => { btn.textContent = label; status.textContent = ''; }, 4000);
    });
  });

  /* ---------- wires: wicket:id bindings and pinned annotations ---------- */
  const svg = document.querySelector('.wires');
  const NS = 'http://www.w3.org/2000/svg';
  const HINT = 'Point at a component in the Java code.';
  let active = null;

  const box = (el) => {
    const r = el.getBoundingClientRect();
    return { l: r.left + scrollX, r: r.right + scrollX, t: r.top + scrollY, b: r.bottom + scrollY };
  };
  const addPath = (d, cls) => {
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('d', d);
    p.setAttribute('class', cls);
    svg.appendChild(p);
    return p;
  };
  const addEnd = (x, y) => {
    const r = document.createElementNS(NS, 'rect');
    r.setAttribute('x', x - 3); r.setAttribute('y', y - 3);
    r.setAttribute('width', 6); r.setAttribute('height', 6);
    r.setAttribute('class', 'bind-end');
    svg.appendChild(r);
    return r;
  };
  const sizeSvg = () => {
    svg.setAttribute('width', 0); svg.setAttribute('height', 0);
    const w = document.documentElement.scrollWidth;
    const h = document.documentElement.scrollHeight;
    svg.setAttribute('width', w); svg.setAttribute('height', h);
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  };

  // An annotation sits on the line it explains: its top rule continues as a
  // rule under the code it points at. When the fields stack, the rule stays
  // on the annotation alone.
  const drawPins = () => {
    svg.querySelectorAll('.pin-wire').forEach((p) => p.remove());
    document.querySelectorAll('.pin').forEach((pin) => {
      const target = document.getElementById(pin.dataset.pin);
      const field = pin.closest('.f');
      pin.style.marginTop = '0px';
      const T = box(target);
      const F = box(field);
      if (F.l < T.r) return;
      const y = Math.round(T.b + 3);
      const pad = parseFloat(getComputedStyle(field).paddingTop);
      pin.style.marginTop = Math.max(0, y - 1 - F.t - pad) + 'px';
      addPath(`M${Math.round(T.l)} ${y}H${Math.round(box(pin).l)}`, 'pin-wire');
    });
  };

  const fileOf = (tok) => {
    const fig = tok.closest('figure');
    return fig ? fig.querySelector('figcaption').textContent : '';
  };

  const drawBinding = (animate) => {
    svg.querySelectorAll('.bind-wire, .bind-end').forEach((p) => p.remove());
    if (!active) return;
    const { wid, sample } = active;
    const html = sample.querySelectorAll(`.wid[data-side="html"][data-wid="${wid}"]`);
    const java = sample.querySelectorAll(`.wid[data-side="java"][data-wid="${wid}"]`);
    html.forEach((a) => java.forEach((b) => {
      const A = box(a), B = box(b);
      const FA = box(a.closest('.code')), FB = box(b.closest('.code'));
      const ya = Math.round(A.b + 3), yb = Math.round(B.b + 3);
      let d, ex;
      if (FB.l >= FA.r - 1) {
        // side by side: under the markup token, across the rule between the fields, under the Java token
        const gx = Math.round((FA.r + FB.l) / 2);
        d = `M${Math.round(A.l)} ${ya}H${gx}V${yb}H${Math.round(B.r)}`;
        ex = Math.round(B.r);
      } else {
        // stacked: down the left margin of the fields
        const gx = Math.round(Math.min(FA.l, FB.l) + 8);
        d = `M${Math.round(A.r)} ${ya}H${gx}V${yb}H${Math.round(B.r)}`;
        ex = Math.round(B.r);
      }
      const p = addPath(d, 'bind-wire');
      const end = addEnd(ex, yb);
      if (animate && !reduceMotion.matches && p.animate) {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: 480, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'both' });
        end.animate([{ opacity: 0 }, { opacity: 0, offset: 0.7 }, { opacity: 1 }], { duration: 480, fill: 'both' });
      }
    }));
  };

  const describe = (sample, wid) => {
    const j = sample.querySelector(`.wid[data-side="java"][data-wid="${wid}"]`);
    const h = sample.querySelector(`.wid[data-side="html"][data-wid="${wid}"]`);
    if (!j || !h) return HINT;
    return `<code>wicket:id="${wid}"</code>: <strong>new ${j.dataset.kind}("${wid}")</strong> in ${fileOf(j)} renders the <code>&lt;${h.dataset.tag}&gt;</code> in ${fileOf(h)}.`;
  };

  const activate = (wid, sample, animate) => {
    if (active && active.wid === wid && active.sample === sample) return;
    document.querySelectorAll('.wid.is-on').forEach((e) => e.classList.remove('is-on'));
    document.querySelectorAll(`.wid[data-wid="${wid}"]`).forEach((e) => e.classList.add('is-on'));
    document.querySelectorAll('.sample .binding').forEach((b) => {
      const s = b.closest('.sample');
      b.innerHTML = s === sample ? describe(sample, wid) : HINT;
    });
    active = { wid, sample };
    drawBinding(animate);
  };

  document.querySelectorAll('.sample .wid').forEach((tok) => {
    const sample = tok.closest('.sample');
    const on = () => activate(tok.dataset.wid, sample, true);
    tok.addEventListener('mouseenter', on);
    tok.addEventListener('focus', on);
  });

  const redraw = () => { sizeSvg(); drawPins(); drawBinding(false); sizeSvg(); };
  let raf;
  addEventListener('resize', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(redraw); });

  const first = document.querySelector('.sample[data-sample="hello"]');
  activate('message', first, false);
  redraw();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(redraw);
  addEventListener('load', redraw);
})();
