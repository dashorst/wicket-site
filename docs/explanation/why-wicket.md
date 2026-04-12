---
layout: docs
title: "Why Wicket"
description: "Understanding the benefits and philosophy behind Apache Wicket"
category: explanation
---

Software development is a challenging activity and developers must keep their skills up-to-date with new technologies.

But before starting to learn the latest “coolest” framework we should always ask ourselves if it is the right tool for us and how it can improve our everyday job. Java’s ecosystem is already full of many well-known web frameworks, so why should we spend our time learning Wicket?

This chapter will show you how Wicket is different from other web frameworks you may know and it will explain also how it can improve your life as web developer.

…but we all hate spaghetti code! That’s why in the first half of the 2000s we saw the birth of so many web frameworks. Their mission was to separate our business code from presentation layer (like JSP pages).

Some of them (like Struts, Spring MVC, Velocity, etc…) have become widely adopted and they made the MVC pattern very popular among developers. However, none of these frameworks offers a real object-oriented (OO) abstraction for web pages and we still have to take care of web-related tasks such as HTTP request/response handling, URL mapping, storing data into user sessions and so on.

The biggest limit of MVC frameworks is that they don’t do much to overcome the impedance mismatch between the stateless nature of HTTP protocol and the need for our web applications to handle (a very complex) state.

To overcome these limits developers have started to adopt a new generation of component oriented web frameworks designed to provide a completely different approach to web development.

Component oriented frameworks differ from classic web frameworks in that they build a model of requested pages on the server side and the HTML sent back to the client is generated according to this model. You can think of the model as if it was an “inverse” JavaScript DOM, meaning that:

1.  it is built on the server-side

2.  it is built before HTML is sent to the client

3.  HTML code is generated using this model and not vice versa.

<figure>
<img src="/img/guide/requesthandling-general.png" />
</figure>

*General schema of page request handling for a component oriented framework*

With this kind of framework our web pages and their HTML components (forms, input controls, links, etc…), are pure class instances. Since pages are class instances, they live inside the JVM heap and we can handle them as we do with any other Java class. This approach is very similar to what GUI frameworks (like Swing or SWT) do with desktop windows and their components. Wicket and the other component oriented frameworks bring to web development the same kind of abstraction that GUI frameworks offer when we build a desktop application. Most of those kind of frameworks hide the details of the HTTP protocol and naturally solve the problem of its stateless nature.

At this point some people may still wonder why OOP is so important for web development and what benefits it can bring to developers. Let’s quickly review the main advantages that this paradigm can offer us:

- **Web pages are objects**: web pages are not just text files sent back to the client. They are object instances and we can harness OOP to design web pages and their components. With Wicket we can also apply inheritance to HTML markup in order to build a consistent graphic layout for our applications (we will see markup inheritance in <a href="#layout.adoc#_here_comes_the_inheritance" class="cross-reference">chapter 4.2</a>).

- **We don’t have to worry about an application’s state**: pages and components can be considered stateful entities. They are Java objects and they can keep a state inside them and reference other objects. We can stop worrying about keeping track of user data stored inside the *HttpSession* and we can start managing them in a natural and transparent way.

- **Testing web applications is much easier**: since pages and components are pure objects, you can use JUnit to test their behavior and to ensure that they render as expected. Wicket has a set of utility classes for unit testing that simulate user interaction with web pages, hence we can write acceptance tests using just JUnit without any other test framework (unit testing is covered in <a href="#_test_driven_development_with_wicket" class="cross-reference">chapter 23</a>).

Wicket is not the only component oriented framework available in the Java ecosystem. Among its competitors we can find GWT (from Google), JSF (Jakarta Faces), Vaadin (from Vaadin Ltd.), etc… Even if Wicket and all those other frameworks have their pros and cons, there are good reasons to prefer Wicket over them:

- **Wicket is 100% open source**: Wicket is a top Apache project and it doesn’t depend on any private company. You don’t have to worry about future licensing changes, Wicket will always be released under Apache license 2.0 and freely available.

<!-- -->

- **Wicket is a community driven project**: The Wicket team supports and promotes the dialogue with the framework’s users through two mailing lists [(one for users and another one for framework developers)](https://wicket.apache.org/help/email.html) and an [GitHub Issues](https://github.com/apache/wicket/issues) (the issue tracking system). Moreover, as any other Apache project, Wicket is developed paying great attention to user feedback and to suggested features.

<!-- -->

- **Wicket is just about Java and good old HTML**: almost all web frameworks force users to adopt special tags or to use server side code inside HTML markup. This is clearly in contrast with the concept of separation between presentation and business logic and it leads to a more confusing code in our pages. In Wicket we don’t have to take care of generating HTML inside the page itself, and we won’t need to use any tag other than standard HTML tags. All we have to do is to attach our components (Java instances) to the HTML tags using a simple tag attribute called *wicket:id* (we will shortly see how to use it).

<!-- -->

- **With Wicket we can easily use JavaBeans and [POJO](https://en.wikipedia.org/wiki/Plain_Old_Java_Object) in our web tier**: one of the most annoying and error-prone tasks in web development is collecting user input through a form and keeping form fields updated with previously inserted values. This usually requires a huge amount of code to extract input from request parameters (which are strings), parse them to Java types and store them into some kind of variable. And this is just half of the work we have to do as we must implement the inverse path (load data from Java to the web form). Moreover, most times our forms will use a JavaBean or a POJO as a backing object, meaning that we must manually map form fields with the corresponding object fields and vice versa. Wicket comes with an intuitive and flexible mechanism that does this mapping for us without any configuration overhead (using a convention over configuration approach) and in a transparent way. <a href="#_wicket_models_and_forms" class="cross-reference">Chapter 10</a> will introduce a Wicket model concept and we will learn how to harness this entity with forms.

<!-- -->

- **No complex XML needed**: Wicket was designed to minimize the amount of configuration files needed to run our applications. No XML file is required except for the standard deployment descriptor web.xml (unless you are using Jakarta Servlet. See <a href="#whyLearn.adoc#_component_oriented_frameworks_an_overview" class="cross-reference">Chapter 4</a> for more details).
