"use client";
import { useState, useMemo } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitCompare } from "lucide-react";

export default function DiffCheckerPage() {
  const [textA, setTextA] = useState("Hello World\nThis is line 2\nThis line stays\nLine 4 changes");
  const [textB, setTextB] = useState("Hello Developer\nThis is line 2\nThis line stays\nLine 4 is different\nNew line added");
  const [view, setView] = useState<"side" | "inline">("side");

  const diff = useMemo(() => {
    const linesA = textA.split("\n");
    const linesB = textB.split("\n");
    const maxLen = Math.max(linesA.length, linesB.length);
    const result: { lineA: string | null; lineB: string | null; status: "same" | "added" | "removed" | "changed" }[] = [];
    for (let i = 0; i < maxLen; i++) {
      const a = linesA[i] ?? null;
      const b = linesB[i] ?? null;
      if (a === b) result.push({ lineA: a, lineB: b, status: "same" });
      else if (a === null) result.push({ lineA: null, lineB: b, status: "added" });
      else if (b === null) result.push({ lineA: a, lineB: null, status: "removed" });
      else result.push({ lineA: a, lineB: b, status: "changed" });
    }
    return result;
  }, [textA, textB]);

  const stats = useMemo(() => {
    const added = diff.filter((d) => d.status === "added").length;
    const removed = diff.filter((d) => d.status === "removed").length;
    const changed = diff.filter((d) => d.status === "changed").length;
    return { added, removed, changed, same: diff.length - added - removed - changed };
  }, [diff]);

  const colors = { same: "", added: "bg-green-500/10 border-l-2 border-green-500", removed: "bg-red-500/10 border-l-2 border-red-500", changed: "bg-yellow-500/10 border-l-2 border-yellow-500" };

  const loadDemo = () => { setTextA("function hello() {\n  console.log('Hello');\n  return true;\n}\n\nfunction world() {\n  console.log('World');\n}"); setTextB("function hello() {\n  console.log('Hello Developer!');\n  return true;\n}\n\nfunction greet() {\n  console.log('Greetings!');\n}"); };

  return (
    <div>
      <ToolPageHeader name="Diff Checker" description="Side-by-side and inline text comparison with highlighting" icon="GitCompare" slug="diff-checker" category="text" />
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Tabs value={view} onValueChange={(v) => setView(v as typeof view)}><TabsList><TabsTrigger value="side">Side by Side</TabsTrigger><TabsTrigger value="inline">Inline</TabsTrigger></TabsList></Tabs>
          <Button variant="outline" size="sm" onClick={loadDemo}>Load Demo</Button>
        </div>
        <div className="flex gap-4 text-xs">
          <span className="text-green-400">+{stats.added} added</span>
          <span className="text-red-400">-{stats.removed} removed</span>
          <span className="text-yellow-400">~{stats.changed} changed</span>
          <span className="text-muted-foreground">{stats.same} unchanged</span>
        </div>
        {view === "side" ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1"><span className="text-xs font-medium text-muted-foreground">Original</span><Textarea value={textA} onChange={(e) => setTextA(e.target.value)} className="min-h-[300px] font-mono text-xs" /></div>
            <div className="space-y-1"><span className="text-xs font-medium text-muted-foreground">Modified</span><Textarea value={textB} onChange={(e) => setTextB(e.target.value)} className="min-h-[300px] font-mono text-xs" /></div>
          </div>
        ) : (
          <div className="space-y-1"><span className="text-xs font-medium text-muted-foreground">Input A</span><Textarea value={textA} onChange={(e) => setTextA(e.target.value)} className="min-h-[100px] font-mono text-xs" /><span className="text-xs font-medium text-muted-foreground">Input B</span><Textarea value={textB} onChange={(e) => setTextB(e.target.value)} className="min-h-[100px] font-mono text-xs" /></div>
        )}
        <div className="rounded-lg border border-border bg-muted/50 divide-y divide-border max-h-[400px] overflow-auto font-mono text-xs">
          {diff.map((d, i) => (
            <div key={i} className={`flex ${colors[d.status]} ${view === "side" ? "" : ""}`}>
              {view === "side" ? (
                <>
                  <div className="w-1/2 px-3 py-1 border-r border-border">{d.lineA !== null ? <span>{d.lineA}</span> : <span className="text-muted-foreground">{'\u00A0'}</span>}</div>
                  <div className="w-1/2 px-3 py-1">{d.lineB !== null ? <span>{d.lineB}</span> : <span className="text-muted-foreground">{'\u00A0'}</span>}</div>
                </>
              ) : (
                <div className="px-3 py-1">
                  <span className="text-muted-foreground mr-2">{i + 1}</span>
                  {d.status === "removed" && <span className="text-red-400">- {d.lineA}</span>}
                  {d.status === "added" && <span className="text-green-400">+ {d.lineB}</span>}
                  {d.status === "changed" && <span className="text-yellow-400">~ {d.lineA} → {d.lineB}</span>}
                  {d.status === "same" && <span>{d.lineA}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
