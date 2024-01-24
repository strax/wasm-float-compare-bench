function decodeBase64(input) {
  return Uint8Array.from(atob(input), (c) => c.codePointAt(0)).buffer
}

const BYTES = decodeBase64(
  `AGFzbQEAAAABBwFgAnx8AX8DAgEABwsBB2NvbXBhcmUAAAovAS0BAn5BfyAAvSICQj+HQgGIIAKFIgIgAb0iA0I/h0IBiCADhSIDUiACIANTGws=`,
)

const module = new WebAssembly.Module(BYTES)
const instance = new WebAssembly.Instance(module)

export const compare = instance.exports.compare
