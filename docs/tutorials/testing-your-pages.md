---
layout: docs
title: "Testing Wicket pages"
description: "Write tests for your Wicket pages and forms with WicketTester"
category: tutorials
---

In this tutorial you will write unit tests for Wicket pages and forms using `WicketTester` and `FormTester`. You will verify that pages render, components display the right data, forms accept input, and validation errors appear when expected. All examples use JUnit 5 conventions.

## Prerequisites

You need a working Wicket project with at least one page. If you do not have one, follow the [Getting started](getting-started) tutorial first.

## Step 1: Add the wicket-tester dependency

Wicket's testing support lives in the `wicket-core` artifact, but you need to add it as a test dependency along with JUnit 5. Add the following to your `pom.xml`:

```xml
<dependencies>
    <!-- Your existing Wicket dependency -->
    <dependency>
        <groupId>org.apache.wicket</groupId>
        <artifactId>wicket-core</artifactId>
        <version>${wicket.version}</version>
    </dependency>

    <!-- Test dependencies -->
    <dependency>
        <groupId>org.apache.wicket</groupId>
        <artifactId>wicket-tester</artifactId>
        <version>${wicket.version}</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <version>5.11.4</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>jakarta.servlet</groupId>
        <artifactId>jakarta.servlet-api</artifactId>
        <version>6.0.0</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

The `wicket-tester` module provides `WicketTester` and `FormTester`. It creates a mock servlet environment so you can test pages without starting a web server.

## Step 2: Write your first test

If you created your project with the Wicket Maven archetype, you already have a `TestHomePage` class. If not, create one now. The pattern is the same for every Wicket test:

1. Create a `WicketTester` in a `@BeforeEach` method, passing your application class.
2. Start a page.
3. Assert what you expect.

Create `src/test/java/com/example/TestHomePage.java`:

```java
package com.example;

