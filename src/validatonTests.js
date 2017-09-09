import { expect } from 'chai';

import { invalidCharacters, nonStringValues } from './valueSets';

export function testKey(action) {
    context('when key is not of string type', () => {
        it('should throw', () => {
            nonStringValues.forEach((key) => {
                expect(action.bind(null, key)).to.throw('`key` must be a string.');
            });
        });
    });

    context('when key contains characters other than a-z, A-Z, 0-9, `-` and `_`', () => {
        it('should throw', () => {
            invalidCharacters.forEach((key) => {
                expect(action.bind(null, key)).to.throw('`key` can contain only letters, numbers, `_`, `.` or `-`.');
            });
        });
    });
}

export function testNamespace(action, options = {}) {
    context('when namespace is not of string type', () => {
        it('should throw', () => {
            nonStringValues.forEach((namespace) => {
                const mergedOptions = Object.assign({}, options, { namespace });

                expect(action.bind(null, mergedOptions)).to.throw('`namespace` must be a string.');
            });
        });
    });

    context('when namespace contains characters other than a-z, A-Z, 0-9, `-` and `_`', () => {
        it('should throw', () => {
            invalidCharacters.forEach((namespace) => {
                const mergedOptions = Object.assign({}, options, { namespace });

                expect(action.bind(null, mergedOptions)).to.throw(
                    '`namespace` can contain only letters, numbers, `_` or `-`.'
                );
            });
        });
    });
}
