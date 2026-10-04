/* Provenance ribbon: drawn from the release list below, transcribed from the repository
   (_config.yml versions, _data/releases.yml, and the dates of the release announcement posts). */
(() => {
  const NOW = '2026-10-04'; // _config.yml wicket.released, 11.0.0
  const wiki = page => 'https://cwiki.apache.org/confluence/display/WICKET/' + page;

  const LINES = [
    { id: '1.3', title: 'Wicket 1.3', state: 'ended', last: ['1.3.7', '2009-07-30'], eol: '2009-07-30',
      support: 'Ended with 1.3.7', page: 'start/wicket-1.3.x.html',
      guide: ['Migrating to Wicket 1.3', wiki('Migrating+to+Wicket+1.3')],
      ann: ['Apache Wicket 1.3.7 marks end of life for Wicket 1.3', 'news/2009/07/30/wicket-1.3.7-released.html'] },
    { id: '1.4', title: 'Wicket 1.4', state: 'ended', first: ['1.4.0', '2009-07-30'], last: ['1.4.23', '2014-02-06'], eol: '2015-11-16',
      support: 'Ended 16 Nov 2015', page: 'start/wicket-1.4.x.html',
      guide: ['Migrating to Wicket 1.4', wiki('Migrating+to+Wicket+1.4')],
      ann: ['Apache Wicket 1.4 takes typesafety to the next level', 'news/2009/07/30/wicket-1.4-takes-typesafety-to-the-next-level.html'] },
    { id: '1.5', title: 'Wicket 1.5', state: 'ended', first: ['1.5.0', '2011-09-07'], last: ['1.5.16', '2016-08-05'],
      support: 'Ended', page: 'start/wicket-1.5.x.html',
      guide: ['Migration to Wicket 1.5', wiki('Migration+to+Wicket+1.5')],
      ann: ['Apache Wicket releases Wicket 1.5', 'news/2011/09/07/wicket-1.5-released.html'] },
    { id: '6', title: 'Wicket 6', state: 'ended', first: ['6.0.0', '2012-09-05'], last: ['6.30.0', '2018-12-10'],
      support: 'Ended', page: 'start/wicket-6.x.html',
      guide: ['Migration to Wicket 6.0', wiki('Migration+to+Wicket+6.0')],
      ann: ['Apache Wicket v6.0.0 released', 'news/2012/09/05/wicket-6.0.0-released.html'] },
    { id: '7', title: 'Wicket 7', state: 'ended', first: ['7.0.0', '2015-07-28'], last: ['7.18.0', '2021-04-06'],
      support: 'Ended', page: 'start/wicket-7.x.html',
      guide: ['Migration to Wicket 7.0', wiki('Migration+to+Wicket+7.0')],
      ann: ['Apache Wicket v7.0 released', 'news/2015/07/28/wicket-7.0-released.html'] },
    { id: '8', title: 'Wicket 8', state: 'ended', first: ['8.0.0', '2018-05-22'], last: ['8.19.0', '2026-08-30'], eol: NOW,
      support: 'Ended with 11.0.0', page: 'start/wicket-8.x.html',
      guide: ['Migration to Wicket 8.0', wiki('Migration+to+Wicket+8.0')],
      ann: ['Announcing Apache Wicket 8: Write Less, Achieve More', 'news/2018/05/22/wicket-8-released.html'] },
    { id: '9', title: 'Wicket 9', state: 'ended', first: ['9.0.0', '2020-07-15'], last: ['9.24.0', '2026-08-30'], eol: NOW,
      support: 'Ended with 11.0.0', page: 'start/wicket-9.x.html',
      guide: ['Migration to Wicket 9', 'https://s.apache.org/wicket9migration'],
      ann: ['Announcing Apache Wicket 9: get into the modern Java world!', 'news/2020/07/15/wicket-9-released.html'] },
    { id: '10', title: 'Wicket 10 LTS', label: '10 LTS', state: 'lts', role: 'for production', first: ['10.0.0', '2024-03-11'], latest: ['10.11.0', '2026-08-30'],
      next: ['10.12.0', 'Jan 2027'], support: 'Until 14.0.0, Jul 2027', page: 'start/wicket-10.x.html',
      guide: ['Migration to Wicket 10', 'https://s.apache.org/wicket10migrate'],
      ann: ['Apache Wicket 10.0.0 released', 'news/2024/03/11/wicket-10.0.0-released.html'] },
    { id: '11', title: 'Wicket 11', state: 'current', role: 'for new features', first: ['11.0.0', NOW], requires: 'Java 21, Jakarta Servlet 6.1',
      support: 'Until 12.0.0, Jan 2027', page: 'start/wicket-11.x.html',
      guide: ['New in Wicket 11', 'start/wicket-11.x.html#new'],
      ann: ['A new release cadence for Apache Wicket', 'news/2026/09/11/release-cadence.html'] },
    { id: '10.12', title: 'Wicket 10.12.0 LTS', label: '10.12.0', state: 'sched', strand: '10', when: '2027-01', whenText: 'January 2027',
      support: 'Until 14.0.0, Jul 2027', page: 'start/wicket-10.x.html' },
    { id: '12', title: 'Wicket 12', state: 'sched', when: '2027-01', whenText: 'January 2027', support: 'Until 13.0.0, Apr 2027',
      ann: ['A new release cadence for Apache Wicket', 'news/2026/09/11/release-cadence.html'] },
    { id: '13', title: 'Wicket 13', state: 'sched', when: '2027-04', whenText: 'April 2027', support: 'Until 14.0.0, Jul 2027',
      ann: ['A new release cadence for Apache Wicket', 'news/2026/09/11/release-cadence.html'] },
    { id: '14', title: 'Wicket 14 LTS', label: '14 LTS', state: 'sched', when: '2027-07', whenText: 'first week of July 2027', support: 'Until 18.0.0, Jul 2028',
      ann: ['A new release cadence for Apache Wicket', 'news/2026/09/11/release-cadence.html'] }
  ];

  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dec = s => { const [y, m, d] = s.split('-').map(Number); return y + (m - 1) / 12 + ((d || 1) - 1) / 365; };
  const monthYear = s => { const [y, m] = s.split('-').map(Number); return MONTHS[m - 1] + ' ' + y; };
  const longDate = s => { const [y, m, d] = s.split('-').map(Number); return d + ' ' + MONTHS[m - 1] + ' ' + y; };

  const T0 = 2008.5, TNOW = dec(NOW), T14 = dec('2027-07'), T18 = dec('2028-07');
  const byId = Object.fromEntries(LINES.map(l => [l.id, l]));
  const history = LINES.slice(0, 8); // 1.3 to 10, the lines that started before now

  const stage = document.querySelector('.stage');
  const svg = stage.querySelector('.ribbon');
  const tagBox = stage.querySelector('.fold-tags');
  const card = stage.querySelector('.fold');
  const mq = matchMedia('(max-width: 860px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const NS = 'http://www.w3.org/2000/svg';

  /* Tags: one control per release line, in date order. */
  const tagText = l => {
    const v = l.label || l.id;
    if (l.id === '1.3') return [l.last[0], monthYear(l.last[1])];
    if (l.state === 'sched') return [v, monthYear(l.when)];
    return [v, monthYear(l.first[1])];
  };
  const tags = {};
  LINES.forEach(l => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'tag' + (l.state === 'sched' ? ' sched' : '');
    const [v, d] = tagText(l);
    b.innerHTML = `<b>${v}</b><span class="d">${d}</span>`;
    b.setAttribute('aria-pressed', 'false');
    b.setAttribute('aria-controls', 'fold-title');
    b.setAttribute('aria-label', `${l.title}, ${l.state === 'sched' ? 'scheduled ' : ''}${d}: open its fold`);
    b.dataset.line = l.id;
    ['mouseenter', 'focus', 'click'].forEach(ev => b.addEventListener(ev, () => open(l.id, true)));
    ['mouseleave', 'blur'].forEach(ev => b.addEventListener(ev, calm));
    tagBox.appendChild(b);
    tags[l.id] = b;
  });
  const nowMark = document.createElement('span');
  nowMark.className = 'tag now-mark';
  nowMark.setAttribute('aria-hidden', 'true');
  nowMark.innerHTML = '<b>Now</b><span class="d">4 Oct 2026</span>';
  tagBox.appendChild(nowMark);

  /* The opened fold */
  function calm() { if (!tagBox.contains(document.activeElement)) svg.classList.remove('focused'); }
  function open(id, dim) {
    const l = byId[id];
    const strand = l.strand || l.id;
    Object.values(tags).forEach(t => t.setAttribute('aria-pressed', String(t.dataset.line === id)));
    if (dim) svg.classList.add('focused');
    svg.querySelectorAll('.strand').forEach(g => g.classList.toggle('on', g.dataset.line === strand));
    card.querySelector('.fold-title').textContent = l.title;
    const status = {
      ended: 'Out of service' + (l.eol === NOW ? ' · ended with 11.0.0' : ''),
      lts: 'In service · ' + l.role,
      current: 'In service · ' + l.role,
      sched: 'Scheduled · ' + l.whenText
    }[l.state];
    card.querySelector('.fold-status').textContent = status;
    const facts = [];
    if (l.state === 'sched') {
      facts.push(['Release', (l.label && l.label.includes('.') ? l.label : l.id + '.0.0') + ', ' + l.whenText]);
    } else if (l.state === 'current') {
      facts.push(['Released', l.first[0] + ' · ' + longDate(l.first[1])], ['Requires', l.requires]);
    } else {
      if (l.first) facts.push(['First release', l.first[0] + ' · ' + longDate(l.first[1])]);
      if (l.last) facts.push(['Last release', l.last[0] + ' · ' + longDate(l.last[1])]);
      if (l.latest) facts.push(['Latest release', l.latest[0] + ' · ' + longDate(l.latest[1])]);
      if (l.next) facts.push(['Next release', l.next[0] + ' · ' + l.next[1]]);
    }
    facts.push(['Support', l.support]);
    card.querySelector('.fold-facts').innerHTML = facts.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
    const links = [];
    if (l.guide) links.push(l.guide);
    if (l.ann) links.push([l.state === 'sched' ? 'The release schedule' : 'Announcement', l.ann[1], l.ann[0]]);
    if (l.page) links.push([(l.label || l.id).replace(' LTS', '') + '.x downloads', l.page]);
    if (l.state === 'ended' && dec(l.last[1]) > 2018) links.push(['Upgrade route', '#upgrade']);
    card.querySelector('.fold-links').innerHTML = links.map(([t, h, title]) =>
      `<li><a href="${h}"${title ? ` title="${title.replace(/"/g, '&quot;')}"` : ''}>${t}</a></li>`).join('');
  }

  /* Geometry */
  let G;
  const rel = el => {
    const s = stage.getBoundingClientRect(), r = el.getBoundingClientRect();
    return { l: r.left - s.left, t: r.top - s.top, r: r.right - s.left, b: r.bottom - s.top, w: r.width, h: r.height };
  };
  function measure() {
    const vertical = mq.matches;
    const S = { w: stage.clientWidth, h: stage.clientHeight };
    const band = rel(stage.querySelector('.band'));
    const lts = rel(stage.querySelector('.dep-lts'));
    const nw = rel(stage.querySelector('.dep-new'));
    if (!vertical) {
      const split = lts.l - 112, x14 = Math.min(lts.r + 150, S.w - 70);
      return { vertical, S, split, x14,
        anchors: [[T0, 0], [TNOW, split], [2026.95, lts.l + 60], [2027.3, lts.r - 60], [T14, x14], [T18, S.w - 24]],
        main: band.t + band.h * 0.42, gap: 30, up: lts.b + 16, low: nw.t - 16, join: band.t + band.h * 0.42,
        W: { cust: 16, pair: 11, maint: 7, thread: 1.6 }, end: S.w - 24 };
    }
    const fut = rel(stage.querySelector('.future'));
    const split = lts.t - 30;
    return { vertical, S, split, x14: fut.t + 190,
      anchors: [[T0, band.t + 4], [TNOW, split], [2026.95, nw.b + 16], [2027.3, fut.t + 150], [T14, fut.t + 190], [T18, fut.b - 6]],
      main: 26, gap: 11, up: 26, low: 50, join: 38, W: { cust: 12, pair: 8, maint: 5, thread: 1.4 }, end: fut.b - 6, tagX: 78 };
  }
  const M = t => {
    const a = G.anchors;
    if (t <= a[0][0]) return a[0][1];
    for (let i = 1; i < a.length; i++) {
      if (t <= a[i][0]) { const [t0, p0] = a[i - 1], [t1, p1] = a[i]; return p0 + (p1 - p0) * (t - t0) / (t1 - t0); }
    }
    return a[a.length - 1][1];
  };
  const C = lane => typeof lane === 'number' ? G.main + lane * G.gap : G[lane];
  const XY = (m, c) => G.vertical ? [c, m] : [m, c];

  /* Draw one strand piece as a mitred polyline; diagonal runs show the ribbon's reverse side. */
  function piece(parent, pts, w, kind) {
    const P = pts.map(([m, c]) => XY(m, c));
    const d = 'M' + P.map(p => p.map(n => n.toFixed(1)).join(' ')).join(' L');
    const g = document.createElementNS(NS, 'g');
    if (kind === 'sched') {
      g.innerHTML = `<path d="${d}" fill="none" stroke="#EE7F2D" stroke-width="1" opacity=".85"/>` +
        `<path d="${d}" fill="none" stroke="#EE7F2D" stroke-width="${w}" stroke-dasharray="10 6" stroke-linejoin="miter" opacity=".85"/>`;
    } else {
      const color = kind === 'thread' ? '#7F9C93' : '#EE7F2D';
      g.innerHTML = `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linejoin="miter" stroke-miterlimit="4"/>`;
    }
    if (kind !== 'thread') {
      // miter normals at each vertex
      const N = P.map((p, i) => {
        const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)];
        const u1 = norm(i > 0 ? sub(p, a) : sub(b, p)), u2 = norm(i < P.length - 1 ? sub(b, p) : sub(p, a));
        const s = [u1[0] + u2[0], u1[1] + u2[1]], len = Math.hypot(...s) || 2;
        const n = norm([-s[1], s[0]]);
        return [n, (w / 2) * 2 / len];
      });
      for (let i = 0; i < P.length - 1; i++) {
        const a = P[i], b = P[i + 1];
        if (Math.abs(a[0] - b[0]) > 0.5 && Math.abs(a[1] - b[1]) > 0.5) {
          const [na, ha] = N[i], [nb, hb] = N[i + 1];
          const q = [[a[0] + na[0] * ha, a[1] + na[1] * ha], [b[0] + nb[0] * hb, b[1] + nb[1] * hb],
                     [b[0] - nb[0] * hb, b[1] - nb[1] * hb], [a[0] - na[0] * ha, a[1] - na[1] * ha]];
          const poly = document.createElementNS(NS, 'polygon');
          poly.setAttribute('points', q.map(p => p.map(n => n.toFixed(1)).join(',')).join(' '));
          poly.setAttribute('fill', '#C9661F');
          if (kind === 'sched') poly.setAttribute('opacity', '.85');
          g.appendChild(poly);
        }
      }
    }
    parent.appendChild(g);
  }
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const norm = v => { const l = Math.hypot(v[0], v[1]) || 1; return [v[0] / l, v[1] / l]; };

  function el(name, attrs, parent, text) {
    const e = document.createElementNS(NS, name);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (text) e.textContent = text;
    parent.appendChild(e);
    return e;
  }

  function place(tag, left, top) { tag.style.transform = `translate(${Math.round(left)}px, ${Math.round(top)}px)`; }

  function draw() {
    G = measure();
    const { W, vertical } = G;
    svg.setAttribute('viewBox', `0 0 ${G.S.w} ${G.S.h}`);
    svg.textContent = '';
    const under = el('g', {}, svg), lines = el('g', {}, svg), over = el('g', {}, svg), labels = el('g', {}, svg);
    const groups = {};
    const group = id => groups[id] || (groups[id] = el('g', { class: 'strand', 'data-line': id }, lines));
    const custody = [];

    // History: each line holds the main lane until its successor starts, then peels into a lane of its own.
    const freeAt = [];
    const ends = [];
    const hist = {};
    history.forEach((l, i) => {
      const s = l.first ? dec(l.first[1]) : T0;
      const mS = M(s);
      hist[l.id] = { mS };
      if (l.id === '10') { custody.push([l.id, mS, G.split]); return; }
      const mN = M(dec(history[i + 1].first[1]));
      custody.push([l.id, mS, mN]);
      let k = 1;
      while (freeAt[k] !== undefined && freeAt[k] > mN) k++;
      const dk = k * G.gap;
      const mLast = M(dec(l.last[1]));
      const peelEnd = mN + dk;
      const g = group(l.id);
      const ended = mLast <= mN + 1;
      piece(g, [[mN - 4, C('main')], [mN, C('main')], [peelEnd, C(k)]], ended ? W.thread : W.maint, ended ? 'thread' : 'solid');
      let m = peelEnd;
      if (mLast > peelEnd) { piece(g, [[peelEnd, C(k)], [mLast, C(k)]], W.maint, 'solid'); m = mLast; }
      const mEnd = l.eol ? Math.max(M(dec(l.eol)), m + 10) : m + 18;
      piece(g, [[m - (m > peelEnd ? 1 : 0), C(k)], [mEnd, C(k)]], W.thread, 'thread');
      const [ex, ey] = XY(mEnd, C(k));
      el('circle', { cx: ex, cy: ey, r: vertical ? 2.2 : 2.6, fill: '#7F9C93' }, g);
      freeAt[k] = mEnd + (vertical ? 16 : 100);
      ends.push({ l, k, mEnd });
      hist[l.id].k = k; hist[l.id].mEnd = mEnd;
    });

    // The present split: 10 LTS rises toward production, 11 drops toward new features, both rejoin at 14 LTS.
    const du = Math.abs(G.up - G.main), dl = Math.abs(G.low - G.main);
    const dju = Math.abs(G.join - G.up), djl = Math.abs(G.join - G.low);
    const X = G.x14;
    piece(group('10'), [[G.split - 6, C('main')], [G.split, C('main')], [G.split + du, C('up')], [X - dju, C('up')], [X, C('join')], [X + 6, C('join')]], W.pair, 'sched');
    piece(group('10'), [[G.split - 6, C('main')], [G.split, C('main')], [G.split + du, C('up')], [G.split + du + 4, C('up')]], W.pair, 'solid');
    piece(group('11'), [[G.split - 6, C('main')], [G.split, C('main')], [G.split + dl, C('low')], [X - djl, C('low')], [X, C('join')], [X + 6, C('join')]], W.pair, 'sched');
    piece(group('11'), [[G.split - 6, C('main')], [G.split, C('main')], [G.split + dl, C('low')], [G.split + dl + 4, C('low')]], W.pair, 'solid');
    // quarterly hand-overs on the 11 strand and the LTS patch on the 10 strand
    ['12', '13'].forEach(id => { const g = group(id); const m = M(dec(byId[id].when)); el('path', { d: crease(m, C('low'), W.pair), stroke: '#C9661F', 'stroke-width': 2.5, fill: 'none' }, g); });
    piece(group('14'), [[X, C('join')], [G.end, C('join')]], W.cust, 'sched');

    // Custody line on top, solid, with a crease at every dated release.
    custody.forEach(([id, a, b]) => {
      piece(group(id), [[a, C('main')], [b, C('main')]], W.cust, 'solid');
      if (id !== '1.3') el('path', { d: crease(a, C('main'), W.cust), stroke: '#9E4A12', 'stroke-width': 2, fill: 'none' }, group(id));
    });

    // the strands themselves open their fold on hover
    Object.entries(groups).forEach(([id, g]) => { g.addEventListener('mouseenter', () => open(id, true)); g.addEventListener('mouseleave', calm); });

    // now: a dotted hairline across the split
    const nowA = XY(G.split, Math.min(G.up, G.main) - (vertical ? 12 : 22)), nowB = XY(G.split, Math.max(G.low, G.main) + (vertical ? 4 : 22));
    el('line', { x1: nowA[0], y1: nowA[1], x2: nowB[0], y2: nowB[1], stroke: '#F39A55', 'stroke-width': 1, 'stroke-dasharray': '1 4', 'stroke-linecap': 'round' }, under);

    // end labels: final version of each ended line
    ends.forEach(({ l, k, mEnd }) => {
      if (l.id === '1.3') return;
      const text = l.last[0] + ' · ' + l.last[1].slice(0, 4);
      if (!vertical) {
        const est = text.length * 7;
        if (mEnd + 8 + est > G.split - 10) el('text', { x: mEnd - 4, y: C(k) - 7, 'text-anchor': 'end' }, labels, text);
        else el('text', { x: mEnd + 8, y: C(k) + 4 }, labels, text);
      } else {
        l._endY = mEnd;
      }
    });

    /* Tags */
    const size = t => [t.offsetWidth, t.offsetHeight];
    const leader = (x1, y1, x2, y2) => el('path', { d: `M${x1} ${y1} L${x2} ${y2}`, stroke: 'rgba(168,199,189,.6)', 'stroke-width': 1, fill: 'none' }, under);
    if (!vertical) {
      const tierRight = [];
      const top0 = C('main') - W.cust / 2 - 10;
      history.forEach(l => {
        const t = tags[l.id];
        const [w, h] = size(t);
        if (l.id === '1.3') {
          const { k, mEnd } = hist['1.3'];
          place(t, Math.max(2, mEnd - w + 4), C(k) + 7);
          return;
        }
        const x = hist[l.id].mS;
        let left = x - 7;
        if (left + w > G.split - 14) left = G.split - 14 - w;
        let tier = 0;
        while (tierRight[tier] !== undefined && tierRight[tier] + 6 > left) tier++;
        tierRight[tier] = left + w;
        const bottom = top0 - tier * 25;
        place(t, left, bottom - h);
        leader(x, C('main') - W.cust / 2 - 1, x, bottom - 3);
      });
      // 11 at the foot of the falling strand, now above the split
      { const t = tags['11']; const [w, h] = size(t); const y = C('low') - 16; place(t, G.split + (y - C('main')) - 12 - w, y - h / 2); }
      { const [w, h] = size(nowMark); place(nowMark, G.split - 10 - w, C('up') - 26 - h / 2 + 8); }
      // scheduled folds inside the lens
      { const t = tags['10.12']; const [, h] = size(t); const x = M(dec('2027-01')); place(t, x - 7, C('up') + W.pair / 2 + 8); leader(x, C('up') + W.pair / 2, x, C('up') + W.pair / 2 + 9); el('path', { d: crease(x, C('up'), W.pair), stroke: '#C9661F', 'stroke-width': 2.5, fill: 'none' }, groups['10']); }
      ['12', '13'].forEach(id => { const t = tags[id]; const [, h] = size(t); const x = M(dec(byId[id].when)); const b = C('low') - W.pair / 2 - 9; place(t, x - 7, b - h); leader(x, C('low') - W.pair / 2, x, b - 2); });
      { const t = tags['14']; const [, h] = size(t); const b = C('join') - W.cust / 2 - 10; place(t, X - 7, b - h); leader(X, C('join') - W.cust / 2, X, b - 2); }
      el('text', { x: G.end, y: C('join') + W.cust / 2 + 20, 'text-anchor': 'end' }, labels, 'until 18.0.0 · Jul 2028');
    } else {
      const tx = G.tagX;
      let prev = -Infinity;
      const stack = (t, want) => { const [, h] = size(t); const top = Math.max(want - h / 2, prev + 3); place(t, tx, top); prev = top + h; return top + h / 2; };
      history.forEach(l => {
        const t = tags[l.id];
        const y = l.id === '1.3' ? hist['1.3'].mEnd : hist[l.id].mS;
        const c = l.id === '1.3' ? C(hist['1.3'].k) : C('main');
        const cy = stack(t, y);
        el('path', { d: `M${c + W.cust / 2 + 2} ${y} L${tx - 14} ${y} L${tx - 3} ${cy}`, stroke: 'rgba(168,199,189,.6)', 'stroke-width': 1, fill: 'none' }, under);
      });
      // now and 11 on one row just above the panels
      { const [nw, nh] = size(nowMark); const top = Math.max(G.split - nh / 2, prev + 3); place(nowMark, tx, top); place(tags['11'], tx + nw + 6, top); prev = top + nh; }
      // end labels in a second column, stacked upward so they stay clear of the now row
      const ex = Math.max(238, tx + 160);
      let prevTop = G.split - 16;
      ends.filter(e => e.l.id !== '1.3').sort((a, b) => b.mEnd - a.mEnd).forEach(({ l, k, mEnd }) => {
        const y = Math.min(mEnd + 4, prevTop - 15);
        el('text', { x: ex, y }, labels, l.last[0] + ' · ' + l.last[1].slice(0, 4));
        el('path', { d: `M${C(k) + 3} ${mEnd} L${ex - 6} ${y - 4}`, stroke: 'rgba(127,156,147,.55)', 'stroke-width': 1, 'stroke-dasharray': '2 3', fill: 'none' }, under);
        prevTop = y;
      });
      prev = -Infinity;
      [['10.12', 'up'], ['12', 'low'], ['13', 'low'], ['14', 'join']].forEach(([id, lane]) => {
        const y = id === '14' ? X : M(dec(byId[id].when));
        const cy = stack(tags[id], y);
        if (id === '10.12') el('path', { d: crease(y, C('up'), W.pair), stroke: '#C9661F', 'stroke-width': 2.5, fill: 'none' }, groups['10']);
        el('path', { d: `M${C(lane) + W.pair / 2 + 2} ${y} L${tx - 14} ${y} L${tx - 3} ${cy}`, stroke: 'rgba(168,199,189,.6)', 'stroke-width': 1, fill: 'none' }, under);
      });
      el('text', { x: tx + 6, y: G.end - 2 }, labels, 'until 18.0.0 · Jul 2028');
    }
    svg.appendChild(labels);
    const pressed = Object.values(tags).find(t => t.getAttribute('aria-pressed') === 'true');
    if (pressed) open(pressed.dataset.line, svg.classList.contains('focused'));
  }

  // a fold crease across a strand at main position m
  function crease(m, c, w) {
    const a = XY(m - w * 0.35, c - w / 2), b = XY(m + w * 0.35, c + w / 2);
    return `M${a[0].toFixed(1)} ${a[1].toFixed(1)} L${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
  }

  let raf = 0, first = true;
  function schedule() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      draw();
      if (first) {
        first = false;
        open('9');
        if (!reduced.matches) {
          svg.classList.add('unroll');
          svg.classList.toggle('v', G.vertical);
          tagBox.classList.add('unroll');
          svg.getBoundingClientRect();
          requestAnimationFrame(() => {
            svg.classList.add('unrolled');
            svg.classList.remove('unroll');
            setTimeout(() => tagBox.classList.remove('unroll'), 450);
          });
        }
      }
    });
  }
  new ResizeObserver(schedule).observe(stage);
  if (document.fonts) document.fonts.ready.then(schedule);
  schedule();

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
