import { useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface ShadowLayer {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

const toRgba = (hex: string, opacity: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const layerToCss = (l: ShadowLayer): string =>
  `${l.inset ? "inset " : ""}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${toRgba(l.color, l.opacity)}`;

const DEFAULT_LAYERS: ShadowLayer[] = [
  { x: 0, y: 8, blur: 24, spread: 0, color: "#863bff", opacity: 0.35, inset: false },
  { x: 0, y: 2, blur: 6, spread: 0, color: "#000000", opacity: 0.25, inset: false },
];

export default function BoxShadowGeneratorPage() {
  const [layers, setLayers] = useState<ShadowLayer[]>(DEFAULT_LAYERS);
  const [radius, setRadius] = useState(16);

  const css = `box-shadow: ${layers.map(layerToCss).join(", ")};`;
  const fullCss = `.element {\n  border-radius: ${radius}px;\n  ${css}\n}`;

  const update = (i: number, patch: Partial<ShadowLayer>) =>
    setLayers((ls) => ls.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));

  return (
    <div>
      <ToolPageHeader name="Box-Shadow Generator" description="Design layered CSS box-shadows with live preview" icon="Paintbrush" slug="box-shadow-generator" category="design" copyText={fullCss} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {layers.map((layer, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Layer {i + 1}</span>
                <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer ml-2">
                  <input type="checkbox" checked={layer.inset} onChange={(e) => update(i, { inset: e.target.checked })} className="accent-[var(--color-primary)]" />
                  inset
                </label>
                {layers.length > 1 && (
                  <Button variant="ghost" size="icon" className="h-7 w-7 ml-auto text-destructive" onClick={() => setLayers((ls) => ls.filter((_, idx) => idx !== i))} aria-label={`Remove layer ${i + 1}`}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {([
                  ["X offset", "x", -50, 50],
                  ["Y offset", "y", -50, 50],
                  ["Blur", "blur", 0, 100],
                  ["Spread", "spread", -50, 50],
                ] as const).map(([label, key, min, max]) => (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between">
                      <Label className="text-xs text-muted-foreground">{label}</Label>
                      <span className="text-xs font-mono text-muted-foreground">{layer[key]}px</span>
                    </div>
                    <Slider value={[layer[key]]} min={min} max={max} step={1} onValueChange={([v]) => update(i, { [key]: v })} />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <Label className="text-xs text-muted-foreground">Color</Label>
                <input type="color" value={layer.color} onChange={(e) => update(i, { color: e.target.value })} className="h-8 w-12 rounded cursor-pointer bg-transparent" aria-label={`Layer ${i + 1} color`} />
                <Label className="text-xs text-muted-foreground ml-2">Opacity</Label>
                <div className="flex-1"><Slider value={[layer.opacity * 100]} min={0} max={100} step={1} onValueChange={([v]) => update(i, { opacity: v / 100 })} /></div>
                <span className="text-xs font-mono text-muted-foreground w-10">{Math.round(layer.opacity * 100)}%</span>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setLayers((ls) => [...ls, { x: 0, y: 4, blur: 12, spread: 0, color: "#000000", opacity: 0.2, inset: false }])}>
            <Plus className="h-4 w-4" /> Add layer
          </Button>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted/30 h-72 flex items-center justify-center overflow-hidden">
            <div
              className="h-32 w-32 bg-card border border-border"
              style={{ borderRadius: radius, boxShadow: layers.map(layerToCss).join(", ") }}
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <Label className="text-xs text-muted-foreground">Border radius</Label>
              <span className="text-xs font-mono text-muted-foreground">{radius}px</span>
            </div>
            <Slider value={[radius]} min={0} max={100} step={1} onValueChange={([v]) => setRadius(v)} />
          </div>
          <div className="relative">
            <pre className="rounded-xl border border-border bg-muted/50 p-4 text-xs font-mono overflow-auto">{fullCss}</pre>
            <CopyButton text={fullCss} className="absolute top-2 right-2" />
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-xs text-muted-foreground">Tailwind arbitrary value:</Label>
            <code className="text-xs font-mono text-primary break-all">shadow-[{layers.map(layerToCss).join(",")}]</code>
          </div>
        </div>
      </div>
    </div>
  );
}
