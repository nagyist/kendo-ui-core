---
title: MultiSelect
page_title: Configuration, methods and events of Kendo UI MultiSelect
res_type: api
component: multi-select
---

# kendo.ui.MultiSelect

Represents the Kendo UI MultiSelect widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### adaptiveMode `String`*(default: "none")*

Specifies the adaptive rendering of the component. The supported values are: `none` *(default)*, `auto`.

### adaptiveTitle `String`

Allows customization of the title's text in the adaptive view of the component.

### adaptiveSubtitle `String`

Allows customization of the subtitle's text in the adaptive view of the component.

### animation `Boolean|Object`

Configures the opening and closing animations of the suggestion popup. Setting the `animation` option to `false` will disable the opening and closing animations. As a result the suggestion popup will open and close instantly.

`animation:true` is not a valid configuration.

#### Example - disable open and close animations

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      animation: false
    });
    </script>

#### Example - configure the animation

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      animation: {
       close: {
         effects: "fadeOut zoom:out",
         duration: 300
       },
       open: {
         effects: "fadeIn zoom:in",
         duration: 300
       }
      }
    });
    </script>

### animation.close `Object`

#### Example - configure the close animation

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      animation: {
       close: {
         effects: "zoom:out",
         duration: 300
       }
      }
    });
    </script>

### animation.close.effects `String`

The effect(s) to use when playing the close animation. Multiple effects should be separated with a space.

[Complete list of available animations](/api/javascript/effects/common)

### animation.close.duration `Number` *(default: 100)*

The duration of the close animation in milliseconds.

### animation.open `Object`

The animation played when the suggestion popup is opened.

#### Example - configure the open animation

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      animation: {
       open: {
         effects: "zoom:in",
         duration: 300
       }
      }
    });
    </script>

### animation.open.effects `String`

The effect(s) to use when playing the open animation. Multiple effects should be separated with a space.

[Complete list of available animations](/api/javascript/effects/common)

### animation.open.duration `Number` *(default: 200)*

The duration of the open animation in milliseconds.

### autoBind `Boolean`*(default: true)*

Controls whether to bind the widget to the data source on initialization.

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
        $("#multiselect").kendoMultiSelect({
          placeholder: "Select products...",
          dataTextField: "ProductName",
          dataValueField: "ProductID",
          dataBound: function(){
            //Alert will be displayed when the data is bound to the component
            alert('Data is bound')
          },
          autoBind: false,
          dataSource: {
            type: "odata-v4",
            serverFiltering: true,
            transport: {
              read: {
                url: "https://demos.telerik.com/service/v2/odata/Products",
              }
            }
          }
        });
    </script>

### autoClose `Boolean`*(default: true)*

Controls whether to close the widget suggestion list on item selection.

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
        autoClose: false
    });
    </script>

### autoWidth `Boolean`

If set to `true`, the widget automatically adjusts the width of the popup element and does not wrap up the item label.

> Note: Virtualized list doesn't support the auto-width functionality.

#### Example - enable autoWidth

    <select id="multiselect" style="width: 100px;"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
      autoWidth: true,
      dataSource: {
        data: ["Short item", "An item with really, really long text"]
      }
    });
    </script>

### clearButton `Boolean` *(default: true)*

Unless this options is set to `false`, a button will appear when hovering the widget. Clicking that button will reset the widget's value and will trigger the change event.

#### Example - disable the clear button

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
        clearButton: false
    });
    </script>

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the widget which is used to display a list of values. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.

#### Example - set dataSource as a JavaScript object

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: {
        data: ["One", "Two"]
      }
    });
    </script>

#### Example - set dataSource as a JavaScript array

    <select id="multiselect" multiple="multiple"></select>
    <script>
    var data = ["One", "Two"];
    $("#multiselect").kendoMultiSelect({
      dataSource: data
    });
    </script>

#### Example - set dataSource as an existing kendo.data.DataSource instance

    <select id="multiselect" multiple="multiple"></select>
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/service/v2/core/products"
        }
      }
    });
    $("#multiselect").kendoMultiSelect({
      dataSource: dataSource,
      dataTextField: "ProductName",
      dataValueField: "ProductID"
    });
    </script>

### dataTextField `String`*(default: "")*

The field of the data item that provides the text content of the list items. The widget will filter the data source based on this field.

> **Important** When `dataTextField` is defined, the `dataValueField` option also should be set.

#### Example - set the dataTextField

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
        dataSource: [
            { Name: "Parent1", Id: 1 },
            { Name: "Parent2", Id: 2 }
        ],
        dataTextField: "Name",
        dataValueField: "Id"
    });
    </script>

### dataValueField `String`*(default: "")*

The field of the data item that provides the value of the widget.

> **Important** When `dataValueField` is defined, the `dataTextField` option also should be set.

#### Example - set the dataValueField

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
        dataSource: [
            { Name: "Parent1", Id: 1 },
            { Name: "Parent2", Id: 2 }
        ],
        dataTextField: "Name",
        dataValueField: "Id"
    });
    </script>

### delay `Number`*(default: 200)*

Specifies the delay in milliseconds after which the MultiSelect will start filtering dataSource.

#### Example - set the delay

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
        delay: 1000 // wait 1 second before filtering
    });
    </script>

### downArrow `Boolean`*(default: false)*

Configures MultiSelect to render a down arrow that opens and closes its popup.

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
        downArrow: true
    });
    </script>

