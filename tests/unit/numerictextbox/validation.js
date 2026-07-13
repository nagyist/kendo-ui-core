import '@progress/kendo-ui/src/kendo.numerictextbox.js';
import '@progress/kendo-ui/src/kendo.validator.js';

let NumericTextBox = kendo.ui.NumericTextBox,
    input,
    STATE_INVALID = "k-invalid",
    keyDownA = $.Event("keydown", { keyCode: 65 });

describe("kendo.ui.NumericTextBox validation", function() {
    beforeEach(function() {
        input = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

    it("input has hidden decoration by default.", function() {
        let textbox = input.kendoNumericTextBox().data("kendoNumericTextBox");

        assert.isOk(!textbox.wrapper.hasClass(STATE_INVALID));
        assert.equal(textbox._validationIcon.css("display"), "none");
    });

    it("the input event adds invalid decoration.", function() {
        let textbox = input.kendoNumericTextBox().data("kendoNumericTextBox");
        textbox.element.val("a");
        textbox.element.trigger("input");

        assert.isOk(textbox.wrapper.hasClass(STATE_INVALID));
        assert.notEqual(textbox._validationIcon.css("display"), "none");
    });

    it("invalid decoration is removed after keyup.", function() {
        let textbox = input.kendoNumericTextBox().data("kendoNumericTextBox");
        textbox.element
            .trigger(keyDownA)
            .trigger($.Event("keyup"));

        assert.isOk(!textbox.wrapper.hasClass(STATE_INVALID));
        assert.equal(textbox._validationIcon.css("display"), "none");
    });


    it("hidden invalid decoration on focusout.", function() {
        let textbox = input.kendoNumericTextBox().data("kendoNumericTextBox");
        textbox.element
            .trigger(keyDownA)
            .focusout();

        assert.isOk(!textbox.wrapper.hasClass(STATE_INVALID));
        assert.equal(textbox._validationIcon.css("display"), "none");
    });

    it("k-invalid set by Validator with validateOnBlur false is not removed on focusout", function() {
        let form = $('<form><input required /></form>').appendTo(Mocha.fixture);
        let ntbInput = form.find("input");
        let textbox = ntbInput.kendoNumericTextBox().data("kendoNumericTextBox");
        let validator = form.kendoValidator({ validateOnBlur: false }).data("kendoValidator");

        validator.validate();

        assert.isOk(textbox.wrapper.hasClass(STATE_INVALID));

        textbox.element.trigger("focusin");
        textbox.element.focusout();

        assert.isOk(textbox.wrapper.hasClass(STATE_INVALID));
    });
});
