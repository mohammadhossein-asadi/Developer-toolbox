import { useState, useMemo } from "react";
import { JSONPath } from "jsonpath-plus";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton, ResetButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Play } from "lucide-react";
import { useToolState } from "@/lib/hooks/use-tool-state";

const DEMO_JSON = `{
  "store": {
    "book": [
      { "title": "Sayings of the Century", "price": 8.95 },
      { "title": "Moby Dick", "price": 12.99, "isbn": "0-553-21311-3" },
      { "title": "The Lord of the Rings", "price": 22.99, "isbn": "0-395-19395-8" }
    ],
    "bicycle": { "color": "red", "price": 19.95 }
  }
}`;

const EXAMPLES = ["$.store.book[*].title", "$..isbn", "$.store.book[?(@.price < 10)]", "$.store..price", "$..book.length"];

export default function JsonPathQueryPage() {
  const [json, setJson, resetJson] = useToolState("jsonpath-json", DEMO_JSON);
  const [path, setPath] = useState("$.store.book[*].title");
  const [result, setResult] = useState("");
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState("");

  const jsonValid = useMemo(() => {
    try { JSON.parse(json); return true; } catch { return false; }
  }, [json]);

  const run = () => {
    try {
      const data = JSON.parse(json);
      const matches = JSONPath({ path, json: data, wrap: false }) as unknown[];
      setResult(JSON.stringify(matches, null, 2));
      setCount(Array.isArray(matches) ? matches.length : 1);
      setError("");
    } catch (e: unknown) {
      setError((e as Error).message);
      setResult("");
      setCount(null);
    }
  };

  return (
    <div>
      <ToolPageHeader name="JSONPath Query" description="Query JSON documents with JSONPath expressions" icon="Braces" slug="jsonpath-query" category="code" copyText={result} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">JSON document</span>
            {json.trim() && <Badge variant={jsonValid ? "default" : "destructive"}>{jsonValid ? "Valid" : "Invalid"}</Badge>}
            <ResetButton onReset={() => { resetJson(); setResult(""); setCount(null); setError(""); }} />
          </div>
          <Textarea value={json} onChange={(e) => setJson(e.target.value)} className="min-h-[240px] font-mono text-sm" placeholder='{ "paste": "json" }' />
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input value={path} onChange={(e) => setPath(e.target.value)} placeholder="$.store.book[*]" className="font-mono text-sm" />
              <Button onClick={run} size="sm" className="h-9 shrink-0"><Play className="h-4 w-4" /> Run</Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {EXAMPLES.map((ex) => (
                <button key={ex} onClick={() => setPath(ex)} className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-border bg-muted/50 hover:bg-muted hover:text-foreground transition-colors cursor-pointer">
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Result</span>
            {count !== null && <Badge variant="secondary">{count} match{count === 1 ? "" : "es"}</Badge>}
            <div className="ml-auto"><CopyButton text={result} /></div>
          </div>
          {error ? (
            <div className="min-h-[400px] rounded-lg border border-destructive/50 bg-destructive/10 p-4 flex items-start gap-2"><AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" /><span className="text-sm text-destructive font-mono">{error}</span></div>
          ) : (
            <pre className="min-h-[400px] rounded-lg border border-border bg-muted/50 p-4 overflow-auto text-sm font-mono whitespace-pre-wrap">{result || <span className="text-muted-foreground">Run a query to see results...</span>}</pre>
          )}
        </div>
      </div>
    </div>
  );
}
