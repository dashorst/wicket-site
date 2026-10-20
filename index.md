---
layout: home
title:
description: Apache Wicket is an open source, component-oriented Java web framework. Pages are Java components bound to plain HTML, with no JavaScript build chain.
---
{% comment %}
  The homepage: what Wicket is with the release lines beside it, the blog, the reveal (a page's
  component tree built step by step), why Wicket, the projects built with it, the five lessons
  and how to take part.
  The release facts come from _data/releases.yml and _config.yml; nothing here changes on release day.
  The lines in service run in the order of the data file, the LTS first; then the lines that have
  reached end of life. Scheduled releases are on /versions/, not here.
{% endcomment %}
{% assign eol_lines = site.data.releases.lines | where: "status", "eol" %}
<section class="home-hero" aria-labelledby="home-title">
    <div class="home-inner home-hero-inner">
        <div class="home-hero-text">
            <h1 id="home-title">Build web applications from Java components and plain&nbsp;HTML</h1>
            <p class="home-lead">Apache Wicket is a component-oriented Java web framework, open source since 2004 and a project of the Apache Software Foundation since 2007. Every component keeps its behaviour and state in Java and its markup in plain HTML, so there is no JavaScript build chain to maintain.</p>
            <p class="home-actions">
                <a class="go" href="{{ site.baseurl }}/start/quickstart.html">Get started</a>
            </p>
        </div>
        <div class="board home-board">
            <h2 class="board-title">Releases</h2>
            <table>
                <caption class="visually-hidden">The Apache Wicket release lines in service, until when each is supported, and the lines that have reached end of life</caption>
                <tbody>
                    <tr class="grp"><th scope="rowgroup" colspan="3">In service</th></tr>
                    {% for line in site.data.releases.lines %}{% unless line.status == 'lts' or line.status == 'current' %}{% continue %}{% endunless %}
                    <tr>
                        <th scope="row"><a href="{{ site.baseurl }}{{ line.page }}">Wicket {{ line.series }}</a>{% if line.service == 'lts' %} <span class="tag tag-lts" title="Long-term support">LTS</span>{% endif %}{% if line.role %} <span class="tag tag-current">{{ line.role }}</span>{% endif %}</th>
                        <td class="v">{{ site.wicket[line.config] }}</td>
                        <td class="d">supported until <span>{{ line.support | split: ', ' | last | remove: 'Until ' }}</span></td>
                    </tr>
                    {% endfor %}
                </tbody>
                {% if eol_lines.size > 0 %}
                <tbody>
                    <tr class="grp"><th scope="rowgroup" colspan="3">End of life</th></tr>
                    {% for line in eol_lines %}
                    <tr class="ended">
                        <th scope="row"><a href="{{ site.baseurl }}{{ line.page }}">Wicket {{ line.series }}</a></th>
                        <td class="v">{{ site.wicket[line.config] }}</td>
                        <td class="d">ended <span>{{ line.when | split: ' to ' | last }}</span></td>
                    </tr>
                    {% endfor %}
                </tbody>
                {% endif %}
            </table>
            <p class="board-all">{% if eol_lines.size > 0 %}<a href="{{ site.baseurl }}/versions/#upgrade-paths">Upgrade paths</a>{% endif %}<a href="{{ site.baseurl }}/versions/">All releases and downloads</a></p>
        </div>
    </div>
</section>

<section class="home-news" aria-labelledby="blog">
    <div class="home-inner">
        <h2 id="blog">From the blog</h2>
        {% include post-list.html posts=site.posts featured=3 rows=0 days=400 %}
    </div>
</section>

{% include home-reveal.html %}

