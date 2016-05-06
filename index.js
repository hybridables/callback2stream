/*!
 * callback2stream <https://github.com/tunnckoCore/callback2stream>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var letta = require('letta')
var handle = require('handle-arguments')
var promise2stream = require('promise2stream')

module.exports = function callback2stream (fn, opts) {
  var self = this
  return function () {
    var argz = handle(arguments)
    var promise = letta.apply(this || self, [fn].concat(argz.args))
    return promise2stream(promise, opts)
  }
}
