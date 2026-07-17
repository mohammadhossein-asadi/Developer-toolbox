"use client";
import { useState, useCallback } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Fingerprint, Trash2 } from "lucide-react";
import { v1 as uuidv1, v4 as uuidv4, v6 as uuidv6, v7 as uuidv7 } from "uuid";
import toast from "react-hot-toast";

type V = "v1" | "v4" | "v6" | "v7";
const gens: Record<V, () => string> = { v1: uuidv1, v4: uuidv4, v6: uuidv6, v7: uuidv7 };

export default function UuidGeneratorPage() {
  const [version, setVersion] = useState<V>("v4");
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);

  const generate = useCallback(() => { setUuids(Array.from({ length: count }, () => gens[version]())); }, [version, count]);
  const copyAll = () => { navigator.clipboard.writeText(uuids.join("\n")); toast.success("All UUIDs copied!"); };

  return (
    <div>
      <ToolPageHeader name="UUID Generator" description="Generate UUIDs v1, v4, v6, and v7" icon="Fingerprint" slug="uuid-generator" category="generator" />
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => {setVersion('v4'); setCount(5)}}>Load Demo</Button></div>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Version:</span>
            {(["v1", "v4", "v6", "v7"] as V[]).map((v) => <Button key={v} variant={version === v ? "default" : "outline"} size="sm" onClick={() => setVersion(v)}>{v}</Button>)}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Count:</span>
            <Input type="number" min={1} max={1000} value={count} onChange={(e) => setCount(Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)))} className="w-20 h-8 text-sm" />
          </div>
          <Button onClick={generate} size="sm"><Fingerprint className="h-4 w-4" /> Generate</Button>
        </div>
        {uuids.length > 0 && (
          <>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{uuids.length} UUIDs</Badge>
              <Button variant="outline" size="sm" onClick={copyAll}>Copy All</Button>
              <Button variant="ghost" size="sm" onClick={() => setUuids([])}><Trash2 className="h-4 w-4" /> Clear</Button>
            </div>
            <div className="rounded-lg border border-border bg-muted/50 divide-y divide-border max-h-[500px] overflow-auto">
              {uuids.map((uuid, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/50 group">
                  <span className="text-xs text-muted-foreground w-8">{i + 1}</span>
                  <code className="font-mono text-sm flex-1">{uuid}</code>
                  <CopyButton text={uuid} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