<section class="home-section" aria-labelledby="why">
    <header class="sec-head">
        <h2 id="why">Why Wicket</h2>
        <p>Coming from Spring MVC, Jakarta Faces or Vaadin? <a href="{{ site.baseurl }}/docs/why-wicket.html">Why component-oriented</a> compares Wicket with request-based and other component frameworks, what it gains and what it costs, and the <a href="{{ site.baseurl }}/docs/glossary.html">glossary</a> gives each Wicket term with what other frameworks call it.</p>
    </header>
    <ul class="home-why">
        <li>
            <h3>Just Java and HTML</h3>
            <p>Use what you know about Java and your favourite HTML editor. Behaviour lives in Java, markup stays plain HTML, and no JavaScript build is needed.</p>
        </li>
        <li>
            <h3>Secure by default</h3>
            <p>URLs do not expose sensitive information and component paths are session-relative. Wicket supports a Content Security Policy without <code>unsafe-inline</code>: it adds a nonce to every header contribution itself.</p>
        </li>
        <li>
            <h3>Ajax without writing JavaScript</h3>
            <p>Update selected parts of a page without a single line of JavaScript, with a large set of ready-made Ajax components.</p>
        </li>
        <li>
            <h3>Components you can reuse</h3>
            <p>Pages and components are real Java objects with encapsulation, inheritance and events. Bundle a component with its stylesheets, JavaScript and other resources into one reusable package.</p>
        </li>
        <li>
            <h3>Tests without a browser</h3>
            <p>WicketTester renders your pages and components in a unit test, without a browser or a container, and checks their markup, attributes and contents.</p>
        </li>
        <li>
            <h3>Stable for the long run</h3>
            <p>Open source under the Apache License since 2004. Breaking changes only when needed, deprecated alternatives kept where possible, and every change documented in the migration guide.</p>
        </li>
    </ul>
    <p class="home-also"><span>Also included:</span> translations in over 25 languages, safe use of multiple tabs and windows, injection with CDI, Spring and Guice, Jakarta EE integration, and component-local JavaScript and CSS.</p>
</section>

{% comment %} Names from the Built with Wicket feed, kept in _data/builtwith.yml. {% endcomment %}
<section class="home-section built" aria-labelledby="bww-title">
    <header class="sec-head">
        <h2 id="bww-title">Built with Wicket</h2>
        <p>Many applications run on Wicket without saying so. These say so, collected through the <a href="{{ site.data.builtwith.feed }}" rel="nofollow">Built with Wicket</a> feed. <a href="{{ site.data.builtwith.submit }}" rel="nofollow">Submit your own project</a>.</p>
    </header>
    <ul class="names">
    {% for item in site.data.builtwith.names %}
        <li>{{ item.name }} <span>{{ item.what }}</span></li>
    {% endfor %}
    </ul>
</section>

<section class="home-section" aria-labelledby="learn">
    <header class="sec-head">
        <h2 id="learn">Learn Wicket in five lessons</h2>
        <p>The lessons build one application, from an empty project to a tested page with Ajax. Every page of the <a href="{{ site.baseurl }}/docs/">documentation</a> says which Wicket versions it covers.</p>
    </header>
    {% assign tutorials = site.guide | where: "type", "tutorial" | sort: "order", "last" %}
    <ol class="home-lessons">
    {% for doc in tutorials %}
        <li><a href="{{ site.baseurl }}{{ doc.url }}"><span class="home-lesson-n">{% if forloop.index < 10 %}0{% endif %}{{ forloop.index }}</span><span class="home-lesson-title">{{ doc.title }}</span></a></li>
    {% endfor %}
    </ol>
    <p class="home-more"><a href="{{ site.baseurl }}/docs/#start">Start here, in the documentation</a></p>
</section>

<section class="home-section home-involved" aria-labelledby="involved">
    <header class="sec-head">
        <h2 id="involved">Built by the people who use it</h2>
        <p>Apache Wicket is developed in the open by volunteers. Answer a question on the users list, report a bug with a quickstart, improve the documentation, or send a pull request to <a href="https://github.com/apache/wicket">apache/wicket</a>: a committer reviews it, and it goes out with the next release of its line.</p>
    </header>
    <p class="home-more"><a href="{{ site.baseurl }}/contribute/">How to contribute</a><a href="{{ site.baseurl }}/community/">Community and support</a></p>
</section>
