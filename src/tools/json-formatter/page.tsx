"use client";
import { useState, useCallback } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Braces, Minimize2, AlertCircle } from "lucide-react";

const DEMO = '{\n  "name": "John Doe",\n  "age": 30,\n  "email": "john@example.com",\n  "address": {\n    "street": "123 Main St",\n    "city": "Springfield"\n  },\n  "hobbies": ["reading", "coding", "hiking"],\n  "isActive": true,\n  "metadata": null\n}';

export default function JsonFormatterPage() {
  const [input, setInput] = useState(DEMO);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"text" | "tree">("text");

  const format = useCallback(() => { try { setOutput(JSON.stringify(JSON.parse(input), null, indent)); setError(""); } catch (e: unknown) { setError((e as Error).message); setOutput(""); } }, [input, indent]);
  const minify = useCallback(() => { try { setOutput(JSON.stringify(JSON.parse(input))); setError(""); } catch (e: unknown) { setError((e as Error).message); } }, [input]);
  const loadDemo = () => { setInput(DEMO); };

  const isValid = input ? (() => { try { JSON.parse(input); return true; } catch { return false; } })() : false;

  const renderTree = (obj: unknown, path = "", depth = 0): React.ReactNode => {
    if (obj === null) return <span className="text-yellow-400">null</span>;
    if (typeof obj === "boolean") return <span className="text-blue-400">{String(obj)}</span>;
    if (typeof obj === "number") return <span className="text-green-400">{obj}</span>;
    if (typeof obj === "string") {
      const hl = searchQuery && obj.toLowerCase().includes(searchQuery.toLowerCase());
      return <span className={`text-orange-400 ${hl ? "bg-yellow-500/30 rounded px-0.5" : ""}`}>"{obj}"</span>;
    }
    if (Array.isArray(obj)) {
      if (!obj.length) return <span className="text-muted-foreground">[]</span>;
      return <div style={{ paddingLeft: depth * 16 }}>{obj.map((item, i) => <div key={`${path}-${i}`} className="flex gap-2"><span className="text-muted-foreground text-xs">{i}</span><span>:</span>{renderTree(item, `${path}.${i}`, depth + 1)}</div>)}</div>;
    }
    if (typeof obj === "object") {
      const entries = Object.entries(obj as Record<string, unknown>);
      if (!entries.length) return <span className="text-muted-foreground">{"{}"}</span>;
      return <div style={{ paddingLeft: depth * 16 }}>{entries.map(([key, val]) => {
        const hl = searchQuery && key.toLowerCase().includes(searchQuery.toLowerCase());
        return <div key={`${path}-${key}`} className="flex gap-2"><span className={`text-primary font-medium ${hl ? "bg-yellow-500/30 rounded px-0.5" : ""}`}>{key}</span><span>:</span>{renderTree(val, `${path}.${key}`, depth + 1)}</div>;
      })}</div>;
    }
    return <span>{String(obj)}</span>;
  };

  return (
    <div>
      <ToolPageHeader name="JSON Formatter & Validator" description="Format, minify, validate, and explore JSON data" icon="Braces" slug="json-formatter" category="code" copyText={output} />
      <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={loadDemo}>Load Demo</Button></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2"><span className="text-sm font-medium">Input</span>{input && <Badge variant={isValid ? "default" : "destructive"}>{isValid ? "Valid" : "Invalid"}</Badge>}</div>
          <Textarea placeholder='{"paste": "your JSON here"}' value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[400px] font-mono text-sm" />
          <div className="flex flex-wrap gap-2">
            <Button onClick={format} size="sm"><Braces className="h-4 w-4" /> Format</Button>
            <Button onClick={minify} size="sm" variant="outline"><Minimize2 className="h-4 w-4" /> Minify</Button>
            <div className="flex items-center gap-1 ml-auto">
              <span className="text-xs text-muted-foreground">Indent:</span>
              {[2, 4, 8].map((n) => <Button key={n} size="sm" variant={indent === n ? "default" : "ghost"} className="h-7 px-2 text-xs" onClick={() => setIndent(n)}>{n}</Button>)}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Output</span>
            <Tabs value={view} onValueChange={(v) => setView(v as "text" | "tree")}><TabsList className="h-7"><TabsTrigger value="text" className="text-xs px-2 h-5">Text</TabsTrigger><TabsTrigger value="tree" className="text-xs px-2 h-5">Tree</TabsTrigger></TabsList></Tabs>
            <div className="ml-auto"><Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-7 w-32 text-xs" /></div>
          </div>
          {error ? (
            <div className="min-h-[400px] rounded-lg border border-destructive/50 bg-destructive/10 p-4 flex items-start gap-2"><AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" /><span className="text-sm text-destructive font-mono">{error}</span></div>
          ) : view === "text" ? (
            <div className="relative"><pre className="min-h-[400px] rounded-lg border border-border bg-muted/50 p-4 overflow-auto text-sm font-mono whitespace-pre-wrap">{output || <span className="text-muted-foreground">Output will appear here...</span>}</pre>{output && <CopyButton text={output} className="absolute top-2 right-2" />}</div>
          ) : (
            <div className="min-h-[400px] rounded-lg border border-border bg-muted/50 p-4 overflow-auto text-sm font-mono">{(() => { try { return renderTree(JSON.parse(input)); } catch { return <span className="text-muted-foreground">Enter valid JSON to see tree view</span>; } })()}</div>
          )}
        </div>
      </div>
    </div>
  );
}
