---
title: Adaptiveness
page_title: Adaptiveness
description: "Learn how to configure the adaptive behavior of the the Telerik UI TimeDurationPicker component for {{ site.framework }}."
slug: htmlhelpers_timedurationpicker_adaptive_mode_aspnetcore
position: 5
---

# Adaptiveness

Adaptiveness is an advanced capability that enhances the Telerik UI for {{ site.framework }} TimeDurationPicker by enabling a completely new layout based on the screen size. It also allows you to adjust the displayed on-screen keyboard for a more user-friendly interaction on touchscreen devices.

## Adaptive Mode

The TimeDurationPicker supports an adaptive mode that provides a mobile-friendly rendering of its popup. To enable the adaptive rendering mode, set the [`AdaptiveMode()`](/api/kendo.mvc.ui.fluent/timedurationpickerbuilder#adaptivemodekendomvcuiadaptivemode) property to `AdaptiveMode.Auto`.

> Starting with the 2025 Q2 release, when the adaptive rendering mode is enabled and the component is accessed on a mobile device, the popup will open as soon as the component receives focus. In previous versions, the popup only opened once the user began typing.

The TimeDurationPicker component automatically adapts to the current screen size and changes its rendering accordingly. On medium-sized screens, the popup is displayed as docked to the bottom of the screen, while on smaller screens, it is rendered as a full-screen modal dialog. In all other scenarios, including when the `AdaptiveMode()` option is not specified or is set to its default value of `AdaptiveMode.None`, the standard popup is rendered docked to the input of the component.

The adaptive mode changes the rendering of the TimeDurationPicker popup element based on the screen resolution of the device (the horizontal value in `px`) with the following breakpoints:

* Small screens&mdash;up to 500 px.
* Medium screens&mdash;between 501 px and 768 px.
* Large screens&mdash;over 768 px.

The following example demonstrates how to enable the adaptive mode of the TimeDurationPicker by using the `AdaptiveMode()` option.

<demo metaUrl="timedurationpicker/adaptive_mode/" height="600"></demo>

## On-Screen Keyboard

To enhance the user experience of your application on mobile devices, you can configure the type of the on-screen keyboard for the TimeDurationPicker component.

To display an on-screen keyboard when the user focuses the TimeDurationPicker input, set the `InputMode()` property to any of the supported <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode#values" target="_blank">`inputmode`</a> HTML attribute values. Based on the defined value, the browser displays the respective virtual keyboard on the screen.

The following example demonstrates how to configure the most appropriate on-screen keyboard for the TimeDurationPicker.

```HtmlHelper
     @(Html.Kendo().TimeDurationPicker()
	     .Name("timeDurationPicker")
          .InputMode("numeric")
     )
```
{% if site.core %}
```TagHelper
     @addTagHelper *, Kendo.Mvc

     <kendo-timedurationpicker name="timeDurationPicker" 
          input-mode="numeric">
     </kendo-timedurationpicker>
```
{% endif %}

## See Also

* [Adaptive Rendering of the Components]({% slug adaptive_rendering%})
* [Server-Side API of the TimeDurationPicker HtmlHelper](/api/timedurationpicker)
{% if site.core %}
* [Server-Side API of the TimeDurationPicker TagHelper](/api/taghelpers/timedurationpicker)
{% endif %}
