import { describe, it, expect } from "vitest";
import { formatBytes, cn } from "./utils";

describe("formatBytes", () => {
  it("formats 0 as 0 B", () => {
    expect(formatBytes(0)).toBe("0 B");
  });

  it("formats bytes", () => {
    expect(formatBytes(500)).toBe("500 B");
  });

  it("formats kilobytes", () => {
    expect(formatBytes(1024)).toBe("1 KB");
  });

  it("formats megabytes with decimals", () => {
    expect(formatBytes(1024 * 1024 * 1.5)).toBe("1.5 MB");
  });

  it("formats gigabytes", () => {
    expect(formatBytes(1024 ** 3)).toBe("1 GB");
  });
});

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("handles conditional classes", () => {
    expect(cn("a", false && "b", "c")).toBe("a c");
  });

  it("merges tailwind conflicts with last-wins", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});