### enable `Boolean`*(default: true)*

If set to `false` the widget will be disabled and will not allow user input. The widget is enabled by default and allows user input.

#### Example - disable the widget

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      enable: false
    });
    </script>

### enforceMinLength `Boolean` *(default: false)*

If set to `true` the widget will not show all items when the text of the search input cleared. By default the widget shows all items when the text of the search input is cleared. Works in conjunction with [minLength](/api/javascript/ui/multiselect#configuration-minLength).

#### Example - enforce minLength

    <select id="multiselect"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
        placeholder: "Select products...",
        dataTextField: "ProductName",
        dataValueField: "ProductID",
        autoBind: false,
        minLength: 3,
        enforceMinLength: true,
        dataSource: {
            type: "odata-v4",
            serverFiltering: true,
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/odata/Products",
                }
            }
        },
        value: [
            { ProductName: "Chang", ProductID: 2 },
            { ProductName: "Uncle Bob's Organic Dried Pears", ProductID: 7 }
        ]
    });
    </script>

### fillMode `String`*(default: "solid")*

Sets a value controlling how the color is applied. Can also be set to the following string values:

- "none"
- "solid"
- "flat"
- "outline"

#### Example - sets the fillMode

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      filter: "contains",
      fillMode: "flat"
    });
    </script>

### filter `String`*(default: "startswith")*

The filtering method used to determine the suggestions for the current value. Filtration is turned of by default, and can be performed over `string` values only (either the widget's data has to be an array of strings, or over the field, configured in the [`dataTextField`](/api/javascript/ui/multiselect#configuration-dataTextField) option).
The supported filter values are `startswith`, `endswith` and `contains`.

#### Example - set the filter

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      filter: "contains"
    });
    </script>

### fixedGroupTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the fixed header group. By default the widget displays only the value of the current group.

    <select id="customers" style="width: 400px;"></select>
    <script>
        $(document).ready(function() {
            $("#customers").kendoMultiSelect({
                placeholder: "Select customers...",
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
              	fixedGroupTemplate: "Fixed header: #: data #",
                height: 400,
                dataSource: {
                    transport: {
                        read: "https://demos.telerik.com/service/v2/core/Customers"
                    },
                    group: { field: "Country" }
                }
            });
        });
    </script>

### footerTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the footer template. The footer template receives the widget itself as a part of the data argument. Use the widget fields directly in the template.

#### Parameters

##### instance `Object`

The widget instance.

#### Example - specify footerTemplate as a string

    <select id="customers" style="width: 400px;"></select>
    <script>
    $("#customers").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      footerTemplate: 'Total <strong>#: instance.dataSource.total() #</strong> items found'
    });
    </script>


### inputMode `String`*(default: "text")*

Specifies the [`inputmode` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) of the inner `<input />` element. It is used to specify the type of on-screen keyboard that should be displayed when the user focuses the input.


### label `String|Function|Object` *(default: null)*

Adds a label before the input. If the input has no `id` attribute, a generated `id` will be assigned. The `string` and the `function` parameters are setting the inner HTML of the label.

#### Example - create a label from a string

    <select id="customers"></select>
    <script>
    $("#customers").kendoMultiSelect({
        dataTextField: "ContactName",
        dataValueField: "CustomerID",
        dataSource: {
            transport: {
                read: "https://demos.telerik.com/service/v2/core/Customers"
            },
            group: { field: "Country" }
        },
      label: "Customers"
    });
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <select id="customers"></select>
    <script>
    $("#customers").kendoMultiSelect({
        dataTextField: "ContactName",
        dataValueField: "CustomerID",
        dataSource: {
            transport: {
                read: "https://demos.telerik.com/service/v2/core/Customers"
            },
            group: { field: "Country" }
        },
      label: function() {
          return "Customers";
      }
    });
    </script>

### label.content `String|Function` *(default: "")*

Sets the inner HTML of the label.

#### Example - create a label from a string

    <select id="customers"></select>
    <script>
    $("#customers").kendoMultiSelect({
        dataTextField: "ContactName",
        dataValueField: "CustomerID",
        dataSource: {
            transport: {
                read: "https://demos.telerik.com/service/v2/core/Customers"
            },
            group: { field: "Country" }
        },
        label: { content: "Customers" }
    });
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <select id="customers"></select>
    <script>
    $("#customers").kendoMultiSelect({
        dataTextField: "ContactName",
        dataValueField: "CustomerID",
        dataSource: {
            transport: {
                read: "https://demos.telerik.com/service/v2/core/Customers"
            },
            group: { field: "Country" }
        },
      label: {
        content: function() {
            return "Customers";
        }
      }
    });
    </script>

### label.floating `Boolean` *(default: false)*

If set to `true`, the widget will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](/api/javascript/ui/multiselect/methods/value) method **does not trigger** the `focusout` event of the input.
This can affect the floating label functionality.
To overcome this behavior, manually invoke the `refresh` method of the Floating Label: `$("#multiselect").data("kendoMultiColumnComboBox").label.floatingLabel.refresh();`

#### Example

    <select id="customers"></select>
    <script>
    $("#customers").kendoMultiSelect({
        dataTextField: "ContactName",
        dataValueField: "CustomerID",
        dataSource: {
            transport: {
                read: "https://demos.telerik.com/service/v2/core/Customers"
            },
            group: { field: "Country" }
        },
        label: {
            content: "Customers",
            floating: true
        }
    });
    </script>


### groupTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the groups. By default the widget displays only the value of the group.

    <select id="customers" style="width: 400px;"></select>
    <script>
        $(document).ready(function() {
            $("#customers").kendoMultiSelect({
                placeholder: "Select customers...",
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
              	groupTemplate: "Group template: #: data #",
                height: 400,
                dataSource: {
                    transport: {
                        read: "https://demos.telerik.com/service/v2/core/Customers"
                    },
                    group: { field: "Country" }
                }
            });
        });
    </script>

### height `Number`*(default: 200)*

The height of the suggestion popup in pixels. The default value is 200 pixels.

#### Example - set the height

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      height: 500
    });
    </script>

### highlightFirst `Boolean`*(default: true)*

If set to `true` the first suggestion will be automatically highlighted.

#### Example - set highlightFirst

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      highlightFirst: false
    });
    </script>

### ignoreCase `Boolean`*(default: true)*

If set to `false` case-sensitive search will be performed to find suggestions. The widget performs case-insensitive searching by default.

#### Example - disable case-insensitive suggestions

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      ignoreCase: false
    });
    </script>

### messages `Object`

The text messages displayed in the widget. Use this option to customize or localize the messages.

#### Example - customize MultiSelect messages

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
      $("#multiselect").kendoMultiSelect({
        messages: {
          clear: "clear!",
          noData: "There is no data!"
        }
      });
    </script>

### messages.clear `String` *(default: "clear")*

The text message when hovering the input clear button.

#### Example - customize clear message

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
      $("#multiselect").kendoMultiSelect({
        messages: {
          clear: "clear!"
        }
      });
    </script>

### messages.deleteTag `String` *(default: "delete")*

The text message shown when hovering delete icon in a selected tag.

#### Example - customize deleteTag message

    <input id="multiselect" style="width: 400px;" />
    <script>
        $("#multiselect").kendoMultiSelect({
            dataSource: [
                { id: 1, name: "Apples" },
                { id: 2, name: "Oranges" }
            ],
            dataTextField: "name",
            dataValueField: "id",
            messages: {
                deleteTag: "delete!"
            }
        });
    </script>

### messages.downArrow `String` *(default: "select")*

Specifies the text that will be used for the MultiSelect `downArrow` title attribute.

#### Example

    <input id="multiselect" style="width: 400px;" />
    <script>
        $("#multiselect").kendoMultiSelect({
            dataSource: [
                { id: 1, name: "Apples" },
                { id: 2, name: "Oranges" }
            ],
            dataTextField: "name",
            dataValueField: "id",
            messages: {
                downArrow: "custom!"
            }
        });
    </script>

### messages.noData `String` *(default: "No data found.")*

The text message shown in the noDataTemplate when no data is available in the widget drop-down.

#### Example - customize noData message

    <select id="multiselect" multiple="multiple"></select>
    <script>
      $("#multiselect").kendoMultiSelect({
        messages: {
          noData: "There is no data!"
        }
      });
    </script>

### messages.singleTag `String` *(default: "item(s) selected")*

The text message shown in the single TagMode tag.

#### Example - customize singleTag message

    <input id="multiselect" style="width: 400px;" />
    <script>
        $("#multiselect").kendoMultiSelect({
            dataSource: [
                { id: 1, name: "Apples" },
                { id: 2, name: "Oranges" }
            ],
            dataTextField: "name",
            dataValueField: "id",
            messages: {
                singleTag: "item(s) selected!",
            },
            tagMode: "single"
        });
    </script>

### minLength `Number`*(default: 1)*

The minimum number of characters the user must type before a search is performed. Set to a higher value if the search could match a lot of items.
A zero value means that a request will be made as soon as the user focuses the widget.

> Widget will initiate a request when input value is cleared. If you would like to prevent this behavior please check the [filtering](/api/javascript/ui/multiselect/events/filtering) event for more details.

#### Example - set minLength

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      minLength: 3
    });
    </script>

### maxSelectedItems `Number`*(default: null)*

 Defines the limit of the selected items. If set to null widget will not limit number of the selected items.

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
        <option>Item3</option>
        <option>Item4</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
        maxSelectedItems: 3 //only three or less items could be selected
    });
    </script>

### noDataTemplate `String|Function|Boolean` *(default: true)*

The [template](/api/javascript/kendo/methods/template) used to render the "no data" template, which will be displayed if no results are found or the underlying data source is empty.
The noData template receives the widget itself as a part of the data argument. The template will be evaluated on every widget data bound.

> **Important** The popup will open when 'noDataTemplate' is defined

#### Example - specify noDataTemplate as a string

    <select id="multiselect"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      noDataTemplate: 'No Data!'
    });
    </script>

### placeholder `String`*(default: "")*

The hint displayed by the widget when it is empty. Not set by default.

#### Example - specify placeholder option

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      placeholder: "Select..."
    });
    </script>

#### Example - specify placeholder as HTML attribute

    <select id="multiselect" data-placeholder="Select..." multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>

    <script>
    $("#multiselect").kendoMultiSelect();
    </script>

### popup `Object`

The options that will be used for the popup initialization. For more details about the available options
refer to [Popup](/api/javascript/ui/popup) documentation.

#### Example - append the popup to a specific element

    <div id="container">
        <select id="multiselect"></select>
    </div>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      popup: {
        appendTo: $("#container")
      }
    });
    </script>

### popup.appendTo `String`

Defines a jQuery selector that will be used to find a container element, where the popup will be appended to.

