#!/bin/sh
set -eo pipefail

wasm-as compare.wat -o - | wasm-opt -O3 -o - | base64
