---
title: Wai-Aria Support
page_title: jQuery Popup Documentation | Popup Accessibility
description: "Get started with the jQuery Popup by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["popup"]
slug: jquery_popup_accessibility
position: 1
---

# Popup Accessibility

The Popup is accessible by screen readers and provides WAI-ARIA, Section 508, and WCAG 2.2 support.

For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}).

Out of the box, the Kendo UI for jQuery Popup provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The Popup is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the keyboard navigation for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

The Popup is a utility component that positions content next to a specific anchor element. As a container component, it delegates the majority of accessibility responsibilities to the consuming component or developer.

> The Popup provides the positioning and visibility mechanics for overlay content. When integrating the Popup into custom scenarios, developers are responsible for applying the appropriate ARIA attributes to the popup content to ensure an accessible experience. The consuming component should set `role`, `aria-label`, `aria-expanded`, and any other required attributes based on the popup usage pattern (dialog, menu, listbox, etc.).

## Section 508

The Popup is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing

The Popup has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The Popup has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

### Automated Testing

The Popup has been tested with [axe-core](https://github.com/dequelabs/axe-core).

## See Also

* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)
