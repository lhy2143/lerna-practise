'use strict';

const esprima = require('esprima');
const os = require('os');

////////////////////////////////////////////////////
// Automatically calculates and returns End of Line,
// based on the input text.
function getEOL(text) {
    let idx = 0, unix = 0, windows = 0;
    while (idx < text.length) {
        idx = text.indexOf('\n', idx);
        if (idx == -1) {
            break;
        }
        if (idx > 0 && text[idx - 1] === '\r') {
            windows++;
        } else {
            unix++;
        }
        idx++;
    }
    if (unix === windows) {
        return os.EOL;
    }
    return unix > windows ? '\n' : '\r\n';
}

////////////////////////////////////////////////////////////////////
// Tokenizes JSON or JavaScript via Esprima, enumerates and returns
// all regular expressions as an array of absolute location indexes
// within the source: [{start, end}, {start, end},...]
function parseRegEx(code, tolerant) {
    const result = [];
    // NOTE: Even though we do not need the location details,
    // using option `loc` makes `tokenize` perform 40% faster.
    esprima.tokenize(code, { loc: true, range: true, tolerant: !!tolerant }, node => {
        if (node.type === 'RegularExpression') {
            result.push({
                start: node.range[0] + 1, // next after the opening `/`
                end: node.range[1] - 1 // previous to the closing `/`
            });
        }
    });
    return result;
}

///////////////////////////////////////////////////////////////////////
// Executes a linear search through an array of absolute regEx indexes,
// to find whether the passed index is inside one of the regEx entries.
function indexInRegEx(idx, regExData) {
    // regExData - the output provided by parseRegEx;
    let mid, low = 0, high = regExData.length - 1;
    while (low <= high) {
        mid = Math.round((low + high) / 2);
        const a = regExData[mid];
        if (idx >= a.start) {
            if (idx <= a.end) {
                return true;
            }
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return false;
}

////////////////////////////////////////////////
// Checks the text for being HTML, by verifying
// whether `<` is the first non-empty symbol.
function isHtml(text) {
    let s, idx = 0;
    do {
        s = text[idx];
        if (s !== ' ' && s !== '\t' && s !== '\r' && s !== '\n') {
            return s === '<';
        }
    } while (++idx < text.length);
}

////////////////////////////////////////////////
// Returns space symbol multiplied n times.
//
function getSpaces(n) {
    return ' '.repeat(n);
}

module.exports = {
    getEOL: getEOL,
    getSpaces: getSpaces,
    parseRegEx: parseRegEx,
    indexInRegEx: indexInRegEx,
    isHtml: isHtml
};
