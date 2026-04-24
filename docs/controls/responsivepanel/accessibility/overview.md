---
title: Wai-Aria Support
page_title: jQuery ResponsivePanel Documentation | ResponsivePanel Accessibility
description: "Get started with the jQuery ResponsivePanel by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["responsivepanel"]
slug: jquery_responsivepanel_accessibility
position: 1
---

# ResponsivePanel Accessibility

The ResponsivePanel is accessible by screen readers and provides WAI-ARIA, Section 508, and WCAG 2.2 support.

For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}).

Out of the box, the Kendo UI for jQuery ResponsivePanel provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The ResponsivePanel is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the keyboard navigation for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

The ResponsivePanel is a layout component that renders its content in a collapsible panel on smaller screens. It relies on the `role` attribute and accessible labels to convey its meaning to assistive technologies.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-rpanel` | `role=navigation` or `aria-label` | The ResponsivePanel should be identified as a navigation landmark when it contains navigation elements. |

> The ResponsivePanel provides responsive layout mechanics. When integrating content into the panel, developers should apply the appropriate ARIA attributes to the panel content to ensure an accessible experience.

## Section 508

The ResponsivePanel is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing

The ResponsivePanel has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The ResponsivePanel has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

### Automated Testing

The ResponsivePanel has been tested with [axe-core](https://github.com/dequelabs/axe-core).

## See Also

* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)
