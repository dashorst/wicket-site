---
layout: default
title: "Contributing to Apache Wicket"
subtitle: "Every contribution matters"
---

A lot of work goes into maintaining a project like Wicket, and we welcome contributions
of all kinds — from answering questions and reporting bugs, to writing documentation and
submitting code.

## Ways to Contribute

- Answer questions on the [users mailing list]({{ site.baseurl }}/community)
- Answer questions on [Stack Overflow](https://stackoverflow.com/questions/tagged/wicket){:target="_blank" rel="noopener"}
- Report bugs via the [JIRA issue tracker](https://issues.apache.org/jira/browse/WICKET){:target="_blank" rel="noopener"}
- Improve the user guide (see below)
- Submit bug fixes or new features via GitHub pull requests
- Help improve this website

---

## Getting the Source

The Apache Wicket source code is hosted on GitHub. Fork the repository to your own account
and then clone it locally:

```
git clone git@github.com:<your-userid>/wicket.git
cd wicket
```

The official repository is at
[github.com/apache/wicket](https://github.com/apache/wicket){:target="_blank" rel="noopener"}.

### Branch Overview

| Wicket version | Branch | Status |
|---|---|---|
| 10.x | `master` | current, supported |
| 9.x | `wicket-9.x` | supported |
| 8.x | `wicket-8.x` | security fixes only |

---

## Building Wicket

Wicket uses Apache Maven as its build system. To build the entire project:

```
mvn install -DskipTests
```

To run the full test suite (takes longer):

```
mvn install
```

You will need Java 17 or later for building Wicket 10.x (the current development branch).

---

## IDE Setup

All major Java IDEs support Maven projects natively — no extra plugins required.

### Eclipse

Choose **File &rarr; Import &rarr; Existing Maven Projects** and point Eclipse
at the root of your Wicket clone.

### IntelliJ IDEA

Open the root `pom.xml` via **File &rarr; Open**.
IntelliJ will import the Maven project automatically.

### NetBeans

Use **File &rarr; Open Project** and navigate to the Wicket folder.
NetBeans will detect the Maven project structure.

---

## Submitting Patches

We accept contributions via GitHub pull requests. Once you have made your changes:

1. Push your branch to your GitHub fork.
2. Open a pull request against the appropriate branch in the Apache Wicket repository.
3. Notify the team by sending a short email to [dev@wicket.apache.org](mailto:dev@wicket.apache.org).

The GitHub-Apache integration will automatically notify the Wicket committers of new
pull requests. We will review your contribution as soon as possible.

---

## Reporting Bugs

Please report bugs using the Apache Wicket issue tracker on JIRA:

- [issues.apache.org/jira/browse/WICKET](https://issues.apache.org/jira/browse/WICKET){:target="_blank" rel="noopener"}

Before filing a new issue, please search the existing issues to avoid duplicates. Include
as much information as possible: Wicket version, Java version, operating system, stack
traces, and ideally a minimal reproducer project generated with the
[Quickstart Wizard]({{ site.baseurl }}/start/quickstart).

---

## Writing Documentation

The Wicket user guide is maintained in the
[main Wicket repository](https://github.com/apache/wicket){:target="_blank" rel="noopener"}
under `wicket-user-guide/`. You can also contribute to the
[Apache Wicket Wiki](https://cwiki.apache.org/WICKET){:target="_blank" rel="noopener"}.

Documentation improvements are always welcome — if you find something unclear or out of
date, please open a pull request or leave a note on the mailing list.
