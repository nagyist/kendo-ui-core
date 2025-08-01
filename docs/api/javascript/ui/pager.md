---
title: Pager
page_title: Configuration, methods and events of Kendo UI Pager
description: 'Configuration steps for the Pager widget and methods for different actions: return number of pages, page size, specified page, update all values.'
res_type: api
---

# kendo.ui.Pager

Represents the Kendo UI Pager widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### adaptiveMode `String`*(default: "none")*
Specifies a value whether the page sizes dropdown will be adaptive. Possible values are:

* `none` - The pager will not be adaptive.
* `auto` - The page sizes dropdown will be adaptive and on small devices an action sheet will be displayed.

#### Example - setting the adaptiveMode property
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
            data: [
                { productName: "Tea", category: "Beverages" },
                { productName: "Coffee", category: "Beverages" },
                { productName: "Ham", category: "Food" },
                { productName: "Bread", category: "Food" }
            ],
            pageSize: 25
          });

        dataSource.read();

        $("#pager").kendoPager({
          adaptiveMode: "auto",
          dataSource: dataSource
        });
    </script>
    <style>
      #pager{
       margin-top: 100px;
      }
    </style>

### ARIATemplate `String`*(default: "Page navigation, page #=page# of #=totalPages#")*
Specifies a template used to populate the value of the aria-label attribute of the pager element.The parameters available for the template are:

* `page` - The current page.
* `totalPages` - The total number of pages.

#### Example - setting the aria-label of the pager element
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
            data: [
                { productName: "Tea", category: "Beverages" },
                { productName: "Coffee", category: "Beverages" },
                { productName: "Ham", category: "Food" },
                { productName: "Bread", category: "Food" }
            ],
            pageSize: 25
          });

        dataSource.read();

        $("#pager").kendoPager({
          ARIATemplate: "Current page is #=page#",
          dataSource: dataSource
        });
    </script>
    <style>
      #pager{
       margin-top: 100px;
      }
    </style>

### autoBind `Boolean`*(default: true)*
Indicates whether the pager refresh method will be called within its initialization.

#### Example - disable reading the state of the DataSource instance during initialization
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
            data: [
                { productName: "Tea", category: "Beverages" },
                { productName: "Coffee", category: "Beverages" },
                { productName: "Ham", category: "Food" },
                { productName: "Bread", category: "Food" }
            ],
            pageSize: 25
          });

        dataSource.read();

        $("#pager").kendoPager({
          autoBind: false,
          dataSource: dataSource
        });
    </script>
    <style>
      #pager{
       margin-top: 100px;
      }
    </style>

### buttonCount `Number`*(default: 10)*
Defines the number of buttons displayed in the numeric pager.

#### Example - set button count
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });


        $("#pager").kendoPager({
          dataSource: dataSource,
          buttonCount: 1
        });

        dataSource.read();
    </script>
    <style>
        #pager {
  	      margin-top: 100px;
        }
    </style>

### dataSource `Object|kendo.data.DataSource`
Instance of kendo DataSource. See the [**kendo.data.DataSource**](/api/javascript/data/datasource).

This option is mandatory because the Pager is tightly connected with DataSource. The pager is UI widget for managing paging over the DataSource. The Pager gets values like page size or total count of items from DataSource.

#### Example - standalone pager
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
            data: [
                { productName: "Tea", category: "Beverages" },
                { productName: "Coffee", category: "Beverages" },
                { productName: "Ham", category: "Food" },
                { productName: "Bread", category: "Food" }
            ],
            pageSize: 2
        });

        $("#pager").kendoPager({
            dataSource: dataSource,
            pageSizes: [10, 25, 50]
        });

        dataSource.read();
    </script>
    <style>
        #pager {
  	      margin-top: 100px;
        }
    </style>

If the Pager is used with another widget then we usually specify this Pager like object of options for given widget. In that case the DataSource is automatically injected to the Pager from the widget. See example for a Grid below.

#### Example - grid pager
    <div id="grid"></div>

    <script>
        $("#grid").kendoGrid({
          columns: [
            { field: "productName" },
            { field: "category" }
          ],
          dataSource: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageable: {
            // we don't set any DataSource here
            pageSize: 2,
            buttonCount: 1
          }
        });
    </script>

### selectTemplate `String`
The template for selected page number link.

#### Example - declare custom template for the selected page number
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          selectTemplate: '<li class="k-link"><span style="color:red">#=text#</span></li>'
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### linkTemplate `String`
The template for page number links.

