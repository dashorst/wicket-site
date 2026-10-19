---
layout: home
title:
description: Apache Wicket is an open source, component-oriented Java web framework. Pages are Java components bound to plain HTML, with no JavaScript build chain.
additionalContents:
  -
   header: builtwithwicket--header.html
---
{% comment %}
  The homepage: the arrival hall (the departure board with what Wicket is at its head, and beside it
  the ticket with the one primary action and the Maven dependency of every line in service), the
  blog's featured posts, why Wicket as a route of stops with real code, the projects built with it,
  the five lessons and how to take part.
  The release facts come from _data/releases.yml, _config.yml and the line pages' front matter;
  nothing here changes on release day.
{% endcomment %}
{% capture board_head %}
        <h1 class="board-title">Build web applications from Java components and plain&nbsp;HTML</h1>
        <div class="board-intro">
            <p class="board-lede">Apache Wicket is a component-oriented Java web framework, open source since 2004 and a project of the Apache Software Foundation since 2007. Every component keeps its behaviour and state in Java and its markup in plain HTML, so there is no JavaScript build chain to maintain.</p>
        </div>
{% endcapture %}
{% assign first_line = site.data.releases.lines | where: "status", "lts" | first %}
<section class="home-arrivals">
    <div class="home-inner home-arrivals-inner">
        {% include departures.html head=board_head %}

        <aside class="ticket" aria-labelledby="ticket-title">
            <div class="ticket-main">
                <h2 id="ticket-title" class="ticket-title">Start a project</h2>
                <p>Generate a ready-to-run Maven project with the quick start, or add Wicket to the build you already have.</p>
                <a class="button ticket-action" href="{{ site.baseurl }}/start/quickstart.html">Open the quick start</a>
            </div>
            <div class="ticket-stub">
                <h3 class="ticket-stub-title">Maven dependency</h3>
                {% comment %} One snippet per line in service, the LTS first. Only the first is shown in full: the others differ in their version and requirements, and copy their own snippet. {% endcomment %}
                {% assign shown = false %}
                {% for line in site.data.releases.lines %}{% unless line.status == 'lts' or line.status == 'current' %}{% continue %}{% endunless %}{% assign v = site.wicket[line.config] %}{% assign line_page = site.pages | where: "url", line.page | first %}
                <div class="ticket-snippet">
                    <div class="ticket-stub-head">
                        <p class="ticket-snippet-label"><strong>{{ v }}</strong>{% if line.service == 'lts' %} <span class="plate plate-lts" title="Long-term support">LTS</span>{% endif %} {{ line.role | downcase }}</p>
                        <button type="button" class="ticket-copy" data-copy="maven-{{ line.series }}" aria-label="Copy the Maven dependency for Wicket {{ v }}" hidden>Copy</button>
                    </div>
<pre class="ticket-code"{% if shown %} hidden{% endif %}><code id="maven-{{ line.series }}"><span class="ticket-code-comment"><span>&lt;!-- Apache Wicket {{ line.series }}.x{% if line.status == 'lts' %} LTS{% endif %}:</span> <span>Java {{ line_page.java }}+,</span> <span>{{ line_page.servlet | replace: ' or newer', '+' }} --&gt;</span></span>
&lt;dependency&gt;
    &lt;groupId&gt;org.apache.wicket&lt;/groupId&gt;
    &lt;artifactId&gt;wicket-core&lt;/artifactId&gt;
    &lt;version&gt;{{ v }}&lt;/version&gt;
&lt;/dependency&gt;</code></pre>
                </div>
                {% assign shown = true %}
                {% endfor %}
                <ul class="ticket-links">
                    <li><a href="{{ site.baseurl }}{{ first_line.page }}#manually">Source and binary downloads</a></li>
                    <li><a href="{{ site.baseurl }}/versions/#upgrade-paths">Upgrading from an earlier version</a></li>
                </ul>
            </div>
        </aside>
    </div>
</section>

<section class="home-section home-news" aria-labelledby="blog">
    <div class="home-inner">
        <h2 id="blog">From the blog</h2>
        {% include post-list.html posts=site.posts featured=3 rows=0 days=400 %}
    </div>
</section>

<section class="home-section home-why" aria-labelledby="why">
    <div class="home-inner">
        <h2 id="why">Why Wicket</h2>
        <ol class="route-stops">
            <li class="route-stop">
                <div class="route-text">
                    <h3>A page is a Java class and an HTML file</h3>
                    <p>Use what you know about Java and your favourite HTML editor. Behaviour lives in Java, markup stays plain HTML, and no JavaScript build is needed.</p>
                    <ul class="route-notes">
                        <li>The <code>wicket:id</code> joins each tag to the Java component with the same id. The HTML stays plain HTML that any editor opens.</li>
                        <li>A click runs <code>onClick()</code> on the server, and Wicket renders the page again.</li>
                        <li>The field <code>clicks</code> keeps its value between requests, because Wicket keeps the page object for you.</li>
                        <li>A part you reuse on many pages is a <code>Panel</code>: again a Java class and an HTML file. <a href="{{ site.baseurl }}/docs/topics/components.html">Components and markup</a> shows how.</li>
                    </ul>
                    <p class="home-more"><a href="{{ site.live_examples_url }}">See the examples running</a></p>
                </div>
                <div class="route-code">
                    <p class="route-file">HomePage.java</p>
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
                    <p class="route-file">HomePage.html</p>
{% highlight html %}
<p>
  You clicked <span wicket:id="clicks">0</span> times.
  <a wicket:id="count">Click me</a>
