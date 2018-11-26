'use strict';

const test = require('tape');
const {create} = require('..');


test('auto-globals: create: querySelector', (t) => {
    const el = create();
    el.querySelector('hello');
    
    t.ok(el.querySelector.calledWith('hello'), 'should call querySelector');
    t.end();
});

test('auto-globals: create: getAttributes', (t) => {
    const el = create();
    el.getAttributes.returns('hello');
    
    const result = el.getAttributes();
    
    t.equal(result, 'hello', 'should equal');
    t.end();
});

