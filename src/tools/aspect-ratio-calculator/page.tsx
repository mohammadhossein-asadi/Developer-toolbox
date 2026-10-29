import { useState, useEffect } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const PRESETS: Array<[string, number, number]> = [
  ["16:9 HD Video", 16, 9],
  ["4:3 Classic", 4, 3],
  ["1:1 Square", 1, 1],
  ["21:9 Ultrawide", 21, 9],
  ["9:16 Stories", 9, 16],
  ["3:2 Photo", 3, 2],
  ["2:3 Print", 2, 3],
  ["18:9 Phone", 18, 9],
];

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export default function AspectRatioCalculatorPage() {
  const [w, setW] = useState("1920");
  const [h, setH] = useState("1080");
  const [ratio, setRatio] = useState<{ w: number; h: number }>({ w: 16, h: 9 });
  const [locked, setLocked] = useState<"width" | "height" | null>("width");
  const [newSize, setNewSize] = useState("");

  // Derive simplified ratio from current dimensions
  useEffect(() => {
    const nw = parseInt(w, 10);
    const nh = parseInt(h, 10);
    if (nw > 0 && nh > 0) {
      const d = gcd(nw, nh);
      setRatio({ w: nw / d, h: nh / d });
    }
  }, [w, h]);

  const aspect = parseInt(w, 10) > 0 && parseInt(h, 10) > 0 ? parseInt(w, 10) / parseInt(h, 10) : 0;

  const computeFromWidth = (width: number) => (aspect ? Math.round(width / aspect) : 0);
  const computeFromHeight = (height: number) => (aspect ? Math.round(height * aspect) : 0);

  const matchedPreset = PRESETS.find(([, pw, ph]) => Math.abs(pw / ph - aspect) < 0.001);

  return (
    <div>
      <ToolPageHeader name="Aspect Ratio Calculator" description="Compute dimensions for a target ratio and identify common presets" icon="Ruler" slug="aspect-ratio-calculator" category="conversion" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ar-width">Width (px)</Label>
              <Input
                id="ar-width"
                type="number"
                min={1}
                value={w}
                onChange={(e) => { setW(e.target.value); setLocked("width"); }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ar-height">Height (px)</Label>
              <Input
                id="ar-height"
                type="number"
                min={1}
                value={h}
                onChange={(e) => { setH(e.target.value); setLocked("height"); }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
            <span className="text-sm text-muted-foreground">Aspect ratio:</span>
            <span className="font-mono text-2xl font-bold text-primary">{ratio.w}:{ratio.h}</span>
            {matchedPreset && <Badge variant="secondary" className="ml-auto">{matchedPreset[0]}</Badge>}
          </div>

          <div className="space-y-2">
            <Label>Scale to a new size</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={1}
                placeholder={locked === "height" ? "New height" : "New width"}
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                className="font-mono"
              />
              <Badge variant="outline" className="shrink-0">
                {locked === "height"
                  ? `width → ${newSize ? computeFromHeight(parseInt(newSize, 10) || 0) : "…"}`
                  : `height → ${newSize ? computeFromWidth(parseInt(newSize, 10) || 0) : "…"}`}
              </Badge>
              <CopyButton text={`${locked === "height" ? computeFromHeight(parseInt(newSize, 10) || 0) : computeFromWidth(parseInt(newSize, 10) || 0)}`} />
            </div>
            <p className="text-xs text-muted-foreground">
              Currently editing {locked === "height" ? "height — the matching width is computed" : "width — the matching height is computed"}.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Common presets — click to apply</Label>
          <div className="grid grid-cols-2 gap-2">
            {PRESETS.map(([name, pw, ph]) => {
              const active = matchedPreset?.[0] === name;
              return (
                <button
                  key={name}
                  onClick={() => { setRatio({ w: pw, h: ph }); setW(String(pw * 100)); setH(String(ph * 100)); setLocked("width"); setNewSize(""); }}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${active ? "border-primary bg-primary/10" : "border-border bg-card/50 hover:border-primary/30 hover:bg-card"}`}
                >
                  <div className="text-xs font-medium">{name}</div>
                  <div className="text-[10px] font-mono text-muted-foreground mt-0.5">{pw}:{ph}</div>
                </button>
              );
            })}
          </div>

          {/* Visual preview */}
          <div className="rounded-xl border border-border bg-muted/30 p-6 flex items-center justify-center min-h-[160px]">
            {aspect > 0 && (
              <div
                className="bg-primary/20 border border-primary/40 rounded-md flex items-center justify-center"
                style={{
                  aspectRatio: `${ratio.w} / ${ratio.h}`,
                  width: aspect >= 1 ? "100%" : "auto",
                  height: aspect >= 1 ? "auto" : "160px",
                }}
              >
                <span className="font-mono text-xs text-primary">{ratio.w}:{ratio.h}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
