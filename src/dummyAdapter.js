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

    buildKeyStub.withArgs(FOO_KEY).resolves(FOO_KEY);
    buildKeyStub.withArgs(BAR_KEY).resolves(BAR_KEY);
    buildKeyStub.withArgs(FOO_WITH_EXTRA_KEY).resolves(FOO_WITH_EXTRA_KEY);
    buildKeyStub.withArgs(BAR_WITH_EXTRA_KEY).resolves(BAR_WITH_EXTRA_KEY);
    buildKeyStub.withArgs(NONEXISTENT_KEY).resolves(NONEXISTENT_KEY);

    const setItemStub = sinon.stub();

    setItemStub.withArgs(FOO_KEY, FOO_VALUE).resolves(fooItem);
    setItemStub.withArgs(BAR_KEY, BAR_VALUE).resolves(barItem);
    setItemStub.withArgs(FOO_WITH_EXTRA_KEY, FOO_VALUE, FOO_EXTRA).resolves(fooWithExtraItem);
    setItemStub.withArgs(BAR_WITH_EXTRA_KEY, BAR_VALUE, BAR_EXTRA).resolves(barWithExtraItem);

    const getItemStub = sinon.stub();

    getItemStub.withArgs(FOO_KEY).resolves(fooItem);
    getItemStub.withArgs(BAR_KEY).resolves(barItem);
    getItemStub.withArgs(FOO_WITH_EXTRA_KEY).resolves(fooWithExtraItem);
    getItemStub.withArgs(BAR_WITH_EXTRA_KEY).resolves(barWithExtraItem);
    getItemStub.withArgs(NONEXISTENT_KEY).resolves(NONEXISTENT_VALUE);

    const addExtraStub = sinon.stub();

    addExtraStub.withArgs(FOO_KEY, FOO_EXTRA).resolves(FOO_EXTRA);
    addExtraStub.withArgs(BAR_KEY, BAR_EXTRA).resolves(BAR_EXTRA);
    addExtraStub.withArgs(FOO_WITH_EXTRA_KEY, FOO_EXTRA).resolves(FOO_EXTRA);
    addExtraStub.withArgs(BAR_WITH_EXTRA_KEY, BAR_EXTRA).resolves(BAR_EXTRA);
    addExtraStub.withArgs(NONEXISTENT_KEY).resolves(undefined);

    const setExtraStub = sinon.stub();

    setExtraStub.withArgs(FOO_KEY, FOO_EXTRA).resolves(FOO_EXTRA);
    setExtraStub.withArgs(BAR_KEY, BAR_EXTRA).resolves(BAR_EXTRA);
    setExtraStub.withArgs(FOO_WITH_EXTRA_KEY, FOO_EXTRA).resolves(FOO_EXTRA);
    setExtraStub.withArgs(BAR_WITH_EXTRA_KEY, BAR_EXTRA).resolves(BAR_EXTRA);
    setExtraStub.withArgs(NONEXISTENT_KEY).resolves(undefined);

    const getExtraStub = sinon.stub();

    getExtraStub.withArgs(FOO_KEY).resolves(fooItem.extra);
    getExtraStub.withArgs(BAR_KEY).resolves(barItem.extra);
    getExtraStub.withArgs(FOO_WITH_EXTRA_KEY).resolves(fooWithExtraItem.extra);
    getExtraStub.withArgs(BAR_WITH_EXTRA_KEY).resolves(barWithExtraItem.extra);
    getExtraStub.withArgs(NONEXISTENT_KEY).resolves(undefined);

    const hasItemStub = sinon.stub();

    hasItemStub.withArgs(FOO_KEY).resolves(true);
    hasItemStub.withArgs(BAR_KEY).resolves(true);
    hasItemStub.withArgs(FOO_WITH_EXTRA_KEY).resolves(true);
    hasItemStub.withArgs(BAR_WITH_EXTRA_KEY).resolves(true);
    hasItemStub.withArgs(NONEXISTENT_KEY).resolves(false);

    const removeItemStub = sinon.stub();

    removeItemStub.withArgs(FOO_KEY).resolves(true);
    removeItemStub.withArgs(BAR_KEY).resolves(true);
    removeItemStub.withArgs(FOO_WITH_EXTRA_KEY).resolves(true);
    removeItemStub.withArgs(BAR_WITH_EXTRA_KEY).resolves(true);
    removeItemStub.withArgs(NONEXISTENT_KEY).resolves(false);

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
