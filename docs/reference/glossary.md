---
layout: docs
title: "Glossary — Wicket terminology explained"
description: "Plain-English explanations of Wicket terms like Models, Behaviors, Resources, and Panels"
category: reference
---

This glossary defines common Wicket terms in plain English. Where helpful, each entry includes a comparison to concepts from other frameworks.

---

**Application**
: The central configuration object for your Wicket web application. You subclass `WebApplication` to set up page mounts, security, resource settings, and dependency injection. There is one `Application` instance per web application.
: *Similar to:* Spring's `@SpringBootApplication` configuration class, or a JSF `faces-config.xml` setup.

**Behavior**
: A reusable add-on that you attach to a component to modify its markup or add functionality — without subclassing the component. Behaviors can add HTML attributes, contribute CSS/JavaScript, or handle AJAX events.
: *Similar to:* React higher-order components or hooks that add behavior without changing the wrapped component. In HTMX, attributes like `hx-get` serve a comparable role.

**Border**
: A component that wraps its child content with reusable decorating markup. The border provides the surrounding HTML (header, footer, frame) and the child content is inserted in the middle via `<wicket:body>`.
: *Similar to:* Thymeleaf layout dialect's `layout:decorate`, or JSF `<ui:composition>` with a template.

**Component**
: The fundamental building block of a Wicket UI. Every visible element — a label, a link, a form field, a panel — is a component. Components are Java objects bound to HTML tags via the `wicket:id` attribute.
: *Similar to:* React components, JSF `UIComponent`, or Thymeleaf fragments backed by a controller.

**CompoundPropertyModel**
: A model that automatically connects child components to properties of a single object, using each component's `wicket:id` as the property name. This eliminates the need to create individual models for every form field.
: *Similar to:* Vue's `v-model` binding to an object, or Spring MVC's `@ModelAttribute` that maps form fields to bean properties by name.

**Converter**
: An object that transforms raw string input (from HTTP) into a typed Java object and back. Wicket provides built-in converters for numbers, dates, enums, and more. You can register custom converters for your own types.
: *Similar to:* JSF converters (`@FacesConverter`), or Spring's `Converter<S, T>` interface.

**Detachable model**
: A model that releases its data at the end of each request cycle to avoid storing large objects in the session. The data is reloaded on the next request when needed. This pattern keeps serialized page size small.
: *Similar to:* A lazy-loading proxy in Hibernate that fetches data on access, or React's `useMemo` that recomputes only when dependencies change.

**Enclosure**
: A Wicket markup tag (`<wicket:enclosure>`) that automatically hides its entire contents when the controlling child component is not visible. This keeps your labels, wrappers, and other decorating HTML in sync with the data they display.
: *Similar to:* Vue's `v-if` on a wrapper element, or Thymeleaf's `th:if` applied to a containing `<div>`.

**Feedback panel**
: A component (`FeedbackPanel`) that collects and displays validation messages, error messages, and informational messages generated during form processing or page rendering.
: *Similar to:* JSF's `<h:messages>`, or a toast notification container in React.

**Form**
: A component that represents an HTML `<form>`. It manages the submit lifecycle: input conversion, validation, error reporting, and model updating. Forms can be nested, and each form can have its own submit button.
: *Similar to:* An HTML `<form>` handled by Spring MVC's `@PostMapping`, or a JSF `<h:form>`.

**Fragment**
: A lightweight alternative to Panel for conditionally showing different blocks of HTML. Fragments are defined inline in the parent's markup file using `<wicket:fragment>` tags, so you avoid creating separate HTML files for small markup variations.
: *Similar to:* Qute template fragments (`{#fragment}`), or the target of an HTMX `hx-swap` that swaps in a section of the same page.

**IModel / Model**
: The interface that provides data to a component. Instead of passing raw values, you pass a model that knows how to get (and optionally set) the value. This allows components to always work with fresh data and supports two-way binding.
: *Similar to:* React state (`useState`) or an observable in RxJS — the component reads from it and can write back to it.

**LambdaModel**
: A concise way to create a model using Java lambda expressions for the getter and setter. This avoids the need for anonymous inner classes and keeps model code readable.
: *Similar to:* Kotlin property delegates, or computed properties in Vue.

**ListView**
: A repeater that renders one child item per entry in a Java `List`. Each item gets its own `ListItem` container where you add labels, links, and other components. Best for small to medium lists where all items are rendered at once.
: *Similar to:* React's `array.map()` rendering pattern, Vue's `v-for`, or JSF's `<ui:repeat>`.

**Markup inheritance**
: The ability for a page or panel subclass to inherit the HTML template of its parent class and selectively override marked sections. The parent template defines `<wicket:child>` placeholders, and the subclass fills them using `<wicket:extend>`.
: *Similar to:* Thymeleaf layout dialect's template inheritance, JSF's `<ui:composition template="...">`, or Django template `{% extends %}` blocks.

