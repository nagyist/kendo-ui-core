---
title: Use MutationObserver to Add Red Border and Hide the Validator Tooltip
page_title: Use MutationObserver to Add Red Border and Hide the Validator Tooltip
description: "Learn how to use the MutationObserver to add a red border and hide the tooltip in the Kendo UI Validator."
previous_url: /framework/validator/how-to/use-mutation-observer, /controls/editors/validator/how-to/use-mutation-observer
slug: howto_usemutationobserver_addborderandhidetooltip_validator
tags: telerik, kendo, jquery, validator, use, mutationobserver, add, border, hide, tooltip
component: validator
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Validator for jQuery</td>
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

How can I use the `MutationObserver` to add a red border and hide the tooltip in the Kendo UI Validator?

## Solution

Your project might require you to hide the validation tooltip and add borders around `input` elements and widgets that failed to validate.

The following example demonstrates how to achieve this behavior by using a `MutationObserver`.

```dojo
    <style scoped>
      /*hide validation message*/
      .k-tooltip-error {
        visibility: hidden;
        /*or*/
        /*display:none !important;*/
      }
      /*add red border*/
      .k-widget > span.k-invalid,
      input.k-invalid
      {
        border: 1px solid red !important;
      }
      .k-textbox {
        width: 11.8em;
      }
      .demo-section {
        width: 700px;
        font-size: 12px;
      }
      #tickets {
        width: 510px;
        height: 323px;
        margin: 0 auto;
        padding: 10px 20px 20px 170px;
        background: url('https://demos.telerik.com/kendo-ui/content/web/validator/ticketsOnline.png') transparent no-repeat 0 0;
      }
      #tickets h3 {
        font-weight: normal;
        font-size: 1.4em;
        border-bottom: 1px solid #ccc;
        margin: 10px 0 0;
        padding: 0;
      }
      #tickets ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }
      #tickets li {
        margin: 10px 0 0 0;
      }
      label {
        display: inline-block;
        width: 90px;
        text-align: right;
      }
      .required {
        font-weight: bold;
      }
      .accept, .status {
        padding-left: 90px;
      }
      .valid {
        color: green;
      }
      .invalid {
        color: red;
      }
      span.k-tooltip {
        margin-left: 6px;
      }
    </style>
    <div id="example">
      <div class="demo-section k-header">
        <form id="tickets">
          <h3>Book Tickets</h3>
          <ul>
            <li>
              <label for="fullname" class="required">Your Name</label>
              <input type="text" id="fullname" name="fullname" placeholder="Full name" required validationMessage="Enter {0}" style="width: 200px;" />
            </li>
            <li>
              <label for="search" class="required">Movie</label>
              <input type="search" id="search" name="search" required validationMessage="Select movie" style="width: 200px;"/><span class="k-invalid-msg" data-for="search"></span>
            </li>
            <li>
              <label for="time">Start time</label>
              <select name="time" id="time" required data-required-msg="Select start time" style="width: 200px;">
                <option>14:00</option>
                <option>15:30</option>
                <option>17:00</option>
                <option>20:15</option>
              </select>
              <span class="k-invalid-msg" data-for="time"></span>
            </li>
            <li>
              <label for="amount">Amount</label>
              <input id="amount" name="Amount" type="text" min="1" max="10" value="1" required data-max-msg="Enter value between 1 and 10" style="width: 200px;" />
              <span class="k-invalid-msg" data-for="Amount"></span>
            </li>
            <li>
              <label for="email" class="required">Email</label>
              <input type="email" id="email" name="Email" placeholder="e.g. myname@example.net"  required data-email-msg="Email format is not valid" style="width: 200px;" />
            </li>
            <li>
              <label for="tel" class="required">Phone</label>
              <input type="tel" id="tel" name="tel" pattern="\d{10}" placeholder="Please enter a ten digit phone number" required
                     validationMessage="Enter at least ten digits" style="width: 200px;"/>
            </li>
            <li  class="accept">
              <input type="checkbox" name="Accept" required validationMessage="Acceptance is required" /> I accept the terms of service
            </li>
            <li  class="accept">
              <button id="submit" type="submit">Submit</button>
            </li>
            <li class="status">
            </li>
          </ul>
        </form>
      </div>
      <script>
        $(document).ready(function() {
          var data = [
            "12 Angry Men",
            "Il buono, il brutto, il cattivo.",
            "Inception",
            "One Flew Over the Cuckoo's Nest",
            "Pulp Fiction",
            "Schindler's List",
            "The Dark Knight",
            "The Godfather",
            "The Godfather: Part II",
            "The Shawshank Redemption"
          ];
          $("#fullname").kendoTextBox();
          $("#tel").kendoTextBox();
          $("#email").kendoTextBox();
          $("#submit").kendoButton();
          $("#search").kendoAutoComplete({
            dataSource: data,
            separator: ", "
          });
          $("#time").kendoDropDownList({
            optionLabel: "--Start time--"
          });
          $("#amount").kendoNumericTextBox();
          var validator = $("#tickets").kendoValidator().data("kendoValidator"),
              status = $(".status");
          $("form").submit(function(event) {
            event.preventDefault();
            if (validator.validate()) {
              status.text("Hooray! Your tickets has been booked!")
              .removeClass("invalid")
              .addClass("valid");
            } else {
              status.text("Oops! There is invalid data in the form.")
              .removeClass("valid")
              .addClass("invalid");
            }
          });
          /* Bind Mutation Events */
          var elements = $("#tickets").find("[data-role=autocomplete],[data-role=combobox],[data-role=dropdownlist],[data-role=numerictextbox]");
          //correct mutation event detection
          var hasMutationEvents = ("MutationEvent" in window),
              MutationObserver = window.WebKitMutationObserver || window.MutationObserver;
          if (MutationObserver) {
            var observer = new MutationObserver(function (mutations) {
              var idx = 0,
                  mutation,
                  length = mutations.length;
              for (; idx < length; idx++) {
                mutation = mutations[idx];
                if (mutation.attributeName === "class") {
                  updateCssOnPropertyChange(mutation);
                }
              }
            }),
                config = { attributes: true, childList: false, characterData: false };
            elements.each(function () {
              observer.observe(this, config);
            });
          } else if (hasMutationEvents) {
            elements.bind("DOMAttrModified", updateCssOnPropertyChange);
          } else {
            elements.each(function () {
              this.attachEvent("onpropertychange", updateCssOnPropertyChange);
            });
          }
          function updateCssOnPropertyChange (e) {
            var element = $(e.target || e.srcElement);
            element.siblings("span.k-dropdown-wrap")
            .add(element.parent("span.k-numeric-wrap"))
            .toggleClass("k-invalid", element.hasClass("k-invalid"));
          }
        });
      </script>
    </div>
```

## See Also

* [Basic Usage of the Validator (Demo)](https://demos.telerik.com/kendo-ui/validator/index)
* [JavaScript API Reference of the Validator](/api/javascript/ui/validator)
