"use client";
import { useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => setHex("#6366f1")}>Load Demo</Button></div>
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Pipette } from "lucide-react";

function hexToRgb(hex: string) { const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex); return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : { r: 0, g: 0, b: 0 }; }
function rgbToHex(r: number, g: number, b: number) { return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join(""); }
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255; const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) { const d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min); if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6; else if (max === g) h = ((b - r) / d + 2) / 6; else h = ((r - g) / d + 4) / 6; }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}
function hslToRgb(h: number, s: number, l: number) {
  h /= 360; s /= 100; l /= 100; let r, g, b;
  if (s === 0) { r = g = b = l; } else {
    const h2r = (p: number, q: number, t: number) => { if (t < 0) t += 1; if (t > 1) t -= 1; if (t < 1 / 6) return p + (q - p) * 6 * t; if (t < 1 / 2) return q; if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6; return p; };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s; const p = 2 * l - q;
    r = h2r(p, q, h + 1 / 3); g = h2r(p, q, h); b = h2r(p, q, h - 1 / 3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}
function getContrastRatio(c1: { r: number; g: number; b: number }, c2: { r: number; g: number; b: number }) {
  const lum = (c: { r: number; g: number; b: number }) => { const [rs, gs, bs] = [c.r, c.g, c.b].map((x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }); return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs; };
  const l1 = lum(c1), l2 = lum(c2); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

export default function ColorPickerPage() {
  const [hex, setHex] = useState("#6366f1");
  const rgb = hexToRgb(hex); const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const handleHex = (v: string) => { if (/^#[0-9a-f]{6}$/i.test(v)) setHex(v); };
  const handleRgb = (ch: "r" | "g" | "b", v: number) => { const n = { ...rgb, [ch]: Math.min(255, Math.max(0, v)) }; setHex(rgbToHex(n.r, n.g, n.b)); };
  const handleHsl = (ch: "h" | "s" | "l", v: number) => { const n = { ...hsl, [ch]: v }; const r = hslToRgb(n.h, n.s, n.l); setHex(rgbToHex(r.r, r.g, r.b)); };
  const harmony = [{ n: "Complementary", h: (hsl.h + 180) % 360 }, { n: "Analogous", h: (hsl.h + 30) % 360 }, { n: "Triadic", h: (hsl.h + 120) % 360 }];
  const wr = getContrastRatio(rgb, { r: 255, g: 255, b: 255 }); const br = getContrastRatio(rgb, { r: 0, g: 0, b: 0 });

  return (
    <div>
      <ToolPageHeader name="Color Picker" description="Pick colors, check contrast, and explore harmonies" icon="Palette" slug="color-picker" category="design" copyText={`--color-custom: ${hex};`} />
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => setHex("#6366f1")}>Load Demo</Button></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="h-32 rounded-2xl border border-border" style={{ backgroundColor: hex }} />
          <div className="space-y-2"><Label>HEX</Label><div className="flex gap-2"><input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="h-10 w-10 rounded-lg cursor-pointer" /><Input value={hex} onChange={(e) => handleHex(e.target.value)} className="font-mono" /></div></div>
          <div className="space-y-2"><Label>RGB</Label><div className="grid grid-cols-3 gap-2">{(["r", "g", "b"] as const).map((ch) => <div key={ch} className="space-y-1"><span className="text-xs text-muted-foreground uppercase">{ch}</span><Input type="number" min={0} max={255} value={rgb[ch]} onChange={(e) => handleRgb(ch, parseInt(e.target.value) || 0)} className="h-8 text-xs" /></div>)}</div></div>
          <div className="space-y-2"><Label>HSL</Label><div className="space-y-2">{(["h", "s", "l"] as const).map((ch) => <div key={ch} className="flex items-center gap-2"><span className="text-xs w-4">{ch}</span><input type="range" min={0} max={ch === "h" ? 360 : 100} value={hsl[ch]} onChange={(e) => handleHsl(ch, parseInt(e.target.value))} className="flex-1" /><span className="text-xs w-8 text-right">{hsl[ch]}{ch === "h" ? "°" : "%"}</span></div>)}</div></div>
          <Button variant="outline" size="sm" className="w-full" onClick={async () => { if ("EyeDropper" in window) { const ed = new (window as any).EyeDropper(); const r = await ed.open(); setHex(r.sRGBHex); } }}><Pipette className="h-4 w-4" /> Eyedropper</Button>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Harmony</h3>
          <div className="space-y-1">{harmony.map((h) => { const r = hslToRgb(h.h, hsl.s, hsl.l); const hHex = rgbToHex(r.r, r.g, r.b); return <div key={h.n} className="flex items-center gap-2 group"><div className="h-6 w-6 rounded" style={{ backgroundColor: hHex }} /><span className="text-xs text-muted-foreground">{h.n}</span><code className="text-xs font-mono ml-auto">{hHex}</code><CopyButton text={hHex} className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0" /></div>; })}</div>
          <h3 className="text-sm font-medium mt-4">Contrast (WCAG)</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-lg bg-white text-black text-sm"><span>vs White</span><Badge variant={wr >= 4.5 ? "default" : "destructive"}>{wr.toFixed(1)}:1 {wr >= 4.5 ? "AA" : "Fail"}</Badge></div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-black text-white text-sm"><span>vs Black</span><Badge variant={br >= 4.5 ? "default" : "destructive"}>{br.toFixed(1)}:1 {br >= 4.5 ? "AA" : "Fail"}</Badge></div>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Export</h3>
          <div className="space-y-2 text-sm font-mono">
            {[
              { l: "CSS", v: `--color-custom: ${hex};` },
              { l: "HSL", v: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
              { l: "Tailwind", v: `bg-[${hex}]` },
            ].map((e) => <div key={e.l} className="p-3 rounded-lg bg-muted/50 border border-border"><span className="text-muted-foreground">{e.l}:</span><CopyButton text={e.v} className="mt-1" />)</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
