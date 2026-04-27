---
title: Toolbar
page_title: Telerik UI Chat Documentation - Toolbar
description: "Learn how to configure the Toolbar for the Telerik UI Chat component for {{ site.framework }}."
components: ["chat"]
slug: htmlhelpers_toolbar_chat
position: 5
---

# Toolbar

The toolbar of the Chat allows you to add toolbar actions for achieving a more user-friendly conversational UI.

The toolbar is located below the input box of the Chat. You can display or hide the toolbar by clicking the toolbar icon which is placed to the left of the **Send** button. The Chat toolbar enables you to add buttons for end-user interaction. Depending on the executed command in the toolbar, you can implement specific functionality by handling the `ToolClick` event.

## Configuring the Items

To configure the Toolbar items, use the `Toolbar()` configuration method of the Chat.

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .Toolbar(toolbar => toolbar
        .Buttons(buttons =>
        {
            buttons.Add().Name("ButtonA").Icon("image");
            buttons.Add().Name("ButtonB").Icon("wrench");
        })
        .Events(ev => ev.ToolClick("onToolClick"))
    )
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat" on-tool-click="onToolClick">
    <toolbar>
        <toolbar-buttons>
            <toolbar-button name="ButtonA" icon="image" />
            <toolbar-button name="ButtonB" icon="wrench" />
        </toolbar-buttons>
    </toolbar>
</kendo-chat>
```
{% endif %}

```JavaScript
<script>
    function onToolClick(e) {
        console.log("Button name: " + e.name);
    }
</script>
```

## Configuring the Behavior

The Chat configuration object allows you to configure the following behavior aspects of the toolbar:

* The `Animation` behavior of the toolbar.
* Whether the toolbar will be `Scrollable`. A scrollbar is useful when the buttons cannot entirely fit within the width of the Chat.
* Whether the toolbar will be displayed or hidden upon a button click using the `Toggleable` option.

```HtmlHelper
@(Html.Kendo().Chat()
    .Name("chat")
    .Toolbar(toolbar => toolbar
        .Toggleable(true)
        .Scrollable(true)
        .Animation(animation =>
        {
            animation.Collapse(collapse =>
            {
                collapse.Effects("expandVertical fadeIn");
                collapse.Duration(500);
            });
            animation.Expand(expand =>
            {
                expand.Effects("expandVertical fadeIn");
                expand.Duration(500);
            });
        })
        .Buttons(buttons =>
        {
            buttons.Add().Name("ButtonA").Icon("image");
            buttons.Add().Name("ButtonB").Icon("wrench");
        })
    )
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-chat name="chat">
    <toolbar toggleable="true" scrollable="true">
        <animation>
            <collapse effects="expandVertical fadeIn" duration="500" />
            <expand effects="expandVertical fadeIn" duration="500" />
        </animation>
        <toolbar-buttons>
            <toolbar-button name="ButtonA" icon="image" />
            <toolbar-button name="ButtonB" icon="wrench" />
        </toolbar-buttons>
    </toolbar>
</kendo-chat>
```
{% endif %}

## See Also

* [Chat Overview Demo](https://demos.telerik.com/{{ site.platform }}/chat/index)
