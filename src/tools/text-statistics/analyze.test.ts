import { describe, it, expect } from "vitest";
import { analyzeText } from "@/lib/text-stats";

describe("analyzeText", () => {
  it("counts words, sentences, and paragraphs", () => {
    const stats = analyzeText("Hello world. This is a test!\n\nNew paragraph here.");
    expect(stats.words).toBe(9);
    expect(stats.sentences).toBe(3);
    expect(stats.paragraphs).toBe(2);
  });

  it("counts characters with and without spaces", () => {
    const stats = analyzeText("ab cd");
    expect(stats.characters).toBe(5);
    expect(stats.charactersNoSpaces).toBe(4);
  });

  it("handles empty text without crashing", () => {
    const stats = analyzeText("");
    expect(stats.words).toBe(0);
    expect(stats.sentences).toBe(0);
    expect(stats.flesch).toBeNull();
  });

  it("produces a high Flesch score for simple text", () => {
    const stats = analyzeText("I like cats. Cats are fun. We play all day.");
    expect(stats.flesch).not.toBeNull();
    expect(stats.flesch!).toBeGreaterThan(70);
  });

  it("extracts top words sorted by frequency", () => {
    const stats = analyzeText("apple banana apple cherry banana apple");
    expect(stats.topWords[0][0]).toBe("apple");
    expect(stats.topWords[0][1]).toBe(3);
    expect(stats.topWords[1][0]).toBe("banana");
  });

  it("ignores short words in top words", () => {
    const stats = analyzeText("to be or not to be the thing");
    const words = stats.topWords.map(([w]) => w);
    expect(words).not.toContain("to");
    expect(words).not.toContain("be");
  });

  it("computes positive reading time for non-empty text", () => {
    const stats = analyzeText("Some words to read here.");
    expect(stats.readingTimeMin).toBeGreaterThan(0);
  });
});