#### Example - declare custom link Template
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          linkTemplate: '<li><a href="\\#" class="k-link" data-#=ns#page="#=idx#"><strong>#=text#</strong></a></li>'
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### info `Boolean`*(default: true)*
Defines if a label showing current paging information will be displayed.

#### Example - hide the paging information

    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          info: false
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### input `Boolean`*(default: false)*
Defines if an input element which allows the user to navigate to given page will be displayed. If enabled only the numeric input will be rendered in the numeric portion of the pager.

#### Example - show the navigate-to-page input

    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          input: true,
          numeric: true
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### numeric `Boolean`*(default: true)*
Defines if numeric portion of the pager will be shown.

#### Example - hides the numeric page links
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          numeric: false
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>


### pageSizes `Boolean|Array` *(default: false)*
If set to `true` the pager will display a drop-down which allows the user to pick a page size.
By default the page size drop-down is not displayed.

Can be set to an array of predefined page sizes to override the default list.
A special `all` value is supported. It sets the page size to the total number of records.

If a `pageSize` setting is provided for the data source then this value will be selected initially.

#### Example - show the page size drop-down with default values
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          pageSizes: true
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

#### Example - show the page size drop-down with custom values
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          pageSizes: [2, 3, 4, "all"]
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>


### previousNext `Boolean`*(default: true)*
Defines if buttons for navigating to the first, last, previous and next pages will be shown.

#### Example - hide the first, last, previous and next buttons
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          previousNext: false
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### refresh `Boolean`*(default: false)*
Defines if a refresh button will be displayed. Click on that button will call DataSource read() method to get actual data.

#### Example - show the refresh button
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          refresh: true
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### responsive `Boolean`*(default: true)*
Defines if the pager will be responsive.

#### Example - show the responsive button
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          responsive: false
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### messages `Object`
Defines texts shown within the pager. Use this option to customize or localize the pager messages.

### messages.display `String`*(default: "{0} - {1} of {2} items")*
The pager info text. Uses [kendo.format](/api/javascript/kendo/methods/format).

Contains three placeholders:
- {0} - the first data item index
- {1} - the last data item index
- {2} - the total number of data items

#### Example - set the "display" message
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          messages: {
            display: "Showing {0}-{1} from {2} data items"
          }
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### messages.empty `String`*(default: "No items to display")*,
The text displayed when the DataSource view does no contain items.

#### Example - set the "empty" message
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          messages: {
            empty: "No data"
          }
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### messages.allPages `String`*(default: "All")*,
The text displayed for the item that represents the allPages option when allPages is enabled.

#### Example - set the label before the pager input
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          numeric: false,
          pageSizes: [ 2, 3, 'all'],
          messages: {
            allPages: "See All"
          }
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>


### messages.page `String`*(default: "Page")*,
The label displayed before the pager input.

#### Example - set the label before the pager input
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          input: true,
          numeric: true,
          messages: {
            page: "Enter page"
          }
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### messages.pageButtonLabel `String`*(default: "Page {0}")*,
The title of the numeric link page buttons of the **Pager**. The parameters available for the template are:

* `page` - The page that will becomes selected when clicking the button.

#### Example - set the label before the pager input
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          input: true,
          messages: {
            pageButtonLabel: "This is page {0}"
          }
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### messages.pageSizeDropDownLabel `String`*(default: "Page sizes drop down")*

The label applied to the page size DropDownList.

#### Example
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          input: true,
          numeric: true,
          messages: {
            pageSizeDropDownLabel: "page size"
          },
          pageSizes: [1, 2, 5]
        });

        dataSource.read();
    </script>

### messages.of `String`*(default: "of {0}")*,
The label displayed before the pager input. Uses [kendo.format](/api/javascript/kendo/methods/format). Contains one optional placeholder {0} which represents the total number of pages.

#### Example - set the label after the pager input
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          input: true,
          numeric: true,
          messages: {
            of: "from {0}"
          }
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### messages.itemsPerPage `String`*(default: "items per page")*,
The label displayed after the page size DropDownList.

#### Example - set the label after the page size DropDownList
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          pageSizes: true,
          numeric:false,
          messages: {
            itemsPerPage: "data items per page"
          }
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### messages.first `String`*(default: "Go to the first page")*,
The tooltip of the button which navigates to the first page.

#### Example - set the tooltip of the first page button
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2,
          page: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          messages: {
            first: "First Page"
          }
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### messages.previous `String`*(default: "Go to the previous page")*,
The tooltip of the button which navigates to the previous page.

