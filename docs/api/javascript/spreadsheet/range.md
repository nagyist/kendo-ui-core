---
title: Range
page_title: Configuration, methods and events of Kendo UI Spreadsheet Range Instance object
res_type: api
---

# kendo.spreadsheet.Range

Represents one or more rectangular regions of cells in a given [Sheet](/api/javascript/spreadsheet/sheet). Inherits from [Class](/api/javascript/class).

An instance of a range object may be obtained as a return value from the Sheet [range](/api/javascript/spreadsheet/sheet/methods/range) or [selection](/api/javascript/spreadsheet/sheet/methods/selection) methods.

## Methods

### background

Gets or sets the background color of the cells in the range.

#### Parameters

##### value `String` *optional*

Any valid [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).

#### Returns

`String` the current background color of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.range("A1:B2").value("foo");
    sheet.range("A1").background("green");
    sheet.range("A2").background("#a0b0c0");
    sheet.range("B1").background("rgb(255,0, 255)");
</script>
```

### bold

Gets or sets the bold state of the cells in the range.

##### value `Boolean` *optional*

True to make the text bold; false otherwise.

#### Returns

`Boolean` the current bold state of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.range("A1").value("bold");
    sheet.range("A1").bold(true);
</script>
```

### borderBottom

Gets or sets the state of the bottom border of the cells. If the range includes more than a single cell, the setting is applied to all cells.

#### Parameters

##### value `Object` *optional*

The border configuration object. It may contain `size` and `color` keys.

The `color` may be set to any valid [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).
The `size` should be the border width in pixels (numeric, not string).

#### Returns

`Object` the current value of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A2:B3").borderBottom({ size: 2, color: "green" });
</script>
```

### borderLeft

Gets or sets the state of the left border of the cells. If the range includes more than a single cell, the setting is applied to all cells.

#### Parameters

##### value `Object` *optional*

The border configuration object. It may contain `size` and `color` keys.

The `color` may be set to any valid [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).
The `size` should be the border width in pixels (numeric, not string).

#### Returns

`Object` the current value of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A2:B3").borderLeft({ size: 2, color: "green" });
</script>
```

### borderRight

Gets or sets the state of the right border of the cells. If the range includes more than a single cell, the setting is applied to all cells.

#### Parameters

##### value `Object` *optional*

The border configuration object. It may contain `size` and `color` keys.

The `color` may be set to any valid [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).
The `size` should be the border width in pixels (numeric, not string).

#### Returns

`Object` the current value of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A2:B3").borderRight({ size: 2, color: "green" });
</script>
```

### borderTop

Gets or sets the state of the top border of the cells. If the range includes more than a single cell, the setting is applied to all cells.

#### Parameters

##### value `Object` *optional*

The border configuration object. It may contain `size` and `color` keys.

The `color` may be set to any valid [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).
The `size` should be the border width in pixels (numeric, not string).

#### Returns

`Object` the current value of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A2:B3").borderTop({ size: 2, color: "green" });
</script>
```

### color

Gets or sets the text color of the range.

#### Parameters

##### value `String` *optional*

Any valid [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).

#### Returns

`String` the current color of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.range("A1:B2").value("foo");
    sheet.range("A1").color("green");
    sheet.range("A2").color("#a0b0c0");
    sheet.range("B1").color("rgb(255,0, 255)");
</script>
```

### comment

Gets or sets the comment for the cells.  The comment is a text tooltip that appears when the cell is hovered.

#### Parameters

##### value `String` *optional*

Text comment.  Pass `null` to remove the comment.

#### Returns

`String` the current comment of the top-left cell in the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.range("A1").comment("Test");
    sheet.range("A1").comment(null); // remove it
    sheet.range("B2").comment("This is a comment");
</script>
```

### clear

Clears the contents of the range cells.

#### Parameters

##### options `Object` *optional*

An object which may contain `contentsOnly: true` or `formatOnly: true` key values. Clearing the format will remove the cell formatting and visual styles.

If a parameter is not passed, the method will clear both the cells values and the formatting.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A1").value(1);
    sheet.range("A2").value(2);
    sheet.range("A1:A2").clear();
</script>
```

### clearFilter

Clears the set filters for the given column(s). The indices is relative to the beginning of the range.

#### Parameters

##### indices `Array | Number`

The column(s) which filters should be cleared.

#### Example - clear the filters for a column

```
<div id="spreadsheet"></div>

