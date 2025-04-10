import '@progress/kendo-ui/src/kendo.multiselect.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';
import { stub } from '../../helpers/unit/stub.js';

let MultiSelect = kendo.ui.MultiSelect,
    select;

let CONTAINER_HEIGHT = 200;

function scroll(element, height) {
    element.scrollTop(height);
    element.trigger("scroll");
}

function generateData(parameters) {
    let items = [];
    for (let i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
        items.push({
            id: i,
            value: i,
            text: "Item " + i
        });
    }

    return items;
}

function createAsyncDataSource(options) {
    options = options || {};
    let transport = {
        read: function(options) {
            setTimeout(function() {
                options.success({ data: generateData(options.data), total: 300 });
            }, 0);
        }
    };

    return new kendo.data.DataSource({
        transport: options.transport || transport,
        serverPaging: true,
        serverFiltering: true,
        pageSize: 40,
        schema: {
            data: "data",
            total: "total"
        }
    });
}

describe("kendo.ui.MultiSelect Initialization", function() {
    beforeEach(function() {
        kendo.ns = "";
        select = $("<select multiple />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        if (select.data("kendoMultiSelect")) {
            select.data("kendoMultiSelect").destroy();
        }

        select.parents(".k-widget").remove();
    });

    asyncTest("MultiSelect renders option value if only values are available", function(done) {
        let multiselect = new MultiSelect(select, {
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            autoBind: false,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 40
            }
        });

        multiselect.one("dataBound", function() {
            scroll(multiselect.listView.content, 4 * CONTAINER_HEIGHT);

            setTimeout(function() {
                let options = multiselect.element.children(":selected");

                done(() => {
                    assert.equal(options.length, 1);

                    assert.equal(options[0].text, "Item 0");
                    assert.equal(options[0].value, "0");
                });
            }, 300);

        });

        multiselect.value("0");
        multiselect.open();
    });

    asyncTest("MultiSelect renders part of the selected data items and values", function(done) {
        let multiselect = new MultiSelect(select, {
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            autoBind: false,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 40
            }
        });

        multiselect.one("dataBound", function() {
            scroll(multiselect.listView.content, 4 * CONTAINER_HEIGHT);

            setTimeout(function() {
                let options = multiselect.element.children(":selected");

                options = [].sort.call(options, function(a, b) { return parseInt(a.value) - parseInt(b.value); });

                done(() => {
                    assert.equal(options.length, 2);

                    assert.equal(options[0].text, "Item 0");
                    assert.equal(options[0].value, "0");

                    assert.equal(options[1].text, "Item 15");
                    assert.equal(options[1].value, "15");
                });
            }, 300);

        });

        multiselect.value(["0", "15"]);
        multiselect.open();
    });

    asyncTest("MultiSelect can display values that are not part of the first data page and are set through the API after initial dataBinding", function(done) {
        let multiselect = new MultiSelect(select, {
            height: CONTAINER_HEIGHT,
            autoBind: false,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 40
            }
        });

        multiselect.one("dataBound", function() {
            multiselect.close();
            multiselect.value([300]);
            setTimeout(function() {
                done(() => assert.equal(multiselect.tagList.children(".k-chip").length, 1, "Selected tag is rendered"));
            }, 300);
        });

        multiselect.open();
    });

    asyncTest("MultiSelect renders <select> tag if the corresponding dataItem is not part of the current data view", function(done) {
        let multiselect = new MultiSelect(select, {
            height: CONTAINER_HEIGHT,
            autoBind: false,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) {
                    o.success(o.value);
                },
                itemHeight: 40
            }
        });

        multiselect.one("dataBound", function() {
            multiselect.close();
            multiselect.value([299]);
            setTimeout(function() {
                done(() => {
                    assert.equal(multiselect.value()[0], [299]);
                    assert.equal(multiselect.element.children().last().attr("value"), "299", "Custom option is rendered");
                });
            }, 300);
        });

        multiselect.open();
    });

    asyncTest("MultiSelect triggers change on item select", function(done) {
        let multiselect = new MultiSelect(select, {
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            autoBind: false,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 40
            },
            change: function() {
                done(() => assert.isOk(true, "change is fired"));
            }
        });

        multiselect.one("dataBound", function() {
            let item = $(multiselect.items()[1]);
            item.click();
        });
        multiselect.open();
    });

    asyncTest("clear filter when set new value", function(done) {
        let multiselect = new MultiSelect(select, {
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            animation: false,
            filter: "contains",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 20
            }
        });

        multiselect.one("dataBound", function() {
            multiselect.open();

            multiselect.dataSource.filter({
                field: "text",
                operator: "contains",
                value: "Item 30"
            });

            multiselect.one("dataBound", function() {

                multiselect.value("");

                done(() => assert.equal(multiselect.dataSource.filter().filters.length, 0));
            });
        });

        multiselect.value(10);
    });

    asyncTest("MultiSelect selects values after open when autoBind false", function(done) {
        let multiselect = new MultiSelect(select, {
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            autoBind: false,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 40
            },
            value: ["0", "15"]
        });

        multiselect.one("dataBound", function() {
            done(() => assert.equal(multiselect.tagList.children(".k-chip").length, 2));
        });

        multiselect.open();
    });


    asyncTest.skip("request only pages related to the values after filter reset", function(done) {
        let callsAfterFilter = [];
        let transport = {
            read: function(options) {
                //gatter requests after rebind
                if (options.data.filter && !options.data.filter.filters.length) {
                    callsAfterFilter.push(options.data);
                }

                setTimeout(function() {
                    if (options.data.filter && options.data.filter.filters.length) {
                        options.success({ data: [{ id: 200, value: 200, text: "Item 200" }], total: 1 });
                    } else {
                        options.success({ data: generateData(options.data), total: 300 });
                    }
                }, 0);
            }
        };

        let multiselect = new MultiSelect(select, {
            animation: false,
            height: CONTAINER_HEIGHT,
            filter: "contains",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource({ transport: transport }),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 20
            }
        });

        let filterDataBound = function() {
            multiselect.one("change", multiselect.open);
            multiselect.ul.children().last().click();
        };

        let initialBinding = function() {
            multiselect.one("dataBound", filterDataBound);
            multiselect.search("Item 200");
        };

        multiselect.one("dataBound", initialBinding);
        multiselect.value([20, 100]);

        setTimeout(() => {
            done(() => {
                assert.equal(callsAfterFilter.length, 3);
                assert.equal(callsAfterFilter[0].pageSize, multiselect.dataSource.options.pageSize);
                assert.equal(callsAfterFilter[0].skip, 0);
                assert.equal(callsAfterFilter[1].skip, 80);
                assert.equal(callsAfterFilter[2].skip, 200);
            });
        }, 50);
    });

    asyncTest("reset page size when start filtering after rebind", function(done) {
        let requests = [];
        let watchRequests = false;

        let transport = {
            read: function(options) {
                //gatter requests after rebind
                if (watchRequests) {
                    requests.push(options.data);
                }

                setTimeout(function() {
                    if (options.data.filter && options.data.filter.filters.length) {
                        options.success({ data: [{ id: 200, value: 200, text: "Item 200" }], total: 1 });
                    } else {
                        options.success({ data: generateData(options.data), total: 300 });
                    }
                }, 0);
            }
        };

        let multiselect = new MultiSelect(select, {
            animation: false,
            height: CONTAINER_HEIGHT,
            filter: "contains",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource({ transport: transport }),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 20
            }
        });

        let secondFilter = function() {
            watchRequests = true;

            //force datasource to use specific page
            stub(multiselect.dataSource, {
                page: function() { return 6; }
            });

            //search again
            multiselect.search("Item 200");
        };

        let afterFilterRebind = function() {
            multiselect.open();

            setTimeout(() => {
                secondFilter();
            }, 200);
        };

        let filterDataBound = function() {
            multiselect.one("change", afterFilterRebind);
            multiselect.ul.children().last().click();
        };

        let initialBinding = function() {
            multiselect.one("dataBound", filterDataBound);
            multiselect.search("Item 200");
        };

        multiselect.one("dataBound", initialBinding);
        multiselect.value([20, 100]);

        setTimeout(() => {
            done(() => {
                assert.equal(requests[0].page, 1);
                assert.equal(requests[0].pageSize, multiselect.dataSource.options.pageSize);
            });
        }, 400);
    });

    asyncTest("highlight selected when filtering", function(done) {
        let requests = [];
        let watchRequests = false;

        let transport = {
            read: function(options) {
                //gatter requests after rebind
                if (watchRequests) {
                    requests.push(options.data);
                }

                setTimeout(function() {
                    if (options.data.filter && options.data.filter.filters.length) {
                        options.success({ data: [{ id: 200, value: 200, text: "Item 200" }], total: 1 });
                    } else {
                        options.success({ data: generateData(options.data), total: 300 });
                    }
                }, 0);
            }
        };

        let multiselect = new MultiSelect(select, {
            animation: false,
            height: CONTAINER_HEIGHT,
            filter: "contains",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource({ transport: transport }),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 20
            }
        });

        multiselect.value([200]);
        setTimeout(() => {
            multiselect.search("Item 200");
        }, 50);

        setTimeout(() => {
            done(() => assert.equal($(".k-selected").length, 1));
        }, 100);
    });


    asyncTest("deselecting item persists scroll position", function(done) {
        let multiselect = new MultiSelect(select, {
            animation: false,
            autoClose: false,
            height: CONTAINER_HEIGHT,
            filter: "contains",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 20
            }
        });

        multiselect.one("dataBound", function() {
            multiselect.open();
            multiselect.listView.content.scrollTop(4 * CONTAINER_HEIGHT);

            setTimeout(function() {
                let scrollPosition;

                //selects the item
                multiselect.ul.children().last().click();

                scrollPosition = multiselect.listView.content.scrollTop();

                //deselects the item
                multiselect.ul.children().last().click();

                done(() => assert.equal(multiselect.listView.content.scrollTop(), scrollPosition));
            }, 300);
        });

    });
});
