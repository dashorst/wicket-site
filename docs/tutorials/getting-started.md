---
layout: docs
title: "Getting started with Wicket"
description: "Create your first Wicket application in 10 minutes"
category: tutorials
---

In this tutorial you will create a Wicket web application from scratch, explore the generated project structure, and build your first interactive page. By the end you will have a running application that displays a greeting and responds to link clicks.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Java 17** or later (check with `java -version`)
- **Apache Maven 3.9+** (check with `mvn -version`)
- A Java IDE such as IntelliJ IDEA, Eclipse, or VS Code with Java extensions

## Step 1: Generate a project with the Maven archetype

Wicket provides a Maven archetype that scaffolds a complete project for you. Open a terminal and run:

```bash
mvn archetype:generate \
  -DarchetypeGroupId=org.apache.wicket \
  -DarchetypeArtifactId=wicket-archetype-quickstart \
  -DarchetypeVersion=10.4.0 \
  -DgroupId=com.example \
  -DartifactId=myapp \
  -Dversion=1.0-SNAPSHOT \
  -DinteractiveMode=false
```

Replace `10.4.0` with the latest Wicket release version if a newer one is available. This command creates a directory called `myapp` containing everything you need.

Change into the project directory:

```bash
cd myapp
```

## Step 2: Understand the project structure

The archetype generates a standard Maven project layout. Here are the important files:

```
myapp/
  pom.xml
  src/
    main/
      java/
        com/example/
          WicketApplication.java    <-- Application entry point
          HomePage.java             <-- Your first page (Java)
          HomePage.html             <-- Your first page (HTML)
      webapp/
        WEB-INF/
          web.xml                   <-- Servlet configuration
    test/
      java/
        com/example/
          TestHomePage.java         <-- Unit test for the home page
```

Notice that `HomePage.java` and `HomePage.html` are in the same package. This is a fundamental Wicket convention: every page (and panel) class has a companion HTML file with the same name, located in the same package.

## Step 3: Explore the Application class

Open `src/main/java/com/example/WicketApplication.java`. This is the heart of your application:

```java
public class WicketApplication extends WebApplication
{
    @Override
    public Class<? extends WebPage> getHomePage()
    {
        return HomePage.class;
    }

    @Override
    public void init()
    {
        super.init();
        // add your configuration here
    }
}
```

Two key methods to know:

- **`getHomePage()`** tells Wicket which page to display when a user visits the root URL. It returns a class reference, not an instance.
- **`init()`** is called once when the application starts. You will use it later to register settings, mount pages to URLs, and configure security.

The `web.xml` file registers `WicketFilter` and points it to this application class via the `applicationClassName` parameter.

## Step 4: Run the application

The archetype includes an embedded Jetty server for development. Start it with:

```bash
mvn jetty:run
```

