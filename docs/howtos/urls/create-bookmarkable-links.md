---
layout: docs
title: "How to create bookmarkable links"
description: "Create bookmarkable page links that users can share and bookmark"
category: urls
---

A link to a bookmarkable page can be built with the link component *org.apache.wicket.markup.html.link.BookmarkablePageLink*:

``` java
BookmarkablePageLink bpl=new BookmarkablePageLink<Void>("myLink", PageWithParameters.class, pageParameters);
```

The specific purpose of this component is to provide an anchor to a bookmarkable page, hence we don’t have to implement any abstract method like we do with Link component.