<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    var values = [
        [ "C 1", "C 2", "C 3" ],
        [ 7, 5, 6 ],
        [ 7, 8, 9 ],
        [ 6, 3, 9 ]
    ];

    sheet.range("A1:C4").values(values);

    var filter = new kendo.spreadsheet.ValueFilter({ values: [ 7 ] });
    var filter2 = new kendo.spreadsheet.ValueFilter({ values: [ 8 ] });

    sheet.range("A1:C4").filter([
      { column: 0, filter: filter },
        { column: 1, filter: filter2 }
    ]);

    // row 3 will be visible now.

    sheet.range("A1:C3").clearFilter([ 1 ]);
    // the filter on B column will be cleared, so rows 2 and 3 will be visible.
</script>

```

### editor

Gets or sets the editor of the cells in the range.

##### value `String` *optional*

The name of the custom cell editor, registered as [described in this help article](https://docs.telerik.com/kendo-ui/controls/spreadsheet/custom-editors)

#### Returns

`String` name of the custom cell editor.

#### Example

```
<div id="spreadsheet" style="width: 100%;"></div>
  <script>
    kendo.spreadsheet.registerEditor("color", function(){
        var context, dlg, model;

        // Further delay the initialization of the UI until the `edit` method is
        // actually called, so here just return the object with the required API.

        return {
            edit: function(options) {
                context = options;
                open();
            },
            icon: "k-icon k-i-background"
        };

        // This function actually creates the UI if not already there, and
        // caches the dialog and the model.
        function create() {
            if (!dlg) {
                model = kendo.observable({
                    value: "#000000",
                    ok: function() {
                        // This is the result when OK is clicked. Invoke the
                        // callback with the value.
                        context.callback(model.value);
                        dlg.close();
                    },
                    cancel: function() {
                        dlg.close();
                    }
                });
                var el = $("<div data-visible='true' data-role='window' data-modal='true' data-resizable='false' data-title='Select color'>" +
                           "  <div data-role='flatcolorpicker' data-bind='value: value'></div>" +
                           "  <div style='margin-top: 1em; text-align: right'>" +
                           "    <button style='width: 5em' class='k-button' data-bind='click: ok'>OK</button>" +
                           "    <button style='width: 5em' class='k-button' data-bind='click: cancel'>Cancel</button>" +
                           "  </div>" +
                           "</div>");
                kendo.bind(el, model);

                // Cache the dialog.
                dlg = el.getKendoWindow();
            }
        }

        function open() {
            create();
            dlg.open();
            dlg.center();

            // If the selected cell already contains some value, reflect
            // it in the custom editor.
            var value = context.range.value();
            if (value != null) {
                model.set("value", value);
            }
        }
    });

   $(function() {
       $("#spreadsheet").kendoSpreadsheet({
           sheetsbar: false,
           excel: {
               // Required to enable Excel Export in some browsers
               proxyURL: "https://demos.telerik.com/service/v2/core/export"
           },
           sheets: [{
               rows: [{
                   cells: [
                       { value: "Select color:", bold: true },
                       { background: "#fef0cd",
                         editor: "color" }
                   ]
               }]
           }]
       });
   });
  </script>
```

### enable

Gets or sets the disabled state of the cells in the range.

##### value `Boolean` *optional*

True to make the cell enabled; false to disable it.

#### Returns

`Boolean` the current disabled state of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.range("A1").value("disabled");
    sheet.range("A1").enable(false);
</script>
```

### html

Gets or sets the html rendering of the cells in the range.

##### value `Boolean` *optional*

True to make the cell render the value as HTML. 
It is important to sanitize the value of the cell on the server for passing safe html because there is no client-side sanitizing. When editing a cell the new value can be checked and prevented in the client `changing` event.

> When the value is 'true ' the value of the cell should be always sanitized on the server for passing safe html.

#### Returns

`Boolean` the current html state of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.range("A1").value("<b>bold</b>");
    sheet.range("A1").html(true);
</script>
```


### fillFrom

Fills a range with values inferred from a source range.  This method employs some heuristics similar to what Excel's auto-filling algorithm does when you select a range of cells and drag the bottom-right handle.  The range to be filled is the current object, and you must pass a source range containing data as first argument.

#### Parameters

##### srcRange `Range | String`

The source range.  It must have the same number of rows or the same number of columns as the current range — otherwise
an exception will be thrown (a `Range.FillError` object having `code` property `"incompatibleRanges"`).

##### direction `Number` *optional*

Specifies the fill direction.  If the source range (`srcRange`) and target range (the current object) are adjacent, the
fill direction can be inferred from their positions, so it can be missing.  For example:

```
    sheet.range("B2:C3").fillFrom("B4:C5")
