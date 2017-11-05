import sinon from 'sinon';

function validateNamespace(namespace) {
    if (typeof namespace !== 'string') {
        throw new Error('`namespace` must be a string.');
    }

    if (false === /^[A-Za-z0-9_-]+$/i.test(namespace)) {
        throw Error('`namespace` can contain only letters, numbers, `_` or `-`.');
    }
}

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

const defaultNamespace = 'namespace';

function createDummyAdapter(createItem, options = {}) {
    const defaultOptions = {
        namespace: defaultNamespace
    };
    const mergedOptions = Object.assign({}, defaultOptions, options);
    const builtFooKey = `${mergedOptions.namespace}.${FOO_KEY}`;
    const builtBarKey = `${mergedOptions.namespace}.${BAR_KEY}`;
    const builtNonexistentKey = `${mergedOptions.namespace}.${NONEXISTENT_KEY}`;
    const builtFooWithExtraKey = `${mergedOptions.namespace}.${FOO_WITH_EXTRA_KEY}`;
    const builtBarWithExtraKey = `${mergedOptions.namespace}.${BAR_WITH_EXTRA_KEY}`;

    validateNamespace(mergedOptions.namespace);

    const fooItem = createItem(builtFooKey, FOO_VALUE, mergedOptions.namespace);
    const barItem = createItem(builtBarKey, BAR_VALUE, mergedOptions.namespace);
    const fooWithExtraItem = createItem(builtFooWithExtraKey, FOO_VALUE, mergedOptions.namespace, FOO_EXTRA);
    const barWithExtraItem = createItem(builtBarWithExtraKey, BAR_VALUE, mergedOptions.namespace, BAR_EXTRA);

    const buildKeyStub = sinon.stub();

    buildKeyStub.withArgs(FOO_KEY).returns(builtFooKey);
    buildKeyStub.withArgs(BAR_KEY).returns(builtBarKey);
    buildKeyStub.withArgs(FOO_WITH_EXTRA_KEY).returns(builtFooWithExtraKey);
    buildKeyStub.withArgs(BAR_WITH_EXTRA_KEY).returns(builtBarWithExtraKey);
    buildKeyStub.withArgs(NONEXISTENT_KEY).returns(builtNonexistentKey);

    const setItemStub = sinon.stub();

    setItemStub.withArgs(builtFooKey, FOO_VALUE).returns(fooItem);
    setItemStub.withArgs(builtBarKey, BAR_VALUE).returns(barItem);
    setItemStub.withArgs(builtFooWithExtraKey, FOO_VALUE, FOO_EXTRA).returns(fooWithExtraItem);
    setItemStub.withArgs(builtBarWithExtraKey, BAR_VALUE, BAR_EXTRA).returns(barWithExtraItem);

    const getItemStub = sinon.stub();

    getItemStub.withArgs(builtFooKey).returns(fooItem);
    getItemStub.withArgs(builtBarKey).returns(barItem);
    getItemStub.withArgs(builtFooWithExtraKey).returns(fooWithExtraItem);
    getItemStub.withArgs(builtBarWithExtraKey).returns(barWithExtraItem);
    getItemStub.withArgs(builtNonexistentKey).returns(NONEXISTENT_VALUE);

    const setExtraStub = sinon.stub();

    setExtraStub.withArgs(builtFooKey, FOO_EXTRA).returns(FOO_EXTRA);
    setExtraStub.withArgs(builtBarKey, BAR_EXTRA).returns(BAR_EXTRA);
    setExtraStub.withArgs(builtFooWithExtraKey, FOO_EXTRA).returns(FOO_EXTRA);
    setExtraStub.withArgs(builtBarWithExtraKey, BAR_EXTRA).returns(BAR_EXTRA);

    const getExtraStub = sinon.stub();

    getExtraStub.withArgs(builtFooKey).returns(fooItem.extra);
    getExtraStub.withArgs(builtBarKey).returns(barItem.extra);
    getExtraStub.withArgs(builtFooWithExtraKey).returns(fooWithExtraItem.extra);
    getExtraStub.withArgs(builtBarWithExtraKey).returns(barWithExtraItem.extra);
    getExtraStub.withArgs(builtNonexistentKey).returns(undefined);

    const hasItemStub = sinon.stub();

    hasItemStub.withArgs(builtFooKey).returns(true);
    hasItemStub.withArgs(builtBarKey).returns(true);
    hasItemStub.withArgs(builtFooWithExtraKey).returns(true);
    hasItemStub.withArgs(builtBarWithExtraKey).returns(true);
    hasItemStub.withArgs(builtNonexistentKey).returns(false);

    const removeItemStub = sinon.stub();

    removeItemStub.withArgs(builtFooKey).returns(true);
    removeItemStub.withArgs(builtBarKey).returns(true);
    removeItemStub.withArgs(builtFooWithExtraKey).returns(true);
    removeItemStub.withArgs(builtBarWithExtraKey).returns(true);
    removeItemStub.withArgs(builtNonexistentKey).returns(false);

    return {
        buildKey: buildKeyStub,
        getExtra: getExtraStub,
        getItem: getItemStub,
        hasItem: hasItemStub,
        removeItem: removeItemStub,
        setItem: setItemStub,
        setExtra: setExtraStub
    };
}

export {
    createDummyAdapter,
    FOO_KEY,
    FOO_WITH_EXTRA_KEY,
    FOO_VALUE,
    BAR_KEY,
    BAR_WITH_EXTRA_KEY,
    BAR_VALUE,
    FOO_EXTRA,
    BAR_EXTRA,
    NONEXISTENT_KEY,
    NONEXISTENT_VALUE
};
