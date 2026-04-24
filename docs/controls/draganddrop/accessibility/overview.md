---
title: Wai-Aria Support
page_title: jQuery Drag and Drop Documentation | Drag and Drop Accessibility
description: "Get started with the jQuery Drag and Drop by Kendo UI and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["draganddrop"]
slug: jquery_draganddrop_accessibility
position: 1
---

# Drag and Drop Accessibility

The Drag and Drop is accessible by screen readers and provides WAI-ARIA, Section 508, and WCAG 2.2 support.

For more information, refer to [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}).

Out of the box, the Kendo UI for jQuery Drag and Drop provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The Drag and Drop is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the keyboard navigation for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

The Drag and Drop component provides `kendoDraggable` and `kendoDropTarget` controls. As framework-level primitives, they delegate the majority of accessibility responsibilities to the consuming component or developer.

| Selector | Attribute | Usage |
| -------- | --------- | ----- |
| `.k-drag-clue` | `aria-grabbed=true` | The drag hint element that follows the pointer during a drag operation should indicate it is being grabbed. |
| Draggable element | `aria-roledescription` | Developers should provide a concise, localized description of the draggable role (for example, `draggable item`). |
| Drop target element | `aria-dropeffect` | Developers should set the appropriate drop effect (`move`, `copy`, `link`, or `none`) on the drop target to communicate the intended action to assistive technologies. |

> The Drag and Drop framework provides the low-level mechanics for drag interactions. When integrating Drag and Drop into custom scenarios, developers are responsible for applying the appropriate ARIA attributes to draggable and drop-target elements to ensure an accessible experience.

## Section 508

The Drag and Drop is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing

The Drag and Drop has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The Drag and Drop has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

### Automated Testing

The Drag and Drop has been tested with [axe-core](https://github.com/dequelabs/axe-core).

## See Also

* [Accessibility in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %})
* [Keyboard Support in Kendo UI for jQuery]({%slug overview_accessibility_support_kendoui%}#keyboard-navigation)