import org.apache.wicket.util.tester.WicketTester;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TestHomePage
{
    private WicketTester tester;

    @BeforeEach
    void setUp()
    {
        tester = new WicketTester(new WicketApplication());
    }

    @Test
    void homepageRendersSuccessfully()
    {
        tester.startPage(HomePage.class);
        tester.assertRenderedPage(HomePage.class);
    }
}
```

Run the test:

```bash
mvn test -Dtest=TestHomePage
```

If the test passes, your `HomePage` renders without throwing exceptions. This single test catches missing Wicket IDs, null models, and configuration errors.

### What WicketTester does under the hood

When you call `tester.startPage(HomePage.class)`, WicketTester creates a mock HTTP request and session, initialises your `WebApplication`, and renders the page through the full Wicket lifecycle. No web server is started -- tests typically run in a few milliseconds.

## Step 3: Assert component content

`WicketTester` provides assertion methods to verify what a page contains, such as `assertLabel`, `assertVisible`, `assertInvisible`, `assertEnabled`, `assertDisabled`, and `assertRequired`.

Suppose your `HomePage` has a welcome label:

```java
public class HomePage extends WebPage
{
    public HomePage()
    {
        add(new Label("welcome", "Hello, World!"));
    }
}
```

Test it:

```java
@Test
void welcomeLabelShowsGreeting()
{
    tester.startPage(HomePage.class);
    tester.assertLabel("welcome", "Hello, World!");
}
```

The path `"welcome"` is the Wicket component ID. For nested components, use a colon-separated path like `"form:username"`.

## Step 4: Test links and navigation

You can simulate clicking a link with `clickLink`. After the click, `WicketTester` processes the request and renders the resulting page, which you can then assert against.

```java
@Test
void aboutLinkNavigatesToAboutPage()
{
    tester.startPage(HomePage.class);
    tester.clickLink("aboutLink");
    tester.assertRenderedPage(AboutPage.class);
}
```

For AJAX links, `clickLink` sends an AJAX request by default. You can verify that a component was included in the AJAX response:

```java
@Test
void ajaxLinkUpdatesCounter()
{
    tester.startPage(HomePage.class);
    tester.assertLabel("counter", "0");

    tester.clickLink("increment");

    tester.assertLabel("counter", "1");
    tester.assertComponentOnAjaxResponse("counter");
}
```

To simulate a non-AJAX click on a link, pass `false` as the second argument:

```java
tester.clickLink("regularLink", false);
```

## Step 5: Test form submission with FormTester

`FormTester` is designed to simulate filling in and submitting a Wicket form. You obtain one from `WicketTester`:

```java
FormTester formTester = tester.newFormTester("form");
```

The string `"form"` is the page-relative path to your `Form` component.

### A complete form test

Suppose you have a feedback form with a name field and a message field:

```java
public class ContactPage extends WebPage
{
    public ContactPage()
    {
        Form<Void> form = new Form<>("form");
        add(form);

        TextField<String> name = new TextField<>("name", Model.of(""));
        name.setRequired(true);
        name.setLabel(Model.of("Name"));
        form.add(name);

        TextArea<String> message = new TextArea<>("message", Model.of(""));
        message.setRequired(true);
        message.setLabel(Model.of("Message"));
        form.add(message);

        form.add(new FeedbackPanel("feedback"));
    }
}
```

Write a test that fills in the form and submits it:

```java
@Test
void contactFormSubmitsSuccessfully()
{
    tester.startPage(ContactPage.class);

    FormTester formTester = tester.newFormTester("form");
    formTester.setValue("name", "Jane");
    formTester.setValue("message", "Great site!");
    formTester.submit();

    tester.assertNoErrorMessage();
}
```

`setValue(path, value)` sets the value of a text field or text area. The path is relative to the form, not the page. After calling `submit()`, Wicket processes the full form lifecycle: conversion, validation, model update, and the `onSubmit` callback.

## Step 6: Assert validation errors

When a required field is left empty or input is invalid, Wicket generates error messages. You can assert their presence with `assertErrorMessages`:

```java
@Test
void contactFormRequiresName()
{
    tester.startPage(ContactPage.class);

    FormTester formTester = tester.newFormTester("form");
    // Leave name empty, fill in message
    formTester.setValue("message", "Great site!");
    formTester.submit();

    tester.assertErrorMessages("'Name' is required.");
}
```

`assertErrorMessages` checks that the page's feedback collector contains exactly the given error messages. You can also use `assertInfoMessages` to check for info-level messages:

```java
@Test
void loginShowsSuccessMessage()
{
    tester.startPage(LoginPage.class);

    FormTester formTester = tester.newFormTester("form");
    formTester.setValue("username", "admin");
    formTester.setValue("password", "secret");
    formTester.submit();

    tester.assertInfoMessages("Login successful!");
}

@Test
void loginShowsErrorForBadCredentials()
{
    tester.startPage(LoginPage.class);

    FormTester formTester = tester.newFormTester("form");
    formTester.setValue("username", "wrong");
    formTester.setValue("password", "wrong");
    formTester.submit();

    tester.assertErrorMessages("Invalid username or password.");
}
```

## Step 7: Test other form components

`FormTester` supports more than text input. Here are the most common methods:

```java
// Checkbox
formTester.setValue("rememberMe", true);

// DropDownChoice -- select by zero-based index
formTester.select("country", 2);

// RadioGroup -- select by index
formTester.select("paymentMethod", 0);

// Multiple selection (CheckGroup, ListMultipleChoice)
formTester.selectMultiple("interests", new int[]{0, 2, 4});

// File upload
formTester.setFile("attachment", new File("test.pdf"), "application/pdf");

