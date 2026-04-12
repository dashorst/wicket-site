---
layout: docs
title: "Adding AJAX to your pages"
description: "Update parts of the page without full reloads using Wicket's built-in AJAX support"
category: tutorials
---

In this tutorial you will add AJAX interactivity to a Wicket page. You will build a click counter that updates instantly, a live-search text field, and an AJAX-powered form -- all without writing any JavaScript. Wicket handles the AJAX plumbing for you on both the client and server side.

## Prerequisites

You need a working Wicket project. If you do not have one, follow the [Getting started](getting-started) tutorial first.

## How AJAX works in Wicket

Wicket's AJAX support is built on a simple principle: when the user interacts with an AJAX component, an asynchronous request is sent to the server. Your Java callback method runs, and you tell Wicket which components to re-render by adding them to an `AjaxRequestTarget`. Wicket then sends back only the updated markup for those components, and the JavaScript library replaces the old HTML in the browser.

The key rule: **a component can only be updated via AJAX if it has a markup id**. You enable this by calling `setOutputMarkupId(true)` on any component you want to refresh.

## Step 1: Create a click counter with AjaxLink

Create a new page called `AjaxDemoPage.java`:

```java
package com.example;

import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.markup.html.AjaxLink;
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.model.Model;

public class AjaxDemoPage extends WebPage
{
    private int clickCount = 0;

    public AjaxDemoPage()
    {
        final Label counter = new Label("counter", Model.of("0"));
        counter.setOutputMarkupId(true);
        add(counter);

        add(new AjaxLink<Void>("increment")
        {
            @Override
            public void onClick(AjaxRequestTarget target)
            {
                clickCount++;
                counter.setDefaultModelObject(String.valueOf(clickCount));
                target.add(counter);
            }
        });
    }
}
```

Create the companion `AjaxDemoPage.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>AJAX Demo</title>
    <style>
      body { font-family: sans-serif; max-width: 600px; margin: 40px auto; }
      .counter { font-size: 48px; font-weight: bold; margin: 20px 0; }
      a { font-size: 18px; }
    </style>
  </head>
  <body>
    <h1>AJAX Click Counter</h1>
    <div class="counter" wicket:id="counter">0</div>
    <a wicket:id="increment" href="#">Click me!</a>
  </body>
</html>
```

Mount the page in `WicketApplication.init()`:

```java
mountPage("/ajax-demo", AjaxDemoPage.class);
```

