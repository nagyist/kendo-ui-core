---
title: Overview
page_title: SmartPasteButton Documentation | SmartPasteButton Accessibility
description: "Get started with the {{ site.product }} SmartPasteButton and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["smartpastebutton"]
slug: htmlhelpers_smartpastebutton_accessibility
position: 1
---

# SmartPasteButton Accessibility

Out of the box, the {{ site.product }} SmartPasteButton provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The SmartPasteButton is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the [keyboard navigation](#keyboard-navigation) for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

The SmartPasteButton implements the specification for the Button component.

[Button accessibility specification]({% slug htmlhelpers_button_accessibility %})

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

## See Also

* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})
