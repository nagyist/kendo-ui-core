import '@progress/kendo-ui/src/kendo.data.js';

let DataReader = kendo.data.DataReader;

describe("Data reader", function() {
    it("data returns the passed value by default", function() {
        let reader = new DataReader(), result = {};

        assert.isOk(reader.data(result) === result);
    });

    it("groups returns the passed value by default", function() {
        let reader = new DataReader(), result = {};

        assert.isOk(reader.groups(result) === result);
    });

    it("members of the schema override the prototype members", function() {
        let reader = new DataReader({
            data: function(result) {
                return result + "bar";
            }
        });

        assert.equal(reader.data("foo"), "foobar");
    });

    it("string members of the schema are treated as getters", function() {
        let reader = new DataReader({
            data: "foo"
        });

        assert.equal(reader.data({ foo: "bar" }), "bar");
    });

    it("total returns the length by default", function() {
        let reader = new DataReader();

        assert.equal(reader.total([1]), 1);
    });

    it("aggregates returns an empty object default", function() {
        let reader = new DataReader();

        assert.isOk($.isEmptyObject(reader.aggregates()));
    });

    it("model is initialized if passed", function() {
        let reader = new DataReader({
            model: {}
        });

        assert.isOk(new reader.model instanceof kendo.data.Model);
    });

    it("project fields to the one specified in the field definition", function() {
        let reader = new DataReader({
            model: {
                fields: {
                    bar: { field: "foo" }
                }
            }
        });

        let result = reader.parse([{ foo: "1" }, { foo: "" }, { foo: "0" }]);

        result = reader.data(result);

        assert.equal(result.length, 3);
        assert.equal(result[0].bar, "1");
        assert.equal(result[1].bar, "");
        assert.equal(result[2].bar, "0");
    });

    it("project fields to the one specified in the field definition when definition is array", function() {
        let reader = new DataReader({
            model: {
                fields: [
                    { field: "bar", from: "foo" }
                ]
            }
        });

        let result = reader.parse([{ foo: "1" }, { foo: "" }, { foo: "0" }]);

        result = reader.data(result);

        assert.equal(result.length, 3);
        assert.equal(result[0].bar, "1");
        assert.equal(result[1].bar, "");
        assert.equal(result[2].bar, "0");
    });

    it("project fields from the one specified in the from field definition", function() {
        let reader = new DataReader({
            model: {
                fields: {
                    bar: { from: "foo" }
                }
            }
        });

        let result = reader.parse([{ foo: "1" }, { foo: "" }, { foo: "0" }]);

        result = reader.data(result);

        assert.equal(result.length, 3);
        assert.equal(result[0].bar, "1");
        assert.equal(result[1].bar, "");
        assert.equal(result[2].bar, "0");
    });

    it("project fields - from has greater priority", function() {
        let reader = new DataReader({
            model: {
                fields: {
                    bar: { from: "foo", field: "baz" }
                }
            }
        });

        let result = reader.parse([{ foo: "1" }, { foo: "" }, { foo: "0" }]);

        result = reader.data(result);

        assert.equal(result.length, 3);
        assert.equal(result[0].bar, "1");
        assert.equal(result[1].bar, "");
        assert.equal(result[2].bar, "0");
    });

    it("project fields works with nested properties which parent is null", function() {
        let reader = new DataReader({
            model: {
                fields: {
                    bar: { from: "foo.baz" }
                }
            }
        });

        let result = reader.parse([{ foo: { baz: "baz" } }, { foo: null }]);

        result = reader.data(result);

        assert.equal(result.length, 2);
        assert.equal(result[0].bar, "baz");
        assert.equal(result[1].bar, undefined);
    });

    it("project fields to the name specified as string", function() {
        let reader = new DataReader({
            model: {
                fields: {
                    bar: "foo"
                }
            }
        });

        let result = reader.parse([{ foo: "1" }, { foo: "" }, { foo: "0" }]);

        result = reader.data(result);

        assert.equal(result.length, 3);
        assert.equal(result[0].bar, "1");
        assert.equal(result[1].bar, "");
        assert.equal(result[2].bar, "0");
    });

    it("groups project fields to the one specified in the field definition", function() {
        let reader = new DataReader({
            model: {
                fields: {
                    bar: { field: "foo" }
                }
            }
        });

        let result = reader.parse([{ items: [{ foo: "1" }, { foo: "" }, { foo: "0" }], field: "foo", value: "0" }]);
        result = reader.groups(result)[0];

        assert.equal(result.items.length, 3);
        assert.equal(result.items[0].bar, "1");
        assert.equal(result.items[1].bar, "");
        assert.equal(result.items[2].bar, "0");
    });

    it("group field name is converted if projection is specified", function() {
        let reader = new DataReader({
            model: {
                fields: {
                    bar: { field: "foo" }
                }
            }
        });

        let result = reader.parse([{ items: [{ foo: "1" }, { foo: "" }, { foo: "0" }], field: "foo", value: "0" }]);
        result = reader.groups(result)[0];

        assert.equal(result.items.length, 3);
        assert.equal(result.field, "bar");
    });

    it("original field is deleted after the projection when set via field declaration", function() {
        let reader = new DataReader({
            model: {
                fields: {
                    bar: { field: "foo" }
                }
            }
        });

        let result = reader.parse([{ foo: "1" }, { foo: "" }, { foo: "0" }]);

        result = reader.data(result);

        assert.equal(result.length, 3);
        assert.isOk(!("foo" in result[0]));
        assert.isOk(!("foo" in result[1]));
        assert.isOk(!("foo" in result[1]));
    });

    it("original field is deleted after the projection", function() {
        let reader = new DataReader({
            model: {
                fields: {
                    bar: "foo"
                }
            }
        });

        let result = reader.parse([{ foo: "1" }, { foo: "" }, { foo: "0" }]);

        result = reader.data(result);

        assert.equal(result.length, 3);
        assert.isOk(!("foo" in result[0]));
        assert.isOk(!("foo" in result[1]));
        assert.isOk(!("foo" in result[1]));
    });

    it("original field is not deleted if not projected", function() {
        let reader = new DataReader({
            model: {
                fields: {
                    bar: "bar"
                }
            }
        });

        let result = reader.parse([{ bar: "1" }, { bar: "" }, { bar: "0" }]);

        result = reader.data(result);

        assert.equal(result.length, 3);
        assert.isOk("bar" in result[0]);
        assert.isOk("bar" in result[1]);
        assert.isOk("bar" in result[1]);
    });

    it("custom serialize is called instead of the default implementation", function() {
        let reader = new DataReader({
            model: {
                fields: {
                    bar: "bar"
                }
            },
            serialize: function(data) {
                return [{ baz: "foo" }];
            }
        });

        let result = reader.parse([{ bar: "1" }, { bar: "" }, { bar: "0" }]);

        result = reader.serialize(result);

        assert.equal(result[0].baz, "foo");
    });

    it("data is not processed by the defualt serialize if custom one is set", function() {
        let reader = new DataReader({
            model: {
                fields: {
                    bar: "foo"
                }
            },
            serialize: function(data) {
                assert.equal(data[0].bar, "1");
            }
        });

        let result = reader.parse([{ foo: "1" }, { foo: "" }, { foo: "0" }]);

        result = reader.data(result);
        reader.serialize(result);
    });

    it("custom serialize is called event if field names matches", function() {
        let reader = new DataReader({
            model: {
                fields: {
                    bar: "bar"
                }
            },
            serialize: function(data) {
                assert.isOk(true);
            }
        });

        let result = reader.parse([{ foo: "1" }, { foo: "" }, { foo: "0" }]);

        result = reader.data(result);
        reader.serialize(result);
    });

    it("serialize converts data to the original structure", function() {
        let reader = new DataReader({
            model: {
                fields: {
                    bar: "foo"
                }
            }
        });

        let result = reader.parse([{ foo: "1" }, { foo: "" }, { foo: "0" }]);

        result = reader.data(result);
        result = reader.serialize(result);

        assert.equal(result.length, 3);
        assert.equal(result[0].foo, "1");
        assert.equal(result[1].foo, "");
        assert.equal(result[2].foo, "0");
    });

    it("serialize converts data to the original structure with object as field declaration", function() {
        let reader = new DataReader({
            model: {
                fields: {
                    bar: { field: "foo" }
                }
            }
        });

        let result = reader.parse([{ foo: "1" }, { foo: "" }, { foo: "0" }]);

        result = reader.data(result);
        result = reader.serialize(result);

        assert.equal(result.length, 3);
        assert.equal(result[0].foo, "1");
        assert.equal(result[1].foo, "");
        assert.equal(result[2].foo, "0");
        assert.isOk(!("bar" in result[2]));
    });

    it("serialize converts data to the original structure with object as from declaration", function() {
        let reader = new DataReader({
            model: {
                fields: {
                    bar: { from: "foo" }
                }
            }
        });

        let result = reader.parse([{ foo: "1" }, { foo: "" }, { foo: "0" }]);

        result = reader.data(result);
        result = reader.serialize(result);

        assert.equal(result.length, 3);
        assert.equal(result[0].foo, "1");
        assert.equal(result[1].foo, "");
        assert.equal(result[2].foo, "0");
        assert.isOk(!("bar" in result[2]));
    });

    it("serialize converts data to the original structure with object as from declaration - nested field", function() {
        let reader = new DataReader({
            model: {
                fields: {
                    bar: { from: "foo.baz" }
                }
            }
        });

        let result = reader.parse([{ foo: { baz: "1" } }, { foo: { baz: "" } }, { foo: { baz: "0" } }]);

        result = reader.data(result);
        result[0].bar = "new value";
        result = reader.serialize(result);

        assert.equal(result.length, 3);
        assert.equal(result[0].foo.baz, "new value");
        assert.equal(result[1].foo.baz, "");
        assert.equal(result[2].foo.baz, "0");
        assert.isOk(!("bar" in result[0]));
        assert.isOk(!("bar" in result[1]));
        assert.isOk(!("bar" in result[2]));
    });


    it("converts field values to the specifed type", function() {
        let reader = new DataReader({
            model: {
                fields: {
                    bar: { type: "number" },
                    baz: "baz"
                }
            }
        });

        let result = reader.parse([{ bar: "1", baz: "baz1" }, { bar: "", baz: "baz2" }, { bar: "0", baz: "baz3" }]);
        result = reader.data(result);

        assert.equal(result.length, 3);
        assert.strictEqual(result[0].bar, 1);
        assert.strictEqual(result[0].baz, "baz1");
        assert.strictEqual(result[1].bar, null);
        assert.strictEqual(result[1].baz, "baz2");
        assert.strictEqual(result[2].bar, 0);
        assert.strictEqual(result[2].baz, "baz3");
    });

    it("converts field values to the specifed type with server groups", function() {
        let reader = new DataReader({
            model: {
                fields: {
                    bar: { type: "number" },
                    baz: "baz"
                }
            }
        });

        let result = reader.parse([{ items: [{ bar: "1", baz: "baz1" }, { bar: "", baz: "baz2" }, { bar: "0", baz: "baz3" }], field: "bar", value: "0" }]);
        result = reader.groups(result)[0];

        let items = result.items;

        assert.equal(items.length, 3);
        assert.strictEqual(items[0].bar, 1);
        assert.strictEqual(items[0].baz, "baz1");
        assert.strictEqual(items[1].bar, null);
        assert.strictEqual(items[1].baz, "baz2");
        assert.strictEqual(items[2].bar, 0);
        assert.strictEqual(items[2].baz, "baz3");

        assert.strictEqual(result.value, 0);
    });

    it("converts field values to the specifed type with external model definition", function() {
        let Model = kendo.data.Model.define({
            fields: {
                bar: { type: "number" },
                baz: "baz"
            }
        });

        let reader = new DataReader({
            model: Model
        });

        let result = reader.parse([{ bar: "1", baz: "baz1" }, { bar: "", baz: "baz2" }, { bar: "0", baz: "baz3" }]);
        result = reader.data(result);

        assert.equal(result.length, 3);
        assert.strictEqual(result[0].bar, 1);
        assert.strictEqual(result[0].baz, "baz1");
        assert.strictEqual(result[1].bar, null);
        assert.strictEqual(result[1].baz, "baz2");
        assert.strictEqual(result[2].bar, 0);
        assert.strictEqual(result[2].baz, "baz3");
    });

    it("converts field values to the specifed type with multiple nested server groups", function() {
        let reader = new DataReader({
            model: {
                fields: {
                    bar: { type: "number" },
                    baz: "baz"
                }
            }
        });

        let result = reader.parse([{
            hasSubgroups: true, items: [
                { items: [{ bar: "1", baz: "baz1" }, { bar: "", baz: "baz2" }, { bar: "0", baz: "baz3" }], field: "bar", value: "0" }
            ],
            field: "bar",
            value: "0"
        }]);

        result = reader.groups(result)[0];

        assert.strictEqual(result.items[0].value, 0);

        let items = result.items[0].items;

        assert.equal(items.length, 3);
        assert.strictEqual(items[0].bar, 1);
        assert.strictEqual(items[0].baz, "baz1");
        assert.strictEqual(items[1].bar, null);
        assert.strictEqual(items[1].baz, "baz2");
        assert.strictEqual(items[2].bar, 0);
        assert.strictEqual(items[2].baz, "baz3");

    });

    it("fields not in the model are persisted", function() {
        let reader = new DataReader({
            model: {
                fields: {
                    bar: { type: "number" }
                }
            }
        });

        let result = reader.parse([{ bar: "1", baz: "baz1" }, { bar: "", baz: "baz2" }, { bar: "0", baz: "baz3" }]);
        result = reader.data(result);

        assert.equal(result.length, 3);
        assert.strictEqual(result[0].bar, 1);
        assert.strictEqual(result[0].baz, "baz1");
        assert.strictEqual(result[1].bar, null);
        assert.strictEqual(result[1].baz, "baz2");
        assert.strictEqual(result[2].bar, 0);
        assert.strictEqual(result[2].baz, "baz3");
    });

    it("custom data function is called when model is defined", function() {
        let called = false,
            reader = new DataReader({
                model: {
                    fields: {
                        bar: { type: "number" },
                        baz: "baz"
                    }
                },
                data: function() {
                    called = true;
                    return [];
                }
            });

        let result = reader.parse([{ bar: "1", baz: "baz1" }, { bar: "", baz: "baz2" }, { bar: "0", baz: "baz3" }]);
        result = reader.data(result);
        assert.isOk(called);
    });

    it("data retuns empty observable array when such is passed and a model is declared", function() {
        let reader = new DataReader({
            model: {
                fields: {
                    bar: { type: "number" },
                    baz: "baz"
                }
            },
            data: function() {
                return new kendo.data.ObservableArray([]);
            }
        });
        assert.isOk(!reader.data().length);
    });

});
