import { useState, useCallback } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeftRight } from "lucide-react";

const DEMO = '[{"name":"Alice","age":30,"city":"NYC"},{"name":"Bob","age":25,"city":"LA"}]';

export default function JsonCsvConverterPage() {
  const [mode, setMode] = useState<"json2csv" | "csv2json">("json2csv");
  const [input, setInput] = useState(DEMO);
  const [output, setOutput] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [error, setError] = useState("");

  const jsonToCsv = useCallback(() => {
    try {
      const data = JSON.parse(input);
      if (!Array.isArray(data) || !data.length) { setError("Input must be a non-empty JSON array"); return; }
      const headers = [...new Set(data.flatMap((obj) => Object.keys(obj)))];
      const rows = data.map((obj) => headers.map((h) => { const v = obj[h]; return typeof v === "string" && (v.includes(delimiter) || v.includes('"')) ? `"${v.replace(/"/g, '""')}"` : String(v ?? ""); }).join(delimiter));
      setOutput([headers.join(delimiter), ...rows].join("\n")); setError("");
    } catch (e) { setError((e as Error).message); setOutput(""); }
  }, [input, delimiter]);

  const csvToJson = useCallback(() => {
    try {
      const lines = input.trim().split("\n");
      if (lines.length < 2) { setError("CSV needs header + data rows"); return; }
      const headers = lines[0].split(delimiter);
      const result = lines.slice(1).map((line) => { const vals = line.split(delimiter); const obj: Record<string, string> = {}; headers.forEach((h, i) => { obj[h.trim()] = (vals[i] || "").trim(); }); return obj; });
      setOutput(JSON.stringify(result, null, 2)); setError("");
    } catch (e) { setError((e as Error).message); setOutput(""); }
  }, [input, delimiter]);

  return (
    <div>
      <ToolPageHeader name="JSON â†” CSV Converter" description="Convert between JSON arrays and CSV format" icon="ArrowLeftRight" slug="json-csv-converter" category="conversion" copyText={output} />
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
            <TabsList><TabsTrigger value="json2csv">JSON â†’ CSV</TabsTrigger><TabsTrigger value="csv2json">CSV â†’ JSON</TabsTrigger></TabsList>
          </Tabs>
          <Button variant="outline" size="sm" onClick={() => setInput(DEMO)}>Load Demo</Button>
          <div className="flex items-center gap-2 ml-auto"><Label className="text-xs">Delimiter:</Label><Input value={delimiter} onChange={(e) => setDelimiter(e.target.value)} className="w-16 h-8 text-xs font-mono" /></div>
        </div>
        {error && <div className="text-sm text-destructive p-2 rounded-lg bg-destructive/10 border border-destructive/50">{error}</div>}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2"><span className="text-sm font-medium">Input</span><Textarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[300px] font-mono text-sm" /></div>
          <div className="space-y-2"><div className="flex items-center justify-between"><span className="text-sm font-medium">Output</span>{output && <CopyButton text={output} />}</div><pre className="min-h-[300px] rounded-lg border border-border bg-muted/50 p-4 overflow-auto text-sm font-mono whitespace-pre-wrap">{output || "Output will appear here..."}</pre></div>
        </div>
        <Button onClick={() => mode === "json2csv" ? jsonToCsv() : csvToJson()} className="w-full"><ArrowLeftRight className="h-4 w-4" /> Convert</Button>
      </div>
    </div>
  );
}
