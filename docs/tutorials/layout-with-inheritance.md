---
layout: docs
title: "Page layouts with markup inheritance"
description: "Build reusable page layouts using Wicket's markup inheritance"
category: tutorials
---

In this tutorial you will build a reusable page layout for a web application using Wicket's markup inheritance. You will start with a flat HTML page, extract the common header and footer into a base page, and then create child pages that inherit the layout. Along the way you will use Panels for reusable layout areas and the `<wicket:child>` / `<wicket:extend>` tags to let child pages inject their own content.

## Prerequisites

You need a working Wicket project. If you do not have one, follow the [Getting started](getting-started) tutorial first.

## The goal

Most web applications share a common structure across every page: a header with navigation, a sidebar or menu, a footer, and a content area that changes from page to page. Instead of duplicating that markup in every HTML file, Wicket lets you define the layout once in a parent page and inherit it in all child pages.

By the end of this tutorial you will have:

- A `BasePage` with a header panel, footer panel, and a content slot
- A `HomePage` that inherits the layout and fills in its own content
- A `LoginPage` that inherits the layout and hides the sidebar menu

## Step 1: Identify the repeating layout areas

Before introducing inheritance, picture a typical page with four areas: a **header** (title and navigation), a **sidebar menu**, a **content area** that changes per page, and a **footer**. Without Wicket you would copy the header, menu, and footer markup into every HTML file. With markup inheritance you define them once and let every page inherit them automatically.

## Step 2: Create panels for reusable layout areas

Wicket's `Panel` class lets you extract a chunk of HTML and its associated Java logic into a reusable component. A panel's markup file uses the special `<wicket:panel>` tag to mark the region that Wicket should render.

### HeaderPanel

Create `HeaderPanel.java`:

```java
package com.example.layout;

import org.apache.wicket.markup.html.panel.Panel;

public class HeaderPanel extends Panel
{
    public HeaderPanel(String id)
    {
        super(id);
    }
}
```

Create `HeaderPanel.html`:

```html
<html>
<body>
  <wicket:panel>
    <div class="header">
      <h1>My Application</h1>
      <div class="nav">
        <a href="/">Home</a>
        <a href="/about">About</a>
      </div>
    </div>
  </wicket:panel>
</body>
</html>
```

Everything outside the `<wicket:panel>` tag is ignored at render time. Web designers can place additional mock HTML outside the tag to preview the panel in a browser without running the application.

### FooterPanel

Create `FooterPanel.java`:

```java
package com.example.layout;

import org.apache.wicket.markup.html.panel.Panel;

public class FooterPanel extends Panel
{
    public FooterPanel(String id)
    {
        super(id);
    }
}
```

Create `FooterPanel.html`:

```html
<html>
<body>
  <wicket:panel>
    <div class="footer">
      &copy; 2025 My Application
    </div>
  </wicket:panel>
</body>
</html>
```

### MenuPanel

Create `MenuPanel.java`:

```java
package com.example.layout;

import org.apache.wicket.markup.html.panel.Panel;

public class MenuPanel extends Panel
{
    public MenuPanel(String id)
    {
        super(id);
    }
}
```

Create `MenuPanel.html`:

```html
<html>
<body>
  <wicket:panel>
    <div class="menu">
      <a href="/dashboard">Dashboard</a>
      <a href="/settings">Settings</a>
    </div>
  </wicket:panel>
</body>
</html>
```

## Step 3: Build the base page with wicket:child

Now you have three reusable panels. The next step is a base page that assembles them into the site layout and leaves a slot for child pages to fill with their own content.

The `<wicket:child>` tag marks the spot in the parent markup where a child page can inject content. Create `BasePage.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>My Application</title>
    <!-- link your CSS stylesheet here -->
  </head>
  <body>
    <div wicket:id="headerPanel">header</div>
    <div class="container">
      <div wicket:id="menuPanel">menu</div>
      <div class="content">
        <wicket:child />
      </div>
    </div>
    <div wicket:id="footerPanel">footer</div>
  </body>
</html>
```

The `<wicket:child />` tag is the key. It tells Wicket: "insert the child page's content here."

Create `BasePage.java`:

```java
package com.example.layout;

import org.apache.wicket.Component;
import org.apache.wicket.markup.html.WebPage;

public class BasePage extends WebPage
{
    private Component menuPanel;

    public BasePage()
    {
        add(new HeaderPanel("headerPanel"));
        add(menuPanel = new MenuPanel("menuPanel"));
        add(new FooterPanel("footerPanel"));
    }

    protected Component getMenuPanel()
    {
        return menuPanel;
    }
}
```

The `BasePage` does not define any content. It assembles the three panels and leaves the `<wicket:child />` slot open for subclasses.

## Step 4: Create child pages that inherit the layout

Any page that extends `BasePage` automatically inherits its HTML markup, including the header, menu, and footer. The child page provides its own markup file, but only the content inside the `<wicket:extend>` tag is used -- everything else is ignored.

### HomePage

Create `HomePage.java`:

```java
package com.example;

import com.example.layout.BasePage;
import org.apache.wicket.markup.html.basic.Label;

public class HomePage extends BasePage
{
    public HomePage()
    {
        add(new Label("message", "Welcome to My Application!"));
    }
}
```

Create `HomePage.html`:

```html
<html>
<body>
  <wicket:extend>
    <h2>Home</h2>
    <p wicket:id="message">Welcome message goes here</p>
  </wicket:extend>
</body>
</html>
```

