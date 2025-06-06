---
title: Responsive Pager
page_title: jQuery Pager Documentation - Responsive Pager
description: "Get started with the jQuery Pager by Kendo UI and learn about its responsive feature."
slug: responsive_kendoui_pager_widget
---

## Responsive Design

The Kendo UI Pager is responsive by default. To disable the responsive behavior and have all of its elements visible at all times set the [`responsive`](/api/javascript/ui/pager/configuration/responsive) property to `false`.

## Visible Elements

The Pager component determines which internal elements to render based on its width. When the Pager width is greater than or equal to 600 pixels, all elements are visible:

- [`Page Sizes Dropdown`](/api/javascript/ui/pager/configuration/pagesizes)
- [`Numeric Page Number Buttons`](/api/javascript/ui/pager/configuration/numeric) or a [`Numeric Input`](/api/javascript/ui/pager/configuration/input) if the pager is an `input` one.
- [`Info element`](/api/javascript/ui/pager/configuration/info)

## Breaking Points

When the Pager width is greater than or equal to 600 pixels, all elements are visible:

![Kendo UI for jQuery Pager component at over 600px resolution](../../images/pager-responsive/pager-over-600-resolution.png)

When the Pager width is greater than 480 and less than 600 pixels, the label showing the current paging information is hidden:

![Kendo UI for jQuery Pager component between 480 and 600px resolution](../../images/pager-responsive/pager-480-600-resolution.png)

When the Pager width is greater than 360 and less than 480 pixels, the current page is represented by a native `<select/>` element. The `pageSizes` dropdown and the label showing the current paging information are hidden.

![Kendo UI for jQuery Pager component between 360 and 480px resolution](../../images/pager-responsive/pager-360-480-resolution.png)

When the Pager width is less than 360 pixels, the current page is represented by a native `<select/>` element. The `pageSizes` dropdown and the label showing the current paging information are hidden.

![Kendo UI for jQuery Pager component under 360 pixels](../../images/pager-responsive/pager-under-360-resolution.png)

## See Also

* [Pager Adaptive Mode]({% slug adaptivemode_kendoui_pager_widget %})
* [JavaScript API Reference of the Pager](/api/javascript/ui/pager)
* [Pager Settings and Types]({% slug settings_kendoui_pager_widget %})
* [Pager Templates]({% slug templates_kendoui_pager_widget %})
* [Globalization and Messages]({% slug globalization_kendoui_pager_widget %})
