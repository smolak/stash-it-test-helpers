![logo-stash-it-color-dark 2x](https://user-images.githubusercontent.com/1819138/30385483-99fd209c-98a7-11e7-85e2-595791d8d894.png)

# stash-it-test-helpers

During the development of [stash-it](https://smolak.github.io/stash-it/) I came across some repetition and therefore extracted few helper functions / values that I used.

In order to help anyone developing custom adapters or plugins, this separate module was created.

## Installation

```sh
npm install stash-it-test-helpers --save-dev
```

Yes, they are needed only for development (tests, to be more precise).

## Contents

There are few methods available and a handful of consts and test-against sets of data.
All of them can be imported like so:

```javascript
import {
    createDummyAdapter,
    testKey,
    testNamespace,
    FOO_KEY,
    FOO_WITH_EXTRA_KEY,
    FOO_VALUE,
    BAR_KEY,
    BAR_WITH_EXTRA_KEY,
    BAR_VALUE,
    FOO_EXTRA,
    BAR_EXTRA,
    NONEXISTENT_KEY,
    NONEXISTENT_VALUE,
    invalidCharacters,
    nonArrayValues,
    nonFunctionValues,
    nonObjectValues,
    nonStringValues
} from 'stash-it-test-helpers';
```

## Methods

1. [createDummyAdapter](#createdummyadapteroptions)
1. [testKey](#testkeyaction)
1. [testNamespace](#testnamespaceaction)

### createDummyAdapter(createItem, options = {})

This method creates dummy adapter. It's primary use is to help test [stash-it](https://smolak.github.io/stash-it/)'s `createCache` and `registerPlugins` methods.
It returns an object that mimics the behaviour of full-grown adapter. Because of that one can use it to stub any adapter when needed.

```javascript
return {
    getNamespace: getNamespaceStub,
    addExtra: addExtraStub,
    buildKey: buildKeyStub,
    getExtra: getExtraStub,
    getItem: getItemStub,
    hasItem: hasItemStub,
    removeItem: removeItemStub,
    setExtra: setExtraStub,
    setItem: setItemStub
};
```

##### TIP

Every method in this object has preprogrammed behaviour. If you need to alter it, use [Sinon](sinonjs.org)'s stub API to do so.

#### createItem

This parameter is required (and best obtained from [stash-it](https://smolak.github.io/stash-it/)).
Why from `stash-it`? To have it built in the very same fashion as `stash-it` does.
You can pass any function that will create it, but for best results ues that one.

#### options = {}

`createDummyAdapter` will look for `namespace` property, to set namespace for adapter.
If that object is omitted or namespace property is not passed, default namespace will be used, and it's value is `namespace`.
Namespace, if passed, must be a string consisting only out of letters (azAZ), numbers, and `-`, `_` characters in any combination.

```javascript
createDummyAdapter(createItem, { namespace: 'someNamespace-123_456' });
```

There are also all consts in use here, that is:

```javascript
const FOO_KEY = 'foo';
const FOO_WITH_EXTRA_KEY = 'fooWithExtra';
const FOO_VALUE = 'fooValue';
const BAR_KEY = 'bar';
const BAR_WITH_EXTRA_KEY = 'barWithExtra';
const BAR_VALUE = 'barValue';
const FOO_EXTRA = { foo: 'extra' };
const BAR_EXTRA = { bar: 'extra' };
const NONEXISTENT_KEY = 'nonexistent';
const NONEXISTENT_VALUE = undefined;
```

Their values are not important. What is, is that stubs behave in a preprogrammed fashion so that they emulate the behaviour (and results) of a real adapter.
They are set as consts for easy setting / getting and verification of results.

#### buildKey(key)

This method builds ... yes, a key, which is used in all other adapter's methods.
The idea is that when `FOO_KEY` is passed as an argument, `getItem` with `FOO_KEY` will return item with value property `FOO_VALUE`.
Similar for `BAR_KEY`.
`FOO_WITH_EXTRA_KEY` (and `BAR_WIRH_EXTRA_KEY`) are also here, should you test adapter's behaviour when `extra` is passed while setting an item.
What is `extra`? Checkout [stash-it](https://smolak.github.io/stash-it/)'s docs.

#### getItem(key)

This method, when one of const key is used, returns an item created for this key.
E.g.:
```javascript
getItem(FOO_KEY); // item created for FOO_KEY
```

For `NONEXISTENT_KEY` this method returns `NONEXISTENT_VALUE` (which is `undefined` in terms of real-life adapter's behaviour).

Created item is built using `createItem` method available in [stash-it](https://smolak.github.io/stash-it/).

#### getExtra(key)

This method, when one of const keys is used, returns an `extra` for item created for given key.

For `NONEXISTENT_KEY` this method returns `undefined` as item for given key does not exist.

#### setExtra(key, extra)

This method, when one of const keys is used, returns an `extra` for item that key represents.

For `NONEXISTENT_KEY` this method returns `undefined` as item for given key does not exist.

#### addExtra(key, extra)

This method, when one of const keys is used, returns an `extra` for item that key represents.

For `NONEXISTENT_KEY` this method returns `undefined` as item for given key does not exist.

#### hasItem(key)

This method, when one of const key is used, reuturns `true`.

For `NONEXISTENT_KEY` this method returns `false` as item for given key does not exist.

#### setItem(key, value, \[extra\])

This method, when one of the sets:
 * `FOO_KEY`, `FOO_VALUE`
 * `BAR_KEY`, `BAR_VALUE`
 * `FOO_WITH_EXTRA_KEY`, `FOO_VALUE`, `FOO_EXTRA`
 * `BAR_WITH_EXTRA_KEY`, `BAR_VALUE`, `BAR_EXTRA`

will create and return an item based on one of passed values.
And yes, create. Check out `setItem` method of e.g. [stash-it](https://smolak.github.io/stash-it-adapter-memory/) method item using `createItem` method available in [stash-it](https://smolak.github.io/stash-it/).

#### removeItem(key)

This method, when one of the keys is passed (`FOO_KEY` or `BAR_KEY` or `FOO_WITH_EXTRA_KEY` or `BAR_WITH_EXTRA_KEY`) will return `true`.
It assumes that those items exist so returned result will be `true`.

For `NONEXISTENT_KEY` it will return `false` (assuming that this item does not exist).

### testKey(action)

This method is used to help test adapter's `setItem(key, value, [extra])` action which should validate `key`.

If you wan't to be consistent with how keys should look like (what characters they are build from), you should use this helper function.

Have a look at how it's being used in [stash-it-adapter-memory](https://github.com/smolak/stash-it-adapter-memory/blob/master/test/unit/src/index.test.js).

### testNamespace(action)

This method is used to help test adapter's construct method which should validate `namespace`.

If you wan't to be consistent with how namespaces should look like (what characters they are build from), you should use this helper function.

Have a look at how it's being used in [stash-it-adapter-memory](https://github.com/smolak/stash-it-adapter-memory/blob/master/test/unit/src/index.test.js).

## Values

`invalidCharacters, nonArrayValues, nonFunctionValues, nonObjectValues, nonStringValues`

They are used to test various values against them. For instance, if you need to check if something is a string and should throw otherwise, use `nonStringValues`.
It contains a handful of different types of data. Similar to rest of them.

Have a look at how they're being used in [stash-it](https://github.com/smolak/stash-it/blob/master/test/unit/src/registerPlugins.test.js).
