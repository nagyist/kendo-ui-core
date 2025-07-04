---
title: Open the Popup Editor on Double Click of a Grid Row
description: Learn how to open the popup editor of a Kendo UI Grid by double-clicking a row.
type: how-to
page_title: Open the Popup Editor on Double Click of a Row - Kendo UI for jQuery Data Grid
slug: grid-open-edit-popup-on-double-click-of-row
tags: grid, editor, popup, double, click, row, on, of, open,edit
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with version 2020.3.1021</td>
 </tr>
</table>

## Description

How can I open the popup editor when I double-click a Grid row?

## Solution

1. Within the [`databound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) event handler, attach a handler to the double-click event of the `tr` element.
1. When the double-click event of the row is fired, edit the clicked row by using the [`editRow`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/editrow) method.

```dojo

      <div id="grid"></div>

      <script>
        $(document).ready(function () {
          var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
              dataSource = new kendo.data.DataSource({
                transport: {
                        read:  {
                            url: crudServiceBaseUrl + "/Products"
                        },
                        update: {
                            url: crudServiceBaseUrl + "/Products/Update",
                            type: "POST",
                    		contentType: "application/json"
                        },
                        destroy: {
                            url: crudServiceBaseUrl + "/Products/Destroy",
                            type: "POST",
                    		contentType: "application/json"
                        },
                        create: {
                            url: crudServiceBaseUrl + "/Products/Create",
                            type: "POST",
                    		contentType: "application/json"
                        },
                  parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                      return kendo.stringify(options.models);
                    }
                  }
                },
                batch: true,
                pageSize: 20,
                schema: {
                  model: {
                    id: "ProductID",
                    fields: {
                      ProductID: { editable: false, nullable: true },
                      ProductName: { validation: { required: true } },
                      UnitPrice: { type: "number", validation: { required: true, min: 1} },
                      Discontinued: { type: "boolean" },
                      UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                    }
                  }
                }
              });

          $("#grid").kendoGrid({                      
            dataSource: dataSource,
            pageable: true,
            height: 550,
            toolbar: ["create"],
            columns: [
              { field:"ProductName", title: "Product Name" },
              { field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "120px" },
              { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
              { field: "Discontinued", width: "120px" }],
            editable: "popup",
            dataBound: onDataBound
          });
        });

        function onDataBound() {
          var grid = this;

          grid.element.off('dblclick');
          
          grid.element.on('dblclick','tbody tr[data-uid]',function (e) {
            grid.editRow($(e.target).closest('tr'));
          })
        }
      </script>
    </div>

    <style>
      tbody tr:hover{
        cursor: pointer
      }
    </style>
```
