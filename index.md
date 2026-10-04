---
layout: home
title:
pageclasses: index
additionalContents:
  -
   header: builtwithwicket--header.html
---
<div class="home-arrivals">
    <div class="home-arrivals-inner">
        {% include departures.html heading="h1" compact=true upgrade="#connections-title" action="Open the quick start" action_url="start/quickstart.html" lede="A component-oriented Java web framework: plain Java, plain HTML, no JavaScript build chain." %}

        <aside class="ticket" aria-labelledby="ticket-title">
            <div class="ticket-main">
                <h2 id="ticket-title" class="ticket-title">Start a project</h2>
                <p>Generate a ready-to-run Maven project with the quick start, or add Wicket to the build you already have.</p>
                <a class="button ticket-action" href="{{ site.baseurl }}/start/quickstart.html">Open the quick start</a>
            </div>
            <div class="ticket-stub">
                <h3 class="ticket-stub-title">Maven dependency</h3>
                {% comment %} One snippet per line in service. Only the first is shown in full: the others differ only in their version and copy their own snippet. {% endcomment %}
                {% assign shown = false %}
                {% for line in site.data.releases.lines %}{% unless line.status == 'lts' or line.status == 'current' %}{% continue %}{% endunless %}{% assign v = site.wicket[line.config] %}
                <div class="ticket-snippet">
                    <div class="ticket-stub-head">
                        <p class="ticket-snippet-label"><strong>{{ v }}</strong>{% if line.service == 'lts' %} <span class="plate plate-lts" title="Long-term support">LTS</span>{% endif %} {{ line.role | downcase }}</p>
                        <button type="button" class="ticket-copy" data-copy="#maven-{{ line.series }}" aria-label="Copy the {{ v }} dependency" hidden>Copy</button>
                    </div>
<pre class="ticket-code"{% if shown %} hidden{% endif %}><code id="maven-{{ line.series }}">&lt;dependency&gt;
    &lt;groupId&gt;org.apache.wicket&lt;/groupId&gt;
    &lt;artifactId&gt;wicket-core&lt;/artifactId&gt;
    &lt;version&gt;{{ v }}&lt;/version&gt;
&lt;/dependency&gt;</code></pre>
                </div>
                {% assign shown = true %}
                {% endfor %}
                <ul class="ticket-links">
                    <li><a href="{{ site.baseurl }}/start/download.html">Source and binary downloads</a></li>
                    <li><a href="#connections-title">Upgrading from an earlier version</a></li>
                </ul>
            </div>
        </aside>
    </div>
</div>

<section class="route" aria-labelledby="route-title">
    <header class="route-head">
        <h2 id="route-title">Why Wicket</h2>
        <p>Wicket is a component-oriented, server-side Java web framework. Open source since 2004 and developed at the Apache Software Foundation, it powers long-lived applications that need complex, dynamic pages without a JavaScript build chain.</p>
    </header>

    <ol class="route-stops">
        <li class="route-stop">
            <div class="route-text">
                <h3>Plain Java and plain HTML</h3>
                <p>Markup stays HTML that opens in any editor. Behaviour lives in Java. A <code>wicket:id</code> attribute binds a tag to a component, and that is the whole contract: no template language, no JavaScript toolchain.</p>
            </div>
            <div class="route-code">
                <p class="route-file">HelloWorld.html</p>
{% highlight html %}
<h1 wicket:id="message">Message goes here</h1>
{% endhighlight %}
                <p class="route-file">HelloWorld.java</p>
{% highlight java %}
public class HelloWorld extends WebPage {
    public HelloWorld() {
        add(new Label("message", "Hello World!"));
    }
}
{% endhighlight %}
            </div>
        </li>

        <li class="route-stop">
            <div class="route-text">
                <h3>Components for complex pages</h3>
                <p>Pages and components are real Java objects with encapsulation, inheritance and events. Build a panel once, with its own markup, styles and scripts, and reuse it on every page, or ship a whole component library as a JAR.</p>
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
                <p>Update parts of a page from Java. Wicket's Ajax components re-render only the components you add to the request, and come with a solid set of building blocks.</p>
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
                <p>Component paths are session-relative and URLs do not expose your model. Wicket supports a strict Content Security Policy without <code>unsafe-inline</code>: every header contribution gets a nonce automatically. You only add what your application needs.</p>
            </div>
            <div class="route-code">
                <p class="route-file">MyApplication.java</p>
{% highlight java %}
@Override
protected void init() {
    super.init();
    // CSP is on by default; allow one extra image host
    getCspSettings().blocking()
        .add(CSPDirective.IMG_SRC, "https://images.example.org");
}
{% endhighlight %}
            </div>
        </li>

        <li class="route-stop">
            <div class="route-text">
                <h3>Tested without a browser</h3>
                <p>WicketTester renders pages and components in a plain unit test: no browser, no container. Check the rendered markup, click links, submit forms.</p>
            </div>
            <div class="route-code">
                <p class="route-file">HelloWorldTest.java</p>
{% highlight java %}
WicketTester tester = new WicketTester(new MyApplication());
tester.startPage(HelloWorld.class);
tester.assertLabel("message", "Hello World!");
{% endhighlight %}
            </div>
        </li>
    </ol>

    <div class="route-also">
        <h3>Also included</h3>
        <dl>
            <div><dt>Internationalized</dt><dd>Over 25 languages out of the box, with translations per application, page or component.</dd></div>
            <div><dt>Many tabs, one session</dt><dd>Automatic page state storage lets users open pages in new tabs and windows safely.</dd></div>
            <div><dt>Dependency injection</dt><dd>Integrations for CDI, Spring and Guice.</dd></div>
            <div><dt>Jakarta EE</dt><dd>Use JPA, EJB, Bean Validation and CDI through Wicket's integrations.</dd></div>
            <div><dt>Your JavaScript and CSS</dt><dd>Global libraries mix cleanly with component-local resources.</dd></div>
            <div><dt>Apache License 2.0</dt><dd>One of the most permissive open source licenses, since day one.</dd></div>
        </dl>
    </div>
