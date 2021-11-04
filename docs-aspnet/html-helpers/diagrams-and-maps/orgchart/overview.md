---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI OrgChart HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_orgchart_aspnetcore
position: 0
---

# OrgChart HtmlHelper Overview

The Telerik UI OrgChart HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI OrgChart widget.

The OrgChart is a flexible organizational chart component designed to represent a structure of an organization. The OrgChart can illustrate the hierarchy in a company, department, team, or other hierarchical structures. 

* [Demo page for the OrgChart](https://demos.telerik.com/{{ site.platform }}/orgchart/index)

## Basic Configuration

The following example demonstrates the basic configuration of the OrgChart HtmlHelper.

```Razor
    @(Html.Kendo().OrgChart<TelerikMvcApp1.Models.OrgChartEmployeeViewModel>()
        .Name("orgchart")
        .DataSource(dataSource => dataSource
            .Read(read => read.Action("Read", "Home"))
            .Model(m =>
            {
                m.Id(f => f.ID);
                m.ParentId(f => f.ParentId);
                m.Name(f => f.Name);
                m.Title(f => f.Title);
                m.Avatar(f => f.Avatar);
                m.Expanded(f => f.Expanded);
            })
        )
    )
```
```Controller
    public JsonResult Read([DataSourceRequest] DataSourceRequest request)
    {
        List<OrgChartEmployeeViewModel> data = new List<OrgChartEmployeeViewModel>()
        {
            new OrgChartEmployeeViewModel() { ID = 1, Name = "Clevey Thrustfield", Title = "CEO", ParentID = null, Expanded = true, Avatar = "../content/web/orgchart/people/1.jpg"  },
            new OrgChartEmployeeViewModel() { ID = 2, Name = "Sean Russel", Title = "Financial Manager", ParentID = 1, Expanded = true, Avatar = "../content/web/orgchart/people/2.jpg"  },
            new OrgChartEmployeeViewModel() { ID = 3, Name = "Andrew Berry", Title = "Team Lead", ParentID = 1, Expanded = true, Avatar = "../content/web/orgchart/people/3.jpg"  },
            new OrgChartEmployeeViewModel() { ID = 4, Name = "Dilyana Newman", Title = "Accountant", ParentID = 2, Expanded = false, Avatar = "../content/web/orgchart/people/4.jpg"  }
        };

        return Json(data, JsonRequestBehavior.AllowGet);
    }
```

## Functionality and Features

* [Binding]({% slug htmlhelpers_orgchart_databinding_aspnetcore %})
* [Editing]({% slug htmlhelpers_orgchart_editing_aspnetcore %})
* [Grouping]({% slug htmlhelpers_orgchart_grouping_aspnetcore %})
* [Templates]({% slug htmlhelpers_orgchart_templates_aspnetcore %})
* [Accessibility]({% slug accessibility_aspnetcore_orgchart %})

## Events

You can subscribe to all OrgChart [events](/api/orgchart). For a complete example on the OrgChart events, refer to the [OrgChart Events Demo](https://demos.telerik.com/{{ site.platform }}/orgchart/events).

The following example demonstrates how to subscribe to events by a handler name.

```
    @(Html.Kendo().OrgChart()
      .Name("orgchart")
      .Events(e => e
            .Select("onSelect")
            .Change("onChange")
      )
    )
    <script>
    function onSelect(e) {
        // Handle the "select" event.
    }

    function onChange(e) {
        // Handle the "change" event.
    }
    </script>
```

## See Also

* [Basic Usage of the OrgChart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/orgchart)
* [Using the API of the OrgChart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/orgchart/api)
* [Server-Side API](/api/orgchart)
* [JavaScript API Reference of the OrgChart](https://docs.telerik.com/kendo-ui/api/javascript/ui/orgchart)