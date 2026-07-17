"use client";
import { useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "lucide-react";

export default function UrlEncoderPage() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("https://example.com/path?key=hello world&name=John+Doe");
  const [output, setOutput] = useState("");

  const convert = () => { setOutput(mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input)); };
  const loadDemo = () => { setInput("https://example.com/path?key=hello world&arr[]=1&arr[]=2&name=John+Doe#section"); };

  const parseQuery = (url: string) => { try { const q = url.split("?")[1]?.split("#")[0]; if (!q) return []; return q.split("&").map((p) => { const [k, v] = p.split("="); return { key: decodeURIComponent(k || ""), value: decodeURIComponent(v || "") }; }); } catch { return []; } };

  return (
    <div>
      <ToolPageHeader name="URL Encoder / Decoder" description="Encode/decode URLs with query string table view" icon="Link" slug="url-encoder" category="conversion" copyText={output} />
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}><TabsList><TabsTrigger value="encode">Encode</TabsTrigger><TabsTrigger value="decode">Decode</TabsTrigger></TabsList></Tabs>
          <Button variant="outline" size="sm" onClick={loadDemo}>Load Demo</Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2"><span className="text-sm font-medium">Input</span><Textarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[200px] font-mono text-sm" /></div>
          <div className="space-y-2"><div className="flex items-center justify-between"><span className="text-sm font-medium">Output</span>{output && <CopyButton text={output} />}</div><pre className="min-h-[200px] rounded-lg border border-border bg-muted/50 p-4 overflow-auto text-sm font-mono whitespace-pre-wrap">{output || "Output..."}</pre></div>
        </div>
        <Button onClick={convert} className="w-full"><Link className="h-4 w-4" /> Convert</Button>
        {input.includes("?") && (
          <div className="space-y-2"><span className="text-sm font-medium">Query Parameters</span>
            <div className="rounded-lg border border-border bg-muted/50 divide-y divide-border">
              <div className="flex px-4 py-2 text-xs font-medium text-muted-foreground"><span className="w-1/3">Key</span><span className="w-2/3">Value</span></div>
              {parseQuery(input).map((p, i) => <div key={i} className="flex px-4 py-2 text-sm"><span className="w-1/3 font-mono text-primary">{p.key}</span><span className="w-2/3 font-mono">{p.value}</span></div>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
