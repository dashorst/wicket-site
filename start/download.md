---
layout: default
title: Download Apache Wicket
subtitle: Get Wicket from Maven Central, or as source and binary packages
preamble: Wicket is released as a source archive, convenience binaries and through the Maven Central Repository. The most convenient way of getting Wicket is through the Maven dependency management system.
---

{% include release-board.html %}

If your application is not on a supported line, consider upgrading at your earliest
convenience. Released lines link to their own download page.

---

## Upgrade paths {#upgrade-paths}

How to move an application from an earlier release line to a supported one.

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

---

## Release Policy

Since Wicket 11.0.0, released in October 2026, Wicket follows a time-based release
schedule: a new major release every three months, and every fourth major release
&mdash; once a year &mdash; is a long term support (LTS) release. The
board above shows the schedule.

Two release lines are maintained at any time:

* the current **LTS** release, which receives security fixes and applicable bug fixes
  until the next LTS release;
* the current **quarterly** release, which receives fixes until the next quarterly
  release supersedes it. Fixes normally ride along with that next release; a serious
  issue may warrant a patch release, for example 13.0.1.

The support window applies to the release line, not to individual features. Features are
developed on `main` and carry over into every following release, so a feature introduced
in Wicket 11 is also present in 12, 13 and in the next LTS, Wicket 14.

Wicket 10 is the current LTS and stays supported until Wicket 14 is released in the first
week of July 2027. Wicket 8.x and 9.x reached end of life with the release of 11.0.0, and
with them Wicket's support for the `javax.servlet` API.


The full announcement is in our news archive:
[A new release cadence for Apache Wicket]({{site.baseurl}}/news/2026/09/11/release-cadence.html).

---

## Unsupported Releases

The following releases are no longer supported by the Wicket team: they have
reached end of life and receive no more releases, not even security fixes.
If your project still depends on one of them, upgrade to 10.x LTS or 11.x; the
[upgrade paths](#upgrade-paths) show the route.

<table class="eol-table">
    <thead>
        <tr>
            <th scope="col">Version</th>
            <th scope="col">Latest release</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row"><a href="wicket-9.x.html">Wicket 9.x</a></th>
            <td>{{site.wicket.version_90}}</td>
        </tr>
        <tr>
            <th scope="row"><a href="wicket-8.x.html">Wicket 8.x</a></th>
            <td>{{site.wicket.version_80}}</td>
        </tr>
        <tr>
            <th scope="row"><a href="wicket-7.x.html">Wicket 7.x</a></th>
            <td>{{site.wicket.version_70}}</td>
        </tr>
        <tr>
            <th scope="row"><a href="wicket-6.x.html">Wicket 6.x</a></th>
            <td>{{site.wicket.version_60}}</td>
        </tr>
        <tr>
            <th scope="row"><a href="wicket-1.5.x.html">Wicket 1.5.x</a></th>
            <td>{{site.wicket.version_15}}</td>
        </tr>
        <tr>
            <th scope="row"><a href="wicket-1.4.x.html">Wicket 1.4.x</a></th>
            <td>{{site.wicket.version_14}}</td>
        </tr>
        <tr>
            <th scope="row"><a href="wicket-1.3.x.html">Wicket 1.3.x</a></th>
            <td>{{site.wicket.version_13}}</td>
        </tr>
        <tr>
            <th scope="row">Wicket 1.2.x</th>
            <td>1.2.5</td>
        </tr>
        <tr>
            <th scope="row">Wicket 1.1.x</th>
            <td>1.1.0</td>
        </tr>
        <tr>
            <th scope="row">Wicket 1.0.x</th>
            <td>1.0.0</td>
        </tr>
    </tbody>
</table>

---

## Release Archives

The Apache mirroring system only hosts the latest version of each actively supported branch.
When you need to download an older release you can find them in the archives.

Go to [the Apache archives](https://archive.apache.org/dist/wicket) to find your specific version.

---

## SNAPSHOT Repository

In order to use any SNAPSHOT versions mentioned in each download section of a specific Wicket version you have to configure the SNAPSHOT repository in your pom.xml.

{% highlight xml %}
<repository>
    <id>apache.snapshots</id>
    <name>Apache Development Snapshot Repository</name>
    <url>https://repository.apache.org/content/repositories/snapshots/</url>
    <releases>
        <enabled>false</enabled>
    </releases>
    <snapshots>
        <enabled>true</enabled>
    </snapshots>
</repository>
{% endhighlight xml %}

Beware that SNAPSHOT versions might be deleted after a while and that you should **not use** any of them to go live with.
