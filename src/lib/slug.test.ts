import { describe, it, expect } from "vitest";
import { slugify } from "@/lib/slug";

describe("slugify", () => {
  it("converts basic text to kebab-case", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("strips special characters", () => {
    expect(slugify("10 Tips for Better REST API Design (2026 Edition)!")).toBe("10-tips-for-better-rest-api-design-2026-edition");
  });

  it("transliterates diacritics", () => {
    expect(slugify("Café Über naïve")).toBe("cafe-uber-naive");
  });

  it("handles German eszett and ligatures", () => {
    expect(slugify("Straße Æ Straße")).toBe("strasse-ae-strasse");
    expect(slugify("Größe Œuvre")).toBe("grosse-oeuvre");
  });

  it("supports underscore separator", () => {
    expect(slugify("Hello World", "_")).toBe("hello_world");
  });

  it("collapses consecutive separators", () => {
    expect(slugify("a --- b")).toBe("a-b");
  });

  it("trims leading/trailing separators", () => {
    expect(slugify("--hello world--")).toBe("hello-world");
  });
});
