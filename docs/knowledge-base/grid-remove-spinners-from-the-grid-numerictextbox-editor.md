---
title: Remove Up and Down Arrows from the Grid NumericTextBox Editors
description: Learn how to remove the Up Arrow and Down Arrow from the Kendo UI Grid editor.
type: how-to
page_title: Remove Spinners from the NumericTextbox Editor - Kendo UI for jQuery Data Grid
slug: grid-remove-spinners-from-the-grid-numerictextbox-editor
tags: grid, numerictextbox, spinners
ticketid: 1142901
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr> <tr>
  <td>Product Version</td>
  <td>2020.3.1021</td>
 </tr>
</table>


## Description

How can I remove the spinners of the NumericTextBoxes which are used as default Grid editors?

## Solution

Set a custom editor for the numeric columns by using the [`column.editor`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.editor) property of the Grid.

````dojo
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
                      Discontinued: { type: "boolean" }
                    }
                  }
                }
              });

          $("#grid").kendoGrid({
            dataSource: dataSource,
            navigatable: true,
            pageable: true,
            height: 550,
            toolbar: ["create", "save", "cancel"],
            columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120,editor: editNumber },
              { field: "Discontinued", width: 120 },
              { command: "destroy", title: "&nbsp;", width: 150 }],
            editable: true
          });
        });

        function editNumber(container, options) {
          $('<input data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoNumericTextBox({
            spinners : false
          });
        }
      </script>
    </div>
````

## See Also

* [Remove Spinners from NumericTextBox Editors in Kendo UI Grid for ASP.NET MVC](/knowledge-base/grid-mvc-remove-spinner-numerictextbox-editor)
