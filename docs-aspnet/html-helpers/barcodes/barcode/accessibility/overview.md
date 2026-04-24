---
title: Overview
page_title: Barcode Documentation | Barcode Accessibility
description: "Get started with the {{ site.product }} Barcode and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["barcode"]
slug: htmlhelpers_barcode_accessibility
position: 1
---

# Barcode Accessibility

Out of the box, the {{ site.product }} Barcode provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The Barcode is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the keyboard navigation for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

The Barcode component renders an SVG or Canvas element representing a barcode. It relies on the `role` attribute and accessible labels to convey its meaning to assistive technologies.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-barcode` | `role=img` | The Barcode element serves as a visual representation of data. |
|  | `aria-label` or `aria-labelledby` | The Barcode needs an accessible name to be assigned to it. Must describe the purpose of the barcode and its encoded value. |

## Section 508

The Barcode is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing

The Barcode has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The Barcode has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

## See Also

* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})
