---
title:  Model Binding
page_title: Model Binding
description: "Learn how to implement model binding with Telerik UI MultiSelect component for {{ site.framework }}."
previous_url: /helpers/editors/multiselect/binding/model-binding
slug: htmlhelpers_multiselect_modelbinding_aspnetcore
position: 6
---

# Model Binding

You can implement model binding in the MultiSelect with both [local data](#local-data) and [remote data](#remote-data).

{% if site.core %}
> The [`Value()`](/api/kendo.mvc.ui.fluent/multiselectbuilder#valuesystemcollectionsienumerable) setting takes precedence over the values of the [`Selected`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.rendering.selectlistitem.selected?view=aspnetcore-9.0#microsoft-aspnetcore-mvc-rendering-selectlistitem-selected) property in cases where a [`SelectListItem`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.rendering.selectlistitem?view=aspnetcore-9.0) is:
> * Passed as a collection through the [`BindTo()`](/api/kendo.mvc.ui.fluent/multiselectbuilder#bindtosystemcollectionsienumerable) configuration method.
> * Has the value set either from the TagHelper `for` attribute, `MultiSelectFor` HtmlHelper, or the [`Value()`](/api/kendo.mvc.ui.fluent/multiselectbuilder#valuesystemcollectionsienumerable) configuration method. 
{% else %}
> The [`Value()`](/api/kendo.mvc.ui.fluent/multiselectbuilder#valuesystemcollectionsienumerable) setting takes precedence over the values of the [`Selected`](https://learn.microsoft.com/en-us/dotnet/api/system.web.mvc.selectlistitem.selected?view=aspnet-mvc-5.2#system-web-mvc-selectlistitem-selected) property in cases where a [`SelectListItem`](https://learn.microsoft.com/en-us/dotnet/api/system.web.mvc.selectlistitem?view=aspnet-mvc-5.2) is:
> * Passed as a collection through the [`BindTo()`](/api/kendo.mvc.ui.fluent/multiselectbuilder#bindtosystemcollectionsienumerable) configuration method.
> * Has the value set either from the `MultiSelectFor` HtmlHelper or the [`Value()`](/api/kendo.mvc.ui.fluent/multiselectbuilder#valuesystemcollectionsienumerable) configuration method. 
{% endif %} 

## Local Data

Local data is the data that is available on the client when the MultiSelect is initialized.

1. Pass the data to the view through the view model.

        public ActionResult Index()
        {
            return View(new ProductViewModel
            {
                Orders = GetOrders(),
                SelectedOrders = new int[] { 1, 3 }
            });
        }

        private static List<Order> GetOrders()
        {
            var orders = Enumerable.Range(0, 2000).Select(i => new Order
            {
                OrderID = i,
                OrderName = "OrderName" + i
            });

            return orders.ToList();
        }


1. Add the MultiSelect to the view and bind it to a property of the view model.

    ```HtmlHelper
        @model Application1.Models.ProductViewModel

        @(Html.Kendo().MultiSelectFor(m => m.SelectedOrders)
            .DataValueField("OrderID")
            .DataTextField("OrderName")
            .BindTo(Model.Orders)
        )
    ```
    {% if site.core %}
    ```TagHelper
        @model Application1.Models.ProductViewModel

        <kendo-multiselect for="SelectedOrders"
                           datavaluefield="OrderID"
                           datatextfield="OrderName"
                           bind-to="Model.Orders">
        </kendo-multiselect>
    ```
    {% endif %}

## Remote Data

You can configure the MultiSelect to get its data from a remote source by making an AJAX request.

1. Create an action that returns the data as a JSON result.

        public ActionResult Index()
        {
            return View(new ProductViewModel
            {
                SelectedOrders = new int[] { 1, 3 }
            });
        }
        {% if site.mvc %}
        public JsonResult GetOrdersAjax()
        {
            var orders = Enumerable.Range(0, 2000).Select(i => new Order
            {
                OrderID = i,
                OrderName = "OrderName" + i
            });

            return Json(orders.ToList(), JsonRequestBehavior.AllowGet);
        }
        {% else %}
        public JsonResult GetOrdersAjax()
        {
            var orders = Enumerable.Range(0, 2000).Select(i => new Order
            {
                OrderID = i,
                OrderName = "OrderName" + i
            });

            return Json(orders.ToList());
        }
        {% endif %}


1. Add the MultiSelect to the view and configure its DataSource to use remote data.

    ```HtmlHelper
        @model Application1.Models.ProductViewModel

        @(Html.Kendo().MultiSelectFor(m => m.SelectedOrders)
            .Filter(FilterType.Contains)
            .DataValueField("OrderID")
            .DataTextField("OrderName")
            .DataSource(source =>
            {
                source.Read(read =>
                {
                    read.Action("GetOrdersAjax", "Home");
                })
                .ServerFiltering(false);
            })
        )
    ```
    {% if site.core %}
    ```TagHelper
        @model Application1.Models.ProductViewModel

        <kendo-multiselect for="SelectedOrders"
                           filter="FilterType.Contains"
                           datavaluefield="OrderID"
                           datatextfield="OrderName">
            <datasource type="DataSourceTagHelperType.Custom" server-filtering="false">
                <transport>
                     <read url="@Url.Action("GetOrdersAjax", "Home")" />
                </transport>
            </datasource>
        </kendo-multiselect>
    ```
    {% endif %}

## See Also

* [Server-Side API](/api/multiselect)
