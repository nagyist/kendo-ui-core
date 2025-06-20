---
title: Change the Background of the MultiSelect Tag from a Tooltip with a ColorPalette
page_title: Change the Tag Background from a Tooltip with ColorPalette - Kendo UI MultiSelect for jQuery
description: Learn how to change the tag background of the Kendo UI for jQuery MultiSelect by using a Tooltip with a ColorPalette component.
type: how-to
slug: change-multiselect-tag-background
tags: multiselect, tag, change, background, tooltip, colorpalette
res_type: kb
component: multi-select
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® MultiSelect for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>86.0.4240.111 (Official Build) (64-bit)</td>
 </tr>
</table>

## Description

How can I change the background of the tags in the MultiSelect by picking a color from ColorPalette which is inside a Tooltip?

## Solution

```dojo
<div id="container">
    <select id="products"></select>
</div>
<script>
    $(document).ready(function() {
    $("#products").kendoMultiSelect({
        placeholder: "Select products...",
        dataTextField: "ProductName",
        dataValueField: "ProductID",
        autoBind: false,
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

    $("#container").kendoTooltip({
        filter: "li",
        content: "<div id='color-chooser'></div>",
        width:200,
        show:function(e){
        var sender = e.sender;
        var target = e.sender.target();
        var colorPalette = $("#color-chooser").data("kendoColorPalette");
        if(colorPalette !=undefined){
            colorPalette.destroy();
            $("#color-chooser").empty();
        }
        $("#color-chooser").kendoColorPalette({
            palette: [ "#ddd1c3", "#d2d2d2", "#746153", "#3a4c8b", "#ffcc33", "#fb455f", "#ac120f" ],
            tileSize: 30,
            change: function() {
            var colorId = this.value();
            $(target[0]).css('background', colorId);
            sender.hide();
            }
        });
        }
    });
    });
</script>
```
