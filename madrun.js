'use strict';

const {run} = require('madrun');

module.exports = {
    "test": () => 'tape \'test/*.js\'',
    "watch:test": () => 'nodemon -w lib -w test -x "npm test"',
    "lint": () => 'eslint lib test',
    "fix:lint": () => run('lint', '--fix'),
    "coverage": () => 'nyc npm test',
    "report": () => 'nyc report --reporter=text-lcov | coveralls'
};