```

In this case it will select vertical reverse filling, because the target range is above the source range.

If the ranges are not adjacent and the direction is missing, an exception will be thrown if the ranges don't start
either on same column or on the same row (`"noFillDirection"` error code).

Possible values for direction:

- 0 — fill top-down
- 1 — fill left-to-right
- 2 — fill bottom-up
- 3 — fill right-to-left

#### Example

```
    <div id="spreadsheet"></div>
    <script type="text/javascript" charset="utf-8">

        $("#spreadsheet").kendoSpreadsheet();

        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

        var sheet = spreadsheet.activeSheet();

        sheet.range("A1:C2").values([
            [ 2, "Mon", "Foo 1" ],
            [ 5, "Wed", "Foo 2" ]
        ]);

        try {
            sheet.range("A3:C10").fillFrom("A1:C2");
        } catch(ex) {
            if (ex instanceof kendo.spreadsheet.Range.FillError) {
                // can be "incompatibleRanges" or "noFillDirection"
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(ex.code);
            } else {
                throw ex;
            }
        }
    </script>
```

The above will continue column `A` with 8, 11, 14 etc., column `B` with "Fri", "Sun", "Thu" etc. and column `C` with
"Foo 3", "Foo 4" etc.

### filter

Enables/disables or sets the filter for a given range.

#### Parameters

##### filter `Boolean | Object | Array`

Determines the action performed by the method.

* Passing `true` enables the filtering for the given range.
* Passing `false` disables and clears the set filters.
* Passing a `{ column: Number, filter: kendo.spreadsheet.Filter }` object applies the filter to the respective column.
* Passing an array of `{ column: Number, filter: kendo.spreadsheet.Filter }` objects applies each filter to the respective column. The column index is relative to the beginning of the range.

#### Example - enable filter

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    var values = [
        [ 1, 2, 3 ],
        [ 4, 5, 6 ],
        [ 7, 8, 9 ]
    ];

    sheet.range("A1:C3").values(values);

    sheet.range("A1:C3").filter(true);
</script>
```

#### Example - disable filter
```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    var values = [
        [ 1, 2, 3 ],
        [ 4, 5, 6 ],
        [ 7, 8, 9 ]
    ];

    sheet.range("A1:C3").values(values);

    sheet.range("A1:C3").filter(true);
    sheet.range("A1:C3").filter(false);
</script>
```

#### Example - set filter
```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    var values = [
        [ 1, 2, 3 ],
        [ 4, 5, 6 ],
        [ 7, 8, 9 ]
    ];

    var values = [
        [ "C 1", "C 2", "C 3" ],
        [ 4, 5, 6 ],
        [ 7, 8, 9 ]
    ];

    sheet.range("A1:C3").values(values);

    var filter = new kendo.spreadsheet.ValueFilter({ values: [ 7 ] });

    sheet.range("A1:C3").filter({ column: 0, filter: filter });
</script>
```

#### Example - set multiple filters

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    var values = [
        [ "C 1", "C 2", "C 3" ],
        [ 4, 5, 6 ],
        [ 7, 8, 9 ]
    ];

    sheet.range("A1:C3").values(values);

    var filter = new kendo.spreadsheet.ValueFilter({ values: [ 7 ] });
    var filter2 = new kendo.spreadsheet.ValueFilter({ values: [ 8 ] });

    sheet.range("A1:C3").filter([
        { column: 0, filter: filter },
        { column: 1, filter: filter2 }
    ]);
</script>
```

### fontFamily

Gets or sets the font family of the cells in the range.

#### Parameters

##### value `String` *optional*

The font family that should be set.

#### Returns

`String` the font family of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.range("A1:B1").value("monospace");
    sheet.range("A1").fontFamily("monospace");
</script>
```

### fontSize

Gets or sets the font size of the cells in the range.

#### Parameters

##### value `Number` *optional*

The font size (in pixels) that should be set.

#### Returns

`Number` the font size of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.range("A1").value("50px");
    sheet.range("A1").fontSize(50);
</script>
```

### forEachCell

Executes a function for each cell in the range.

#### Parameters

##### callback `Function`

The function that will be executed against every cell. The function receives the following parameters:

- **rowIndex** - the row index of the cell
- **columnIndex** - the column index of the cell
- **cellProperties** - the cell properties

#### Example

```
<div id="spreadsheet"></div>
<script>

    $("#spreadsheet").kendoSpreadsheet({
        sheets: [
            { rows: [
                { cells: [
                    { value: "A1" }, { value: "B1" }
                ] },
                { cells: [
                    { value: "A2" }, { value: "B2" }
                ] }
            ] }
        ]
    });


    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    var range = sheet.range("A1:B2");

    range.forEachCell(function (row, column, cellProperties) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(row, column, cellProperties);
    });
