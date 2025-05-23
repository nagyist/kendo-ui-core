---
title: ObservableArray
page_title: API Reference for ObservableArray wrap in Kendo MVVM and Kendo DataSource
description: How to create a new ObservableArray, explanations how to use kendo.observable methods, fields and events.
res_type: api
---

# kendo.data.ObservableArray

The `ObservableArray` wraps an existing `Array` object with change-tracking capabilities. It is used by [Kendo UI MVVM](/framework/mvvm/overview) design pattern and the [`kendo.data.DataSource`](/framework/datasource/overview). Inherits from [`kendo.Observable`](/api/javascript/observable).

## Configuration

To create a new `ObservableArray`, use its constructor or the `kendo.observable` method.

#### Example - use the ObservableArray constructor

    <script>
    var array = new kendo.data.ObservableArray([
        { name: "John Doe" },
        { name: "Jane Doe" }
    ]);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(array[0].name); // outputs "John Doe"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(array.length); // outputs "2"
    </script>

#### Example - use the kendo.observable method

    <script>
    var observable = kendo.observable({
        people: [
            { name: "John Doe" },
            { name: "Jane Doe" }
        ]
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(observable.people instanceof kendo.data.ObservableArray); // outputs "true"
    </script>

> The `kendo.data.ObservableArray` wraps its items as [`kendo.data.ObservableObject`](/api/javascript/data/observableobject) instances unless the items are of the primitive type.

#### Example - an array of complex and primitive type

    <script>
    var complex = new kendo.data.ObservableArray([
        { name: "John Doe" },
        { name: "Jane Doe" }
    ]);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(complex[0] instanceof kendo.data.ObservableObject); // outputs "true"
    var primitive = new kendo.data.ObservableArray([
        "John Doe", "Jane Doe"
    ]);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(typeof (primitive[0]) ); // outputs "string"
    </script>

## Fields

### length

An unsigned, 32-bit integer that specifies the number of items in an `ObservableArray`.

#### Example - iterate over an ObservableArray

    <script>
    var array = new kendo.data.ObservableArray([1, 2, 3]);
    for (var i = 0; i < array.length; i++) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(array[i]); // outputs the current item
    }
    </script>

## Methods

### bind

Attaches an event handler for the specified event.

#### Example - subscribe to an event

    <script>
    var array = new kendo.data.ObservableArray([1, 2]);
    array.bind("change", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("changed");
    });
    array.push(3); // triggers the "change" event and the handler outputs "changed"
    </script>

#### Parameters

##### eventName `String`

The name of the event.

##### handler `Function`

The function which will be invoked when the event is fired.

### empty

Empties the array.

#### Example - working with empty method

    <script>
      var arr = new kendo.data.ObservableArray([10, 15, 20, 25, 30]);

      arr.empty()
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(arr)
    </script>

### every

Executes a callback function for every single item in the array and returns `true` or `false` depending if all the items in the array pass the condition. An equivalent of [`Array.prototype.every`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every).

#### Parameters 

##### callback `Function`

The function that will be executed for every item.

#### Returns

`Boolean`&mdash;Returns `true` if all items pass the test function condition. Otherwise, returns `false`.

#### Example - working with every method

    <script>
      var arr = new kendo.data.ObservableArray([10, 15, 20, 25, 30]);

      var result = arr.every((item) => {return item > 20})
      var result2 = arr.every((item) => {return item < 40})
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(arr)
      console.log(result)
      console.log(result2)
    </script>

### filter

Executes a callback function for every single item in the array and returns only those items that pass the filter condition. An equivalent of [`Array.prototype.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).

#### Parameters 

##### callback `Function`

The function that will be executed for every item.

#### Returns

`Array`&mdash;A new array with items that pass the filter condition.

#### Example - working with filter method

    <script>
      var arr = new kendo.data.ObservableArray([100, 10, 20, 30]);
    
      var result = arr.filter((item) => {return item > 20})
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(arr)
      console.log(result)
    </script>

### find

Find the first elements in an array that passes the callback testing function. An equivalent of [`Array.prototype.find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).