// Submit with an alternate button instead of the default
formTester.submit("saveAsDraft");
```

## Step 8: Test components in isolation and AJAX events

You do not always need a full page to test a component. `WicketTester` can render a single panel in an auto-generated page:

```java
@Test
void panelRendersCorrectly()
{
    RecentActivityPanel panel = new RecentActivityPanel("panel");
    tester.startComponentInPage(panel);
    tester.assertLabel("panel:activityTitle", "Recent Activity");
}
```

To test AJAX events, use `executeAjaxEvent`:

```java
@Test
void clickOnLabelChangesText()
{
    tester.startPage(HomePage.class);
    tester.assertLabel("label", "Initial value");
    tester.executeAjaxEvent("label", "click");
    tester.assertLabel("label", "Other value");
}
```

## Step 9: Clean up after tests

After each test method, you may want to clean up the `Application` and `Session` state with `@AfterEach`:

```java
@AfterEach
void tearDown()
{
    tester.destroy();
}
```

Calling `destroy()` detaches the application and clears any session data. This prevents side effects from leaking between tests.

## Putting it all together

Here is a complete test class for a login form that combines page rendering, form submission, and validation assertions:

```java
package com.example;

import org.apache.wicket.util.tester.FormTester;
import org.apache.wicket.util.tester.WicketTester;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TestLoginPage
{
    private WicketTester tester;

    @BeforeEach
    void setUp()
    {
        tester = new WicketTester(new WicketApplication());
    }

    @AfterEach
    void tearDown()
    {
        tester.destroy();
    }

    @Test
    void pageRendersSuccessfully()
    {
        tester.startPage(LoginPage.class);
        tester.assertRenderedPage(LoginPage.class);
    }

    @Test
    void emptyUsernameShowsValidationError()
    {
        tester.startPage(LoginPage.class);
        FormTester formTester = tester.newFormTester("form");
        formTester.setValue("password", "secret");
        formTester.submit();
        tester.assertErrorMessages("'Username' is required.");
    }

    @Test
    void validLoginShowsSuccess()
    {
        tester.startPage(LoginPage.class);
        FormTester formTester = tester.newFormTester("form");
        formTester.setValue("username", "admin");
        formTester.setValue("password", "admin");
        formTester.submit();
        tester.assertNoErrorMessage();
        tester.assertInfoMessages("Welcome back, admin!");
    }
}
```

## WicketTester quick reference

| Method | What it does |
|---|---|
| `startPage(PageClass.class)` | Render a page and set it as current |
| `assertRenderedPage(PageClass.class)` | Verify the rendered page type |
| `assertLabel(path, text)` | Verify a label's text content |
| `assertVisible(path)` | Verify a component is visible |
| `assertInvisible(path)` | Verify a component is hidden |
| `assertEnabled(path)` / `assertDisabled(path)` | Verify form component state |
| `assertRequired(path)` | Verify a form component is required |
| `assertModelValue(path, value)` | Verify a component's model object |
| `assertNoErrorMessage()` | Verify no error feedback messages exist |
| `assertErrorMessages(msgs...)` | Verify specific error messages |
| `assertInfoMessages(msgs...)` | Verify specific info messages |
| `clickLink(path)` | Simulate clicking a link (AJAX-aware) |
| `newFormTester(path)` | Create a FormTester for the given form |
| `executeAjaxEvent(path, event)` | Fire an AJAX event on a component |
| `assertComponentOnAjaxResponse(path)` | Verify component was in AJAX response |
| `startComponentInPage(component)` | Render a single component in isolation |
| `getLastRenderedPage()` | Get the page instance for direct inspection |

## What you learned

In this tutorial you:

- Added the `wicket-tester` dependency to a Maven project
- Wrote a basic test that verifies a page renders successfully
- Used `assertLabel` and `assertVisible` to check component state
- Simulated link clicks with `clickLink`
- Used `FormTester` to fill in and submit a form
- Asserted validation error messages with `assertErrorMessages`
- Tested various form components (checkboxes, dropdowns, file uploads)
- Rendered components in isolation with `startComponentInPage`
- Tested AJAX events with `executeAjaxEvent`

## Next steps

- [Adding AJAX to your pages](adding-ajax) -- Learn the AJAX components you will be testing
- [Page layouts with markup inheritance](layout-with-inheritance) -- Test pages that use layout inheritance
- [Your first form](your-first-form) -- Build the forms you just learned to test