</script>
```

### format

Gets or sets the format of the cells.

#### Parameters

##### format `String` *optional*

The new format for the cells.

#### Returns

`String` the format of the top-left cell of the range.  When used as a
setter, `format` returns the Range object to allow chained calls.

More details about the supported format may be found in [the cell formatting help topic](/web/spreadsheet/format).

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A1").value(12.3456).format("#.###");
</script>
```

### formula

Gets or sets the formula of the cells.

#### Parameters

##### formula `String` *optional*

The new formula of the cell. The string may optionally start with `=`.

#### Returns

`String` the formula of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A1").input("1000");
    sheet.range("A2").formula("A1*2");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(sheet.range("A2").formula()); // "A1*2"
</script>
```

### hasFilter

Returns `true` if the sheet of the range has filter enabled.

#### Returns

`Boolean` `true` if the sheet has a filter, `false` otherwise.

#### Example - clear the filters for a column

```
<div id="spreadsheet"></div>

<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    var values = [
        [ "C 1", "C 2", "C 3" ],
        [ 7, 5, 6 ],
        [ 7, 8, 9 ],
        [ 6, 3, 9 ]
    ];

    sheet.range("A1:C4").values(values);

    var filter = new kendo.spreadsheet.ValueFilter({ values: [ 7 ] });
    var filter2 = new kendo.spreadsheet.ValueFilter({ values: [ 8 ] });

    sheet.range("A1:C4").filter([
      { column: 0, filter: filter },
        { column: 1, filter: filter2 }
    ]);

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(sheet.range("A1:C4").hasFilter());
</script>
```


### input

Gets or sets the value of the cells.  This is similar to `value`, but it parses the argument as if it was entered through the text box:

- if it starts with `=` (equal sign), a *formula* is set.  This may throw an error if the formula is syntactically invalid.  Example: `range("C1").input("=A1+B1")`.
- if it looks like a number, a numeric value (not string) is set.
- if it's `true` or `false` (case-insensitive) the respective boolean value is set.
- if it's a `Date` object, or a string that can be parsed as a date, it is converted to the numerical representation of the date.
- if it starts with `'` (single quote), a string containing the rest of the characters is set.  Example: `range("A1").input("'TRUE")` — sets the *text* "TRUE", not the boolean.

#### Parameters

##### value `String|Number|Date` *optional*

The value to be set to the cells.

#### Returns

`Object` the current value of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A1").input("1");
    sheet.range("A2").input("=A1*2");
</script>
```

### isSortable

Returns if a range can be sorted.

#### Returns

`Boolean` whether the range can be sorted.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    var range = sheet.range("A1:B1");

    if (range.isSortable()) {
        range.sort()
    }
</script>
```

### isFilterable

Returns if a range can be filtered.

#### Returns

`Boolean` whether the range can be filtered.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    var range = sheet.range("A1:B1");

    if (range.isFilterable()) {
        range.filter(true);
    }
</script>
```

### italic

Gets or sets the italic state of the cells in the range.

#### Parameters

##### value `Boolean` *optional*

True will make the text of the cells italic; false otherwise.

#### Returns

`Boolean` the current italic state of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.range("A1").value("italic");
    sheet.range("A1").italic(true);
</script>
```

### link

Gets or sets the hyperlink of the cells in the range.

#### Parameters

##### url `String` *optional*

Pass a string (the URL) to create a hyperlink.  Pass `null` to remove the link.
Omit argument to get the existing URL, if any.

#### Returns

`String` the current hyperlink attribute of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.range("A1").value("Visit telerik.com!");
    sheet.range("A1").link("https://www.telerik.com/");
</script>
```

### merge

Merges the range cells into a single merged cell. If the range already includes a merged cell, they are merged, too.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A1:B2").merge();
</script>
```


### select

Sets the sheet selection to the range cells.

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A1:B2").select();
</script>
```

### sort

Sorts the rows in the range.

#### Parameters

##### sort `Number | Object | Array`

Determines the action performed by the method.

* Passing a number `n` sorts the `n`th column in the range, in ascending order.
* Passing a `{ column: Number, ascending: Boolean }` sorts the respective column in ascending / descending order, based on the ascending parameter. The column index is relative to the beginning of the range.
* Passing an array of `{ column: Number, ascending: Boolean }` objects sorts each column, specified by the index.

#### Example - sort a single column

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    var values = [
        [ 1, 2, 3 ],
        [ 7, 8, 9 ],
        [ 4, 5, 6 ]
    ];

    sheet.range("A1:C3").values(values);

    sheet.range("A1:C3").sort(1);
</script>
```

