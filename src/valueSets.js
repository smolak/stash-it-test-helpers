const baseValues = [ 0, 1, -1, 1.23, -1.23, Infinity, -Infinity, true, false, null, undefined ];

const nonArrayValues = [ 'someString', {}, () => {}, function () {}, ...baseValues ];
const nonFunctionValues = [ 'someString', {}, [], ...baseValues ];
const nonObjectValues = [ 'someString', [], () => {}, function () {}, ...baseValues ];
const nonStringValues = [ {}, [], () => {}, function () {}, ...baseValues ];
const invalidCharacters = [
    // unwanted signs
    'azAZ123-_!@#$%^&*()',
    // emojis
    'azAZ123-_😈',
    // spaces
    'azAZ123-_     ',
    // other letters
    'azAZ123-_ęóąśłżźćńĘÓĄŚŁŻŹŃ'
];

export {
    invalidCharacters,
    nonArrayValues,
    nonFunctionValues,
    nonObjectValues,
    nonStringValues
};
