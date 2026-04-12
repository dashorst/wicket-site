---
layout: docs
title: "Building your first form"
description: "Collect user input with Wicket forms, models, validation, and feedback messages"
keywords: form model CompoundPropertyModel TextField PasswordTextField onSubmit FeedbackPanel
category: tutorials
---

In this tutorial you will build a contact form that collects a name, email address, and message from the user. Along the way you will learn how Wicket forms work, how to wire them with `CompoundPropertyModel`, how to validate input, and how to display error messages with `FeedbackPanel`.

## Prerequisites

You need a working Wicket project. If you do not have one, follow the [Getting started](getting-started) tutorial first.

## What you will build

A single page with a contact form containing:

- A required **Name** text field
- A required **Email** text field with email validation
- A required **Message** text area
- A submit button
- A feedback area that shows validation errors
- A confirmation message on successful submission

## Step 1: Create the Contact data class

Start by creating a simple Java class to hold the form data. Create `Contact.java` in your main package:

```java
package com.example;

import java.io.Serializable;

public class Contact implements Serializable
{
    private String name;
    private String email;
    private String message;

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public String getMessage()
    {
        return message;
    }

    public void setMessage(String message)
    {
        this.message = message;
    }
}
```

This is a standard JavaBean. Wicket models will use its getter and setter methods to read and write field values.

> **Why Serializable?** Wicket stores page state in the session, so any object used as a model must be serializable.

## Step 2: Write the HTML template