**Package resource**
: A static file (CSS, JavaScript, image, etc.) stored in the same Java package as a component class. Wicket serves it automatically and generates a versioned URL. This keeps components self-contained with their own assets.
: *Similar to:* A CSS Module co-located with a React component, or a Vite asset import.

**Page**
: A top-level component that represents a full web page. Every Wicket URL ultimately resolves to a Page. Pages have their own HTML template and can be stateful (stored in session) or stateless (recreated each request).
: *Similar to:* A React page component in Next.js, a JSF Facelets page, or a Thymeleaf template mapped to a Spring controller.

**PageParameters**
: A multimap of named string values extracted from the URL. Used to pass data to bookmarkable pages — for example, `/products/42` where `42` is a page parameter.
: *Similar to:* Spring MVC's `@PathVariable` and `@RequestParam`, or Next.js route params.

**Panel**
: A reusable component with its own separate HTML template file. Panels are the primary way to create reusable UI building blocks — a navigation bar, a user card, a comment widget.
: *Similar to:* A React component with its own JSX, a JSF composite component, or a Thymeleaf fragment with its own file.

**PropertyModel**
: A model that reads and writes a property of an object using a dotted path expression, such as `"address.city"`. Useful for binding a single form field to a nested property of a domain object.
: *Similar to:* Spring EL expressions like `${user.address.city}`, or lodash's `_.get(obj, 'a.b.c')`.

**Repeater**
: The general term for components that repeat their markup once per item in a collection. Wicket provides several repeater types: `RepeatingView` for simple cases, `ListView` for lists, and `DataView` for large paginated datasets.
: *Similar to:* `v-for` in Vue, `{items.map(...)}` in React, or `<ui:repeat>` in JSF.

**RequestCycle**
: The object that manages processing of a single HTTP request from start to finish. It coordinates URL mapping, page resolution, component rendering, response writing, and cleanup. Each request gets its own RequestCycle instance.
: *Similar to:* Spring's `DispatcherServlet` request handling pipeline, or the JSF lifecycle.

**Resource**
: Anything Wicket serves that is not a page — CSS files, JavaScript files, images, dynamically generated PDFs, JSON endpoints, file downloads, and so on. Resources can be static (files on the classpath) or dynamic (generated on each request).
: *Similar to:* A Spring `@ResponseBody` endpoint or a static asset served by a CDN.

**ResourceReference**
: A stable, serializable pointer to a resource. Instead of passing around the resource itself, you pass a reference that Wicket can resolve to the actual resource when needed. This keeps pages serializable and enables resource caching and versioning.
: *Similar to:* A Spring `ResourceHandler` mapping, or a Vite `import` of a static asset that resolves to a hashed URL.

**Session**
: The server-side object that holds per-user state across requests — the current locale, authentication info, feedback messages, and (for stateful pages) the page store. Wicket creates a session automatically when needed.
: *Similar to:* An HTTP session in any Java web framework, or server-side session state in Next.js.

**Stateful page / Stateless page**
: A stateful page stores its component tree in the session so it can process callbacks and maintain form state across requests. A stateless page is recreated from scratch on each request — it uses no session storage, scales better, and produces bookmarkable URLs. Choose stateless when you can, stateful when you need interactive state.
: *Similar to:* Server components vs. client components in React/Next.js — server components are stateless and rendered fresh, client components maintain state.

**WicketTester**
: A test harness that simulates a browser interacting with your Wicket application in JUnit tests — without starting a servlet container. You can render pages, click links, submit forms, and assert on the resulting markup and component state.
: *Similar to:* React Testing Library's `render` and `fireEvent`, Spring's `MockMvc`, or JSF's Arquillian test framework.

**wicket:child / wicket:extend**
: Markup tags used for template inheritance. A parent page places `<wicket:child/>` where subclass content should go. The subclass wraps its content in `<wicket:extend>...</wicket:extend>` to fill that slot.
: *Similar to:* Django's `{% block content %}` / `{% endblock %}`, or Thymeleaf's `layout:fragment`.

**wicket:enclosure**
: A markup tag that groups a component and its surrounding decoration (labels, wrappers) so that everything is hidden automatically when the main component is invisible. Avoids manually synchronizing visibility of related elements.
: *Similar to:* Vue's `v-if` wrapping a group of elements, or a Svelte `{#if}` block.

**wicket:fragment**
: A markup tag that defines an inline HTML block within a page or panel template. The block can be referenced by a `Fragment` component to conditionally display different content without needing a separate HTML file.
: *Similar to:* Qute's `{#fragment}` blocks, or named slots in Vue/Svelte.

**wicket:id**
: The HTML attribute that connects a tag in your HTML template to a Java component. Every component you add in Java must have a matching `wicket:id` in the markup. This is the fundamental link between your HTML and your Java code.
: *Similar to:* React's JSX where component names map to imports, or Thymeleaf's `th:field` that binds to a backing bean property.
