// Station behaviour.
//
// Split-flap arrival for the departure board: every [data-flap] value on a .board flips
// in once, character by character. Without JavaScript, or with reduced motion requested,
// the values simply stand still.
(function () {
    if (!('querySelectorAll' in document)) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var board = document.querySelector('.board');
    if (!board || reduce) return;

    var values = board.querySelectorAll('[data-flap]');
    Array.prototype.forEach.call(values, function (el, row) {
        var text = el.textContent;
        el.textContent = '';
        // Screen readers read the value whole; the flipping characters are hidden from them.
        var spoken = document.createElement('span');
        spoken.className = 'visually-hidden';
        spoken.textContent = text;
        el.appendChild(spoken);
        Array.prototype.forEach.call(text, function (ch, i) {
            var c = document.createElement('span');
            c.className = 'flap-c';
            c.setAttribute('aria-hidden', 'true');
            c.style.setProperty('--i', i);
            c.style.setProperty('--row', row);
            c.textContent = ch;
            el.appendChild(c);
        });
    });
    board.classList.add('flaps-run');
})();

// Reading rail: the section in view becomes the current stop.
(function () {
    var links = document.querySelectorAll('.reading-rail .toc--level-1 > a');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var byId = {};
    Array.prototype.forEach.call(links, function (a) {
        var href = a.getAttribute('href') || '';
        if (href.charAt(0) === '#') byId[decodeURIComponent(href.slice(1))] = a;
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
