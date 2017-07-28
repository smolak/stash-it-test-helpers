import { createDummyAdapter as createDefaultDummyAdapter } from './dummyAdapter';

export default function createDummyCacheInstance(createDummyAdapter = createDefaultDummyAdapter, options = {}) {
    return createDummyAdapter(options);
}
