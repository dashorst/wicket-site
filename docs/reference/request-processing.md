---
layout: docs
title: "Request processing — from HTTP to rendered page"
description: "How an HTTP request travels through Wicket's request cycle, filters, and mappers to produce a response"
keywords: RequestCycle Application Session WebRequest WebResponse filter
category: reference
---

Beside configuring and initializing our application, the *Application* class is responsible for creating the internal entities used by Wicket to process a request. These entities are instances of the following classes: *RequestCycle*, *Request*, *Response* and *Session*.

The next paragraphs will illustrate each of these classes, explaining how they are involved into request processing.

The *Request* and *Response* classes are located in package *org.apache.wicket.request* and they provide an abstraction of the concrete request and response used by our web application.

Both classes are declared as abstract but if our application class inherits from *WebApplication* it will use their sub classes *ServletWebRequest* and *ServletWebResponse*, both of them located inside the package *org.apache.wicket.protocol.http.servlet.ServletWebRequest* and *ServletWebResponse* wrap respectively a *HttpServletRequest* and a *HttpServletResponse* object. If we need to access these low-level objects, we can call *Request*’s method *getContainerRequest()* and *Response*’s method *getContainerResponse()*.

Class *org.apache.wicket.request.cycle.RequestCycle* is the entity in charge of serving a web request. Our application class creates a new *RequestCycle* on every request with its method *createRequestCycle(request, response)*.

Method *createRequestCycle* is declared as final, so we can’t override it to return a custom subclass of *RequestCycle*. Instead, we must build a request cycle provider implementing interface *org.apache.wicket.IRequestCycleProvider*, and then we must tell our application class to use it via the *setRequestCycleProvider* method.

The current running request cycle can be retrieved at any time by calling its static method *RequestCycle.get()*. Strictly speaking this method returns the request cycle associated with the current (or local) thread, which is the thread that is serving the current request. A similar *get()* method is also implemented in classes *org.apache.wicket.Application* (as we have seen in <a href="#_configuration_of_wicket_applications" class="cross-reference">paragraph 4.2.2</a>) and *org.apache.wicket.Session* in order to get the application and the session in use by the current thread.

> [!NOTE]
> The implementation of the get method takes advantage of the standard class *java.lang.ThreadLocal*. See its JavaDoc for an introduction to local-thread variables.

Class *org.apache.wicket.Component* provides the *getRequestCycle()* method which is a convenience method that internally invokes *RequestCycle.get()*:

``` java
public final RequestCycle getRequestCycle() {
    return RequestCycle.get();
}
```

# RequestCycle and request processing

> [!NOTE]
> This paragraph will provide just the basic information about what happens behind the scenes of request processing. When you work with Wicket it’s unlikely to have a need for customizing this process, so we won’t cover this topic in detail.

In order to process a request, *RequestCycle* delegates the task to another entity which implements interface *org.apache.wicket.request.IRequestHandler*. There are different implementations of this interface, each suited for a particular type of requested resource (a page to render, an AJAX request, an URL to an external page, etc.).

To resolve the right handler for a given HTTP request, the *RequestCycle* uses a set of objects implementing the *org.apache.wicket.request.IRequestMapper* interface. The mapping interface defines the *getCompatibilityScore(Request request)* method which returns a score indicating how compatible the request mapper is for the current request. *RequestCycle* will choose the mapper with the highest score and it will call its *mapRequest(Request request)* method to get the proper handler for the given request. Once *RequestCycle* has resolved a request handler, it invokes its method *respond(IRequestCycle requestCycle)* to start request processing.

The following sequence diagram recaps how a request handler is resolved by the *RequestCycle*:

<figure>
<img src="/img/guide/request-cycle-handler.png" />
</figure>

Developers can create additional implementations of *IRequestMapper* and add them to their application via the *mount(IRequestMapper mapper)* method of the *WebApplication* class. In paragraph 10.6 we will see how Wicket uses this method to add built-in mappers for mounted pages.

# Generating URL with the urlFor and mapUrlFor methods

The *RequestCycle* is also responsible for generating the URL value (as *CharSequence*) for the following entities:

- a page class, via the *urlFor(Class\<C\> pageClass, PageParameters parameters)* method

- an *IRequestHandler* via the *urlFor(IRequestHandler handler)* method

- a *ResourceReference* via the *urlFor(ResourceReference reference, PageParameters params)* method (resource entities will be introduced in <a href="#_resource_management_with_wicket" class="cross-reference">chapter 19</a>).

The overloaded *urlFor* method from above also has a corresponding version that returns an instance of *org.apache.wicket.request.Url* instead of a *CharSequence*. This version has the prefix ’map’ in its name (i.e. it has *mapUrlFor* as full name).

# Method setResponsePage

The *RequestCycle* class contains the implementation of the *setResponsePage* method we use to redirect a user to a specific page (see <a href="#_wicket_links" class="cross-reference">paragraph 4.4</a>). The namesake method of class *org.apache.wicket.Component* is just a convenience method that internally invokes the actual implementation on current request cycle:

