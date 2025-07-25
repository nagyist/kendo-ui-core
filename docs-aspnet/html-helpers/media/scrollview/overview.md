---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ScrollView for {{ site.framework }}."
previous_url: /helpers/media/scrollview/overview
slug: htmlhelpers_scrollview_aspnetcore
position: 0
---

# {{ site.framework }} ScrollView Overview

{% if site.core %}
The Telerik UI ScrollView TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI ScrollView widget.
{% else %}
The Telerik UI ScrollView HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ScrollView widget.
{% endif %}

The ScrollView displays a horizontal collection of content or image views with built-in navigation between them. It can be scrolled through dragging, gestures, arrow click or page click or tap. Among the key features of the ScrollView are data-source binding, customizable template, built-in pager, adjustable bounce effects and scroll velocity.

* [Demo page for the ScrollView HtmlHelper](https://demos.telerik.com/{{ site.platform }}/scrollview/index)
{% if site.core %}
* [Demo page for the ScrollView TagHelper](https://demos.telerik.com/aspnet-core/scrollview/tag-helper)
{% endif %}

## Initializing the ScrollView

You can initialize the ScrollView either [from HTML](#from-html) or [from a data source with a template](#from-the-data-source).

### From HTML

1. Use its `Items()` method.
1. Add HTML elements for each page as part of the content of the ScrollView items.

```HtmlHelper
    <style>
        h1 {
            margin-top: 30%;
            text-align:center;
        }
    </style>
    @(Html.Kendo().ScrollView()
            .Name("scrollView")
            .ContentHeight("100%")
            .Items(x =>
            {
                x.Add().Content("<h1>One</h1>");
                x.Add().Content("<h1>Two</h1>");
                x.Add().Content("<h1>Three</h1>");
            })
            .HtmlAttributes(new { style = "height:748px; width:1022px; max-width: 100%;" })
    )
```
{% if site.core %}
```TagHelper
   <kendo-scrollview name="scrollView" content-height="100%" style="height:600px; width:890px; max-width: 100%;">
        <items>
            <scrollview-item>
                <content>
                    <h1>One</h1>
                </content>
            </scrollview-item>
            <scrollview-item>
                <content>
                    <h1>Two</h1>
                </content>
            </scrollview-item>
            <scrollview-item>
                <content>
                    <h1>Three</h1>
                </content>
            </scrollview-item>
        </items>
    </kendo-scrollview>
    <style>
        h1 {
            margin-top: 30%;
            text-align:center;
        }
    </style>
```
{% endif %}

### From the Data Source

1. Create a [Kendo UI for jQuery template](https://docs.telerik.com/kendo-ui/framework/templates/overview).
1. Use the `TemplateId()` method to pass it and provide a DataSource.

Make sure that the template provides the `pageSize` of the data source. If `serverPaging` is enabled, the ScrollView will request the data in advance so it becomes available before it is required, thus improving user experience. The ScrollView uses virtualization when it is bound to a data source and it only has three pages at all times&mdash;the current, the previous, and the next.

```HtmlHelper
    @(Html.Kendo().ScrollView()
         .Name("scrollView")
         .ContentHeight("100%")
         .TemplateId("employee-template")
         .DataSource(d =>
                d.Custom()
                  .Type("odata-v4")
                  .Transport(t => t.Read(r => r.Url("https://demos.telerik.com/service/v2/odata/Employees")))
                  .ServerPaging(true)
                  .PageSize(1))
         .HtmlAttributes(new { style = "height:600px; width:890px; max-width: 100%;" })
    )
    <script id="employee-template" type="text/x-kendo-template">
        <div class="template">
            <h1>
                <span>#:TitleOfCourtesy# #: FirstName# #: LastName# </span>
            </h1>
            <h3>Title: #: Title #</h3>
            <div class="notes"><em>#:Notes#</em></div>
            <div class="country">
                #: Country #
            </div>
        </div>
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-scrollview name="scrollView" content-height="100%" 
                                        template-id="employee-template" 
                                        style="height:600px; width:890px; max-width: 100%;">
        <datasource custom-type="odata-v4" page-size="1" server-paging="true">
            <transport>
                <read url="https://demos.telerik.com/service/v2/odata/Employees" />
            </transport>
        </datasource>
    </kendo-scrollview>
    <script id="employee-template" type="text/x-kendo-template">
        <div class="template">
            <h1>
                <span>#:TitleOfCourtesy# #: FirstName# #: LastName# </span>
            </h1>
            <h3>Title: #: Title #</h3>
            <div class="notes"><em>#:Notes#</em></div>
            <div class="country">
                #: Country #
            </div>
        </div>
    </script>
```
{% endif %}

The following example demonstrates how to fetch data from a Controller action.

```HtmlHelper
    @(Html.Kendo().ScrollView()
        .Name("scrollView")
        .EnablePager(false)
        .ContentHeight("100%")
        .TemplateId("scrollview-template")
        .DataSource(dataSource => dataSource
            .Custom()
            .Type("aspnetmvc-ajax")
            .Transport(transport => transport
            .Read(read => read.Action("GetScrollViewData", "Home"))
            )
            .Schema(s => s.Data("Data").Total("Total"))
            .ServerPaging(true)
            .PageSize(1))
        .HtmlAttributes(new { style = "height:200px; width:300px" })
    )

    <script id="scrollview-template" type="text/x-kendo-template">
        <p style="border: 2px solid blue; color: red;">#= data.SomeField #</p>
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-scrollview name="scrollView"
                      enable-pager="false"
                      content-height="100%"
                      template-id="scrollview-template">
        <datasource custom-type="aspnetmvc-ajax" server-paging="true" page-size="1">
            <transport>
                <read url="@Url.Action("GetScrollViewData","Home")"/>
            </transport>
            <schema data="Data" total="Total"></schema>
        </datasource>
    </kendo-scrollview>

    <script id="scrollview-template" type="text/x-kendo-template">
        <p style="border: 2px solid blue; color: red;">#= data.SomeField #</p>
    </script>
```
{% endif %}
```Controller
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GetScrollViewData([DataSourceRequest]DataSourceRequest request)
        {
            IEnumerable<MyModel> data = Enumerable.Range(1, 5).Select(x => new MyModel { SomeField = "item " + x + " from page " + request.Page });
            {% if site.core %}
            return Json(data.ToDataSourceResult(request));{% else %}
            return Json(data.ToDataSourceResult(request), JsonRequestBehavior.AllowGet);{% endif %}
        }
    }
```
```Model
    public class MyModel
    {
        public string SomeField { get; set; }
    }
```

If you set the `PageSize` option to a larger value, you will need to use a loop in the template.

```JS
    <script id="scrollview-template" type="text/x-kendo-template">
        # for (var i = 0; i < data.length; i++) { #
            <p style="border: 2px solid blue; color: red;">#= data[i].SomeField #</p>
        # } #
    </script>
```

## Functionality and Features

* [Templates]({% slug htmlhelpers_scrollview_aspnetcore_templates %})&mdash;To take control over the rendering of the ScrollView items, utilize the available templates.
* [Paging]({% slug htmlhelpers_scrollview_aspnetcore_paging %})&mdash;Set an overlay background color for the ScrollView pager.
* [Events]({% slug events_scrollview_aspnetcore %})&mdash;Subscribe to the available client-side events to implement any custom logic.
* [Keyboard Navigation]({% slug htmlhelpers_scrollview_accessibility_keyboard_navigation_aspnetcore %})&mdash;The ScrollView delivers keyboard shortcuts for faster navigation.

## Next Steps

* [Getting Started with the ScrollView]({% slug aspnetcore_scrollview_getting_started %})
* [Basic Usage of the ScrollView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scrollview)
{% if site.core %}
* [Basic Usage of the ScrollView TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/scrollview/tag-helper)
* [ScrollView in Razor Pages]({% slug htmlhelpers_scrollview_razorpage_aspnetcore %})
{% endif %}

## See Also

* [Using the API of the ScrollView for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/scrollview/api)
* [Knowledge Base Section](/knowledge-base)
