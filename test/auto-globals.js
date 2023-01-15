'use strict';

const test = require('supertape');
const autoGlobals = require('..');

const noop = () => {};

test('auto-globals: addEventListener', (t) => {
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

test('auto-globals: navigator: serviceWorker: register', (t) => {
    const tape = (str, fn) => {
        fn(t);
    };
    
    const autoTest = autoGlobals(tape);
    const f = () => {
        global.navigator.serviceWorker.register();
    };
    
    let called = false;
    
    autoTest('hello', (t, {navigator}) => {
        f();
        
        called = navigator.serviceWorker.register.called;
    });
    
    t.ok(called, 'should call serviceWorker.register');
    t.end();
});

test('auto-globals: navigator: serviceWorker: unregister', (t) => {
    const tape = (str, fn) => {
        fn(t);
    };
    
    const autoTest = autoGlobals(tape);
    const f = () => {
        global.navigator.serviceWorker.unregister();
    };
    
    let called = false;
    
    autoTest('hello', (t, {navigator}) => {
        f();
        
        called = navigator.serviceWorker.unregister.called;
    });
    
    t.ok(called, 'should call serviceWorker.register');
    t.end();
});

test('auto-globals: location', (t) => {
    const tape = (str, fn) => {
        fn(t);
    };
    
    const autoTest = autoGlobals(tape);
    const f = () => {
        global.location.protocol = 'http:';
    };
    
    autoTest('hello', (t, {location}) => {
        f();
        
        t.equal(location.protocol, 'http:');
        t.end();
    });
});

test('auto-globals: fetch', (t) => {
    const tape = (str, fn) => {
        fn(t);
    };
    
    const autoTest = autoGlobals(tape);
    
    autoTest('hello', async (t, {fetch}) => {
        const res = await fetch('/hello');
        const text = await res.text();
        
        t.notOk(text, 'should get fetch text');
        t.end();
    });
});