#### Example - append the popup to a specific element

    <div id="container">
        <select id="multiselect"></select>
    </div>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      popup: {
        appendTo: $("#container")
      }
    });
    </script>

### popup.origin `String`

Specifies how to position the popup element based on anchor point. The value is
space separated "y" plus "x" position.

The available "y" positions are:
- "bottom"
- "center"
- "top"

The available "x" positions are:
- "left"
- "center"
- "right"

#### Example - append the popup to a specific element

    <div id="container">
        <select id="multiselect"></select>
    </div>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      popup: {
        position: "top center"
      }
    });
    </script>
    <style>
      #container{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -50px;
        margin-left: -50px;
        width: 100px;
        height: 100px;
      }
    </style>

### popup.position `String`

Specifies which point of the popup element to attach to the anchor's origin point. The value is
space separated "y" plus "x" position.

The available "y" positions are:
- "bottom"
- "center"
- "top"

The available "x" positions are:
- "left"
- "center"
- "right"

#### Example - append the popup to a specific element

    <div id="container">
        <select id="multiselect"></select>
    </div>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      popup: {
        origin: "top left"
      }
    });
    </script>

### headerTemplate `String|Function`

Specifies a static HTML content, which will be rendered as a header of the popup element.

> **Important** The header content **should be wrapped** with a HTML tag if it contains more than one element. This is applicable also when header content is just a string/text.

> **Important** Widget does not pass a model data to the header template. Use this option only with static HTML.

#### Example - specify headerTemplate as a string

    <select id="multiselect"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      headerTemplate: '<div><h2>Fruits</h2></div>'
    });
    </script>

### itemTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the items in the popup list.

#### Example - specify template as a function

    <select id="multiselect" multiple="multiple"></select>
    <script id="itemTemplate" type="text/x-kendo-template">
      <span> 
        #: name #
      </span>
    </script>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      itemTemplate: kendo.template($("#itemTemplate").html())
    });
    </script>

#### Example - specify template as a string

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      itemTemplate: '<span>#: name #</span>'
    });
    </script>

### prefixOptions `Object`

The configuration for the prefix adornment of the component.

#### Example - specify prefix adornment configuration

    <input id="prefix" />
    <script>
        $("#prefix").kendoMultiSelect({
            label: "MultiSelect",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                    data:  [
                            { text: "Apples", value: "1" },
                            { text: "Oranges", value: "2" }
                    ]
            },
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        });
    </script>

### prefixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content

#### Example - specify prefix adornment icon

    <input id="prefix" />
    <script>
        $("#prefix").kendoMultiSelect({
            label: "MultiSelect",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                    data:  [
                            { text: "Apples", value: "1" },
                            { text: "Oranges", value: "2" }
                    ]
            },
            prefixOptions: {
                icon: "search"
            }
        })
    </script>

### prefixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the prefix adornment of the component.

#### Example - specify prefix adornment template

    <input id="prefix" />
    <script>
        $("#prefix").kendoMultiSelect({
            label: "MultiSelect",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                    data:  [
                            { text: "Apples", value: "1" },
                            { text: "Oranges", value: "2" }
                    ]
            },
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        })
    </script>

### prefixOptions.separator `Boolean` *(default: true)*

If set to `false`, the prefix adornment will not have a separator.

#### Example - specify prefix adornment separator

    <input id="prefix" />
    <script>
        $("#prefix").kendoMultiSelect({
            label: "MultiSelect",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                    data:  [
                            { text: "Apples", value: "1" },
                            { text: "Oranges", value: "2" }
                    ]
            },
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}`,
                separator: false
            }
        })
    </script>

### suffixOptions `Object`

The configuration for the suffix adornment of the component.

#### Example - specify suffix adornment configuration

    <input id="suffix" />
    <script>
        $("#suffix").kendoMultiSelect({
            label: "MultiSelect",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                    data:  [
                            { text: "Apples", value: "1" },
                            { text: "Oranges", value: "2" }
                    ]
            },
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        });
    </script>

### suffixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content

#### Example - specify suffix adornment icon

    <input id="suffix" />
    <script>
        $("#suffix").kendoMultiSelect({
            label: "MultiSelect",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                    data:  [
                            { text: "Apples", value: "1" },
                            { text: "Oranges", value: "2" }
                    ]
            },
            suffixOptions: {
                icon: "search"
            }
        })
    </script>

### suffixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the suffix adornment of the component.

#### Example - specify suffix adornment template

    <input id="suffix" />
    <script>
        $("#suffix").kendoMultiSelect({
            label: "MultiSelect",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                    data:  [
                            { text: "Apples", value: "1" },
                            { text: "Oranges", value: "2" }
                    ]
            },
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        })
    </script>

### suffixOptions.separator `Boolean` *(default: true)*

If set to `false`, the suffix adornment will not have a separator.

#### Example - specify suffix adornment separator

    <input id="suffix" />
    <script>
        $("#suffix").kendoMultiSelect({
            label: "MultiSelect",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                    data:  [
                            { text: "Apples", value: "1" },
                            { text: "Oranges", value: "2" }
                    ]
            },
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}`,
                separator: false
            }
        })
    </script>

### tagTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the tags.

#### Template Data for the 'multiple' [tagMode](/api/javascript/ui/multiselect#configuration-tagMode)

##### data `Object`

The dataitem that corresponds to the selected value.

