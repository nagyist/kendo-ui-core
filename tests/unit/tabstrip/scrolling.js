import '@progress/kendo-ui/src/kendo.tabstrip.js';

let tabstrip;
let touch = false;

function createTabStrip(options) {
    tabstrip = new kendo.ui.TabStrip("#tabstrip", $.extend({
        animation: false
    }, options));
}

function createNonScrollableTabStrip(options) {
    tabstrip = new kendo.ui.TabStrip("#tabstrip-nonscrollable", $.extend({
        animation: false
    }, options));
}

function setupDom() {


    Mocha.fixture.append(
        '<div id="tabstrip" style="width:200px;">' +
        '    <ul>' +
        '        <li class="k-active">some item text 1</li>' +
        '        <li>some item text 2</li>' +
        '        <li>some item text 3</li>' +
        '        <li>some item text 4</li>' +
        '        <li>some item text 5</li>' +
        '        <li>some item text 6</li>' +
        '        <li>some item text 7</li>' +
        '        <li>some item text 8</li>' +
        '        <li>some item text 9</li>' +
        '        <li>some item text 10</li>' +
        '    </ul>' +
        '    <div>content 1</div>' +
        '    <div>content 2</div>' +
        '    <div>content 3</div>' +
        '    <div>content 4</div>' +
        '    <div>content 5</div>' +
        '    <div>content 6</div>' +
        '    <div>content 7</div>' +
        '    <div>content 8</div>' +
        '    <div>content 9</div>' +
        '    <div>content 10</div>' +
        '</div>'
    );

    Mocha.fixture.append(
        '<div id="tabstrip-nonscrollable" style="width:400px;">' +
        '    <ul>' +
        '        <li class="k-active">1</li>' +
        '        <li>2</li>' +
        '    </ul>' +
        '    <div>content 1</div>' +
        '    <div>content 2</div>' +
        '</div>'
    );
}

