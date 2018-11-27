'use strict';

const test = require('tape');
const {create} = require('..');


test('auto-globals: create: querySelector', (t) => {
    const el = create();
    el.querySelector('hello');
    
    t.ok(el.querySelector.calledWith('hello'), 'should call querySelector');
    t.end();
});

test('auto-globals: create: getAttribute', (t) => {
    const el = create();
    el.getAttribute.returns('hello');
    
    const result = el.getAttribute();
    
    t.equal(result, 'hello', 'should equal');
    t.end();
});

test('auto-globals: create: focus', (t) => {
    const el = create();
    
    el.focus();
    
    t.ok(el.focus.called, 'hello', 'should equal');
    t.end();
});

