---
layout: docs
title: "Models — connecting components to data"
description: "How Wicket models work as the bridge between your components and their underlying data"
keywords: IModel Model PropertyModel LambdaModel CompoundPropertyModel LoadableDetachableModel data binding
category: reference
---

Model is essentially a [facade](http://en.wikipedia.org/wiki/Facade_pattern) interface which allows components to access and modify their data without knowing any detail about how they are managed or persisted. Every component has at most one related model, while a model can be shared among different components. In Wicket a model is any implementation of the interface *org.apache.wicket.model.IModel*:

<figure>
<img src="/img/guide/uml-imodel.png" />
</figure>

The main goal of *IModel* interface is to decouple components from concrete details about the persistence strategy adopted for their data. In order to achieve this level of abstraction IModel defines the two methods required to get and set a data object: *getObject()* and *setObject()*. The level of indirection introduced by models allows access data object only when it is really needed (for example during the rendering phase) and not earlier when it may not be ready to be used. In addition to *getObject()* and *setObject()*, *IModel* defines a richer set of methods, mostly meant to work with Java 8 lambdas. We will introduce them in the next paragraph.

Any component can get/set its model as well as its data object using the 4 public shortcut methods listed in the class diagram above. The two methods *onModelChanged()* and *onModelChanging()* are triggered by Wicket each time a model is modified: the first one is called after the model has been changed, the second one just before the change occurs. In the examples seen so far we have worked with Label component using its constructor which takes as input two string parameters, the component id and the text to display:

``` java
add(new Label("helloMessage", "Hello WicketWorld!"));
```

This constructor internally builds a model which wraps the second string parameter. That’s why we didn’t mention label model in the previous examples. Here is the code of this constructor:

``` java
public Label(final String id, String label) {
    this(id, new Model<String>(label));
}
```

Class *org.apache.wicket.model.Model* is a basic implementation of *IModel*. It can wrap any object that implements the interface java.io.Serializable. The reason of this constraint over data object is that this model is stored in the web session, and we know from chapter 6 that data are stored into session using serialization.

> [!NOTE]
> In general, Wicket models support a detaching capability that allows us to work also with non-serializable objects as data model. We will see the detaching mechanism later in this chapter.

Just like any other Wicket components, Label provides a constructor that takes as input the component id and the model to use with the component. Using this constructor the previous example becomes:

``` java
add(new Label("helloMessage", new Model<String>("Hello WicketWorld!")));
```

The Model class comes with a bunch of factory methods that makes it easier to build new model instances. For example the *of(T object)* method creates a new instance of Model which wraps any Object instance inside it. So instead of writing

``` java
new Model<String>("Hello WicketWorld!")
```

we can write

``` java
Model.of("Hello WicketWorld!")
```

If the data object is a *List*, a *Map* or a *Set* we can use similar methods called *ofList*, *ofMap* and *ofSet*. From now on we will use these factory methods in our examples.

It’s quite clear that if our Label must display a static text it doesn’t make much sense to build a model by hand like we did in the last code example. However is not unusual to have a Label that must display a dynamic value, like the input provided by a user or a value read from a database. Wicket models are designed to solve these kinds of problems.

By default the class Component escapes HTML sensitive characters (like ’\<’, ’\>’ or ’&’) from the textual representation of its model object. The term ’escape’ means that these characters will be replaced with their corresponding HTML [entity](http://en.wikipedia.org/wiki/Character_entity_reference) (for example ’\<’ becomes \&lt;). This is done for security reasons as a malicious user could attempt to inject markup or JavaScript into our pages. If we want to display the raw content stored inside a model, we can tell the Component class not to escape characters by calling the setEscapeModelStrings(false) method.

With Wicket 8 *IModel* has been extended with new methods to fully leverage lambdas. The most interesting thing of the new version of *IModel* is that it provides a default implementation for all of its methods (included *setObject()*), with the only exception of *getObject()*. In this way *IModel* is eligible as functional interface and this greatly simplify the creation of custom models. As long as we need to display a static text it doesn’t make much sense building a custom model, but if we need to display a dynamic value (like the input provided by a user or a value read from a database), defining a model with a lambda expression comes quite in handy.

Let’s say we need a label to display the current time stamp each time a page is rendered. This could be a possible solution:

``` java
add(new Label("timeStamp", () -> java.time.LocalDate.now()));
```

As mentioned above, method *setObject()* comes with a default implementation. The code is the following:

``` java
default void setObject(final T object)
{
  throw new UnsupportedOperationException(
    "Override this method to support setObject(Object)");
}
```

This means that models obtained using *IModel* as lambda expressions are *read-only*. When we work with forms we need to use a model that support also data storing. In the next paragraph we will see a couple of models shipped with Wicket that allow us to easily use JavaBeans as backing objects.

# Lambda goodies

Most of the default methods we find in *IModel* are meant to leverage Lambda expressions to transform model object. The following is a short reference for such methods:

- **filter(predicate)**: Returns a *IModel* checking whether the predicate holds for the contained object, if it is not null. If the predicate doesn’t evaluate to true, the contained object will be null. Example:

``` java
//the filtered model will have a null model object if person's name
//is not "Jane"
IModel<Person> janeModel = Model.of(person)
    .filter((p) -> p.getName().equals("Jane"));
```

- **map(mapperFunction)**: Returns an *IModel* applying the given mapper to the contained object, if it is not null. Example:

  ``` java
  //the new read-only model will contain the person's first name
  IModel<String> personNameModel = Model.of(person).map(Person::getName);
  ```

<!-- -->

- **flatMap(mapperFunction)**: Returns an *IModel* applying the given *IModel*-bearing mapper to the contained object, if it is not null. Example:

  ``` java
  //returns a read/write model for person's first name
  //NOTE: LambdaModel will be discussed later.
  IModel<String> personNameModel = Model.of(person).flatMap(targetPerson ->
  LambdaModel.of(
      () -> targetPerson::getName, targetPerson::setName
  ));
  ```

- **combineWith(otherModel, combiner)**: Returns an *IModel* applying the given combining function to the current model object and to the one from the other model, if they are not null. Example:

  ``` java
  IModel<String> hello = Model.of("hello");
  IModel<String> world = Model.of("world");
  IModel<String> combinedModel = hello.combineWith(
      world, (thisObj, otherObj) -> thisObj + " " + otherObj);

  assertEquals("hello world", combinedModel.getObject());
  ```

- **orElseGet(supplier)**: Returns a read-only *IModel* using either the contained object or invoking the given supplier to get a default value. Example:

  ``` java
  IModel<String> nullObj = new Model();
  assertEquals("hello!", nullObj.orElseGet(() -> "hello!");
  ```

One of the main goals of Wicket is to use JavaBeans and POJO as data model, overcoming the impedance mismatch between web technologies and OO paradigm. In order to make this task as easy as possible, Wicket offers two special model classes: *org.apache.wicket.model.PropertyModel* and *org.apache.wicket.model.CompoundPropertyModel*. We will see how to use them in the next two examples, using the following JavaBean as the data object:

``` java
public class Person implements Serializable {

    private String name;
    private String surname;
    private String address;
    private String email;
    private String passportCode;

    private Person spouse;
    private List<Person> children;

    public Person(String name, String surname) {
        this.name = name;
        this.surname = surname;
    }

    public String getFullName(){
        return name + " " + surname;
    }

    /*
     * Getters and setters for private fields
     */
}
```

# PropertyModel

Let’s say we want to display the name field of a Person instance with a label. We could, of course, use the Model class like we did in the previous example, obtaining something like this:

``` java
Person person = new Person();
//load person's data...

Label label = new Label("name", new Model(person.getName()));
```

However this solution has a huge drawback: the text displayed by the label will be static and if we change the value of the field, the label won’t update its content. Instead, to always display the current value of a class field, we should use the *org.apache.wicket.model.PropertyModel* model class:

``` java
Person person = new Person();
//load person's data...

Label label = new Label("name", new PropertyModel(person, "name"));
```

PropertyModel has just one constructor with two parameters: the model object (person in our example) and the name of the property we want to read/write ( *name* in our example). This last parameter is called property expression. Internally, methods getObject/setObject use property expression to get/set property’s value. To resolve class properties PropertyModel uses class *org.apache.wicket.core.util.lang.PropertyResolver* which can access any kind of property, private fields included.

Just like the Java language, property expressions support dotted notation to select sub properties. So if we want to display the name of the Person’s spouse we can write:

``` java
Label label = new Label("spouseName", new PropertyModel(person, "spouse.name"));
```

> [!NOTE]
> PropertyModel is null-safe, which means we don’t have to worry if property expression includes a null value in its path. If such a value is encountered, an empty string will be returned.

If property is an array or a List, we can specify an index after its name. For example, to display the name of the first child of a Person we can write the following property expression:

``` java
Label label = new Label("firstChildName", new PropertyModel(person, "children.0.name"));
```

Indexes and map keys can be also specified using squared brackets:

``` java
children[0].name ...
mapField[key].subfield ...
```

# LambdaModel

*PropertyModel* uses textual expressions to resolve object properties. That’s nice but it comes with some drawbacks. For example the expression can not be checked at compile time and is not refactoring-friendly. To overcome these problems with Wicket 8 a new kind of lambda-based model has been introduced: *org.apache.wicket.model.LambdaModel*. This model uses lambda expressions to get/set model object. Here is the signature of its static factory method:

``` java
public static <T> LambdaModel<T> of(SerializableSupplier<T> getter, SerializableConsumer<T> setter)
```

In the following code we use method references to operate on a specific object property:

``` java
Person person = new Person();
IModel<String> personNameModel = LambdaModel.of(person::getName, person::setName);
```

# CompoundPropertyModel and model inheritance

Class *org.apache.wicket.model.CompoundPropertyModel* is a particular kind of model which is usually used in conjunction with another Wicket feature called model inheritance. With this feature, when a component needs to use a model but none has been assigned to it, it will search through the whole container hierarchy for a parent with an inheritable model. Inheritable models are those which implement interface *org.apache.wicket.model.IComponentInheritedModel* and *CompoundPropertyModel* is one of them. Once a *CompoundPropertyModel* has been inherited by a component, it will behave just like a PropertyModel using the id of the component as property expression. As a consequence, to make the most of CompoundPropertyModel we must assign it to one of the containers of a given component, rather than directly to the component itself.

For example if we use CompoundPropertyModel with the previous example (display spouse’s name), the code would become like this:

``` java
//set CompoundPropertyModel as model for the container of the label
setDefaultModel(new CompoundPropertyModel(person));

Label label = new Label("spouse.name");

add(label);
```

Note that now the id of the label is equal to the property expression previously used with PropertyModel. Now as a further example let’s say we want to extend the code above to display all of the main information of a person (name, surname, address and email). All we have to do is to add one label for every additional information using the relative property expression as component id:

``` java
//Create a person named 'John Smith'
Person person = new Person("John", "Smith");
setDefaultModel(new CompoundPropertyModel(person));

add(new Label("name"));
add(new Label("surname"));
add(new Label("address"));
add(new Label("email"));
add(new Label("spouse.name"));
```

CompoundPropertyModel can save us a lot of boring coding if we choose the id of components according to properties name. However it’s also possible to use this type of model even if the id of a component does not correspond to a valid property expression. The method bind(String property) allows to create a property model from a given CompoundPropertyModel using the provided parameter as property expression. For example if we want to display the spouse’s name in a label having "xyz" as id, we can write the following code:

``` java
//Create a person named 'John Smith'
Person person = new Person("John", "Smith");
CompoundPropertyModel compoundModel;
setDefaultModel(compoundModel = new CompoundPropertyModel(person));

add(new Label("xyz", compoundModel.bind("spouse.name")));
```

CompoundPropertyModel is particularly useful when used in combination with Wicket forms, as we will see in the next paragraph.

> [!NOTE]
> Model is referred to as static model because the result of its method getObject is fixed and it is not dynamically evaluated each time the method is called. In contrast, models like PropertyModel and CompoundProperty Model are called dynamic models.
