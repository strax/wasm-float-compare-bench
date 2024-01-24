import { bench, run } from 'mitata'
import {compare as compare$wasm} from './compare-wasm.js'
import {compare as compare$js} from './compare-js.js'

bench("compare$wasm", () => compare$wasm(1, 2))
bench("compare$js", () => compare$js(1, 2))

run()
