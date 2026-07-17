"use client";
import { useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal } from "lucide-react";

const DEMO_CURL = `curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer token123" \\
  -d '{"name":"Alice","email":"alice@example.com","age":30}'`;

function parseCurl(curl: string) {
  const lines = curl.replace(/\\\n/g, " ").replace(/\\/g, " ");
  const urlMatch = lines.match(/curl\s+(?:-\w+\s+\S+\s+)*["']?(https?:\/\/[^\s"']+)/);
  const url = urlMatch?.[1] || "";
  const methodMatch = lines.match(/-X\s+(\w+)/);
  const method = methodMatch?.[1] || "GET";
  const headers: Record<string, string> = {};
  const headerRegex = /-H\s+["']([^"']+)["']/g;
  let m; while ((m = headerRegex.exec(lines)) !== null) { const [k, v] = m[1].split(": "); headers[k] = v; }
  const dataMatch = lines.match(/-d\s+["'](.+?)["']/);
  const body = dataMatch?.[1] || "";
  return { url, method, headers, body };
}

function toFetch(p: ReturnType<typeof parseCurl>) {
  const h = Object.entries(p.headers).map(([k, v]) => `  "${k}": "${v}"`).join(",\n");
  const opts = [`  method: "${p.method}"`, h ? `  headers: {\n${h}\n  }` : "", p.body ? `  body: JSON.stringify(${p.body})` : ""].filter(Boolean).join(",\n");
  return `fetch("${p.url}", {\n${opts}\n});`;
}

function toAxios(p: ReturnType<typeof parseCurl>) {
  const h = JSON.stringify(p.headers, null, 2);
  return `axios({\n  method: "${p.method.toLowerCase()}",\n  url: "${p.url}",\n  headers: ${h},${p.body ? `\n  data: ${p.body},` : ""}\n});`;
}

function toPython(p: ReturnType<typeof parseCurl>) {
  const h = Object.entries(p.headers).map(([k, v]) => `    "${k}": "${v}"`).join(",\n");
  return `import requests\n\nresponse = requests.${p.method.toLowerCase()}(\n    "${p.url}",${h ? `\n    headers={\n${h}\n    },` : ""}${p.body ? `\n    json=${p.body}` : ""}\n)\nprint(response.json())`;
}

function toGo(p: ReturnType<typeof parseCurl>) {
  const h = Object.entries(p.headers).map(([k, v]) => `req.Header.Set("${k}", "${v}")`).join("\n");
  return `package main\n\nimport (\n    "fmt"\n    "net/http"\n    "io"\n)\n\nfunc main() {\n    client := &http.Client{}\n    req, _ := http.NewRequest("${p.method}", "${p.url}", ${p.body ? `strings.NewReader(\`${p.body}\`)` : "nil"})\n    ${h}\n    resp, _ := client.Do(req)\n    defer resp.Body.Close()\n    body, _ := io.ReadAll(resp.Body)\n    fmt.Println(string(body))\n}`;
}

export default function CurlConverterPage() {
  const [curl, setCurl] = useState(DEMO_CURL);
  const [target, setTarget] = useState<"fetch" | "axios" | "python" | "go">("fetch");
  const [output, setOutput] = useState("");

  const convert = () => {
    const parsed = parseCurl(curl);
    switch (target) {
      case "fetch": setOutput(toFetch(parsed)); break;
      case "axios": setOutput(toAxios(parsed)); break;
      case "python": setOutput(toPython(parsed)); break;
      case "go": setOutput(toGo(parsed)); break;
    }
  };

  const loadDemo = () => setCurl(DEMO_CURL);

  return (
    <div>
      <ToolPageHeader name="Curl Command Converter" description="Parse curl to Fetch, Axios, Python Requests, or Go HTTP code" icon="Terminal" slug="curl-converter" category="code" copyText={output} />
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Tabs value={target} onValueChange={(v) => setTarget(v as typeof target)}>
            <TabsList><TabsTrigger value="fetch">Fetch</TabsTrigger><TabsTrigger value="axios">Axios</TabsTrigger><TabsTrigger value="python">Python</TabsTrigger><TabsTrigger value="go">Go</TabsTrigger></TabsList>
          </Tabs>
          <Button variant="outline" size="sm" onClick={loadDemo}>Load Demo</Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2"><span className="text-sm font-medium">curl Command</span><Textarea value={curl} onChange={(e) => setCurl(e.target.value)} className="min-h-[200px] font-mono text-xs" /></div>
          <div className="space-y-2"><div className="flex items-center justify-between"><span className="text-sm font-medium">Output ({target})</span>{output && <CopyButton text={output} />}</div><pre className="min-h-[200px] rounded-lg border border-border bg-muted/50 p-4 overflow-auto text-xs font-mono whitespace-pre-wrap">{output || "Click Convert..."}</pre></div>
        </div>
        <Button onClick={convert} className="w-full"><Terminal className="h-4 w-4" /> Convert</Button>
      </div>
    </div>
  );
}
