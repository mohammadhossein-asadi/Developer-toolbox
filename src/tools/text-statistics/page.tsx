import { useMemo } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton, ResetButton } from "@/components/shared/copy-button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToolState } from "@/lib/hooks/use-tool-state";

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

function fleschLabel(score: number): { label: string; color: string } {
  if (score >= 90) return { label: "Very easy (5th grade)", color: "text-green-400" };
  if (score >= 80) return { label: "Easy (6th grade)", color: "text-green-400" };
  if (score >= 70) return { label: "Fairly easy (7th grade)", color: "text-lime-400" };
  if (score >= 60) return { label: "Plain English (8-9th grade)", color: "text-yellow-400" };
  if (score >= 50) return { label: "Fairly difficult (10-12th grade)", color: "text-orange-400" };
  if (score >= 30) return { label: "Difficult (college)", color: "text-orange-400" };
  return { label: "Very difficult (graduate)", color: "text-red-400" };
}

function fmtTime(min: number): string {
  if (min < 1) return `${Math.max(1, Math.round(min * 60))}s`;
  const m = Math.floor(min);
  const s = Math.round((min - m) * 60);
  return s ? `${m}m ${s}s` : `${m}m`;
}

export default function TextStatisticsPage() {
  const [text, setText, reset] = useToolState("text-stats-input", "");
  const stats = useMemo(() => analyzeText(text), [text]);

  const metrics: Array<[string, string]> = [
    ["Words", stats.words.toLocaleString()],
    ["Characters", stats.characters.toLocaleString()],
    ["Characters (no spaces)", stats.charactersNoSpaces.toLocaleString()],
    ["Sentences", stats.sentences.toLocaleString()],
    ["Paragraphs", stats.paragraphs.toLocaleString()],
    ["Lines", stats.lines.toLocaleString()],
    ["Avg. word length", stats.avgWordLength.toFixed(1)],
    ["Avg. sentence length", stats.avgSentenceLength.toFixed(1)],
    ["Reading time", fmtTime(stats.readingTimeMin)],
    ["Speaking time", fmtTime(stats.speakingTimeMin)],
  ];

  const fleschInfo = stats.flesch !== null ? fleschLabel(stats.flesch) : null;

  return (
    <div>
      <ToolPageHeader name="Text Statistics" description="Word counts, readability scores, reading time, and keyword density" icon="FileText" slug="text-statistics" category="text" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Your text</span>
            <ResetButton onReset={() => { reset(); }} />
          </div>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-[420px] font-mono text-sm" placeholder="Paste or type your text here — stats update live..." />
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {metrics.map(([label, value]) => (
              <div key={label} className="rounded-lg border border-border bg-card p-3">
                <div className="text-xl font-bold text-primary">{value}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Flesch Reading Ease</span>
              {stats.flesch !== null && <Badge variant="secondary" className="font-mono">{stats.flesch.toFixed(1)}</Badge>}
            </div>
            {fleschInfo && stats.flesch !== null ? (
              <>
                <div className={`text-sm font-medium ${fleschInfo.color}`}>{fleschInfo.label}</div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden mt-2">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${Math.max(0, Math.min(100, stats.flesch))}%` }} />
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Enter text to compute readability</p>
            )}
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Top words</span>
              <CopyButton text={stats.topWords.map(([w, c]) => `${w}: ${c}`).join("\n")} />
            </div>
            {stats.topWords.length ? (
              <div className="space-y-1.5">
                {stats.topWords.map(([word, count]) => (
                  <div key={word} className="flex items-center gap-2">
                    <span className="text-xs font-mono w-28 truncate">{word}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary/70 rounded-full" style={{ width: `${(count / stats.topWords[0][1]) * 100}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-8 text-right">{count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No words yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
