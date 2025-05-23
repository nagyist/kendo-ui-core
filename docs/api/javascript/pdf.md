---
title: pdf
page_title: API reference for Kendo UI Drawing API (PDF) static functions
res_type: api
---

# kendo.pdf

Helper functions declared in the kendo.pdf namespace.

## Methods

### defineFont

Defines a map with locations for TrueType Font (.ttf) files. It is safe to call this method multiple times.

The [exportPDF](/api/javascript/drawing/methods/drawdom) method will use the font files when embedding them in a PDF document.
Since Kendo UI 2014 Q3 SP1, the Kendo UI PDF generator is able to dig [CSS `@font-face` declarations](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) directly from the stylesheets. "Manually" calling the `pdf.defineFont()`method is no longer necessary. For more information how to embed fonts using CSS at-rules - check [this]({% slug drawingofhtmlelements_drawingapi %}#configuration-Custom) section. This will work only if the style sheet and fonts are loaded from the same domain.

> Fonts must be loaded from the same origin or [CORS-enabled](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image).
> The only format supported by the `defineFont` method is `.ttf`.

#### Parameters

##### map `Object`

A map for font names, variants and the location of its .ttf file.

* The key is the font name. Optional variants are separated with a pipe symbol.
* The value is the TrueType Font (.ttf) file URL.

#### Example - Define font locations for embedding
    <script>
        // Import DejaVu Sans font for embedding. WebComponentsIcons is the font used for the Kendo font icons only
        kendo.pdf.defineFont({
            "DejaVu Sans"             : "https://kendo.cdn.telerik.com/2023.1.117/styles/fonts/DejaVu/DejaVuSans.ttf",
            "DejaVu Sans|Bold"        : "https://kendo.cdn.telerik.com/2023.1.117/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
            "DejaVu Sans|Bold|Italic" : "https://kendo.cdn.telerik.com/2023.1.117/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
            "DejaVu Sans|Italic"      : "https://kendo.cdn.telerik.com/2023.1.117/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
            "WebComponentsIcons"      : "https://kendo.cdn.telerik.com/2023.1.117/styles/fonts/glyphs/WebComponentsIcons.ttf"
        });
    </script>

    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var text = new draw.Text(
            "Lorem ípsum dolor sit amét, pro éu facilis vulputáte témporibus.",
            [20, 20], {
                font: "14px 'DejaVu Sans', Arial, sans-serif"
            });

        var root = new draw.Group();
        root.append(text);

        draw.exportPDF(root, { paperSize: "A5", landscape: true }).done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "dejavu.pdf"
            });
        });
    </script>

## See Also

* [Drawing of HTML Elements]({% slug drawingofhtmlelements_drawingapi %})
* [Overview of the Drawing API]({% slug overview_kendoui_drawingapi %})
* [Getting Started with the Drawing Library]({% slug getting_started_kendoui_drawing %})
* [Export a Drawing in PDF]({% slug pdfderawingexport_drawingapi %})
* [Supported Browsers for Kendo UI Drawing API]({% slug drawingofhtmlelements_drawingapi %})
