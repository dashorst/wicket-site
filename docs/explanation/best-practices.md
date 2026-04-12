---
layout: docs
title: "Best practices"
description: "Recommended patterns and practices for building Wicket applications"
category: explanation
---

This section is addressed to developers, who have already made their first experiences with Apache Wicket. Developers who get into Wicket often have difficulties with it because they apply the typical JSF and Struts patterns and approaches. These frameworks primarily use procedural programming methods. In contrast Wicket is strongly based on object oriented patterns. So forget all Struts and JSF patterns, otherwise you won’t have fun with Wicket in the long run.

A component should be self-contained. The user of a component should neither have to know nor care about its internal structure. She should just be familiar with its external interfaces and its documentation in order to be able to use it. This means in detail: Every component that extends Wicket’s own Panel type (thus is a Panel itself) must provide its own HTML template. In contrast, when a component extends the classes *WebMarkupContainer* or *Form*, there is no HTML template. This implies that you should add components through composition in *WebMarkupContainer* or *Form*.

**Listing 1:**

``` java
// Poor component
public class RegistrationForm extends Form<Registration> {
    public RegistrationForm(String id, IModel<Registration> regModel) {
        super(id, new CompoundPropertyModel<Registration>(regModel))
        // Wrong: RegistrationForm provides its own components
        add(new TextField("username"));
        add(new TextField("firstname"));
        add(new TextField("lastname"));
    }
}
```

This snippet is an example for a poor component. The user of the *RegistrationForm* must know the internal structure of the markup and component in order to use it.

**Listing 2:**

``` java
public class RegistrationPage extends Page {
    public RegistrationPage(IModel<Registration> regModel) {
        Form<?> form = new RegistrationForm("form");
        form.add(new SubmitButton("register") {
            public void onSubmit() {
                 // do something
            }
        });
        add(form);
    }
}
```

``` html
<html>
<body>
    <form wicket:id="form">
        <!-- These are internal structure information from RegistrationForm -->
        Username <input type="text" wicket:id="username"/>
        First name <input type="text" wicket:id="firstname"/>
        Last name <input type="text" wicket:id="lastname"/>
        <!-- Above new components from page which the user knows  -->
        <input type="submit" wicket:id="register" value="Register"/>
    </form>
</body>
</html>
```

The code above shows the usage of the poor component in the *RegistrationPage*. You can see that the input fields *firstname*, *lastname* and *username* get used, even though these components are not added explicitly to the *RegistrationPage*. Avoid this, because other developers cannot directly see that the components were added in *RegistrationPage* class.

**Listing 3:**

``` java
// Good component
public class RegistrationInputPanel extends Panel{
    public RegistrationInputPanel(String id, IModel<Registration> regModel) {
        super(id, regModel);
        IModel<Registration> compound = new CompoundPropertyModel<Registration>(regModel);
        Form<Registration> form = new Form<Registration>("form", compound);
        // Correct: Add components to Form over the instance variable
        form.add(new TextField("username"));
        form.add(new TextField("firstname"));
        form.add(new TextField("lastname"));
        add(form);
    }
}
```

``` html
<html>
<body>
    <wicket:panel>
    <form wicket:id="form">
        Username <input type="text" wicket:id="username"/>
        First name <input type="text" wicket:id="firstname"/>
        Last name <input type="text" wicket:id="lastname"/>
    </form>
    </wicket:panel>
</body>
</html>
```

Now we have a properly encapsulated input component which provides its own markup. Furthermore you can see the correct usage of a Wicket *Form*. The components get added by calling *form.add(Component)* on the instance variable. On the other hand, it is allowed to add behaviours and validators over inheritance, because those do not have markup ids which must be bound.

With that, the usage of *RegistrationInputPanel* is much more intuitive. There is no markup of other embedded components present anymore, just markup of components which get directly added. The *RegistrationPage* provides its own form that delegates the submit to all Wicket nested forms which are contained in the component tree.

**Listing 4:**

``` java
public class RegistrationPage extends Page {
    public RegistrationPage(IModel<Registration> regModel) {
        Form<?> form = new Form("form");
        form.add(new RegistrationInputPanel("registration", regModel));
        form.add(new SubmitButton("register") {
            public void onSubmit() {
              // do something
            }
        });
        add(form);
    }
}
```

``` html
<html>
<body>
    <form wicket:id="form">
        <div wicket:id="registration">
           Display the RegistrationInputPanel
        </div>
        <input type="submit" wicket:id="register" value="Register"/>
    </form>
</body>
</html>
```

