---
title: Wai-Aria Support
page_title: jQuery SmartPasteButton Documentation | SmartPasteButton Accessibility
description: "Get started with the jQuery SmartPasteButton by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["smartpastebutton"]
slug: jquery_smartpastebutton_accessibility
position: 1
---

# SmartPasteButton Accessibility

The SmartPasteButton is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

For more information, refer to:
* [Keyboard navigation by the Kendo UI SmartPasteButton]({% slug keynav_smartpastebutton %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})

Out of the box, the Kendo UI for jQuery SmartPasteButton provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The SmartPasteButton is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

The SmartPasteButton implements the specification for the Button component.

[Button accessibility specification]({% slug jquery_button_accessibility %})

## Resources

[WAI-ARIA Authoring Practices: Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)

## Section 508

The SmartPasteButton is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing

The SmartPasteButton has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The SmartPasteButton has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

### Automated Testing

The SmartPasteButton has been tested with [axe-core](https://github.com/dequelabs/axe-core).

## See Also

* [Keyboard Navigation by the SmartPasteButton]({% slug keynav_smartpastebutton %})
* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)
