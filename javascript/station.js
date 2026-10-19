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

// The ticket's copy plates: <button data-copy="id"> copies the text of the element with that id
// and announces "Copied". Without clipboard access the snippet is shown and selected, so the
// visitor can copy it by hand. Without JavaScript the plates stay hidden.
(function () {
    var buttons = document.querySelectorAll('.ticket [data-copy]');
    Array.prototype.forEach.call(buttons, function (button) {
        var target = document.getElementById(button.getAttribute('data-copy'));
        if (!target) return;
        var label = button.textContent;
        var timer;
        var status = document.createElement('span');
        status.className = 'visually-hidden';
        status.setAttribute('role', 'status');
        button.parentNode.appendChild(status);
        button.hidden = false;

        function done(text, said) {
            button.textContent = text;
            status.textContent = said;
            clearTimeout(timer);
            timer = setTimeout(function () {
                button.textContent = label;
                button.classList.remove('is-copied');
                status.textContent = '';
            }, 2000);
        }
        function selectByHand() {
            var pre = target.closest('pre');
            if (pre) pre.hidden = false;
            var range = document.createRange();
            range.selectNodeContents(target);
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            done('Selected, copy it', 'The snippet is selected; copy it by hand.');
        }
        button.addEventListener('click', function () {
            var text = target.textContent;
            if (!navigator.clipboard) { selectByHand(); return; }
            navigator.clipboard.writeText(text).then(function () {
                button.classList.add('is-copied');
                done('Copied', 'Copied');
            }, selectByHand);
        });
    });
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