In contrast to Struts, Wicket pages and components are no singletons, they are stateful and session-scoped. This enables us to store user-specific information within pages and components. The information should be stored in fields. This way you can access the information within a class while avoiding long method signatures only for passing the same information around. Instances of components can exist for several requests. For example, a page with a form which gets submitted and produces validation errors uses the same page instance. Furthermore the same page instance gets used when the user presses the back button of the browser and resubmits this form again. Information which gets passed by the constructor should be assigned to fields (normally this must be models). When storing information in fields you should consider that the information is serializable, because the pages are stored using Java serialization. By default Wicket stores pages on the hard disk. A non-serializable object leads to *NullPointerExceptions* and *NonSerializableExceptions*. Additionally, big data (like binary stuff) should not be stored directly in fields because this can cause performance losses and memory leaks during serialization and deserialization. In this case, you should use the *LoadableDetachableModel* which can be assigned to a field because this provides an efficient mechanism to load and detach data.

For many developers, naming is a dispensable thing, but I think it is one of the major topics in software development. With the help of correct naming, you can easily identify the business aspects of a software component. Additionally, good naming avoids unnecessary and bad comments.

Bad namings for Wicket-IDs are *birthdateTextField*, *firstnameField* and *addressPanel*. Why? The naming contains two aspects: A technical aspect (*"TextField"*) and the business aspect (*"birthdate"* ). Only the business aspect is relevant because both the HTML template as well as the Java code already contain the technical details (*new TextField("birthdate")*). Additionally, such names add a lot of effort when you do technical refactorings, e.g. if you have to replace a *TextField* by a *DatePicker* and the Wicket ID *birthdateTextField* becomes *birthdateDatePicker*. Another reason for avoiding technical aspects in Wicket IDs is the *CompoundPropertyModel*. This model delegates the properties to its child components named by Wicket IDs (see listing 3). For example the *TextField username* automatically calls *setUsername()* and *getUsername()* on the *Registration* object. A setter like *setUsernameTextField()* would be very inconvenient here.

You should consider the component tree as a constant and fixed skeleton which gets revived when its model is filled with data like a robot without brain. Without brain the robot is not able to do anything and is just a dead and fixed skeleton. However, when you fill it with data, it becomes alive and can act. There is no need for changing hardware when filling it with data.

In Wicket, you should manipulate the component tree as little as possible. Consequently, you should avoid calling methods like *Component.replace(Component)* and *Component.remove(Component)*. Calling these methods indicates missing usage or misusage of Wicket’s models. Furthermore the component trees should not be constructed using conditions (see listing 5). This reduces the possibility of reusing the same instance significantly.

**Listing 5:**

``` java
// typical for struts
if(MySession.get().isNotLoggedIn()) {
    add(new LoginBoxPanel("login"))
}
else {
    add(new EmptyPanel("login"))
}
```

Instead of constructing *LoginBoxPanel* conditionally, it is recommended to always add the panel and set the visibility within *onConfigure()*. So the component *LoginBoxPanel* is responsible for displaying itself. We move the responsibility into the same component which executes the login. Brilliant! Cleanly encapsulated business logic. There is no decision from outside, the component handles all the logic. You can see another example in "Implement visibilities of components correctly" .

Visibility of components is an important topic. In Wicket you control any component’s visibility via the methods *isVisible()* and *setVisible()*. These methods are within Wicket’s base class *Component* and therefore it is applicable for every component and page. Let’s have a look at a concrete example of *LoginBoxPanel*. The panel just gets displayed when the user is not logged in.

**Listing 6:**

``` java
// Poor implementation
LoginBoxPanel loginBox = new LoginBoxPanel("login");
loginBox.setVisible(MySession.get().isNotLoggedIn());
add(loginBox);
```

Listing 6 shows a poor implementation, because a decision about the visibility is made while instantiating the component. Again, in Wicket instances of components exist for several requests.

To reuse the same instance you have to call *loginBox.setVisible(false)*. This is very unhandy, because we always have to call *setVisible()* and manage the visibility manually from the outside.

This approach is error-prone and fragile, because we always have to pay attention to setting the correct information every time. But this is often forgotten because the logic might be widely spread over the code.