#### Example - set the tooltip of the previous page button
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2,
          page: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          messages: {
            previous: "Previous Page"
          }
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### messages.next `String`*(default: "Go to the next page")*,
The tooltip of the button which navigates to the next page.

#### Example - set the tooltip of the next page button
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          messages: {
            next: "Next Page"
          }
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### messages.last `String`*(default: "Go to the last page")*,
The tooltip of the button which navigates to the last page.

#### Example - set the tooltip of the last page button
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          messages: {
            last: "Last Page"
          }
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### messages.refresh `String`*(default: "Refresh")*,
The tooltip of the refresh button.

#### Example - set the tooltip of the refresh button
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          messages: {
            refresh: "Refresh data"
          },
          refresh: true
        });

        dataSource.read();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### navigatable `Boolean`*(default: false)*
If set to `true` the user could navigate the widget using the keyboard navigation. By default keyboard navigation is disabled.

#### Example - enable keyboard navigation
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
            data: [
                { productName: "Tea", category: "Beverages" },
                { productName: "Coffee", category: "Beverages" },
                { productName: "Ham", category: "Food" },
                { productName: "Bread", category: "Food" },
                { productName: "Potatoes", category: "Food" },
                { productName: "Rice", category: "Food" },
                { productName: "Tomatoes", category: "Food" },
                { productName: "Carrots", category: "Food" }
            ],
            pageSize: 2
          });

        dataSource.read();

        $("#pager").kendoPager({
          dataSource: dataSource,
          navigatable: true
        });
    </script>
    <style>
      #pager{
       margin-top: 100px;
      }
    </style>

### size `String`*(default: "medium")*

Sets a value controlling size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"

#### Example - sets a size

    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        $("#pager").kendoPager({
          dataSource: dataSource,
          size: "small",
          refresh: true
        });

        dataSource.read();
    </script>

## Methods

### totalPages

Returns the number of pages.

#### Example - get the total number of pages
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        dataSource.read();

        var pager = $("#pager").kendoPager({
          dataSource: dataSource
        }).data("kendoPager");

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(pager.totalPages()); // displays "2"
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

#### Returns

`Number` The number of pages.

### pageSize

Returns the page size - maximum number of items allowed on one page.

#### Example - get the page size
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        dataSource.read();

        var pager = $("#pager").kendoPager({
          dataSource: dataSource
        }).data("kendoPager");

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(pager.pageSize()); // displays "2"
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

#### Returns

`Number` The maximum number of items allowed on one page.

### page

Gets or sets the current page.

#### Example - get current page
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        dataSource.read();

        var pager = $("#pager").kendoPager({
          dataSource: dataSource
        }).data("kendoPager");

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(pager.page()); // displays "1"
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

#### Example - set current page
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        dataSource.read();

        var pager = $("#pager").kendoPager({
          dataSource: dataSource
        }).data("kendoPager");

        pager.page(2);
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

#### Parameters

##### page `Number`

The new page number.

#### Returns

`Number` The current page number.

### refresh

Updates all values of pager elements so that these values fit the values of DataSource. This method is automatically called after DataSource change event is fired.

#### Example - refresh the pager
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        dataSource.read();

        var pager = $("#pager").kendoPager({
          dataSource: dataSource
        }).data("kendoPager");

        pager.refresh();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

### destroy

Unbinds all callbacks created within pager initialization. This method doesn't remove pager element from DOM.

> This method does not remove the widget element from DOM.

#### Example - destroy pager
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        dataSource.read();

        var pager = $("#pager").kendoPager({
          dataSource: dataSource
        }).data("kendoPager");

        pager.destroy();
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

## Events

### change
Fires when the current page has changed.

#### Event Data

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization
    <div id="pager"></div>

    <script>
        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        dataSource.read();

        $("#pager").kendoPager({
          dataSource: dataSource,
          change: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("pager change event");
          }
        });
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>

#### Example - subscribe to the "change" event after initialization
    <div id="pager"></div>

    <script>
        function pager_change() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("pager change event");
        }

        var dataSource = new kendo.data.DataSource({
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
          ],
          pageSize: 2
        });

        dataSource.read();

        var pager = $("#pager").kendoPager({
          dataSource: dataSource
        }).data("kendoPager");

        pager.bind("change", pager_change);
    </script>
    <style>
      #pager {
       margin-top: 100px;
      }
    </style>
