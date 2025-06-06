---
title: Popup
page_title: Popup
description: "Define commands and set the edit mode to configure the Telerik UI Grid component for {{ site.framework }} for popup editing."
slug: popupediting_grid_aspnetcore
position: 3
---

# Popup Editing

You can define commands and set the edit mode to configure the Telerik UI Grid for {{ site.framework }} for popup editing.

For runnable examples, refer to the [demos on implementing the editing approaches in the Grid](https://demos.telerik.com/{{ site.platform }}/grid/editing).

## Setting the Popup Edit Mode

1. Add a new class to the `~/Models` folder. The following example uses the `OrderViewModel` name.

    ```C#
        public class OrderViewModel
        {
            // The example will use this as a unique model Id.
            public int OrderID { get; set; }

            public string ShipCountry { get; set; }

            public int Freight { get; set; }
        }
    ```

1. Add an empty MVC Controller `GridController.cs` and add a new action method `ReadOrders` which will return the **Orders** as JSON in the expected format. The Grid will make Ajax requests to this action.

    ```C#
        using AspNetCoreGrid.Models;
        using Kendo.Mvc.Extensions; // You need this to be able to use the ToDataSourceResult() method for processing the request.
        using Kendo.Mvc.UI; // You need this to be able to use the DataSourceRequest class and attribute to parse the request.

        public class GridController : Controller
        {
            // The example will add some dummy data but you can use a data base Select() if you like.
            public static List<OrderViewModel> orders = Enumerable.Range(1, 10).Select(i => new OrderViewModel
            {
                OrderID = i,
                ShipCountry = i % 2 == 0 ? "ShipCountry 1" : "ShipCountry 2",
                Freight = i * 10
            }).ToList();

            public ActionResult ReadOrders([DataSourceRequest]DataSourceRequest request)
            {
                return Json(orders.ToDataSourceResult(request));
            }
        }
    ```

1. Add a new action method to `GridController.cs`. It will be responsible for saving the new data items. Name the method `CreateOrders`.  The `Create` method has to return a collection of the created records with the assigned Id field.

    ```C#
        public ActionResult CreateOrders([DataSourceRequest]DataSourceRequest request, OrderViewModel order)
        {
            if (ModelState.IsValid)
            {
                // Add a model Id so that the dataSource will treat this item as existing next time.
                order.OrderID = orders.Count + 1;

                // Save the item in the data base.
                orders.Add(order);
            }

            // Return a collection which contains only the newly created item and any validation errors.
            return Json(new[] { order }.ToDataSourceResult(request, ModelState));
        }
    ```

1. Add a new action method to `GridController.cs`. It will be responsible for saving the updated data items. Name the method `UpdateOrders`.

    ```C#
        public ActionResult UpdateOrders([DataSourceRequest]DataSourceRequest request, OrderViewModel order)
        {
            if (ModelState.IsValid)
            {
                // Save the item in the data base or follow with the dummy data.
                for (int i = 0; i < orders.Count; i++)
                {
                    // The example uses the model Id to identify the model that needs to be updated.
                    if(orders[i].OrderID == order.OrderID)
                    {
                        orders[i] = order;
                        break;
                    }
                }
            }

            // Return a collection which contains only the updated item and any validation errors.
            return Json(new[] { order }.ToDataSourceResult(request, ModelState));
        }
    ```

1. Add a new action method to `GridController.cs`. It will be responsible for saving the deleted data items. Name the method `DestroyOrders`.

    ```C#
        public ActionResult DestroyOrders([DataSourceRequest]DataSourceRequest request, OrderViewModel order)
        {
            // Delete the item in the data base or follow with the dummy data.
            orders.Remove(order);

            // Return a collection which contains only the destroyed item.
            return Json(new[] { order }.ToDataSourceResult(request));
        }
    ```

1. In the view, configure the Grid to use the action methods created in the previous steps. The `Create`, `Update`, and `Destroy` action methods have to return a collection with the modified or deleted records so the DataSource on the client is aware of the server-side changes.

    ```HtmlHelper
        @(Html.Kendo().Grid<AspNetCoreGrid.Models.OrderViewModel>()
            .Name("grid")
            .ToolBar(tools=>
            {
                tools.Create();
            })
            .Columns(columns =>
            {
                columns.Bound(f => f.OrderID);
                columns.Bound(f => f.ShipCountry);
                columns.Bound(f => f.Freight);
                columns.Command(command => {
                    command.Edit();
                    command.Destroy();
                });
            })
            .Editable(editable => editable.Mode(GridEditMode.PopUp))
            .DataSource(d =>
            {
                d.Ajax()
                .Model(model =>
                {
                    model.Id(product => product.OrderID); // Specify the property which is the unique identifier of the model.
                    model.Field(product => product.OrderID).Editable(false); // Make the OrderID property not editable.
                })
                .Create(create => create.Action("CreateOrders", "Grid")) // Action invoked when the user saves a new data item.
                .Read(read => read.Action("ReadOrders", "Grid"))  // Action invoked when the Grid needs data.
                .Update(update => update.Action("UpdateOrders", "Grid"))  // Action invoked when the user saves an updated data item.
                .Destroy(destroy => destroy.Action("DestroyOrders", "Grid")); // Action invoked when the user removes a data item.
            })
        )
    ```
    {% if site.core %}
    ```TagHelper
    <kendo-grid name="grid" height="430">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
            <schema data="Data" total="Total">
                <model id="OrderID">
                    <fields>
                        <field name="OrderID" type="number" editable="false"></field>
                    </fields>
                </model>
            </schema>
            <transport>
                <read url= "@Url.Action("ReadOrders", "Grid")" />
                <update url="@Url.Action("UpdateOrders", "Grid")" />
                <create url="@Url.Action("CreateOrders", "Grid")" />
                <destroy url="@Url.Action("DestroyOrders", "Grid")" />
            </transport>
        </datasource>
        <columns>
            <column field="OrderID" />
            <column field="ShipCountry"  />
            <column field="Freight"  />
            <column>
                <commands>
                    <column-command text="Edit" name="edit"></column-command>
                    <column-command text="Delete" name="destroy"></column-command>
                </commands>
            </column>
        </columns>
        <toolbar>
            <toolbar-button name="create"></toolbar-button>
        </toolbar>
        <editable mode="popup" />
    </kendo-grid>
    ```
    {% endif %}

## Handling ModelState Errors

When editing is performed, server validation is often needed. This section demonstrates how to use the `AddModelError` method with the Telerik UI Grid for {{ site.framework }}.

1. Perform all steps from the previous section.
1. Add some validation code to the `UpdateOrders` method. For example, check the length of the `ShipCountry` property.

    ```C#
         public ActionResult UpdateOrders([DataSourceRequest]DataSourceRequest request, OrderViewModel order)
        {
            if (order.ShipCountry.Length < 3)
            {
                ModelState.AddModelError("ShipCountry", "ShipCountry should be at least three characters long.");
            }

            if (ModelState.IsValid)
            {
                // Save the item in the data base or follow with the dummy data.
                for (int i = 0; i < orders.Count; i++)
                {
                    // The example uses the model Id to identify the model that needs to be updated.
                    if(orders[i].OrderID == order.OrderID)
                    {
                        orders[i] = order;
                        break;
                    }
                }
            }

            // Return a collection which contains only the updated item and the ModelState which holds the custom error.
            return Json(new[] { order }.ToDataSourceResult(request, ModelState));
        }
    ```

1. Subscribe to the [`DataSource.Error()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/datasourceeventbuilder#errorsystemstring) event handler. It is fired when model state errors or other unexpected problem occur when making the Ajax request. To prevent the popup from closing, get the Grid instance in the error event handler, prevent the Grid from `DataBinding`, and display the errors as a tooltip.

    ```HtmlHelper
        .DataSource(d =>
        {
            d.Ajax()
            .Model(model =>
            {
                model.Id(product => product.OrderID);
                model.Field(product => product.OrderID).Editable(false);
            })
            .Create(create => create.Action("CreateOrders", "Grid"))
            .Read(read => read.Action("ReadOrders", "Grid"))
            .Update(update => update.Action("UpdateOrders", "Grid"))
            .Destroy(destroy => destroy.Action("DestroyOrders", "Grid"))
            .Events(events => events.Error("onError")); // Add the error handler to the DataSource.
        })
    ```
    {% if site.core %}
    ```TagHelper
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20"
                    on-error="onError"> // Add the error handler to the DataSource.
            <schema data="Data" total="Total">
                <model id="OrderID">
                    <fields>
                        <field name="OrderID" type="number" editable="false"></field>
                    </fields>
                </model>
            </schema>
            <transport>
                <read url="@Url.Action("ReadOrders", "Grid")" />
                <update url="@Url.Action("UpdateOrders", "Grid")" />
                <create url="@Url.Action("CreateOrders", "Grid")" />
                <destroy url="@Url.Action("DestroyOrders", "Grid")" />
            </transport>
        </datasource>
    ```
    {% endif%}
    ```JS script
    <script>
        function onError(args) {
            var errors = args.errors;
            if (errors) {
                var grid = $("#grid").data("kendoGrid");
                    grid.one("dataBinding", function (e) {
                        e.preventDefault();
                        $.each(errors, function (key, value) {
                            var message = "";
                            if ('errors' in value) {
                                $.each(value.errors, function() {
                                    message += this + "\n";
                                });
                            }

                            // As long as the key matches the field name, this line of code will be displayed as validation message in the popup.
                            grid.editable.element.find("[data-valmsg-for='" + key + "']").replaceWith('<div class="k-widget k-tooltip k-tooltip-error" style="margin:0.5em"><span class="k-icon k-i-exclamation-circle"> </span>' + message + '<div class="k-callout k-callout-n"></div></div>').show();
                    });
                });
            }
        }
    </script>
    ```

{% if site.core %}
## Using DateOnly and TimeOnly properties with .NET 6

`DateOnly` and `TimeOnly` types were introduced with .NET 6, however serialization and model binding support were introduced by the framework at a later stage.

In order to edit `DateOnly` or `TimeOnly` properties when using a Grid configured for PopUp editing in a .NET 6 application you will need to provide a custom PopUp editor template where editors for these properties are defined:
```C# OrderViewModel.cs
    public class OrderViewModel
    {
        public int OrderID { get; set; }

        public DateOnly ShipDate { get; set; }
    }
```
```Razor CustomEditorTemplate.cshtml
    @model OrderViewModel

    <div>
        @Html.LabelFor(model => model.OrderID)
        @Html.EditorFor(model => model.OrderID)
    </div>
    <div>
        @Html.LabelFor(model => model.ShipDate)
        @Html.Kendo().DatePickerFor(model => model.ShipDate)
    </div>
```
```HtmlHelper
    @(Html.Kendo().Grid<AspNetCoreGrid.Models.OrderViewModel>()
        .Name("grid")
        .Editable(editable => editable.Mode(GridEditMode.PopUp).TemplateName("CustomEditorTemplate"))
    )
```
{% endif%}

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Editing Approaches by the Grid HtmlHelper for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/grid/editing)
* [Server-Side API](/api/grid)
