---
title: Frequently Asked Questions
page_title: Frequently Asked Questions
description: "Find the answers of the most frequently asked questions related to the Telerik UI Grid component and their answers."
previous_url: /kendo-ui/aspnet-mvc/helpers/grid/faq, /helpers/data-management/grid/faq
slug: freqaskedquestions_gridhelper_aspnetmvc
position: 31
---

# Frequently Asked Questions

This article lists some of the most frequently asked questions when working with the Telerik UI Grid component for {{ site.framework }}.

## How can I display HTML in Grid columns?

By default, the Telerik UI Grid for {{ site.framework }} encodes the HTML entities that are included in its data. To prevent this, call the [`Encoded`](/api/kendo.mvc.ui.fluent/gridboundcolumnbuilder#formatsystemstring) method and pass `false` as its argument.

```HtmlHelper
    columns.Bound(o => o.Description).Encoded(false);
```
{% if site.core %}
```TagHelper
    <columns>
 	    <column field="Description" encoded="false">
 	    </column>
    </columns>
```
{% endif %}

## How can I customize the way properties are displayed in Grid-bound columns?

{% if site.mvc %}

* If the Grid is configured for [server binding]({% slug serverbinding_grid_aspnetmvc %}), use the `Template` method to customize the default column template.

  > The `Template` method needs a [templated Razor delegate](http://haacked.com/archive/2011/02/27/templated-razor-delegates.aspx) when used in Razor views. The bound item is available through the `@item` parameter.

    ```HtmlHelper
        @model IEnumerable<Product>

          @(Html.Kendo().Grid(Model)
              .Name("Grid")
              .Columns(columns =>
              {
                  columns.Bound(p => p.Title).Template(@<text>
                      <strong>@item.Title</strong>
                  </text>);
              })
          )
    ```

Here is another example that shows how to set the server-side detail template of the Grid through the [DetailTemplate()](https://docs.telerik.com/aspnet-mvc/api/kendo.mvc.ui.fluent/gridbuilder#detailtemplatesystemfunc) option:

```HtmlHelper
    @model IEnumerable<Product>

    @(Html.Kendo().Grid(Model)
        .Name("Grid")
        .DetailTemplate(@<text>
            <div>ProductID: @item.ProductID</div>
            <div>ProductName: @item.ProductName</div>
            <div>UnitsInStock: @item.UnitsInStock</div>
            <div>UnitPrice: @item.UnitPrice</div>
            <div>UnitsOnOrder: @item.UnitsOnOrder</div>
            <div>Discontinued: @item.Discontinued</div>
        </text>)
        ...
    )
```

It is important to note that you can use only-server templates when the Grid is `server-bound`. They are not available in Ajax or WebService binding mode. For these cases, you will need to use Client Templates.

* If the Grid is `Ajax-bound`, use the `ClientTemplate` method. The value should be a string, which represents a valid [Kendo UI Template](https://docs.telerik.com/kendo-ui/framework/templates/overview).
{% else %}

Use the `ClientTemplate` method. The value should be a string, which represents a valid [Kendo UI Template](https://docs.telerik.com/kendo-ui/framework/templates/overview).

{% endif %}

```HtmlHelper
    .Columns(columns =>
    {
        columns.Bound(p => p.Title).ClientTemplate("<strong>#: Title #</strong>");
    })
```
{% if site.core %}
```TagHelper
    <columns>
 	    <column field="Title" template="<strong>#: Title #</strong>">
 	    </column>
    </columns>
```
{% endif %}

## How can I apply conditional logic to client column templates?

A Kendo UI Template may contain arbitrary JavaScript code. The `#` symbol is used to denote JavaScript blocks.

The following example demonstrates the conditions in the `ClientTemplate`.

```HtmlHelper
    columns.Bound(p => p.ProductName).ClientTemplate(
        "# if (HasIcon == true) { #" +
            "<img src='" + Url.Content("~/Content/icons/") + "#= ProductID #.png' alt='#= ProductName # icon' />" +
        "# } else { #" +
            "#: ProductName #" +
        "# } #"
    );
```
{% if site.core %}
```TagHelper
    <columns>
 	     <column field="ProductName" 
                 template="# if (HasIcon == true) { # <img src=@Url.Content("~/Content/icons/")#= ProductID #.png alt='#= ProductName # icon'/># } else { ##: ProductName ## } #">
 	     </column>
    </columns>
```
{% endif %}

{% if site.mvc %}
## How can I apply conditional logic to column templates for server-bound Grids?

The following example demonstrates the syntax when you use a column template in a server-bound Grid.

```HtmlHelper
    columns.Bound(p => p.ProductName).Template( @<text>
        @if(@item.ProductName != null){
             @item.ProductName
        } else {
            "No data"
        }
        </text>
    );
```

{% endif %}
## How can I display checkboxes in Ajax-bound Grids?

The `checked` attribute specifies whether a checkbox is displayed as checked or not checked. Use a condition to set that attribute.

The following example demonstrates how to display a checkbox in a bound `ColumnClientTemplate`.

```HtmlHelper
    columns.Bound(p => p.Enabled).ClientTemplate(
        "<input type='checkbox' value='#= ProductID #' " +
            "# if (Enabled) { #" +
                "checked='checked'" +
            "# } #" +
        "/>"
    );
```
{% if site.core %}
```TagHelper
    <columns>
       <column field="Enabled"
               template="<input type='checkbox' value='#= ProductID #' # if (Enabled) { # checked='checked'# } #/>">
 	   </column>
    </columns>
```
{% endif %}

## How can I use action links?

{% if site.mvc %}
* For server-bound Grids, use the `Template` method. The following example demonstrates an action link in a Grid column.

    ```HtmlHelper
        columns.Bound(p => p.ProductID).Template(@<text>
            @Html.ActionLink("Show Product Details", "ProductDetails", new { id = @item.ProductID } )>
        </text>);
    ```
{% endif %}

* For Ajax-bound Grids, use the `ClientTemplate` method. The following example demonstrates an action link in an Ajax-bound Grid column.

    ```HtmlHelper
        columns.Bound(p => p.ProductID).ClientTemplate(
            "<a href='" +
                Url.Action("ProductDetails", "Product") +
                "/#= ProductID #'" +
            ">Show Product Details</a>"
        );
    ```
    {% if site.core %}
    ```TagHelper
        <columns>
            <column field="ProductID"
                template="<a href='@Url.Action("ProductDetails", "Product")/#= ProductID #'>Show Product Details</a>">
            </column>
        </columns>
    ```
    {% endif %}

## How can I use JavaScript functions in client column templates?

The Kendo UI Template has an implicit parameter called `data`. Use it as the argument of the JavaScript function.

The following example demonstrates how to use a JavaScript function in the `ClientTemplate`.

```HtmlHelper
    // Omitted for brevity.
    columns.Bound(p => p.ProductID).ClientTemplate("#= productDetails(data) #");
    // Omitted for brevity.

    <script>
    function productDetails(product) {
        var action = '@Url.Action("ProductDetails", "Product")';

        var html = kendo.format("<a href='{0}/{1}'>Show Product Details</a>",
            action,
            product.ProductID
        );

        return html;
    }
    </script>
```
{% if site.core %}
```TagHelper
    // Omitted for brevity.
    <columns>
 	    <column field="ProductID" template="#= productDetails(data) #">
 	    </column>
    </columns>
    // Omitted for brevity.

    <script>
    function productDetails(product) {
        var action = '@Url.Action("ProductDetails", "Product")';

        var html = kendo.format("<a href='{0}/{1}'>Show Product Details</a>",
            action,
            product.ProductID
        );

        return html;
    }
    </script>
```
{% endif %}

## How can I use Kendo UI widgets inside Grid client column templates?

The `script` tags are not automatically evaluated inside a Grid client column template, so the included widgets are not initialized. The scripts must be evaluated manually in the [Grid's `dataBound` event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-dataBound).

The following example demonstrates how to add a Kendo UI Menu inside a Grid column template. Note that the Menu requires the Grid cells to allow overflowing, which is disabled by default.
{% if site.mvc %}

```HtmlHelper
    @(Html.Kendo().Grid<ModelType>()
        .Name("GridID")
        .Columns(columns => {
            columns.Template(@<text></text>).HtmlAttributes(new { @class = "templateCell" }).ClientTemplate(
                    Html.Kendo().Menu()
                        .Name("menu_#=OrderID#")
                        .Items(its =>
                        {
                            its.Add().Text("foo").Items(nested =>
                            {
                                nested.Add().Text("bar");
                                nested.Add().Text("baz");
                            });

                        })
                        .ToClientTemplate().ToHtmlString()
                    );
        })
        .Events(ev => ev.DataBound("initMenus"))
    )
```
```JavaScript
    function initMenus(e) {
        $(".templateCell").each(function(){
            eval($(this).children("script").last().html());
        });
    }
```
```CSS
    .k-widget .templateCell
    {
        overflow: visible;
    }
```
{% endif %}
{% if site.core %}
```HtmlHelper
    @(Html.Kendo().Grid<ModelType>()
        .Name("GridID")
        .Columns(columns => {
            columns.Bound(x => x.ProductID).HtmlAttributes(new { @class = "templateCell" }).ClientTemplate(
                    Html.Kendo().Menu()
                        .Name("menu_#=ProductID#")
                        .Items(its =>
                        {
                            its.Add().Text("foo").Items(nested =>
                            {
                                nested.Add().Text("bar");
                                nested.Add().Text("baz");
                            });

                        })
                        .ToClientTemplate().ToString()
                    );
        })
        .Events(ev => ev.DataBound("initMenus"))
    )
```
```TagHelper
    <kendo-grid name="GridID" on-data-bound="initMenus">
        <columns>
            <column field="ProductID"
                    html-attributes='new Dictionary<string,object> { ["class"] = "templateCell" }'
                    template="@(Html.Kendo().Menu()
                            .Name("menu_#=ProductID#")
                            .Items(its =>
                            {
                                its.Add().Text("foo").Items(nested =>
                                {
                                    nested.Add().Text("bar");
                                    nested.Add().Text("baz");
                                });

                            })
                            .ToClientTemplate().ToString())">
            </column>
        </columns>
    </kendo-grid>
```
```JavaScript
    function initMenus(e) {
        $(".templateCell").each(function(){
            eval($(this).children("script").last().html());
        });
    }
```
```CSS
    .k-widget .templateCell
    {
        overflow: visible;
    }
```
{% endif %}

## How can I change the format of bound columns?

Use the [`Format`](/api/kendo.mvc.ui.fluent/gridboundcolumnbuilder#formatsystemstring) method. the value should be a valid [`number`](https://docs.telerik.com/kendo-ui/api/javascript/kendo#standard-number-formats) or [`date`](https://docs.telerik.com/kendo-ui/api/javascript/kendo#standard-date-formats) format.

The following example demonstrates how to specify the format of a bound column.

```HtmlHelper
    columns.Bound(o => o.OrderDate).Format("{0:d}"); // Will use the short date pattern
```
{% if site.core %}
```TagHelper
    <columns>
        <column field="OrderDate" format="{0:d}">
        </column>
    </columns>
```
{% endif %}


## How can I add Kendo UI icons to custom command buttons?

A list of the available Kendo UI icons and their CSS classes is available in the [demo on styling and icons](https://demos.telerik.com/kendo-ui/styling/icons).

The following example demonstrates how to add Kendo UI icons to custom command buttons.

```HtmlHelper
    @(Html.Kendo().Grid()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Command(command => { command.Custom("myCommand").Click("myCommandClick").Text("My Text").IconClass("k-icon k-i-custom"); });
        })
    )

    <script>
        function myCommandClick() {
            console.log("custom command click event handler");
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid">
        <columns>
            <column>
                <commands>
                    <column-command name="myCommand" click="myCommandClick" text="My Text" icon-class="k-icon k-i-custom" />
                </commands>
            </column>
        </columns>
    </kendo-grid>

    <script>
        function myCommandClick() {
            console.log("custom command click event handler");
        }
    </script>
```
{% endif %}

## How can I send values to my action method when binding the Grid?

{% if site.mvc %}
If the Grid is server-bound, use the `overload` method which accepts route values.

The following example demonstrates how to send data in a server-bound Grid.

```HtmlHelper
    // Omitted for brevity.
    .DataSource(dataSource => dataSource.Server()
        .Read(read => read.Action("Read", "Home", new { userID = (int)ViewData["UserID"] }))
    )
    // Omitted for brevity.
```

{% endif %}
If the Grid is Ajax-bound, use the `Data` method to specify the name of the JavaScript function, which will return the additional data.

The following example demonstrates how to send additional data in an Ajax-bound Grid.

```HtmlHelper
    // Omitted for brevity.
    .DataSource(dataSource => dataSource.Ajax()
        .Read(read => read
            .Action("Read", "Home")
            .Data("additionalData")
        )
    )
    // Omitted for brevity.
    <script>
        function additionalData() {
            return {
                userID: 42,
                search: $("#search").val()
            };
        }
    </script>
```
{% if site.core %}
```TagHelper
    // Omitted for brevity.
    <datasource type="DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("Read","Home")" data="additionalData"/>
            </transport>
    </datasource>
    // Omitted for brevity.
    <script>
        function additionalData() {
            return {
                userID: 42,
                search: $("#search").val()
            };
        }
    </script>
```
{% endif %}

> The property names of the object that are passed as additional data must not match the property names in the `ViewModel`. Otherwise, the MVC binder will not recognize which property corresponds to the `ViewModel` and which to the additional `data` object.

## How can I reload data in Ajax-bound Grids?

Use the [`read`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#read) method of the DataSource.

The following example demonstrates how to reload an Ajax-bound Grid.

```JS
var grid = $("#Grid").data("kendoGrid");

grid.dataSource.read();
```

## How can I convert my models to view model objects?

The `ToDataSourceResult` extension method supports an optional selector, which can be used to convert the processed data to some other type.

> To flatten your data, use View Model objects, reduce the number of serialized properties, or avoid circular reference serializaton exceptions.

The following example demonstrates how to convert the processed data.

```C#
public ActionResult Read([DataSourceRequest] DataSourceRequest request)
{
    var northwind = new NorthwindDataContext();
    var orders = northwind.Orders;

    var result = orders.ToDataSourceResult(request, o => new {
        OrderID = o.OrderID,
        CustomerName = o.Customer.ContactName
    });
    return Json(result);
}
```

## How can I avoid circular reference exceptions?

The `JavaScriptSerializer` class throws an exception if the serialized object contains circular references. To avoid this, use a View Model and exclude the
properties which create the circular references.

The following example demonstrates how to avoid circular references.

```C# Model
public class Order
{
    public int OrderID { get; set; }

    // This property creates a circular reference because of the Customer class.
    // Refers to the Order class through the Orders property.
    public Customer Customer { get; set; }
}

public class Customer
{
    public string ContactName { get; set; }
    public IEnumerable<Order> Orders { get; set; }
}
```
```C# Controller
public ActionResult Read([DataSourceRequest] DataSourceRequest request)
{
    var northwind = new NorthwindDataContext();
    var orders = northwind.Orders;

    // Avoid the circular reference by creating a View Model object and skipping the Customer property.
    var result = orders.ToDataSourceResult(request, o => new {
        OrderID = o.OrderID,
        CustomerName = o.Customer.ContactName
    });
}
```

## How can I handle errors in Ajax binding mode?

Use the [`error`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#error) event of the DataSource. Apply the `Error` method from the fluent API to specify the name of the JavaScript function which will handle the event.

The following example demonstrates how to handle errors in the Ajax binding mode.

```HtmlHelper
    // Omitted for brevity.
    .DataSource(dataSource => dataSource.Ajax()
    .Events(events => events.Error("onError"))
    // Omitted for brevity.
    <script>
    function onError(e, status) {
        alert("A server error has occurred!");
    }
    </script>
```
{% if site.core %}
```TagHelper
    // Omitted for brevity.
    <datasource type="DataSourceTagHelperType.Ajax" on-error="onError">
    </datasource>
    // Omitted for brevity.
    <script>
    function onError(e, status) {
        alert("A server error has occurred!");
    }
    </script>  
```
{% endif %}


## How can I see what the server response is?

The Kendo UI Grid makes `HTTP` requests. Use the developer tools of your browser to inspect the communication between the browser and the web server. In case of a server-side exception, the `HTTP` status code is `500` and the server response contains the detailed exception stack-trace.

## How can I implement paging, sorting, filtering, and grouping?

If your model supports the `IQueryable` interface or is `DataTable`, the Grid does paging, sorting, filtering, grouping{% if site.mvc %}, and aggregates&mdash;`DataTable` binding supports only the `count` aggregate&mdash;automatically.

For server-binding scenarios, no additional steps are required. Just pass the `IQueryable` to the `Grid` constructor. For additional information on the Grid server binding, refer to [this article]({% slug serverbinding_grid_aspnetmvc %}){% endif %}.

For Ajax-binding scenarios, the `ToDataSourceResult` extension method must be used to perform the data processing. For additional information on the Grid Ajax binding, refer to [this article]({% slug htmlhelpers_grid_aspnetcore_ajaxbinding %}).

If your model does not implement `IQueryable`, implement custom binding. This means that you are responsible for the paging, sorting, filtering, and grouping of the data. For more information on the Grid custom binding, refer to [this article]({% slug custombinding_grid_aspnetmvc %}).

> All data operations are performed at database server level if the underlying `IQueryable` provider supports translation of expression trees to SQL. Kendo UI Grid for {{ site.framework }} has been tested with the following frameworks:
> - Entity Framework
> - Linq to SQL
> - Telerik OpenAccess
> - NHibernate

## How can I configure Grids to perform paging, sorting, filtering, and grouping in memory?

By default, paging, sorting, filtering and grouping initiate the making of Ajax requests. The `ToDataSourceResult` extension method processes the data source server-side. To prevent this, call the `ServerOperation` method and pass `false` as the argument.

The following example demonstrates how to perform paging, sorting, filtering, and grouping in memory.

```HtmlHelper
    // Omitted for brevity.
    .DataSource(dataSource => dataSource.Ajax()
    .ServerOperation(false)
    // Omitted for brevity.
```
{% if site.core %}
```TagHelper
    // Omitted for brevity.
    <datasource type="DataSourceTagHelperType.Ajax" server-operation="false">
    </datasource>
    // Omitted for brevity.
```
{% endif %}

## How can I prevent Ajax response caching?

Prevent the caching and browser re-use of Ajax responses in either of the following ways:
{% if site.mvc %}
* Use an `OutputCache` attribute for the action method.

    ```C#
    [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
    public JsonResult MyReadMethod()
    {
        /* ... */
    }
    ```
{% endif %}

{% if site.core %}
* Use an `ResponseCache` attribute for the action method.

    ```C#
    [ResponseCache(NoStore = true, Duration = 0)]
    public JsonResult MyReadMethod()
    {
        /* ... */
    }
    ```
{% endif %}

* Configure the Kendo UI DataSource to make `POST` instead of `GET` Ajax requests for the `Read` action.
* Use jQuery's [`ajaxSetup`](https://api.jquery.com/jquery.ajaxsetup/) configuration method. This influences all Ajax requests that the web application performs.

    ```JS
    $.ajaxSetup ({
        cache: false
    });
    ```

## How can I display model state errors?

The `ToDataSourceResult` extension method has an overload which accepts the `ModelState` as parameter. That overload serializes any model state errors in the JSON response and the `error` event of the DataSource is raised.

The following example demonstrates how to display model state errors.

```HtmlHelper
    // Omitted for brevity.
    .DataSource(dataSource => dataSource.Ajax()
    .Events(events => events.Error("onError"))
    // Omitted for brevity.
    <script>
    function onError(e, status) {
        if (e.errors) {
            var message = "The following errors have occurred:\n";

            $.each(e.errors, function(key, value) {
                if (value.errors) {
                    message += value.errors.join("\n");
                }
            });

            alert(message);
        }
    }
    </script>
```
{% if site.core %}
```TagHelper
    // Omitted for brevity.
    <datasource type="DataSourceTagHelperType.Ajax" on-error="onError">
    </datasource>
    // Omitted for brevity.
    <script>
    function onError(e, status) {
        if (e.errors) {
            var message = "The following errors have occurred:\n";

            $.each(e.errors, function(key, value) {
                if (value.errors) {
                    message += value.errors.join("\n");
                }
            });

            alert(message);
        }
    }
    </script> 
```
{% endif %}
## How can I create custom pop-up editors?

The Kendo UI Grid for {{ site.framework }} uses the `Html.EditorForModel` to create the editing form. This method relies on {{ site.framework }} editor templates. To create a custom editor template, create a partial view under the `~/Views/Shared/EditorTemplates` folder and specify it through the `UIHint` attribute.

The [Custom Object Templates](http://bradwilson.typepad.com/blog/2009/10/aspnet-mvc-2-templates-part-4-custom-object-templates.html) blog post contains a lot of information about creating a custom editor template.

{% if site.mvc %}
The [Custom Popup Editor]({% slug howto_usecustompopupeditors_gridaspnetmvc %}) code library project contains a ready-to-run project.
{% endif %}

> The `Html.EditorForModel` is used only in popup edit mode. In-cell and in-line edit modes use `Html.EditorFor` and pass the expression used to declare the bound column&mdash;for example, `Html.EditorFor(o => o.OrderDate)`.

## How can I specify default property values when new items are created?

The Kendo UI Grid uses the default `.NET` property values when creating a new object&mdash;`""` for strings, `0` for numeric types, `null` for reference types. To change this behavior, use the `Model` method of the DataSource.

The following example demonstrates how to specify default property values.

```HtmlHelper
    // Omitted for brevity.
    .DataSource(dataSource => dataSource.Ajax()
    .Model(model =>
    {
        model.Field(p => p.Name).DefaultValue("N/A");
        model.Field(p => p.Price).DefaultValue(9.99);
    })
    // Omitted for brevity.
```
{% if site.core %}
```TagHelper
    // Omitted for brevity.
    <datasource type="DataSourceTagHelperType.Ajax">
       <schema>
          <model>
              <fields>
                  <field name="Name" type="string" default-value="N/A"></field>
                  <field name="Price" type="number" default-value=9.99></field>
              </fields>
          </model>
       </schema>
    </datasource>
    // Omitted for brevity.
```
{% endif %}

## How can I create helper methods rendering predefined widgets I can further configure?

In many cases Kendo UI wants to avoid setting similar settings to all the places where a widget is used. Instead of defining the same settings all over again, create a helper method that wraps a Kendo UI widget which is already configured.

First, create such an extension method in a static class.

The following example demonstrates how to create a custom helper that wraps the Grid configurator.

```C#
    public static class Extensions
    {
        public static GridBuilder<T> MyGrid<T>(this HtmlHelper helper)
                where T: class
                    {
                        return helper.Kendo().Grid<T>()
                                        .Scrollable();
                    }
    }
```
```HtmlHelper

    @using TheNamespaceOfTheExtensionsClass

    @(Html.MyGrid.Name("foo")) // The Grid is already configured to be Scrollable
```

> If you want to avoid adding the `using` statement in each view that uses this  component, add a namespace reference to the `Web.config` file inside the `Views` folder of your project.

## How can I mark certain properties as read-only?

By default, all properties are read-only. Decorate the read-only properties with the [`ReadOnly`](https://msdn.microsoft.com/en-us/library/system.componentmodel.readonlyattribute.aspx) data annotation attribute or use the `Editable` configuration method.

The following example demonstrates the Read-only property through the `ReadOnly` attribute.

```C#
public class Order
{
    [ReadOnly(true)]
    public int OrderID { get; set; }
}
```

The following example demonstrates the Read-only property through the `Editable` method.

```HtmlHelper
    // Omitted for brevity.
    .DataSource(dataSource => dataSource.Ajax()
        .Model(model =>
        {
            model.Field(o => o.OrderID).Editable(false);
        })
    // Omitted for brevity.
```
{% if site.core %}
```TagHelper
    // Omitted for brevity.
    <datasource type="DataSourceTagHelperType.Ajax">
       <schema>
          <model>
              <fields>
                  <field name="OrderID" type="number" editable="false"></field>
              </fields>
          </model>
       </schema>
    </datasource>
    // Omitted for brevity.
```
{% endif %}

> The `ReadOnly` and `Editable` settings work only in in-line and in-cell editing modes. Use a custom popup editor if you want to exclude certain properties from the editor form.

## How can I use Kendo UI widgets as editors for dates and numbers?

Use custom editor templates. {{ site.framework }} looks for a partial view, named after the type&mdash;for example, `DateTime.cshtml`. Telerik UI for {{ site.framework }} ships with a few ready-to-use editor templates. They are located in the `\wrappers\aspnetmvc\EditorTemplates` folder. The editor templates are available in two flavors&mdash;the `ascx` folder contains the `WebForms` view engine version, whereas the `razor` folder contains the `Razor` view engine version. To use these editor templates in your application, copy all files from the corresponding folder (`ascx` or `razor`) to `~/Views/Shared/EditorTemplates` (you may need to create this folder if it does not exist yet).

To validate a date by using the Kendo UI DateTimePicker:

1. Add a new partial view to the `~/Views/Shared/EditorTemplates` folder&mdash;for example, `KendoDateEditor.ascx` or `KendoDateEditor.cshtml` (if you are using the Razor view engine).
1. Add a Kendo UI DropDownList to that partial view.

    ```HtmlHelper
        @(Html.Kendo().DateTimePicker()
            .Value(DateTime.Now)
            .DateInput()
        )
    ```
    {% if site.core %}
    ```TagHelper
       <kendo-datetimepicker value="DateTime.Now" date-input="true">
       </kendo-datetimepicker> 
    ```
    {% endif %}

1. Decorate the `Date` property in the model by using the [`UIHint`](https://msdn.microsoft.com/en-us/library/cc679268) attribute.

    ```C#
    public class Order
    {
        public int OrderID { get; set; }

        public string ShipCountry { get; set; }

        [UIHint("KendoDateEditor")]
        public Date OrderDate { get; set; }
    }
    ```

To validate a number by using the Kendo UI NumericTextBox:

1. Add a new partial view to the `~/Views/Shared/EditorTemplates` folder&mdash;for example, `KendoNumberEditor.ascx` or `KendoNumberEditor.cshtml` (if you are using the Razor view engine).
1. Add a Kendo UI DropDownList to that partial view.

    ```HtmlHelper
        @(Html.Kendo().NumericTextBox()
            .Round(false)
            .Spinners(false)
        )
    ```
    {% if site.core %}
    ```TagHelper
       <kendo-numerictextbox round="true" spinners="false">
       </kendo-numerictextbox>
    ```
    {% endif %}

1. Decorate the `number` property in the model by using the [`UIHint`](https://msdn.microsoft.com/en-us/library/cc679268) attribute.

    ```C#
    public class Order
    {
        public int OrderID { get; set; }

        public string ShipCountry { get; set; }

        [UIHint("KendoNumberEditor")]
        public decimal Price { get; set; }
    }
    ```

## How can I distinguish between Add and Edit mode?

To distinguish between the insert and update modes, you can use the `isNew` method in combination with the edit event handler of the grid:
[Grid Edit Event](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-edit)

Here is a basic sample for reference:

```HtmlHelper
    // Omitted for brevity.
   .Events(events => events.Edit("onEdit"))
```
{% if site.core %}
```TagHelper
    <kendo-grid on-edit="onEdit">
        // Omitted for brevity.
    </kendo-grid>
```
{% endif %}
```js
function onEdit(args) {
    if (args.model.isNew() == false) {
            // textbox
            $("#ShipName").attr("readonly", true);
             
            // dropdownlist
            var kendoDdl = $("#ShipCountry").data("kendoDropDownList");
            kendoDdl.readonly(true);
    }
}
```

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Basic Usage of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid)
{% if site.core %}
* [Basic Usage of the Grid TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/grid/tag-helper)
{% endif %}
* [Using the API of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/api)
* [Server-Side API](/api/grid)
