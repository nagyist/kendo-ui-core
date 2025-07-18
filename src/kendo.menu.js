import "./kendo.popup.js";
import "./kendo.data.js";
import "./kendo.icons.js";

export const __meta__ = {
    id: "menu",
    name: "Menu",
    category: "web",
    description: "The Menu widget displays hierarchical data as a multi-level menu.",
    depends: [ "popup", "data", "data.odata" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        activeElement = kendo._activeElement,
        touch = (kendo.support.touch && kendo.support.mobileOS),
        isArray = Array.isArray,
        HierarchicalDataSource = kendo.data.HierarchicalDataSource,
        MOUSEDOWN = "mousedown",
        CLICK = "click",
        DELAY = 30,
        SCROLLSPEED = 50,
        extend = $.extend,
        each = $.each,
        encode = kendo.htmlEncode,
        template = kendo.template,
        keys = kendo.keys,
        Widget = ui.Widget,
        excludedNodesRegExp = /^(ul|a|div)$/i,
        NS = ".kendoMenu",
        IMG = "img",
        OPEN = "open",
        MENU = "k-menu",
        LINK = "k-link k-menu-link",
        LINK_SELECTOR = ".k-link",
        ICON_SELECTOR = ".k-menu-expand-arrow",
        LAST = "k-last",
        CLOSE = "close",
        TIMER = "timer",
        FIRST = "k-first",
        IMAGE = "k-image",
        SELECT = "select",
        ZINDEX = "zIndex",
        ACTIVATE = "activate",
        DEACTIVATE = "deactivate",
        POINTERDOWN = "touchstart" + NS + " MSPointerDown" + NS + " pointerdown" + NS,
        pointers = kendo.support.pointers,
        msPointers = kendo.support.msPointers,
        allPointers = msPointers || pointers,
        CHANGE = "change",
        ERROR = "error",
        TOUCHSTART = kendo.support.touch ? "touchstart" : "",
        MOUSEENTER = pointers ? "pointerover" : (msPointers ? "MSPointerOver" : "mouseenter"),
        MOUSELEAVE = pointers ? "pointerout" : (msPointers ? "MSPointerOut" : "mouseleave"),
        MOUSEWHEEL = "DOMMouseScroll" + NS + " mousewheel" + NS,
        RESIZE = kendo.support.resize + NS,
        SCROLLWIDTH = "scrollWidth",
        SCROLLHEIGHT = "scrollHeight",
        OFFSETWIDTH = "offsetWidth",
        OFFSETHEIGHT = "offsetHeight",
        POPUP_ID_ATTR = "group",
        POPUP_OPENER_ATTR = "groupparent",
        DOCUMENT_ELEMENT = $(document.documentElement),
        KENDOPOPUP = "kendoPopup",
        HOVERSTATE = "k-hover",
        FOCUSEDSTATE = "k-focus",
        DISABLEDSTATE = "k-disabled",
        SELECTEDSTATE = "k-selected",
        menuSelector = ".k-menu",
        groupSelector = ".k-menu-group",
        animationContainerSelector = ".k-animation-container",
        childAnimationContainerSelector = ".k-child-animation-container",
        popupSelector = ".k-menu-popup ," + animationContainerSelector,
        allItemsSelector = ":not(.k-list) > .k-item:not([role='treeitem'])",
        disabledSelector = ".k-item.k-disabled",
        itemSelector = ".k-item",
        availableItemsSelector = ".k-item:not(.k-disabled)",
        linkSelector = ".k-item:not(.k-disabled) > .k-link",
        exclusionSelector = ":not(.k-item.k-separator):visible",
        templateSelector = "div:not(.k-animation-container,.k-list-container)",
        scrollButtonSelector = ".k-menu-scroll-button",
        touchPointerTypes = { "2": 1, "touch": 1 },
        STRING = "string",
        DATABOUND = "dataBound",
        ARIA_EXPANDED = "aria-expanded",
        ROLE = "role",

        bindings = {
            text: "dataTextField",
            url: "dataUrlField",
            spriteCssClass: "dataSpriteCssClassField",
            icon: "dataIconField",
            iconClass: "dataIconClassField",
            imageUrl: "dataImageUrlField",
            imageAttr: "dataImageAttrField",
            content: "dataContentField"
        },

        rendering = {
            wrapperCssClass: function(group, item) {
                var result = "k-item k-menu-item",
                    index = item.index;

                if (item.separator) {
                    result += " k-separator";
                }

                if (item.enabled === false) {
                    result += " k-disabled";
                }

                if (group.firstLevel && index === 0) {
                    result += " k-first";
                }

                if (index == group.length - 1) {
                    result += " k-last";
                }

                if (item.cssClass) {
                    result += " " + item.cssClass;
                }

                if (item.attr && item.attr.hasOwnProperty("class")) {
                    result += " " + item.attr["class"];
                }

                if (item.selected) {
                    result += " " + SELECTEDSTATE;
                }

                return result;
            },

            itemCssAttributes: function(item) {
                var result = "";
                var attributes = item.attr || {};

                for (var attr in attributes) {
                    if (attributes.hasOwnProperty(attr) && attr !== "class") {
                        result += attr + "=\"" + attributes[attr] + "\" ";
                    }
                }

                return result;
            },

            imageCssAttributes: function(imgAttributes) {
                var result = "";
                var attributes = imgAttributes && imgAttributes.toJSON ? imgAttributes.toJSON() : {};

                if (!attributes['class']) {
                    attributes['class'] = IMAGE;
                } else {
                    attributes['class'] += " " + IMAGE;
                }

                for (var attr in attributes) {
                    if (attributes.hasOwnProperty(attr)) {
                        result += attr + "=\"" + attributes[attr] + "\" ";
                    }
                }

                return result;
            },

            contentCssAttributes: function(item) {
                var result = "";
                var attributes = item.contentAttr || {};
                var defaultClasses = "k-content k-menu-group k-menu-group-md";

                if (!attributes['class']) {
                    attributes['class'] = defaultClasses;
                } else {
                    attributes['class'] += " " + defaultClasses;
                }

                for (var attr in attributes) {
                    if (attributes.hasOwnProperty(attr)) {
                        result += attr + "=\"" + attributes[attr] + "\" ";
                    }
                }

                return result;
            },

            textClass: function() {
                return LINK;
            },

            groupAttributes: function(group) {
                return group.expanded !== true ? `${kendo.attr("style-display")}="none"` : "";
            },

            groupCssClass: function() {
                return "k-menu-group k-menu-group-md";
            },

            groupWrapperCssClass: function() {
                return "k-menu-popup";
            },

            content: function(item) {
                return item.content ? item.content : "&nbsp;";
            }
    };

    function getEffectDirection(direction, root) {
        direction = direction.split(" ")[!root + 0] || direction;
        return direction.replace("top", "up").replace("bottom", "down");
    }

    function parseDirection(direction, root, isRtl) {
        direction = direction.split(" ")[!root + 0] || direction;
        var output = { origin: ["bottom", (isRtl ? "right" : "left")], position: ["top", (isRtl ? "right" : "left")] },
            horizontal = /left|right/.test(direction);

        if (horizontal) {
            output.origin = [ "top", direction ];
            output.position[1] = kendo.directions[direction].reverse;
        } else {
            output.origin[0] = direction;
            output.position[0] = kendo.directions[direction].reverse;
        }

        output.origin = output.origin.join(" ");
        output.position = output.position.join(" ");

        return output;
    }

    function contains(parent, child) {
        try {
            return $.contains(parent, child);
        } catch (e) {
            return false;
        }
    }

    function updateItemClasses(item) {
        item = $(item);
        var omitWrap = item.attr(kendo.attr("omit-wrap"));

        if (omitWrap) {
            return;
        }

        item.addClass("k-item k-menu-item")
            .children(IMG)
            .addClass(IMAGE);

        item
            .children("a")
            .addClass(LINK)
            .children(IMG)
            .addClass(IMAGE);

        item
            .filter(":not([disabled])");

        item
            .filter(".k-separator")
            .removeClass("k-menu-item")
            .addClass("k-separator-horizontal")
            .empty()
            .append("&nbsp;");

        item
            .filter("li[disabled]")
            .addClass(DISABLEDSTATE)
            .prop("disabled", false)
            .attr("aria-disabled", true);

        if (!item.filter("[role]").length) {
            item.attr(ROLE, "menuitem");
        }

        if (!item.children(LINK_SELECTOR).length) {
            item.contents() // exclude groups, real links, templates and empty text nodes
                .filter(function() { return (!this.nodeName.match(excludedNodesRegExp) && !(this.nodeType === 3 && !kendo.trim(this.nodeValue))); })
                // adding role=none to span elements inside li[role=menuitem]
                // to make screen readers announce submenus #telerik/kendo-ui-core/issues/6942
                .wrapAll("<span class='" + LINK + "' role='none'></span>")
                .filter(function(idx, elm) { return elm.nodeType === 3; })
                .wrap("<span class='k-menu-link-text' role='none'></span>");
        }

        updateArrow(item);
        updateFirstLast(item);
    }

    function updateArrow(item) {
        item = $(item);
        item.find("> .k-link > .k-menu-expand-arrow > [class*=k-i-caret]:not(.k-sprite),> .k-link > .k-menu-expand-arrow > [class*=k-svg-i-caret]:not(.k-sprite)").parent().remove();

        item.filter(":has(.k-menu-group)")
            .children(".k-link:not(:has([class*=k-i-caret]:not(.k-sprite))),.k-link:not(:has([class*=k-svg-i-caret]:not(.k-sprite)))")
            .each(function() {
                var item = $(this);

                item.append(`<span aria-hidden='true' class='k-menu-expand-arrow'>${kendo.ui.icon({ icon: getArrowIconName(item) })}</span>`);
            });
    }

    function getArrowIconName(item) {
        var arrowIconName,
            parent = item.parent().parent(),
            isRtl = kendo.support.isRtl(parent);

        if (parent.hasClass(MENU + "-horizontal")) {
            arrowIconName = "caret-alt-down";
        } else {
            if (isRtl) {
                arrowIconName = "caret-alt-left";
            }
            else {
                arrowIconName = "caret-alt-right";
            }
        }
        return arrowIconName;
    }

    function updateFirstLast(item) {
        item = $(item);

        item.filter(".k-first:not(:first-child)").removeClass(FIRST);
        item.filter(".k-last:not(:last-child)").removeClass(LAST);
        item.filter(":first-child").addClass(FIRST);
        item.filter(":last-child").addClass(LAST);
    }

    function updateHasAriaPopup(parents) {
        if (parents && parents.length) {
            for (var index in parents) {
                var parentLi = parents.eq(index);
                if (parentLi.find("ul").length) {
                    parentLi.attr("aria-haspopup", true);
                } else {
                    parentLi.removeAttr("aria-haspopup");
                }
            }
        }
    }

    function getParentLiItems(group) {
        if (!group.hasClass(MENU)) {
            return group.parentsUntil("." + MENU, "li");
        }
    }

    function storeItemSelectEventHandler(element, options) {
        var selectHandler = getItemSelectEventHandler(options);
        if (selectHandler) {
            setItemData(element, selectHandler);
        }

        if (options.items) {
            $(element).children("div").children("ul").children("li").each(function(i) {
                storeItemSelectEventHandler(this, options.items[i]);
            });
        }
    }

    function setItemData(element, selectHandler) {
        $(element).children(".k-link").data({
            selectHandler: selectHandler
        });
    }

    function getItemSelectEventHandler(options) {
        var selectHandler = options.select,
            isFunction = kendo.isFunction;

        if (selectHandler && isFunction(selectHandler)) {
            return selectHandler;
        }
        return null;
    }

    function popupOpenerSelector(id) {
        return id ? "li[data-groupparent='" + id + "']" : "li[data-groupparent]";
    }
    function popupGroupSelector(id) {
        var selector = id ? "[data-group='" + id + "']" : "[data-group]";
        return "ul" + selector + ",div" + selector;
    }
    function getChildPopups(currentPopup, overflowWrapper) {
        var childPopupOpener = currentPopup.find(popupOpenerSelector());
        var result = [];
        childPopupOpener.each(function(i, opener) {
            opener = $(opener);
            var popupId = opener.data(POPUP_OPENER_ATTR);
            var popup = currentPopup;
            while (popupId) {
                popup = overflowWrapper.find(popupGroupSelector(popupId) + ":visible");
                if (popup.length) {
                    result.push(popup);
                }
                opener = popup.find(popupOpenerSelector());

                if (opener && opener.length && opener.length > 1) {
                    result.push(...getChildPopups(popup, overflowWrapper));
                    popupId = null;
                } else {
                    popupId = opener.data(POPUP_OPENER_ATTR);
                }
            }
        });

        return result;
    }

    function popupParentItem(popupElement, overflowWrapper) {
        var popupId = popupElement.data(POPUP_ID_ATTR);
        return popupId ? overflowWrapper.find(popupOpenerSelector(popupId)) : $([]);
    }

    function itemPopup(item, overflowWrapper) {
        var popupId = item.data(POPUP_OPENER_ATTR);
        return popupId ? overflowWrapper.children(animationContainerSelector).find(popupGroupSelector(popupId)) : $([]);
    }

    function overflowMenuParents(current, overflowWrapper) {
        var parents = [];
        var getParents = function(item) {
            while (item.parentNode && !overflowWrapper.is(item.parentNode)) {
                parents.push(item.parentNode);
                item = item.parentNode;
            }
        };
        var elem = current[0] || current;
        getParents(elem);
        var last = parents[parents.length - 1];
        while ($(last).is(animationContainerSelector)) {
            var popupElement = $(last).find(popupSelector);
            elem = popupParentItem(popupElement, overflowWrapper)[0];
            if (!elem) {
                break;
            }
            parents.push(elem);
            getParents(elem);
            last = parents[parents.length - 1];
        }
        return parents;
    }

    function mousewheelDelta(e) {
        var delta = 0;

        if (e.wheelDelta) {
            delta = -e.wheelDelta / 120;
            delta = delta > 0 ? Math.ceil(delta) : Math.floor(delta);
        }

        if (e.detail) {
            delta = Math.round(e.detail / 3);
        }

        return delta;
    }

    function parentsScroll(current, scrollDirection) {
        var scroll = 0;
        var parent = current.parentNode;
        while (parent && !isNaN(parent[scrollDirection])) {
            scroll += parent[scrollDirection];
            parent = parent.parentNode;
        }
        return scroll;
    }

    function isPointerTouch(e) {
        return allPointers && e.originalEvent && e.originalEvent.pointerType in touchPointerTypes;
    }

    function isTouch(e) {
        var ev = e.originalEvent;
        return touch && /touch/i.test(ev.type || "");
    }

    function removeSpacesBetweenItems(ul) {
        ul.contents().filter(function() { return this.nodeName != "LI"; }).remove();
    }

    var Menu = kendo.ui.DataBoundWidget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.wrapper = that.element;
            options = that.options;
            that._accessors();
            that._templates();
            that._dataSource();

            that._updateClasses();
            that._wrapGroups();

            that._animations(options);

            that.nextItemZIndex = 100;

            that._tabindex();

            that._initOverflow(options);

            that._attachMenuEventsHandlers();

            if (options.openOnClick) {
                that.clicked = false;
            }

            element.attr(ROLE, "menubar");

            if (element[0].id) {
                that._ariaId = kendo.format("{0}_mn_active", element[0].id);
            } else {
                that._ariaId = kendo.format("{0}_mn_active", kendo.guid());
            }

            kendo.notify(that);
        },

        events: [
            OPEN,
            CLOSE,
            ACTIVATE,
            DEACTIVATE,
            SELECT,
            DATABOUND
        ],

        options: {
            name: "Menu",
            animation: {
                open: {
                    duration: 200
                },
                close: { // if close animation effects are defined, they will be used instead of open.reverse
                    duration: 100
                }
            },
            orientation: "horizontal",
            direction: "default",
            openOnClick: false,
            closeOnClick: true,
            hoverDelay: 100,
            scrollable: false,
            popupCollision: null,
            autoSize: false,
            iconPosition: "before", // "before" or "after" text content
        },

        _initData: function() {
            var that = this;

            if (that.dataSource) {
                that.element.empty();

                that.append(that.dataSource.view(), that.element);
            }
        },

        _attachMenuEventsHandlers: function() {
            var that = this;
            var element = that.element;
            var options = that.options;
            var overflowWrapper = that._overflowWrapper();

            that._checkActiveProxy = that._checkActiveElement.bind(that);

            (overflowWrapper || element).on(POINTERDOWN, itemSelector, that._focusHandler.bind(that))
                   .on(CLICK + NS, disabledSelector, false)
                   .on(CLICK + NS, itemSelector, that._click.bind(that))
                   .on(POINTERDOWN + " " + MOUSEDOWN + NS, ".k-content", that._preventClose.bind(that))
                   .on(MOUSEENTER + NS, availableItemsSelector, that._mouseenter.bind(that))
                   .on(MOUSELEAVE + NS, availableItemsSelector, that._mouseleave.bind(that))
                   .on(MOUSEDOWN + NS, availableItemsSelector, that._mousedown.bind(that))
                   .on(TOUCHSTART + NS + " " + MOUSEENTER + NS + " " + MOUSELEAVE + NS + " " +
                       MOUSEDOWN + NS + " " + CLICK + NS, linkSelector, that._toggleHover.bind(that));

            element.on("keydown" + NS, that._keydown.bind(that))
                   .on("focus" + NS, that._focus.bind(that))
                   .on("focus" + NS, ".k-content", that._focus.bind(that))
                   .on("blur" + NS, that._removeFocusItem.bind(that))
                   .on("blur" + NS, "[tabindex]", that._checkActiveProxy);

            if (overflowWrapper) {
                overflowWrapper
                    .on(MOUSELEAVE + NS, popupSelector, that._mouseleavePopup.bind(that))
                    .on(MOUSEENTER + NS, popupSelector, that._mouseenterPopup.bind(that));
            }

            if (options.openOnClick) {
                that._documentClickHandler = that._documentClick.bind(that);
                $(document).on("click", that._documentClickHandler);
            }
        },

        _detachMenuEventsHandlers: function() {
            var that = this;
            var overflowWrapper = that._overflowWrapper();

            if (overflowWrapper) {
                overflowWrapper.off(NS);
            }

            that.element.off(NS);

            if (that._documentClickHandler) {
                $(document).off("click", that._documentClickHandler);
            }
        },

        _getNeededSpaceForChildren: function(element, horizontal) {
            const children = element.children();
            let total = 0;

            if (children.length > 0) {
                children.each((_, element) => {
                    if (horizontal) {
                        total += kendo._outerWidth(element);
                    } else {
                        total += kendo._outerHeight(element);
                    }
                });
            }

            return total;
        },

        _initOverflow: function(options) {
            var that = this;
            var isHorizontal = options.orientation == "horizontal";
            var backwardBtn, forwardBtn;
            const isRtl = kendo.support.isRtl(that.wrapper);
            that._openedPopups = {};
            if (options.scrollable) {
                that._scrollWrapper = that.element.wrap(`<div class="k-menu-scroll-wrapper${options.orientation === 'vertical' ? " k-menu-scroll-wrapper-vertical" : ""}"></div>`).parent();
                if (isHorizontal) {
                    removeSpacesBetweenItems(that.element);
                }
                let backwardBtnIcon = isHorizontal ? (isRtl ? 'right' : 'left') : 'up';
                let forwardBtnIcon = isHorizontal ? (isRtl ? 'left' : 'right') : 'down';

                backwardBtn = $(that.templates.scrollButton({ direction: backwardBtnIcon }));
                forwardBtn = $(that.templates.scrollButton({ direction: forwardBtnIcon }));

                switch (options.scrollable.scrollButtonsPosition) {
                    case "start":
                        forwardBtn.prependTo(that._scrollWrapper);
                        backwardBtn.prependTo(that._scrollWrapper);
                        break;
                    case "end":
                        backwardBtn.appendTo(that._scrollWrapper);
                        forwardBtn.appendTo(that._scrollWrapper);
                        break;
                    default:
                        backwardBtn.prependTo(that._scrollWrapper);
                        forwardBtn.appendTo(that._scrollWrapper);
                }

                that._initScrolling(that.element, backwardBtn, forwardBtn, isHorizontal, isRtl);

                var initialWidth = that.element.outerWidth();
                var initialCssWidth = that.element[0].style.width;
                initialCssWidth = initialCssWidth === "auto" ? "" : initialCssWidth;

                if (isHorizontal) {
                    $(window).on(RESIZE, function() {
                        setTimeout(function() {
                            that._setOverflowWrapperWidth(initialWidth, initialCssWidth);
                            that._toggleScrollButtons(that.element, backwardBtn, forwardBtn, isHorizontal);
                        }, 300);
                    });
                }

                that._setOverflowWrapperWidth(initialWidth, initialCssWidth);
                that._toggleScrollButtons(that.element, backwardBtn, forwardBtn, isHorizontal);
            }
        },

        _overflowWrapper: function() {
            return this._scrollWrapper || this._popupsWrapper;
        },

        _setOverflowWrapperWidth: function(initialWidth, initialCssWidth) {
            var that = this;
            var wrapperCssWidth = that._scrollWrapper.css("width");

            that._scrollWrapper.css({ width: "" });
            var wrapperWidth = that._scrollWrapper.outerWidth();
            that._scrollWrapper.css({ width: wrapperCssWidth });

            var menuWidth = that.element.outerWidth();
            var borders = that.element[0].offsetWidth - that.element[0].clientWidth;

            if (menuWidth != wrapperWidth && wrapperWidth > 0) {
                var width = initialCssWidth ? Math.min(initialWidth, wrapperWidth) : wrapperWidth;
                that.element.width(width - borders);
                that._scrollWrapper.width(width);
            }
        },

        _reinitOverflow: function(options) {
            var that = this;
            var overflowChanged = ((options.scrollable && !that.options.scrollable) || (!options.scrollable && that.options.scrollable)) ||
                (options.scrollable && that.options.scrollable && (
                    options.scrollable.distance != that.options.scrollable.distance ||
                    options.scrollable.scrollButtonsPosition != that.options.scrollable.scrollButtonsPosition
                )) ||
                options.orientation != that.options.orientation;

            if (overflowChanged) {
                that._detachMenuEventsHandlers();
                that._destroyOverflow();
                that._initOverflow(options);
                that._attachMenuEventsHandlers();
            }
        },

        _destroyOverflow: function() {
            var that = this;
            var overflowWrapper = that._overflowWrapper();
            if (overflowWrapper) {
                overflowWrapper.off(NS);
                overflowWrapper.find(scrollButtonSelector).off(NS).remove();
                overflowWrapper.children(animationContainerSelector).each(function(i, popupWrapper) {
                    var ul = $(popupWrapper).find(".k-child-animation-container > .k-menu-popup");
                    ul.off(MOUSEWHEEL);
                    var popupParentLi = popupParentItem(ul, overflowWrapper);
                    if (popupParentLi.length) {
                        popupParentLi.append(popupWrapper);
                    }
                });

                overflowWrapper.find(popupOpenerSelector()).removeAttr("data-groupparent");
                overflowWrapper.find(popupGroupSelector()).removeAttr("data-group");
                that.element.off(MOUSEWHEEL);
                $(window).off(RESIZE);
                overflowWrapper.contents().unwrap();

                that._scrollWrapper = that._popupsWrapper = that._openedPopups = undefined;
            }
        },

        _initScrolling: function(scrollElement, backwardBtn, forwardBtn, isHorizontal, isRtl) {
            var that = this;
            var scrollable = that.options.scrollable;
            var distance = that.isNumeric(scrollable.distance) ? scrollable.distance : SCROLLSPEED;
            var mouseWheelDistance = distance / 2;
            var backward = "-=" + distance;
            var forward = "+=" + distance;
            var backwardDouble = "-=" + distance * 2;
            var forwardDouble = "+=" + distance * 2;
            var scrolling = false;
            var touchEvents = false;
            var scroll = function(value) {
                var scrollValue = isHorizontal ? { "scrollLeft": value } : { "scrollTop": value };
                scrollElement.finish().animate(scrollValue, "fast", "linear", function() {
                    if (scrolling) {
                        scroll(value);
                    }
                });
                that._toggleScrollButtons(scrollElement, backwardBtn, forwardBtn, isHorizontal, isRtl);
            };

            var mouseenterHandler = function(e) {
                if (!scrolling && !touchEvents) {
                    scroll(e.data.direction);
                    scrolling = true;
                }
            };

            var mousedownHandler = function(e) {
                var scrollValue = isHorizontal ? { "scrollLeft": e.data.direction } : { "scrollTop": e.data.direction };
                touchEvents = isTouch(e) || isPointerTouch(e);
                scrollElement.stop().animate(scrollValue, "fast", "linear", function() {
                    if (!touchEvents) {
                        $(e.currentTarget).trigger(MOUSEENTER);
                    } else {
                         that._toggleScrollButtons(scrollElement, backwardBtn, forwardBtn, isHorizontal, isRtl);
                         scrolling = true;
                    }
                });
                scrolling = false;

                e.stopPropagation();
                e.preventDefault();
            };

            backwardBtn.on(MOUSEENTER + NS, { direction: isRtl && isHorizontal ? forward : backward }, mouseenterHandler)
                .on(kendo.eventMap.down + NS, { direction: isRtl && isHorizontal ? forwardDouble : backwardDouble }, mousedownHandler);

            forwardBtn.on(MOUSEENTER + NS, { direction: isRtl && isHorizontal ? backward : forward }, mouseenterHandler)
                .on(kendo.eventMap.down + NS, { direction: isRtl && isHorizontal ? backwardDouble : forwardDouble }, mousedownHandler);

            backwardBtn.add(forwardBtn)
                .on(MOUSELEAVE + NS, function() {
                    scrollElement.stop();
                    scrolling = false;
                    that._toggleScrollButtons(scrollElement, backwardBtn, forwardBtn, isHorizontal, isRtl);
                });

            scrollElement.on(MOUSEWHEEL, function(e) {
                if (!e.ctrlKey && !e.shiftKey && !e.altKey) {
                    var wheelDelta = mousewheelDelta(e.originalEvent);
                    var scrollSpeed = Math.abs(wheelDelta) * mouseWheelDistance;
                    var value = (wheelDelta > 0 ? "+=" : "-=") + scrollSpeed;
                    var scrollValue = isHorizontal ? { "scrollLeft": value } : { "scrollTop": value };

                    that._closeChildPopups(scrollElement);

                    scrollElement.finish().animate(scrollValue, "fast", "linear", function() {
                        that._toggleScrollButtons(scrollElement, backwardBtn, forwardBtn, isHorizontal);
                    });
                    e.preventDefault();
                }
            });
        },

        isNumeric: function(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },

        _toggleScrollButtons: function(scrollElement, backwardBtn, forwardBtn, horizontal) {
            const neededSpace = this._getNeededSpaceForChildren(scrollElement, horizontal);
            const elementSpace = horizontal ? kendo._outerWidth(this.element) : kendo._outerHeight(this.element);

            backwardBtn.toggle(neededSpace > elementSpace);
            forwardBtn.toggle(neededSpace > elementSpace);

            const currentScroll = horizontal ? kendo.scrollLeft(scrollElement) : scrollElement.scrollTop();
            const elementIsPopup = scrollElement.is(popupSelector) || scrollElement.parent().is(childAnimationContainerSelector);

            let disableNextButton = Math.abs(currentScroll - (scrollElement[0].scrollWidth - scrollElement[0].offsetWidth)) <= 1;

            if (!horizontal) {
                disableNextButton = Math.abs(currentScroll - (scrollElement[0].scrollHeight - scrollElement[0].offsetHeight)) <= 1;
            }

            if (elementIsPopup) {
                disableNextButton = Math.abs(currentScroll - (scrollElement[0].scrollHeight - scrollElement[0].offsetHeight) - 1) <= 1;
            }

            backwardBtn.toggleClass(DISABLEDSTATE, Math.floor(currentScroll) === 0);
            forwardBtn.toggleClass(DISABLEDSTATE, disableNextButton);
        },

        setOptions: function(options) {
            var animation = this.options.animation;

            this._animations(options);

            options.animation = extend(true, animation, options.animation);

            if ("dataSource" in options) {
                this._dataSource(options);
            }

            this._updateClasses();
            this._wrapGroups();
            this._reinitOverflow(options);

            Widget.fn.setOptions.call(this, options);
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that._detachMenuEventsHandlers();

            that._destroyOverflow();

            kendo.destroy(that.element);
        },

        enable: function(element, enable) {
            this._toggleDisabled(element, enable !== false);

            return this;
        },

        disable: function(element) {
            this._toggleDisabled(element, false);

            return this;
        },

        attemptGetItem: function(candidate) {
            candidate = candidate || this.element;
            var item = this.element.find(candidate);
            var overflowWrapper = this._overflowWrapper();

            if (item.length || candidate === this.element) {
                return item;
            } else if (overflowWrapper) {
                return overflowWrapper.find(candidate);
            } else {
                return $();
            }
        },

        append: function(item, referenceItem) {
            referenceItem = this.attemptGetItem(referenceItem);

            var inserted = this._insert(item, referenceItem, referenceItem.length ? this._childPopupElement(referenceItem).children().eq(0) : null);

            each(inserted.items, function(i) {
                inserted.group.append(this);
                updateArrow(this);
                storeItemSelectEventHandler(this, item[i] || item);
            });

            updateArrow(referenceItem);
            updateFirstLast(inserted.group.find(".k-first, .k-last").add(inserted.items));
            updateHasAriaPopup(getParentLiItems(inserted.group));

            return this;
        },

        insertBefore: function(item, referenceItem) {
            referenceItem = this.attemptGetItem(referenceItem);

            var inserted = this._insert(item, referenceItem, referenceItem.parent());

            each(inserted.items, function(i) {
                referenceItem.before(this);
                updateArrow(this);
                updateFirstLast(this);
                storeItemSelectEventHandler(this, item[i] || item);
            });

            updateFirstLast(referenceItem);

            return this;
        },

        insertAfter: function(item, referenceItem) {
            referenceItem = this.attemptGetItem(referenceItem);

            var inserted = this._insert(item, referenceItem, referenceItem.parent());

            each(inserted.items, function(i) {
                referenceItem.after(this);
                updateArrow(this);
                updateFirstLast(this);
                storeItemSelectEventHandler(this, item[i] || item);
            });

            updateFirstLast(referenceItem);

            return this;
        },

        _insert: function(item, referenceItem, parent) {
            var that = this,
                items, groups;

            if (!referenceItem || !referenceItem.length) {
                parent = that.element;
            }

            var plain = $.isPlainObject(item) || item instanceof kendo.data.ObservableObject,
                groupData = {
                    firstLevel: parent.hasClass(MENU),
                    horizontal: parent.hasClass(MENU + "-horizontal"),
                    expanded: true,
                    length: parent.children().length
                };

            if (referenceItem && !parent.length) {
                parent = $(that.renderGroup({ group: groupData, options: that.options })).css("display", "none").appendTo(referenceItem);
                kendo.applyStylesFromKendoAttributes(parent, ["display"]);
            }

            if (plain || isArray(item) || item instanceof kendo.data.ObservableArray) { // is JSON
                items = $($.map(plain ? [ item ] : item, function(value, idx) {
                            if (typeof value === "string") {
                                return $(value).get();
                            } else {
                                let itemElement = $(that.renderItem({
                                    group: groupData,
                                    item: extend(value, { index: idx })
                                }));

                                kendo.applyStylesFromKendoAttributes(itemElement, ["display"]);
                                return itemElement.get();
                            }
                        }));
            } else {
                if (typeof item == "string" && item.charAt(0) != "<") {
                    items = that.element.find(item);
                } else {
                    items = $(item);
                }

                groups = items.find("> ul")
                                .addClass("k-menu-group k-menu-group-md")
                                .attr(ROLE, "menu");

                items = items.filter("li");

                items.add(groups.find("> li")).each(function() {
                    updateItemClasses(this);
                });
            }

            parent = parent.is(popupSelector) ? parent.find(groupSelector).first() : parent;

            return { items: items, group: parent };
        },

        remove: function(element) {
            element = this.attemptGetItem(element);

            var that = this,
                parent = element.parentsUntil(that.element, allItemsSelector),
                group = element.parent("ul:not(.k-menu)");

            element.remove();

            if (group && !group.children(allItemsSelector).length) {
                var parentItems = getParentLiItems(group);

                var container = group.parent(animationContainerSelector);

                if (container.length) {
                    container.remove();
                } else {
                    group.remove();
                }

                updateHasAriaPopup(parentItems);
            }

            if (parent.length) {
                parent = parent.eq(0);

                updateArrow(parent);
                updateFirstLast(parent);
            }

            return that;
        },

        _openAfterLoad: function(element, dataItem) {
            var that = this;
            if (dataItem.loaded()) {
                that.open(element);
                that._loading = false;
            } else {
                dataItem.one(CHANGE, function() {
                    element.find(ICON_SELECTOR).children().removeClass("k-i-loading");
                    if (that._loading) {
                        that.open(element);
                        that._loading = false;
                    }
                });
            }
        },

        _createPopup: function(div, options) {
            let that = this;
            let overflowWrapper = that._overflowWrapper();
            return div.kendoPopup(extend({
                activate: function() { that._triggerEvent({ item: this.wrapper.parent(), type: ACTIVATE }); },
                deactivate: function(e) {
                    that._closing = false;
                    e.sender.element // Restore opacity after fade.
                        .removeData("targetTransform")
                        .css({ opacity: "" });
                    that._triggerEvent({ item: this.wrapper.parent(), type: DEACTIVATE });
                },
                open: that._popupOpen.bind(that),
                close: function(e) {
                    that._closing = e.sender.element;
                    var li = e.sender.wrapper.parent();

                    if (overflowWrapper) {
                        var popupId = e.sender.element.data(POPUP_ID_ATTR);
                        if (popupId) {
                            li = (overflowWrapper || that.element).find(popupOpenerSelector(popupId));
                        }
                        e.sender.wrapper.children(scrollButtonSelector).hide();
                    }

                    if (!that._triggerEvent({ item: li[0], type: CLOSE })) {
                        li.css(ZINDEX, li.data(ZINDEX));
                        li.removeData(ZINDEX);

                        if (that.options.scrollable) {
                            li.parent().siblings(scrollButtonSelector).css({ zIndex: "" });
                        }

                        if (touch || allPointers || kendo.support.mouseAndTouchPresent) {
                            li.removeClass(HOVERSTATE);
                        }
                    } else {
                        e.preventDefault();
                    }

                    const focusedSubItem = e.sender.element.find("." + FOCUSEDSTATE);
                    if (focusedSubItem.length) {
                        that._removeFocusItem();
                    }
                }
            }, options)).data(KENDOPOPUP);
        },

        open: function(element) {
            var that = this;
            var options = that.options;
            var horizontal = options.orientation == "horizontal";
            var direction = options.direction;
            var isRtl = kendo.support.isRtl(that.wrapper);
            var overflowWrapper = that._overflowWrapper();
            element = (overflowWrapper || that.element).find(element);

            var dataItem = that.dataSource && that.dataSource.getByUid(element.data(kendo.ns + "uid"));

            if (dataItem && dataItem.hasChildren && !dataItem.loaded() && !that._loading) {
                that._loading = true;
                element.find(ICON_SELECTOR).children().addClass("k-i-loading");
                dataItem.load();
                that._openAfterLoad(element, dataItem);
                return;
            }

            if (/^(top|bottom|default)$/.test(direction)) {
                if (isRtl) {
                    direction = horizontal ? (direction + " left").replace("default", "bottom") : "left";
                } else {
                    direction = horizontal ? (direction + " right").replace("default", "bottom") : "right";
                }
            }

            var visiblePopups = ">.k-popup:visible,>.k-animation-container > .k-child-animation-container > .k-menu-popup:visible";
            var closePopup = function() {
                var popup = $(this).data(KENDOPOPUP);
                if (popup) {
                    // Use the built-in close method to play the hoverDelay from the options
                    that.close($(this).closest("li.k-item"), true);
                }
            };

            element.siblings()
                   .find(visiblePopups)
                   .each(closePopup);

            if (overflowWrapper) {
                element.find(visiblePopups).each(closePopup);
            }

            if (that.options.openOnClick) {
                that.clicked = true;
            }

            element.each(function() {
                var li = $(this);

                clearTimeout(li.data(TIMER));
                clearTimeout(that._timerTimeout);
                that._timerTimeout = setTimeout(function() {
                    var div = li.find("> .k-menu-popup, > .k-animation-container > .k-child-animation-container > .k-menu-popup").filter(":hidden").first();
                    var popup;
                    var overflowPopup;

                    if (!div[0] && overflowWrapper) {
                        overflowPopup = that._getPopup(li);
                        div = overflowPopup && overflowPopup.element;
                    }
                    if (div.is(":visible")) {
                        return;
                    }

                    if (div[0] && that._triggerEvent({ item: li[0], type: OPEN }) === false) {
                        const menuParent = div.children('.k-menu-scroll-wrapper').length ? div.children('.k-menu-scroll-wrapper') : div;
                        const menu = that._groupElementsInitialSpace.find(({ element }) => menuParent.children('ul').is(element));

                        let maxHeight = "";
                        if (menu && Object.keys(menu).length > 0) {
                            if (menu.height > 0) {
                                maxHeight = menu.height;
                            }

                            that._popupToBeOpened = menu;

                            if (menu.inlineHeight) {
                                $(menu.element).css({ height: menu.inlineHeight });
                            } else {
                                $(menu.element).css({ height: "" });
                            }
                        }
                        const rect = li[0].getBoundingClientRect();
                        const fits = ((menu && menu.inlineHeight) || maxHeight) <= (window.innerHeight - rect.top);

                        const maxHeightNone = options.scrollable || options.autoSize;
                        const overflow = options.autoSize && !fits ? "auto" : "visible";
                        div.css({ maxHeight: maxHeightNone ? "" : maxHeight, overflow: overflow });

                        li.data(ZINDEX, li.css(ZINDEX));
                        var nextZindex = that.nextItemZIndex++;
                        li.css(ZINDEX, nextZindex);

                        if (that.options.scrollable) {
                            li.parent().siblings(scrollButtonSelector).css({ zIndex: ++nextZindex });
                        }

                        popup = div.data(KENDOPOPUP);
                        var root = li.parent().hasClass(MENU),
                            parentHorizontal = root && horizontal,
                            directions = parseDirection(direction, root, isRtl),
                            effects = options.animation.open.effects,
                            openEffects = effects !== undefined ? effects : "slideIn:" + getEffectDirection(direction, root),
                            collision;

                        if (options.popupCollision !== null) {
                            collision = options.popupCollision;
                        } else if (parentHorizontal) {
                            collision = "fit";
                        } else {
                            collision = "fit flip";
                        }

                        if (!popup) {
                            popup = that._createPopup(div, {
                                origin: directions.origin,
                                position: directions.position,
                                collision: collision,
                                anchor: li,
                                appendTo: overflowWrapper || li,
                                animation: {
                                    open: extend(true, { effects: openEffects }, options.animation.open),
                                    close: options.animation.close
                                },
                            });

                            div.closest(animationContainerSelector).removeAttr(ROLE);
                        } else {
                            popup = div.data(KENDOPOPUP);
                            popup.options.origin = directions.origin;
                            popup.options.position = directions.position;
                            popup.options.animation.open.effects = openEffects;
                        }
                        div.removeAttr("aria-hidden");
                        li.attr(ARIA_EXPANDED, true);

                        that._configurePopupOverflow(popup, li);

                        popup._hovered = true;
                        popup.open();

                        that._initPopupScrolling(popup);
                    }

                }, that.options.hoverDelay);

                li.data(TIMER, that._timerTimeout);
            });

            return that;
        },

        _configurePopupOverflow: function(popup, popupOpener) {
            var that = this;
           if (that.options.scrollable) {
                that._wrapPopupElement(popup);
                if (!popupOpener.attr("data-groupparent")) {
                    var groupId = new Date().getTime();
                    popupOpener.attr("data-groupparent", groupId);
                    popup.element.attr("data-group", groupId);
                }
           }
        },

        _wrapPopupElement: function(popup) {
            if (!popup.element.parent().is(childAnimationContainerSelector)) {
                popup.wrapper = kendo.wrap(popup.element, popup.options.autosize)
                    .css({
                        overflow: "hidden",
                        display: "block",
                        position: "absolute"
                    });
            }
        },

        _initPopupScrolling: function(popup, isHorizontal, skipMouseEvents) {
            var that = this;
            const popupElement = popup.element;
            const scrollWrapper = popupElement.children('.k-menu-scroll-wrapper');
            const menu = scrollWrapper.length ? $(scrollWrapper.children('ul')) : $(popupElement.children('ul'));
            let childrenScrollSpace = that._getNeededSpaceForChildren(menu, isHorizontal);
            let initScrolling = false;

            if (isHorizontal) {
                initScrolling = (kendo._outerWidth(popupElement) < childrenScrollSpace);
            } else {
                initScrolling = (kendo._outerHeight(popupElement) < childrenScrollSpace);
            }


            if (that.options.scrollable && ((popupElement[0].scrollHeight > popupElement[0].offsetHeight) || initScrolling)) {
                that._initPopupScrollButtons(popup, isHorizontal, skipMouseEvents);
            } else {
                if (scrollWrapper.length) {
                    scrollWrapper.find(scrollButtonSelector).remove();
                    menu.unwrap();
                }
            }
        },

        _scrollButtonsMouseEnter: function() {
            let that = this;
            let popup = that.popup;
            let overflowWrapper = that._overflowWrapper();
            $(getChildPopups(popup.element, overflowWrapper)).each(function(i, p) {
                let popupOpener = overflowWrapper.find(popupOpenerSelector(p.data(POPUP_ID_ATTR)));
                that.close(popupOpener);
            });
        },

        _scrollButtonsMouseLeave: function() {
            let that = this;
            let popup = that.popup;
            setTimeout(function() {
                if ($.isEmptyObject(that._openedPopups)) {
                    that._closeParentPopups(popup.element);
                }
            }, DELAY);
        },

        _initPopupScrollButtons: function(popup, isHorizontal, skipMouseEvents) {
            let that = this,
                scrollButtons = popup.wrapper.find(scrollButtonSelector),
                element = popup.element,
                scrollWrapper = element.children('.k-menu-scroll-wrapper'),
                menu = element.children('ul');
                that._denyOpening = true;
                if (!menu.length && scrollWrapper.length) {
                    menu = scrollWrapper.children('ul');
                }

                if (!isHorizontal) {
                    menu.css({
                        overflow: 'hidden',
                    });
                }
                const wrapper = scrollWrapper.length > 0 ? scrollWrapper : menu.wrap(`<div class="k-menu-scroll-wrapper${!isHorizontal ? " k-menu-scroll-wrapper-vertical" : ""}"></div>`).parent();
                if (!scrollButtons.length) {
                    let backwardBtn = $(that.templates.scrollButton({ direction: isHorizontal ? "left" : "up" }));
                    let forwardBtn = $(that.templates.scrollButton({ direction: isHorizontal ? "right" : "down" }));

                    scrollButtons = backwardBtn.add(forwardBtn);
                    scrollButtons.css({
                        width: !isHorizontal && '100%',
                    });

                    backwardBtn.prependTo(wrapper);
                    forwardBtn.appendTo(wrapper);

                    that._initScrolling(menu, backwardBtn, forwardBtn, isHorizontal);
                    if (!skipMouseEvents) {
                        scrollButtons.on(MOUSEENTER + NS, function() {
                            let overflowWrapper = that._overflowWrapper();
                            $(getChildPopups(popup.element, overflowWrapper)).each(function(i, p) {
                                let popupOpener = overflowWrapper.find(popupOpenerSelector(p.data(POPUP_ID_ATTR)));
                                that.close(popupOpener);
                            });
                        })
                        .on(MOUSELEAVE + NS, function(e) {
                            setTimeout(function() {
                                if ($.isEmptyObject(that._openedPopups) && !popup.element.find(e.relatedTarget).length) {
                                    that._closeParentPopups(popup.element);
                                }
                            }, DELAY);
                        });
                    }
                } else {
                    if (scrollButtons.is(':hidden')) {
                        scrollButtons.show();
                    }
                }

                if (scrollButtons.length > 0 && !isHorizontal) {
                    const initialInlineHeight = that._popupToBeOpened ? that._popupToBeOpened.inlineHeight : "";

                    menu.css({ height: initialInlineHeight !== '' ? initialInlineHeight : `${kendo._outerHeight(popup.wrapper) - (kendo._outerHeight(scrollButtons) * 2)}px` });
                }

                that._toggleScrollButtons(menu, scrollButtons.first(), scrollButtons.last(), isHorizontal);
                that._denyOpening = false;
        },

        _popupOpen: function(e) {
            if (!this._keyTriggered) {
                e.sender.element.find("." + FOCUSEDSTATE).removeClass(FOCUSEDSTATE);
            }
            if (this.options.scrollable) {
                this._setPopupHeight(e.sender);
            }
        },

        _setPopupHeight: function(popup, isFixed) {
            let popupElement = popup.element,
                popups = popupElement.add(popupElement.parent(childAnimationContainerSelector));

            popups.height((popupElement.hasClass(MENU) && this._initialHeight) || "");

            let location = popup._location(isFixed),
                windowHeight = $(window).height(),
                popupOuterHeight = location.height,
                popupOffsetTop = isFixed ? 0 : Math.max(location.top, 0),
                scrollTop = isFixed ? 0 : parentsScroll(this._overflowWrapper()[0], "scrollTop"),
                bottomScrollbar = window.innerHeight - windowHeight,
                maxHeight = windowHeight + bottomScrollbar,
                canFit = maxHeight + scrollTop > popupOuterHeight + popupOffsetTop;

            if (!canFit) {
                let popupViewportGap = windowHeight * 0.05, // 5% gap from the viewport.
                height = Math.min(maxHeight, maxHeight - popupOffsetTop - popupViewportGap + scrollTop);
                popups.css({ height: height + "px" });
                popupElement.css({ overflow: 'hidden' });
            }
        },

        close: function(items, dontClearClose) {
            var that = this;
            var overflowWrapper = that._overflowWrapper();
            var element = (overflowWrapper || that.element);

            items = element.find(items);

            if (!items.length) {
                items = element.find(">.k-item");
            }

            var hasChildPopupsHovered = function(currentPopup) {
                var result = false;
                if ($.isEmptyObject(that._openedPopups)) {
                    return result;
                }
                $(getChildPopups(currentPopup, overflowWrapper)).each(function(i, popup) {
                    result = !!that._openedPopups[popup.data(POPUP_ID_ATTR).toString()];
                    return !result;
                });
                return result;
            };

            var isPopupMouseLeaved = function(opener) {
                var groupId = opener.data(POPUP_OPENER_ATTR);
                return (!overflowWrapper || !groupId || !that._openedPopups[groupId.toString()]);
            };

            items.each(function() {
                var li = $(this);

                li.attr(ARIA_EXPANDED, false);

                if (!dontClearClose && that._isRootItem(li)) {
                    that.clicked = false;
                }

                clearTimeout(li.data(TIMER));

                li.data(TIMER, setTimeout(function() {
                    var popup = that._getPopup(li);
                    if (popup && (isPopupMouseLeaved(li) || that._forceClose)) {
                        if (!that._forceClose && hasChildPopupsHovered(popup.element)) {
                            return;
                        }

                        popup.close();
                        popup.element.attr("aria-hidden", true);

                        if (overflowWrapper) {
                            if (that._forceClose && items.last().is(li[0])) {
                                delete that._forceClose;
                            }
                        }
                    }
                }, that.options.hoverDelay));
            });

            return that;
        },

        _getPopup: function(li) {
            var that = this;
            var popup = li.find(".k-menu-popup:not(.k-list-container):not(.k-calendar-container):visible").first().data(KENDOPOPUP);
            var overflowWrapper = that._overflowWrapper();

            if (!popup && overflowWrapper) {
                var groupId = li.data(POPUP_OPENER_ATTR);
                if (groupId) {
                    var popupElement = overflowWrapper.find(popupGroupSelector(groupId));
                    popup = popupElement.data(KENDOPOPUP);
                }
            }
            return popup;
        },

        _toggleDisabled: function(items, enable) {
            this.element.find(items).each(function() {
                $(this)
                    .toggleClass(DISABLEDSTATE, !enable)
                    .attr("aria-disabled", !enable);
            });
        },

        _toggleHover: function(e) {
            var target = $(kendo.eventTarget(e) || e.target).closest(allItemsSelector),
                isEnter = e.type == MOUSEENTER || MOUSEDOWN.indexOf(e.type) !== -1;

            target.siblings().removeClass(HOVERSTATE);

            if (!target.parents("li." + DISABLEDSTATE).length) {
                target.toggleClass(HOVERSTATE, isEnter || e.type == "mousedown" || e.type == "pointerover" || e.type == TOUCHSTART);
            }
        },

        _preventClose: function() {
            if (!this.options.closeOnClick) {
                this._closurePrevented = true;
            }
        },

        _checkActiveElement: function(e) {
            var that = this,
                focusedItem = $(e ? e.currentTarget : this._focusItem()),
                target = that._findRootParent(focusedItem)[0];

            if (!this._closurePrevented) {
                setTimeout(function() {
                    if (!document.hasFocus() || (!contains(target, kendo._activeElement()) && e && !contains(target, e.currentTarget))) {
                        that.close(target);
                    }
                }, 0);
            }

            this._closurePrevented = false;
        },

        _removeFocusItem: function() {
            var oldFocusedItem = this._focusItem();
            if (oldFocusedItem && oldFocusedItem.hasClass(FOCUSEDSTATE)) {
                oldFocusedItem.removeClass(FOCUSEDSTATE);
                this._oldFocusItem = null;
            }
        },

        _wrapGroups: function() {
            var that = this;
            const elements = that.element.find("li > ul");


            that._groupElementsInitialSpace = Array.from(elements).map(element => {
                let elementConfig;
                let forceShow = false;
                let parentPopup = element.closest(".k-animation-container") || element.closest(".k-popup");

                parentPopup = $(parentPopup);

                if (parentPopup && parentPopup.length && !parentPopup.is(":visible")) {
                    forceShow = true;
                    parentPopup.show();
                }

                elementConfig = {
                    element,
                    width: kendo._outerWidth(element),
                    height: kendo._outerHeight(element),
                    inlineHeight: element.style && element.style.height ? element.style.height : ""
                };

                if (forceShow) {
                    parentPopup.hide();
                }

                return elementConfig;
        });

            elements
                .filter(function() {
                    return !$(this).parent().hasClass("k-menu-popup");
                })
                .wrap("<div class='k-menu-popup k-popup'></div>")
                .parent("div")
                .attr("aria-hidden", that.element.is(":visible"))
                .hide();

            that.element.find("ul").each(function() {
                var group = $(this);
                var id = kendo.guid();
                group.attr("id", id)
                    .closest("li")
                    .attr("aria-controls", id);
            });
        },

        _updateClasses: function() {
            var element = this.element,
                nonContentGroupsSelector = ".k-menu-init div ul",
                items;

            element.removeClass("k-menu-horizontal k-menu-vertical");
            element.addClass("k-reset k-header k-menu-init " + MENU).addClass(MENU + "-" + this.options.orientation);

            if (this.options.orientation === "vertical") {
                element.attr("aria-orientation", "vertical");
            } else {
                element.attr("aria-orientation", "horizontal");
            }

            element.find("li > ul")
                   .filter(function() {
                       return !kendo.support.matchesSelector.call(this, nonContentGroupsSelector);
                   })
                   .addClass("k-menu-group k-menu-group-md")
                   .attr(ROLE, "menu")
                   .parent("li")
                   .attr("aria-haspopup", "true")
                   .end()
                   .find("li > div")
                   .addClass("k-content")
                   .attr("tabindex", "-1"); // Capture the focus before the Menu

            element.find("li[aria-haspopup]").attr(ARIA_EXPANDED, false);

            items = element.find("> li,.k-menu-group > li");

            element.removeClass("k-menu-init");

            items.each(function() {
                updateItemClasses(this);
            });
        },

        _mouseenter: function(e) {
            var that = this;
            var element = $(e.currentTarget);
            var hasChildren = that._itemHasChildren(element);
            var popupId = element.data(POPUP_OPENER_ATTR) || element.closest(popupSelector).data(POPUP_ID_ATTR);
            var pointerTouch = isPointerTouch(e);
            var isParentClosing = false;

            if (that._denyOpening) {
                return;
            }

            if (popupId) {
                that._openedPopups[popupId.toString()] = true;
            }

            if (that._closing) {
                isParentClosing = !!that._closing.find(element).length;
            }

            if (isParentClosing) {
                return;
            }

            that._keyTriggered = false;

            if ((that.options.openOnClick.rootMenuItems && that._isRootItem(element.closest(allItemsSelector))) ||
                (that.options.openOnClick.subMenuItems && !that._isRootItem(element.closest(allItemsSelector)))) {
                return;
            }

            if ((that.options.openOnClick === false ||
                (that.options.openOnClick.rootMenuItems === false && that._isRootItem(element.closest(allItemsSelector))) ||
                (that.options.openOnClick.subMenuItems === false && !that._isRootItem(element.closest(allItemsSelector))) || that.clicked) && !touch &&
                !(pointerTouch && that._isRootItem(element.closest(allItemsSelector)))) {

                if (!contains(e.currentTarget, e.relatedTarget) && hasChildren) {
                    that.open(element);
                }
            }

            if (that.options.openOnClick === true && that.clicked || touch) {
                element.siblings().each(function(_, sibling) {
                    that.close(sibling, true);
                });
            }
        },

        _mousedown: function(e) {
            var that = this;
            var element = $(e.currentTarget);
            // needs to close subMenuItems
            that._mousedownedElement = element;
            if (that.options.openOnClick.subMenuItems && !that._isRootItem(element) || touch) {
                element.siblings().each(function(_, sibling) {
                    that.close(sibling, true);
                });
            }
        },

        _mouseleave: function(e) {
            var that = this;
            var element = $(e.currentTarget);
            var popupOpener = element.data(POPUP_OPENER_ATTR);
            var hasChildren = element.children(popupSelector).length || popupOpener;
            var $window = $(window);

            if (popupOpener) {
                delete that._openedPopups[popupOpener.toString()];
            }

            if (element.parentsUntil(animationContainerSelector, ".k-list-container,.k-calendar-container")[0]) {
                e.stopImmediatePropagation();
                return;
            }

            if ((that.options.openOnClick === false || (!that.options.openOnClick.rootMenuItems && that._isRootItem(element)) ||
                (!that.options.openOnClick.subMenuItems && !that._isRootItem(element))) && !touch && !isPointerTouch(e) &&
                !contains(e.currentTarget, e.relatedTarget || e.target) && hasChildren &&
                !contains(e.currentTarget, kendo._activeElement())) {
                    that.close(element, true);
                    that._loading = false;
                    return;
            }

            // Detect if cursor goes outside the viewport of the browser
            if ( (kendo.support.browser.msie && !e.toElement && !e.relatedTarget && !isPointerTouch(e)) ||
                e.clientX < 0 || e.clientY < 0 ||
                e.clientY > $window.height() ||
                e.clientX > $window.width()) {
                that.close(element);
            }
        },

        _mouseenterPopup: function(e) {
            var that = this;
            var popupElement = $(e.currentTarget);

            if (popupElement.parent().is(childAnimationContainerSelector)) {
                 return;
            }

            popupElement = popupElement.find(popupSelector);
            var popupId = popupElement.data(POPUP_ID_ATTR);

            if (popupId) {
                that._openedPopups[popupId.toString()] = true;
            }
        },

        _mouseleavePopup: function(e) {
            var that = this;
            var popupElement = $(e.currentTarget);

            if (!isPointerTouch(e) && popupElement.is(animationContainerSelector)) {
                that._closePopups(popupElement.find(popupSelector));
            }
        },

        _closePopups: function(rootPopup) {
            var that = this;
            var overflowWrapper = that._overflowWrapper();
            var popupId = rootPopup.data(POPUP_ID_ATTR);

            if (popupId) {
                delete that._openedPopups[popupId.toString()];
                var groupParent = overflowWrapper.find(popupOpenerSelector(popupId));

                setTimeout(function() {
                    if (that.options.openOnClick) {
                        that._closeChildPopups(rootPopup);
                    } else {
                        if ($.isEmptyObject(that._openedPopups)) {
                            var innerPopup = that._innerPopup(rootPopup);
                            that._closeParentPopups(innerPopup);
                        } else {
                            that.close(groupParent, true);
                        }
                    }
                }, 0);
            }
        },

        _closeChildPopups: function(current) {
            var that = this;
            var overflowWrapper = that._overflowWrapper();
            $(getChildPopups(current, overflowWrapper)).each(function() {
                var popupOpener = overflowWrapper.find(popupOpenerSelector(this.data(POPUP_ID_ATTR)));
                that.close(popupOpener, true);
            });
        },

        _innerPopup: function(current) {
            var overflowWrapper = this._overflowWrapper();
            var popups = getChildPopups(current, overflowWrapper);
            return popups[popups.length - 1] || current;
        },

        _closeParentPopups: function(current) {
            var that = this;
            var overflowWrapper = that._overflowWrapper();
            var popupId = current.data(POPUP_ID_ATTR);
            const target = overflowWrapper ?? that.element;
            var popupOpener = target.find(popupOpenerSelector(popupId));
            popupId = popupOpener.closest(popupSelector).data(POPUP_ID_ATTR);
            that.close(popupOpener, true);
            while (popupId && !that._openedPopups[popupId]) {
                if (popupOpener.parent().is(menuSelector)) {
                    break;
                }
                popupOpener = overflowWrapper.find(popupOpenerSelector(popupId));
                that.close(popupOpener, true);
                popupId = popupOpener.closest(popupSelector).data(POPUP_ID_ATTR);
            }
        },

        _click: function(e) {
            var that = this, openHandle,
                options = that.options,
                target = $(kendo.eventTarget(e)),
                targetElement = target[0],
                nodeName = target[0] ? target[0].nodeName.toUpperCase() : "",
                formNode = (nodeName == "INPUT" || nodeName == "SELECT" || nodeName == "BUTTON" || nodeName == "LABEL"),
                link = target.closest(LINK_SELECTOR),
                element = target.closest(allItemsSelector),
                itemElement = element[0],
                href = link.attr("href"), childGroup, childGroupVisible,
                targetHref = target.attr("href"),
                sampleHref = $("<a href='#' />").attr("href"),
                isLink = (!!href && href !== sampleHref),
                isLocalLink = isLink && !!href.match(/^#/),
                isTargetLink = (!!targetHref && targetHref !== sampleHref),
                overflowWrapper = that._overflowWrapper(),
                shouldCloseTheRootItem;

            if (targetElement && (!targetElement.parentNode || !itemElement)) {
                return;
            }

            if ($(target).closest("span").parent().hasClass('k-menu-expand-arrow')) {
                this._lastClickedElement = itemElement;
            }

            while (targetElement && targetElement.parentNode != itemElement) {
                targetElement = targetElement.parentNode;
            }

            if ($(targetElement).is(templateSelector)) {
                return;
            }

            if (element.hasClass(DISABLEDSTATE)) {
                e.preventDefault();
                return;
            }

            if (!e.handled && that._triggerSelect(target, itemElement) && !formNode) { // We shouldn't stop propagation and shoudn't prevent form elements.
                e.preventDefault();
            }

            e.handled = true;

            childGroup = element.children(popupSelector);
            if (overflowWrapper) {
                var childPopupId = element.data(POPUP_OPENER_ATTR);
                if (childPopupId) {
                    childGroup = overflowWrapper.find(popupGroupSelector(childPopupId));
                }
            }
            childGroupVisible = childGroup.is(":visible");
            shouldCloseTheRootItem = options.openOnClick && childGroupVisible && that._isRootItem(element);

            if (options.closeOnClick && (!isLink || isLocalLink) && (!childGroup.length || shouldCloseTheRootItem)) {
                element.removeClass(HOVERSTATE).css("height"); // Force refresh for Chrome
                that._oldFocusItem = that._findRootParent(element);
                var item = that._parentsUntil(link, that.element, allItemsSelector);
                that._forceClose = !!overflowWrapper;
                that.close(item);
                that.clicked = false;
                return;
            }

            if (isLink && e.enterKey) {
                link[0].click();
            }

            if (((!that._isRootItem(element) || options.openOnClick === false) && !options.openOnClick.subMenuItems) && !kendo.support.touch && !(isPointerTouch(e) && that._isRootItem(element.closest(allItemsSelector)))) {
                return;
            }

            if (!isLink && !formNode && !isTargetLink) {
                e.preventDefault();
            }

            that.clicked = true;
            openHandle = childGroup.is(":visible") ? CLOSE : OPEN;
            if (!options.closeOnClick && openHandle == CLOSE) {
                return;
            }
            that[openHandle](element);
        },

        _parentsUntil: function(context, top, selector) {
            var overflowWrapper = this._overflowWrapper();
            if (!overflowWrapper) {
                return context.parentsUntil(top, selector);
            } else {
                var parents = overflowMenuParents(context, overflowWrapper);
                var result = [];
                $(parents).each(function() {
                    var parent = $(this);
                    if (parent.is(top)) {
                        return false;
                    }
                    if (parent.is(selector)) {
                        result.push(this);
                    }
                });
                return $(result);
            }
        },

        _triggerSelect: function(target, itemElement) {
            target = target.is(".k-link") ? target : target.closest(".k-link");

            var selectHandler = target.data("selectHandler"),
                itemSelectEventData;

            if (selectHandler) {
                itemSelectEventData = this._getEventData(target);
                selectHandler.call(this, itemSelectEventData);
            }

            var isSelectItemDefaultPrevented = itemSelectEventData && itemSelectEventData.isDefaultPrevented();
            var isSelectDefaultPrevented = this._triggerEvent({ item: itemElement, type: SELECT });
            return isSelectItemDefaultPrevented || isSelectDefaultPrevented;
        },

        _getEventData: function(target) {
            var eventData = {
                sender: this,
                target: target,
                _defaultPrevented: false,
                preventDefault: function() {
                    this._defaultPrevented = true;
                },
                isDefaultPrevented: function() {
                    return this._defaultPrevented;
                }
            };
            return eventData;
        },

        _documentClick: function(e) {
            var that = this;
            var target = $(e.target).closest("span").parent().hasClass('k-menu-expand-arrow') ? that._lastClickedElement : e.target;

            if (contains((that._overflowWrapper() || that.element)[0], target)) {
                that._lastClickedElement = undefined;
                return;
            }

            that.clicked = false;
        },

        _focus: function(e) {
            var that = this,
                target = e.target,
                focusItem = that._focusItem(),
                active = activeElement();

            if (that._mousedownedElement) {
                that._mousedownedElement = null;
                return;
            }

            if (target != that.wrapper[0] && !$(target).is(":kendoFocusable")) {
                e.stopPropagation();
                $(target).closest(".k-content").closest(".k-menu-popup").closest(".k-item").addClass(FOCUSEDSTATE);
                that.wrapper.trigger("focus");
                return;
            }
            if (active === e.currentTarget) {
                if (focusItem.length) {
                    that._moveFocus([], focusItem);
                } else if (!that._oldFocusItem) {
                    that._moveFocus([], that.wrapper.children().first());
                }
            }
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                focusItem = that._oldFocusItem,
                target,
                belongsToVertical,
                hasChildren,
                isRtl = kendo.support.isRtl(that.wrapper);

            if (e.target != e.currentTarget && key != keys.ESC) {
                return;
            }

            if (!focusItem) {
                focusItem = that._oldFocusItem = that._focusItem();
            }

            belongsToVertical = that._itemBelongsToVertival(focusItem);
            hasChildren = that._itemHasChildren(focusItem);
            that._keyTriggered = true;

            if (key == keys.RIGHT) {
                target = that[isRtl ? "_itemLeft" : "_itemRight"](focusItem, belongsToVertical, hasChildren);
            } else if (key == keys.LEFT) {
                target = that[isRtl ? "_itemRight" : "_itemLeft"](focusItem, belongsToVertical, hasChildren);
            } else if (key == keys.DOWN) {
                target = that._itemDown(focusItem, belongsToVertical, hasChildren);
            } else if (key == keys.UP) {
                target = that._itemUp(focusItem, belongsToVertical, hasChildren);
            } else if (key == keys.HOME) {
                that._moveFocus(focusItem, focusItem.parent().children(":visible").first());
                e.preventDefault();
            } else if (key == keys.END) {
                that._moveFocus(focusItem, focusItem.parent().children(":visible").last());
                e.preventDefault();
            } else if (key == keys.ESC) {
                target = that._itemEsc(focusItem, belongsToVertical);
            } else if (key == keys.ENTER || key == keys.SPACEBAR) {
                target = focusItem.children(".k-link");
                if (target.length > 0) {
                    that._click({ target: target[0], preventDefault: function() {}, enterKey: true });
                    if (hasChildren && !focusItem.hasClass(DISABLEDSTATE)) {
                        that.open(focusItem);
                        that._moveFocus(focusItem, that._childPopupElement(focusItem).children().find("li").first());
                    } else if (focusItem.is("li") && focusItem.attr("role") === "menuitemcheckbox") {
                        focusItem.find(".k-checkbox").attr("checked", true);
                    } else {
                        that._moveFocusToRoot(focusItem, that._findRootParent(focusItem));
                    }
                }
            } else if (key == keys.TAB) {
                target = that._findRootParent(focusItem);
                that._moveFocus(focusItem, target);
                that._checkActiveElement();
                return;
            }

            if (target && target[0]) {
                e.preventDefault();
                e.stopPropagation(); // needed to handle ESC in column menu only when a root item is focused
            }
        },

        _focusItem: function() {
            return this.wrapper.find(".k-item.k-focus").filter(":visible");
        },

        _itemBelongsToVertival: function(item) {
            var menuIsVertical = this.wrapper.hasClass("k-menu-vertical");

            if (!item.length) {
                return menuIsVertical;
            }
            return item.parent().hasClass("k-menu-group") || menuIsVertical;
        },

        _itemHasChildren: function(item) {
            if (!item || !item.length || !item[0].nodeType) {
                return false;
            }
            return item.children(".k-menu-group, .k-menu-popup, div.k-animation-container").length > 0 ||
                (!!item.data(POPUP_OPENER_ATTR) && !!this._overflowWrapper().children(popupGroupSelector(item.data(POPUP_OPENER_ATTR))));
        },

        _moveFocus: function(item, nextItem) {
            var that = this,
                id = that._ariaId;

            if (item.length && nextItem.length) {
                item.removeClass(FOCUSEDSTATE);
            }

            if (nextItem.length) {
                if (nextItem[0].id) {
                    id = nextItem[0].id;
                }

                that.wrapper.find("." + FOCUSEDSTATE).removeClass(FOCUSEDSTATE);
                nextItem.addClass(FOCUSEDSTATE);
                that._oldFocusItem = nextItem;

                if (id) {
                    that.element.removeAttr("aria-activedescendant");
                    $("#" + id).removeAttr("id");
                    nextItem.attr("id", id);
                    that.element.attr("aria-activedescendant", id);
                }
                that._scrollToItem(nextItem);
            }
        },

        _moveFocusToRoot: function(item, nextItem) {
            this._moveFocus(item, nextItem);
        },

        _findRootParent: function(item) {
            if (this._isRootItem(item)) {
                return item;
            } else {
                return this._parentsUntil(item, menuSelector, "li.k-item").last();
            }
        },

        _isRootItem: function(item) {
            return item.parent().hasClass(MENU);
        },

        _itemRight: function(item, belongsToVertical, hasChildren) {
            var that = this,
                nextItem,
                parentItem,
                overflowWrapper;

            if (!belongsToVertical) {
                nextItem = item.nextAll(itemSelector + exclusionSelector).eq(0);
                if (!nextItem.length) {
                    nextItem = item.prevAll(itemSelector + exclusionSelector).last();
                }
                that.close(item);
            } else if (hasChildren && !item.hasClass(DISABLEDSTATE)) {
                that.open(item);
                nextItem = that._childPopupElement(item).children().find("li").first();
            } else if (that.options.orientation == "horizontal") {
                parentItem = that._findRootParent(item);
                overflowWrapper = that._overflowWrapper();
                if (overflowWrapper) {
                    var rootPopup = itemPopup(parentItem, overflowWrapper);
                    that._closeChildPopups(rootPopup);
                }
                that.close(parentItem);
                nextItem = parentItem.nextAll(itemSelector + exclusionSelector).eq(0);
            }

            if (nextItem && !nextItem.length) {
                nextItem = that.wrapper.children(".k-item").first();
            } else if (!nextItem) {
                nextItem = [];
            }

            that._moveFocus(item, nextItem);
            return nextItem;
        },

        _itemLeft: function(item, belongsToVertical) {
            var that = this,
                nextItem,
                overflowWrapper;

            if (!belongsToVertical) {
                nextItem = item.prevAll(itemSelector + exclusionSelector).eq(0);
                if (!nextItem.length) {
                    nextItem = item.nextAll(itemSelector + exclusionSelector).last();
                }
                that.close(item);
            } else {
                nextItem = item.parent().closest(".k-item");
                overflowWrapper = that._overflowWrapper();
                if (!nextItem.length && overflowWrapper) {
                    nextItem = popupParentItem(item.parent(), overflowWrapper);
                }
                that.close(nextItem);
                if (that._isRootItem(nextItem) && that.options.orientation == "horizontal") {
                    nextItem = nextItem.prevAll(itemSelector + exclusionSelector).eq(0);
                }
            }

            if (!nextItem.length) {
                nextItem = that.wrapper.children(".k-item").last();
            }

            that._moveFocus(item, nextItem);
            return nextItem;
        },

        _itemDown: function(item, belongsToVertical, hasChildren) {
            var that = this,
                nextItem;

            if (!belongsToVertical) {
                if (!hasChildren || item.hasClass(DISABLEDSTATE)) {
                    return;
                } else {
                    that.open(item);
                    nextItem = that._childPopupElement(item).children().find("li").first();
                }
            } else {
                nextItem = item.nextAll(itemSelector + exclusionSelector).eq(0);
            }

            if (!nextItem.length && item.length) {
                nextItem = item.parent().children(":visible").first();
            } else if (!item.length) {
                nextItem = that.wrapper.children(".k-item").first();
            }

            that._moveFocus(item, nextItem);
            return nextItem;
        },

        _itemUp: function(item, belongsToVertical) {
            var that = this,
                nextItem;

            if (!belongsToVertical) {
                return;
            } else {
                nextItem = item.prevAll(itemSelector + exclusionSelector).eq(0);
            }

            if (!nextItem.length && item.length) {
                nextItem = item.parent().children(":visible").last();
            } else if (!item.length) {
                nextItem = that.wrapper.children(".k-item").last();
            }

            that._moveFocus(item, nextItem);
            return nextItem;
        },

        _scrollToItem: function(item) {
            var that = this;
            if (that.options.scrollable && item && item.length) {
                var ul = item.parent();
                var isHorizontal = ul.hasClass(MENU) ? that.options.orientation == "horizontal" : false;
                var scrollDir = isHorizontal ? "scrollLeft" : "scrollTop";
                var getSize = isHorizontal ? kendo._outerWidth : kendo._outerHeight;
                var currentScrollOffset = ul[scrollDir]();
                var itemSize = getSize(item);
                var itemOffset = item[0][isHorizontal ? "offsetLeft" : "offsetTop"];
                var ulSize = getSize(ul);
                var scrollButtons = ul.siblings(scrollButtonSelector);
                var scrollButtonSize = scrollButtons.length ? getSize(scrollButtons.first()) : 0;
                var itemPosition;

                if (currentScrollOffset + ulSize < itemOffset + itemSize + scrollButtonSize) {
                    itemPosition = itemOffset + itemSize - ulSize + scrollButtonSize;
                } else if (currentScrollOffset > itemOffset - scrollButtonSize) {
                    itemPosition = itemOffset - scrollButtonSize;
                }

                if (!isNaN(itemPosition)) {
                    var scrolling = {};
                    scrolling[scrollDir] = itemPosition;
                    ul.finish().animate(scrolling, "fast", "linear", function() {
                        that._toggleScrollButtons(ul, scrollButtons.first(), scrollButtons.last(), isHorizontal);
                    });
                }
            }
        },

        _itemEsc: function(item, belongsToVertical) {
            var that = this,
                nextItem, groupId;

            if (!belongsToVertical) {
                return item;
            } else {
                nextItem = item.parent().closest(".k-item");

                if (nextItem.length === 0) {
                    groupId = item.closest(".k-menu-popup").data("group");
                    nextItem = that.wrapper.find(".k-item[data-groupparent='" + groupId + "']");
                }

                that.close(nextItem);
                that._moveFocus(item, nextItem);
            }

            return nextItem;
        },

        _childPopupElement: function(item) {
            var popupElement = item.find(".k-menu-popup");
            var wrapper = this._overflowWrapper();
            if (!popupElement.length && wrapper) {
                popupElement = itemPopup(item, wrapper);
            }
            return popupElement;
        },

        _triggerEvent: function(e) {
            var that = this;

            return that.trigger(e.type, { type: e.type, item: e.item });
        },

        _focusHandler: function(e) {
            var that = this,
                item = $(kendo.eventTarget(e)).closest(allItemsSelector);

            if (item.hasClass(DISABLEDSTATE)) {
                return;
            }

            setTimeout(function() {
                that._moveFocus([], item);
                if (item.children(".k-content")[0]) {
                    item.parent().closest(".k-item").removeClass(FOCUSEDSTATE);
                }
            }, 200);
        },

        _animations: function(options) {
            if (options && ("animation" in options) && !options.animation) {
                options.animation = { open: { effects: {} }, close: { hide: true, effects: {} } };
            }
        },
        _dataSource: function(options) {
            var that = this,
                dataSource = options ? options.dataSource : that.options.dataSource;

            if (!dataSource) {
                return;
            }

            dataSource = isArray(dataSource) ? { data: dataSource } : dataSource;

            that._unbindDataSource();

            if (!dataSource.fields) {
                dataSource.fields = [
                    { field: "uid" },
                    { field: "text" },
                    { field: "url" },
                    { field: "cssClass" },
                    { field: "spriteCssClass" },
                    { field: "icon" },
                    { field: "iconClass" },
                    { field: "imageUrl" },
                    { field: "imageAttr" },
                    { field: "attr" },
                    { field: "contentAttr" },
                    { field: "content" },
                    { field: "encoded" },
                    { field: "items" },
                    { field: "select" }
                ];
            }

            that.dataSource = HierarchicalDataSource.create(dataSource);

            that._bindDataSource();

            that.dataSource.fetch();
        },

        _bindDataSource: function() {
            this._refreshHandler = this.refresh.bind(this);
            this._errorHandler = this._error.bind(this);

            this.dataSource.bind(CHANGE, this._refreshHandler);
            this.dataSource.bind(ERROR, this._errorHandler);
        },

        _unbindDataSource: function() {
            var dataSource = this.dataSource;

            if (dataSource) {
                dataSource.unbind(CHANGE, this._refreshHandler);
                dataSource.unbind(ERROR, this._errorHandler);
            }
        },

        _error: function() {

        },

        findByUid: function(uid) {
            var wrapperElement = this._overflowWrapper() || this.element;
            return wrapperElement.find("[" + kendo.attr("uid") + "=" + uid + "]");
        },

        refresh: function(ev) {
            var that = this;
            var node = ev.node;
            var action = ev.action;
            var parentElement = node ? that.findByUid(node.uid) : that.element;
            var itemsToUpdate = ev.items;
            var index = ev.index;
            var updateProxy = that._updateItem.bind(that);
            var removeProxy = that._removeItem.bind(that);

            if (action == "add") {
                that._appendItems(itemsToUpdate, index, parentElement);
            } else if (action == "remove") {
                itemsToUpdate.forEach(removeProxy);
            } else if (action == "itemchange") {
                itemsToUpdate.forEach(updateProxy);
            } else if (action === "itemloaded") {
                that.append(ev.items, parentElement);
            } else {
                this._initData();
            }

            this.trigger(DATABOUND, { item: parentElement, dataItem: node });
        },

        _appendItems: function(items, index, parent) {
            var that = this;
            var referenceItem = parent.find(itemSelector).eq(index);

            if (referenceItem.length) {
                that.insertBefore(items, referenceItem);
            } else {
                that.append(items, parent);
            }
        },

        _removeItem: function(item) {
            var that = this;
            var element = that.findByUid(item.uid);
            that.remove(element);
        },

        _updateItem: function(item) {
            var that = this;
            var element = that.findByUid(item.uid);
            var nextElement = element.next();
            var parentNode = item.parentNode();

            that.remove(element);

            if (nextElement.length) {
                that.insertBefore(item, nextElement);
            } else {
                that.append(item, parentNode && that.findByUid(parentNode.uid));
            }
        },

        _accessors: function() {
            var that = this,
                options = that.options,
                i, field, textField,
                element = that.element;

            for (i in bindings) {
                field = options[bindings[i]];
                textField = element.attr(kendo.attr(i + "-field"));

                if (!field && textField) {
                    field = textField;
                }

                if (!field) {
                    field = i;
                }

                if (!isArray(field)) {
                    field = [field];
                }

                options[bindings[i]] = field;
            }
        },

        _fieldAccessor: function(fieldName) {
            var fieldBindings = this.options[bindings[fieldName]] || [],
                count = fieldBindings.length;

            if (count === 0) {
                return (function(item) { return item[fieldName]; });
            } else {
                return (function(item) {
                    var levels = $.map(fieldBindings, kendo.getter);
                    if (item.level) {
                        return levels[Math.min(item.level(), count - 1)](item);
                    } else {
                        return levels[count - 1](item);
                    }
                });
            }
        },

        _templates: function() {
            var that = this,
                options = that.options,
                fieldAccessor = that._fieldAccessor.bind(that);

            if (options.template && typeof options.template == STRING) {
                options.template = template(options.template);
            } else if (!options.template) {
                options.template = template((data) => {
                    var text = fieldAccessor("text")(data.item);
                    if (!(typeof data.item.encoded != 'undefined' && data.item.encoded === false)) {
                        text = encode(text);
                    }

                    return `<span class='k-menu-link-text' role='none'>${text}</span>`;
                });
            }

            that.templates = {
                content: template((data) => {
                    var item = data.item;
                    var contentHtml = fieldAccessor("content")(item);
                    var contCssAttributes = data.contentCssAttributes(item.toJSON ? item.toJSON() : item);
                    return `<div class='${data.groupWrapperCssClass(data.group)}' ${data.groupAttributes(data.group)}><div ${contCssAttributes} tabindex='-1'>${contentHtml || ''}</div></div>`;
                }),
                group: template((data) =>
                    `<div class='${data.groupWrapperCssClass(data.group)}' ${data.groupAttributes(data.group)}>` +
                    `<ul class='${data.groupCssClass(data.group)}' id='${data.groupId}' role='menu'>` +
                    `${data.renderItems(data)}` +
                    "</ul>" +
                    "</div>"
                ),
                itemWrapper: template((data) => {
                    var item = data.item;
                    var iconPosition = this.options.iconPosition;
                    var url = fieldAccessor("url")(item);
                    var imageUrl = fieldAccessor("imageUrl")(item);
                    var icon = fieldAccessor("icon")(item);
                    var iconClass = fieldAccessor("iconClass")(item);
                    var sprite = this.templates.sprite(item);
                    var iconString = (((icon || iconClass) && sprite == '') ? kendo.ui.icon({ icon: icon, iconClass: iconClass }) : '' );
                    var imgAttributes = fieldAccessor("imageAttr")(item);
                    var tag = url ? 'a' : 'span';

                    return `<${tag} class='${rendering.textClass(item)}' role='none' ${url ? `href='${kendo.sanitizeLink(url)}'` : ''} >` +
                        (imageUrl ? `<img ${rendering.imageCssAttributes(imgAttributes)}  alt='' src='${imageUrl}' />` : '') +
                        (iconPosition == "before" ? iconString : '') +
                        sprite +
                        this.options.template(data) +
                        (iconPosition == "after" ? iconString : '') +
                        data.arrow(data) +
                        `</${tag}>`;
                }),
                item: template((data) => {
                    var item = data.item,
                        menu = data.menu,
                        group = data.group,
                        subGroup = data.subGroup;
                    var contentHtml = fieldAccessor("content")(item);
                    var groupId = kendo.guid();
                    return `<li class='${rendering.wrapperCssClass(group, item)}' ${(item.hasChildren || item.items || item.content) ? 'aria-controls="' + groupId + '"' : '' } ${rendering.itemCssAttributes(item.toJSON ? item.toJSON() : item)} role='menuitem'  ${item.items || item.content ? "aria-haspopup='true'" : ''}` +
                        `${item.enabled === false ? "aria-disabled='true'" : ''}` +
                        kendo.attr("uid") + `='${item.uid}' ` +
                        ((item.items && item.items.length > 0) || item.content ?
                            (item.expanded ?
                                " aria-expanded='true'"
                                : " aria-expanded='false'")
                            : '') +
                        ">" +
                        `${!item.separator ? this.templates.itemWrapper(data) : ''}` +
                        ((item.hasChildren || item.items) ?
                            `${subGroup({ items: item.items, menu: menu, group: { expanded: item.expanded }, groupId: groupId })}`
                            : (item.content || item.contentUrl || contentHtml ?
                            `${data.renderContent($.extend({}, data, { group: { expanded: item.expanded } }))}`
                            : '')
                        ) +
                        "</li>";
                }),
                scrollButton: template(({ direction }) =>
                    `<span class='k-button k-button-md k-button-flat k-button-flat-base k-icon-button k-menu-scroll-button k-menu-scroll-button-${direction === 'left' || direction === 'up' ? 'prev' : 'next'}' unselectable='on'>` +
                        kendo.ui.icon({ icon: `caret-alt-${direction}`, iconClass: "k-button-icon" }) +
                    "</span>"
                ),
                arrow: template(({ item, group }) =>
                    `<span aria-hidden='true' class='k-menu-expand-arrow'>${kendo.ui.icon({ icon: group.horizontal ? "caret-alt-down" : "caret-alt-right" })}</span>`),
                sprite: template((data) => {
                    var spriteCssClass = fieldAccessor("spriteCssClass")(data);
                    if (spriteCssClass) {
                        return `<span class='k-sprite ${spriteCssClass}'></span>`;
                    }
                    return '';
                }),
                empty: template(() => "")
            };
        },

        renderItem: function(options) {
            var that = this;
            options = extend({ menu: that, group: {} }, options);

            var empty = that.templates.empty,
                item = options.item;

            return that.templates.item(extend(options, {
                separator: item.separator ? that.templates.separator : empty,
                sprite: that.templates.sprite,
                itemWrapper: that.templates.itemWrapper,
                renderContent: that.renderContent,
                arrow: item.items || item.content || item[that.options.dataContentField[0]] ? that.templates.arrow : empty,
                subGroup: that.renderGroup.bind(that)
            }, rendering));
        },

        renderGroup: function(options) {
            var that = this;
            var templates = that.templates || options.menu.templates;

            return templates.group(extend({
                renderItems: function(options) {
                    var html = "",
                        i = 0,
                        items = options.items,
                        len = items ? items.length : 0,
                        group = extend({ length: len }, options.group);

                    for (; i < len; i++) {
                        html += options.menu.renderItem(extend(options, {
                            group: group,
                            item: extend({ index: i }, items[i])
                        }));
                    }

                    return html;
                }
            }, options, rendering));
        },

        renderContent: function(options) {
            return options.menu.templates.content(extend(options, rendering));
        }
    });

    var ContextMenu = Menu.extend({
        init: function(element, options) {
            var that = this;

            Menu.fn.init.call(that, element, options);

            that.element.attr(ROLE, "menu");
            that._initialInlineHeight = that.element[0].style && that.element[0].style.height ? that.element[0].style.height : "";
            that._marker = kendo.guid().substring(0, 8);

            that.target = $(that.options.target);

            that._popup();
            that._wire();
        },

        _initOverflow: function(options) {
            var that = this;
            that._openedPopups = {};
            if (options.scrollable && !that._overflowWrapper()) {
                that._popupsWrapper = (that.element.parent().is(childAnimationContainerSelector) ? that.element.closes(animationContainerSelector) : that.element)
                    .wrap(`<div class="k-menu-scroll-wrapper${options.orientation === 'vertical' ? " k-menu-scroll-wrapper-vertical" : ""}"></div>`).parent();

                if (that.options.orientation == "horizontal") {
                    removeSpacesBetweenItems(that.element);
                }

                if (options.appendTo) {
                    options.appendTo = $(options.appendTo);
                    options.appendTo.append(that._popupsWrapper);
                }

                that._initialHeight = that.element[0].style.height;
                that._initialWidth = that.element[0].style.width;
            }
        },

        options: {
            name: "ContextMenu",
            filter: null,
            showOn: "contextmenu",
            orientation: "vertical",
            alignToAnchor: false,
            copyAnchorStyles: true,
            target: "body",
            origin: undefined,
            position: undefined
        },

        events: [
            OPEN,
            CLOSE,
            ACTIVATE,
            DEACTIVATE,
            SELECT
        ],

        setOptions: function(options) {
            var that = this;

            Menu.fn.setOptions.call(that, options);

            that.target.off(that.showOn + NS + that._marker, that._showProxy);

            if (that.userEvents) {
                that.userEvents.destroy();
            }

            that.target = $(that.options.target);
            if (options.orientation && that.popup.wrapper[0]) {
                that.popup.element.unwrap();
            }

            that._wire();

            Menu.fn.setOptions.call(this, options);
        },

        destroy: function() {
            var that = this;

            that.target.off(that.options.showOn + NS + that._marker);
            DOCUMENT_ELEMENT.off(kendo.support.mousedown + NS + that._marker, that._closeProxy);

            if (that.userEvents) {
                that.userEvents.destroy();
            }

            Menu.fn.destroy.call(that);

            if (that.popup) {
                that.popup.destroy();
            }
        },

        open: function(x, y) {
            var that = this;
            const isHorizontal = that.options.orientation === 'horizontal';
            x = $(x)[0];

            if (typeof x === "number") {
                if (that._initialInlineHeight) {
                    $(that.element).css({ height: that._initialInlineHeight });
                } else {
                    $(that.element).css({ height: "" });
                }
            }

            if (contains(that.element[0], $(x)[0]) || that._itemHasChildren($(x))) { // call parent open for children elements
                Menu.fn.open.call(that, x);
            } else {
                if (that._triggerEvent({ item: that.element, type: OPEN }) === false) {
                    if (that.popup.visible() && that.options.filter) {
                        that.popup.close(true);
                        that.popup.element.parent().kendoStop(true);
                    }

                    if (!that._triggerFocusOnActivate) {
                        that._triggerFocusOnActivate = that._focusMenu.bind(that);
                    }
                    that.bind(ACTIVATE, that._triggerFocusOnActivate);

                    if (y !== undefined) {
                        var overflowWrapper = that._overflowWrapper();
                        if (overflowWrapper) {
                            var offset = overflowWrapper.offset();
                            x -= offset.left;
                            y -= offset.top;
                        }
                        that.popup.wrapper.hide();
                        that._configurePopupScrolling(x, y);
                        that.popup.open(x, y);
                    } else {
                        that.popup.options.anchor = (x ? x : that.popup.anchor) || that.target;
                        that.popup.element.kendoStop(true);
                        that._configurePopupScrolling();
                        that.popup.open();
                    }

                    that._initPopupScrolling(that.popup, isHorizontal);
                    that.popup.element.siblings(scrollButtonSelector).hide();
                    DOCUMENT_ELEMENT.off(that.popup.downEvent, that.popup._mousedownProxy);
                    DOCUMENT_ELEMENT
                        .on(kendo.support.mousedown + NS + that._marker, that._closeProxy);
                }
            }

            return that;
        },

        _focusMenu: function() {
            var that = this;

            that.unbind(ACTIVATE, that._triggerFocusOnActivate);
            that.element.trigger("focus");
        },

        _configurePopupScrolling: function(x, y) {
            var that = this;
            var popup = that.popup;
            var isHorizontal = that.options.orientation == "horizontal";

            if (that.options.scrollable) {
                that._wrapPopupElement(popup);

                popup.element.parent().css({
                    position: "",
                    height: ""
                });

                popup.element.css({
                    visibility: "hidden",
                    display: "",
                    position: ""
                });

                if (isHorizontal) {
                    that._setPopupWidth(popup, isNaN(x) ? undefined : { isFixed: true, x: x, y: y });
                } else {
                    that._setPopupHeight(popup, isNaN(x) ? undefined : { isFixed: true, x: x, y: y });
                }

                popup.element.css({
                    visibility: "",
                    display: "none",
                    position: "absolute"
                });
            }
        },

        _setPopupWidth: function(popup, isFixed) {
            var popupElement = popup.element;
            var popups = popupElement.add(popupElement.parent(childAnimationContainerSelector));

            popups.width(this._initialWidth || "");

            var location = popup._location(isFixed);
            var windowWidth = $(window).width();
            var popupOuterWidth = location.width;
            var popupOffsetLeft = Math.max(location.left, 0);
            var scrollLeft = isFixed ? 0 : parentsScroll(this._overflowWrapper()[0], "scrollLeft");
            var shadow = kendo.getShadows(popupElement);
            var maxWidth = windowWidth - shadow.left - shadow.right;
            var canFit = maxWidth + scrollLeft > popupOuterWidth + popupOffsetLeft;

            if (!canFit) {
                popups.css({ overflow: "hidden", width: (maxWidth - popupOffsetLeft + scrollLeft) + "px" });
            }
        },

        close: function() {
            var that = this;
            if (contains(that.element[0], $(arguments[0])[0]) || that._itemHasChildren(arguments[0])) {
                Menu.fn.close.call(that, arguments[0]);
            } else {
                if (that.popup.visible()) {
                    if (that._triggerEvent({ item: that.element, type: CLOSE }) === false) {
                        that._removeFocusItem();
                        that.element.find("#" + that._ariaId).removeAttr("id");
                        that.popup.close();
                        DOCUMENT_ELEMENT.off(kendo.support.mousedown + NS + that._marker, that._closeProxy);
                        that.unbind(SELECT, that._closeTimeoutProxy);
                        that.popup.options.anchor.focus();
                    }
                }
            }
        },

        _showHandler: function(e) {
            var ev = e, offset,
                that = this,
                options = that.options,
                target = kendo.support.mobileOS ? $(ev.target) : $(ev.currentTarget);

            if (e.event) {
                ev = e.event;
                ev.pageX = e.x.location;
                ev.pageY = e.y.location;
            }

            if (contains(that.element[0], e.relatedTarget || e.target)) {
                return;
            }

            that._eventOrigin = ev;

            ev.preventDefault();
            ev.stopImmediatePropagation();

            that.element.find("." + FOCUSEDSTATE).removeClass(FOCUSEDSTATE);

            if ((options.filter && target.is(options.filter)) || !options.filter) {
                if (options.alignToAnchor) {
                    that.popup.options.anchor = ev.currentTarget;
                    that.open(ev.currentTarget);
                } else {
                    that.popup.options.anchor = ev.currentTarget;

                    if (that._targetChild) {
                        offset = that.target.offset();
                        that.open(ev.pageX - offset.left, ev.pageY - offset.top);
                    } else {
                        that.open(ev.pageX, ev.pageY);
                    }
                }
            }
        },

        _closeHandler: function(e) {
            var that = this,
                target = $(e.relatedTarget || e.target),
                sameTarget = target.closest(that.target.selector)[0] == that.target[0],
                item = target.closest(itemSelector),
                children = that._itemHasChildren(item),
                overflowWrapper = that._overflowWrapper(),
                containment = contains(that.element[0], target[0]) || (overflowWrapper && contains(overflowWrapper[0], target[0]));

            that._eventOrigin = e;

            var normalClick = e.which !== 3;

            if (that.popup.visible() && ((normalClick && sameTarget) || !sameTarget) && ((that.options.closeOnClick && !children && containment) || !containment)) {
                if (containment) {
                    this.unbind(SELECT, this._closeTimeoutProxy);
                    that.bind(SELECT, that._closeTimeoutProxy);
                } else {
                    that.close();
                }
            }
        },

        _wire: function() {
            var that = this,
                options = that.options,
                target = that.target;

            that._preventProxy = null;
            that._showProxy = that._showHandler.bind(that);
            that._closeProxy = that._closeHandler.bind(that);
            that._closeTimeoutProxy = that.close.bind(that);

            if (target[0]) {
                if (kendo.support.mobileOS && options.showOn == "contextmenu") {
                    that.userEvents = new kendo.UserEvents(target, {
                        filter: options.filter,
                        allowSelection: false
                    });

                    that._preventProxy = function() { return false; };

                    that.userEvents.bind("hold", that._showProxy);
                }

                if (options.filter) {
                    target.on(options.showOn + NS + that._marker, options.filter, that._preventProxy || that._showProxy);
                } else {
                    target.on(options.showOn + NS + that._marker, that._preventProxy || that._showProxy);
                }

                target.on("keydown", (e) => {
                    if (e.keyCode === kendo.keys.F10 && e.shiftKey) {
                        e.preventDefault();
                        that.open(e.target);
                    }
                });
            }
        },

        _triggerEvent: function(e) {
            var that = this,
                anchor = $(that.popup.options.anchor)[0],
                origin = that._eventOrigin;

            that._eventOrigin = undefined;

            return that.trigger(e.type, extend({ type: e.type, item: e.item || this.element[0], target: anchor }, origin ? { event: origin } : {} ));
        },

        _popup: function() {
            var that = this;
            var overflowWrapper = that._overflowWrapper();
            var contextMenuElement = that.element
                .addClass("k-context-menu");

            that._triggerProxy = that._triggerEvent.bind(that);

            that.popup = $("<div></div>")
                            .append(contextMenuElement)
                            .kendoPopup({
                                origin: that.options.origin,
                                position: that.options.position,
                                autosize: that.options.orientation === "horizontal",
                                anchor: that.target || "body",
                                copyAnchorStyles: that.options.copyAnchorStyles,
                                collision: that.options.popupCollision || "fit",
                                animation: that.options.animation,
                                activate: that._triggerProxy,
                                deactivate: that._triggerProxy,
                                appendTo: overflowWrapper || that.options.appendTo,
                                close: !overflowWrapper ? $.noop : function(e) {
                                    $(getChildPopups(e.sender.element, overflowWrapper)).each(function(i, p) {
                                        var popup = p.data(KENDOPOPUP);
                                        if (popup) {
                                            popup.close(true);
                                        }
                                    });
                                }
                            }).data(KENDOPOPUP);

            that._targetChild = contains(that.target[0], that.popup.element[0]);
        },

        _moveFocusToRoot: function(item, nextItem) {
            this._moveFocus(item, nextItem);
            this.close();
        },

        _focus: function(e) {
            var focusItem = this._oldFocusItem = this._focusItem() || [];

            Menu.fn._focus.call(this, e);

            if (activeElement() === e.currentTarget) {
                this._moveFocus(focusItem, this.wrapper.children().filter(":visible").not(".k-separator").first());
            }
        }
    });

    ui.plugin(Menu);
    ui.plugin(ContextMenu);

})(window.kendo.jQuery);
export default kendo;

