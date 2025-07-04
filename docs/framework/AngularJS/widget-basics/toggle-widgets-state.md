---
title: Enabling and Disabling Widgets
page_title: Working with State Changes | AngularJS Directives
description: "Learn how to enable and disable widgets in AngularJS applications."
previous_url: /framework/AngularJS/introduction#working-with-state-changes
slug: angularjs_enable_disable
position: 7
---

# Enabling and Disabling Widgets

Kendo UI provides the `k-ng-disabled` and `k-ng-readonly` directives.

By using them, you can change the `disabled` or `readonly` state of the widget based on a scope variable. All widgets that contain the `enabled` method, except for the PanelBar and the Menu, support the `k-ng-disabled` directive. All widgets that contain the `readonly` method support the `k-ng-readonly` directive.

The following example demonstrates how to change the disabled state of the DropDownList.

```
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://kendo.cdn.telerik.com/2023.3.1010/js/angular.min.js"></script>
<script src="https://kendo.cdn.telerik.com/2023.3.1010/js/kendo.all.min.js"></script>
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/7.0.1/default/default-ocean-blue.css">

    <div id="example" ng-app="KendoDemos">
      <div class="demo-section k-content" ng-controller="MyCtrl">
        <select id="customers"
                kendo-drop-down-list
                k-ng-disabled = "isDisabled"
                k-options="customOptions"></select>
      </div>
    </div>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ])
      .controller("MyCtrl", function($scope){
        $scope.isDisabled = true;
        $scope.customOptions = {
          dataSource: {
            transport: {
              read: {
                url: "https://demos.telerik.com/service/v2/core/Customers",
              }
            }
          },
          dataTextField: "ContactName",
          dataValueField: "CustomerID"
        };
      })
    </script>
```

The following example demonstrates how to change the read-only state of the DropDownList.

```
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://kendo.cdn.telerik.com/2023.3.1010/js/angular.min.js"></script>
<script src="https://kendo.cdn.telerik.com/2023.3.1010/js/kendo.all.min.js"></script>
<link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/7.0.1/default/default-ocean-blue.css">

    <div id="example" ng-app="KendoDemos">
      <div class="demo-section k-content" ng-controller="MyCtrl">
        <select id="customers"
                kendo-drop-down-list
                k-ng-readonly = "isReadonly"
                k-options="customOptions"></select>
      </div>
    </div>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ])
      .controller("MyCtrl", function($scope){
        $scope.isReadonly = true;
        $scope.customOptions = {
          dataSource: {
            transport: {
              read: {
                url: "https://demos.telerik.com/service/v2/core/Customers",
              }
            }
          },
          dataTextField: "ContactName",
          dataValueField: "CustomerID"
        };
      })
    </script>
```

## See Also

* [AngularJS Integration Overview]({% slug angularjs_integration_directives %})
* [Global Events]({% slug global_events_angularjs_directives %})
