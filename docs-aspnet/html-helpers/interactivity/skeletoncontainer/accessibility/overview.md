---
title: Overview
page_title: SkeletonContainer Documentation | SkeletonContainer Accessibility
description: "Get started with the {{ site.product }} SkeletonContainer and learn about its accessibility support for WAI-ARIA, Section 508, and WCAG 2.2."
components: ["skeletoncontainer"]
slug: htmlhelpers_skeletoncontainer_accessibility
position: 1
---

# SkeletonContainer Accessibility

Out of the box, the {{ site.product }} SkeletonContainer provides extensive accessibility support and enables users with disabilities to acquire complete control over its features.

The SkeletonContainer is compliant with the [Web Content Accessibility Guidelines (WCAG) 2.2 AAA](https://www.w3.org/TR/WCAG22/) standards and [Section 508](https://www.section508.gov/) requirements, follows the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/ARIA/apg/) best practices for implementing the keyboard navigation for its `component` role, provides options for managing its focus and is tested against the most popular screen readers.

## WAI-ARIA

This section lists the selectors, attributes, and behavior patterns supported by the component and its composite elements, if any.

The SkeletonContainer component does not have accessibility on its own as it is only a visual indicator and should be integrated within an element that refers to the loading state. When integrated on a page, you might:

* Use `aria-busy` attribute to illustrate that the focusable element is loading.
* Use `role="alert"` to announce the loading.

## Section 508

The SkeletonContainer is fully compliant with the [Section 508 requirements](http://www.section508.gov/).

## Testing

The SkeletonContainer has been extensively tested automatically with [axe-core](https://github.com/dequelabs/axe-core) and manually with the most popular screen readers.

> To report any accessibility issues, contact the team through the [Telerik Support System](https://www.telerik.com/account/support-center).

### Screen Readers

The SkeletonContainer has been tested with the following screen readers and browsers combinations:

| Environment | Tool |
| ----------- | ---- |
| Firefox | NVDA |
| Chrome | JAWS |
| Microsoft Edge | JAWS |

## See Also

* [Accessibility in {{ site.product }}]({%slug overview_accessibility%})
