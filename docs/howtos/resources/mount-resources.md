---
layout: docs
title: "How to mount resources"
description: "Mount shared resources at custom URLs in your Wicket application"
category: resources
---

Just like pages also resources can be mounted to a specific path. Class *WebApplication* provides method *mountResource* which is almost identical to *mountPage* seen in <a href="#urls.adoc#_generating_structured_and_clear_urls" class="cross-reference">paragraph 10.6.1</a>:

``` java
@Override
public void init() {
  super.init();
  //resource mounted to path /foo/bar
  ResourceReference resourceReference = new ResourceReference("rssProducer"){
     RSSReaderResource rssResource = new RSSReaderResource();
     @Override
     public IResource getResource() {
    return rssResource;
  }};
  mountResource("/foo/bar", resourceReference);
}
```

With the configuration above (taken from project *CustomResourceMounting*) every request to /foo/bar will be served by the custom resource built in the previous paragraph.

Parameter placeholders are supported as well:

``` java
@Override
public void init() {
  super.init();
  //resource mounted to path /foo with a required indexed parameter
  ResourceReference resourceReference = new ResourceReference("rssProducer"){
     RSSReaderResource rssResource = new RSSReaderResource();
     @Override
     public IResource getResource() {
    return rssResource;
  }};
  mountResource("/bar/${baz}", resourceReference);
}
```
