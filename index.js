/*!
 * callback2stream <https://github.com/hybridables/callback2stream>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var utils = require('./utils')

/**
 * > Create a stream from sync, async or generator function.
 *
 * **Example**
 *
 * ```js
 * var fs = require('fs')
 * var cb2stream = require('callback2stream')
 *
 * var readFileStream = cb2stream(fs.readFile)
 * var stream = readFileStream('package.json', 'utf8')
 * stream
 *   .on('data', function (val) {
 *     var json = JSON.parse(val)
 *     console.log(json.name) // => 'callback2stream'
 *   })
 *   .once('error', console.error)
 *   .once('end', function () {
 *     console.log('reading finished')
 *   })
 *
 * // you also have access to the
 * // contents with promise
 * stream.promise
 *   .then(JSON.parse, console.error)
 *   .then(function (val) {
 *     console.log(val.name) // => 'callback2stream'
 *   }, console.error)
 *   .catch(console.error)
 * ```
 *
 * @param  {Function} `fn` Any kind of function.
 * @param  {Object} `opts` Directly passed to [through2][] from [promise2stream][].
 * @return {Function} That when executed, returns transform stream,
 *                    coming from [promise2stream][], using [through2][].
 * @api public
 */

module.exports = function callback2stream (fn, opts) {
  var self = this
  return function () {
    var argz = utils.handle(arguments)
    var promise = utils.letta.apply(this || self, [fn].concat(argz.args))
    return utils.promise2stream(promise, opts)
  }
}
