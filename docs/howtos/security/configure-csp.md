---
layout: docs
title: "How to configure Content Security Policy"
description: "Set up Content Security Policy headers in Wicket to prevent XSS attacks"
category: security
---

In Wicket 9 support for a Content Security Policy (or CSP) has been added. CSP is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement to distribution of malware. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) for more information on CSP.

The default CSP set by Wicket is very strict. It requires all scripts and stylesheets to be rendered with a nonce. Wicket will automatically attach the nonce to all header contributions that support this (i.e. subclasses of the *AbstractCspHeaderItem* class). Images, fonts and (i)frames are allowed from *self*, the current host. All other resources are blocked. This includes any inline styling or Javascript (such as an *onclick* attribute). The exact CSP is:

    Content-Security-Policy: default-src 'none'; script-src 'strict-dynamic' 'nonce-XYZ'; style-src 'nonce-XYZ'; img-src 'self'; connect-src 'self'; font-src 'self'; manifest-src 'self'; child-src 'self'; frame-src 'self'; base-uri 'self';

In developer mode, the CSP is extended with a reporting directive that reports violations at a special endpoint in the application that logs the violation. This is convenient while developing an application, but care should be taken when this is enabled on production. The *cspviolation* endpoint must be an open endpoint and all data sent to that URL will end up in the logs. To prevent the server log from filling the disk, make sure the *org.apache.wicket.csp.ReportCSPViolationMapper* logger has a limit on its disk usage.

# Configuring the Content Security Policy

The Content Security Policy is managed by the *ContentSecurityPolicySettings* that can be accessed via *WebApplication.getCspSettings()*. This class maintains two instances of *CSPHeaderConfiguration*, each of which contains the directives for the CSP HTTP headers *Content-Security-Policy* and *Content-Security-Policy-Report-Only*. The first header defines the policies that are actually enforced by the browser, whereas the second header defines a policy for which the browser will only report violations. Note that violations can also be reported on the enforced policy and that reporting requires a *report-uri* directive.

For applications that cannot adhere to a CSP, the CSP can be disabled with the following call in your *Application* class:

``` java
  @Override
 protected void init() {
  super.init();
  getCspSettings().blocking().disabled();
  // ...
 }
```

As mentioned before, Wicket uses a very strict CSP by default. This preset can be selected with the following code:

``` java
  getCspSettings().blocking().strict();
```

A third preset is available that allows unsafe inline Javascript and styling and the use of unsafe *eval*. As can be inferred from the names, use of *unsafe* is not recommended. It removes the most important protection offered by CSP. However, older applications may not be ready to apply a strict CSP. For those applications, *CSPHeaderConfiguration.unsafeInline()* can be a starting point for the path to a strict CSP.

*CSPHeaderConfiguration* defines several methods to tune the Content Security Policy for your application. Additional sources can be whitelisted for certain via the *add(CSPDirective, …)* methods. For example, the code below whitelists images rendered via a *data:* url, fonts loaded from *<https://maxcdn.bootstrapcdn.com>* and a single CSS file.

``` java
  getCspSettings().blocking()
      .add(CSPDirective.IMG_SRC, "data:")
      .add(CSPDirective.FONT_SRC, "https://maxcdn.bootstrapcdn.com")
      .add(CSPDirective.STYLE_SRC,
           "https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css");
```

# Guidelines for strict CSP support

To comply to the strict CSP set by default, you’ll need to follow a few rules. Most importantly, you cannot use inline styling or Javascript. This includes:

- *style* attributes in the markup or via an *AttributeModifier*.

- Inline event handlers, such as *onclick* or *onsubmit*, in the markup or via an *AttributeModifier*.

- Including stylesheets directly from the markup without whitelisting them.

- Including Javascript directly from the markup. Whitelisting is not possible due to the *strict-dynamic* rule.

- Rendering *style* attributes from Javascript in dynamically generated markup. Modifying the *style* DOM property is still possible.

- Load other resources from external domains without whitelisting them.

For most of these restrictions Wicket provides alternative solutions that do work with a strict CSP. First of all, replace all inline styling with proper stylesheets and use CSS selectors to target the elements in the DOM. Replace the *AttributeModifier* with a *style* attribute for one with the *class* attribute. For JavaScripts that manipulate the *style* attribute, you may have to update the script to use the DOM property instead.

When a component includes a stylesheet directly from the markup as seen below, there are two possible solutions:

``` html
<?xml version="1.0" encoding="UTF-8"?>
<html xmlns:wicket="http://wicket.apache.org">
<head>
  <link rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" />
</head>
<body>...</body>
</html>
```

The first solution is to whitelist the stylesheet, as seen above. The second solution is to move the stylesheet to a header contribution in *renderHead*. This will allow Wicket to render the required *nonce* attribute. For Javascript resources, this is the only possible solution:

``` java
 @Override
 public void renderHead(IHeaderResponse response) {
   super.renderHead(response);
   response.render(CssHeaderItem.forReference(
       new CssResourceReference(MyComponent.class, "mycomponent.css")));
 }
```

When your component relies on inline event handlers, such as *onclick* or *onsubmit*, you can convert these to an *OnEventHeaderItem*. Again, this will allow Wicket to add the required *nonce* attribute.

``` java
 @Override
 public void renderHead(IHeaderResponse response) {
   super.renderHead(response);
   response.render(OnEventHeaderItem.forComponent(this, "submit",
       "return confirm('Do you really want to submit?')"));
 }
```