#### Template Data for the 'single' [tagMode](/api/javascript/ui/multiselect#configuration-tagMode)

##### data.values `Array`

A list of the selected values.

##### data.dataItems `Array`

A list of the selected data items.

##### data.currentTotal `Array`

The current dataSource total value. If it is server filtered, it will show the current length of the [view](/api/javascript/data/datasource/methods/view).

##### data.maxTotal `Array`

The maximum total value of the dataSource. Unlike the `currentTotal`, this value will keep the maximum reached total value.
Usable when the tag shows the total of the available items.

#### Example - specify template as a function

    <select id="multiselect" multiple="multiple"></select>
    <script id="tagTemplate" type="text/x-kendo-template">
      <span>
        <img src="/img/#: id #.png" alt="#: name #" />
        #: name #
      </span>
    </script>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      tagTemplate: kendo.template($("#tagTemplate").html())
    });
    </script>

#### Example - specify template as a string

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      tagTemplate: '<span><img src="/img/#: id #.png" alt="#: name #" />#: name #</span>'
    });
    </script>

#### Example - specify a template displaying the number of the selected values

    <select id="multiselect" multiple="multiple"></select>
    <script id="tagTemplate" type="text/x-kendo-template">
        # if (values.length < 3) { #
            # for (var idx = 0; idx < values.length; idx++) { #
                #:values[idx]#
                # if (idx < values.length - 1) {#, # } #
            # } #
        # } else { #
           #:values.length# out of #:maxTotal#
        # } #
    </script>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" },
        { id: 2, name: "Bananas" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      tagTemplate: kendo.template($("#tagTemplate").html()),
      tagMode: "single"
    });
    </script>

### tagMode `String`*(default: "multiple")*

The mode used to render the selected tags. The available modes are:
- `multiple` - renders a tag for every selected value
- `single` - renders only one tag that shows the number of the selected values

> Every tagMode has a specific `tagTemplate` value. If you would like to control the content of the rendered tags,
set a custom a [tagTemplate](/api/javascript/ui/multiselect#configuration-tagTemplate) value.

#### Example - set the tagMode

    <input id="multiselect" style="width: 400px;" />
    <script>
        $("#multiselect").kendoMultiSelect({
            dataSource: [
                { id: 1, name: "Apples" },
                { id: 2, name: "Oranges" },
                { id: 3, name: "Bananas" }
            ],
            dataTextField: "name",
            dataValueField: "id",
            tagMode: "single"
        });
    </script>

### value `Array`*(default: [])*

 Define the value of the widget

#### Example


    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
         dataSource: ["Item1", "Item2", "Item3", "Item4"],
         value: ["Item2", "Item3"]
    });
    </script>

> **Important:** Define a list of data items if widget is not initially bound

#### Example

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
        autoBind: false,
        dataTextField: "productName",
        dataValueField: "productId",
        value: [{ productName: "Item 1", productId: "1" }, { productName: "Item 2", productId: "2" }]
    });
    </script>

### valuePrimitive `Boolean`*(default: false)*

Specifies the [value binding](/framework/mvvm/bindings/value) behavior for the widget. If set to true, the View-Model field will be updated with the selected item value field. If set to false, the View-Model field will be updated with the selected item.

#### Example - specify that the View-Model field should be updated with the selected item value

    <select id="multiselect" multiple="multiple" data-bind="value: selectedProductId, source: products"></select>

    <script>
    $("#multiselect").kendoMultiSelect({
      valuePrimitive: true,
      dataTextField: "name",
      dataValueField: "id"
    });
    var viewModel = kendo.observable({
      selectedProductId: [],
      products: [
        { id: 1, name: "Coffee" },
        { id: 2, name: "Tea" },
        { id: 3, name: "Juice" }
      ]
    });

    kendo.bind($("#multiselect"), viewModel);
    </script>

### virtual `Boolean|Object`*(default: false)*

Enables the virtualization feature of the widget. The configuration can be set on an object, which contains two properties - `itemHeight` and `valueMapper`.

For detailed information, refer to the [article on virtualization]({% slug virtualization_kendoui_combobox_widget %}).

#### Example - MultiSelect with a virtualized list

    <select id="orders" style="width: 400px;"></select>
    <script>
        $(document).ready(function() {
            $("#orders").kendoMultiSelect({
                placeholder: "Select addresses...",
                dataTextField: "ShipName",
                dataValueField: "OrderID",
                height: 520,
                virtual: {
                    itemHeight: 26,
                    valueMapper: function(options) {
                        $.ajax({
                            url: "https://demos.telerik.com/service/v2/core/Orders/ValueMapper",
                            type: "GET",
                            data: convertValues(options.value),
                            success: function (data) {
                                options.success(data);
                            }
                        })
                    }
                },
                dataSource: {
                    type: "odata-v4",
                    transport: {
                        read: "https://demos.telerik.com/service/v2/odata/Orders"
                    },
                    schema: {
                        model: {
                            fields: {
                                OrderID: { type: "number" },
                                Freight: { type: "number" },
                                ShipName: { type: "string" },
                                OrderDate: { type: "date" },
                                ShipCity: { type: "string" }
                            }
                        }
                    },
                    pageSize: 80,
                    serverPaging: true,
                    serverFiltering: true
                }
            });
        });

        function convertValues(value) {
            var data = {};

            value = $.isArray(value) ? value : [value];

            for (var idx = 0; idx < value.length; idx++) {
                data["values[" + idx + "]"] = value[idx];
            }

            return data;
        }
    </script>

