const CVT_BUFFER = new ArrayBuffer(8)
const CVT_BUFFER_DOUBLE = new Float64Array(CVT_BUFFER, 0, 1)
const CVT_BUFFER_INT64 = new BigInt64Array(CVT_BUFFER, 0, 1)

export function compare(x, y) {
  CVT_BUFFER_DOUBLE[0] = x
  let a = CVT_BUFFER_INT64[0]
  CVT_BUFFER_DOUBLE[0] = y
  let b = CVT_BUFFER_INT64[0]

  a ^= BigInt.asIntN(64, BigInt.asUintN(64, a >> 63n) >> 1n)
  b ^= BigInt.asIntN(64, BigInt.asUintN(64, b >> 63n) >> 1n)

  return (a < b) ? -1 : +(a !== b)
}
