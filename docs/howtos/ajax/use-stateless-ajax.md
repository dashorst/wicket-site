---
layout: docs
title: "How to use AJAX on stateless pages"
description: "Make AJAX components and behaviors work on stateless Wicket pages by overriding getStatelessHint"
category: ajax
---

Wicket makes working with AJAX easy and pleasant with its component-oriented abstraction. However as side effect, AJAX components and behaviors make their hosting page stateful. This can be quite annoying if we are working on a page that must be stateless (for example a login page). Wicket has made it quite easy to force existing AJAX components to be stateless. All we have to do is to override component’s method *getStatelessHint* returning true:

``` java
final Link<?> incrementLink = new AjaxFallbackLink<Void>("incrementLink")
{

    ...
    
    @Override
    protected boolean getStatelessHint()
    {
        return true;
    }
};
```

Just like components also AJAX behaviors can be turned to stateless overriding *getStatelessHint(Component component)*

``` java
 final AjaxFormSubmitBehavior myBehavior = new AjaxFormSubmitBehavior(form, event)
 {
    ...
    
    @Override
    protected boolean getStatelessHint(Component component)
    {
        return true;
    }
};
```

## Usage

Stateless components and behaviors follows the same rules and conventions of their standard stateful version, so they must have a markup id in order to be manipulated via JavaScript. However in this case calling *setOutputMarkupId* on a component is not enough. Since we are working with a stateless page, the id of the component to refresh must be unique but also static, meaning that it should not depend on page instance. In other words, the id should be constant through different instances of the same page. By default calling *setOutputMarkupId* we generate markup ids using a session-level counter and this make them not static. Hence, to refresh component in a stateless page we must provide them with static ids, either setting them in Java code (with *Component.setMarkupId*) or simply writing them directly in the markup:

``` java
   <span id="staticIdToUse" wicket:id="componentWicketId"></span>
```

[See examples](https://examples.wicket.apache.org/stateless/wicket/bookmarkable/org.apache.wicket.examples.stateless.AjaxStatelessExample) page for a full showcase of AJAX-stateless capabilities.
