"use client";
import { useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table } from "lucide-react";

const DEMO_DDL = `CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  published_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);`;

function parseDDL(ddl: string) {
  const tables: { name: string; columns: { name: string; type: string; nullable: boolean; pk: boolean; fk?: string }[] }[] = [];
  const tableRegex = /CREATE\s+TABLE\s+(\w+)\s*\(([\s\S]*?)\);/gi;
  let match;
  while ((match = tableRegex.exec(ddl)) !== null) {
    const name = match[1];
    const body = match[2];
    const columns = body.split(",").map((col) => {
      const trimmed = col.trim();
      const pk = /PRIMARY\s+KEY/i.test(trimmed);
      const fkMatch = trimmed.match(/FOREIGN\s+KEY.*?REFERENCES\s+(\w+)\((\w+)\)/i);
      const parts = trimmed.replace(/PRIMARY\s+KEY|AUTO_INCREMENT|DEFAULT\s+\S+|FOREIGN\s+KEY.*|REFERENCES\s+\S+\(\w+\)/gi, "").trim().split(/\s+/);
      return { name: parts[0] || "", type: parts.slice(1).join(" ") || "", nullable: !/NOT\s+NULL/i.test(trimmed) && !pk, pk, fk: fkMatch ? `${fkMatch[1]}.${fkMatch[2]}` : undefined };
    }).filter((c) => c.name && !/FOREIGN|REFERENCES/i.test(c.name));
    tables.push({ name, columns });
  }
  return tables;
}

function toMermaid(tables: ReturnType<typeof parseDDL>) {
  let er = "erDiagram\n";
  tables.forEach((t) => {
    er += `  ${t.name} {\n`;
    t.columns.forEach((c) => { er += `    ${c.type.replace(/\s+/g, "_")} ${c.name}${c.pk ? " PK" : ""}${c.fk ? " FK" : ""}\n`; });
    er += "  }\n";
  });
  tables.forEach((t) => { t.columns.filter((c) => c.fk).forEach((c) => { const [ref] = c.fk!.split("."); er += `  ${t.name} }|--|| ${ref} : "has"\n`; }); });
  return er;
}

export default function DdlParserPage() {
  const [input, setInput] = useState(DEMO_DDL);
  const [output, setOutput] = useState("");
  const [format, setFormat] = useState<"json" | "mermaid">("json");

  const parse = () => {
    const tables = parseDDL(input);
    if (format === "json") setOutput(JSON.stringify(tables, null, 2));
    else setOutput(toMermaid(tables));
  };

  const loadDemo = () => setInput(DEMO_DDL);

  return (
    <div>
      <ToolPageHeader name="Database DDL to JSON / Mermaid" description="Parse SQL CREATE TABLE to JSON Schema or visual Mermaid ER diagrams" icon="Table" slug="ddl-parser" category="code" copyText={output} />
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Tabs value={format} onValueChange={(v) => setFormat(v as typeof format)}><TabsList><TabsTrigger value="json">JSON</TabsTrigger><TabsTrigger value="mermaid">Mermaid ER</TabsTrigger></TabsList></Tabs>
          <Button variant="outline" size="sm" onClick={loadDemo}>Load Demo</Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2"><span className="text-sm font-medium">SQL DDL Input</span><Textarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[300px] font-mono text-xs" /></div>
          <div className="space-y-2"><div className="flex items-center justify-between"><span className="text-sm font-medium">Output</span>{output && <CopyButton text={output} />}</div><pre className="min-h-[300px] rounded-lg border border-border bg-muted/50 p-4 overflow-auto text-xs font-mono whitespace-pre-wrap">{output || "Click Parse..."}</pre></div>
        </div>
        <Button onClick={parse} className="w-full"><Table className="h-4 w-4" /> Parse DDL</Button>
      </div>
    </div>
  );
}
