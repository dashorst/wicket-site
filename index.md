---
layout: home
title:
pageclasses: index
---
{% assign featured = site.data.releases.featured %}
<section class="hero" aria-labelledby="title">
    <h1 class="lockup" id="title">
        <img class="lockup-mark" src="{{ site.baseurl }}/img/logo-apachewicket-mark.svg" alt="" width="64" height="64">
        <span class="lockup-name">Apache Wicket</span>
        <span class="lockup-v"><span class="vh">, version </span>{{ featured }}</span>
    </h1>
    <p class="definition">A component-oriented Java web framework: plain Java, plain HTML, no JavaScript build chain.</p>
    {% include install.html %}
</section>

{% comment %} What's new: the headlines live in _data/news_strip.yml. {% endcomment %}
<section class="strip" aria-label="What's new">
    <div class="strip-in">
        <ul class="strip-news">
            {% for item in site.data.news_strip %}{% assign first = item.url | slice: 0 %}
            <li><a href="{% if first == '/' %}{{ site.baseurl }}{% endif %}{{ item.url }}"><span class="strip-title">{{ item.title }}</span>{% if item.note %}<span class="strip-note">{{ item.note }}</span>{% endif %}</a></li>
            {% endfor %}
        </ul>
    </div>
</section>

{% include home-reveal.html %}

<section class="stable" id="stable" aria-labelledby="stable-title">
    <div class="stable-text">
        <header class="sec-head">
            <h2 id="stable-title">Stable since 2005</h2>
            <p>Open source since 2004, Wicket 1.0 came out on SourceForge in 2005. The component model it introduced is the one you just used.</p>
        </header>
        <dl class="facts">
            <div><dt>An Apache project</dt><dd>Developed in the open at the Apache Software Foundation by a community of volunteers, under the Apache License&nbsp;2.0.</dd></div>
            <div><dt>A stable API</dt><dd>Breaking changes only when needed, deprecated alternatives kept where possible, and every change documented in the migration guide.</dd></div>
            <div><dt>Long-term support</dt><dd>Every fourth major release is an LTS, supported until the next LTS. At most two release lines are maintained at once.</dd></div>
            <div><dt>Migration recipes</dt><dd>OpenRewrite recipes in <code>wicket-migration</code> take care of the mechanical part of an upgrade.</dd></div>
        </dl>
    </div>
    {% assign upgrade_url = site.baseurl | append: '/start/download.html#upgrade-paths' %}
    {% include release-board.html compact=true upgrade=upgrade_url %}
</section>

<section class="new11" id="new" aria-labelledby="new-title">
    <header class="sec-head">
        <h2 id="new-title">New in Wicket {{ featured }}</h2>
        <p>{{ site.data.highlights[featured].intro }} <a href="{{ site.baseurl }}/start/wicket-{{ featured }}.x.html">Everything about Wicket {{ featured }}</a></p>
    </header>
    {% include highlights.html home=true %}
</section>

{% comment %} Names from the Built with Wicket feed, kept in _data/builtwith.yml. {% endcomment %}
<section class="built" id="built" aria-labelledby="built-title">
    <header class="sec-head">
        <h2 id="built-title">Built with Wicket</h2>
        <p>Teams that submitted their application to the Built with Wicket feed.</p>
    </header>
    <ul class="names">
    {% for item in site.data.builtwith.names %}
        <li>{{ item.name }} <span>{{ item.what }}</span></li>
    {% endfor %}
    </ul>
    <p class="built-links"><a href="{{ site.data.builtwith.feed }}" rel="nofollow">More on Built with Wicket</a> <a href="{{ site.data.builtwith.submit }}" rel="nofollow">Submit your project</a></p>
</section>

{% comment %} Where to go once Wicket runs: the guides and help, for teams already on Wicket. {% endcomment %}
<nav class="onward" aria-label="Documentation and help">
    <ul>
        <li><a href="{{ site.baseurl }}/learn/#guide"><span class="onward-title">User guide</span><span class="onward-note">From a first page to advanced topics</span></a></li>
        <li><a href="{{ site.baseurl }}/learn/#migrations"><span class="onward-title">Migration guides</span><span class="onward-note">Every API change between major versions</span></a></li>
        <li><a href="{{ site.baseurl }}/help/"><span class="onward-title">Help and support</span><span class="onward-note">Mailing lists and commercial support</span></a></li>
    </ul>
</nav>
