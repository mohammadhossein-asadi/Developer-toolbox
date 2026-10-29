import { describe, it, expect } from "vitest";
import { base32Decode, generateTotp } from "./totp";

describe("base32Decode", () => {
  it("decodes RFC 4648 test vector 'foobar'", () => {
    // "foobar" -> "MZXW6YTBOI======"
    const bytes = base32Decode("MZXW6YTBOI======");
    expect(new TextDecoder().decode(bytes)).toBe("foobar");
  });

  it("decodes RFC 4648 test vector 'foo'", () => {
    const bytes = base32Decode("MZXW6===");
    expect(new TextDecoder().decode(bytes)).toBe("foo");
  });

  it("is case-insensitive and ignores separators and padding", () => {
    // "foob" encodes to MZXW6YQ=
    expect(new TextDecoder().decode(base32Decode("mzxw 6-yq"))).toBe("foob");
    // "fooba" encodes to MZXW6YTB
    expect(new TextDecoder().decode(base32Decode("MZXW6YTB"))).toBe("fooba");
  });

  it("decodes a full secret typed with spaces and lowercase", () => {
    const bytes = base32Decode("mzxw 6ytb oi======");
    expect(new TextDecoder().decode(bytes)).toBe("foobar");
  });

  it("rejects invalid characters", () => {
    expect(() => base32Decode("ABC1!")).toThrow(/Invalid/);
  });
});

describe("generateTotp", () => {
  // RFC 6238 test secret "12345678901234567890" in base32 is GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ
  const RFC_SECRET = "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ";

  it("matches RFC 6238 vector at T=59s (6 digits)", async () => {
    const code = await generateTotp(RFC_SECRET, 30, 6, 59_000);
    expect(code).toBe("94287082".slice(-6));
  });

  it("matches RFC 6238 vector at T=1111111109s (6 digits)", async () => {
    const code = await generateTotp(RFC_SECRET, 30, 6, 1111111109_000);
    expect(code).toBe("081804");
  });

  it("matches RFC 6238 vector at T=1234567890s (6 digits)", async () => {
    const code = await generateTotp(RFC_SECRET, 30, 6, 1234567890_000);
    expect(code).toBe("005924");
  });

  it("supports 8-digit codes (RFC vector at T=1111111111s)", async () => {
    const code = await generateTotp(RFC_SECRET, 30, 8, 1111111111_000);
    expect(code).toBe("14050471");
  });

  it("produces codes of the requested length", async () => {
    const code = await generateTotp("JBSWY3DPEHPK3PXP", 30, 6);
    expect(code).toMatch(/^\d{6}$/);
  });

  it("throws on empty secret", async () => {
    await expect(generateTotp("")).rejects.toThrow(/Empty/);
  });
});
