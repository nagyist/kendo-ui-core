---
title: Resizing
page_title: Resizing of Columns
description: "The Telerik UI Grid component for {{ site.framework }} comes with a handy Column Resize feature. This allows application users to modify the width of columns and to focus on the content that they need."
slug: column_resizing_aspnetcore_grid
position: 7
---

# Resizing of Columns

The resizing behavior of the Grid columns depends on whether scrolling is enabled or disabled.

For a runnable example, refer to the [demo on resizing columns in the Grid](https://demos.telerik.com/{{ site.platform }}/grid/column-resizing).

When scrolling is disabled and a Grid column is resized, other columns change widths too, including the ones with `Resizable` configuration options set to `false`, so that the sum of all column widths remains constant. If both the columns and the Grid `<div>` already have their minimum possible widths applied, then the resizing of the columns stops working. In such scenarios, use either of the following approaches:
* Apply a larger width to the Grid, or
* Enable scrolling.

When scrolling is enabled and a column is resized, all other columns maintain their widths. When column resizing is applied, the following outcomes with regard to the sum of all column widths are possible:
* If the sum of all column widths is greater than the width of the Grid, a horizontal scrollbar appears.
* If the sum of all column widths is equal to the width of the Grid, no horizontal scrollbar appears.
* If the sum of all column widths is less than the width of the Grid, an empty space after the last column appears.

The `2024 Q2` release introduces a `Resizable` configuration option that allows you to disable resizing for specific columns. 

The example below demonstrates how to disable resizing for the `ShipCity` column:

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("grid")
        .Scrollable()
        .Resizable(resize => resize.Columns(true))    
        .Columns(columns =>
        {
            columns.Bound(o => o.OrderDate).Width(110).Format("{0:MM/dd/yyyy}");
            columns.Bound(o => o.ShipCountry).Width(110).MinResizableWidth(100);
            columns.Bound(o => o.ShipCity).Resizable(false).Width(110);
            columns.Bound(o => o.ShipName).Width(200);
            columns.Bound(o => o.ShipAddress).Format("{0:MM/dd/yyyy}");
            columns.Bound(o => o.OrderID).Width(60);
        })
    )

```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid" resizable="true">
        <scrollable enabled="true"/>
        <columns>
            <column field="OrderDate" width="110" format="{0:MM/dd/yyyy}"/>
            <column field="ShipCountry" width="110" min-resizable-width="100"/>
            <column field="ShipCity" resizable="false" width="110"/>
            <column field="ShipName" width="200"/>
            <column field="ShipAddress"/>
            <column field="OrderID" width="60"/>
        </columns>
    </kendo-grid>
```
{% endif %}

By design, the last column of the Grid has no right border, so that no double border appears at the right end of the Grid if the Grid table width matches the Grid width. If needed, you can apply a right border with the CSS code from the following example. The color value of the `#ccc` border has to match the color of the cell border from the Kendo UI theme. To obtain this, check the styles of the table cell by using a DOM inspector.

```CSS
.k-grid-header-wrap > table,
.k-grid-content > table {
    border-right: 1px solid #ccc;
}
```

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Column Resizing by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/column-resizing)
* [Server-Side API](/api/grid)
