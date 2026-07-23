import { useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScanText } from "lucide-react";

const INVISIBLE_CHARS: Record<string, string> = {
  "\u200B": "Zero Width Space", "\u200C": "Zero Width Non-Joiner", "\u200D": "Zero Width Joiner",
  "\uFEFF": "BOM / Zero Width No-Break Space", "\u00AD": "Soft Hyphen", "\u2060": "Word Joiner",
  "\u2061": "Function Application", "\u2062": "Invisible Times", "\u2063": "Invisible Separator",
  "\u2064": "Invisible Plus", "\u180E": "Mongolian Vowel Separator", "\u034F": "Combining Grapheme Joiner",
  "\u2028": "Line Separator", "\u2029": "Paragraph Separator",
};

const HOMOGLYPHS: Record<string, string> = {
  "Ð°": "Cyrillic 'a' (U+0430)", "Ðµ": "Cyrillic 'e' (U+0435)", "Ð¾": "Cyrillic 'o' (U+043E)",
  "Ñ€": "Cyrillic 'r' (U+0440)", "Ñ": "Cyrillic 's' (U+0441)", "á´€": "Small Cap A (U+1D00)",
};

function inspect(text: string) {
  const chars = [...text];
  return chars.map((ch, i) => {
    const code = ch.codePointAt(0)!;
    const hex = code.toString(16).toUpperCase().padStart(4, "0");
    let status: "normal" | "invisible" | "homoglyph" | "suspicious" = "normal";
    let label = "";
    if (INVISIBLE_CHARS[ch]) { status = "invisible"; label = INVISIBLE_CHARS[ch]; }
    else if (HOMOGLYPHS[ch]) { status = "homoglyph"; label = HOMOGLYPHS[ch]; }
    else if (code > 0x7F && code < 0x100) { status = "suspicious"; label = "Latin Extended"; }
    else if (code >= 0x2000 && code <= 0x200F) { status = "invisible"; label = "Formatting char"; }
    return { char: ch, code, hex, name: `U+${hex}`, index: i, status, label };
  });
}

export default function UnicodeInspectorPage() {
  const [input, setInput] = useState("Hello World\u200Bwith\u200Cinvisible\u200Dchars");
  const [results, setResults] = useState<ReturnType<typeof inspect>>([]);

  const inspectText = () => setResults(inspect(input));
  const loadDemo = () => { setInput("Hello\u200BWorld\u200C\u200Dtest"); };

  const stats = { invisible: results.filter((r) => r.status === "invisible").length, homoglyph: results.filter((r) => r.status === "homoglyph").length, suspicious: results.filter((r) => r.status === "suspicious").length };

  return (
    <div>
      <ToolPageHeader name="HTML Entities / Unicode Inspector" description="Encode/decode entities, detect invisible/suspicious Unicode characters" icon="ScanText" slug="unicode-inspector" category="text" />
      <div className="space-y-4">
        <div className="flex gap-2"><Button variant="outline" size="sm" onClick={loadDemo}>Load Demo</Button></div>
        <div className="space-y-2"><span className="text-sm font-medium">Input Text</span><Textarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[100px] font-mono text-sm" /></div>
        <Button onClick={inspectText} className="w-full"><ScanText className="h-4 w-4" /> Inspect</Button>
        {results.length > 0 && (
          <>
            <div className="flex gap-2 text-xs">
              {stats.invisible > 0 && <Badge variant="destructive">{stats.invisible} invisible</Badge>}
              {stats.homoglyph > 0 && <Badge variant="destructive">{stats.homoglyph} homoglyphs</Badge>}
              {stats.suspicious > 0 && <Badge variant="secondary">{stats.suspicious} suspicious</Badge>}
              {stats.invisible + stats.homoglyph + stats.suspicious === 0 && <Badge variant="default">All clear - no issues found</Badge>}
            </div>
            <div className="rounded-lg border border-border bg-muted/50 divide-y divide-border max-h-[400px] overflow-auto">
              {results.map((r, i) => (
                <div key={i} className={`flex items-center gap-3 px-4 py-2 text-xs ${r.status === "invisible" ? "bg-red-500/10" : r.status === "homoglyph" ? "bg-orange-500/10" : r.status === "suspicious" ? "bg-yellow-500/10" : ""}`}>
                  <span className="font-mono w-24">{r.name}</span>
                  <span className="w-8 text-center text-lg">{r.char}</span>
                  <span className="text-muted-foreground flex-1">{r.label || "Normal character"}</span>
                  <span className="font-mono text-muted-foreground">#{r.index}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
