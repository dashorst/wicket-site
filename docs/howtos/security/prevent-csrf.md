---
layout: docs
title: "How to prevent CSRF attacks"
description: "Protect your Wicket application against cross-site request forgery"
category: security
---

*CryptoMapper* helps preventing CSRF attacks by making the urls impossible to be guessed by an attacker but still there is some theoretical chance this to happen.

To further help against this kind of vulnerability Wicket provides *ResourceIsolationRequestCycleListener* - a *IRequestCycleListener* that uses *IResourceIsolationPolicy* objects to decide whether to allow or reject cross-origin requests. Just like any RequestCycle listener *ResourceIsolationRequestCycleListener* must be registered on application initialization:

``` java
  @Override
 protected void init() {
  super.init();
  getRequestCycleListeners().add(new ResourceIsolationRequestCycleListener());
  // ...
 }
```

By default *ResourceIsolationRequestCycleListener* checks only event handlers requests, i.e. a cross-origin requests cannot execute *Link.onClick()* or submit forms (*Form.onSubmit()*). Any request to render pages are still allowed so Wicket pages could be easily embedded in other applications. To extend CSRF protection to pages we can simply override *isChecked(IRequestHandler handler)* method to make it return always *true*:

``` java
  @Override
 protected void init() {
  super.init();
  getRequestCycleListeners().add(new ResourceIsolationRequestCycleListener() {
        @Override
        protected boolean isChecked(IRequestHandler handler) {
            //check everything
            return true;
        }
    });
  // ...
 }
```

*ResourceIsolationRequestCycleListener* is highly configurable. It allows to add exempted paths that will not be checked with the *addExemptedPath* method. It can also be configured with multiple *ResourceIsolationPolicy* objects to be checked in order.

An *IResourceIsolationPolicy* returns a *ResourceIsolationOutcome* after processing a request, which can be one of 3 values (*ALLOWED*, *DISALLOWED*, *UNKNOWN*). The *ResourceIsolationRequestCycleListener* checks the *IResourceIsolationPolicy* objects in order and uses the first outcome that is not *UNKNOWN* to trigger the appropriate action. If all return *UNKNOWN* *unknownOutcomeAction* is applied. The actions can be configured through the listener.

The default constructor uses the *FetchMetadataResourceIsolationPolicy*, which checks Fetch Metadata headers, and the *OriginResourceIsolationPolicy* which uses the Origin and Referer headers to forbid requests made from a different origin, in order. The *OriginResourceIsolationPolicy* contains the refactored logic of the now deprecated *CsrfPreventionRequestCycleListener*. The listener can be configured to include custom *IResourceIsolationPolicy* objects.

For example:

``` java
  @Override
 protected void init() {
  super.init();
  getRequestCycleListeners().add(
    new ResourceIsolationRequestCycleListener(
        new FetchMetadataResourceIsolationPolicy(),
        new OriginResourceIsolationPolicy(),
        new MyCustomResourceIsolationPolicy()
    ));
  // ...
 }
```

*ResourceIsolationRequestCycleListener* is not an alternative to *CryptoMapper*! Both of them could be used separately or in tandem to prevent CSRF attacks depending on the application requirements.

> [!NOTE]
> In the next chapter we will cover unit testing with Wicket. If your application is protected with *ResourceIsolationRequestCycleListener* you have to properly set request header *"sec-fetch-site"* to make you unit tests pass. In <a href="#testing.adoc#_setting_request_headers" class="cross-reference">paragraph 23.1.10</a> you will learn how to do it.

Wicket also provides the deprecated (since version 9.1.0) *CsrfPreventionRequestCycleListener* - a *IRequestCycleListener* that forbids requests made from a different origin. Similar to the *ResourceIsolationRequestCycleListener* by default only actions are forbidden, i.e. a request coming from different origin cannot execute *Link.onClick()* or submit forms (*Form.onSubmit()*). Any request to render pages are still allowed so Wicket pages could be easily embedded in other applications.

MyApplication.java

``` java
  @Override
 protected void init() {
  super.init();
  getRequestCycleListeners().add(new CsrfPreventionRequestCycleListener());
  // ...
 }
```

*CsrfPreventionRequestCycleListener* is highly configurable. It allows to define a whitelist of allowed origins via *addAcceptedOrigin(String acceptedOrigin)*, to enable/disable it dynamically by overriding *isEnabled()*, to define different kind of actions when a request is rejected or allowed, to set custom error message and code for the rejected requests.

*CsrfPreventionRequestCycleListener* is not an alternative to *CryptoMapper*! Both of them could be used separately or in tandem to prevent CSRF attacks depending on the application requirements.
