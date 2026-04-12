---
layout: docs
title: "Markup inheritance"
description: "Using markup inheritance and child pages to create consistent layouts"
category: explanation
---

Before going ahead with more advanced topics, we will see how to maintain a consistent layout across our site using Wicket and its component-oriented features. Probably this is not the most interesting use we can get out of Wicket, but it is surely the simplest one so it’s the best way to get our hands dirty with some code.

There was a time in the 90s when Internet was just a buzzword and watching a plain HTML page being rendered by a browser was a new and amazing experience. In those days we used to organize our page layout using the *\<frame\>* HTML tag. Over the years this tag has almost disappeared from our code and it survives only in few specific domains. For example is still being used by JavaDoc.

With the adoption of server side technologies like JSP, ASP or PHP the tag *\<frame\>* has been replaced by a template-based approach where we divide our page layout into some common areas that will be present in each page of our web application. Then, we manually insert these areas in every page including the appropriate markup fragments.

In this chapter we will see how to use Wicket to build a site layout. The sample layout we will use is a typical page layout consisting of the following areas:

- **a header** which could contain site title, some logos, a navigation bar, etc…

- **a left** menu with a bunch of links to different areas/functionalities of the site.

- **a footer** with generic information like webmaster’s email, the company address, etc…

- **a content** area which usually contains the functional part of the page.

The following picture summarises the layout structure:

<figure>
<img src="/img/guide/layout.png" />
</figure>

Once we have chosen a page layout, our web designer can start building up the site theme. The result is a beautiful mock of our future web pages. Over this mock we can map the original layout areas:

<figure>
<img src="/img/guide/layout-mock.png" />
</figure>

Now in order to have a consistent layout across all the site, we must ensure that each page will include the layout areas seen above. With an old template-based approach we must manually put them inside every page. If we were using JSP we would probably end up using *include* directive to add layout areas in our pages. We would have one *include* for each of the areas (except for the content):

<figure>
<img src="/img/guide/layout-include.png" />
</figure>

> [!NOTE]
> For the sake of simplicity we can consider each included area as a static HTML fragment.

Now let’s see how we can handle the layout of our web application using Wicket.

The need of ensuring a consistent layout across our pages unveiled a serious limit of the HTML: the inability to apply inheritance to web pages and their markup. Wouldn’t it be great if we could write our layout once in a page and then inherit it in the other pages of our application? One of the goals of Wicket is to overcome this kind of limit.

# Markup inheritance

As we have seen in the previous chapter, Wicket pages are pure Java classes, so we can easily write a page which is a subclass of another parent page. But in Wicket inheritance is not limited to the classic object-oriented code inheritance. When a class subclasses a *WebPage* it also inherits the HTML file of the parent class. This type of inheritance is called markup inheritance. To better illustrate this concept let’s consider the following example where we have a page class called *GenericSitePage* with the corresponding HTML file GenericSitePage.html. Now let’s create a specific page called *OrderCheckOutPage* where users can check out their orders on our web site. This class extends *GenericSitePage* but we don’t provide it with any corresponding HTML file. In this scenario *OrderCheckOutPage* will use GenericSitePage.html as markup file:

<figure>
<img src="/img/guide/markup-inheritance.png" />
</figure>

Markup inheritance comes in handy for page layout management as it helps us avoid the burden of checking that each page conforms to the site layout. However to fully take advantage of markup inheritance we must first learn how to use another important component of the framework that supports this feature: the panel.

> [!WARNING]
> If no markup is found (nor directly assigned to the class, neither inherited from an ancestor) a *MarkupNotFoundException* is thrown.

# Panel class

Class *org.apache.wicket.markup.html.panel.Panel* is a special component which lets us reuse GUI code and HTML markup across different pages and different web applications. It shares a common ancestor class with WebPage class, which is *org.apache.wicket.MarkupContainer*:

<figure>
<img src="/img/guide/page-panel-hierarchy.png" />
</figure>

*Illustration: Hierarchy of WebPage and Panel classes*

Subclasses of *MarkupContainer* can contain children components that can be added with method *add(Component…)* (seen in <a href="#_benefits_of_component_oriented_frameworks_for_web_development" class="cross-reference">chapter 3.3</a>). *MarkupContainer* implements a full set of methods to manage children components. The basic operations we can do on them are:

- add one or more children components (with method *add*).

- remove a specific child component (with method *remove*).