#### Example - MultiSelect widget with a declarative virtualization configuration

    <div class="demo-section k-header">
        <h4>Search for shipping name</h4>
        <select id="orders" style="width: 400px"
               data-role="multiselect"
               data-bind="value: order, source: source"
               data-text-field="ShipName"
               data-value-field="OrderID"
               data-filter="contains"
               data-virtual="{itemHeight:26,valueMapper:orderValueMapper}"
               data-height="520"
                ></select>
    </div>

    <script>
        $(document).ready(function() {
            var model = kendo.observable({
                    order: [10548],
              source: new kendo.data.DataSource({
                type: "odata-v4",
                transport: {
                  read: "https://demos.telerik.com/service/v2/odata/Orders"
                },
                schema: {
                  model: {
                    fields: {
                      OrderID: { type: "number" },
                      Freight: { type: "number" },
                      ShipName: { type: "string" },
                      OrderDate: { type: "date" },
                      ShipCity: { type: "string" }
                    }
                  }
                },
                pageSize: 80,
                serverPaging: true,
                serverFiltering: true
              })
            });


            kendo.bind($(document.body), model);
        });

        function orderValueMapper(options) {
            $.ajax({
              url: "https://demos.telerik.com/service/v2/core/Orders/ValueMapper",
              type: "GET",
              data: convertValues(options.value),
              success: function (data) {
                options.success(data);
              }
            })
        }

        function convertValues(value) {
            var data = {};

            value = $.isArray(value) ? value : [value];

            for (var idx = 0; idx < value.length; idx++) {
                data["values[" + idx + "]"] = value[idx];
            }

            return data;
        }
    </script>

### virtual.itemHeight `Number`*(default: null)*

Specifies the height of the virtual item. All items in the virtualized list **must** have the same height.
If the developer does not specify one, the framework will automatically set `itemHeight` based on the current theme and font size.

#### Example - MultiSelect with a virtualized list

    <select id="orders" style="width: 400px;"></select>
    <script>
        $(document).ready(function() {
            $("#orders").kendoMultiSelect({
                placeholder: "Select addresses...",
                dataTextField: "ShipName",
                dataValueField: "OrderID",
                height: 520,
                virtual: {
                    itemHeight: 26,
                    valueMapper: function(options) {
                        $.ajax({
                            url: "https://demos.telerik.com/service/v2/core/Orders/ValueMapper",
                            type: "GET",
                            data: convertValues(options.value),
                            success: function (data) {
                                //the **data** is either index or array of indices.
                                //Example:
                                // 10258 -> 10 (index in the Orders collection)
                                // [10258, 10261] -> [10, 14] (indices in the Orders collection)

                                options.success(data);
                            }
                        })
                    }
                },
                dataSource: {
                    type: "odata-v4",
                    transport: {
                        read: "https://demos.telerik.com/service/v2/odata/Orders"
                    },
                    schema: {
                        model: {
                            fields: {
                                OrderID: { type: "number" },
                                Freight: { type: "number" },
                                ShipName: { type: "string" },
                                OrderDate: { type: "date" },
                                ShipCity: { type: "string" }
                            }
                        }
                    },
                    pageSize: 80,
                    serverPaging: true,
                    serverFiltering: true
                }
            });
        });

        function convertValues(value) {
            var data = {};

            value = $.isArray(value) ? value : [value];

            for (var idx = 0; idx < value.length; idx++) {
                data["values[" + idx + "]"] = value[idx];
            }

            return data;
        }
    </script>

### virtual.mapValueTo `String`*(default: "index")*

The changes introduced with the Kendo UI R3 2016 release enable you to determine if the `valueMapper` must resolve a *value to an `index`* or a *value to a `dataItem`*. This is configured through the `mapValueTo` option that accepts two possible values - `"index"` or `"dataItem"`. By default, the `mapValueTo` is set to `"index"`, which does not affect the current behavior of the virtualization process.

For more information, refer to the [article on virtualization]({% slug virtualization_kendoui_combobox_widget %}#value-mapping).

### virtual.valueMapper `Function`*(default: null)*

The widget calls the `valueMapper` function when the widget receives a value, that is not fetched from the remote server yet.
The widget will pass the selected value(s) in the `valueMapper` function. In turn, the `valueMapper` implementation should return the **respective data item(s) index/indices**.
> **Important**
>
> As of the Kendo UI R3 2016 release, the implementation of the `valueMapper` function is optional. It is required only if the widget contains an initial value or if the `value` method is used.

#### Example - MultiSelect with a virtualized list

    <select id="orders" style="width: 400px;"></select>
    <script>
        $(document).ready(function() {
            $("#orders").kendoMultiSelect({
                placeholder: "Select addresses...",
                dataTextField: "ShipName",
                dataValueField: "OrderID",
                height: 520,
                virtual: {
                    itemHeight: 26,
                    valueMapper: function(options) {
                        $.ajax({
                            url: "https://demos.telerik.com/service/v2/core/Orders/ValueMapper",
                            type: "GET",
                            data: convertValues(options.value),
                            success: function (data) {
                                options.success(data);
                            }
                        })
                    }
                },
                dataSource: {
                    type: "odata-v4",
                    transport: {
                        read: "https://demos.telerik.com/service/v2/odata/Orders"
                    },
                    schema: {
                        model: {
                            fields: {
                                OrderID: { type: "number" },
                                Freight: { type: "number" },
                                ShipName: { type: "string" },
                                OrderDate: { type: "date" },
                                ShipCity: { type: "string" }
                            }
                        }
                    },
                    pageSize: 80,
                    serverPaging: true,
                    serverFiltering: true
                }
            });
        });

        function convertValues(value) {
            var data = {};

            value = $.isArray(value) ? value : [value];

            for (var idx = 0; idx < value.length; idx++) {
                data["values[" + idx + "]"] = value[idx];
            }

            return data;
        }
    </script>

### readonly `Boolean`*(default: "false")*

If set to `true`, the widget will be readonly and will not allow user input. The widget is not readonly be default and allow user input.

#### Example - make the widget readonly

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      readonly: true
    });
    </script>