describe('tabstrip scrolling', function() {
    beforeEach(function() {
        setupDom();
    });

    afterEach(function() {

        tabstrip.destroy();
    });

    it('scrolling is enabled by default with distance configured', function() {
        createTabStrip();

        assert.isOk(tabstrip.options.scrollable !== false);
        assert.isOk(!isNaN(tabstrip.options.scrollable.distance));
    });

    it('scrolling is enabled when scrollable is true with distance configured', function() {
        createTabStrip({ scrollable: true });

        assert.isOk(tabstrip.options.scrollable !== false);
        assert.isOk(!isNaN(tabstrip.options.scrollable.distance));
        assert.isOk(tabstrip.wrapper.hasClass("k-tabstrip-scrollable"));
    });

    it('scrolling CSS class is applied to TabStrip if tabPosition is top', function() {
        createTabStrip({ tabPosition: "top" });

        assert.isOk(tabstrip.wrapper.hasClass("k-tabstrip-scrollable"));
    });

    it('scrolling CSS class is applied to TabStrip if tabPosition is bottom', function() {
        createTabStrip({ tabPosition: "bottom" });

        assert.isOk(tabstrip.wrapper.hasClass("k-tabstrip-scrollable"));
    });

    it('scrolling CSS class is not applied to TabStrip if tabPosition is left', function() {
        createTabStrip({ tabPosition: "left" });

        assert.isOk(!tabstrip.wrapper.hasClass("k-tabstrip-scrollable"));
    });

    it('scrolling CSS class is not applied to TabStrip if tabPosition is right', function() {
        createTabStrip({ tabPosition: "right" });

        assert.isOk(!tabstrip.wrapper.hasClass("k-tabstrip-scrollable"));
    });

    it('scrolling CSS class is not applied to TabStrip if not needed and tabPosition is top', function() {
        createNonScrollableTabStrip({ tabPosition: "top" });

        assert.isOk(!tabstrip.wrapper.hasClass("k-tabstrip-scrollable"));
    });

    it('scrolling CSS class is not applied to TabStrip if not needed and tabPosition is bottom', function() {
        createNonScrollableTabStrip({ tabPosition: "bottom" });

        assert.isOk(!tabstrip.wrapper.hasClass("k-tabstrip-scrollable"));
    });

    it('scrolling buttons are rendered if tabs do not fit', function() {
        createTabStrip();

        let buttons = tabstrip.tabWrapper.children(".k-button");

        assert.equal(buttons.length, 2);
        assert.isOk(buttons.eq(0).is(".k-tabstrip-prev"));
        assert.isOk(buttons.eq(1).is(".k-tabstrip-next"));
    });

    it('scrolling buttons are not rendered if tabs fit', function() {
        createNonScrollableTabStrip();

        let buttons = tabstrip.tabWrapper.children(".k-button");

        assert.equal(buttons.length, 0);
    });

    it('right scrolling button scrolls to the right by delta when clicked', function() {
        createTabStrip();

        kendo.scrollLeft(tabstrip.tabGroup, 0);
        tabstrip.tabWrapper.children(".k-tabstrip-next").trigger("mousedown").trigger("mouseup");
        tabstrip.tabGroup.finish();

        assert.equal(kendo.scrollLeft(tabstrip.tabGroup), tabstrip.options.scrollable.distance);
    });

    it('left scrolling button scrolls to the left by delta when clicked', function() {
        createTabStrip();

        kendo.scrollLeft(tabstrip.tabGroup, 999);
        let initialScrollPosition = kendo.scrollLeft(tabstrip.tabGroup);
        tabstrip.tabWrapper.children(".k-tabstrip-prev").trigger("mousedown").trigger("mouseup");
        tabstrip.tabGroup.finish();

        assert.equal(kendo.scrollLeft(tabstrip.tabGroup), initialScrollPosition - tabstrip.options.scrollable.distance);
    });

    it('left scrolling button disabled and enabled when (not) needed', function() {
        createTabStrip();

        let buttonPrev = tabstrip.tabWrapper.children(".k-tabstrip-prev");
        let buttonNext = tabstrip.tabWrapper.children(".k-tabstrip-next");

        kendo.scrollLeft(tabstrip.tabGroup, 0);
        buttonPrev.trigger("mousedown").trigger("mouseup");
        tabstrip.tabGroup.finish();

        assert.isOk(buttonPrev.is(".k-disabled"));

        buttonNext.trigger("mousedown").trigger("mouseup");
        tabstrip.tabGroup.finish();

        assert.isOk(!buttonPrev.is(".k-disabled"));
    });
    // check it after the tabstrip rendering changes
    it.skip('right scrolling button is disabled and enabled when (not) needed', function() {
        createTabStrip();

        let buttonPrev = tabstrip.tabWrapper.children(".k-tabstrip-prev");
        let buttonNext = tabstrip.tabWrapper.children(".k-tabstrip-next");

        assert.isOk(!buttonNext.is(".k-disabled"));

        kendo.scrollLeft(tabstrip.tabGroup, tabstrip.tabGroup[0].scrollWidth + 100);
        buttonNext.trigger("mousedown").trigger("mouseup");
        tabstrip.tabGroup.finish();

        assert.isOk(buttonNext.is(".k-disabled"));

        buttonPrev.trigger("mousedown").trigger("mouseup");
        tabstrip.tabGroup.finish();

        assert.isOk(!buttonNext.is(".k-disabled"));
    });

    it('right scrolling button appears if browser window width is reduced', function() {
        createTabStrip();

        let buttonNext;

        tabstrip.wrapper.width(2000);
        tabstrip.resize();

        buttonNext = tabstrip.tabWrapper.children(".k-tabstrip-next");

        assert.equal(buttonNext.length, 0);

        tabstrip.wrapper.width(300);
        tabstrip.resize();

        buttonNext = tabstrip.tabWrapper.children(".k-tabstrip-next");

        assert.equal(buttonNext.length, 1);

        assert.isOk(buttonNext.is(":visible"));
    });
});

