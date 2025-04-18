---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Loader component for {{ site.framework }}."
slug: htmlhelpers_loader_aspnetcore_overview
position: 0
---

# {{ site.framework }} Loader Overview
{% if site.core %}
The Telerik UI Loader TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Loader widget.
{% else %}
The Telerik UI Loader HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Loader widget.
{% endif %}

The Loader component is a visual indicator that expresses an indeterminate wait time. It informs users about the status of ongoing processes, such as loading an application, submitting a form, saving updates or fetching data.

* [Demo page for the Loader HtmlHelper](https://demos.telerik.com/{{ site.platform }}/loader/index)
{% if site.core %}
* [Demo page for the Loader TagHelper](https://demos.telerik.com/aspnet-core/loader/tag-helper)
{% endif %}

## Initializing the Loader

The following example demonstrates how to define the Loader.

```HtmlHelper
    @(Html.Kendo().Loader()
        .Name("loader")
    )
```
{% if site.core %}
```TagHelper
    <kendo-loader name="loader"></kendo-loader>
```
{% endif %}

## Basic Configuration

The following example demonstrates the Loader in action.

```Razor
    @(Html.Kendo().Loader()
        .Name("loader")
        .Size(LoaderSize.Large)
        .ThemeColor(LoaderThemeColor.Secondary)
        .Type(LoaderType.InfiniteSpinner)
    )
```
{% if site.core %}
```TagHelper
    <kendo-loader name="loader"
        type="LoaderType.InfiniteSpinner" 
        size="LoaderSize.Large" 
        themeColor="LoaderThemeColor.Secondary">
    </kendo-loader>
```
{% endif %}

## Functionality and Features

* [Appearance]({% slug htmlhelpers_loader_aspnetcore_appearance %})&mdash;Explore the available options for customizing the Loader appearance.
* [Integration]({% slug htmlhelpers_loader_aspnetcore_integration %})&mdash;The Loader can be integrated into another components.
* [Accessibility]({% slug htmlhelpers_loader_accessibility %})&mdash;The Loader is accessible by screen readers and provides WAI-ARIA, Section 508, and WCAG 2.2 compatibility.

## Next Steps

* [Getting Started with the Loader]({% slug aspnetcore_loader_getting_started %})
* [Basic Usage of the Loader HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/loader/index)
{% if site.core %}
* [Basic Usage of the Loader TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/loader/tag-helper)
{% endif %}

## See Also

* [Loader Integration {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/loader/integration)
* [Knowledge Base Section](/knowledge-base)