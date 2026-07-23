import { useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

function hexToHsl(hex: string) {
  const r = parseInt(hex.slice(1,3),16)/255, g = parseInt(hex.slice(3,5),16)/255, b = parseInt(hex.slice(5,7),16)/255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b), l = (max+min)/2;
  let h = 0, s = 0;
  if (max !== min) { const d = max-min; s = l>0.5 ? d/(2-max-min) : d/(max+min); if (max===r) h=((g-b)/d+(g<b?6:0))/6; else if (max===g) h=((b-r)/d+2)/6; else h=((r-g)/d+4)/6; }
  return { h: Math.round(h*360), s: Math.round(s*100), l: Math.round(l*100) };
}
function hslToHex(h: number, s: number, l: number) {
  s/=100; l/=100; const a=s*Math.min(l,1-l);
  const f=(n:number)=>{const k=(n+h/30)%12;return l-a*Math.max(Math.min(k-3,9-k,1),-1);};
  return "#"+[f(0),f(8),f(4)].map((x)=>Math.round(x*255).toString(16).padStart(2,"0")).join("");
}

function generatePalette(h: number, s: number, l: number, type: string, count: number): string[] {
  const colors: string[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    switch (type) {
      case "analogous": colors.push(hslToHex((h + t * 60 - 30 + 360) % 360, s, l)); break;
      case "complementary": colors.push(hslToHex((h + t * 180) % 360, s, l)); break;
      case "triadic": colors.push(hslToHex((h + t * 240) % 360, s, l)); break;
      case "split": colors.push(hslToHex((h + t * 300) % 360, s, l)); break;
      case "monochromatic": colors.push(hslToHex(h, s, 20 + t * 60)); break;
      default: colors.push(hslToHex((h + t * 360) % 360, s, l));
    }
  }
  return colors;
}

export default function ColorPalettePage() {
  const [baseColor, setBaseColor] = useState("#6366f1");
  const [type, setType] = useState("analogous");
  const [count, setCount] = useState(5);
  const hsl = hexToHsl(baseColor);
  const palette = generatePalette(hsl.h, hsl.s, hsl.l, type, count);

  return (
    <div>
      <ToolPageHeader name="Color Palette Generator" description="Generate color palettes from a base color" icon="Palette" slug="color-palette" category="design" />
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => {setBaseColor("#6366f1")}}>Load Demo</Button></div>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2"><Label>Base:</Label><input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="h-8 w-8 rounded cursor-pointer" /><Input value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className="w-24 h-8 text-xs font-mono" /></div>
          <div className="space-y-1"><Label>Count</Label><Input type="number" min={3} max={10} value={count} onChange={(e) => setCount(Math.min(10, Math.max(3, parseInt(e.target.value) || 3)))} className="w-16 h-8 text-xs" /></div>
        </div>
        <Tabs value={type} onValueChange={(v) => setType(v)}>
          <TabsList>{["analogous","complementary","triadic","split","monochromatic"].map((t) => <TabsTrigger key={t} value={t} className="capitalize text-xs">{t}</TabsTrigger>)}</TabsList>
        </Tabs>
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${count}, 1fr)` }}>
          {palette.map((c, i) => (
            <div key={i} className="group relative">
              <div className="h-20 rounded-lg border border-border" style={{ backgroundColor: c }} />
              <div className="flex items-center justify-between mt-1"><code className="text-[10px] font-mono">{c}</code><CopyButton text={c} className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity" /></div>
            </div>
          ))}
        </div>
        <div className="p-3 rounded-lg bg-muted/50 border border-border text-xs font-mono">
          CSS: {palette.map((c, i) => `--color-${i+1}: ${c};`).join(" ")}
        </div>
      </div>
    </div>
  );
}
