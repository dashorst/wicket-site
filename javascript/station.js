// Station behaviour. Split-flap arrival for the departure board: every [data-flap] value flips
// in once, character by character. Without JavaScript, or with reduced motion
// requested, the values simply stand still.
(function () {
    if (!('querySelectorAll' in document)) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var board = document.querySelector('.board');
    if (!board || reduce) return;

    var rows = board.querySelectorAll('[data-flap]');
    Array.prototype.forEach.call(rows, function (el, row) {
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

// Copy buttons: <button data-copy="#id"> copies the text of the target, or its value for a field.
(function () {
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

// Reading rail: mark the section currently in view as the current stop.
(function () {
    var links = document.querySelectorAll('.reading-rail .toc--level-1 > a');
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
