import { expect } from 'chai';

import { nonStringValues } from './valueSets';

export function testKey(action) {
    context('when key is not of string type', () => {
        it('should throw', () => {
            nonStringValues.forEach((key) => {
                expect(action.bind(null, key)).to.throw('`key` must be a string.');
            });
        });
    });
}
