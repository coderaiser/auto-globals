'use strict';

const test = require('supertape');
const saveProps = require('./save-props');

test('auto-globals: save-props', (t) => {
    const reset = saveProps(global, ['navigator']);
    
    reset();
    
    t.pass('should reset');
    t.end();
});
