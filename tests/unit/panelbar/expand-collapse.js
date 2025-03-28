import '@progress/kendo-ui/src/kendo.panelbar.js';

let panelbar;
let ul;

describe('panelbar expand collapse', function() {
    beforeEach(function() {


        Mocha.fixture.append(
            '<ul id="panelbar">' +
            '    <li class="k-panelbar-item"><span class="k-link k-header">Mail<span' +
            '            class="k-icon k-i-chevron-down k-panelbar-expand"></span></span>' +
            '        <ul style="display: none;" class="k-panelbar-group">' +
            '            <li class="k-panelbar-item"><span class="k-link">Personal Folders</span>' +
            '            </li>' +
            '            <li class="k-panelbar-item"><span class="k-link">Deleted Items</span>' +
            '            </li>' +
            '            <li class="k-panelbar-item k-disabled"><span class="k-link">Inbox</span>' +
            '            </li>' +
            '            <li class="k-panelbar-item"><span class="k-link">My Mail</span>' +
            '            </li>' +
            '            <li class="k-panelbar-item"><span class="k-link">Sent Items</span>' +
            '            </li>' +
            '            <li class="k-panelbar-item"><span class="k-link">Outbox</span>' +
            '            </li>' +
            '            <li class="k-panelbar-item"><span class="k-link">Search Folders</span>' +
            '            </li>' +
            '        </ul>' +
            '    </li>' +
            '    <li class="k-panelbar-item k-disabled"><span class="k-link k-header">Contacts<span' +
            '            class="k-icon k-i-chevron-down k-panelbar-expand"></span></span>' +
            '        <ul class="k-panelbar-group" style="display: none;">' +
            '            <li class="k-panelbar-item"><span class="k-link">My Contacts</span>' +
            '            </li>' +
            '            <li class="k-panelbar-item"><span class="k-link">Address Cards</span>' +
            '            </li>' +
            '            <li class="k-panelbar-item"><span class="k-link">Phone List</span>' +
            '            </li>' +
            '            <li class="k-panelbar-item"><span class="k-link">Shared Contacts</span>' +
            '            </li>' +
            '        </ul>' +
            '    </li>' +
            '    <li class="k-panelbar-item"><span class="k-link k-header">Tasks<span' +
            '            class="k-icon k-i-chevron-down k-panelbar-expand"></span></span>' +
            '        <ul class="k-panelbar-group" style="display: none;">' +
            '            <li class="k-panelbar-item"><span class="k-link">My Tasks</span>' +
            '            </li>' +
            '            <li class="k-panelbar-item"><span class="k-link">Shared Tasks</span>' +
            '            </li>' +
            '            <li class="k-panelbar-item"><span class="k-link">Active Tasks</span>' +
            '            </li>' +
            '            <li class="k-panelbar-item"><span class="k-link">Completed Tasks</span>' +
            '            </li>' +
            '        </ul>' +
            '    </li>' +
            '    <li class="k-panelbar-item k-expanded"><span class="k-link k-header k-selected">Notes<span' +
            '            class="k-icon k-i-arrow-chevron-up k-panelbar-collapse"></span></span>' +
            '        <ul class="k-panelbar-group" style="display: block;">' +
            '            <li class="k-panelbar-item"><span class="k-link">My Notes</span>' +
            '            </li>' +
            '            <li class="k-panelbar-item"><span class="k-link">Notes List</span>' +
            '            </li>' +
            '            <li class="k-panelbar-item"><span class="k-link">Shared Notes</span>' +
            '            </li>' +
            '            <li class="k-panelbar-item"><span class="k-link">Archive</span>' +
            '            </li>' +
            '        </ul>' +
            '    </li>' +
            '    <li class="k-panelbar-item"><span class="k-link k-header">Folders List<span' +
            '            class="k-icon k-i-chevron-down k-panelbar-expand"></span></span>' +
            '        <ul class="k-panelbar-group" style="display: none;">' +
            '            <li class="k-panelbar-item"><span class="k-link">My Client.Net</span>' +
            '            </li>' +
            '            <li class="k-panelbar-item"><span class="k-link">My Profile<span' +
            '                    class="k-icon k-i-arrow-chevron-up k-panelbar-collapse"></span></span>' +
            '                <ul style="display: none;" class="k-panelbar-group">' +
            '                    <li class="k-panelbar-item"><a href="#"' +
            '                                                          class="k-link">Server Binding</a></li>' +
            '                    <li class="k-panelbar-item"><a href="#"' +
            '                                                          class="k-link">Ajax Binding</a></li>' +
            '                    <li class="k-panelbar-item"><a href="#"' +
            '                                                          class="k-link">Web Service Binding</a></li>' +
            '                    <li class="k-panelbar-item"><a href="#"' +
            '                                                          class="k-link">Custom Binding</a></li>' +
            '                    <li class="k-panelbar-item"><a href="#"' +
            '                                                          class="k-link">Twitter Binding</a></li>' +
            '                    <li class="k-panelbar-item"><a href="#"' +
            '                                                          class="k-link">Facebook Binding</a></li>' +
            '                </ul>' +
            '            </li>' +
            '            <li class="k-panelbar-item"><span class="k-link">My Support Tickets</span>' +
            '            </li>' +
            '            <li class="k-panelbar-item"><span class="k-link">My Licenses</span>' +
            '            </li>' +
            '        </ul>' +
            '    </li>' +
            '</ul>'
        );

        ul = $("#panelbar");

        panelbar = new kendo.ui.PanelBar(ul);
    });
    afterEach(function() {
        panelbar.destroy();
    });

    function getRootItem(index) {
        return ul.children().eq(index);
    }

    it("clicking collapsed item not expand if it is disabled", function() {
        let item = getRootItem(1);

        item.toggleClass("k-disabled", true);

        item.find("> .k-link").trigger("click");

        assert.equal(item.find(".k-panelbar-group").css("display"), "none");
    });

    it("clicking expanded items should toggle arrow", function() {
        let item = getRootItem(3);

        item.find("> .k-link").trigger("click");

        assert.isOk(item.find(".k-icon,.k-svg-icon").is(".k-i-chevron-down,.k-svg-i-chevron-down"));
    });

    it("clicking collapsed items should expand them", function() {
        let item = getRootItem(2);

        item.find("> .k-link").trigger("click");

        assert.equal(item.find(".k-panelbar-group").css("display"), "block");
    });

    it("clicking collapsed items should toggle arrow", function() {
        let item = getRootItem(0);

        item.find("> .k-link").trigger("click");

        assert.isOk(item.find(".k-icon,.k-svg-icon").is(".k-i-chevron-up,.k-svg-i-chevron-up"));
    });

    it("clicking collapsed items should not expand child groups", function() {
        let item = getRootItem(4);

        item.find("> .k-link").trigger("click");

        assert.equal(item.find(".k-panelbar-group .k-panelbar-group").css("display"), "none");
    });

    it("clicking child group items should not collapse root group", function() {
        let item = getRootItem(4);

        panelbar.expand(item);

        item.find(".k-panelbar-item > .k-link").trigger("click");

        assert.equal(item.find(".k-panelbar-group").css("display"), "block");
    });

    it("clicking arrows toggles child groups", function() {
        let item = getRootItem(3);

        item.find("> .k-link > .k-icon,> .k-link > .k-svg-icon").trigger("click");

        assert.equal(item.find(".k-panelbar-group").css("display"), "none");
    });

    it("expanded items should have k-expanded class", function() {
        let item = getRootItem(2);

        item.find("> .k-link").trigger("click");

        assert.isTrue(item.hasClass("k-expanded"));
    });
});