Create `ContactPage.html` alongside your Java class:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Contact Us</title>
    <style>
      body { font-family: sans-serif; max-width: 600px; margin: 40px auto; }
      label { display: block; margin-top: 12px; font-weight: bold; }
      input[type="text"], input[type="email"], textarea {
        width: 100%; padding: 8px; margin-top: 4px; box-sizing: border-box;
      }
      textarea { height: 120px; }
      button { margin-top: 16px; padding: 10px 24px; }
      .feedbackPanel { color: #c00; margin-bottom: 16px; }
      .feedbackPanelERROR { color: #c00; }
      .success { color: #090; font-weight: bold; margin-top: 16px; }
    </style>
  </head>
  <body>
    <h1>Contact Us</h1>

    <div wicket:id="feedback"></div>

    <form wicket:id="contactForm">
      <label for="name">Name</label>
      <input wicket:id="name" type="text" id="name" />

      <label for="email">Email</label>
      <input wicket:id="email" type="email" id="email" />

      <label for="message">Message</label>
      <textarea wicket:id="message" id="message"></textarea>

      <button type="submit">Send Message</button>
    </form>

    <p wicket:id="result" class="success">Result will appear here</p>
  </body>
</html>
```

Key points about this markup:

- Each input element has a `wicket:id` attribute that links it to a Java component.
- The `<form>` tag itself has a `wicket:id` because Wicket manages form submission.
- The `<div wicket:id="feedback">` is where validation errors will appear.

## Step 3: Build the form with CompoundPropertyModel

Now create `ContactPage.java`:

```java
package com.example;

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.TextArea;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.panel.FeedbackPanel;
import org.apache.wicket.model.CompoundPropertyModel;
import org.apache.wicket.model.Model;
import org.apache.wicket.validation.validator.EmailAddressValidator;

public class ContactPage extends WebPage
{
    private Contact contact = new Contact();

    public ContactPage()
    {
        // Feedback panel for validation errors
        add(new FeedbackPanel("feedback"));

        // Result label, hidden initially
        final Label result = new Label("result", Model.of(""));
        result.setVisible(false);
        result.setOutputMarkupPlaceholderTag(true);
        add(result);

        // Create the form with a CompoundPropertyModel
        Form<Contact> form = new Form<>("contactForm",
            new CompoundPropertyModel<>(contact))
        {
            @Override
            protected void onSubmit()
            {
                String confirmation = String.format(
                    "Thank you, %s! We received your message and will reply to %s.",
                    contact.getName(), contact.getEmail());
                result.setDefaultModelObject(confirmation);
                result.setVisible(true);

                // Reset the form
                contact.setName(null);
                contact.setEmail(null);
                contact.setMessage(null);
            }
        };

        // Add form components
        form.add(new TextField<String>("name").setRequired(true));
        form.add(new TextField<String>("email")
            .setRequired(true)
            .add(EmailAddressValidator.getInstance()));
        form.add(new TextArea<String>("message").setRequired(true));

        add(form);
    }
}
```

There is a lot happening here. Let's break it down.

### How CompoundPropertyModel works

When you set a `CompoundPropertyModel` on a form, it becomes the default model for all child components. Each child component uses its own `wicket:id` as a property name to read from and write to the model object.

In our case the model object is the `Contact` instance. So:

| Component id | Property accessed | Getter/setter called |
|---|---|---|
| `"name"` | `contact.name` | `getName()` / `setName()` |
| `"email"` | `contact.email` | `getEmail()` / `setEmail()` |
| `"message"` | `contact.message` | `getMessage()` / `setMessage()` |

This eliminates the need to create an explicit model for each form field. Without `CompoundPropertyModel`, you would need to write:

```java
form.add(new TextField<>("name", new PropertyModel<>(contact, "name")));
```

With `CompoundPropertyModel`, the simpler version suffices:

```java
form.add(new TextField<String>("name"));
```

### What happens when the form is submitted

Wicket processes form submission in three steps:

1. **Validation** -- Each form component checks its validation rules. If any fail, `onSubmit()` is not called.
2. **Model update** -- If validation passes, Wicket writes the submitted values into the model (and thus into the `Contact` object).
3. **Callback** -- `onSubmit()` is called, where you can use the populated object.

This means that inside `onSubmit()`, `contact.getName()` already contains the value the user typed.

## Step 4: Register the page

To make the contact page accessible, add a link from your home page. In `HomePage.java`, add:

```java
add(new Link<Void>("contactLink")
{
    @Override
    public void onClick()
    {
        setResponsePage(ContactPage.class);
    }
});
```

And in `HomePage.html`, add:

```html
<p><a wicket:id="contactLink">Contact us</a></p>
```

Alternatively, you can mount the page to a clean URL in `WicketApplication.init()`:

```java
@Override
public void init()
{
    super.init();
    mountPage("/contact", ContactPage.class);
}
```

Now you can access the form at [http://localhost:8080/contact](http://localhost:8080/contact).

## Step 5: Test the validation

Start the application and navigate to the contact page. Click **Send Message** without filling in any fields. You should see three error messages in the feedback panel:

- *Field 'name' is required.*
- *Field 'email' is required.*
- *Field 'message' is required.*

Now enter a valid name but type `not-an-email` in the email field. Submit again. The feedback panel shows:

- *The value of 'email' is not a valid email address.*

These messages are generated automatically by Wicket's built-in validators.

## Step 6: Improve labels for feedback messages

The default error messages use the component id as the field label, which gives you lowercase text like `'name'` and `'email'`. You can provide better labels:

```java
TextField<String> nameField = new TextField<>("name");
nameField.setRequired(true);
nameField.setLabel(Model.of("Name"));
form.add(nameField);

TextField<String> emailField = new TextField<>("email");
emailField.setRequired(true);
emailField.setLabel(Model.of("Email"));
emailField.add(EmailAddressValidator.getInstance());
form.add(emailField);

TextArea<String> messageField = new TextArea<>("message");
messageField.setRequired(true);
messageField.setLabel(Model.of("Message"));
form.add(messageField);
```

Now the error messages read:

- *Field 'Name' is required.*
- *The value of 'Email' is not a valid email address.*

This small change significantly improves the user experience.

## Step 7: Add a string length validator

Let's ensure the message has at least 10 characters. Add a `StringValidator`:

```java
import org.apache.wicket.validation.validator.StringValidator;

// In the constructor, when building the message field:
TextArea<String> messageField = new TextArea<>("message");
messageField.setRequired(true);
messageField.setLabel(Model.of("Message"));
messageField.add(StringValidator.minimumLength(10));
form.add(messageField);
```

Now if the user enters fewer than 10 characters, they see:

- *The value of 'Message' is shorter than the minimum of 10 characters.*

You can stack multiple validators on a single component. They are all checked during the validation step.

## Step 8: Handle the error callback

When validation fails, `onSubmit()` is not called. Instead, `onError()` is called. You can override it to perform custom error handling:

```java
Form<Contact> form = new Form<>("contactForm",
    new CompoundPropertyModel<>(contact))
{
    @Override
    protected void onSubmit()
    {
        String confirmation = String.format(
            "Thank you, %s! We received your message and will reply to %s.",
            contact.getName(), contact.getEmail());
        result.setDefaultModelObject(confirmation);
        result.setVisible(true);

        // Reset the form data
        contact.setName(null);
        contact.setEmail(null);
        contact.setMessage(null);
    }

    @Override
    protected void onError()
    {
        // Hide the success message when there are errors
        result.setVisible(false);
    }
};
```

## Step 9: Filter feedback messages per component

When a page has multiple forms, you may want each form to show only its own errors. You can filter feedback messages using a `ContainerFeedbackMessageFilter`:

```java
import org.apache.wicket.feedback.ContainerFeedbackMessageFilter;

// Only show messages from components inside the form
FeedbackPanel feedback = new FeedbackPanel("feedback",
    new ContainerFeedbackMessageFilter(form));
```

However, since the `FeedbackPanel` must be added before the form in our current setup, you need to restructure slightly -- add the feedback panel after creating the form:

```java
Form<Contact> form = new Form<>(...);
// ... add fields to form ...
add(form);

add(new FeedbackPanel("feedback",
    new ContainerFeedbackMessageFilter(form)));
```

## Step 10: Write a test for the form

Create `TestContactPage.java` in your test sources:

```java
package com.example;

import org.apache.wicket.util.tester.FormTester;
import org.apache.wicket.util.tester.WicketTester;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TestContactPage
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
        tester.startPage(ContactPage.class);
        tester.assertRenderedPage(ContactPage.class);
    }

    @Test
    void emptyFormShowsErrors()
    {
        tester.startPage(ContactPage.class);
        FormTester formTester = tester.newFormTester("contactForm");
        formTester.submit();

        tester.assertErrorMessages(
            "Field 'Name' is required.",
            "Field 'Email' is required.",
            "Field 'Message' is required."
        );
    }

    @Test
    void validFormSubmitsSuccessfully()
    {
        tester.startPage(ContactPage.class);
        FormTester formTester = tester.newFormTester("contactForm");
        formTester.setValue("name", "Alice");
        formTester.setValue("email", "alice@example.com");
        formTester.setValue("message", "Hello, this is a test message!");
        formTester.submit();

        // No errors should be present
        tester.assertNoErrorMessage();
        // The result label should now be visible
        tester.assertVisible("result");
    }

    @Test
    void invalidEmailShowsError()
    {
        tester.startPage(ContactPage.class);
        FormTester formTester = tester.newFormTester("contactForm");
        formTester.setValue("name", "Bob");
        formTester.setValue("email", "not-an-email");
        formTester.setValue("message", "Some message here.");
        formTester.submit();

        tester.assertErrorMessages(
            "The value of 'Email' is not a valid email address."
        );
    }
}
```

Run the tests:

```bash
mvn test
```

`FormTester` is designed specifically for testing Wicket forms. It lets you set field values and simulate submission without a browser. The assertions then check which feedback messages were generated.

## What you learned

In this tutorial you:

- Created a form with `TextField`, `TextArea`, and a submit button
- Used `CompoundPropertyModel` to automatically wire form fields to a JavaBean
- Handled form submission with `onSubmit()` and errors with `onError()`
- Added validation with `setRequired()`, `EmailAddressValidator`, and `StringValidator`
- Displayed errors with `FeedbackPanel`
- Improved field labels for better error messages
- Tested the form programmatically with `FormTester`

## Next steps

- [Adding AJAX to your pages](adding-ajax) -- Submit forms and update components without full page reloads
- [Page layouts with markup inheritance](layout-with-inheritance) -- Wrap your form page in a consistent site layout
- [Testing Wicket pages](testing-your-pages) -- Deeper dive into WicketTester capabilities
