/*!
 * callback2stream <https://github.com/hybridables/callback2stream>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var fs = require('fs')
var test = require('mukla')
var callback2stream = require('./index')
var isBuffer = require('is-buffer')

test('should always return a function', function (done) {
  test.strictEqual(typeof callback2stream(), 'function')
  test.strictEqual(typeof callback2stream(123), 'function')
  test.strictEqual(typeof callback2stream('abc'), 'function')
  done()
})

test('should create stream from async function (fs.readFile)', function (done) {
  var readFile = callback2stream(fs.readFile)
  var stream = readFile('./package.json', 'utf8')
  stream
    .on('data', function (val) {
      test.strictEqual(typeof val, 'string')
      test.strictEqual(val, fs.readFileSync('./package.json', 'utf8'))
      test.ok(val.indexOf('"license":"MIT"'))
    })
    .once('error', done)
    .once('end', done)
})

test('should create stream with buffer contents', function (done) {
  var readBuffer = callback2stream(fs.readFile)
  var stream = readBuffer('./package.json')
  stream
    .on('data', function (val) {
      test.strictEqual(isBuffer(val), true)
      test.ok(val.toString('utf8').indexOf('"license":"MIT"'))
    })
    .once('error', done)
    .once('end', done)
})

test('should get fs.stat stream', function (done) {
  var statFile = callback2stream(fs.stat)
  statFile('./package.json')
    .on('data', function (val) {
      test.strictEqual(typeof val, 'object')
      test.ok(val.mtime)
      test.ok(val.size)
    })
    .once('error', done)
    .once('end', done)
})

test('should work for sync functions (fs.readFileSync)', function (done) {
  var createReadStream = callback2stream(fs.readFileSync)
  createReadStream('./package.json', 'utf8')
    .on('data', function (val) {
      test.strictEqual(typeof val, 'string')
      test.ok(val.indexOf('"license":"MIT"'))
    })
    .once('error', done)
    .once('end', done)
})

test('should work for natives like JSON.parse', function (done) {
  var JSONParseStream = callback2stream(JSON.parse)
  JSONParseStream('{"foo":"bar"}')
    .on('data', function (val) {
      test.strictEqual(typeof val, 'object')
      test.strictEqual(val.foo, 'bar')
    })
    .once('error', done)
    .once('end', done)
})

test('should work for natives like JSON.stringify', function (done) {
  var JSONStringify = callback2stream(JSON.stringify)
  JSONStringify({ a: 'b', c: 'd' })
    .on('data', function (val) {
      test.strictEqual(typeof val, 'string')
      test.strictEqual(val, '{"a":"b","c":"d"}')
    })
    .once('error', done)
    .once('end', done)
})

test('should work for JSON.stringify with identation', function (done) {
  var stringifyStream = callback2stream(JSON.stringify)
  stringifyStream({ bar: 'qux', xxx: 'yyy' }, null, 2)
    .on('data', function (val) {
      test.strictEqual(typeof val, 'string')
      test.strictEqual(val, '{\n  "bar": "qux",\n  "xxx": "yyy"\n}')
    })
    .once('error', done)
    .once('end', done)
})

test('should handle async errors correctly (fs.readFile ENOENT)', function (done) {
  var readFileError = callback2stream(fs.readFile)
  readFileError('not exist', 'utf8')
    .once('error', function (err) {
      test.ifError(!err)
      test.strictEqual(err instanceof Error, true)
      test.strictEqual(err.code, 'ENOENT')
      done()
    })
})

test('should handle sync errors correctly (fs.readFileSync ENOENT)', function (done) {
  var syncError = callback2stream(fs.readFileSync)
  syncError('not exist', 'utf8').once('error', function (err) {
    test.strictEqual(err instanceof Error, true)
    test.strictEqual(/no such file or directory, open/.test(err.message), true)
    done()
  })
})

test('should handle json parse error', function (done) {
  var parseStream = callback2stream(JSON.parse)
  parseStream('{foo: bar qux, invalid')
    .once('error', function (err) {
      test.ifError(!err)
      test.strictEqual(err instanceof Error, true)
      test.strictEqual(err.name, 'SyntaxError')
      test.strictEqual(err.message, 'Unexpected token f')
      done()
    })
})

test('should work for successful generator function', function (done) {
  var generatorStream = callback2stream(function * (a, b) {
    var val = yield [a + 111]
    return yield [val[0] + b]
  })
  generatorStream(444, 222)
    .on('data', function (val) {
      test.deepEqual(val, [777])
    })
    .once('error', done)
    .once('end', done)
})

test('should handle error from generator function', function (done) {
  var genStream = callback2stream(function * (foo) {
    throw new Error('msg ' + foo)
  })
  genStream('hi')
    .once('error', function (err) {
      test.ifError(!err)
      test.strictEqual(err.message, 'msg hi')
      done()
    })
})
