---
title: Remove DropDownList Items
page_title: Remove DropDownList Items
description: "Learn how to remove items from a Kendo UI DropDownList component."
previous_url: /controls/editors/dropdownlist/how-to/remove-items, /controls/editors/dropdownlist/how-to/editing/remove-items
slug: howto_remove_items_dropdownlist
tags: telerik, kendo, jquery, dropdownlist, remove, items
component: dropdownlist
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® DropDownList for jQuery</td>
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

How can I remove items from a Kendo UI DropDownList?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo 
    <input id="color" />
    <button class="k-button" id="remove">Remove items</button>  
     
    <script>
      $(document).ready(function() {
        var data = [
          { text: "Black", value: "1" },
          { text: "Orange", value: "2" },
          { text: "Grey", value: "3" }
        ];

        // create DropDownList from input HTML element
        $("#color").kendoDropDownList({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: data
        });

        $("#remove").click(function() {
          var ddl =  $("#color").data("kendoDropDownList");

          var oldData = ddl.dataSource.data();

          ddl.dataSource.remove(oldData[0]); //remove first item
          ddl.dataSource.remove(oldData[oldData.length - 1]); //remove last item
        });
      });
    </script> 
```

## See Also

* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
* [Automatically Adjust the Width of a DropDownList]({% slug howto_automatically_adjust_width_dropdownlist %})
* [Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
* [Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [Update MVVM Bound Models on Load]({% slug howto_update_mvvm_model_onload_dropdownlist %})
