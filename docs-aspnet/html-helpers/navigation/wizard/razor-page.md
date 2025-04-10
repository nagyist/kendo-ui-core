---
title:  Razor Pages
page_title: Razor Pages
description: "Learn how to use the Telerik UI Wizard component for {{ site.framework }} in a Razor Pages application."
slug: htmlhelpers_wizard_razorpage_aspnetcore
position: 6
---

# Wizard in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Wizard for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Wizard component in a Razor Pages scenario.

## Standard Submit

By default, clicking on the Done button will fire the client-side validation of the Form integrated in the Wizard component. However, in order to prevent the user to select a different step in case the client-side validation fails, the respective fields should be marked with a required attribute. Once all of the fields are filled and the user clicks on the Done button the data will be submitted and the page will reload to display the server validation messages from the page model, if any. 

As POST request will be sent to the server antiforgery token needs to be added. This can be achieved, for example, by appending a hidden input to the Form.

See the implementation details in the example below, and for the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```HtmlHelper
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @{
        var token = Xsrf.GetAndStoreTokens(HttpContext).RequestToken;
    }    

    @(Html.Kendo().Wizard()
        .Name("wizard")
        .Tag("form")
        .Events(ev => ev.Done("onDone"))
        .HtmlAttributes(new { url = @Url.Page("WizardIndex"), method = "POST" })
        .Steps(s =>
        {
            s.Add<WizardIndexModel.UserModel>()
            .Title("Account Details")
                .Form(f => f
                    .Validatable(v =>
                    {
                        v.ValidateOnBlur(true);
                        v.ValidationSummary(vs => vs.Enable(false));
                    })
                    .FormData(Model.UserViewModel)
                    .Items(items =>
                    {
                        items.Add().Field(p => p.AccountDetails.Username)
							.Label(l => l.Text("Username:"))
							.InputHtmlAttributes(new { required = "required" });
                        items.Add().Field(p => p.AccountDetails.Email)
							.Label(l => l.Text("Email:"))
							.InputHtmlAttributes(new { required = "required" });
                        items.Add().Field(p => p.AccountDetails.Password)
							.Label(l => l.Text("Password:"))
							.InputHtmlAttributes(new { @type = "password", required = "required" })
							.Hint("Hint: enter alphanumeric characters only.");
                    })
                )
                .Buttons(b =>
                {
                    b.Next();
                });

            s.Add<WizardIndexModel.UserModel>()
                .Title("Personal details")
                .Form(f => f
                    .Validatable(v =>
                    {
                        v.ValidateOnBlur(true);
                        v.ValidationSummary(vs => vs.Enable(false));
                    })
                    .FormData(Model.UserViewModel)
                    .Items(items =>
                    {
                        items.Add().Field(p => p.PersonalDetails.FullName)
							.Label(l => l.Text("Full Name:"))
							.InputHtmlAttributes(new { required = "required" });                        

                        items.Add()
                            .Field(p => p.PersonalDetails.About)
                            .Label(l => l.Text("About:").Optional(true));
                    })
                )
                .Buttons(b =>
                {
                    b.Previous();
                    b.Next();
                });

            s.Add().Content("<h3>Click on the \"Done\" button to complete your registration.</h3>");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-wizard name="wizard"
                on-done="onDone">
        <wizard-steps>
            <wizard-step title="Account Details">
                <wizard-step-form form-data="@Model.UserViewModel">
                    <validatable validate-on-blur="true"
                                validation-summary="false" />
                    <form-items>
                        <form-item field="AccountDetails.Username">
                            <item-label text="Username:" />
                            <textbox-editor required="required">
                            </textbox-editor>
                        </form-item>
                        <form-item field="AccountDetails.Email">
                            <item-label text="Email:" />
                            <textbox-editor required="required">
                            </textbox-editor>
                        </form-item>
                        <form-item field="AccountDetails.Password"
                                hint="Hint: enter alphanumeric characters only.">
                            <item-label text="Password:" />
                            <textbox-editor required="required" type="password">
                            </textbox-editor>
                        </form-item>
                    </form-items>
                </wizard-step-form>
                <wizard-step-buttons>
                    <wizard-step-button name="next"
                                        text="Next">
                    </wizard-step-button>
                </wizard-step-buttons>
            </wizard-step>
            <wizard-step title="Personal details">
                <wizard-step-form form-data="Model.UserViewModel">
                    <validatable validate-on-blur="true"
                                validation-summary="false" />
                    <form-items>
                        <form-item field="PersonalDetails.FullName">
                            <item-label text="Full Name:" />
                            <textbox-editor required="required">
                            </textbox-editor>
                        </form-item>
                        <form-item field="PersonalDetails.About">
                            <item-label text="About:" optional="true" />
                        </form-item>
                    </form-items>
                </wizard-step-form>
                <wizard-step-buttons>
                    <wizard-step-button text="Previous"
                                        name="previous">
                    </wizard-step-button>
                    <wizard-step-button text="Next"
                                        name="next">
                    </wizard-step-button>
                </wizard-step-buttons>
            </wizard-step>
            <wizard-step>
                <wizard-step-content>
                    <h3>Click on the "Done" button to complete the process.</h3>
                </wizard-step-content>
                <wizard-step-buttons>
                    <wizard-step-button name="done"
                                        text="Done">
                    </wizard-step-button>
                </wizard-step-buttons>
            </wizard-step>
        </wizard-steps>
    </kendo-wizard>
```
{% endif %}
```JS script
    <script>
        function onDone(e) {        
            $("#wizard").append($("<input type='hidden' name='__RequestVerificationToken' value='@token' data-stop='true' />"))
        }
    </script>
```
```C# PageModel

    [BindProperty]
    public UserModel UserViewModel { get; set; }

    public void OnGet()
    {
        
         UserViewModel = new UserModel() 
         { 
             AccountDetails = new Account(),
             PersonalDetails = new Person()
         };
    }

    public IActionResult OnPost()
    {
        var model = Request.Form;
        
        if (!ModelState.IsValid)
        {
            return Page();
        }
        return RedirectToPage("Success");
    }
```