- retrieve a specific child component with method *get(String)*. The string parameter is the id of the component or its relative path if the component is nested inside other *MarkupContainers*. This path is a colon-separated string containing also the ids of the intermediate containers traversed to get to the child component. To illustrate an example of component path, let’s consider the code of the following page:

``` java
MyPanel myPanel = new MyPanel ("innerContainer");
add(myPanel);
```

Component *MyPanel* is a custom panel containing only a label having **"name"** as id. Under those conditions we could retrieve this label from the container page using the following path expression:

``` java
Label name = (Label)get("innerContainer:name");
```

- replace a specific child component with a new component having the same id (with method *replace*).

- iterate through children components. This can be done in the old way (pre-Wicket 8) using method *iterator* or using visitor pattern with method *visitChildren*. The same task can be accomplished using Java Streams and Lambdas with methods *stream* (which returns a stream containing only the direct children) and *streamChildren* (which returns a stream containing all children).

Both *Panel* and *WebPage* have their own associated markup file which is used to render the corresponding component. If such file is not provided, Wicket will apply markup inheritance looking for a markup file through their ancestor classes. When a panel is attached to a container, the content of its markup file is inserted into its related tag.

While panels and pages have much in common, there are some notable differences between these two components that we should keep in mind. The main difference between them is that pages can be rendered as standalone entities while panels must be placed inside a page to be rendered. Another important difference is the content of their markup file: for both *WebPage* and *Panel* this is a standard HTML file, but *Panel* uses a special tag to indicate which part of the whole file will be considered as markup source. This tag is *\<wicket:panel\>*. A markup file for a panel will typically look like this:

``` html
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
...
</head>
<body>
   <wicket:panel>
      <!-- Your markup goes here -->
   </wicket:panel>
</body>
</html>
```

The HTML outside tag *\<wicket:panel\>* will be removed during rendering phase. The space outside this tag can be used by both web developers and web designers to place some mock HTML to show how the final panel should look like.

Let’s go back to our layout example. In <a href="#layout.adoc#_header_footer_left_menu_content_etc" class="cross-reference">chapter 5.1</a> we have divided our layout in common areas that must be part of every page. Now we will build a reusable template page for our web application combining pages and panels. The code examples are from project MarkupInheritanceExample.

# Panels and layout areas

First, let’s build a custom panel for each layout area (except for ’content’ area). For example given the header area

<figure>
<img src="/img/guide/header-area.png" />
</figure>

we can build a panel called *HeaderPanel* with a related markup file called HeaderPanel.html containing the HTML for this area:

``` html
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
...
</head>
<body>
   <wicket:panel>
      <table width="100%" style="border: 0px none;">
          <tbody>
            <tr>
              <td>
                <img alt="Jug4Tenda" src="wicketLayout_files/logo_jug4tenda.gif">
              </td>
              <td>
                <h1>Gestione Anagrafica</h1>
              </td>
             </tr>
          </tbody>
      </table>
   </wicket:panel>
</body>
</html>
```

The class for this panel simply extends base class *Panel*:

``` java
package helloWorld.layoutTenda;

import org.apache.wicket.markup.html.panel.Panel;

public class HeaderPanel extends Panel {

    public HeaderPanel(String id) {
        super(id);
    }
}
```

For each layout area we will build a panel like the one above that holds the appropriate HTML markup. In the end we will have the following set of panels:

- HeaderPanel

- FooterPanel

- MenuPanel

Content area will change from page to page, so we don’t need a reusable panel for it.

# Template page

Now we can build a generic template page using our brand new panels. Its markup is quite straightforward :

``` html
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
...
<!--Include CSS-->
...
</head>
<body>
<div id="header" wicket:id="headerPanel">header</div>
<div id="body">
    <div id="menu" wicket:id="menuPanel">menu</div>
    <div id="content" wicket:id="contentComponent">content</div>
</div>
<div id="footer" wicket:id="footerPanel">footer</div>
</body>
</html>
```

The HTML code for this page implements the generic left-menu layout of our site. You can note the 4 *\<div\>* tags used as containers for the corresponding areas. The page class contains the code to physically assemble the page and panels:

