'use strict';

const stub = require('@cloudcmd/stub');
const currify = require('currify');

const saveProps = require('./save-props');

const unsetGlobals = saveProps(global, [
    'document',
    'location',
    'FormData',
    'URLSearchParams',
    'fetch',
    'navigator',
]);

function create() {
    return {
        addEventListener: stub(),
        appendChild: stub(),
        classList: {
            contains: stub(),
        },
        dataset: {},
        focus: stub(),
        getAttribute: stub(),
        removeChild: stub(),
        removeEventListener: stub(),
        select: stub(),
        setAttribute: stub(),
        querySelector: stub(),
        setSelectionRange: stub(),
        style: {},
    };
}

function setGlobals() {
    const document = getDocument();
    const fetch = getFetch();
    const FormData = getFormData();
    const URLSearchParams = getURLSearchParams();
    const navigator = getNavigator();
    const location = {};
    
    Object.assign(global, {
        document,
        fetch,
        location,
        FormData,
        URLSearchParams,
        navigator,
    });
    
    return {
        document,
        fetch,
        location,
        FormData,
        URLSearchParams,
        navigator,
    };
}

function getDocument() {
    const body = {
        ...create(),
    };
    
    return {
        body,
        activeElement: create(),
        createElement: stub(create),
        querySelector: stub(),
        execCommand: stub(),
    };
}

function getFormData() {
    const entries = stub()
        .returns([]);
    
    const FormData = stub()
        .returns({
            entries,
        });
    
    const constructor = stub((...args) => {
        return FormData(...args);
    });
    
    return constructor;
}

function getFetch() {
    return stub(async () => {
        return {
            text: stub(),
        };
    });
}

function getURLSearchParams() {
    const append = stub();
    
    return stub()
        .returns({
            append,
        });
}

function getNavigator() {
    const readText = stub();
    const writeText = stub();
    
    const serviceWorker = {
        register: stub(),
        unregister: stub(),
    };
    
    return {
        clipboard: {
            readText,
            writeText,
        },
        serviceWorker,
    };
}

const autoGlobals = currify(async (f, t) => {
    await f(t, setGlobals());
    unsetGlobals();
});

const set = currify((wrapper, tape, str, promise) => {
    return tape(str, wrapper(promise));
});

function tapify(tape, f) {
    const fn = set(f, tape);
    fn.only = set(f, tape.only);
    
    return fn;
}

module.exports = (tape) => {
    return tapify(tape, autoGlobals);
};

module.exports.create = create;