#### Parameters 

##### callback `Function`

The testing function.

#### Returns

`Object`&mdash;The first item that passes the search condition.

#### Example - working with find method

    <script>
      var arr = new kendo.data.ObservableArray([10, 15, 20, 25, 30]);
    
      var result = arr.find((item) => {return item > 20})
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(arr)
      console.log(result)
    </script>

### forEach

The method executes the callback function for every single item in the array. An equivalent of [`Array.prototype.forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

#### Parameters 

##### callback `Function`

The function that will be executed for every item.

#### Example - working with forEach method

    <script>
      var array = new kendo.data.ObservableArray([
        { id: 10, name: 'Apple', count: 5},
        { id: 20, name: 'Orange', count: 10},
        { id: 30, name: 'Milk', count: 12},
        { id: 40, name: 'Juice', count: 7},
        { id: 50, name: 'Melon', count: 20}
      ]);     
      array.forEach((item) => { item.count = item.count*3})
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(array)
    </script>

### indexOf

Returns the index in the Array at which the item can be found. An equivalent of [`Array.prototype.indexOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf).

#### Parameters

##### item `String|Number|Object`

The searched item.

#### Returns

`Number`&mdash;The index of the specified data item. Returns `-1` if the data item is not found.

#### Example - working with indexOf method

    <script>
      var array = new kendo.data.ObservableArray(["Apple", "Orange", "Berries", "Melon", "Grape", "Pear"])
      var result = array.indexOf("Grape");
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(result); // outputs "4"
    </script>

### join

Joins all items of an `ObservableArray` into a string. An equivalent of [`Array.prototype.join`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join).

#### Parameters

##### separator `String`

Specifies the string to separate each item of the array. If omitted, the array items are separated with a comma (`,`).

#### Example

    <script>
    var array = new kendo.data.ObservableArray([1, 2, 3]);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(array.join("-")); // outputs "1-2-3"
    </script>

### map

