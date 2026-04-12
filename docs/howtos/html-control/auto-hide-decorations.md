Our data are rarely displayed alone without a caption or other graphic elements that make clear the meaning of their value. For example:

``` html
<label>Total amount: </label><span wicket:id="totalAmount"></span>
```

Wicket comes with a nice utility tag called *\<wicket:enclosure\>* that automatically hides those decorating elements if the related data value is not visible. All we have to do is to put the involved markup inside this tag. Applying *\<wicket:enclosure\>* to the previous example we get the following markup:

``` html
<wicket:enclosure> 
    <label>Total amount: </label><span wicket:id="totalAmount"></span>
</wicket:enclosure>
```

Now if component *totalAmount* is not visible, its description (*Total amount:*) will be automatically hidden. If we have more than a Wicket component inside *\<wicket:enclosure\>* we can use *child* attribute to specify which component will control the overall visibility:

``` html
<wicket:enclosure child="totalAmount"> 
    <label>Total amount: </label><span wicket:id="totalAmount"></span><br/>
    <label>Expected delivery date: </label><span wicket:id="delivDate"></span>
</wicket:enclosure>
```

*child* attribute supports also nested components with a colon-separated path:

``` html
<wicket:enclosure child="totalAmountContainer:totalAmount"> 
    <div wicket:id="totalAmountContainer">
        <label>Total amount: </label><span wicket:id="totalAmount"></span>
    </div>
    <label>Expected delivery date: </label><span wicket:id="delivDate"></span>
</wicket:enclosure>
```

> [!WARNING]
> *\<wicket:enclosure\>* is nice and prevents that users have to add boilerplate to their application. But it is not without problems. The child components are children in the markup, but the auto component generated for the enclosure tag will not magically re-parent the child components. Thus the markup hierarchy and the component hierarchy will be out of sync. The automatically created enclosure container will be created along side its "children" with both attached to the very same parent container. That leads to a tricky situation since e.g. *onBeforeRender()* will be called for enclosure children even if the enclosure is made invisible by it controlling child. On top auto components cannot keep any state. A new instance is created during each render process and automatically deleted at the end. That implies that we cannot prevent *validation()* from being called, since *validation()* is called before the actual render process has started. Where any of these problems apply, you may replace the tag and manually add a [EnclosureContainer](https://nightlies.apache.org/wicket/apidocs/10.x/org/apache/wicket/markup/html/basic/EnclosureContainer.html) which basically does the same. But instead of adding the children to the Page, Panel, whatever, you must add the children to this container in order to keep the component hierarchy in sync.
