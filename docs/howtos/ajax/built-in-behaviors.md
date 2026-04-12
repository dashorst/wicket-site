---
layout: docs
title: "How to make any component respond to browser events via AJAX"
description: "Learn how to attach built-in AJAX behaviors to existing components so they react to clicks, changes, and other events"
category: ajax
---

In addition to specific components, Wicket offers also a set of built in AJAX behaviors that can be used to easily add AJAX functionalities to existing components. As we will see in this paragraph AJAX behaviors can be used also to ajaxify components that weren’t initially designed to work with this technology. All the following behaviors are inside package *org.apache.wicket.ajax*.

## AjaxEventBehavior

AjaxEventBehavior allows to handle a JavaScript event (like click, change, etc…) on server side via AJAX. Its constructor takes in input the name of the event that must be handled. Every time this event is fired for a given component on client side, the callback method *onEvent(AjaxRequestTarget target)* is executed. onEvent is abstract, hence we must implement it to tell *AjaxEventBehavior* what to do when the specified event occurs.

In project *AjaxEventBehaviorExample* we used this behavior to build a “clickable” Label component that counts the number of clicks. Here is the code from the home page of the project:

**HTML:**

``` html
<body>
  <div wicket:id="clickCounterLabel"></div>
  User has clicked <span wicket:id="clickCounter"></span> time/s on the label above.
</body>
```

**Java Code:**

``` java
public class HomePage extends WebPage {
   public HomePage(final PageParameters parameters) {
      super(parameters);
   
      final ClickCounterLabel clickCounterLabel = 
         new ClickCounterLabel("clickCounterLabel", "Click on me!");
      final Label clickCounter =
         new Label("clickCounter", new PropertyModel(clickCounterLabel, "clickCounter"));
      
      
      clickCounterLabel.setOutputMarkupId(true);
      clickCounterLabel.add(new AjaxEventBehavior("click"){

         @Override
         protected void onEvent(AjaxRequestTarget target) {
            clickCounterLabel.clickCounter++;
            target.add(clickCounter);
         }         
      });
      
      add(clickCounterLabel);
      add(clickCounter.setOutputMarkupId(true));      
    }
}

class ClickCounterLabel extends Label{
   public int clickCounter;   

   public ClickCounterLabel(String id) {
      super(id);
   }

   public ClickCounterLabel(String id, IModel<?> model) {
      super(id, model);
   }

   public ClickCounterLabel(String id, String label) {
      super(id, label);      
   }
}
```

In the code above we have declared a custom label class named *ClickCounterLabel* that exposes a public integer field called clickCounter. Then, in the home page we have attached a *AjaxEventBehavior* to our custom label to increment clickCounter every time it receives a click event.

The number of clicks is displayed with another standard label named *clickCounter*.

## AjaxFormSubmitBehavior

This behavior allows to send a form via AJAX when the component it is attached to receives the specified event. The component doesn’t need to be inside the form if we use the constructor version that, in addition to the name of the event, takes in input also the target form:

``` java
Form<Void> form = new Form<>("form");       
Button submitButton = new Button("submitButton");
//submit form when button is clicked        
submitButton.add(new AjaxFormSubmitBehavior(form, "click"){});
add(form);
add(submitButton);
```

**Note:** *AjaxFormSubmitBehavior* does not prevent JavaScript default event handling. For `<input type=submit` you’ll have to call *AjaxRequestAttributes.setPreventDefault(true)* to prevent the form from being submitted twice.
{: .alert .alert-info}

## AjaxFormComponentUpdatingBehavior

This behavior updates the model of the form component it is attached to when a given event occurs. The standard form submitting process is skipped and the behavior validates only its form component.

The behavior doesn’t work with radio buttons and checkboxes. For these kinds of components we must use *AjaxFormChoiceComponentUpdatingBehavior*:

``` java
Form<Void> form = new Form<>("form");       
TextField textField = new TextField("textField", Model.of(""));
//update the model of the text field each time event "change" occurs
textField.add(new AjaxFormComponentUpdatingBehavior("change"){
    @Override
    protected void onUpdate(AjaxRequestTarget target) {
        //...               
    }
});
add(form.add(textField));
```

## AbstractAjaxTimerBehavior

*AbstractAjaxTimerBehavior* executes callback method *onTimer(AjaxRequestTarget target)* at a specified interval. The behavior can be stopped and restarted at a later time with methods *stop(AjaxRequestTarget target)* and *restart(AjaxRequestTarget target)*:

``` java
Label dynamicLabel = new Label("dynamicLabel");
//trigger an AJAX request every three seconds       
dynamicLabel.add(new AbstractAjaxTimerBehavior(Duration.ofSeconds(3)) {         
    @Override
    protected void onTimer(AjaxRequestTarget target) {
        //...               
    }
});
add(dynamicLabel);
```

**Note:** By default AJAX components and behaviors are *stateful*, but they can be easily turned to stateless if needed. See [How to use AJAX on stateless pages]({% link docs/howtos/ajax/use-stateless-ajax.md %}).
{: .alert .alert-info}