The method executes the callback function for every single item in the array and returns a new array as a result. An equivalent of [`Array.prototype.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

#### Parameters 

##### callback `Function`

The function that will be executed for every item.

#### Returns

`Array`&mdash;A new array with the results from the executed callback.

#### Example - working with map method

     <script>
      var arr = new kendo.data.ObservableArray([
        { id: 10, name: 'Apple', count: 5},
        { id: 20, name: 'Orange', count: 10},
        { id: 30, name: 'Milk', count: 12},
        { id: 40, name: 'Juice', count: 7},
        { id: 50, name: 'Melon', count: 20}
      ]);     
      var newArr = arr.map(item => { return item.count*3})
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(arr)
      console.log(newArr)
    </script>

### parent

Gets the parent of the array if such a parent exists.

#### Returns

`kendo.data.ObservableObject`&mdash;The parent of the array. Returns `undefined` if the array is not nested and does not have a parent.

#### Example - get the parent

    <script>
    var array = new kendo.data.ObservableArray([1, 2]);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(array.parent()); // outputs "undefined"
    var observable = kendo.observable({ numbers: [1, 2] });
    var numbers = observable.get("numbers");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(numbers.parent() === observable); // outputs "true"
    </script>

### pop

Removes the last item from an array and returns that item. An equivalent of [`Array.prototype.pop`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop).

> The `pop` method raises the [`change`](/api/javascript/data/observablearray/events/change) event. The `action` field of the event argument is set to `"remove"`. The `items` field of the event argument is the array that contains the removed item.

#### Returns

`Object`&mdash;The item which was removed.

#### Example - remove the last item from an ObservableArray

    <script>
    var array = new kendo.data.ObservableArray([{ name: "John Doe" }]);
    var result = array.pop();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(array.length); // outputs "0"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(result.get("name")); // outputs "John Doe"
    </script>

### push

Appends the given items to the array and returns the new length of the array. An equivalent of [`Array.prototype.push`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push). The new items are wrapped as an `ObservableObject` if they are complex objects.

> The `push` method raises the [`change`](/api/javascript/data/observablearray/events/change) event. The `action` field of the event argument is set to `"add"`. The `items` field of the event argument is the array that contains the appended items.

#### Returns

`Number`&mdash;The new length of the array.

#### Parameters

##### item1, ..., itemN

The item or items that will be appended to the array.

#### Example - append an item to an ObservableArray

    <script>
    var array = new kendo.data.ObservableArray([{ name: "John Doe" }]);
    var length = array.push({ name: "Jane Doe" });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(length); // outputs "2"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(array[1] instanceof kendo.data.ObservableObject); // outputs "true"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(array[1].get("name")); // outputs "Jane Doe"
    </script>

#### Example - append more than one item to an ObservableArray

    <script>
    var array = new kendo.data.ObservableArray([ 1 ]);
    var length = array.push(2, 3);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(length); // outputs "3"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(array[1]); // outputs "2"
    </script>

### reduce

Executes a callback function for every single item in the array and returns the accumulated result. Iterates the items left to right.

#### Parameters 

##### callback `Function`

The function that will be executed for every item.

#### Returns

`Number`&mdash;The accumulated result.

#### Example - working with reduce method

     <script>
      var arr = new kendo.data.ObservableArray([100, 10, 20, 30]); 
      
      var result = arr.reduce((totalCount, item) => totalCount - item)
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(arr)
      console.log(result)
    </script>

### reduceRight

Executes a callback function for every single item in the array and returns the accumulated result. Iterates the items right to left.

#### Parameters 

##### callback `Function`

The function that will be executed for every item.

#### Returns

`Number`&mdash;The accumulated result.

#### Example - working with reduceRight method

     <script>
      var arr = new kendo.data.ObservableArray([100, 10, 20, 30]); 
      
      var result = arr.reduceRight((totalCount, item) => totalCount - item)
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(arr)
      console.log(result)
    </script>

### remove

Removes the specified item from an array.

#### Parameters 

##### item `String|Number|Object`

The item that will be removed.

#### Example - working with remove method

    <script>
      var array = new kendo.data.ObservableArray(["Apple", "Orange", "Berries", "Melon", "Grape", "Pear"])
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(array.length);
      array.remove("Grape");
      console.log(array); 
      console.log(array.length);
    </script>

### slice

Returns a single-level deep copy of a portion of an array. An equivalent of [`Array.prototype.slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice). The result of the `slice` method is not an instance of `ObvservableArray`&mdash;it is a regular JavaScript `Array` object.

> The `slice` method does not modify the original `ObservableArray`.

#### Parameters

##### begin `Number`

A zero-based index at which the extraction will start.

##### end `Number`

A zero-based index at which the extraction will end. If `end` is omitted, `slice` extracts to the end of the sequence.

#### Example - slice items from an ObservableArray

    <script>
    var array = new kendo.data.ObservableArray([1, 2, 3]);
    var firstAndSecond = array.slice(0, 2);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(firstAndSecond); // outputs [1, 2]
    </script>

### some

Executes a callback function for every single item in the array and returns `true` or `false` depending if any of the items in the array passes the condition. An equivalent of [`Array.prototype.some`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some).

#### Parameters 

##### callback `Function`

The function that will be executed for every item.

#### Returns

`Boolean`&mdash;Returns `true` if any of the items passes the test function condition. Otherwise, returns `false`.

