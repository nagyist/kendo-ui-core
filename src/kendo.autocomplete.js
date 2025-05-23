import "./kendo.list.js";
import "./kendo.mobile.scroller.js";
import "./kendo.virtuallist.js";
import { addInputPrefixSuffixContainers } from "./utils/prefix-suffix-containers.js";

export const __meta__ = {
    id: "autocomplete",
    name: "AutoComplete",
    category: "web",
    description: "The AutoComplete widget provides suggestions depending on the typed text.It also allows multiple value entries.",
    depends: [ "list" ],
    features: [ {
        id: "mobile-scroller",
        name: "Mobile scroller",
        description: "Support for kinetic scrolling in mobile device",
        depends: [ "mobile.scroller" ]
    }, {
        id: "virtualization",
        name: "VirtualList",
        description: "Support for virtualization",
        depends: [ "virtuallist" ]
    } ]
};

(function($, undefined) {
    var kendo = window.kendo,
        encode = kendo.htmlEncode,
        support = kendo.support,
        caret = kendo.caret,
        activeElement = kendo._activeElement,
        placeholderSupported = support.placeholder,
        ui = kendo.ui,
        List = ui.List,
        keys = kendo.keys,
        DataSource = kendo.data.DataSource,
        ARIA_DISABLED = "aria-disabled",
        ARIA_READONLY = "aria-readonly",
        CHANGE = "change",
        DISABLED = "disabled",
        READONLY = "readonly",
        FOCUSED = "k-focus",
        SELECTED = "k-selected",
        STATEDISABLED = "k-disabled",
        AUTOCOMPLETEVALUE = "off",
        HOVER = "k-hover",
        ns = ".kendoAutoComplete",
        HOVEREVENTS = "mouseenter" + ns + " mouseleave" + ns;

    function indexOfWordAtCaret(caretIdx, text, separator) {
        return separator ? text.substring(0, caretIdx).split(separator).length - 1 : 0;
    }

    function wordAtCaret(caretIdx, text, separator) {
        return text.split(separator)[indexOfWordAtCaret(caretIdx, text, separator)];
    }

    function replaceWordAtCaret(caretIdx, text, word, separator, defaultSeparator) {
        var words = text.split(separator);

        words.splice(indexOfWordAtCaret(caretIdx, text, separator), 1, word);

        if (separator && words[words.length - 1] !== "") {
            words.push("");
        }

        return words.join(defaultSeparator);
    }

    var AutoComplete = List.extend({
        init: function(element, options) {
            var that = this, wrapper, disabled;

            that.ns = ns;
            options = Array.isArray(options) ? { dataSource: options } : options;

            List.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            options.placeholder = options.placeholder || element.attr("placeholder");
            options.inputMode = options.inputMode || element.attr("inputmode") || "text";

            if (placeholderSupported) {
                element.attr("placeholder", options.placeholder);
            }

            that._wrapper();
            that._clearButton();

            that._dataSource();
            that._ignoreCase();

            element[0].type = "text";
            wrapper = that.wrapper;

            that._popup();

            element
                .addClass("k-input-inner")
                .on("keydown" + ns, that._keydown.bind(that))
                .on("keypress" + ns, that._keypress.bind(that))
                .on("input" + ns, that._search.bind(that))
                .on("paste" + ns, that._search.bind(that))
                .on("focus" + ns, function(e) {
                    if (that._hasActionSheet()) {
                        that.element.attr("readonly", true);
                    } else if (!that.options.readonly) {
                        that.element.removeAttr("readonly");
                    }
                    that._prev = that._accessor();
                    that._oldText = that._prev;
                    that._placeholder(false);
                    wrapper.addClass(FOCUSED);
                })
                .on("focusout" + ns, function(ev) {
                    if (that.filterInput && ev.relatedTarget === that.filterInput[0]) {
                        return;
                    }

                    that._change();
                    that._placeholder();
                    that.close();
                    wrapper.removeClass(FOCUSED);
                })
                .attr({
                    autocomplete: AUTOCOMPLETEVALUE,
                    role: "combobox",
                    "aria-expanded": false,
                    inputmode: options.inputMode
                });

            that._clear.on("click" + ns + " touchend" + ns, that._clearValue.bind(that));
            that._clear.on("mousedown" + ns, that._clearValueMouseDownHandler.bind(that));
            that._enable();

            that._old = that._accessor();

            that._placeholder();

            that._initList();

            disabled = $(that.element).parents("fieldset").is(':disabled');

            if (disabled) {
                that.enable(false);
            }

            that.listView.bind("click", function(e) { e.preventDefault(); });

            that._resetFocusItemHandler = that._resetFocusItem.bind(that);
            addInputPrefixSuffixContainers({ widget: that, wrapper: that.wrapper, options: that.options, prefixInsertBefore: that._inputValuesContainer, suffixInsertAfter: options.clearButton ? that._clear : that.element });

            kendo.notify(that);
            that._toggleCloseVisibility();
            that._applyCssClasses();

            if (options.label) {
                that._label();
            }

            that._aria();
        },

        options: {
            name: "AutoComplete",
            enabled: true,
            suggest: false,
            template: "",
            groupTemplate: (data) => encode(data),
            fixedGroupTemplate: (data) => encode(data),
            prefixOptions: {
                separator: true
            },
            suffixOptions: {
                separator: true
            },
            dataTextField: "",
            minLength: 1,
            enforceMinLength: false,
            delay: 200,
            height: 200,
            filter: "startswith",
            ignoreCase: true,
            highlightFirst: false,
            separator: null,
            placeholder: "",
            animation: {},
            virtual: false,
            value: null,
            clearButton: true,
            autoWidth: false,
            popup: null,
            size: "medium",
            fillMode: "solid",
            rounded: "medium",
            label: null,
            adaptiveTitle: null,
            adaptiveTitleSubtitle: null,
        },

        _clearValueMouseDownHandler: function(ev) {
            var that = this;

            if (ev && ev.currentTarget && ev.currentTarget.classList.contains('k-clear-value')) {
                that._clearValueTrigger = true;
            } else {
                that._clearValueTrigger = false;
            }
        },

        _onActionSheetCreate: function() {
            var that = this;

            that._unboundClick = true;
            that.element
                .on("click", function() { that.popup.toggle(); });

            if (that.filterInput) {
                that.filterInput
                    .on("keydown" + ns, that._keydown.bind(that))
                    .on("keypress" + ns, that._keypress.bind(that))
                    .on("input" + ns, that._search.bind(that))
                    .on("paste" + ns, that._search.bind(that))
                    .attr({
                        autocomplete: AUTOCOMPLETEVALUE,
                        role: "combobox",
                        "aria-expanded": false
                    });

                that.popup.bind("activate", () => {
                    // that.wrapper.off("focusout");
                    that.filterInput.val(that.element.val());
                    that.filterInput.trigger("focus");
                });
                that.popup.bind("deactivate", () => {
                    // that.wrapper.on("focusout", function(ev) {
                    //     if ((that.filterInput && ev.relatedTarget === that.filterInput[0]) || !that.wrapper.hasClass(FOCUSED)) {
                    //         return;
                    //     }

                    //     that._change();
                    //     that._placeholder();
                    //     that.close();
                    //     that.wrapper.removeClass(FOCUSED);
                    // });

                    // that.wrapper.focus();
                    that.element.trigger("focus");
                });
            }
        },

        _onCloseButtonPressed: function() {
            var that = this;

            if (that.filterInput && activeElement() === that.filterInput[0]) {
                that.element.val(that.filterInput.val());
            }
        },

        _popup: function() {
            List.fn._popup.call(this);
            this.popup.element.addClass("k-autocomplete-popup");
        },

        _dataSource: function() {
            var that = this;

            if (that.dataSource && that._refreshHandler) {
                that._unbindDataSource();
            } else {
                that._progressHandler = that._showBusy;
                that._errorHandler = that._hideBusy;
            }

            that.dataSource = DataSource.create(that.options.dataSource)
                .bind("progress", that._progressHandler)
                .bind("error", that._errorHandler);
        },

        setDataSource: function(dataSource) {
            this.options.dataSource = dataSource;
            this._dataSource();

            this.listView.setDataSource(this.dataSource);
        },

        events: [
            "open",
            "close",
            CHANGE,
            "select",
            "filtering",
            "dataBinding",
            "dataBound"
        ],

        setOptions: function(options) {
            var listOptions = this._listOptions(options);

            List.fn.setOptions.call(this, options);

            this.listView.setOptions(listOptions);
            this._accessors();
            this._aria();
            this._clearButton();
        },

        _listOptions: function(options) {
            var listOptions = List.fn._listOptions.call(this, $.extend(options, {
                skipUpdateOnBind: true
            }));

            listOptions.dataValueField = listOptions.dataTextField;
            listOptions.selectedItemChange = null;

            return listOptions;
        },

        _editable: function(options) {
            var that = this,
                element = that.element,
                wrapper = that.wrapper.off(ns),
                readonly = options.readonly,
                disable = options.disable;

            if (!readonly && !disable) {
                wrapper
                    .removeClass(STATEDISABLED)
                    .on(HOVEREVENTS, that._toggleHover);

                element.prop(DISABLED, false)
                       .prop(READONLY, false)
                       .attr(ARIA_DISABLED, false)
                       .attr(ARIA_READONLY, false);
            } else {
                wrapper
                    .addClass(disable ? STATEDISABLED : "")
                    .removeClass(disable ? "" : STATEDISABLED);

                element.attr(DISABLED, disable)
                       .attr(READONLY, readonly)
                       .attr(ARIA_DISABLED, disable)
                       .attr(ARIA_READONLY, readonly);
            }

            that._toggleCloseVisibility();
        },

        close: function() {
            var that = this;
            var current = that.listView.focus();

            if (current) {
                current.removeClass(SELECTED);
            }

            that.popup.close();
            that._deactivateItem();
        },

        destroy: function() {
            var that = this;

            that.element.off(ns);
            that._clear.off(ns);
            that.wrapper.off(ns);

            if (that.filterInput) {
                that.filterInput.off(ns);
            }

            List.fn.destroy.call(that);
        },

        refresh: function() {
            this.listView.refresh();
        },

        select: function(li) {
            this._select(li);
        },

        search: function(word) {
            let that = this,
            options = that.options,
            ignoreCase = options.ignoreCase,
            separator = that._separator(),
            length,
            lowerCaseValue,
            accentFoldingFiltering = that.dataSource.options.accentFoldingFiltering,
            element = that.filterInput && activeElement() === that.filterInput[0] ? that.filterInput : that.element;

            word = word || that._accessor();

            clearTimeout(that._typingTimeout);

            if (separator) {
                word = wordAtCaret(caret(element)[0], word, separator);
            }

            length = word.length;

            if ((!options.enforceMinLength && !length) || length >= options.minLength) {
                that._open = true;

                that._mute(function() {
                    this.listView.value([]);
                });

                lowerCaseValue = accentFoldingFiltering ? word.toLocaleLowerCase(accentFoldingFiltering) : word.toLowerCase();

                that._filterSource({
                    value: ignoreCase ? lowerCaseValue : word,
                    operator: options.filter,
                    field: options.dataTextField,
                    ignoreCase: ignoreCase
                });

                that.one("close", that._unifySeparators.bind(that));
            }
            that._toggleCloseVisibility();
        },

        suggest: function(word) {
            var that = this,
                key = that._last,
                value = that._accessor(),
                currentValue = that.value(),
                element = that.element[0],
                caretIdx = caret(element)[0],
                separator = that._separator(),
                words = value.split(separator),
                wordIndex = indexOfWordAtCaret(caretIdx, value, separator),
                selectionEnd = caretIdx,
                idx,
                accentFoldingFiltering = that.dataSource.options.accentFoldingFiltering;

            if (key == keys.BACKSPACE || key == keys.DELETE) {
                that._last = undefined;
                return;
            }

            word = word || "";

            if (typeof word !== "string") {
                if (word[0]) {
                    word = that.dataSource.view()[List.inArray(word[0], that.ul[0])];
                }

                word = word ? that._text(word) : "";
            }

            if (caretIdx <= 0) {
                caretIdx = (accentFoldingFiltering ? value.toLocaleLowerCase(accentFoldingFiltering) : value.toLowerCase()).indexOf(accentFoldingFiltering ? word.toLocaleLowerCase(accentFoldingFiltering) : word.toLowerCase()) + 1;
            }

            idx = value.substring(0, caretIdx).lastIndexOf(that._defaultSeparator());
            idx = idx > -1 ? caretIdx - (idx + that._defaultSeparator().length) : caretIdx;
            value = words[wordIndex].substring(0, idx);

            if (word) {
                word = word.toString();
                idx = (accentFoldingFiltering ? word.toLocaleLowerCase(accentFoldingFiltering) : word.toLowerCase()).indexOf(accentFoldingFiltering ? value.toLocaleLowerCase(accentFoldingFiltering) : value.toLowerCase());
                if (idx > -1) {
                    word = word.substring(idx + value.length);

                    selectionEnd = caretIdx + word.length;

                    value += word;
                }

                if (separator && words[words.length - 1] !== "") {
                    words.push("");
                }

            }

            words[wordIndex] = value;

            if (typeof that.options.separator == 'object' && that.options.separator != null) {
                if (currentValue.length > 1) {
                    let lastSeparator = [...currentValue.matchAll(separator.source)].pop();
                    if (lastSeparator) {
                        that._accessor(words.slice(0, -1).join(that._defaultSeparator() || "") + lastSeparator + words[words.length - 1]);
                    } else {
                        that._accessor(words.slice(0, -1).join(that._defaultSeparator() || ""));
                    }
                } else {
                  that._accessor(words.join(this._defaultSeparator() || ""));
                }
            } else {
                that._accessor(words.join(separator || ""));
            }

            if (element === activeElement()) {
                caret(element, caretIdx, selectionEnd);
            }
        },

        value: function(value) {
            if (value !== undefined) {
                this.listView.value(value);

                this._accessor(value);
                this._old = this._accessor();
                this._oldText = this._accessor();
            } else {
                return this._accessor();
            }
            this._toggleCloseVisibility();
            this._refreshFloatingLabel();
        },

        _click: function(e) {
            var item = e.item;
            var that = this;
            var element = that.element;
            var dataItem = that.listView.dataItemByIndex(that.listView.getElementIndex(item));

            e.preventDefault();

            that._active = true;

            if (that.trigger("select", { dataItem: dataItem, item: item })) {
                that.close();
                return;
            }
            that._oldText = element.val();
            that._select(item).done(function() {
                that._blur();

                caret(element, element.val().length);
            });
        },

        _clearText: $.noop,

        _highlightFirst: function() {
            var index = this.options.highlightFirst ? 0 : -1;

            this.listView.focus(index);
        },

        _resetFocusItem: function() {
            if (this.options.virtual) {
                this.listView.scrollTo(0);
            }

            this._highlightFirst();
        },

        _listBound: function() {
            var that = this;
            var popup = that.popup;
            var options = that.options;
            var data = that.dataSource.flatView();
            var length = data.length;
            var groupsLength = that.dataSource._group ? that.dataSource._group.length : 0;
            var isActive = that.element[0] === activeElement() || that.filterInput && that.filterInput[0] === activeElement();
            var action;

            that._renderFooter();
            that._renderNoData();
            that._toggleNoData(!length);
            that._toggleHeader(!!groupsLength && !!length);

            that._resizePopup();

            popup.position();

            if (length) {
                if (options.suggest && isActive && that._inputValue()) {
                    that.suggest(data[0]);
                }

                that._highlightFirst();
            }

            if (that._open) {
                that._open = false;
                action = that._allowOpening() ? "open" : "close";

                if (that._typingTimeout && !isActive) {
                    action = "close";
                }

                if (length) {
                    that._resetFocusItem();

                    if (options.virtual) {
                        that.popup
                            .unbind("activate", that._resetFocusItemHandler)
                            .one("activate", that._resetFocusItemHandler);
                    }
                }

                popup[action]();
                that._typingTimeout = undefined;
            }

            if (that._touchScroller) {
                that._touchScroller.reset();
            }

            that._hideBusy();

            that.trigger("dataBound");
        },

        _mute: function(callback) {
            this._muted = true;
            callback.call(this);
            this._muted = false;
        },

        _listChange: function() {
            var isActive = this._active || this.element[0] === activeElement();

            if (isActive && !this._muted) {
                this._selectValue(this.listView.selectedDataItems()[0]);
            }
        },

        _selectValue: function(dataItem) {
            var separator = this._separator();
            var text = "";

            if (dataItem) {
                text = this._text(dataItem);
            }

            if (text === null) {
                text = "";
            }

            if (separator) {
                text = replaceWordAtCaret(caret(this.element)[0], this._accessor(), text, separator, this._defaultSeparator());
            }

            this._prev = text;
            this._accessor(text);
            this._placeholder();
        },

        _unifySeparators: function() {
            this._accessor(this.value().split(this._separator()).join(this._defaultSeparator()));
            return this;
        },

        _preselect: function(value, text) {
            this._inputValue(text);
            this._accessor(value);

            this._old = this.oldText = this._accessor();

            this.listView.setValue(value);
            this._placeholder();
        },

        _change: function() {
            var that = this;
            var value = that._unifySeparators().value();
            var trigger = value !== List.unifyType(that._old, typeof value);

            var valueUpdated = trigger && !that._typing;
            var itemSelected = that._oldText !== value;
            var clearValueTrigger = that._clearValueTrigger;

            that._old = value;
            that._oldText = value;

            if (that.filterInput && activeElement() === that.filterInput[0]) {
                that.element.val(that.filterInput.val());
            }

            if ((valueUpdated || itemSelected) && !clearValueTrigger) {
                // trigger the DOM change event so any subscriber gets notified
                that.element.trigger(CHANGE);
            }

            if (trigger && !clearValueTrigger) {
                that.trigger(CHANGE);
            }

            that.typing = false;
            that._toggleCloseVisibility();
        },

        _accessor: function(value) {
            var that = this,
                element = that.filterInput && activeElement() === that.filterInput[0] ? that.filterInput[0] : that.element[0];

            if (value !== undefined) {
                element.value = value === null ? "" : value;
                that._placeholder();
            } else {
                value = element.value;

                if (element.className.indexOf("k-readonly") > -1) {
                    if (value === that.options.placeholder) {
                        return "";
                    } else {
                        return value;
                    }
                }

                return value;
            }
        },

        _keydown: function(e) {
            var that = this;
            var key = e.keyCode;
            var listView = that.listView;
            var visible = that.popup.visible();
            var current = listView.focus();

            that._last = key;

            if (key === keys.DOWN) {
                if (visible) {
                    this._move(current ? "focusNext" : "focusFirst");
                } else if (that.value()) {
                    that._filterSource({
                        value: that.ignoreCase ? that.value().toLowerCase() : that.value(),
                        operator: that.options.filter,
                        field: that.options.dataTextField,
                        ignoreCase: that.ignoreCase
                    }).done(function() {
                        if (that._allowOpening()) {
                            that._resetFocusItem();
                            that.popup.open();
                        }
                    });
                }
                e.preventDefault();
            } else if (key === keys.ESC ) {
                if (visible) {
                    e.preventDefault();
                    that.close();
                } else {
                    that._clearValue();
                }
            } else if (e.altKey && key === keys.UP && visible) {
                e.preventDefault();
                that.close();
            } else if (key === keys.UP) {
                if (visible) {
                    this._move(current ? "focusPrev" : "focusLast");
                }
                e.preventDefault();
            } else if (key === keys.HOME) {
                this._move("focusFirst");
            } else if (key === keys.END) {
                this._move("focusLast");
            } else if (key === keys.ENTER || key === keys.TAB) {

                if (key === keys.ENTER && visible) {
                    e.preventDefault();
                }

                if (visible && current) {
                    var dataItem = listView.dataItemByIndex(listView.getElementIndex(current));
                    if (that.trigger("select", { dataItem: dataItem, item: current })) {
                        return;
                    }

                    this._select(current);
                }

                this._blur();
            } else if (that.popup.visible() && (key === keys.PAGEDOWN || key === keys.PAGEUP)) {
                e.preventDefault();

                var direction = key === keys.PAGEDOWN ? 1 : -1;
                listView.scrollWith(direction * listView.screenHeight());
            } else {
                // In some cases when the popup is opened resize is triggered which will cause it to close
                // Setting the below flag will prevent this from happening
                that.popup._hovered = true;
                that._search();
            }
        },

        _keypress: function() {
            this._oldText = this.element.val();
            this._typing = true;
        },

        _move: function(action) {
            this.listView[action]();

            if (this.options.suggest && this.listView.focus() == null && action == "focusNext") {
                this.listView.focus(0);
                this.suggest(this.listView._view[0].item);
            } else if (this.options.suggest && this.listView.focus() == null && action == "focusPrev") {
                let index = this.listView._view.length - 1;
                this.listView.focus(index);
                this.suggest(this.listView._view[index].item);
            } else if (this.options.suggest && (action == "focusFirst" || action == "focusLast")) {
               caret(this.element);
            } else if (this.options.suggest && this.listView.focus() != null) {
                this.suggest(this.listView.focus());
            }
        },

        _placeholder: function(show) {
            if (placeholderSupported) {
                return;
            }

            var that = this,
                element = that.element,
                placeholder = that.options.placeholder,
                value;

            if (placeholder) {
                value = element.val();

                if (show === undefined) {
                    show = !value;
                }

                if (!show) {
                    if (value !== placeholder) {
                        placeholder = value;
                    } else {
                        placeholder = "";
                    }
                }

                if (value === that._old && !show) {
                    return;
                }

                element.toggleClass("k-readonly", show)
                       .val(placeholder);

                if (!placeholder && element[0] === document.activeElement) {
                    caret(element[0], 0, 0);
                }
            }
        },

        _separator: function() {
            var separator = this.options.separator;
            if (separator instanceof Array) {
               return new RegExp(separator.join("|"), 'gi');
            }
            return separator;
        },

        _defaultSeparator: function() {
            var separator = this.options.separator;
            if (separator instanceof Array) {
                return separator[0];
            }
            return separator;
        },

        _inputValue: function() {
            return this.element.val();
        },

        _search: function() {
            var that = this;
            clearTimeout(that._typingTimeout);

            that._typingTimeout = setTimeout(function() {
                if (that._prev !== that._accessor()) {
                    that._prev = that._accessor();
                    that.search();
                }
            }, that.options.delay);
        },

        _select: function(candidate) {
            var that = this;
            that._active = true;

            return that.listView.select(candidate).done(function() {
                that._active = false;
            });
        },

        _clearButton: function() {
            List.fn._clearButton.call(this);

            if (this.options.clearButton) {
                this._clear.insertAfter(this.element);
            }
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass(HOVER, e.type === "mouseenter");
        },

        _toggleCloseVisibility: function() {
            var preventShow = this.element.is(":disabled") || this.element.is("[readonly]");

            if (this.value() && !preventShow) {
                this._showClear();
            } else {
                this._hideClear();
            }
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                DOMelement = element[0],
                wrapper;

            wrapper = element.parent();

            if (!wrapper.is("span.k-autocomplete")) {
                wrapper = element.wrap("<span />").parent();
            }

            wrapper.attr("tabindex", -1);

            wrapper[0].style.cssText = DOMelement.style.cssText;
            element.css({
                width: "",
                height: DOMelement.style.height
            });

            that._focused = that.element;
            that.wrapper = wrapper
                .addClass("k-autocomplete k-input")
                .addClass(DOMelement.className)
                .removeClass('input-validation-error');
        },

        _clearValue: function() {
            this._clearValueTrigger = false;
            List.fn._clearValue.call(this);
            this.element.trigger("focus");
        }
    });

    ui.plugin(AutoComplete);

    kendo.cssProperties.registerPrefix("AutoComplete", "k-input-");

    kendo.cssProperties.registerValues("AutoComplete", [{
        prop: "rounded",
        values: kendo.cssProperties.roundedValues.concat([['full', 'full']])
    }]);
})(window.kendo.jQuery);
export default kendo;