Open your browser and navigate to [http://localhost:8080](http://localhost:8080). You should see a page with a "Congratulations!" message. Keep the server running while you work through the rest of this tutorial.

## Step 5: Understand the HomePage

Open `src/main/java/com/example/HomePage.java`:

```java
public class HomePage extends WebPage
{
    public HomePage()
    {
        add(new Label("message", "If you see this message, Wicket is working!"));
    }
}
```

Now open the companion file `src/main/java/com/example/HomePage.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Apache Wicket Quickstart</title>
  </head>
  <body>
    <p wicket:id="message">This text will be replaced.</p>
  </body>
</html>
```

Here is what happens at runtime:

1. Wicket loads `HomePage.html` as the template for the `HomePage` class.
2. It finds the `<p>` tag with `wicket:id="message"`.
3. It looks for a child component with id `"message"` in the Java class.
4. The `Label` component replaces the tag's content with its model value: *"If you see this message, Wicket is working!"*.

The placeholder text inside the HTML tag ("This text will be replaced.") is only visible when you open the HTML file directly in a browser. It gets replaced at runtime, making the HTML file useful as a design preview.

> **Important:** Every `wicket:id` in the HTML must match a component added in the Java code, and every component added in Java must have a corresponding `wicket:id` in the HTML. A mismatch in either direction throws an exception.

## Step 6: Add a dynamic Label

Let's modify the page to display the current date and time. Edit `HomePage.java`:

```java
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.basic.Label;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class HomePage extends WebPage
{
    public HomePage()
    {
        String now = LocalDateTime.now()
            .format(DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy 'at' HH:mm:ss"));

        add(new Label("message", "Hello, Wicket!"));
        add(new Label("currentTime", "The current time is: " + now));
    }
}
```

Update `HomePage.html` to include the new label:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>My Wicket App</title>
  </head>
  <body>
    <h1 wicket:id="message">Greeting goes here</h1>
    <p wicket:id="currentTime">Time goes here</p>
  </body>
</html>
```

Refresh the browser. You should see your greeting and the current server time.

## Step 7: Add a Link that navigates

Wicket links are server-side click handlers, not plain HTML anchors. Let's add a link that navigates to a second page.

First, create a new page. Add `SecondPage.java`:

```java
package com.example;

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.basic.Label;

public class SecondPage extends WebPage
{
    public SecondPage()
    {
        add(new Label("heading", "You made it to the second page!"));
    }
}
```

Add `SecondPage.html` in the same package:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Second Page</title>
  </head>
  <body>
    <h1 wicket:id="heading">Heading</h1>
    <p><a href="/">Back to home</a></p>
  </body>
</html>
```

Now update `HomePage.java` to include a link:

```java
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.Link;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class HomePage extends WebPage
{
    public HomePage()
    {
        String now = LocalDateTime.now()
            .format(DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy 'at' HH:mm:ss"));

        add(new Label("message", "Hello, Wicket!"));
        add(new Label("currentTime", "The current time is: " + now));

        add(new Link<Void>("goToSecondPage")
        {
            @Override
            public void onClick()
            {
                setResponsePage(SecondPage.class);
            }
        });
    }
}
```

Update `HomePage.html` to add the link tag:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>My Wicket App</title>
  </head>
  <body>
    <h1 wicket:id="message">Greeting goes here</h1>
    <p wicket:id="currentTime">Time goes here</p>
    <p><a wicket:id="goToSecondPage">Go to the second page</a></p>
  </body>
</html>
```

Refresh the page and click the link. The `onClick()` method executes on the server and redirects the browser to `SecondPage`.

## Step 8: Run the existing test

The archetype also generated a test. Open `src/test/java/com/example/TestHomePage.java`:

```java
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

Run it from the command line:

```bash
mvn test
```

If the test passes, your page renders without errors. `WicketTester` creates an in-memory servlet environment so tests run without a real server.

## Step 9: Hot reload workflow

Wicket runs in **DEVELOPMENT** mode by default. This enables several developer-friendly features:

- **Markup reloading:** When you change an HTML file and refresh the browser, Wicket picks up the new markup without restarting the server.
- **Detailed error pages:** Exceptions show a full stack trace with the component hierarchy.
- **AJAX debug window:** A floating panel in the browser shows AJAX requests in real time.

To see markup hot reload in action, change the text inside `HomePage.html` (for example, change the `<h1>` placeholder text to something else) and refresh your browser. The change appears instantly.

Java code changes still require a restart (or using a tool like JRebel or DCEVM for hot-swapping).

> **Production warning:** Always switch to **DEPLOYMENT** mode before going live. Development mode enables extra resource monitoring that hurts performance. You can switch modes by setting the system property `-Dwicket.configuration=deployment` or by configuring it in `web.xml`.

## What you learned

In this tutorial you:

- Generated a Wicket project using the Maven archetype
- Explored the project structure and the application class
- Used `Label` to display dynamic text
- Used `Link` to navigate between pages
- Ran a unit test with `WicketTester`
- Experienced the hot reload workflow in development mode

## Next steps

You now have a running Wicket application with two pages. Here are some suggestions for what to explore next:

- [Building your first form](your-first-form) -- Collect user input with Wicket forms
- [Adding AJAX to your pages](adding-ajax) -- Update parts of the page without a full reload
- [Page layouts with markup inheritance](layout-with-inheritance) -- Create a consistent layout across all pages