### rounded `String`*(default: "medium")*

Sets a value controlling the border radius. Can also be set to the following string values:

- "none"
- "small"
- "medium"
- "large"
- "full"

#### Example - sets the rounded value

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      rounded: "large"
    });
    </script>

### size `String`*(default: "medium")*

Sets a value controlling size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"

#### Example - sets a size

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      size: "large"
    });
    </script>

## Fields

### dataSource `kendo.data.DataSource`

The [data source](/api/javascript/data/datasource) of the widget. Configured via the [dataSource](/api/javascript/ui/multiselect/configuration/datasource) option.

> Changes of the data source will be reflected in the widget.

> **Important:** Assigning a new data source would have no effect. Use the [setDataSource](/api/javascript/ui/multiselect/methods/setdatasource) method instead.

#### Example - add a data item to the data source

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { name: "Apples" },
        { name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "name"
    });
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.dataSource.add({ name: "Appricot" });
    multiselect.search("A");
    </script>

### input `jQuery`
A jQuery object of the visible input element, where the user types.

#### Example - get input element

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    var input = multiselect.input;
    </script>

### options `Object`
An object, which holds the options of the widget.

#### Example - get options of the widget

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    var options = multiselect.options;
    </script>

### list `jQuery`
A jQuery object of the drop-down list element.

#### Example - get list element

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    var list = multiselect.list;
    </script>

### ul `jQuery`
A jQuery object of the `ul` element, which holds the available options.

#### Example - get ul element

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    var ul = multiselect.ul;
    </script>

### tagList `jQuery`
A jQuery object of the `ul` element, which holds the selected tags.

#### Example - get tagList element

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    var tagList = multiselect.tagList;
    </script>

## Methods

### close

Closes the widget popup.

#### Example - close the suggestion popup

    <select id="multiselect" multiple="multiple">
        <option>Apples</option>
        <option>Oranges</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    // Search for items starting with "A" - will open the suggestion popup and show "Apples"
    multiselect.search("A");
    // Close the suggestion popup
    multiselect.close();
    </script>

### dataItems

Returns list of raw data records corresponding to the selected items.

#### Returns

`Array` The raw data records. Returns empty array ([]) if no selected options

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    // get data items for the selected options.
    var dataItem = multiselect.dataItems();
    </script>

### destroy

Prepares the **MultiSelect** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the MultiSelect element from DOM.

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.destroy();
    </script>

### enable

Enables or disables the widget.

#### Parameters

##### enable `Boolean`

If set to `true` the widget will be enabled. If set to `false` the widget will be disabled.

#### Example - enable the widget

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      enable: false
    });
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.enable(true);
    </script>

### focus

Focuses the widget.

#### Example - focus the widget

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.focus();
    </script>

### items

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI DataSource [view](/api/javascript/data/datasource/methods/view).

#### Returns

`Array` The currently rendered dropdown list items (`<li>` elements).

### open

Opens the popup.

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.open();
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.

#### Parameters

##### readonly `Boolean`

If set to `true` the widget will not allow user input. If set to `false` the widget will allow user input.

#### Example - make the widget readonly

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.readonly(true);
    </script>

### refresh

Refresh the popup by rendering all items again.

#### Example - refresh the popup items

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    multiselect.refresh();
    </script>

### search

Searches the data source for the provided value and displays any matches as suggestions.

#### Parameters

##### word `String`

The filter value.

#### Example - search the widget

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    multiselect.search("Item1");
    </script>

### setDataSource

Sets the dataSource of an existing MultiSelect and rebinds it.

#### Parameters

##### dataSource `kendo.data.DataSource`

#### Example

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [ "Apples", "Oranges" ]
    });
    var dataSource = new kendo.data.DataSource({
      data: [ "Bananas", "Cherries" ]
    });
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.setDataSource(dataSource);
    </script>

### toggle

Opens or closes the widget popup.

#### Parameters

##### toggle `Boolean` *(optional)*

Defines the whether to open/close the drop-down list.

#### Example - set text of the widget

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    multiselect.toggle();
    </script>

### value

Gets or sets the value of the MultiSelect.

> **Important:** If there are no items, the value method will pre-fetch the data before continue with the value setting.

> **Important:** The widget will **clear the applied filter** if a new value is set. Thus it ensures that the original/whole data set is available for selection.

> **Important:** This method **does not trigger** [change](/api/javascript/ui/multiselect/events/change) event.
This could affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior by triggering the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    multiselect.value("Item1");
    multiselect.trigger("change");
    </script>

#### Parameters

##### value `Array|String`

The value to set. A *String* value or an *Array of strings* is accepted. To clear the value, pass an empty array.

#### Returns

`Array` The value of the MultiSelect.

