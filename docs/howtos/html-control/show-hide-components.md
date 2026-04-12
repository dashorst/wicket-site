At the end of the previous chapter we have seen how to hide a component calling its method *setVisible*. In a similar fashion, we can also decide to disable a component using method *setEnabled*. When a component is disabled all the links inside it will be in turn disabled (they will be rendered as *\<span\>*) and it can not fire JavaScript events.

Class *Component* provides two getter methods to determine if a component is visible or enabled: *isVisible* and *isEnabled*.

Even if nothing prevents us from overriding these two methods to implement a custom logic to determine the state of a component, we should keep in mind that methods *isVisible* and *isEnabled* are called multiple times before a component is fully rendered. Hence, if we place non-trivial code inside these two methods, we can noticeably deteriorate the responsiveness of our pages.

> [!WARNING]
> Overriding *isVisible* or *isEnabled* can lead to unpredictable results when querying visibility information via *isVisibleInHierarchy* or *isEnabledInHierarchy*.

As we will see in the next chapter, class *Component* provides method *onConfigure* which is more suited to contain code that contributes to determine component states because it is called just once during rendering phase of a request.
