---
title: Use MVVM Binding for Data Editing in the Window
page_title: Use MVVM Binding for Data Editing in the Window
description: "Learn how to edit data in a Kendo UI for jQuery Window by using MVVM binding."
previous_url: /web/window/how-to/mvvm-editing-form, /controls/layout/window/how-to/MVVM/mvvm-editing-form
slug: howto_usemvvmbinding_forwindowdataediting_mvvm_window
tags: telerik, kendo, jquery, window, use, mvvm, for, data, editing
component: window
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Window for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio Version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I edit data in a Kendo UI for jQuery Window by using an MVVM binding?

## Solution

The example below demonstrates how to achieve the desired scenario.


```dojo

    <ul id="data-container"></ul>

    <!-- template used to render the dataSource's data -->
    <script id="tmp" type="text/x-kendo-template">
        <li data-uid="#: uid #"> ID: #: ProductID # Product Name: #: ProductName # <input data-role="button" type="button" value="edit" class="edit-button k-button k-button-sm k-rounded-md k-button-solid k-button-solid-base" /></li>
    </script>

    <!-- kendoWindow -->
    <div id="editForm">
      <h2>Edit Form</h2>
      <ul>
        <li>
          <label for="ProductName">ProductName</label>
          <!-- bind the ProductName field of the selected product -->
          <input type="text" data-role='textbox' name="ProductName" data-bind="value: selected.ProductName" required />
        </li>
        <li>
          <label for="UnitPrice">UnitPrice</label>
          <!-- bind the UnitPrice field of the selected product -->
          <input data-role="numerictextbox" name="UnitPrice" data-bind="value: selected.UnitPrice" required min="1" />
          <span class="k-invalid-msg" data-for="UnitPrice"></span>
        </li>
        <li>
          <label for="UnitsInStock">UnitsInStock</label>
          <!-- bind the UnitsInStock field of the selected product -->
          <input data-role="numerictextbox" name="UnitsInStock" data-bind="value: selected.UnitsInStock" required min="0" />
          <span class="k-invalid-msg" data-for="UnitsInStock"></span>
        </li>
        <li>
          <label for="Discontinued"></label>
          <!-- bind the Discontinued field of the selected product -->
          <input type="checkbox" name="Discontinued" data-bind="checked: selected.Discontinued" />
          <span>Items is discontinued</span>
        </li>
        <li class="buttons">
          <!-- attach the click event handlers -->
          <button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base btnSave" data-bind="events: { click: sync }">Save</button>
          <button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base btnCancel" data-bind="events: { click: cancel }">Cancel</button>
        </li>
      </ul>
    </div>
    <script>
      var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core";
      var validator;
      var viewModel = kendo.observable({
        //create a dataSource
        dataSource: new kendo.data.DataSource({
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
          },
          change: function () {
            var template = kendo.template($("#tmp").html()); //create a template
            $("#data-container").html(kendo.render(template, this.view())); //render the template with current data
          }
        }),
        selected: {}, //this field will contain the edited dataItem
        sync: function () {
          if(validator.validate()) { //validate the user input
            this.dataSource.sync(); //sync the changes through the transport
            $("#editForm").data("kendoWindow").close();
          }
        },
        cancel: function () {
          this.dataSource.cancelChanges(); //calcel all the change
          validator.hideMessages(); //hide the warning messages
          $("#editForm").data("kendoWindow").close();
        }
      });

      viewModel.dataSource.read(); //invoke the read transport of the DataSource

      kendo.bind($("#editForm"), viewModel);
      validator = $("#editForm").kendoValidator().data("kendoValidator"); //create a validator instance

      $("#editForm").kendoWindow({ //create a window
        visible: false
      });

      $("#data-container").on("click", ".edit-button", function(e) {
        var model = viewModel.dataSource.getByUid($(e.target).closest("li").data("uid")); //get reference to the model
        validator.hideMessages(); //hide the validation messages (if any)
        viewModel.set("selected", model); //update the viewModel
        $("#editForm").data("kendoWindow").open().center();
      });

    </script>

    <style scoped>
      #grid {
        width: 700px;
        float: left;
      }
      #editForm {
        width: 600px;
        margin: 20px;
        padding: 20px;
        float: left;
        border: 1px solid #c5c5c5;
        border-radius: 10px;
        font-size: 80%;
      }
      #editForm h2 {
        border-bottom: 1px solid #ccc;
        font-size: 1.4em;
        font-weight: normal;
        padding: 0;
        margin: 0;
      }
      #editForm ul {
        list-style-type: none;
      }
      #editForm ul li {
        margin: 10px;
      }
      #editForm ul label {
        font-weight: bold;
        display: inline-block;
        width: 90px;
        text-align: right;
      }
      #editForm label {
        display: block;
        margin-bottom: 10px;
      }
      #editForm .buttons {
        margin-top: 25px;
      }
      #editForm .k-button {
        width: 100px;
      }
    </style>
```

## See Also

* [Window JavaScript API Reference](/api/javascript/ui/window)
* [Add **Close** Button inside Modal Windows]({% slug howto_addclosebutton_insidemodalwindows_window %})
* [Cascade Open Windows]({% slug howto_cascadeopenwindows_window %})
* [Display Loading Indicator over Window]({% slug howto_displayloadingindicator_overwindow_window %})
* [Initialize the Grid]({% slug initialize_thegrid_window_widget %})

