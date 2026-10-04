document.documentElement.classList.replace('no-js', 'js');

/* Component tree: the ribbon is drawn from the bead positions in the loom. Each bead is one component instance,
   its data-path the chain of ids from the page down; data-k lists the ids of the lines it lights. */
(() => {
  const loom = document.querySelector('.loom');
  if (!loom) return;
  const band = loom.closest('.stage');
  const svg = loom.querySelector('.tree-ribbon');
  const beads = [...loom.querySelectorAll('.bead')];
  const lines = [...loom.querySelectorAll('.ln[data-c], .file[data-c]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const NS = 'http://www.w3.org/2000/svg';
  const ORANGE = '#EE7F2D', UNDER = '#C9661F';
  const parentOf = p => p.includes('/') ? p.slice(0, p.lastIndexOf('/')) : null;
  const rowOf = e => getComputedStyle(e).getPropertyValue('--r').trim();
  const colOf = e => (getComputedStyle(e).getPropertyValue('--c').trim() || '1');

  const rel = e => {
    const s = loom.getBoundingClientRect(), r = e.getBoundingClientRect();
    return { l: r.left - s.left, t: r.top - s.top, r: r.right - s.left, b: r.bottom - s.top, w: r.width, h: r.height, y: r.top - s.top + r.height / 2 };
  };
  function el(name, attrs, parent) {
    const e = document.createElementNS(NS, name);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    parent.appendChild(e);
    return e;
  }
  const f = n => n.toFixed(1);

  /* One run of ribbon as a mitred polyline; diagonal runs show the ribbon's reverse side, as in the release ribbon. */
  function piece(parent, P, w, to) {
    const g = el('g', { class: 'seg', 'data-to': to }, parent);
    el('path', { d: 'M' + P.map(p => f(p[0]) + ' ' + f(p[1])).join(' L'), fill: 'none', stroke: ORANGE, 'stroke-width': w, 'stroke-linejoin': 'miter', 'stroke-miterlimit': 4 }, g);
    const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
    const norm = v => { const l = Math.hypot(v[0], v[1]) || 1; return [v[0] / l, v[1] / l]; };
    const N = P.map((p, i) => {
      const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)];
      const u1 = norm(i > 0 ? sub(p, a) : sub(b, p)), u2 = norm(i < P.length - 1 ? sub(b, p) : sub(p, a));
      const s = [u1[0] + u2[0], u1[1] + u2[1]], len = Math.hypot(...s) || 2;
      return [norm([-s[1], s[0]]), (w / 2) * 2 / len];
    });
    for (let i = 0; i < P.length - 1; i++) {
      const a = P[i], b = P[i + 1];
      if (Math.abs(a[0] - b[0]) > 0.5 && Math.abs(a[1] - b[1]) > 0.5) {
        const [na, ha] = N[i], [nb, hb] = N[i + 1];
        const q = [[a[0] + na[0] * ha, a[1] + na[1] * ha], [b[0] + nb[0] * hb, b[1] + nb[1] * hb], [b[0] - nb[0] * hb, b[1] - nb[1] * hb], [a[0] - na[0] * ha, a[1] - na[1] * ha]];
        el('polygon', { points: q.map(p => f(p[0]) + ',' + f(p[1])).join(' '), fill: UNDER }, g);
      }
    }
    return g;
  }

  let lanes = {};
  function draw() {
    if (!loom.offsetWidth) return false; // the list carries the tree on narrow screens
    const L = loom.getBoundingClientRect();
    const ch = parseFloat(getComputedStyle(loom).fontSize) * 0.6;
    const d = 1.5 * ch, w = Math.max(7, 0.85 * ch);
    svg.setAttribute('viewBox', `0 0 ${f(L.width)} ${f(L.height)}`);
    svg.textContent = '';
    const threads = el('g', {}, svg), ribbon = el('g', {}, svg), knots = el('g', {}, svg);
    const R = Object.fromEntries(beads.map(b => [b.dataset.path, rel(b)]));

    // the ribbon enters from the left page edge in the gap under the lede, and folds down into the page bead
    const root = R.page, edge = band.getBoundingClientRect().left - L.left - 2;
    const gap = parseFloat(getComputedStyle(loom).marginTop) || 0;
    const yIn = -gap / 2, rx = root.l + root.w / 2, fold = 2 * d;
    piece(ribbon, [[edge, yIn], [rx - fold, yIn], [rx, yIn + fold], [rx, root.t + 2]], w, 'page');

    // every parent drops one lane just left of its children and folds into each of them
    lanes = {};
    beads.forEach(pb => {
      const p = pb.dataset.path;
      const kids = beads.filter(b => parentOf(b.dataset.path) === p);
      if (!kids.length) return;
      const pr = R[p];
      const lane = Math.min(...kids.map(k => R[k.dataset.path].l)) - 2 * ch;
      lanes[p] = lane;
      kids.forEach(k => {
        const kr = R[k.dataset.path];
        const x0 = Math.min(pr.r - 2, lane - d);
        piece(ribbon, [[x0, pr.y], [lane - d, pr.y], [lane, pr.y + d], [lane, kr.y - d], [lane + d, kr.y], [kr.l + 2, kr.y]], w, k.dataset.path);
      });
    });

    // threads: each Java line joined to its tag on the same row, under the ribbon
    lines.filter(e => colOf(e) === '1').forEach(j => {
      const r = rowOf(j), c = j.dataset.c;
      const t = lines.find(e => colOf(e) === '3' && rowOf(e) === r);
      if (!t) return;
      const a = rel(j.querySelector('.x')), b = rel(t.querySelector('.x'));
      const y = rel(j).y;
      el('line', { class: 'thread', 'data-c': c, x1: f(a.r + 8), y1: f(y), x2: f(b.l - 8), y2: f(y) }, threads);
      // the panel's files: a knot where each reuse of AddressPanel passes them
      if (j.classList.contains('file') && c === 'AddressPanel') {
        ['page/order/shipping', 'page/order/billing'].forEach(p => {
          if (lanes[p] === undefined) return;
          const k = el('g', { class: 'seg', 'data-to': p }, knots);
          el('circle', { class: 'knot', cx: f(lanes[p]), cy: f(y), r: f(w * 0.62) }, k);
        });
      }
    });
    if (current) light(current.paths, current.keys);
    return true;
  }

  /* Highlight: a bead lights its path from the page and its lines; a line lights every bead that renders it. */
  let current = null;
  function light(paths, keys) {
    current = { paths, keys };
    loom.classList.add('focused');
    const on = new Set();
    paths.forEach(p => { for (let q = p; q; q = parentOf(q)) on.add(q); });
    beads.forEach(b => b.classList.toggle('on', paths.includes(b.dataset.path)));
    svg.querySelectorAll('.seg').forEach(s => s.classList.toggle('on', on.has(s.dataset.to)));
    lines.forEach(e => e.classList.toggle('on', keys.includes(e.dataset.c)));
    svg.querySelectorAll('.thread').forEach(t => t.classList.toggle('on', keys.includes(t.dataset.c)));
  }
  function calm() {
    if (loom.contains(document.activeElement) && document.activeElement.classList.contains('bead')) return;
    current = null;
    loom.classList.remove('focused');
    loom.querySelectorAll('.on').forEach(e => e.classList.remove('on'));
  }
  const fromBead = b => light([b.dataset.path], b.dataset.k.split(' '));
  const fromLine = e => {
    const c = e.dataset.c;
    light(beads.filter(b => b.dataset.k.split(' ').includes(c)).map(b => b.dataset.path), [c]);
  };

  beads.forEach((b, i) => {
    b.tabIndex = i === 0 ? 0 : -1;
    b.addEventListener('mouseenter', () => fromBead(b));
    b.addEventListener('focus', () => { beads.forEach(o => { o.tabIndex = o === b ? 0 : -1; }); fromBead(b); });
    b.addEventListener('click', () => fromBead(b));
    b.addEventListener('mouseleave', calm);
    b.addEventListener('blur', () => setTimeout(calm));
    b.addEventListener('keydown', e => {
      const n = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: beads.length - 1 }[e.key];
      if (n === undefined) return;
      e.preventDefault();
      beads[Math.max(0, Math.min(beads.length - 1, n))].focus();
    });
  });
  lines.forEach(e => { e.addEventListener('mouseenter', () => fromLine(e)); e.addEventListener('mouseleave', calm); });

  let raf = 0, first = true;
  function schedule() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      if (!draw() || !first) return;
      first = false;
      if (reduced.matches) return;
      svg.classList.add('unroll');
      svg.getBoundingClientRect();
      requestAnimationFrame(() => { svg.classList.add('unrolled'); svg.classList.remove('unroll'); });
    });
  }
  new ResizeObserver(schedule).observe(loom);
  addEventListener('resize', schedule); // wider than the page's max width the loom keeps its size but moves
  if (document.fonts) document.fonts.ready.then(schedule);
  schedule();
})();

(() => {
  /* Copy buttons */
  document.querySelectorAll('.copy').forEach(btn => {
    btn.hidden = false;
    btn.addEventListener('click', async () => {
      const code = document.getElementById(btn.dataset.copy).textContent;
      const status = btn.nextElementSibling;
      let ok = false;
      try { await navigator.clipboard.writeText(code); ok = true; } catch (e) {
        const r = document.createRange(); r.selectNodeContents(document.getElementById(btn.dataset.copy));
        const s = getSelection(); s.removeAllRanges(); s.addRange(r);
        try { ok = document.execCommand('copy'); } catch (e2) { ok = false; }
      }
      btn.dataset.state = ok ? 'done' : 'failed';
      btn.textContent = ok ? 'Copied' : 'Press Ctrl+C';
      status.textContent = ok ? 'Dependency copied to the clipboard' : 'Copy failed: the snippet is selected, press Ctrl+C to copy it';
      clearTimeout(btn._t);
      btn._t = setTimeout(() => { btn.textContent = 'Copy'; delete btn.dataset.state; status.textContent = ''; }, 2400);
    });
  });
})();
