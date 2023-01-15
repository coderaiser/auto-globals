# auto globals [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]: https://img.shields.io/npm/v/auto-globals.svg?style=flat&longCache=true
[BuildStatusIMGURL]: https://img.shields.io/travis/coderaiser/auto-globals/master.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/auto-globals "npm"
[BuildStatusURL]: https://travis-ci.org/coderaiser/auto-globals "Build Status"
[CoverageURL]: https://coveralls.io/github/coderaiser/auto-globals?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/auto-globals/badge.svg?branch=master&service=github

Add browser globals on every test, and remove when it is done.

## Install

```
npm i auto-globals
```

## Example

```js
const autoGlobals = require('auto-globals');
const tape = autoGlobals(require('tape'));

const fn = () => {
    document.body.addEventListener('click', console.log);
};

test('lib: arguments', (t, {document}) => {
    fn();
    
    t.ok(document.body.calledWith('click', console.log), 'should call addEventListener');
    t.end();
});
```

## Related

- [try-catch](https://github.com/coderaiser/try-catch "TryCatch") - functional try-catch wrapper.
- [try-to-catch](https://github.com/coderaiser/try-to-catch "TryToCatch") - functional try-catch wrapper for promises.
- [try-to-tape](https://github.com/coderaiser/try-to-tape "try-to-tape") - wrap `tape` `async` functions and show error on reject.

## License

MIT
