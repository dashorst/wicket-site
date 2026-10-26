/* Line work for sheet 1, the callout interaction, zone references and the copy button. */
(function () {
    'use strict';

    var SVG = 'http://www.w3.org/2000/svg';
    var field = document.querySelector('.drawing-field');
    var svg = field && field.querySelector('.lines');
    var callouts = Array.prototype.slice.call(document.querySelectorAll('.callout'));
    var wide = window.matchMedia('(min-width: 760px)');
    var pinned = null;

    function box(el) {
        var r = el.getBoundingClientRect();
        var f = field.getBoundingClientRect();
        return { x: r.left - f.left, y: r.top - f.top, w: r.width, h: r.height };
    }

    function el(name, attrs) {
        var n = document.createElementNS(SVG, name);
        for (var k in attrs) n.setAttribute(k, attrs[k]);
        svg.appendChild(n);
        return n;
    }

    /* Callouts sit beside the views, each as close to its parts as the stack allows. */
    function placeCallouts() {
        var list = document.querySelector('.callouts');
        var items = Array.prototype.slice.call(list.children);
        items.forEach(function (li) { li.style.position = ''; li.style.top = ''; });
        list.style.height = '';
        if (!wide.matches) return;

        var listTop = box(list).y;
        var y = 0;
        items.forEach(function (li) {
            var part = li.firstElementChild.dataset.part;
            var targets = field.querySelectorAll('[data-lead="' + part + '"]');
            var sum = 0;
            targets.forEach(function (t) { var b = box(t); sum += b.y + b.h / 2; });
            var want = targets.length ? sum / targets.length - listTop - 15 : y;
            var top = Math.max(y, want);
            li.style.position = 'absolute';
            li.style.left = '0';
            li.style.right = '0';
            li.style.top = top + 'px';
            y = top + li.offsetHeight + 4;
        });
        list.style.height = y + 'px';
    }

    function draw() {
        if (!field) return;
        placeCallouts();
        while (svg.firstChild) svg.removeChild(svg.firstChild);

        /* chain lines: the same feature projected from one view to the next */
        ['id', 'model'].forEach(function (p) {
            var ends = field.querySelectorAll('[data-proj="' + p + '"]');
            for (var i = 0; i + 1 < ends.length; i++) {
                var a = box(ends[i]), b = box(ends[i + 1]);
                var x = Math.round(a.x + a.w / 2) + 0.5;
                el('path', { class: 'proj', d: 'M' + x + ' ' + (a.y + a.h + 2) + 'V' + (b.y - 2) });
            }
        });

        if (!wide.matches) return;

        /* leaders: from the shoulder of each callout to a dot on its part */
        callouts.forEach(function (c) {
            var part = c.dataset.part;
            var ball = box(c.querySelector('.balloon'));
            var sx = ball.x - 4, sy = ball.y + ball.h / 2;
            var kx = sx - 18;
            field.querySelectorAll('[data-lead="' + part + '"]').forEach(function (t) {
                var b = box(t);
                var tx, ty;
                if (t.classList.contains('view-file')) { tx = b.x + b.w + 3; ty = b.y + b.h / 2; }
                else { tx = b.x + b.w / 2; ty = b.y - 1; }
                el('path', { class: 'leader', 'data-for': part, d: 'M' + sx + ' ' + sy + 'H' + kx + 'L' + tx + ' ' + ty });
                el('circle', { 'data-for': part, cx: tx, cy: ty, r: 2.6 });
            });
        });
        if (pinned) light(pinned);
    }

    function light(part) {
        field.querySelectorAll('.t').forEach(function (t) {
            t.classList.toggle('is-lit', !!part && (' ' + (t.dataset.part || '') + ' ').indexOf(' ' + part + ' ') > -1);
        });
        callouts.forEach(function (c) { c.classList.toggle('is-active', c.dataset.part === part); });
        svg.classList.toggle('has-active', !!part);
        svg.querySelectorAll('[data-for]').forEach(function (n) {
            n.classList.toggle('on', n.getAttribute('data-for') === part);
        });
    }

    function rest() { light(pinned); }

    callouts.forEach(function (c) {
        var part = c.dataset.part;
        c.addEventListener('mouseenter', function () { light(part); });
        c.addEventListener('focus', function () { light(part); });
        c.addEventListener('mouseleave', rest);
        c.addEventListener('blur', rest);
        c.addEventListener('click', function () {
            pinned = pinned === part ? null : part;
            callouts.forEach(function (o) { o.setAttribute('aria-pressed', String(o.dataset.part === pinned)); });
            light(pinned || part);
        });
    });

    /* pointing at a part in a view lights it everywhere, and its callout */
    if (field) {
        field.querySelectorAll('.t[data-part]').forEach(function (t) {
            t.addEventListener('mouseenter', function () { light(t.dataset.part.split(' ')[0]); });
            t.addEventListener('mouseleave', rest);
        });
    }

    /* zone references follow the layout: the zone is read from where the target actually sits */
    function zones() {
        document.querySelectorAll('[data-zoneof]').forEach(function (ref) {
            var target = document.getElementById(ref.dataset.zoneof);
            if (!target) return;
            var body = target.closest('.sheet-body').getBoundingClientRect();
            var r = target.getBoundingClientRect();
            var col = Math.min(8, Math.max(1, Math.floor((r.left - body.left) / body.width * 8) + 1));
            var row = 'ABCDEF'.charAt(Math.min(5, Math.max(0, Math.floor((r.top - body.top) / body.height * 6))));
            ref.textContent = 'sheet ' + target.closest('.sheet').dataset.sheet + ', zone ' + row + col;
        });
    }

    function layout() { draw(); zones(); }

    var queued = false;
    function queue() {
        if (queued) return;
        queued = true;
        requestAnimationFrame(function () { queued = false; layout(); });
    }

    if (field && 'ResizeObserver' in window) new ResizeObserver(queue).observe(document.querySelector('.s1'));
    window.addEventListener('resize', queue);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(queue);
    layout();

    /* Maven dependency: release line switch and copy */
    var version = document.getElementById('maven-version');
    var copy = document.getElementById('copy');
    var status = document.getElementById('copy-status');
    var code = document.getElementById('maven-code');
    var timer;

    document.querySelectorAll('input[name="line"]').forEach(function (r) {
        r.addEventListener('change', function () {
            version.textContent = r.value;
            copy.setAttribute('aria-label', 'Copy the ' + r.value + ' dependency');
            status.textContent = '';
        });
    });

    if (navigator.clipboard && copy) {
        copy.hidden = false;
        copy.addEventListener('click', function () {
            clearTimeout(timer);
            navigator.clipboard.writeText(code.textContent).then(function () {
                status.classList.remove('is-error');
                status.textContent = 'Copied ' + version.textContent + ' to the clipboard.';
            }, function () {
                status.classList.add('is-error');
                status.textContent = 'Copy failed. Select the snippet and copy it by hand.';
            }).then(function () {
                timer = setTimeout(function () { status.textContent = ''; }, 4000);
            });
        });
    }
})();
