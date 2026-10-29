export interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTimeMin: number;
  speakingTimeMin: number;
  flesch: number | null;
  avgWordLength: number;
  avgSentenceLength: number;
  topWords: Array<[string, number]>;
}

export function analyzeText(text: string): TextStats {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const sentences = trimmed ? trimmed.split(/[.!?]+(?:\s|$)/).filter((s) => s.trim()) : [];
  const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter((p) => p.trim()) : [];
  const syllablesPerWord = words.map((w) => {
    const lower = w.toLowerCase().replace(/[^a-z]/g, "");
    if (!lower) return 0;
    if (lower.length <= 3) return 1;
    const groups = lower
      .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
      .replace(/^y/, "")
      .match(/[aeiouy]{1,2}/g);
    return groups ? groups.length : 1;
  });
  const syllableTotal = syllablesPerWord.reduce((a, b) => a + b, 0);
  const wordCount = words.length;
  const sentenceCount = sentences.length;

  const flesch =
    wordCount > 0 && sentenceCount > 0
      ? 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (syllableTotal / wordCount)
      : null;

  const freq = new Map<string, number>();
  for (const w of words) {
    const k = w.toLowerCase().replace(/[^\p{L}\p{N}'-]/gu, "");
    if (!k || k.length < 3) continue;
    freq.set(k, (freq.get(k) ?? 0) + 1);
  }
  const topWords = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);

  return {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    words: wordCount,
    sentences: sentenceCount,
    paragraphs: paragraphs.length,
    lines: text ? text.split("\n").length : 0,
    readingTimeMin: wordCount / 225,
    speakingTimeMin: wordCount / 140,
    flesch,
    avgWordLength: wordCount ? words.join("").length / wordCount : 0,
    avgSentenceLength: sentenceCount ? wordCount / sentenceCount : 0,
    topWords,
  };
}
