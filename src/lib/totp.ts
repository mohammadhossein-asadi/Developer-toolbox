const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export function base32Decode(input: string): Uint8Array {
  const clean = input.toUpperCase().replace(/[\s-]/g, "").replace(/=+$/, "");
  if (!clean) throw new Error("Empty secret");
  if (/[A-Z0-9]/.test(clean.replace(new RegExp(`^[${BASE32_ALPHABET}]*$`), ""))) {
    throw new Error("Invalid base32 characters");
  }
  let bits = 0;
  let value = 0;
  const output: number[] = [];
  for (const char of clean) {
    const idx = BASE32_ALPHABET.indexOf(char);
    if (idx === -1) throw new Error(`Invalid character: ${char}`);
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      output.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return new Uint8Array(output);
}

export async function generateTotp(secretBase32: string, timeStep = 30, digits = 6, timestamp = Date.now()): Promise<string> {
  const keyBytes = base32Decode(secretBase32);
  const counter = Math.floor(timestamp / 1000 / timeStep);
  const counterBuf = new ArrayBuffer(8);
  const counterView = new DataView(counterBuf);
  counterView.setUint32(0, Math.floor(counter / 0x100000000));
  counterView.setUint32(4, counter >>> 0);

  const key = await crypto.subtle.importKey("raw", keyBytes as unknown as ArrayBuffer, { name: "HMAC", hash: "SHA-1" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, counterBuf);
  const hmac = new Uint8Array(sig);

  const offset = hmac[hmac.length - 1] & 0x0f;
  const code =
    ((hmac[offset] & 0x7f) << 24) |
    (hmac[offset + 1] << 16) |
    (hmac[offset + 2] << 8) |
    hmac[offset + 3];

  return (code % 10 ** digits).toString().padStart(digits, "0");
}
