---
layout: news_archive
title: Apache Wicket News
subtitle: Releases, Security updates and more&mdash;all in one neat feed.
preamble: The news is published in several venues. All announcements are sent to the Apache announcement mailing list, our announcement, user and development mailing lists, the news feed of this website and of course this website.
---
{% comment %} The current year with excerpts; earlier years as a list of titles and dates. Each year also has its own page (/news/YYYY/). {% endcomment %}
{% for year in site.years %}
{% assign y = year.first.first.date | date: "%Y" %}
{% if forloop.first %}
<h2 id="news-{{ y }}">All News for {{ y }}</h2>

<p>This section contains all news items published in <a href="{{site.baseurl}}/news/{{ y }}/">{{ y }}</a>.</p>

{% for month in year %}{% for post in month %}
<article>
    <h3><a href="{{ site.baseurl }}{{post.url}}">{{post.title}}</a></h3>
    <small>{{post.date | date_to_string}}</small>
    <p>{{ post.content | markdownify | strip_html | truncatewords:50 }}</p>
</article>
{% endfor %}{% endfor %}
{% else %}
<h2 id="news-{{ y }}">{{ y }}</h2>
<ol class="news-titles">
{% for month in year %}{% for post in month %}
    <li><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%-d %b" }}</time> <a href="{{ site.baseurl }}{{post.url}}">{{post.title}}</a></li>
{% endfor %}{% endfor %}
</ol>
{% endif %}
{% endfor %}