Only the markup inside `<wicket:extend>` is injected into the `<wicket:child />` slot of `BasePage.html`. The resulting rendered page will contain the full layout with the home page content in the center.

### How the rendered output looks

When Wicket renders `HomePage`, it merges the parent and child markup. The final HTML output looks like this (simplified):

```html
<html>
  <head>...</head>
  <body>
    <div wicket:id="headerPanel"><!-- HeaderPanel content --></div>
    <div class="container">
      <div wicket:id="menuPanel"><!-- MenuPanel content --></div>
      <div class="content">
        <wicket:child>
          <wicket:extend>
            <h2>Home</h2>
            <p wicket:id="message">Welcome to My Application!</p>
          </wicket:extend>
        </wicket:child>
      </div>
    </div>
    <div wicket:id="footerPanel"><!-- FooterPanel content --></div>
  </body>
</html>
```

The `<wicket:child>` and `<wicket:extend>` tags are left in the output as markers, but they have no visual effect. In development mode Wicket strips them from the rendered HTML.

## Step 5: Create a page that customises the layout

Child pages can customise the inherited layout by modifying components defined in the parent. For example, a login page typically hides the sidebar menu.

Create `LoginPage.java`:

```java
package com.example;

import com.example.layout.BasePage;

public class LoginPage extends BasePage
{
    public LoginPage()
    {
        getMenuPanel().setVisible(false);
    }
}
```

Create `LoginPage.html`:

```html
<html>
<body>
  <wicket:extend>
    <h2>Login</h2>
    <form>
      <div>
        <label>Username:</label>
        <input type="text" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" />
      </div>
      <button type="submit">Log in</button>
    </form>
  </wicket:extend>
</body>
</html>
```

Calling `setVisible(false)` on the menu panel hides it along with its surrounding `<div>` tag. The rest of the layout (header, footer) remains intact.

## Step 6: Use panels for content reuse across pages

Panels are not limited to layout areas. You can use them to build reusable content blocks that appear on multiple pages. For example, a "recent activity" panel could appear on both the dashboard and the home page.

Create `RecentActivityPanel.java`:

```java
package com.example;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.panel.Panel;

public class RecentActivityPanel extends Panel
{
    public RecentActivityPanel(String id)
    {
        super(id);
        add(new Label("activityTitle", "Recent Activity"));
    }
}
```

Create `RecentActivityPanel.html`:

```html
<html>
<body>
  <wicket:panel>
    <div class="activity">
      <h3 wicket:id="activityTitle">Activity Title</h3>
      <ul>
        <li>Item one</li>
        <li>Item two</li>
      </ul>
    </div>
  </wicket:panel>
</body>
</html>
```

Now use it in `HomePage`:

```java
public class HomePage extends BasePage
{
    public HomePage()
    {
        add(new Label("message", "Welcome to My Application!"));
        add(new RecentActivityPanel("recentActivity"));
    }
}
```

Update `HomePage.html`:

```html
<html>
<body>
  <wicket:extend>
    <h2>Home</h2>
    <p wicket:id="message">Welcome message goes here</p>
    <div wicket:id="recentActivity">activity panel</div>
  </wicket:extend>
</body>
</html>
```

The same `RecentActivityPanel` can be added to any other page that extends `BasePage`.

## Step 7: Multi-level inheritance

Markup inheritance can go deeper than one level. You can create an intermediate page that extends `BasePage` and adds its own layout elements, and then have pages extend that intermediate page.

For example, an admin section might add a secondary toolbar:

```java
package com.example.admin;

import com.example.layout.BasePage;
import org.apache.wicket.markup.html.basic.Label;

public class AdminBasePage extends BasePage
{
    public AdminBasePage()
    {
        add(new Label("adminToolbar", "Admin Tools: Users | Reports | Config"));
    }
}
```

```html
<html>
<body>
  <wicket:extend>
    <div class="admin-toolbar" wicket:id="adminToolbar">Admin toolbar</div>
    <wicket:child />
  </wicket:extend>
</body>
</html>
```

Notice that `AdminBasePage` uses both `<wicket:extend>` (to inject into `BasePage`'s content slot) and `<wicket:child />` (to define a new slot for its own children). A page extending `AdminBasePage` would then use `<wicket:extend>` to fill that inner slot.

## Choosing between the two approaches

Wicket supports two styles of layout composition:

| Approach | When to use |
|---|---|
| **Panels with `replace()`** | When the content area contains a single interchangeable panel. You call `replace(new MyPanel(CONTENT_ID))` in the child page constructor. Good when each page's content is already packaged as a panel. |
| **`wicket:child` / `wicket:extend`** | When child pages define their own markup inline. No need to wrap content in a separate panel class. This is the more common approach and the one shown in this tutorial. |

Both approaches can be combined. You might use `<wicket:child>` for the main content slot while using panels for the sidebar and header.

## What you learned

In this tutorial you:

- Created reusable `Panel` components for header, footer, and menu areas
- Built a `BasePage` that assembles the layout and defines a `<wicket:child />` content slot
- Created child pages that inherit the layout using `<wicket:extend>`
- Customised the inherited layout by hiding the menu panel on the login page
- Used panels to share content blocks across multiple pages
- Explored multi-level markup inheritance with intermediate base pages

## Next steps

- [Adding AJAX to your pages](adding-ajax) -- Add interactivity to your layout pages
- [Testing Wicket pages](testing-your-pages) -- Write tests to verify your pages render correctly
- [Your first form](your-first-form) -- Build forms inside your inherited layout