#### Example - working with some method

    <script>
      var arr = new kendo.data.ObservableArray([10, 15, 20, 25, 30]);

      var result = arr.every((item) => {return item > 20})
      /* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(arr)
      console.log(result)
    </script>

### splice

Changes an `ObservableArray` by adding new items while removing old items. An equivalent of [`Array.prototype.splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice).

> The `splice` method raises the [`change`](/api/javascript/data/observablearray/events/change) event once or twice depending on the change. The `action` field of the event argument is set to `"add"` (if items are added) or `"remove` (if items are removed). The `items` field of the event argument is the array that contains the appended items or removed items. In the previous example, the `change` event will be triggered two times&mdash;the first one, because `baseball` is removed and, the second one, because `tennis` and `hockey` are added.

#### Returns

`Array`&mdash;Contains the removed items. The result of the `splice` method is not an instance of `ObvservableArray`.

#### Parameters

##### index `Number`

An index at which the changing of the array will start.

##### howMany `Number`

An integer which indicates the number of the items for removal. If set to `0`, no items will be removed. In this case, you have to specify at least one new item.

##### item1, ..., itemN *(optional)*

The items that will be added to the array. If you do not specify any items, `splice` removes the items from the array.

#### Example - splice array items

    <script>
    var sports = new kendo.data.ObservableArray(["football", "basketball", "volleyball"]);
    var removed = sports.splice(1, 1, "tennis", "hockey");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(removed); // outputs ["basketball"]
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(sports); // outputs ["football", "tennis", "hockey", "volleyball"]
    </script>

### shift

Removes the first item from an `ObvservableArray` and returns that item. An equivalent of [`Array.prototype.shift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift).

> The `shift` method raises the `change` event. The `action` field of the event argument is set to `"remove"`. The `items` field of the event argument is an array that contains the removed item.

#### Returns

`Object`&mdash;The item which was removed.

#### Example - remove the first item

    <script>
    var array = new kendo.data.ObservableArray([1, 2, 3]);
    var removed = array.shift();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(removed); // outputs "1"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(array.length); // outputs "2"
    </script>

### toJSON

Returns a JavaScript `Array` object which represents the contents of the `ObservableArray`.

#### Example - return the raw array representation

    <script>
    var people = new kendo.data.ObservableArray([
        { name: "John Doe" },
        { name: "Jane Doe" }
    ]);
    var json = people.toJSON();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(JSON.stringify(json)); // outputs [{"name":"John Doe"},{"name":"Jane Doe"}]
    </script>

### unshift

Adds one or more items to the beginning of an `ObservableArray` and returns the new length. An equivalent of [`Array.prototype.unshift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift).

> The `unshift` method raises the [`change`](/api/javascript/data/observablearray/events/change) event. The `action` field of the event argument is set to `"add"`. The `items` field of the event argument is an array that contains the new items.

#### Returns

`Number`&mdash;The new length of the array.

#### Parameters

##### item1, ..., itemN

The items that will be added to the beginning of the `ObservableArray`.

#### Example - add items to the beginning of an ObservableArray

    <script>
    var array = new kendo.data.ObservableArray([2, 3]);
    var result = array.unshift(0, 1);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(result); // outputs "4"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(array); // outputs [0, 1, 2, 3]
    </script>

## Events

### change

Fires when the items of the `ObservableArray` change.

#### Event Data

##### e.action `String`

Specifies the type of change.

The possible values are:

* `"add"`- Items are added to the `ObservableArray`.
* `"itemchange"` - A field of an item changed.
* `"remove"` - Items are removed from the `ObservableArray`.

##### e.index `Number`

The index at which items are removed or added. Set to `undefined` if `e.action` is `"itemchange"`.

##### e.items `Array`

The items which were changed.

##### e.field `String`

The field name of an item that changed. Available only when `e.action` is `"itemchange"`.

#### Example - subscribe to the change event

    <script>
    var array = new kendo.data.ObservableArray([1, 2, 3]);
    array.bind("change", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.action, e.index, e.items);
    });
    array.push(4, 5); // outputs "add", 3, [4, 5]
    array.pop(); // outputs "remove", 4, [5]
    var people = new kendo.data.ObservableArray([{ name: "John Doe" }]);
    people.bind("change", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.action, e.field, e.items[0].get("name"));
    });
    people[0].set("name", "Jane Doe"); // outputs "itemchange", "name", "Jane Doe"
    </script>