``` java
public final void setResponsePage(final Page page) {
    getRequestCycle().setResponsePage(page);
}
```

# RequestCycle’s hook methods and listeners

The *RequestCycle* comes with some hook methods which can be overridden to perform custom actions when request handling reaches a specific stage. These methods are:

- **onBeginRequest():** called when the RequestCycle is about to start handling the request.

- **onEndRequest():** called when the RequestCycle has finished to handle the request

- **onDetach():** called after the request handling has completed and the RequestCycle is about to be detached from its thread. The default implementation of this method invokes detach() on the current session (the Session class will be shortly discussed in paragraph 9.4).

Methods onBeginRequest and onEndRequest can be used if we need to execute custom actions before and after business code is executed, such as opening a Hibernate/JPA session and closing it when code has terminated.

A more flexible way to interact with the request processing is to use the listener interface *org.apache.wicket.request.cycle.IRequestCycleListener*. In addition to the three methods already seen for RequestCycle, this interface offers further hooks into request processing:

- **onBeginRequest(RequestCycle cycle):** (see the description above)

- **onEndRequest(RequestCycle cycle):** (see the description above)

- **onDetach(RequestCycle cycle):** (see the description above)

- **onRequestHandlerResolved(RequestCycle cycle, IRequestHandler handler):** called when an IRequestHandler has been resolved.

- **onRequestHandlerScheduled(RequestCycle cycle, IRequestHandler handler):** called when an IRequestHandler has been scheduled for execution.

- **onRequestHandlerExecuted(RequestCycle cycle, IRequestHandler handler):** called when an IRequestHandler has been executed.

- **onException(RequestCycle cycle, Exception ex):** called when an exception has been thrown during request processing.

- **onExceptionRequestHandlerResolved(RequestCycle rc, IRequestHandler rh, Exception ex):** called when an IRequestHandler has been resolved and will be used to handle an exception.

- **onUrlMapped(RequestCycle cycle, IRequestHandler handler, Url url):** called when an URL has been generated for an IRequestHandler object.

To use the request cycle listeners we must add them to our application which in turn will pass them to the new *RequestCycle*’s instances created with *createRequestCycle* method:

``` java
@Override
public void init() {

    super.init();

    IRequestCycleListener myListener;
    //listener initialization...
    getRequestCycleListeners().add(myListener)
}
```