#### Example - set value

    <select id="multiselect" multiple="multiple">
        <option value="1">Item1</option>
        <option value="2">Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    // get the value of the multiselect.
    var value = multiselect.value();

    // set the value of the multiselect.
    multiselect.value(["1", "2"]); //select items which have value respectively "1" and "2"
    </script>

> If initial items are lost in attempt to set new values, probably the widget is filtered by the end user, but no value has been selected. You will need to remove applied filter, before calling value method

#### Example - remove applied filter before set the value

    <select id="multiselect" multiple="multiple">
        <option value="1">Item1</option>
        <option value="2">Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    //clear filter
    multiselect.dataSource.filter({});

    //set value
    multiselect.value(["1", "2"]);
    </script>

## Events

### change

Fired when the value of the widget is changed by the user.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

> **Important:** The event is not fired when the value of the widget is changed from code.

#### Event Data

##### e.sender `kendo.ui.MultiSelect`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      change: function(e) {
        var value = this.value();
        // Use the value of the widget
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    function multiselect_change(e) {
      var value = this.value();
      // Use the value of the widget
    }
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.bind("change", multiselect_change);
    </script>

### close

Fired when the popup of the widget is closed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.MultiSelect`

The widget instance which fired the event.

#### Example - subscribe to the "close" event during initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      close: function(e) {
        // handle the event
      }
    });
    </script>

#### Example - subscribe to the "close" event after initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    function multiselect_close(e) {
      // handle the event
    }
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.bind("close", multiselect_close);
    </script>

### dataBound

Fired when the widget is bound to data from its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.MultiSelect`

The widget instance which fired the event.

#### Example - subscribe to the "dataBound" event during initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataBound: function(e) {
          // handle the event
      }
    });
    </script>

#### Example - subscribe to the "dataBound" event after initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    function multiselect_dataBound(e) {
      // handle the event
    }
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.bind("dataBound", multiselect_dataBound);
    </script>

### filtering

Fired when the widget is about to filter the data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.MultiSelect`

The widget instance which fired the event.

##### e.filter `Object`

The filter descriptor that will be used to filter the data source.

> The data source filters the data items client-side unless the [data source serverFiltering](/api/javascript/data/datasource/configuration/serverfiltering) option is set to `true`.

#### Example - subscribe to the "filtering" event during initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      filter: "startswith",
      filtering: function(e) {
          //get filter descriptor
          var filter = e.filter;

          // handle the event
      }
    });
    </script>

#### Example - subscribe to the "filtering" event after initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    function multiselect_filtering(e) {
      //get filter descriptor
      var filter = e.filter;

      // handle the event
    }
    $("#multiselect").kendoMultiSelect({
      filter: "startswith"
    });
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.bind("filtering", multiselect_filtering);
    </script>

#### Example - prevent filtering event when filter value is empty

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      filter: "startswith",
      filtering: function(e) {
          var filter = e.filter;

          if (!filter.value) {
            //prevent filtering if the filter does not have value
            e.preventDefault();
          }
      }
    });
    </script>

### open

Fired when the popup of the widget is opened by the user.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.MultiSelect`

The widget instance which fired the event.

#### Example - subscribe to the "open" event during initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      open: function(e) {
        // handle the event
      }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    function multiselect_open(e) {
      // handle the event
    }
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.bind("open", multiselect_open);
    </script>

### select

Fired when an item from the popup is selected by the user.

> **Important:** The event is not fired when an item is selected programmatically.

#### Event Data

##### e.dataItem `Object`

The data item instance of the selected item.

##### e.item `jQuery`

The jQuery object which represents the selected item.

##### e.sender `kendo.ui.MultiSelect`

The widget instance which fired the event.

#### Example - subscribe to the "select" event during initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      select: function(e) {
        var item = e.item;
        var text = item.text();
        // Use the selected item or its text
      }
    });
    </script>

#### Example - subscribe to the "select" event after initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    function multiselect_select(e) {
      var item = e.item;
      var text = item.text();
      // Use the selected item or its text
    }
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.bind("select", multiselect_select);
    </script>

#### Example - prevent the item selection

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      select: function(e) {
        //call preventDefault() to prevent the selection
        e.preventDefault();
      }
    });
    </script>

### deselect

Fired when an item is deselected or tag is removed.

> **Important:** The event is not fired when an item is deselected programmatically.

#### Event Data

##### e.dataItem `Object`

The data item instance of the deselected item/tag.

##### e.item `jQuery`

The jQuery object which represents the deselected item or removed tag element.

##### e.sender `kendo.ui.MultiSelect`

The widget instance which fired the event.

#### Example - subscribe to the "deselect" event during initialization

    <select id="multiselect" multiple="multiple">
        <option selected>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      deselect: function(e) {
        var dataItem = e.dataItem;
        var item = e.item;
        // Use the deselected data item or jQuery item
      }
    });
    </script>

#### Example - subscribe to the "deselect" event after initialization

    <select id="multiselect" multiple="multiple">
        <option selected>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    function multiselect_deselect(e) {
        var dataItem = e.dataItem;
        var item = e.item;
        // Use the deselected data item or jQuery item
    }
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.bind("deselect", multiselect_deselect);
    </script>

#### Example - prevent the deselection action

    <select id="multiselect" multiple="multiple">
        <option selected>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      deselect: function(e) {
        // Call preventDefault() to prevent the deselection
        e.preventDefault();
      }
    });
    </script>
