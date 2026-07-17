"use client";
import { useState, useMemo } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => { setHtml(DEMO_HTML); setCss(DEMO_CSS); }}>Load Demo</Button></div>
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Scissors } from "lucide-react";

const DEMO_HTML = `<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold text-white">Hello</h1>
  <p class="text-gray-400">World</p>
  <button class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2">Click</button>
</div>`;

const DEMO_CSS = `.container { max-width: 1200px; margin: 0 auto; }
.mx-auto { margin-left: auto; margin-right: auto; }
.p-4 { padding: 1rem; }
.text-2xl { font-size: 1.5rem; }
.font-bold { font-weight: 700; }
.text-white { color: white; }
.text-gray-400 { color: #9ca3af; }
.bg-blue-500 { background-color: #3b82f6; }
.hover\\:bg-blue-700:hover { background-color: #1d4ed8; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.bg-red-500 { background-color: #ef4444; }
.hidden { display: none; }
.invisible { visibility: hidden; }`;

function extractClasses(html: string): Set<string> {
  const classes = new Set<string>();
  const regex = /class="([^"]*)"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    match[1].split(/\s+/).forEach((c) => c && classes.add(c));
  }
  return classes;
}

export default function CssPurgerPage() {
  const [html, setHtml] = useState(DEMO_HTML);
  const [css, setCss] = useState(DEMO_CSS);
  const [purgedCss, setPurgedCss] = useState("");
  const [usedClasses, setUsedClasses] = useState<Set<string>>(new Set());
  const [unusedClasses, setUnusedClasses] = useState<Set<string>>(new Set());

  const purge = () => {
    const used = extractClasses(html);
    setUsedClasses(used);
    const lines = css.split("\n");
    const kept: string[] = [];
    const unused = new Set<string>();
    lines.forEach((line) => {
      const selectorMatch = line.match(/^\.([\w\\:-]+)/);
      if (selectorMatch) {
        const cls = selectorMatch[1].replace(/\\:/g, ":");
        if (used.has(cls)) kept.push(line);
        else unused.add(cls);
      } else kept.push(line);
    });
    setUnusedClasses(unused);
    setPurgedCss(kept.join("\n"));
  };

  const savedBytes = css.length - purgedCss.length;
  const savedPct = css.length > 0 ? Math.round((savedBytes / css.length) * 100) : 0;

  return (
    <div>
      <ToolPageHeader name="CSS Purger & Class Analyzer" description="Scan HTML for unused CSS classes, show KB saved" icon="Scissors" slug="css-purger" category="design" />
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => { setHtml(DEMO_HTML); setCss(DEMO_CSS); }}>Load Demo</Button></div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2"><span className="text-sm font-medium">HTML</span><Textarea value={html} onChange={(e) => setHtml(e.target.value)} className="min-h-[200px] font-mono text-xs" /></div>
          <div className="space-y-2"><span className="text-sm font-medium">CSS</span><Textarea value={css} onChange={(e) => setCss(e.target.value)} className="min-h-[200px] font-mono text-xs" /></div>
        </div>
        <Button onClick={purge} className="w-full"><Scissors className="h-4 w-4" /> Purge Unused CSS</Button>
        {purgedCss && (
          <>
            <div className="flex gap-2 text-xs">
              <Badge variant="default">{usedClasses.size} used</Badge>
              <Badge variant="destructive">{unusedClasses.size} unused (-{savedPct}%)</Badge>
              <Badge variant="secondary">Saved {savedBytes} bytes</Badge>
            </div>
            <div className="space-y-2"><div className="flex items-center justify-between"><span className="text-sm font-medium">Purged CSS</span><CopyButton text={purgedCss} /></div>
              <pre className="rounded-lg border border-border bg-muted/50 p-4 overflow-auto text-xs font-mono whitespace-pre-wrap max-h-[300px]">{purgedCss}</pre>
            </div>
            {unusedClasses.size > 0 && (
              <div className="space-y-1"><span className="text-xs text-muted-foreground">Unused classes:</span>
                <div className="flex flex-wrap gap-1">{[...unusedClasses].map((c) => <Badge key={c} variant="destructive" className="text-[10px]">{c}</Badge>)}</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
