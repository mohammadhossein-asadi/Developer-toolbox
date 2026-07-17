"use client";
import { useState, useCallback } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => setInput("Hello, Developer Toolbox!")}>Load Demo</Button></div>
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Hash } from "lucide-react";
import md5 from "js-md5";

async function sha(algorithm: string, text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest(algorithm, data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function HashGeneratorPage() {
  const [input, setInput] = useState("Hello, Developer Toolbox!");
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [active, setActive] = useState<string[]>(["MD5", "SHA-256"]);

  const algorithms = [
    { name: "MD5", fn: (t: string) => Promise.resolve(md5(t)) },
    { name: "SHA-1", fn: (t: string) => sha("SHA-1", t) },
    { name: "SHA-256", fn: (t: string) => sha("SHA-256", t) },
    { name: "SHA-384", fn: (t: string) => sha("SHA-384", t) },
    { name: "SHA-512", fn: (t: string) => sha("SHA-512", t) },
  ];

  const generate = useCallback(async () => {
    const results: Record<string, string> = {};
    for (const algo of algorithms) {
      if (active.includes(algo.name)) results[algo.name] = await algo.fn(input);
    }
    setHashes(results);
  }, [input, active]);

  const toggle = (name: string) => setActive((p) => p.includes(name) ? p.filter((n) => n !== name) : [...p, name]);

  return (
    <div>
      <ToolPageHeader name="Hash Generator" description="Generate MD5, SHA-1, SHA-256, SHA-512 hashes from text" icon="Hash" slug="hash-generator" category="conversion" />
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => setInput("Hello, Developer Toolbox!")}>Load Demo</Button></div>
      <div className="space-y-4">
        <div className="space-y-2">
          <span className="text-sm font-medium">Input Text</span>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[120px] font-mono text-sm" />
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium self-center">Algorithms:</span>
          {algorithms.map((a) => (
            <Badge key={a.name} variant={active.includes(a.name) ? "default" : "outline"} className="cursor-pointer" onClick={() => toggle(a.name)}>{a.name}</Badge>
          ))}
        </div>
        <Button onClick={generate} size="sm"><Hash className="h-4 w-4" /> Generate</Button>
        {Object.keys(hashes).length > 0 && (
          <div className="rounded-lg border border-border bg-muted/50 divide-y divide-border">
            {Object.entries(hashes).map(([algo, hash]) => (
              <div key={algo} className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 group">
                <div className="min-w-0 flex-1"><span className="text-xs text-muted-foreground">{algo}</span><div className="text-sm font-mono break-all mt-0.5">{hash}</div></div>
                <CopyButton text={hash} className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
