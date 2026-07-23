import { useState, useCallback } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileKey } from "lucide-react";

const DEMO_ENV = `# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp
DB_USER=admin
DB_PASSWORD="s3cr3t!p@ss"

# API Keys
API_KEY=sk-1234567890abcdef
DEBUG=true
MAX_RETRIES=3

# Multi-line value
WELCOME_MESSAGE="Hello World
This is line 2
And line 3"`;

export default function EnvConverterPage() {
  const [mode, setMode] = useState<"env2json" | "json2env">("env2json");
  const [input, setInput] = useState(DEMO_ENV);
  const [output, setOutput] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const envToJson = useCallback(() => {
    const errs: string[] = [];
    const result: Record<string, unknown> = {};
    const lines = input.split("\n");
    let multilineKey = "";
    let multilineVal = "";
    let inMultiline = false;

    lines.forEach((line, i) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      if (inMultiline) {
        if (trimmed.endsWith('"')) { multilineVal += "\n" + trimmed.slice(0, -1); result[multilineKey] = multilineVal; inMultiline = false; }
        else { multilineVal += "\n" + trimmed; }
        return;
      }
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) { errs.push(`Line ${i + 1}: Missing = sign`); return; }
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if (val.startsWith('"') && !val.endsWith('"')) { multilineKey = key; multilineVal = val.slice(1); inMultiline = true; return; }
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      if (val === "true") result[key] = true;
      else if (val === "false") result[key] = false;
      else if (!isNaN(Number(val)) && val !== "") result[key] = Number(val);
      else result[key] = val;
    });
    setOutput(JSON.stringify(result, null, 2));
    setErrors(errs);
  }, [input]);

  const jsonToEnv = useCallback(() => {
    try {
      const obj = JSON.parse(input);
      const lines = Object.entries(obj).map(([k, v]) => `${k}=${typeof v === "string" && (v.includes("\n") || v.includes(" ")) ? `"${v}"` : v}`);
      setOutput(lines.join("\n"));
      setErrors([]);
    } catch (e) { setErrors([(e as Error).message]); setOutput(""); }
  }, [input]);

  const convert = () => { mode === "env2json" ? envToJson() : jsonToEnv(); };
  const loadDemo = () => { setInput(DEMO_ENV); };

  return (
    <div>
      <ToolPageHeader name=".env â†” JSON Converter" description="Convert environment variables to nested JSON and back, flag syntax bugs" icon="FileKey" slug="env-converter" category="conversion" copyText={output} />
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}><TabsList><TabsTrigger value="env2json">.env â†’ JSON</TabsTrigger><TabsTrigger value="json2env">JSON â†’ .env</TabsTrigger></TabsList></Tabs>
          <Button variant="outline" size="sm" onClick={loadDemo}>Load Demo</Button>
        </div>
        {errors.length > 0 && <div className="text-sm text-destructive p-2 rounded-lg bg-destructive/10">{errors.join("\n")}</div>}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2"><span className="text-sm font-medium">Input</span><Textarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[300px] font-mono text-xs" /></div>
          <div className="space-y-2"><div className="flex items-center justify-between"><span className="text-sm font-medium">Output</span>{output && <CopyButton text={output} />}</div><pre className="min-h-[300px] rounded-lg border border-border bg-muted/50 p-4 overflow-auto text-xs font-mono whitespace-pre-wrap">{output || "Output..."}</pre></div>
        </div>
        <Button onClick={convert} className="w-full"><FileKey className="h-4 w-4" /> Convert</Button>
      </div>
    </div>
  );
}
