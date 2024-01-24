(module
  (func $compare.i64 (param $a i64) (param $b i64) (result i32)
    (select
      (i32.const -1)
      (i64.ne
        (local.get $a)
        (local.get $b))
      (i64.lt_s
        (local.get $a)
        (local.get $b))))

  (func $compare.f64 (param $x f64) (param $y f64) (result i32)
    (local $a i64)
    (local $b i64)
    ;; a := (int64_t)a
    (local.set $a (i64.reinterpret_f64 (local.get $x)))
    ;; b := (int64_t)b
    (local.set $b (i64.reinterpret_f64 (local.get $y)))
    ;; a := (int64_t)(((uint64_t)(a >> 63)) >> 1)
    (local.set $a
      (i64.xor
        (local.get $a)
        (i64.shr_u
          (i64.shr_s (local.get $a) (i64.const 63))
          (i64.const 1))))
    ;; b := (int64_t)(((uint64_t)(b >> 63)) >> 1)
    (local.set $b
      (i64.xor
        (local.get $b)
        (i64.shr_u
          (i64.shr_s (local.get $b) (i64.const 63))
          (i64.const 1))))
    (call $compare.i64 (local.get $a) (local.get $b)))

  (export "compare" (func $compare.f64)))
