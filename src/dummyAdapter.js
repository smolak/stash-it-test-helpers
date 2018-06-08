import sinon from 'sinon';

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

function createDummyAdapter(createItem) {
    const fooItem = createItem(FOO_KEY, FOO_VALUE);
    const barItem = createItem(BAR_KEY, BAR_VALUE);
    const fooWithExtraItem = createItem(FOO_WITH_EXTRA_KEY, FOO_VALUE, FOO_EXTRA);
    const barWithExtraItem = createItem(BAR_WITH_EXTRA_KEY, BAR_VALUE, BAR_EXTRA);

    const buildKeyStub = sinon.stub();

    buildKeyStub.withArgs(FOO_KEY).returns(FOO_KEY);
    buildKeyStub.withArgs(BAR_KEY).returns(BAR_KEY);
    buildKeyStub.withArgs(FOO_WITH_EXTRA_KEY).returns(FOO_WITH_EXTRA_KEY);
    buildKeyStub.withArgs(BAR_WITH_EXTRA_KEY).returns(BAR_WITH_EXTRA_KEY);
    buildKeyStub.withArgs(NONEXISTENT_KEY).returns(NONEXISTENT_KEY);

    const setItemStub = sinon.stub();

    setItemStub.withArgs(FOO_KEY, FOO_VALUE).returns(fooItem);
    setItemStub.withArgs(BAR_KEY, BAR_VALUE).returns(barItem);
    setItemStub.withArgs(FOO_WITH_EXTRA_KEY, FOO_VALUE, FOO_EXTRA).returns(fooWithExtraItem);
    setItemStub.withArgs(BAR_WITH_EXTRA_KEY, BAR_VALUE, BAR_EXTRA).returns(barWithExtraItem);

    const getItemStub = sinon.stub();

    getItemStub.withArgs(FOO_KEY).returns(fooItem);
    getItemStub.withArgs(BAR_KEY).returns(barItem);
    getItemStub.withArgs(FOO_WITH_EXTRA_KEY).returns(fooWithExtraItem);
    getItemStub.withArgs(BAR_WITH_EXTRA_KEY).returns(barWithExtraItem);
    getItemStub.withArgs(NONEXISTENT_KEY).returns(NONEXISTENT_VALUE);

    const addExtraStub = sinon.stub();

    addExtraStub.withArgs(FOO_KEY, FOO_EXTRA).returns(FOO_EXTRA);
    addExtraStub.withArgs(BAR_KEY, BAR_EXTRA).returns(BAR_EXTRA);
    addExtraStub.withArgs(FOO_WITH_EXTRA_KEY, FOO_EXTRA).returns(FOO_EXTRA);
    addExtraStub.withArgs(BAR_WITH_EXTRA_KEY, BAR_EXTRA).returns(BAR_EXTRA);
    addExtraStub.withArgs(NONEXISTENT_KEY).returns(undefined);

    const setExtraStub = sinon.stub();

    setExtraStub.withArgs(FOO_KEY, FOO_EXTRA).returns(FOO_EXTRA);
    setExtraStub.withArgs(BAR_KEY, BAR_EXTRA).returns(BAR_EXTRA);
    setExtraStub.withArgs(FOO_WITH_EXTRA_KEY, FOO_EXTRA).returns(FOO_EXTRA);
    setExtraStub.withArgs(BAR_WITH_EXTRA_KEY, BAR_EXTRA).returns(BAR_EXTRA);
    setExtraStub.withArgs(NONEXISTENT_KEY).returns(undefined);

    const getExtraStub = sinon.stub();

    getExtraStub.withArgs(FOO_KEY).returns(fooItem.extra);
    getExtraStub.withArgs(BAR_KEY).returns(barItem.extra);
    getExtraStub.withArgs(FOO_WITH_EXTRA_KEY).returns(fooWithExtraItem.extra);
    getExtraStub.withArgs(BAR_WITH_EXTRA_KEY).returns(barWithExtraItem.extra);
    getExtraStub.withArgs(NONEXISTENT_KEY).returns(undefined);

    const hasItemStub = sinon.stub();

    hasItemStub.withArgs(FOO_KEY).returns(true);
    hasItemStub.withArgs(BAR_KEY).returns(true);
    hasItemStub.withArgs(FOO_WITH_EXTRA_KEY).returns(true);
    hasItemStub.withArgs(BAR_WITH_EXTRA_KEY).returns(true);
    hasItemStub.withArgs(NONEXISTENT_KEY).returns(false);

    const removeItemStub = sinon.stub();

    removeItemStub.withArgs(FOO_KEY).returns(true);
    removeItemStub.withArgs(BAR_KEY).returns(true);
    removeItemStub.withArgs(FOO_WITH_EXTRA_KEY).returns(true);
    removeItemStub.withArgs(BAR_WITH_EXTRA_KEY).returns(true);
    removeItemStub.withArgs(NONEXISTENT_KEY).returns(false);

    return {
        addExtra: addExtraStub,
        buildKey: buildKeyStub,
        getExtra: getExtraStub,
        getItem: getItemStub,
        hasItem: hasItemStub,
        removeItem: removeItemStub,
        setExtra: setExtraStub,
        setItem: setItemStub
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
