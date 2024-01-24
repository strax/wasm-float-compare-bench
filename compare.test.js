import * as fc from 'fast-check'
import {test} from 'node:test'
import * as assert from 'node:assert/strict'

import {compare as compare$js} from './compare-js.js'
import {compare as compare$wasm} from './compare-wasm.js'

function testCompareFunction(compare) {
  fc.assert(
    fc.property(fc.float(), (x) => {
      return compare(x, x) === 0
    }),
  )

  fc.assert(
    fc.property(fc.float(), fc.float(), (x, y) => {
      fc.pre(x < y)
      return compare(x, y) === -1
    }),
  )

  fc.assert(
    fc.property(fc.float(), fc.float(), (x, y) => {
      fc.pre(x > y)
      return compare(x, y) === 1
    }),
  )

  assert.equal(compare(-0, +0), -1)
  assert.equal(compare(+0, -0), +1)

  fc.assert(
    fc.property(fc.float(), (x) => {
      fc.pre(!Number.isNaN(x))
      compare(x, NaN) === 1
    }),
  )
  fc.assert(
    fc.property(fc.float(), (x) => {
      fc.pre(!Number.isNaN(x))
      compare(NaN, x) === -1
    }),
  )
}

test("compare$js", () => {
  testCompareFunction(compare$js)
})

test("compare$wasm", () => {
  testCompareFunction(compare$wasm)
})
