---
title: Overview
page_title: TabStrip Documentation | TabStrip Accessibility
description: "Get started with the {{ site.product }} TabStrip and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
slug: htmlhelpers_tabstrip_accessibility
position: 1
---

# TabStrip Accessibility





Out of the box, the {{ site.product }} TabStrip provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.


The TabStrip is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA


This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-tabstrip-items` | `role=tablist` | Indicates the tablist role for the ul element of the TabStrip. |
| `.k-tabstrip.k-tabstrip-left .k-tabstrip-items,.k-tabstrip.k-tabstrip-right .k-tabstrip-items` | `aria-orientation=vertical` | Indicates the orientation of the tablist container element. The attribute is rendered only when the orientation of the component is vertical as the `tablist` role comes with default horizontal orientation. |
| `.k-tabstrip-item` | `role=tab` | The tab `li` element. |
| `.k-tabstrip .k-item.k-active` | `aria-selected=true` | Announces the selected state of the tab. |
|  | `aria-controls=.k-tabstrip-content id` | Announces the relation between the panel and active tab. |
| `.k-tabstrip-content` | `role=tabpanel` | The content `div` of the tab. |
|  | `aria-hidden=true` | Only if the component implements a feature to control whether the content should be persisted. |
|  | `aria-labelledby=.k-tabstrip-item id` | Refers to the tab element that controls the panel. |
| `.k-tabstrip .k-button` | `aria-hidden=true` | Introduce aria-hidden attribute for the scrollable buttons. The buttons are not included in the tabsequence. Navigating through arrow keys would |

## Resources

[WAI-ARIA specification for tablist](https://www.w3.org/TR/wai-aria-1.2/#tablist)

[WAI-ARIA practices: TabList example](https://www.w3.org/WAI/ARIA/apg/example-index/tabs/tabs-automatic.html)

## Section 508


The TabStrip is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing


The TabStrip has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers


The TabStrip has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |



### Test Example

To test the TabStrip component, refer to the [TabStrip Accessibility Demo](https://demos.telerik.com/{{ site.platform }}/accessibility/tabstrip).

## Keyboard Navigation

For details on how the TabStrip keyboard navigation works, refer to the [TabStrip Keyboard Navigation]({%slug keynav_aspnetcore_tabstrip%}) article.

## See Also

* [Keyboard Navigation by the TabStrip for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tabstrip/keyboard-navigation)
* [Keyboard Navigation by the TabStrip for {{ site.framework }}]({% slug keynav_aspnetcore_tabstrip %})
* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})