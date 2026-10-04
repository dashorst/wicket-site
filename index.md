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
        {% assign upgrade_url = site.baseurl | append: '/start/download.html#upgrade-paths' %}
        {% include departures.html heading="h1" hero=true upgrade=upgrade_url lede="A component-oriented Java web framework: plain Java, plain HTML, no JavaScript build chain." %}

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
                    <li><a href="{{ site.baseurl }}/start/download.html#upgrade-paths">Upgrading from an earlier version</a></li>
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

<section class="builtwithwicket" id="builtwithwicket" aria-labelledby="bww-title">
    {% include builtwithwicket.html %}
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