## Submitting the Wizard with Ajax

When the Wizard is submitted with ajax, the default done event of the component is prevented, thus forcing the manual implementation of the submit behavior. In this case, an ajax request is sent to a specific end-point on Done button click. However, for server validation, as the page is not reloaded and the page model data is not changed, the Telerik Validator attached to the integrated Form has no way of knowing what the server response is. For this reason, the ajax request callback can be used to notify the user of the status of the server validation. If the server end-point is returning validation errors related to the fields the error callback can be used to iterate over the response errors and create a visual representation in the UI. In a similar way the success callback can be used to notify the user of a succesful Form submission.

See the implementation details in the example below, where the JSON errors are appended to the validation summary and it is toggled it in the ajax success and error callbacks. For the full project with RazorPages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```HtmlHelper
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <div id="validation-success"></div>
    <div id="validation-error">
        <ul></ul>
    </div>

    @(Html.Kendo().Wizard()
        .Name("wizard-ajax")
        .Tag("form")
        .Events(ev => ev.Done("onDone"))
        .HtmlAttributes(new { url = @Url.Page("WizardAjaxSubmit"), method = "POST" })
        .Steps(s =>
        {
            s.Add<UserViewModel>()
            .Title("Main information ")
                .Form(f => f
                    .Validatable(v =>
                    {
                        v.ValidateOnBlur(true);
                        v.ValidationSummary(vs => vs.Enable(false));
                    })
                    .FormData(Model.User)
                    .Items(items =>
                    {
                        items.Add().Field(p => p.UserId)
                            .Label(l => l.Text("User ID:"))
                            .Editor(f => f.NumericTextBox()
                                .RestrictDecimals(true)
                                .Min(0)
                                .Format("n0")
                                .Decimals(0));
                        items.Add().Field(p => p.Name).Label(l => l.Text("Name:"));
                    })
                )
                .Buttons(b =>
                {
                    b.Next();
                });

            s.Add<UserViewModel>()
                .Title("User details")
                .Form(f => f
                    .Validatable(v =>
                    {
                        v.ValidateOnBlur(true);
                        v.ValidationSummary(vs => vs.Enable(false));
                    })
                    .FormData(Model.User)
                    .Items(items =>
                    {
                        items.Add().Field(p => p.BirthDate).Label(l => l.Text("Birth Date:"))
                             .Editor(e => e.DatePicker().Format("{0:dd-MM-yyyy}")); 
                    })
                )
                .Buttons(b =>
                {
                    b.Previous();
                    b.Next();
                });

            s.Add().Content("<h3>Click on the \"Done\" button to complete the process.</h3>");
        })
    )
```
```TagHelper
@addTagHelper *,Kendo.Mvc

    <kendo-wizard name="wizard-ajax"
                on-done="onDone">
        <wizard-steps>
            <wizard-step title="Main information">
                <wizard-step-form form-data="@Model.User">
                    <validatable validate-on-blur="true"
                                validation-summary="false"/>
                    <form-items>
                        <form-item field="UserId">
                            <item-label text="User ID:"/>
                            <numerictextbox-editor restrict-decimals="true"
                                                min="0"
                                                format="n0"
                                                decimals="0">
                            </numerictextbox-editor>
                        </form-item>
                        <form-item field="Name">
                            <item-label text="Name:"/>
                        </form-item>
                    </form-items>
                </wizard-step-form>
                <wizard-step-buttons>
                    <wizard-step-button name="next"
                                        text="Next">
                    </wizard-step-button>
                </wizard-step-buttons>
            </wizard-step>
            <wizard-step title="User details">
                <wizard-step-form form-data="Model.User">
                    <validatable validate-on-blur="true"
                                validation-summary="false"/>
                    <form-items>
                        <form-item field="BirthDate">
                            <item-label text="Birth Date:"/>
                            <datepicker-editor format="{0:dd-MM-yyyy}"/>
                        </form-item>
                    </form-items>
                </wizard-step-form>
                <wizard-step-buttons>
                    <wizard-step-button text="Previous"
                                        name="previous">
                    </wizard-step-button>
                    <wizard-step-button text="Next"
                                        name="next">
                    </wizard-step-button>
                </wizard-step-buttons>
            </wizard-step>
            <wizard-step>
                <wizard-step-content>
                    <h3>Click on the "Done" button to complete the process.</h3>
                </wizard-step-content>
                <wizard-step-buttons>
                    <wizard-step-button name="done"
                                        text="Done">
                    </wizard-step-button>
                </wizard-step-buttons>
            </wizard-step>
        </wizard-steps>
    </kendo-wizard>
```
```JS script.js
    <script>
        function onDone(e) {
            e.originalEvent.preventDefault();            
           
            $.ajax({
                type: 'POST',
                url: "@Url.Page("WizardAjaxSubmit", "Submit")",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("RequestVerificationToken",
                        $('input:hidden[name="__RequestVerificationToken"]').val());
                },
                data: form.serialize(),
                success: function (data) {
                    $("#validation-success").html("<div class='k-messagebox k-messagebox-success'>" + data.success + "</div>");
                    $("#validation-error").find("ul").empty();
                },
                error: function (data) {
                    var response = JSON.parse(data.responseText);
                    var errorString = "";
                    $.each(response.errors, function (key, value) {
                        errorString += '<li class="k-messagebox k-messagebox-error">' + value + '</li>';
                    });
                    $("#validation-success").html("");
                    $("#validation-error").find("ul").empty();
                    $("#validation-error").find("ul").append(errorString);
                }
            });
        }
    </script>
```
```C# PageModel
    [BindProperty]
    public UserViewModel User { get; set; }
    public void OnGet()
    {
        if (User == null)
        {
            User = new UserViewModel();
        }
    }
    public IActionResult OnPostSubmit(UserViewModel model)
    {
        if (!ModelState.IsValid)
        {
            var errorList = (from item in ModelState
                             where item.Value.Errors.Any()
                             select item).ToDictionary(
                                kvp => kvp.Key,
                                kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).FirstOrDefault()
                            );
            Response.StatusCode = 400;
            return new JsonResult(new { errors = errorList });
        }
        return new JsonResult(new { success = "Data Posted Successfully" });
    }
```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Wizard](https://docs.telerik.com/kendo-ui/api/javascript/ui/wizard)
* [Server-Side HtmlHelper API of the Wizard](/api/wizard)
* [Server-Side TagHelper API of the Wizard](/api/taghelpers/wizard)
* [Knowledge Base Section](/knowledge-base)