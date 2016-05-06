# [callback2stream][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] [![npm downloads][downloads-img]][downloads-url] 

> Transform sync, async or generator function to Stream. Correctly handle errors and optional arguments.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

## Install
```
npm i callback2stream --save
```

## Usage
> For more use-cases see the [tests](./test.js)

```js
const callback2stream = require('callback2stream')
```

### [callback2stream](index.js#L51)
> Create a stream from sync, async or generator function.

**Params**

* `fn` **{Function}**: Any kind of function.    
* `opts` **{Object}**: Directly passed to [through2][] from [promise2stream][].    
* `returns` **{Stream}**: Transform stream, coming from [promise2stream][], using [through2][].  

**Example**

```js
var fs = require('fs')
var cb2stream = require('callback2stream')

var readFileStream = cb2stream(fs.readFile)
var stream = readFileStream('package.json', 'utf8')
stream
  .on('data', function (val) {
    var json = JSON.parse(val)
    console.log(json.name) // => 'callback2stream'
  })
  .once('error', console.error)
  .once('end', function () {
    console.log('reading finished')
  })

// you also have access to the
// contents with promise
stream.promise
  .then(JSON.parse, console.error)
  .then(function (val) {
    console.log(val.name) // => 'callback2stream'
  }, console.error)
  .catch(console.error)
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/hybridables/callback2stream/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[promise2stream]: https://github.com/hybridables/promise2stream
[through2]: https://github.com/rvagg/through2

[npmjs-url]: https://www.npmjs.com/package/callback2stream
[npmjs-img]: https://img.shields.io/npm/v/callback2stream.svg?label=callback2stream

[license-url]: https://github.com/hybridables/callback2stream/blob/master/LICENSE
[license-img]: https://img.shields.io/npm/l/callback2stream.svg

[downloads-url]: https://www.npmjs.com/package/callback2stream
[downloads-img]: https://img.shields.io/npm/dm/callback2stream.svg

[codeclimate-url]: https://codeclimate.com/github/hybridables/callback2stream
[codeclimate-img]: https://img.shields.io/codeclimate/github/hybridables/callback2stream.svg

[travis-url]: https://travis-ci.org/hybridables/callback2stream
[travis-img]: https://img.shields.io/travis/hybridables/callback2stream/master.svg

[coveralls-url]: https://coveralls.io/r/hybridables/callback2stream
[coveralls-img]: https://img.shields.io/coveralls/hybridables/callback2stream.svg

[david-url]: https://david-dm.org/hybridables/callback2stream
[david-img]: https://img.shields.io/david/hybridables/callback2stream.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg