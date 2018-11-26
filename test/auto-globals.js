'use strict';

const test = require('tape');
const autoGlobals = require('..');

const noop = () => {};

test('auto-globals', (t) => {
    const tape = (str, fn) => {
        fn(t);
    };
    
    const autoTest = autoGlobals(tape);
    const f = () => global.document.body.addEventListener('click', noop);
    
    let called = false;
    
    autoTest('hello', (t, {document}) => {
        f();
        
        const {body} = document;
        called = body.addEventListener.calledWith('click', noop);
    });
    
    t.ok(called, 'should call addEventListener');
    t.end();
});

test('auto-globals: document: activeElement', (t) => {
    const tape = (str, fn) => {
        fn(t);
    };
    
    const autoTest = autoGlobals(tape);
    const f = () => global.document.activeElement.addEventListener('click', noop);
    
    let called = false;
    
    autoTest('hello', (t, {document}) => {
        f();
        
        const {activeElement} = document;
        called = activeElement.addEventListener.calledWith('click', noop);
    });
    
    t.ok(called, 'should call addEventListener');
    t.end();
});

test('auto-globals: FormData', (t) => {
    const tape = (str, fn) => {
        fn(t);
    };
    
    const autoTest = autoGlobals(tape);
    const f = () => {
        new global.FormData('hello');
    };
    
    let called = false;
    
    autoTest('hello', (t, {FormData}) => {
        f();
        
        called = FormData.calledWithNew();
    });
    
    t.ok(called, 'should call FormData');
    t.end();
});

