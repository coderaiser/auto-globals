'use strict';

const {defineProperty} = Object;

module.exports = (obj, names) => {
    const store = {};
    
    for (const name of names) {
        store[name] = obj[name];
    }
    
    return () => {
        for (const name of names) {
            defineProperty(obj, name, {
                value: store[name],
            });
        }
    };
};
