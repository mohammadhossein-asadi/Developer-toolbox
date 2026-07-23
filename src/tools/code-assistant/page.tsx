import { useState, useCallback } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wand2, Lightbulb, Bug, Minimize2 } from "lucide-react";

type AT = "improve" | "explain" | "simplify" | "find-bugs";
type S = { type: "info" | "warning" | "error" | "suggestion"; message: string; line?: number };

const defaultCode = `function fetchData(url) {
  var data = null;
  fetch(url).then(function(response) {
    data = response.json();
  });
  console.log(data);
  return data;
}

function processItems(items) {
  var result = [];
  for (var i = 0; i < items.length; i++) {
    if (items[i].active == true) {
      result.push(items[i]);
    }
  }
  return result;
}

function divide(a, b) {
  return a / b;
}`;

function analyzeCode(code: string, type: AT): S[] {
  const s: S[] = [];
  code.split("\n").forEach((line, i) => {
    const t = line.trim();
    if (type === "find-bugs" || type === "improve") {
      if (t.includes("var ")) s.push({ type: "warning", message: "Use 'const' or 'let' instead of 'var'", line: i + 1 });
      if (t.includes("==") && !t.includes("===")) s.push({ type: "warning", message: "Use strict equality (===) instead of ==", line: i + 1 });
      if (t.includes("console.log")) s.push({ type: "info", message: "Remove console.log in production", line: i + 1 });
    }
    if (type === "improve") {
      if (t.match(/for\s*\(\s*var\s+\w+\s*=\s*0/)) s.push({ type: "suggestion", message: "Consider using Array.filter() instead of for loop", line: i + 1 });
    }
    if (type === "simplify") {
      if (t.includes("== true")) s.push({ type: "suggestion", message: "Simplify: remove '== true' comparison", line: i + 1 });
      if (t.match(/result\.push\(/) && code.split("\n")[i - 1]?.includes("if")) s.push({ type: "suggestion", message: "Use .filter() instead of if/push", line: i + 1 });
    }
  });
  if (type === "explain") {
    const fns = code.match(/function\s+(\w+)/g) || [];
    s.push({ type: "info", message: `Contains ${fns.length} function(s)` });
    fns.forEach((fn) => s.push({ type: "info", message: `Function '${fn.replace("function ", "")}' is defined` }));
    if (code.includes("fetch(")) s.push({ type: "info", message: "Uses fetch API (returns Promises)" });
  }
  if (!s.length) s.push({ type: "info", message: `No ${type} suggestions found. Code looks clean!` });
  return s;
}

export default function CodeAssistantPage() {
  const [code, setCode] = useState(defaultCode);
  const [lang, setLang] = useState("javascript");
  const [type, setType] = useState<AT>("improve");
  const [results, setResults] = useState<S[]>([]);

  const run = useCallback(() => setResults(analyzeCode(code, type)), [code, type]);
  const icons = { info: <Lightbulb className="h-4 w-4 text-blue-400" />, warning: <Wand2 className="h-4 w-4 text-yellow-400" />, error: <Bug className="h-4 w-4 text-red-400" />, suggestion: <Sparkles className="h-4 w-4 text-green-400" /> };

  return (
    <div>
      <ToolPageHeader name="Code Assistant" description="AI-powered code analysis and improvement suggestions" icon="Sparkles" slug="code-assistant" category="code" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Code</span>
            <div className="flex gap-1 ml-auto">{["javascript", "typescript", "html", "css"].map((l) => <Button key={l} variant={lang === l ? "default" : "ghost"} size="sm" className="h-7 px-2 text-xs capitalize" onClick={() => setLang(l)}>{l}</Button>)}</div>
          </div>
          <Textarea value={code} onChange={(e) => setCode(e.target.value)} className="min-h-[400px] font-mono text-sm" />
        </div>
        <div className="space-y-3">
          <Tabs value={type} onValueChange={(v) => setType(v as AT)}>
            <TabsList><TabsTrigger value="improve"><Sparkles className="h-4 w-4 mr-1" /> Improve</TabsTrigger><TabsTrigger value="explain"><Lightbulb className="h-4 w-4 mr-1" /> Explain</TabsTrigger><TabsTrigger value="simplify"><Minimize2 className="h-4 w-4 mr-1" /> Simplify</TabsTrigger><TabsTrigger value="find-bugs"><Bug className="h-4 w-4 mr-1" /> Bugs</TabsTrigger></TabsList>
          </Tabs>
          <Button onClick={run} className="w-full"><Sparkles className="h-4 w-4" /> Analyze Code</Button>
          {results.length > 0 && (
            <>
              <div className="flex items-center gap-2"><span className="text-sm font-medium">Results</span><Badge variant="secondary">{results.length} findings</Badge></div>
              <div className="rounded-lg border border-border bg-muted/50 divide-y divide-border max-h-[400px] overflow-auto">
                {results.map((r, i) => <div key={i} className="px-4 py-3 flex items-start gap-3 hover:bg-muted/50">{icons[r.type]}<div className="flex-1"><span className="text-sm">{r.message}</span>{r.line && <span className="text-xs text-muted-foreground ml-2">Line {r.line}</span>}</div></div>)}
              </div>
            </>
          )}
          {!results.length && <div className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground"><Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" /><p className="text-sm">Click "Analyze Code" to get suggestions</p></div>}
        </div>
      </div>
    </div>
  );
}
