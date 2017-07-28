import { expect } from 'chai';

import { invalidCharacters, nonStringValues } from './valueSets';

function createOptions(options) {
    return Object.assign({}, { namespace: 'namespace' }, options);
}

export function testKey(action) {
    context('when key is not of string type', () => {
        it('should throw', () => {
            nonStringValues.forEach(key => {
                expect(action.bind(null, key)).to.throw('`key` must be a string.');
            });
        });
    });

    context('when key contains characters other than a-z, A-Z, 0-9, `-` and `_`', () => {
        it('should throw', () => {
            invalidCharacters.forEach(key => {
                expect(action.bind(null, key)).to.throw('`key` can contain only letters, numbers, `_`, `.` or `-`.');
            });
        });
    });
}

export function testNamespace(action) {
    context('when namespace is not of string type', () => {
        it('should throw', () => {
            nonStringValues.forEach(namespace => {
                expect(action.bind(null, createOptions({ namespace }))).to.throw('`namespace` must be a string.');
            });
        });
    });

    context('when namespace contains characters other than a-z, A-Z, 0-9, `-` and `_`', () => {
        it('should throw', () => {
            invalidCharacters.forEach(namespace => {
                expect(action.bind(null, createOptions({ namespace }))).to.throw(
                    '`namespace` can contain only letters, numbers, `_` or `-`.'
                );
            });
        });
    });
}
