---
title: Removing the Trial Message
description: I switched from a Trial to Commercial license, but I still see the Trial message. How to remove the trial message?
type: troubleshooting
page_title: Removing the Trial Message
slug: troubleshooting_trial_message
tags: trial, troubleshooting, commercial, license
res_type: kb
---

## Environment

<table>
	<tbody>
        <tr>
			<td>Product</td>
			<td>Progress® Telerik® UI for {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

I switched from a Trial to Commercial license, but I still see the Trial message.

## Solution

>tip  The steps described in this KB article are valid for Telerik UI for {{ site.product_short }} versions up to 2025 Q2. Starting with 2025 Q2, the trial installer is deprecated. You can start a free trial by [using the unified installer]({% slug msi_install_aspnetmvc6_aspnetmvc %})

There are several common reasons for the observed behavior:

* The build is not updated.

    Try clearing the build folders and then building the project/solution once again. If the application has been compiled with the trial version and not recompiled with the commercial version, the trial message might still be displayed.

* A reference to the trial package has remained in the `.csproj` file.

    Inspect the `.csproj` file of the application and make sure that it doesn't contain a reference to the trial version of the {{site.product}} package:

    ```
    <ItemGroup>
        <PackageReference Include="Telerik.UI.for.AspNet.Core.Trial" Version="2021.3.914" />
    </ItemGroup>
    ```

* A reference to the Trial package has been pushed to source control.

    In case you have configured any build/release pipelines while testing the {{site.product}} Trial package, it is possible that a reference to the component library has been pushed to source control and is being used for rebuilding the project.

## Getting Started with {{ site.product }}

* [First steps on Visual Studio for Windows (online guide)]({% slug gettingstarted_project_template %})
* [First steps with CLI (online guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})

## More {{ site.framework }} Resources

* [{{ site.product }} Documentation]({%slug overview_aspnetmvc6_aspnetmvc%})

* [{{ site.product }} Demos](https://demos.telerik.com/{{ site.platform }})

{% if site.core %}
* [{{ site.product }} Product Page](https://www.telerik.com/aspnet-core-ui/dropdownlist)

* [{{ site.product }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.product }} Product Page](https://www.telerik.com/aspnet-mvc)

* [{{ site.product }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
