---
title: Using CDN
page_title: Using CDN - Download and Installation 
description: "Get started with Kendo UI for jQuery and install the Kendo UI components by using the Kendo UI CDN services."
components: ["general"]
previous_url: /install/cdn
slug: kendoui_cdn_services_installation
position: 40
---

# Using CDN

The Kendo UI for jQuery CDN resides on the [Amazon CloudFront](https://aws.amazon.com/cloudfront/). Use it to load the official Kendo UI for jQuery releases and service packs without hosting the assets locally.

>note As of the R3 2022 release, you must activate the CDN distribution by [adding your script license key]({% slug using-license-code %}).

## Installation Steps

1. Add the required CSS and JavaScript files.

  The Kendo UI CDN provides `kendo.cdn.telerik.com` and the cookie-free `cdn.kendostatic.com` service.

  >note The legacy `https://da7xgjtj801h2.cloudfront.net/` URL remains active but is no longer recommended for new projects.

  Add the theme stylesheet from `https://kendo.cdn.telerik.com/themes/<version>/<theme>/<swatch>.css`. For example, you can load the `{{ site.themesCdnVersion }}` version of the `Default` theme from `https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main.css`.

  >note Starting with the 2023 R3 release, the font icons are detached from the Kendo Themes CDN. For more information on referencing the icons in your project, see the [font icon usage documentation](https://www.telerik.com/design-system/docs/foundation/iconography/font-icons/#usage).

  Add the JavaScript files by using either the [JavaScript modules]({% slug kendoui_ecmascript_overview %}) or the bundled JavaScript files.

  The [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) are located in the `/mjs/` folder. To include a JavaScript module in your project, use the `script` tag with the `type="module"` attribute.

  The following example demonstrates how to include an individual component module.

  ```html
  <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/mjs/kendo.grid.js" type="module"></script>
  ```

  The following example demonstrates how to include all available modules.

  ```html
  <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/mjs/kendo.all.js" type="module"></script>
  ```

  The bundled version of the Kendo UI for jQuery library is available at `https://kendo.cdn.telerik.com/VERSION/js/FILENAME.min.js`. For example, you can load the `{{ site.cdnVersion }}` version from `https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js`.

  The minified Kendo UI for jQuery scripts are available as of the Kendo UI Q1 2014 SP1 release. To load them, use `https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.ui.core.min.js`.

1. Add your script license key.

  [Generate and reference your script license key]({% slug using-license-code %}) by following the current licensing instructions for CDN-based installations.

1. Add the HTML element and initialize the component.

  Depending on the component you require, you can initialize the Kendo UI controls from different elements. The following example demonstrates a complete page that adds the `input` element, loads the CDN assets, and initializes a DropDownList with basic configuration.

```dojo
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Kendo UI using CDN</title>

        <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/default/default-main.css" />

        <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
        <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js"></script>
    </head>
    <body>
      <input id="ddl" />
      <script>
        $("#ddl").kendoDropDownList({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: [
            { text: "Item1", value: "1" },
            { text: "Item2", value: "2" }
          ]
        });
      </script>
    </body>
</html>
```

## Next Steps

* [Create Your Own Custom Bundles]({% slug include_only_what_you_need_kendoui_scripts %})
* [The Component DOM Element Structure]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Initialize Components as jQuery Plugins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize Components with MVVM]({% slug mvvm_initialization_kendoui %})
* [jQuery Version Support]({% slug jquerysupport_kendoui %})
* [Web Browser Support]({% slug wbe_browserand_operating_system_support %})
* [Operating System Support]({% slug ossupport_kendo %})
* [PDF and Excel Export Support]({% slug export_support_kendoui %})
* [Create Your Own Custom Components]({% slug createcustomkendouiwidgets_gettingstarted %})

## See Also

* [Troubleshooting When Using Kendo UI CDN services]({% slug troubleshoot_cdn_installing %})
* [Troubleshooting When Trying to Refer Kendo UI Internal Builds from CDN]({% slug cannot_refer_internal_builds_cdn %})
* [Hosting Kendo UI in Your Project]({% slug hosting_kendoui %})
* [Installing Kendo UI with Bower]({% slug kendoui_bower_packages_kendoui_installation %})
* [Installing Kendo UI with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Installing Kendo UI with NuGet]({% slug kendoui_nuget_packages %})
* [Getting Up and Running with Your Kendo UI Project (Guide)]({% slug getting_started_installation_kendoui %})
* [Licensing Overview]({% slug licensing-overview %})
