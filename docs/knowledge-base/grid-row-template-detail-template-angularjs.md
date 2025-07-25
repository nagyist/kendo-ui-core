---
title: Use Grid Detail Template with Row Template
description: Learn how to use the grid detail template together with a row template in a Kendo UI Grid for AngularJS.
type: how-to
page_title: Row Template Directive with Detail Template - Kendo UI Grid for AngularJS
slug: grid-row-template-detail-template-angularjs
tags: grid, angular, js, angularjs, directive, template, row, detail, rowTemplate, detailTemplate
ticketid: 1179134
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
  <td>2018.2.620</td>
 </tr>
</table>

> Starting with R2 2022, the Kendo UI team officially drops the support for AngularJS 1.x through Kendo UI for jQuery. The AngularJS related files and functionality are removed from the bundles and distribution in R3 SP1 2023. The last version that contains the files is R3 2023.

## Description

I can't get the `k-row-template` and `k-detail-template` to work together using the directive mechanism. The row renders fine, but when I click on the expand button, I get the following error:

```
    Uncaught TypeError: Cannot convert undefined or null to object
        at eval (eval at compile (kendo.all.js:197), <anonymous>:3:55)
        at HTMLAnchorElement.<anonymous> (kendo.all.js:60573)
        at HTMLTableElement.dispatch (jquery.js:5183)
        at HTMLTableElement.elemData.handle (jquery.js:4991)
```

## Solution

1. Add the `k-row-template` directive to the `tr` element and add a `k-master-row` class as well
1. Add the `data-uid` of the row to avoid any issues with duplicated rows or another unexpected behaviour
1. Remember to include a hierarchy cell

    ```html
        <kendo-grid options="mainGridOptions">
          <table>
            <tr data-uid="#= uid #" class="k-master-row" k-row-template >
              <td class="k-hierarchy-cell" aria-expanded="false"><a class="k-icon k-i-expand" aria-label="Expand" tabindex="-1"></a>
              </td>
              <td>
                {{ dataItem.FirstName }}          
              </td>
              <td>{{ dataItem.LastName}}  </td>
            </tr>
          </table>
          <div k-detail-template>
            Detail
          </div>
        </kendo-grid>
    ```

> The example loads Kendo UI 2023.3.1010 version.

```dojo
	<script src="https://kendo.cdn.telerik.com/2023.3.1010/js/angular.min.js"></script>
	<script src="https://kendo.cdn.telerik.com/2023.3.1010/js/kendo.all.min.js"></script>

    <div id="example" ng-app="KendoDemos">
      <div ng-controller="MyCtrl">
        <kendo-grid options="mainGridOptions">
          <table>
            <tr data-uid="#= uid #" class="k-master-row" k-row-template >
              <td class="k-hierarchy-cell" aria-expanded="false"><a class="k-icon k-i-expand" aria-label="Expand" tabindex="-1"></a>
              </td>
              <td>
                {{ dataItem.FirstName }}           
              </td>
              <td>{{ dataItem.LastName}}  </td>
            </tr>
          </table>
          <div k-detail-template>
            <kendo-tabstrip>
              <ul>
                <li class="k-active">Orders</li>
                <li>Contact information</li>
              </ul>
              <div>
                <div kendo-grid k-options="detailGridOptions(dataItem)"></div>
              </div>
              <div>
                <ul class="contact-info-form">
                  <li><label>Country:</label> <input class="k-textbox" ng-model="dataItem.Country" /></li>
                  <li><label>City:</label> <input class="k-textbox" ng-model="dataItem.City" /></li>
                  <li><label>Address:</label> {{dataItem.Address}}</li>
                  <li><label>Home phone:</label> {{dataItem.HomePhone}}</li>
                </ul>
              </div>
            </kendo-tabstrip>
          </div>
        </kendo-grid>
      </div>
    </div>
    
    <style>
      .contact-info-form {
        list-style-type: none;
        margin: 30px 0;
        padding: 0;
      }

      .contact-info-form li {
        margin: 10px 0;
      }

      .contact-info-form label {
        display: inline-block;
        width: 100px;
        text-align: right;
        font-weight: bold;
      }
    </style>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ])
        .controller("MyCtrl", function($scope){
        $scope.mainGridOptions = {
          dataSource: {
            type: "odata-v4",
            transport: {
              read: "https://demos.telerik.com/service/v2/odata/Employees"
            },
            pageSize: 5,
            serverPaging: true,
            serverSorting: true
          },
          sortable: true,
          pageable: true,
          columns: [{
            field: "FirstName",
            title: "First Name",
            width: "120px"
          },{
            field: "LastName",
            title: "Last Name",
            width: "120px"
          }]
        };

        $scope.detailGridOptions = function(dataItem) {
          return {
            dataSource: {
              type: "odata-v4",
              transport: {
                read: "https://demos.telerik.com/service/v2/odata/Orders"
              },
              serverPaging: true,
              serverSorting: true,
              serverFiltering: true,
              pageSize: 5,
              filter: { field: "EmployeeID", operator: "eq", value: dataItem.EmployeeID }
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
              { field: "OrderID", title:"ID", width: "56px" },
              { field: "ShipCountry", title:"Ship Country", width: "110px" },
              { field: "ShipAddress", title:"Ship Address" },
              { field: "ShipName", title: "Ship Name", width: "190px" }
            ]
          };
        };
      })
    </script>
```
