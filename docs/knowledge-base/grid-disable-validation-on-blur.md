---
title: Disable Validation on Blur  
description: Learn how to disable the validation on blur  of the Kendo UI Grid.
type: how-to
page_title: Disable Validation on Blur - Kendo UI for jQuery Data Grid
slug: grid-disable-validation-on-blur
tags: grid, disable, validation, on, blur, onblur, remove
res_type: kb
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

How can I disable the validation on blur within a Kendo Grid?

## Solution

Remove the set event handler of the currently edited model within the [edit event](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/edit) handler.

```dojo
    <div id="example">
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
              { field: "Discontinued", width: "120px" },
              { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
            editable: "popup",
            edit:function(e){
              delete e.model._events.set;
            }
          });
        });
      </script>
    </div>
```