The *getRequestCycleListeners* method returns an instance of class *org.apache.wicket.request.cycle.RequestCycleListenerCollection*. This class is a sort of typed collection for *IRequestCycleListener* and it also implements the [Composite pattern](http://en.wikipedia.org/wiki/Composite_pattern) .

In Wicket we use class *org.apache.wicket.Session* to handle session-relative information such as client information, session attributes, session-level cache (seen in paragraph 8.2), etc…

In addition, we know from paragraph 8.1 that Wicket creates a user session to store versions of stateful pages. Similarly to what happens with RequestCycle, the new Session’s instances are generated by the *Application* class with the *newSession(Request request, Response response)* method. This method is not declared as final, hence it can be overridden if we need to use a custom implementation of the Session class.

By default if our custom application class is a subclass of *WebApplication*, method *newSession* will return an instance of class *org.apache.wicket.protocol.http.WebSession*. As we have mentioned talking about *RequestCycle*, also class Session provides a static *get()* method which returns the session associated to the current thread.

# Session and listeners

Similar to the *RequestCycle*, class *org.apache.wicket.Session* also offers support for listener entities. With Session these entities must implement the callback interface *org.apache.wicket.ISessionListener* which exposes only the *onCreated(Session session)* method. As you might guess from its name, this method is called when a new session is created. Session listeners must be added to our application using a typed collection, just like we have done before with request cycle listeners:

``` java
@Override
public void init(){

    super.init();

    //listener initialization...
    ISessionListener myListener;
    //add a custom session listener
    getSessionListeners().add(myListener)

}
```

# Handling session attributes

The Session class handles session attributes in much the same way as the standard interface *jakarta.servlet.http.HttpSession*. The following methods are provided to create, read and remove session attributes:

- **setAttribute(String name, Serializable value):** creates an attribute identified by the given name. If the session already contains an attribute with the same name, the new value will replace the existing one. The value must be a serializable object.

- **getAttribute(String name):** returns the value of the attribute identified by the given name, or *null* if the name does not correspond to any attribute.

- **removeAttribute(String name):** removes the attribute identified by the given name.

By default class WebSession will use the underlying HTTP session to store attributes. Wicket will automatically add a prefix to the name of the attributes. This prefix is returned by the WebApplication’s method getSessionAttributePrefix().

# Accessing the HTTP session

If for any reason we need to directly access to the underlying *HttpSession* object, we can retrieve it from the current request with the following code:

``` java
HttpSession session = ((ServletWebRequest)RequestCycle.get()
        .getRequest()).getContainerRequest().getSession();
```

Using the raw session object might be necessary if we have to set a session attribute with a particular name without the prefix added by Wicket. Let’s say for example that we are working with Tomcat as web server. One of the administrative tools provided by Tomcat is a page listing all the active user sessions of a given web application:

<figure>
<img src="/img/guide/tomcat-admin-sessions.png" />
</figure>

Tomcat allows us to set the values that will be displayed in columns “Guessed locale” and “Guessed User name”. One possible way to do this is to use session attributes named “Locale” and “userName” but we can’t create them via Wicket’s Session class because they would not have exactly the name required by Tomcat. Instead, we must use the raw *HttpSession* and set our attributes on it:

``` java
HttpSession session = ((ServletWebRequest)RequestCycle.get().
        getRequest()).getContainerRequest().getSession();

session.setAttribute("Locale", "ENGLISH");
session.setAttribute("userName", "Mr BadGuy");
```

# Temporary and permanent sessions

Wicket doesn’t need to store data into user session as long as the user visits only stateless pages. Nonetheless, even under these conditions, a temporary session object is created to process each request but it is discarded at the end of the current request. To know if the current session is temporary, we can use the isTemporary() method:

``` java
Session.get().isTemporary();
```

If a session is not temporary (i.e. it is permanent), it’s identified by an unique id which can be read calling the getId() method. This value will be *null* if the session is temporary.

Although Wicket is able to automatically recognize when it needs to replace a temporary session with a permanent one, sometimes we may need to manually control this process to make our initially temporary session permanent.

To illustrate this possible scenario let’s consider project "BindSessionExample" where we have a stateless home page which sets a session attribute inside its constructor and then it redirects the user to another page which displays with a label the session attribute previously created. The code of the two pages is as follows:

Home page:

``` java
public class HomePage extends WebPage {
    public HomePage(final PageParameters parameters) {
        Session.get().setAttribute("username", "tommy");
    Session.get().bind();

    setResponsePage(DisplaySessionParameter.class);
    }
}
```

Target page:

``` java
public class DisplaySessionParameter extends WebPage {

    public DisplaySessionParameter() {
       super();
       add(new Label("username", (String) Session.get().getAttribute("username")));
    }
}
```

Again, we kept page logic very simple to not over-bloat the example with unnecessary code. In the snippet above we have also bolded Session’s bind() method which converts temporary session into a permanent one. If the home page has not invoked this method, the session with its attribute would have been discarded at the end of the request and the page *DisplaySessionParameter* would have displayed an empty value in its label.

# Discarding session data

Once a user has finished using our web application, she must be able to log out and clean any session data. To be sure that a permanent session will be discarded at the end of the current request, class Session provides the invalidate() method. If we want to immediately invalidate a given session without waiting for the current request to complete, we can invoke the invalidateNow() method.

> [!WARNING]
> Remember that invalidateNow() will immediately remove any instance of components (and pages) from the session, meaning that once we have called this method we won’t be able to work with them for the rest of the request process.

# Storing arbitrary objects with metadata

JavaServer Pages Specification1 defines 4 scopes in which a page can create and access a variable. These scopes are:

- **request:** variables declared in this scope can be seen only by pages processing the same request. The lifespan of these variables is (at most) equal to the one of the related request. They are discarded when the full response has been generated or when the request is forwarded somewhere else.

- **page:** variables declared in this scope can be seen only by the page that has created them.

- **session:** variables in session scope can be created and accessed by every page used in the same session where they are defined.

- **application:** this is the widest scope. Variables declared in this scope can be used by any page of a given web application.

Although Wicket doesn’t implement the JSP Specification (it is rather an alternative to it), it offers a feature called metadata which resembles scoped variables but is much more powerful. Metadata is quite similar to a Java Map in that it stores pairs of key-value objects where the key must be unique. In Wicket each of the following classes has its own metadata store: RequestCycle, Session, Application and Component.

The key used for metadata is an instance of class *org.apache.wicket.MetaDataKey\<T\>*. To put an arbitrary object into metadata we must use the setMetaData method which takes two parameters as input: the key used to store the value and the value itself. If we are using metadata with classes Session or Component, data object must be serializable because Wicket serializes both session and component instances. This constraint is not applied to metadata of classes Application and RequestCycle which can contain a generic object. In any case, the type of data object must be compatible with the type parameter T specified by the key.

To retrieve a previously inserted object we must use the *getMetaData(MetaDataKey\<T\> key)* method. In the following example we set a *java.sql.Connection* object in the application’s metadata so it can be used by any page of the application:

Application class code:

``` java
public class MetaDataApp extends WebApplication{
    //Do some stuff...
    /**
    * Metadata key definition
    */
    public static MetaDataKey<Connection> connectionKey = new MetaDataKey<> (){};

    /**
     * Application's initialization
     */
    @Override
    public void init(){

        super.init();
        Connection connection;
        //connection initialization...
        setMetaData(connectionKey, connection);
        //Do some other stuff..

    }
}
```

Code to get the object from the metadata:

``` java
Connection connection = Application.get().getMetaData(MetaDataApp.connectionKey);
```

Since MetaDataKey\<T\> class is declared as abstract, we must implement it with a subclass or with an anonymous class (like we did in the example above).
