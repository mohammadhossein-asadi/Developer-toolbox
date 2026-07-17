"use client";
import { useState, useMemo } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, BookOpen } from "lucide-react";

const cheatSheet = [
  { p: ".", d: "Any char" }, { p: "\\d", d: "Digit" }, { p: "\\w", d: "Word" }, { p: "\\s", d: "Whitespace" },
  { p: "^", d: "Start" }, { p: "$", d: "End" }, { p: "*", d: "Zero+" }, { p: "+", d: "One+" }, { p: "?", d: "Optional" },
  { p: "{n,m}", d: "Count" }, { p: "[abc]", d: "Set" }, { p: "[^abc]", d: "Negated" }, { p: "(abc)", d: "Group" },
  { p: "a|b", d: "Or" }, { p: "\\b", d: "Boundary" },
];

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [testString, setTestString] = useState("Contact us at hello@example.com or support@dev-toolbox.dev");
  const [activeFlags, setActiveFlags] = useState<Set<string>>(new Set(["g"]));
  const [replaceText, setReplaceText] = useState("");

  const toggleFlag = (f: string) => setActiveFlags((p) => { const n = new Set(p); n.has(f) ? n.delete(f) : n.add(f); return n; });

  const result = useMemo(() => {
    try {
      const flags = Array.from(activeFlags).join("");
      const regex = new RegExp(pattern, flags);
      const matches: { match: string; index: number }[] = [];
      let m; const r2 = new RegExp(pattern, flags);
      if (flags.includes("g")) { while ((m = r2.exec(testString)) !== null) { matches.push({ match: m[0], index: m.index }); if (!m[0]) break; } }
      else { m = r2.exec(testString); if (m) matches.push({ match: m[0], index: m.index }); }
      return { matches, replaced: testString.replace(regex, replaceText), error: null };
    } catch (e) { return { matches: [], replaced: "", error: (e as Error).message }; }
  }, [pattern, testString, activeFlags, replaceText]);

  const highlightMatches = () => {
    if (result.error || !result.matches.length) return testString;
    let last = 0; const parts: React.ReactNode[] = [];
    result.matches.forEach((m, i) => {
      if (m.index > last) parts.push(<span key={`p${i}`}>{testString.slice(last, m.index)}</span>);
      parts.push(<mark key={`m${i}`} className="bg-yellow-500/30 text-yellow-200 rounded px-0.5">{m.match}</mark>);
      last = m.index + m.match.length;
    });
    if (last < testString.length) parts.push(<span key="e">{testString.slice(last)}</span>);
    return parts;
  };

  return (
    <div>
      <ToolPageHeader name="Regex Tester" description="Test and debug regular expressions with live matching" icon="Regex" slug="regex-tester" category="code" copyText={pattern} />
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-primary">/</span>
          <Input placeholder="Pattern..." value={pattern} onChange={(e) => setPattern(e.target.value)} className="font-mono flex-1" />
          <span className="text-sm font-medium text-primary">/</span>
          <div className="flex gap-1">
            {["g", "i", "m", "s", "u"].map((f) => <Button key={f} variant={activeFlags.has(f) ? "default" : "outline"} size="sm" className="h-8 w-8 p-0 text-xs font-mono" onClick={() => toggleFlag(f)}>{f}</Button>)}
          </div>
        </div>
        {result.error ? (
          <div className="flex items-center gap-2 p-3 rounded-lg border border-destructive/50 bg-destructive/10"><AlertCircle className="h-4 w-4 text-destructive" /><span className="text-sm text-destructive">{result.error}</span></div>
        ) : <Badge variant={result.matches.length > 0 ? "default" : "secondary"}>{result.matches.length} match{result.matches.length !== 1 ? "es" : ""}</Badge>}
        <div className="space-y-2">
          <span className="text-sm font-medium">Test String</span>
          <Textarea value={testString} onChange={(e) => setTestString(e.target.value)} className="min-h-[100px] font-mono text-sm" />
          <div className="rounded-lg border border-border bg-muted/50 p-4 font-mono text-sm whitespace-pre-wrap">{highlightMatches()}</div>
        </div>
        <div className="space-y-2">
          <span className="text-sm font-medium">Replace With</span>
          <Input placeholder="$1, $2 for groups" value={replaceText} onChange={(e) => setReplaceText(e.target.value)} className="font-mono" />
          {replaceText && <div className="rounded-lg border border-border bg-muted/50 p-4 font-mono text-sm whitespace-pre-wrap">{result.replaced}</div>}
        </div>
        {result.matches.length > 0 && (
          <div className="rounded-lg border border-border bg-muted/50 divide-y divide-border max-h-[200px] overflow-auto">
            {result.matches.map((m, i) => (
              <div key={i} className="px-4 py-2 flex items-center gap-4 text-sm">
                <Badge variant="outline" className="w-8 justify-center">{i + 1}</Badge>
                <code className="font-mono">{m.match}</code>
                <span className="text-muted-foreground ml-auto">Index: {m.index}</span>
              </div>
            ))}
          </div>
        )}
        <Tabs defaultValue="cheat">
          <TabsList><TabsTrigger value="cheat"><BookOpen className="h-4 w-4 mr-1" /> Cheat Sheet</TabsTrigger></TabsList>
          <TabsContent value="cheat">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {cheatSheet.map((c) => (
                <button key={c.p} className="flex items-center gap-2 p-2 rounded-lg border border-border bg-muted/50 hover:bg-muted transition-colors text-left cursor-pointer" onClick={() => setPattern((p) => p + c.p)}>
                  <code className="font-mono text-sm text-primary">{c.p}</code>
                  <span className="text-xs text-muted-foreground">{c.d}</span>
                </button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