``` java
package helloWorld.layoutTenda;

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.Component;
import org.apache.wicket.markup.html.basic.Label;

public class JugTemplate extends WebPage {
    public static final String CONTENT_ID = "contentComponent";

    private Component headerPanel;
    private Component menuPanel;
    private Component footerPanel;

    public JugTemplate(){
        add(headerPanel = new HeaderPanel("headerPanel"));
        add(menuPanel = new MenuPanel("menuPanel"));
        add(footerPanel = new FooterPanel("footerPanel"));
        add(new Label(CONTENT_ID, "Put your content here"));
    }

    //getters for layout areas
    //...
}
```

Done! Our template page is ready to be used. Now all the pages of our site will be subclasses of this parent page and they will inherit the layout and the HTML markup. They will only substitute the *Label* inserted as content area with their custom content.

# Final example

As final example we will build the login page for our site. We will call it *SimpleLoginPage*. First, we need a panel containing the login form. This will be the content area of our page. We will call it *LoginPanel* and the markup is the following:

``` html
<html>
<head>
</head>
<body>
   <wicket:panel>
    <div style="margin: auto; width: 40%;">
       <form  id="loginForm" method="get">
         <fieldset id="login" class="center">
            <legend >Login</legend>
            <span >Username: </span><input type="text" id="username"/><br/>
            <span >Password: </span><input type="password" id="password" />
            <p>
               <input type="submit" name="login" value="login"/>
            </p>
         </fieldset>
      </form>
    </div>
   </wicket:panel>
</body>
</html>
```

The class for this panel just extends *Panel* class so we won’t see the relative code. The form of this panel is for illustrative purpose only. We will see how to work with Wicket forms in chapters <a href="#_wicket_models_and_forms" class="cross-reference">11</a> and <a href="#_wicket_forms_in_detail" class="cross-reference">12</a>. Since this is a login page we don’t want it to display the left menu area. That’s not a big deal as *Component* class exposes a method called *setVisible* which sets whether the component and its children should be displayed.

The resulting Java code for the login page is the following:

``` java
package helloWorld.layoutTenda;
import helloWorld.LoginPanel;
public class SimpleLoginPage extends JugTemplate {
    public SimpleLoginPage(){
        super();
        replace(new LoginPanel(CONTENT_ID));
        getMenuPanel().setVisible(false);
    }
}
```

Obviously this page doesn’t come with a related markup file. You can see the final page in the following picture:

<figure>
<img src="/img/guide/final-login-page.png" />
</figure>

With Wicket we can apply markup inheritance using another approach based on the tag *\<wicket:child\>*. This tag is used inside the parent’s markup to define where the children pages/panels can “inject” their custom markup extending the markup inherited from the parent component. An example of a parent page using the tag *\<wicket:child\>* is the following:

``` html
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
</head>
<body>
    This is parent body!
    <wicket:child/>
</body>
</html>
```

The markup of a child page/panel must be placed inside the tag *\<wicket:extend\>*. Only the markup inside *\<wicket:extend\>* will be included in final markup. Here is an example of child page markup:

``` html
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
    <wicket:extend>
      This is child body!
    </wicket:extend>
</body>
</html>
```

Considering the two pages seen above, the final markup generated for child page will be the following:

``` html
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
    This is parent body!
    <wicket:child>
      <wicket:extend>
        This is child body!
      </wicket:extend>
    </wicket:child>
</body>
</html>
```

# Our example revisited

Applying *\<wicket:child\>* tag to our layout example, we obtain the following markup for the main template page:

``` html
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
</head>
<body>
<div id="header" wicket:id="headerPanel">header</div>
<div id="body">
    <div id="menu" wicket:id="menuPanel">menu</div>
    <wicket:child/>
</div>
<div id="footer" wicket:id="footerPanel">footer</div>
</body>
</html>
```

We have replaced the *\<div\>* tag of the content area with the tag *\<wicket:child\>*. Going forward with our example we can build a login page creating class *SimpleLoginPage* which extends the *JugTemplate* page, but with a related markup file like this:

``` html
<html>
<head>
</head>
<body>
   <wicket:extend>
    <div style="margin: auto; width: 40%;">
       <form  id="loginForm" method="get">
         <fieldset id="login" class="center">
            <legend >Login</legend>               
            <span >Username: </span><input type="text" id="username"/><br/>                                                                  
            <span >Password: </span><input type="password" id="password" />
            <p>
               <input type="submit" name="login" value="login"/>
            </p>
         </fieldset>
      </form>
    </div>   
   </wicket:extend>
</body>
</html>
```

As we can see this approach doesn’t require to create custom panels to use as content area and it can be useful if we don’t have to handle a GUI with a high degree of complexity.
