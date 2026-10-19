---
layout: home
title:
description: Apache Wicket is an open source, component-oriented Java web framework. Pages are Java components bound to plain HTML, with no JavaScript build chain.
additionalContents:
  -
   header: builtwithwicket--header.html
---
{% comment %}
  The homepage: the departure board of release lines with what Wicket is at its head, how a page works, why to choose it, where to start,
  where existing users find their release line, the projects built with it, the latest releases and how to take part. The blog's featured posts follow the hero, so the project's news is on the first screens.
  The release facts come from _data/releases.yml and _config.yml; nothing here changes on release day.
{% endcomment %}
{% capture board_head %}
        <h1 class="board-title">Build web applications from Java components and plain&nbsp;HTML</h1>
        <div class="board-intro">
            <p class="board-lede">Apache Wicket is an open source, component-oriented Java web framework, developed at the Apache Software Foundation since 2004. Every component keeps its behaviour and state in Java and its markup in plain HTML, so there is no JavaScript build chain to maintain.</p>
            <p class="home-actions">
                <a class="button" href="{{ site.baseurl }}/start/quickstart.html">Get started</a>
                <a class="home-action-alt" href="{{ site.baseurl }}/docs/first-application.html">Build your first application</a>
            </p>
        </div>
{% endcapture %}
<section class="home-arrivals">
    <div class="home-inner">
        {% include departures.html head=board_head %}
    </div>
</section>

<section class="home-section home-code" aria-labelledby="how">
    <div class="home-inner">
        <h2 id="how">A page is a Java class and an HTML file</h2>
        <div class="home-code-pair">
            <figure>
                <figcaption>HomePage.java</figcaption>
{% highlight java %}
public class HomePage extends WebPage {
    private int clicks;

    public HomePage() {
        add(new Link<Void>("count") {
            @Override
            public void onClick() {
                clicks++;
            }
        });
        add(new Label("clicks", () -> clicks));
    }
}
{% endhighlight %}
            </figure>
            <figure>
                <figcaption>HomePage.html</figcaption>
{% highlight html %}
<p>
  You clicked <span wicket:id="clicks">0</span> times.
  <a wicket:id="count">Click me</a>
</p>
{% endhighlight %}
                <ul class="home-code-notes">
                    <li>The <code>wicket:id</code> joins each tag to the Java component with the same id. The HTML stays plain HTML that any editor opens.</li>
                    <li>A click runs <code>onClick()</code> on the server, and Wicket renders the page again.</li>
                    <li>The field <code>clicks</code> keeps its value between requests, because Wicket keeps the page object for you.</li>
                </ul>
                <p class="home-more"><a href="{{ site.live_examples_url }}">See the examples running</a></p>
            </figure>
        </div>
    </div>
</section>

<section class="home-section home-news" aria-labelledby="blog">
    <div class="home-inner">
        <h2 id="blog">From the blog</h2>
        {% include post-list.html posts=site.posts featured=3 rows=0 days=400 %}
    </div>
</section>

<section class="home-section" aria-labelledby="why">
    <div class="home-inner">
        <h2 id="why">Why Wicket</h2>
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
    </div>
</section>

<section class="home-section" id="builtwithwicket" aria-labelledby="bww-title">
    <div class="home-inner">
        {% include builtwithwicket.html %}
    </div>
</section>

<section class="home-section" aria-labelledby="learn">
    <div class="home-inner home-split">
        <div>
            <h2 id="learn">Learn Wicket in five lessons</h2>
            <p>The lessons build one application, from an empty project to a tested page with Ajax. Every page of the <a href="{{ site.baseurl }}/docs/">documentation</a> says which Wicket versions it covers.</p>
        </div>
        {% assign tutorials = site.guide | where: "type", "tutorial" | sort: "order", "last" %}
        <ol class="guide-route home-lessons">
        {% for doc in tutorials %}
            <li>
                <a class="guide-list-title" href="{{ site.baseurl }}{{ doc.url }}">{{ doc.title }}</a>
                <span class="guide-list-summary">{{ doc.summary }}</span>
            </li>
        {% endfor %}
        </ol>
    </div>
</section>

<section class="home-section home-involved" aria-labelledby="involved">
    <div class="home-inner">
        <h2 id="involved">Built by the people who use it</h2>
        <p class="home-section-lead">Apache Wicket is developed in the open by volunteers. Answer a question on the users list, report a bug with a quickstart, improve the documentation, or send a pull request to <a href="https://github.com/apache/wicket">apache/wicket</a>: a committer reviews it, and it goes out with the next release of its line.</p>
        <p class="home-more"><a href="{{ site.baseurl }}/contribute/">How to contribute</a> · <a href="{{ site.baseurl }}/community/">Community and support</a></p>
    </div>
</section>
