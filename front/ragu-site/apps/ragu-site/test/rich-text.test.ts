import test from 'node:test';
import assert from 'node:assert/strict';
import {hasHtml, hasMarkup, hasMath, splitMath} from '../src/lib/rich-text.ts';

const maths = (text: string) =>
    splitMath(text)
        .filter((part) => part.kind === 'math')
        .map((part) => (part.kind === 'math' ? `${part.display ? 'D' : 'I'}:${part.value}` : ''));

test('plain prose needs no markup at all', () => {
    const prose = 'A staging category indicating that the tumor is larger than 8 cm, < 5% of cases.';
    assert.equal(hasMarkup(prose), false);
    assert.deepEqual(splitMath(prose), [{kind: 'text', value: prose}]);
});

test('every delimiter is recognised, display and inline', () => {
    assert.deepEqual(maths('Energy $$E = mc^2$$ here'), ['D:E = mc^2']);
    assert.deepEqual(maths('Energy \\[E = mc^2\\] here'), ['D:E = mc^2']);
    assert.deepEqual(maths('Energy \\(E = mc^2\\) here'), ['I:E = mc^2']);
    assert.deepEqual(maths('Energy $E = mc^2$ here'), ['I:E = mc^2']);
});

test('the prose around a formula survives intact', () => {
    assert.deepEqual(splitMath('a \\(x\\) b'), [
        {kind: 'text', value: 'a '},
        {kind: 'math', value: 'x', display: false},
        {kind: 'text', value: ' b'},
    ]);
});

test('money is not maths', () => {
    assert.equal(hasMath('It costs $5 to $10 a month.'), false);
    assert.equal(hasMath('between $ 5 and 10 $'), false);
    assert.equal(hasMath('priced at $20$30'), false);
});

test('an escaped dollar is a literal dollar', () => {
    assert.deepEqual(splitMath('costs \\$5 today'), [{kind: 'text', value: 'costs $5 today'}]);
});

test('a delimiter that never closes stays as text', () => {
    assert.equal(hasMath('opened \\( and never closed'), false);
    assert.equal(hasMath('opened $$ and never closed'), false);
    assert.equal(hasMath('an empty \\(\\) pair'), false);
});

test('inline maths does not run across a paragraph break', () => {
    assert.equal(hasMath('$a\n\nb$'), false);
});

test('only whitelisted tags count as HTML', () => {
    assert.equal(hasHtml('<table><tr><td>1</td></tr></table>'), true);
    assert.equal(hasHtml('H<sub>2</sub>O'), true);
    assert.equal(hasHtml('dose <5 mg and >2 mg'), false);
    assert.equal(hasHtml('<div>not a table</div>'), false);
});
