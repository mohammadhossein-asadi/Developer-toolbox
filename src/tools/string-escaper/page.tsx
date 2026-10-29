import { useState, useCallback } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton, ResetButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToolState } from "@/lib/hooks/use-tool-state";

type Mode = "json" | "html" | "url" | "regex" | "sql";

const MODES: Array<{ id: Mode; label: string }> = [
  { id: "json", label: "JSON" },
  { id: "html", label: "HTML" },
  { id: "url", label: "URL" },
  { id: "regex", label: "Regex" },
  { id: "sql", label: "SQL" },
];

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const unescapeHtml = (s: string) =>
  s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const unescapeRegex = (s: string) => s.replace(/\\([.*+?^${}()|[\]\\])/g, "$1");

const escapeJson = (s: string) => JSON.stringify(s).slice(1, -1);
const unescapeJson = (s: string) => {
  try { return JSON.parse(`"${s}"`) as string; } catch { return s; }
};

const escapeSql = (s: string) => s.replace(/'/g, "''");
const unescapeSql = (s: string) => s.replace(/''/g, "'");

export default function StringEscaperPage() {
  const [input, setInput, reset] = useToolState("escaper-input", `He said "fast & reliable" — 100% <div>ready</div>!`);
  const [mode, setMode] = useState<Mode>("html");
  const [direction, setDirection] = useState<"escape" | "unescape">("escape");
  const [output, setOutput] = useState("");

  const run = useCallback(() => {
    const pairs: Record<Mode, [(s: string) => string, (s: string) => string]> = {
      json: [escapeJson, unescapeJson],
      html: [escapeHtml, unescapeHtml],
      url: [(s) => encodeURIComponent(s), (s) => { try { return decodeURIComponent(s); } catch { return s; } }],
      regex: [escapeRegex, unescapeRegex],
      sql: [escapeSql, unescapeSql],
    };
    const [esc, unesc] = pairs[mode];
    setOutput(direction === "escape" ? esc(input) : unesc(input));
  }, [input, mode, direction]);

  return (
    <div>
      <ToolPageHeader name="String Escaper" description="Escape and unescape strings for JSON, HTML, URLs, regex, and SQL" icon="ScanText" slug="string-escaper" category="text" copyText={output} />
      <div className="max-w-4xl space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {MODES.map((m) => (
            <Button key={m.id} size="sm" variant={mode === m.id ? "default" : "outline"} onClick={() => setMode(m.id)}>{m.label}</Button>
          ))}
          <div className="flex gap-1 ml-auto">
            <Button size="sm" variant={direction === "escape" ? "secondary" : "ghost"} onClick={() => setDirection("escape")}>Escape</Button>
            <Button size="sm" variant={direction === "unescape" ? "secondary" : "ghost"} onClick={() => setDirection("unescape")}>Unescape</Button>
          </div>
          <ResetButton onReset={() => { reset(); setOutput(""); }} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Input</span>
            <CopyButton text={input} />
          </div>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[120px] font-mono text-sm" />
        </div>

        <Button onClick={run} size="sm">{direction === "escape" ? "Escape" : "Unescape"}</Button>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Output</span>
            <CopyButton text={output} />
          </div>
          <pre className="min-h-[120px] rounded-lg border border-border bg-muted/50 p-4 overflow-auto text-sm font-mono whitespace-pre-wrap">{output || <span className="text-muted-foreground">Output will appear here...</span>}</pre>
        </div>
      </div>
    </div>
  );
}