</section>

{% assign featured = site.data.releases.featured %}
<section class="home-new" aria-labelledby="new-title">
    <header class="home-new-head">
        <div class="home-new-title">
            <h2 id="new-title">New in Wicket {{ featured }}</h2>
            <a class="home-new-more" href="{{ site.baseurl }}/start/wicket-{{ featured }}.x.html">Everything about Wicket {{ featured }}</a>
        </div>
        <p>{{ site.data.highlights[featured].intro }}</p>
    </header>
    {% include highlights.html home=true %}
</section>

<section class="connections" aria-labelledby="connections-title">
    <h2 id="connections-title">Upgrade paths</h2>
    <p class="connections-intro">Two lines run at any time. The LTS is the line for production: it receives security and bug fixes until the next LTS, a year later. The quarterly release brings new features and receives fixes until the next one replaces it. Features are developed on <code>main</code> and carry forward into every release that follows.</p>
    <table class="connections-table">
        <thead>
            <tr>
                <th scope="col">You are on</th>
                <th scope="col">Your route</th>
                <th scope="col">Guide</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">Wicket 8.x or 9.x</th>
                <td>
                    <p class="connections-route">8.x &rarr; 9 (Java 11) &rarr; 10 LTS (Java 17) &rarr; 14 LTS, July 2027</p>
                    <p>End of life since Wicket 11.0.0: no more releases, not even security fixes. For production, move to 10 LTS: it brings <code>jakarta.servlet</code>, is supported until July 2027, and hands over to 14, the next LTS. 9.x moves to 10 directly; 8.x takes the Wicket 9 step first. To follow new features instead, continue from 10 to 11, which needs Java 21.</p>
                </td>
                <td>
                    <a href="https://s.apache.org/wicket9migration">Migration to Wicket 9</a><br>
                    <a href="https://s.apache.org/wicket10migrate">Migration to Wicket 10</a>
                </td>
            </tr>
            <tr>
                <th scope="row">Wicket 10.x</th>
                <td>Stay on the LTS until Wicket 14, the next LTS, ships in July 2027. Moving to 11 for its new features means Java 21 and Jakarta Servlet 6.1.</td>
                <td><a href="{{ site.baseurl }}/start/wicket-11.x.html#new">New in Wicket 11</a></td>
            </tr>
            <tr>
                <th scope="row">Starting out</th>
                <td>Start on the LTS when the application should change slowly, or on 11 to get new features every quarter.</td>
                <td><a href="{{ site.baseurl }}/start/quickstart.html">Quick start</a></td>
            </tr>
        </tbody>
    </table>
    <p class="connections-more"><a href="{{ site.baseurl }}/start/download.html#release-policy">How the release schedule works</a></p>
</section>

<section class="announcements" aria-labelledby="announcements-title">
    <div class="announcements-head">
        <h2 id="announcements-title">Announcements</h2>
        <p class="announcements-links"><a href="{{ site.baseurl }}/news">News archive</a> <a type="application/atom+xml" href="{{ site.baseurl }}/atom.xml">Atom feed</a></p>
    </div>
    <ol class="announcements-list">
    {% for post in site.posts limit:5 %}
        <li>
            <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%-d %b %Y" }}</time>
            <div>
                <h3><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h3>
                {% if forloop.first %}<p>{{ post.excerpt | strip_html | truncatewords: 45 }}</p>{% endif %}
            </div>
        </li>
    {% endfor %}
    </ol>
</section>

<section class="builtwithwicket" id="builtwithwicket" aria-labelledby="bww-title">
    {% include builtwithwicket.html %}
</section>