Start the application and navigate to [http://localhost:8080/ajax-demo](http://localhost:8080/ajax-demo). Click the link. The counter updates instantly without a full page reload.

### What just happened

Let's trace the flow:

1. The user clicks the link. Wicket's JavaScript intercepts the click and sends an AJAX request to the server.
2. The server calls `onClick(AjaxRequestTarget target)` on your `AjaxLink`.
3. Inside the callback, you update the counter label's model and call `target.add(counter)`.
4. Wicket renders only the `counter` label's HTML and sends it back.
5. The JavaScript library replaces the old `<div>` with the new content.

### Why setOutputMarkupId is required

Wicket's AJAX JavaScript needs to know *which* DOM element to replace. It does this by matching the `id` attribute of the HTML tag. By default, Wicket does not render `id` attributes on every tag. Calling `setOutputMarkupId(true)` tells Wicket to generate and render an `id` for that component's tag.

If you forget this call, you will get an error: Wicket will not be able to find the element to update on the client side.

## Step 2: Add a second label and update multiple components

You can add multiple components to the `AjaxRequestTarget` in a single request. Let's add a label that shows whether the count is odd or even:

Update `AjaxDemoPage.java`:

```java
public AjaxDemoPage()
{
    final Label counter = new Label("counter", Model.of("0"));
    counter.setOutputMarkupId(true);
    add(counter);

    final Label parity = new Label("parity", Model.of("even"));
    parity.setOutputMarkupId(true);
    add(parity);

    add(new AjaxLink<Void>("increment")
    {
        @Override
        public void onClick(AjaxRequestTarget target)
        {
            clickCount++;
            counter.setDefaultModelObject(String.valueOf(clickCount));
            parity.setDefaultModelObject(clickCount % 2 == 0 ? "even" : "odd");

            target.add(counter);
            target.add(parity);
        }
    });
}
```

Update `AjaxDemoPage.html`:

```html
<h1>AJAX Click Counter</h1>
<div class="counter" wicket:id="counter">0</div>
<p>The count is <span wicket:id="parity">even</span>.</p>
<a wicket:id="increment" href="#">Click me!</a>
```

Both components are refreshed in a single AJAX roundtrip.

## Step 3: Show and hide components with AJAX

Sometimes you want to toggle the visibility of a component via AJAX. When a component is hidden (`setVisible(false)`), Wicket does not render its markup at all. This means there is no DOM element to replace. The solution is `setOutputMarkupPlaceholderTag(true)`, which renders a hidden placeholder `<span>` that Wicket can later replace with the real content.

Add a toggle link and a hideable message:

```java
final Label secretMessage = new Label("secret", "This is the secret message!");
secretMessage.setVisible(false);
secretMessage.setOutputMarkupPlaceholderTag(true);
add(secretMessage);

add(new AjaxLink<Void>("toggle")
{
    @Override
    public void onClick(AjaxRequestTarget target)
    {
        secretMessage.setVisible(!secretMessage.isVisible());
        target.add(secretMessage);
    }
});
```

```html
<p><a wicket:id="toggle" href="#">Toggle secret message</a></p>
<div wicket:id="secret" style="background: #ffe; padding: 12px; border: 1px solid #cc0;">
  Secret message placeholder
</div>
```

Note that `setOutputMarkupPlaceholderTag(true)` implicitly calls `setOutputMarkupId(true)`, so you do not need both.

## Step 4: Submit a form with AjaxButton

Let's build a simple form that submits via AJAX, so the page does not reload on submission. Create a section in your page for a quick feedback form:

```java
import org.apache.wicket.ajax.markup.html.form.AjaxButton;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.CompoundPropertyModel;
import org.apache.wicket.model.Model;

// Inside the AjaxDemoPage constructor:

final FeedbackPanel feedback = new FeedbackPanel("feedback");
feedback.setOutputMarkupId(true);
add(feedback);

final Label greeting = new Label("greeting", Model.of(""));
greeting.setOutputMarkupPlaceholderTag(true);
greeting.setVisible(false);
add(greeting);

Form<Void> form = new Form<>("greetForm");
final TextField<String> nameField = new TextField<>("userName", Model.of(""));
nameField.setRequired(true);
nameField.setLabel(Model.of("Name"));
form.add(nameField);

form.add(new AjaxButton("send")
{
    @Override
    protected void onSubmit(AjaxRequestTarget target)
    {
        String name = nameField.getModelObject();
        greeting.setDefaultModelObject("Hello, " + name + "!");
        greeting.setVisible(true);

        // Clear the text field
        nameField.setModelObject("");

        target.add(greeting);
        target.add(feedback);
        target.add(nameField);
    }

    @Override
    protected void onError(AjaxRequestTarget target)
    {
        // Refresh feedback panel to show validation errors
        target.add(feedback);
    }
});
add(form);
```

Add the HTML for the form:

```html
<h2>AJAX Greeting Form</h2>
<div wicket:id="feedback"></div>
<form wicket:id="greetForm">
  <label>Your name:</label>
  <input wicket:id="userName" type="text" />
  <button wicket:id="send" type="submit">Say Hello</button>
</form>
<p wicket:id="greeting" style="color: green; font-size: 24px;">Greeting</p>
```

### How AjaxButton differs from a regular submit

With a regular HTML submit button, the browser sends a full POST request and Wicket renders the entire page. With `AjaxButton`:

1. The JavaScript intercepts the submit event and sends an AJAX request instead.
2. Wicket still performs the full form processing cycle (validation, model update, callbacks).
3. Only the components you add to `AjaxRequestTarget` are re-rendered and sent back.

The `onError` method is called instead of `onSubmit` when validation fails. In our example we refresh the feedback panel so the user sees the error messages immediately.

## Step 5: Live feedback with AjaxFormComponentUpdatingBehavior

Instead of waiting for a button click, you can update components as the user types. The `AjaxFormComponentUpdatingBehavior` sends an AJAX request when a specified JavaScript event fires on a form component.

Add a live preview that shows a greeting as the user types:

```java
import org.apache.wicket.ajax.form.AjaxFormComponentUpdatingBehavior;

final Label livePreview = new Label("livePreview", Model.of("Type your name above..."));
livePreview.setOutputMarkupId(true);
add(livePreview);

TextField<String> liveField = new TextField<>("liveName", Model.of(""));
liveField.add(new AjaxFormComponentUpdatingBehavior("input")
{
    @Override
    protected void onUpdate(AjaxRequestTarget target)
    {
        String value = liveField.getModelObject();
        if (value != null && !value.isEmpty())
        {
            livePreview.setDefaultModelObject("Hello, " + value + "!");
        }
        else
        {
            livePreview.setDefaultModelObject("Type your name above...");
        }
        target.add(livePreview);
    }
});
add(liveField);
```

```html
<h2>Live Preview</h2>
<input wicket:id="liveName" type="text" placeholder="Start typing..." />
<p wicket:id="livePreview">Type your name above...</p>
```

The `"input"` event fires on every keystroke. For a less chatty alternative, use `"change"` (fires when the field loses focus) or add a throttle delay to limit the rate of AJAX requests.

### Adding a throttle

To prevent flooding the server with requests on every keystroke, you can configure a throttle:

```java
import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.attributes.AjaxRequestAttributes;
import org.apache.wicket.ajax.attributes.ThrottlingSettings;
import java.time.Duration;

liveField.add(new AjaxFormComponentUpdatingBehavior("input")
{
    @Override
    protected void updateAjaxAttributes(AjaxRequestAttributes attributes)
    {
        super.updateAjaxAttributes(attributes);
        attributes.setThrottlingSettings(
            new ThrottlingSettings(Duration.ofMillis(300), true));
    }

    @Override
    protected void onUpdate(AjaxRequestTarget target)
    {
        // same as before
    }
});
```

This ensures that at most one request is sent every 300 milliseconds, regardless of how fast the user types.

## Step 6: Append JavaScript from the server

Sometimes you need to execute a small piece of JavaScript after an AJAX update. You can append script code to the `AjaxRequestTarget`:

```java
add(new AjaxLink<Void>("alertLink")
{
    @Override
    public void onClick(AjaxRequestTarget target)
    {
        target.appendJavaScript("alert('Hello from the server!');");
    }
});
```

```html
<a wicket:id="alertLink" href="#">Show alert from server</a>
```

This is useful for triggering client-side animations, focusing a field, or scrolling to a particular element after an update.

## Step 7: Test AJAX components

Wicket's `WicketTester` fully supports AJAX testing. Create `TestAjaxDemoPage.java`:

```java
package com.example;

import org.apache.wicket.util.tester.WicketTester;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TestAjaxDemoPage
{
    private WicketTester tester;

    @BeforeEach
    void setUp()
    {
        tester = new WicketTester(new WicketApplication());
    }

    @Test
    void pageRendersSuccessfully()
    {
        tester.startPage(AjaxDemoPage.class);
        tester.assertRenderedPage(AjaxDemoPage.class);
    }

    @Test
    void clickingIncrementUpdatesCounter()
    {
        tester.startPage(AjaxDemoPage.class);

        // Verify initial state
        tester.assertLabel("counter", "0");

        // Click the AJAX link
        tester.clickLink("increment");

        // Verify the counter was updated
        tester.assertLabel("counter", "1");

        // Verify the component was part of the AJAX response
        tester.assertComponentOnAjaxResponse("counter");
    }

    @Test
    void clickingIncrementThreeTimesShowsThree()
    {
        tester.startPage(AjaxDemoPage.class);

        tester.clickLink("increment");
        tester.clickLink("increment");
        tester.clickLink("increment");

        tester.assertLabel("counter", "3");
    }
}
```

`WicketTester.clickLink()` sends an AJAX request by default when the target is an AJAX component. You can verify that a component was included in the AJAX response with `assertComponentOnAjaxResponse()`.

## AJAX component quick reference

Here is a summary of the most commonly used AJAX components:

| Component | Purpose | Callback |
|---|---|---|
| `AjaxLink` | Clickable link, no form | `onClick(AjaxRequestTarget)` |
| `AjaxButton` | Submit button for a form | `onSubmit(AjaxRequestTarget)` / `onError(AjaxRequestTarget)` |
| `AjaxFallbackLink` | Link that degrades to regular link if JS is disabled | `onClick(Optional<AjaxRequestTarget>)` |
| `AjaxFallbackButton` | Button that degrades if JS is disabled | `onSubmit(Optional<AjaxRequestTarget>)` |
| `AjaxCheckBox` | Checkbox that updates its model via AJAX on change | `onUpdate(AjaxRequestTarget)` |

And the most useful AJAX behaviors:

| Behavior | Purpose | Callback |
|---|---|---|
| `AjaxEventBehavior` | React to any JS event (click, mouseover, etc.) | `onEvent(AjaxRequestTarget)` |
| `AjaxFormComponentUpdatingBehavior` | Update a form component's model on an event | `onUpdate(AjaxRequestTarget)` |
| `AjaxFormSubmitBehavior` | Submit a form on any event | `onSubmit(AjaxRequestTarget)` / `onError(AjaxRequestTarget)` |
| `AbstractAjaxTimerBehavior` | Execute a callback on a recurring interval | `onTimer(AjaxRequestTarget)` |

## What you learned

In this tutorial you:

- Used `AjaxLink` to update a counter without reloading the page
- Understood why `setOutputMarkupId(true)` is required for AJAX updates
- Used `setOutputMarkupPlaceholderTag(true)` to toggle component visibility
- Submitted a form with `AjaxButton` and refreshed the feedback panel
- Built a live preview with `AjaxFormComponentUpdatingBehavior`
- Added a throttle to reduce the frequency of AJAX requests
- Appended JavaScript to an AJAX response
- Tested AJAX interactions with `WicketTester`

## Next steps

- [Page layouts with markup inheritance](layout-with-inheritance) -- Organize your AJAX pages with a shared layout
- [Building your first form](your-first-form) -- Learn more about form validation and models
- [Testing Wicket pages](testing-your-pages) -- Go deeper with WicketTester and FormTester