</p>
{% endhighlight %}
                </div>
            </li>

            <li class="route-stop">
                <div class="route-text">
                    <h3>Components for complex pages</h3>
                    <p>Pages and components are real Java objects with encapsulation, inheritance and events. Build a panel once and use it on every page, and bundle a component with its stylesheets, JavaScript and other resources into one reusable package.</p>
                </div>
                <div class="route-code">
                    <p class="route-file">AddressPanel.java</p>
{% highlight java %}
public class AddressPanel extends Panel {
    public AddressPanel(String id, IModel<Address> address) {
        super(id, new CompoundPropertyModel<>(address));
        add(new TextField<String>("street"));
        add(new TextField<String>("city"));
    }
}

// one component, used twice on the same form
form.add(new AddressPanel("billing", billingAddress));
form.add(new AddressPanel("shipping", shippingAddress));
{% endhighlight %}
                </div>
            </li>

            <li class="route-stop">
                <div class="route-text">
                    <h3>Ajax without writing JavaScript</h3>
                    <p>Update selected parts of a page from Java, without a single line of JavaScript. An Ajax request re-renders only the components you add to it, and Wicket comes with a large set of ready-made Ajax components.</p>
                </div>
                <div class="route-code">
                    <p class="route-file">CounterPage.java</p>
{% highlight java %}
Label count = new Label("count", () -> clicks);
add(count.setOutputMarkupId(true));

add(new AjaxLink<Void>("increment") {
    @Override
    public void onClick(AjaxRequestTarget target) {
        clicks++;
        target.add(count);
    }
});
{% endhighlight %}
                </div>
            </li>

            <li class="route-stop">
                <div class="route-text">
                    <h3>Secure by default</h3>
                    <p>URLs do not expose sensitive information and component paths are session-relative. Wicket supports a Content Security Policy without <code>unsafe-inline</code>: it adds a nonce to every header contribution itself, and you add only the sources your application needs. <a href="{{ site.baseurl }}/docs/csp.html">Configure the Content Security Policy</a> shows how.</p>
                </div>
                <div class="route-code">
                    <p class="route-file">MyApplication.java</p>
{% highlight java %}
@Override
protected void init() {
    super.init();
    // the default policy allows images from your own origin;
    // allow one extra image host
    getCspSettings().blocking()
        .add(CSPDirective.IMG_SRC,
             "https://images.example.com");
}
{% endhighlight %}
                </div>
            </li>

            <li class="route-stop">
                <div class="route-text">
                    <h3>Tested without a browser</h3>
                    <p>WicketTester renders your pages and components in a unit test, without a browser or a container, and checks their markup, attributes and contents. It clicks links and submits forms as a visitor would.</p>
                </div>
                <div class="route-code">
                    <p class="route-file">HomePageTest.java</p>
{% highlight java %}
WicketTester tester = new WicketTester(new MyApplication());
tester.startPage(HomePage.class);
tester.assertLabel("clicks", "0");

tester.clickLink("count");
tester.assertLabel("clicks", "1");
{% endhighlight %}
                </div>
            </li>
        </ol>

        <div class="route-also">
            <h3>Also included</h3>
            <ul>
                <li>Translations in over 25 languages</li>
                <li>Safe use of multiple tabs and windows</li>
                <li>Injection with CDI, Spring and Guice</li>
                <li>Jakarta EE integration</li>
                <li>Component-local JavaScript and CSS</li>
            </ul>
        </div>
        <p class="home-also">Coming from Spring MVC, Jakarta Faces or Vaadin? <a href="{{ site.baseurl }}/docs/why-wicket.html">Why component-oriented</a> compares Wicket with request-based and other component frameworks, what it gains and what it costs, and the <a href="{{ site.baseurl }}/docs/glossary.html">glossary</a> gives each Wicket term with what other frameworks call it.</p>
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
            <p>The lessons build one application, from an empty project to a tested page with Ajax.</p>
            <p class="home-more"><a href="{{ site.baseurl }}/docs/#start">Start here in the documentation</a></p>
        </div>
        {% assign tutorials = site.guide | where: "type", "tutorial" | sort: "order", "last" %}
        <ol class="guide-route home-lessons">
        {% for doc in tutorials %}
            <li><a class="guide-list-title" href="{{ site.baseurl }}{{ doc.url }}">{{ doc.title }}</a></li>
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