#### Example - sort a column in descending order

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    var values = [
        [ 1, 2, 3 ],
        [ 7, 8, 9 ],
        [ 4, 5, 6 ]
    ];

    sheet.range("A1:C3").values(values);

    sheet.range("A1:C3").sort({ column: 2, ascending: false });
</script>
```

### textAlign

Gets or sets the text alignment of the cells in the range.

#### Parameters

##### value `String` *optional*

One of the following values: "left", "center", "right" and "justify".

#### Returns

`String` the current text alignment of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.range("A1").value("left");
    sheet.range("A1").textAlign("left");
    sheet.range("A2").value("right");
    sheet.range("A2").textAlign("right");
    sheet.range("A3").value("center");
    sheet.range("A3").textAlign("center");
    sheet.range("A4").value("justify");
    sheet.range("A4").textAlign("justify");
</script>
```

### unmerge

Un-merges any merged cells which are included in the range.

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A1:B2").merge();
    sheet.range("B3:C3").merge();
    sheet.range("A1:D4").unmerge(); // this will unmerge both merged cells.
</script>
```

### values

Gets or sets the values of the range cells. The argument should be an array of arrays which match the dimensions of the range.

> This method clears the formulas on every cell.

#### Parameters

##### values `Array`

The cell values.

#### Returns

`Array` the cell values.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    var values = [
        [ 1, 2, 3 ],
        [ 4, 5, 6 ],
        [ 7, 8, 9 ]
    ];

    sheet.range("A1:C3").values(values);
</script>
```

### validation

Gets or sets the validation of the cells.

#### Parameters

##### value `Object` *optional*

The validation configuration object. It may contain `type`, `comparerType`, `dataType`, `from`, `to`, `allowNulls`, `messageTemplate` and `titleTemplate` keys.

> Setting a validation, which contains references to a range of two or more cells, leads to the adjustment of the validation formula if a relative reference is used. In such cases, use an absolute reference such as `$A$1`.

The `type` Can be set to "warning" or "reject". By default the type is "warning".

The `comparerType` Can be set to "greaterThan", "lessThan", "between", "equalTo", "notEqualTo", "greaterThanOrEqualTo", "lessThanOrEqualTo", "notBetween" or "custom".

The `dataType` Can be set to "date", "text", "number", "list" or "custom".

The `from` This key holds formula or value. Used as first or only compare value depending on specified comparer.

The `to` This key can be set to formula or value. It's optional depending on the specified comparer.

The `allowNulls` Can be set to boolean value.

The `messageTemplate` The message which will be displayed in the "reject" validation window.

The `titleTemplate` The title of the "reject" validation window.

#### Returns

`Object` the current validation of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A1").value(4);
    sheet.range("A1").validation({
        from: "1",
        to: "2",
        comparerType: "between",
        dataType: "number",
        messageTemplate: "Number should match the validation."
    });
</script>
```

### value

Gets or sets the value of the cells.

> If the cell has formula set, the value setting will clear it.

#### Parameters

##### value `String|Number|Date` *optional*

The value to be set to the cells.

#### Returns

`Object` the current value of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A1:B2").value("foo");
</script>
```

### verticalAlign

Gets or sets the vertical alignment of the cells in the range.

#### Parameters

##### value `String` *optional*

One of the following values: "top", "center" and "bottom".

#### Returns

`String` the current text alignment of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">
    $("#spreadsheet").kendoSpreadsheet();
    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    var sheet = spreadsheet.activeSheet();
    sheet.rowHeight(0, 40);
    sheet.rowHeight(1, 40);
    sheet.rowHeight(2, 40);
    sheet.range("A1").value("top");
    sheet.range("A1").verticalAlign("top");
    sheet.range("A2").value("center");
    sheet.range("A2").verticalAlign("center");
    sheet.range("A3").value("bottom");
    sheet.range("A3").verticalAlign("bottom");
</script>
```

### wrap

Gets or sets the wrap of the range cells.

#### Parameters

##### value `Boolean` *optional*

`true` if to enable wrapping, `false` otherwise.

#### Returns

`Boolean` the current wrap state of the top-left cell of the range.

#### Example

```
<div id="spreadsheet"></div>
<script type="text/javascript" charset="utf-8">

    $("#spreadsheet").kendoSpreadsheet();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

    var sheet = spreadsheet.activeSheet();

    sheet.range("A2").value("long long long long long long text");
    sheet.range("A2:B3").wrap(true);
</script>
```
