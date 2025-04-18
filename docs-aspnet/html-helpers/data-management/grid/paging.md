---
title: Paging
page_title: Paging
description: "Learn how to enable the paging functionality of the Telerik UI Grid for {{ site.framework }}."
slug: htmlhelpers_grid_aspnetcore_paging
position: 8
---

# Paging

By default, the paging functionality of the Telerik UI Grid for {{ site.framework }} is disabled.

For a runnable example, refer to the [demo on paging by the Grid](https://demos.telerik.com/{{ site.platform }}/grid/paging).

To control the paging in the Grid, use the `Pageable` option. Additionally, you have to specify the number of records to display on each page by setting the `PageSize` on the DataSource.

```HtmlHelper
	@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
		  .Name("Grid")  
          ...		  
		  .Pageable()
		  .DataSource(dataSource => dataSource
			    .Ajax()
				.PageSize(15)
				...
		  )
	)
```
{% if site.core %}
```TagHelper
   <kendo-grid name="Grid">
        <pageable enabled="true" />
        <datasource type="DataSourceTagHelperType.Ajax" page-size="15">
        </datasource>
   </kendo-grid>
```
{% endif %}

Try to do paging operations on the server to avoid including too much data in the HTML which might slow down page performance. To accomplish this, keep the `ServerOperation` of the DataSource to `true` (the default value).

You can change the available page sizes from which the user can choose with an array with integer values that are set to the `PageSizes` property.

```HtmlHelper
    .Pageable(p=> {
        p.PageSizes(new[] { 5, 10, 30 });
    })
```
{% if site.core %}
```TagHelper
   <pageable page-sizes="new int[] { 5, 10, 30}">
   </pageable>
```
{% endif %}

Use as small page sizes as possible, because rendering too many records causes performance issues especially when the Grid renders many columns or complex templates for its cells.	

* The `ButtonCount` method specifies the number of numeric buttons that should be displayed in the pager. By default, the number of displayed buttons is 10.

    ```HtmlHelper
        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
            .Name("grid")
            .Pageable(pager => pager.ButtonCount(15))
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-grid name="grid">
            <pageable button-count="15">
            </pageable>
            <datasource type="DataSourceTagHelperType.Ajax">
                 <transport>
                    <read url="@Url.Action("Products_Read","Home")"/>
                </transport>
            </datasource>
        </kendo-grid>
    ```
    {% endif %}

* The `Enabled` method enables or disables paging. Use it when paging based on a condition should be enabled.

    ```HtmlHelper
        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
            .Name("grid")
            .Pageable(pager => pager.Enabled((bool)ViewData["EnablePager"]))
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-grid name="grid">
            <pageable enabled="@((bool)ViewData["EnablePager"])">
            </pageable>
            <datasource type="DataSourceTagHelperType.Ajax">
                 <transport>
                    <read url="@Url.Action("Products_Read","Home")"/>
                </transport>
            </datasource>
        </kendo-grid>
    ```
    {% endif %}

* The `Info` method specifies whether to show additional paging info. By default, the pager displays the total number of items in the Grid and the first and last item number&mdash;for example, `"1-50 of 50 items"`. If the Grid is empty, the pager would show `"No items to display"`. The paging info is displayed by default.

    ```HtmlHelper
        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
            .Name("grid")
            .Pageable(pager => pager.Info(false))
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-grid name="grid">
            <pageable info="false">
            </pageable>
            <datasource type="DataSourceTagHelperType.Ajax">
                 <transport>
                    <read url="@Url.Action("Products_Read","Home")"/>
                </transport>
            </datasource>
        </kendo-grid>
    ```
    {% endif %}

* The `Input` method specifies whether to show a textbox for typing in a page number. By default, such a textbox is not shown.

    ```HtmlHelper
        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
            .Name("grid")
            .Pageable(pager => pager.Input(true))
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-grid name="grid">
            <pageable input="true">
            </pageable>
            <datasource type="DataSourceTagHelperType.Ajax">
                 <transport>
                    <read url="@Url.Action("Products_Read","Home")"/>
                </transport>
            </datasource>
        </kendo-grid>
    ```
    {% endif %}

* The `Numeric` method sets the numeric pager. When enabled the pager will display numeric pager buttons. Numeric paging is enabled by default.

    ```HtmlHelper
        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
            .Name("grid")
            .Pageable(pager => pager
                .Numeric(false)
            )
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )
    ```
     {% if site.core %}
     ```TagHelper
         <kendo-grid name="grid">
             <pageable numeric="false">
             </pageable>
             <datasource type="DataSourceTagHelperType.Ajax">
                  <transport>
                     <read url="@Url.Action("Products_Read","Home")"/>
                 </transport>
             </datasource>
         </kendo-grid>
     ```
    {% endif %}    

* The `PreviousNext` method enables or disables the `previous/next/first/last` pager buttons. These buttons navigate to the corresponding page when clicked. By default, the method is enabled.

    ```HtmlHelper
        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
            .Name("grid")
            .Pageable(pager => pager
                .PreviousNext(false)
            )
            .DataSource(dataSource => dataSource
                .Ajax() 
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
         <kendo-grid name="grid">
             <pageable previous-next="false">
             </pageable>
             <datasource type="DataSourceTagHelperType.Ajax">
                  <transport>
                     <read url="@Url.Action("Products_Read","Home")"/>
                 </transport>
             </datasource>
         </kendo-grid>
    ```
    {% endif %} 

* The `Refresh` method enables or disables the `refresh` pager button. Clicking that button reloads the current page. By default, the method is disabled.

    ```HtmlHelper
        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
            .Name("grid")
            .Pageable(pager => pager
                .Refresh(true)
            )
            .DataSource(dataSource => dataSource
                .Ajax() 
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
         <kendo-grid name="grid">
             <pageable refresh="true">
             </pageable>
             <datasource type="DataSourceTagHelperType.Ajax">
                  <transport>
                     <read url="@Url.Action("Products_Read","Home")"/>
                 </transport>
             </datasource>
         </kendo-grid>
    ```
    {% endif %} 

You can change the position of the Pager in the Grid. The available options for the positions are `top` and `bottom`.

```JavaScript
    <input type="checkbox" id="btnPagerPosition" />

    $("#btnPagerPosition").change(function () {
         var position = this.checked ? "top" : "bottom";
         $("#grid").data("kendoGrid").setOptions({
             pageable: {
                 position: position
             }
         });
    });
```

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Paging by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/aggregates)
* [Pager Functionality in the Grid HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/grid/pager-functionality)
* [Server-Side API](/api/grid)