The solution is the Hollywood principle: "Don’t call us, we’ll call you". Take a look at the following diagram illustrating an application flow with some calls. We avoid three calls through the [Hollywood-Principle](http://en.wikipedia.org/wiki/Hollywood_Principle) and we just have to instantiate the *LoginBoxPanel*.

<figure>
<img src="/img/guide/login_calls_hollywood.png" />
</figure>

**Listing 7:**

``` java
public class LoginBoxPanel {
    // constructor etc.
    @Override
    public void onConfigure() {
        setVisible(MySession.get().isNotLoggedIn());
    }
}
```

Now the control over visibility has been inverted, the *LoginBoxPanel* decides on its visibility autonomously.

For each call of *onConfigure()* there is a refreshed interpretation of the login state. Hence, there is no additional state that might be outdated. The logic is centralized in one line code and not spread throughout the application. Furthermore, you can easily identify that the technical aspect of visibility correlates to the business aspect "logged in".

> [!TIP]
> The same approach can be used to control when a component is enabled.

> [!NOTE]
> Forms which are within an inactive or invisible component do not get executed.

Note that there are cases in which calls to *setVisible()* and *setEnabled()* seem unavoidable. For example, the user presses a button to display an inlined registration form. In general, you can apply the following rules: data driven components are configured by their model, and the button modifies the model. Listing 8 presents a model-bound visibility.

**Listing 8:**

``` java
new Label("headline", headlineModel) {
    @Override
    public void onConfigure() {
        // Headline visible only if text starts with "Berlusconi"
        String headline = getModelObject();
        setVisible(headline.startsWith("Berlusconi"));
    }
}
```

> [!WARNING]
> While possible, overriding *isVisible()* may lead to unpredictable results under some conditions. See [WICKET-3171](https://issues.apache.org/jira/browse/WICKET-3171), [WICKET-6946](https://issues.apache.org/jira/browse/WICKET-6946) and [dev@wicket.apache.org mailing list: overriding isVisible bad?](http://www.mail-archive.com/dev@wicket.apache.org/msg07123.html).

Always use models - period! Do not pass raw objects directly to components. Instances of pages and components can exist for several requests. If you use raw objects, you cannot replace them later. An example is an entity which gets loaded at each request within a *LoadableDetachableModel*. The entity manager creates a new object reference, but the page would keep the obsolete instance. Always pass *IModel* in the constructor of your components:

**Listing 9:**

``` java
public class RegistrationInputPanel extends Panel {
    // Correct: The class Registration gets wrapped by IModel
    public RegistrationInputPanel(String id, IModel<Registration> regModel) {
        // add components
    }
}
```

This code can use any implementation of *IModel*, e.g. the class *Model*, a *PropertyModel* or a custom implementation of *LoadableDetachableModel* which loads and persists the values automatically. The model implementations gets very easy to replace. You - as a developer - just need to know: if I call *IModel.getObject()*, I will get an object of type *Registration*. Where the object comes from is within the responsibility of the model implementation and the calling component. For example you can pass the model while instantiating the component. If you avoid using models, you will almost certainly have to modify the component tree sooner or later which forces you to duplicate states and thus produce unmaintainable code. Additionally, you should use models due to serialization issues. Objects which get stored in fields of pages and components get serialized and deserialized on each request. This can be inefficient in some cases.

Avoid unwrapping models within the constructor hierarchy, i.e. do not call *IModel.getObject()* within any constructor. As already mentioned, a page instance can exist for several page requests, so you might store obsolete and redundant information. It is reasonable to unpack Wicket Models at events (user actions), that are methods like *onUpdate()*, \_onClick() or *onSubmit()*:

**Listing 10:**

``` java
new Form<Void>("register") {
    public void onSubmit() {
        // correct, unwrap model in an event call
        Registration reg = registrationModel.getObject()
        userService.register(reg);
    }
}
```

An additional possibility to unwrap models is via overriding methods like *isVisible()*, *isEnabled()* or *onBeforeRender()*.

Always try to pass models on to the parent component. By that, you ensure that at the end of every request the method *IModel.detach()* gets called. This method is responsible for a data cleanup. Another example: you have implemented your own model which persists the data in the *detach()* method. So the call of *detach()* is necessary for that your data gets persisted. You can see an exemplary passing to the super constructor here:

**Listing 11:**

``` java
public class RegistrationInputPanel extends Panel{
    public RegistrationInputPanel(String id, IModel<Registration> regModel) {
        super(id, regModel)
        // add components
    }
}
```

Validators should just validate. Consider a bank account form which has a *BankFormValidator*. This validator checks the bank data over a webservice and corrects the bank name. Nobody would expect that a validator modifies information. Such logic has to be located in *Form.onSubmit()* or in the event logic of a button.

Do not pass entire components or pages to constructors of other components.

**Listing 12:**

``` java
// Bad solution
public class SettingsPage extends Page {
    public SettingsPage (IModel<Settings> settingsModel, final Webpage backToPage) {
        Form<?> form = new Form("form");
        // add components
        form.add(new SubmitButton("changeSettings") {
            public void onSubmit() {
               // do something
               setResponsePage(backToPage);
            }
        });
        add(form);
    }
}
```

The *SettingsPage* expects the page which should be displayed after a successful submit to be passed to its constructor. This solution works, but is very bad practice. You need to know during the instantiation of *SettingsPage* where you want to redirect the user. This requires a predetermined order of instantiation. It is better to order the instantiation based on business logic (e.g. the order in the HTML template). Furthermore, you need an unnecessary instance of the next success page which might never be displayed. The solution is once again the Hollywood principle. For this you create an abstract method or a hook:

**Listing 13:**

``` java
// Good solution
public class SettingsPage extends Page {
    public SettingsPage (IModel<Settings> settingsModel) {
        Form<?> form = new Form("form");
        // add components
        form.add(new SubmitButton("changeSettings") {
            public void onSubmit() {
               // do something
               onSettingsChanged();
            }
         });
         add(form);
    }

    // hook
    protected void onSettingsChanged() {
    }

// The usage of the new component
Link<Void> settings = new Link<Void>("settings") {
    public void onClick() {
        setResponsePage(new SettingsPage(settingsModel) {
            @Override
            protected void onSettingsChanged() {
               // reference to the current page
               setResponsePage(this);
            }
        });
    }
};
add(settings);
```

This solution has more code, but it is more flexible and reusable. We can see there is an event *onSettingsChanged()* and this event is called after a successful change. Furthermore, there is the possibility to execute additional code besides setting the next page. For example, you can display messages or persist information.

The Wicket session is your own extension of Wicket’s base session. It is fully typed. There is no map structure to store information unlike the servlet session. You just should use Wicket’s session for global data. Authentication is a good example for global data. The login and user information is required on nearly each page. For a blog application it would be good to know whether the user is an author who is allowed to compose blog entries. So you are able to hide or or show links to edit a blog entry. In general you should store the whole authorization logic in Wicket’s session, because it is a global thing and you would expect it there. Data of forms and flows which only span certain pages should not stored in the session. This data can be passed from one page to the next via the constructor (see listing 14). As a consequence of this, the models and data have a clearly defined lifecycle that reflects the corresponding the page flow.

**Listing 14:**

``` java
public class MyPage extends WebPage {
    IModel<MyData> myDataModel;

    public MyPage(IModel<MyData> myDataModel) {
        this.myDataModel = myDataModel;
        Link<Void> next = new Link<Void>("next") {
             public void onClick() {
                  // do something
                  setResponsePage(new NextPage(myDataModel));
             }
        }
        add(next);
    }
}
```

You should pass concrete information to the page. All models can simply be stored in fields because Wicket pages are user-specific instances and no singletons in contrast to Struts. The big advantage of this approach is that the data gets automatically cleaned up when a user completes or exits the page flow. No manual cleanup anymore! This is basically an automatic garbage collector for your session.

The factory pattern is useful, but nevertheless not suitable for Wicket components.

**Listing 15:**

``` java
public class CmsFactory {
   public Label getCmsLabel(String markupId, final String url) {
       IModel<String> fragment = () -> loadSomeContent(url);
       Label result = new Label(markupId, fragment);
       result.setRenderBodyOnly(true);
       result.setEscapeModelStrings(false);
       return result;
   }

   public String loadContent(String url) {
      // load some content
   }
}

// create the component within the page:
public class MyPage extends WebPage {
   @SpringBean
   CmsFactory cmsFactory;

   public MyPage() {
      add(cmsFactory.getCmsLabel("id", "http://url.to.load.from"));
   }
}
```

This approach for adding a label from the *CmsFactory* to a page seems to be okay at first glance, but it comes with some disadvantages. There is no possibility to use inheritance anymore. Furthermore, there is no possibility to override *isVisible()* and *isEnabled()*. The factory could also be a Spring service which instantiates the component. A better solution is to create a *CmsLabel*.

**Listing 16:**

``` java
public class CmsLabel extends Label {
   @SpringBean
   CmsResource cmsResource;
   public CmsLabel(String id, IModel<String> urlModel) {
      super(id, urlModel);
      IModel<String> fragment = () -> cmsResource.loadSomeContent(urlModel.getObject());
      setRenderBodyOnly(true);
      setEscapeModelStrings(false);
   }
}

// create the component within a page
public class MyPage extends WebPage {
   public MyPage() {
      add(new CmsLabel("id", Model.of("http://url.to.load.from")));
   }
}
```

The label in listing 16 is clearly encapsulated in a component without using a factory. Now you can easily create inline implementations and override *isVisible()* or other stuff. Naturally, you might claim "I need a factory to initialize some values in the component, e.g. a Spring service". For this you can create a implementation of *IComponentInstantiationListener*. This listener gets called on the super-constructor of every component. The most popular implementation of this interface is the *SpringComponentInjector* which injects Spring beans in components when the fields are annotated with *SpringBean*. You can easily write and add your own implementation of *IComponentInstantiationListener*. So there is no reason for using a factory anymore. More information about the instantiation listener is located in Wicket’s JavaDoc.

Every page and component should have a test. The simplest test just renders the component and validates its technical correctness. For example, a child component should have a matching wicket id in the markup. If the wicket id is not correctly bound - through a typo or if it was just forgotten - the test will fail. An advanced test could test a form, where a backend call gets executed and validated over a mock. So you can validate your component’s behaviour. This is a simple way to detect and fix technical and business logic bugs during the build process. Wicket is very suitable for a test driven development approach. For instance, if you run a unit test which fails and shows a message that the wicket id not bound, you will avoid an unnecessary server startup (a server startup takes longer than running a unit test). This reduces the development turnaround. A disadvantage is the difficult testing possibility of AJAX components. However, the testing features of Wicket are much more sophisticated than in other web frameworks.

Try to get within the Wicket world whenever possible. Avoid the usage of other servlet filters. For this you can use the *RequestCycle* and override the methods *onBeginRequest()* and *onEndRequest()*. You can apply the same to the *HttpSession*. The equivalent in Wicket is the *WebSession*. Just extend the *WebSession* and override the *newSession()*-method from the Application class. There are very few reasons to access the servlet interfaces. An example could be to read an external cookie to authenticate a user. Those parts should be properly encapsulated and avoided when possible. For this example, you could do the handling within the Wicket session because this is an authentication.

Avoid monolithic classes. Often I have seen that developers put the whole stuff into constructors. These classes are getting very unclear and chaotic because you use inline implementations over several levels. It is recommended to group logical units and extract methods with a correct business naming. This enhances the clarity and the understandability of the business aspect. When a developer navigates to a component, he is not interested in the technical aspect at first, however he just need the business aspect. To retrieve technical information of a component you can navigate to the method implementation. In case of doubt you should consider to extract separate components. Smaller components increase the chances of reuse and make testing easier. Listing 17 shows an example of a possible structuring.

**Listing 17:**

``` java
public class BlogEditPage extends WebPage {
    private IModel<Blog> blogModel;

    public BlogEditPage(IModel<Blog> blogModel) {
        super(new PageParameters());
        this.blogModel = blogModel;
        add(createBlogEditForm());
    }

    private Form<Blog> createBlogEditForm() {
        Form<Blog> form = newBlogEditForm();
        form.add(createHeadlineField());
        form.add(createContentField());
        form.add(createTagField());
        form.add(createViewRightPanel());
        form.add(createCommentRightPanel());
        form.setOutputMarkupId(true);
        return form;
    }

    // more methods here
}
```

It is a widespread opinion that Wicket has a bad documentation. This argument is just partly correct. There are a lot of code samples and snippets which can be used as code templates. Furthermore, there is a big community that answers complex questions very quickly. In Wicket it is very hard to document everything, because nearly everything is extensible and replaceable. If a component is not completely suitable, you will extend or replace it. Working with Wicket means permanently navigating through code. For example, just consider validators. How can I find all validators that exist? Open the interface *IValidator* (Eclipse: Ctrl + Shift + T) and then open the type hierarchy (Ctrl + T). Now we can see all the validators existing in Wicket and our project.

<figure>
<img src="/img/guide/validator-type-hierachy.png" />
</figure>

The best practices presented in this chapter should help you to write better and more maintainable code in Wicket. All described methodologies were already proven in a few Wicket projects. If you follow these advices, your Wicket projects will get future-proof and hopefully successful.