describe('tabstrip mobile scrolling', function() {
    beforeEach(function() {
        setupDom();
        touch = kendo.support.touch;
        kendo.support.touch = true;
    });

    afterEach(function() {

        tabstrip.destroy();
        kendo.support.touch = touch;
    });

    it('right scrolling button scrolls to the right by delta when clicked', function() {
        createTabStrip();

        kendo.scrollLeft(tabstrip.tabGroup, 0);
        tabstrip.tabWrapper.children(".k-tabstrip-next").trigger("touchstart").trigger("touchend");
        tabstrip.tabGroup.finish();

        assert.equal(kendo.scrollLeft(tabstrip.tabGroup), tabstrip.options.scrollable.distance);
    });

    it('left scrolling button scrolls to the left by delta when clicked', function() {
        createTabStrip();

        kendo.scrollLeft(tabstrip.tabGroup, 999);
        let initialScrollPosition = kendo.scrollLeft(tabstrip.tabGroup);
        tabstrip.tabWrapper.children(".k-tabstrip-prev").trigger("touchstart").trigger("touchend");
        tabstrip.tabGroup.finish();

        assert.equal(kendo.scrollLeft(tabstrip.tabGroup), initialScrollPosition - tabstrip.options.scrollable.distance);
    });

    it('scrolling succeeds when jQuert.fx is off', function() {
        createTabStrip();
        jQuery.fx.off = true;

        kendo.scrollLeft(tabstrip.tabGroup, 999);
        let initialScrollPosition = kendo.scrollLeft(tabstrip.tabGroup);
        tabstrip.tabWrapper.children(".k-tabstrip-prev").trigger("touchstart").trigger("touchend");
        tabstrip.tabGroup.finish();

        assert.equal(kendo.scrollLeft(tabstrip.tabGroup), initialScrollPosition - tabstrip.options.scrollable.distance);

        jQuery.fx.off = false;
    });
});

describe('tabstrip scrollButtons position', function() {
    beforeEach(function() {
        setupDom();
    });

    afterEach(function() {
        tabstrip.destroy();
    });

    it('scrollButtonsPosition split - default', function() {
        createTabStrip();

        const firstChild = tabstrip.tabWrapper.children().first();
        const secondChild = tabstrip.tabWrapper.children().eq(1);
        const lastChild = tabstrip.tabWrapper.children().last();

        assert.isOk(firstChild.is(".k-tabstrip-prev"));
        assert.isOk(secondChild.is(".k-tabstrip-items"));
        assert.isOk(lastChild.is(".k-tabstrip-next"));
    });

    it('scrollButtonsPosition split - set', function() {
        createTabStrip({
            scrollable: {
                scrollButtonsPosition: "split"
            }
        });

        const firstChild = tabstrip.tabWrapper.children().first();
        const secondChild = tabstrip.tabWrapper.children().eq(1);
        const lastChild = tabstrip.tabWrapper.children().last();

        assert.isOk(firstChild.is(".k-tabstrip-prev"));
        assert.isOk(secondChild.is(".k-tabstrip-items"));
        assert.isOk(lastChild.is(".k-tabstrip-next"));
    });

    it('scrollButtonsPosition start', function() {
        createTabStrip({
            scrollable: {
                scrollButtonsPosition: "start"
            }
        });

        const firstChild = tabstrip.tabWrapper.children().first();
        const secondChild = tabstrip.tabWrapper.children().eq(1);
        const lastChild = tabstrip.tabWrapper.children().last();

        assert.isOk(firstChild.is(".k-tabstrip-prev"));
        assert.isOk(secondChild.is(".k-tabstrip-next"));
        assert.isOk(lastChild.is(".k-tabstrip-items"));
    });

    it('scrollButtonsPosition end', function() {
        createTabStrip({
            scrollable: {
                scrollButtonsPosition: "end"
            }
        });

        const firstChild = tabstrip.tabWrapper.children().first();
        const secondChild = tabstrip.tabWrapper.children().eq(1);
        const lastChild = tabstrip.tabWrapper.children().last();

        assert.isOk(firstChild.is(".k-tabstrip-items"));
        assert.isOk(secondChild.is(".k-tabstrip-prev"));
        assert.isOk(lastChild.is(".k-tabstrip-next"));
    });

});
