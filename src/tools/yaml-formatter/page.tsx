import { useState, useCallback } from "react";
import yaml from "js-yaml";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton, ResetButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { useToolState } from "@/lib/hooks/use-tool-state";

const DEMO = `name: developer-toolbox
version: 2.0.0
services:
  api:
    image: node:20
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
  worker:
    image: node:20
    command: npm run worker
features:
  - offline-first
  - client-side only`;

export default function YamlFormatterPage() {
  const [input, setInput, reset] = useToolState("yaml-input", DEMO);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"yaml-to-json" | "json-to-yaml">("yaml-to-json");
  const [indent, setIndent] = useState(2);

  const convert = useCallback(() => {
    try {
      if (mode === "yaml-to-json") {
        const doc = yaml.load(input);
        setOutput(JSON.stringify(doc, null, indent));
      } else {
        const doc = JSON.parse(input);
        setOutput(yaml.dump(doc, { indent, lineWidth: -1 }));
      }
      setError("");
    } catch (e: unknown) {
      setError((e as Error).message);
      setOutput("");
    }
  }, [input, mode, indent]);

  const isValid = (() => {
    try {
      if (mode === "yaml-to-json") yaml.load(input);
      else JSON.parse(input);
      return true;
    } catch {
      return false;
    }
  })();

  return (
    <div>
      <ToolPageHeader name="YAML Formatter" description="Format, validate, and convert YAML to JSON and back" icon="FileText" slug="yaml-formatter" category="code" copyText={output} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex gap-1">
              <Button size="sm" variant={mode === "yaml-to-json" ? "default" : "outline"} onClick={() => setMode("yaml-to-json")}>YAML → JSON</Button>
              <Button size="sm" variant={mode === "json-to-yaml" ? "default" : "outline"} onClick={() => setMode("json-to-yaml")}>JSON → YAML</Button>
            </div>
            <div className="flex items-center gap-1 ml-auto">
              <span className="text-xs text-muted-foreground">Indent:</span>
              {[2, 4].map((n) => <Button key={n} size="sm" variant={indent === n ? "default" : "ghost"} className="h-7 px-2 text-xs" onClick={() => setIndent(n)}>{n}</Button>)}
              <ResetButton onReset={() => { reset(); setOutput(""); setError(""); }} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Input</span>
            {input && <Badge variant={isValid ? "default" : "destructive"}>{isValid ? "Valid" : "Invalid"}</Badge>}
            <div className="ml-auto"><CopyButton text={input} /></div>
          </div>
          <Textarea placeholder="Paste YAML or JSON..." value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[400px] font-mono text-sm" />
          <Button onClick={convert} size="sm">Convert</Button>
        </div>
        <div className="space-y-3">
          <span className="text-sm font-medium">Output</span>
          {error ? (
            <div className="min-h-[400px] rounded-lg border border-destructive/50 bg-destructive/10 p-4 flex items-start gap-2"><AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" /><span className="text-sm text-destructive font-mono">{error}</span></div>
          ) : (
            <div className="relative">
              <pre className="min-h-[400px] rounded-lg border border-border bg-muted/50 p-4 overflow-auto text-sm font-mono whitespace-pre-wrap">{output || <span className="text-muted-foreground">Output will appear here...</span>}</pre>
              {output && <CopyButton text={output} className="absolute top-2 right-2" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
