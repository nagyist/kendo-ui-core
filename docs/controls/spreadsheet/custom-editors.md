---
title: Custom Cell Editors
page_title: jQuery Spreadsheet Documentation - Custom Cell Editors
description: "Get started with the jQuery Spreadsheet by Kendo UI and define custom editors for its cells."
slug: custom_editors_spreadsheet_widget
position: 6
---

# Custom Cell Editors

Custom editors facilitate the user input of correct values.

For example, a custom editor allows the user to enter a date in a cell by picking it from a calendar rather than typing it. This functionality is achieved by applying data validation with the `Date` criteria and selecting the **Display button to show calendar** checkbox. Another built-in editor is for the `List` validation criterion&mdash;it displays a popup displaying the allowed values.

To define custom editors, use `kendo.spreadsheet.registerEditor(name, editor)`. The `name` is an ID of your choice, which you will later use to select this particular editor on a `Range`. The `editor` can be an object or a function. As an object, it should currently have an `edit` method, and an `icon` property, as explained below.

The `edit(options)` method is invoked with the following options:
* `range`&mdash;The cell that is currently selected as a `Range` object.
* `rect`&mdash;The rectangle with the position of the selected cell on the screen. It has `top`, `left`, `width`, `height`, `right`, and `bottom` properties. Use this option to position the editor near the cell, for example.
* `callback`&mdash;A function which your editor calls when a value is selected. It receives the `value` and an optional second argument `parse`. When `parse` is `true`, the `value` should be a string and it is then parsed as if input by the end user through the inline editor. Use this option to return a formula, for example&mdash;`callback("=sum(a1:a5)", true)`.

The `icon` property is a string which contains a CSS class name that is to be applied to the drop-down button.

When the `editor` is a function, it is called the first time when a cell with this editor is displayed. It returns an object as in the previous case&mdash;having the `edit` method and the `icon` property, and the result is cached. You can use this approach to delay the initialization of the editor until the first time it is needed.

The following example demonstrates how to set up a color-picking custom editor.

```dojo
  <div id="spreadsheet" style="width: 100%;"></div>
  <script>
    kendo.spreadsheet.registerEditor("color", function(){
        var context, dlg, model;
        // Further delay the initialization of the UI until the `edit` method is
        // actually called, so here just return the object with the required API.
        return {
            edit: function(options) {
                context = options;
                open();
            },
            icon: "droplet"
        };
        // This function actually creates the UI if not already there, and
        // caches the dialog and the model.
        function create() {
            if (!dlg) {
                model = kendo.observable({
                    value: "#000000",
                    ok: function() {
                        // This is the result when OK is clicked.
                        // Invoke the callback with the value.
                        context.callback(model.value);
                        dlg.close();
                    },
                    cancel: function() {
                        dlg.close();
                    }
                });
                var el = $("<div data-visible='true' data-role='window' data-modal='true' data-resizable='false' data-title='Select color'>" +
                           "  <div data-role='flatcolorpicker' data-bind='value: value'></div>" +
                           "  <div style='margin-top: 1em; text-align: right'>" +
                           "    <button style='width: 5em' class='k-button' data-bind='click: ok'>OK</button>" +
                           "    <button style='width: 5em' class='k-button' data-bind='click: cancel'>Cancel</button>" +
                           "  </div>" +
                           "</div>");
                kendo.bind(el, model);

                // Cache the dialog.
                dlg = el.getKendoWindow();
            }
        }
        function open() {
            create();
            dlg.open();
            dlg.center();
            // If the selected cell already contains some value, reflect
            // it in the custom editor.
            var value = context.range.value();
            if (value != null) {
                model.set("value", value);
            }
        }
    });

   $(function() {
       $("#spreadsheet").kendoSpreadsheet({
           sheetsbar: false,
           excel: {
               // Required to enable Excel Export in some browsers.
               proxyURL: "https://demos.telerik.com/service/v2/core/export"
           },
           sheets: [{
               rows: [{
                   cells: [
                       { value: "Select color:", bold: true },
                       { background: "#fef0cd",
                         editor: "color" }
                   ]
               }]
           }]
       });
   });
  </script>
```

After the editor is defined, you can apply it to any cell through the API.

    var sheet = spreadsheet.activeSheet();
    sheet.range("A5").editor("color");

As a result, when the user selects `A5`, a button that shows the icon is displayed next to the cell. When clicked, the custom color picker pops up and allows the user to
select a color.

The `edit` method provides a complete flexibility. As an example, you can use a Popup component&mdash;you are not obliged, nor required to use a Window. If you know that no two instances will be displayed simultaneously, cache the UI or create a fresh instance each time the `edit` is invoked. Note that the example above refers to a modal dialog.

## See Also

* [Implementing Custom Cell Editors in the Spreadsheet (Demo)](https://demos.telerik.com/kendo-ui/spreadsheet/custom-editors)
* [Spreadsheet JavaScript API Reference](/api/javascript/ui/spreadsheet)
