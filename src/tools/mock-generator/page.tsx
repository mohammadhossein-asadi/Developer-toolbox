import { useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database } from "lucide-react";

const DEMO_SCHEMA = `[
  { "name": "firstName", "type": "string", "faker": "name" },
  { "name": "email", "type": "string", "faker": "email" },
  { "name": "age", "type": "number", "min": 18, "max": 65 },
  { "name": "active", "type": "boolean" },
  { "name": "role", "type": "enum", "values": ["admin", "user", "viewer"] }
]`;

function generateFake(schema: Array<Record<string, unknown>>, count: number) {
  const firstNames = ["Alice","Bob","Charlie","Diana","Eve","Frank","Grace","Hank"];
  const lastNames = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller"];
  const domains = ["example.com","test.org","demo.dev"];
  const gen = (field: Record<string, unknown>) => {
    const t = field.type;
    if (t === "string" && field.faker === "name") return firstNames[Math.floor(Math.random() * firstNames.length)];
    if (t === "string" && field.faker === "email") return `${firstNames[Math.floor(Math.random() * firstNames.length)].toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
    if (t === "string" && field.faker === "lastname") return lastNames[Math.floor(Math.random() * lastNames.length)];
    if (t === "number") return Math.floor(Math.random() * ((field.max as number) - (field.min as number) + 1) + (field.min as number));
    if (t === "boolean") return Math.random() > 0.5;
    if (t === "enum" && Array.isArray(field.values)) return field.values[Math.floor(Math.random() * field.values.length)];
    return "mock";
  };
  return Array.from({ length: count }, () => {
    const row: Record<string, unknown> = {};
    schema.forEach((f) => { row[f.name as string] = gen(f); });
    return row;
  });
}

function escapeSqlString(v: unknown): string {
  if (typeof v === "string") return `'${v.replace(/'/g, "''")}'`;
  if (v === null || v === undefined) return "NULL";
  if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
  return String(v);
}

export default function MockGeneratorPage() {
  const [schema, setSchema] = useState(DEMO_SCHEMA);
  const [count, setCount] = useState(10);
  const [format, setFormat] = useState<"json" | "csv" | "sql">("json");
  const [output, setOutput] = useState("");

  const generate = () => {
    const fields = JSON.parse(schema);
    const data = generateFake(fields, count);
    if (format === "json") setOutput(JSON.stringify(data, null, 2));
    else if (format === "csv") {
      const headers = fields.map((f: Record<string, unknown>) => f.name).join(",");
      const rows = data.map((row) => Object.values(row).join(",")).join("\n");
      setOutput(`${headers}\n${rows}`);
    } else {
      const tableName = "mock_data";
      const rows = data.map((row) => {
        const vals = Object.values(row).map(escapeSqlString).join(", ");
        return `INSERT INTO ${tableName} (${Object.keys(row).join(", ")}) VALUES (${vals});`;
      }).join("\n");
      setOutput(rows);
    }
  };

  const loadDemo = () => { setSchema(DEMO_SCHEMA); setCount(10); };

  return (
    <div>
      <ToolPageHeader name="Schema-Based Mock Generator" description="Generate SQL inserts, CSV, or nested JSON from custom schemas" icon="Database" slug="mock-generator" category="generator" copyText={output} />
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <Tabs value={format} onValueChange={(v) => setFormat(v as typeof format)}><TabsList><TabsTrigger value="json">JSON</TabsTrigger><TabsTrigger value="csv">CSV</TabsTrigger><TabsTrigger value="sql">SQL</TabsTrigger></TabsList></Tabs>
          <div className="flex items-center gap-2"><Label className="text-xs">Rows:</Label><Input type="number" min={1} max={1000} value={count} onChange={(e) => setCount(Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)))} className="w-20 h-8 text-xs" /></div>
          <Button variant="outline" size="sm" onClick={loadDemo}>Load Demo</Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2"><label htmlFor="mock-schema" className="text-sm font-medium">Schema (JSON Array)</label><Textarea id="mock-schema" value={schema} onChange={(e) => setSchema(e.target.value)} className="min-h-[250px] font-mono text-xs" /></div>
          <div className="space-y-2"><div className="flex items-center justify-between"><span className="text-sm font-medium">Generated Output</span>{output && <CopyButton text={output} />}</div><pre className="min-h-[250px] rounded-lg border border-border bg-muted/50 p-4 overflow-auto text-xs font-mono whitespace-pre-wrap">{output || "Click Generate..."}</pre></div>
        </div>
        <Button onClick={generate} className="w-full"><Database className="h-4 w-4" /> Generate {count} Rows</Button>
      </div>
    </div>
  );
}