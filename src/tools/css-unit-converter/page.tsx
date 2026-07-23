import { useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const units = ["px","rem","em","vh","vw","%"];

export default function CssUnitConverterPage() {
  const [value, setValue] = useState("16");
  const [fromUnit, setFromUnit] = useState("px");
  const [baseFontSize, setBaseFontSize] = useState(16);
  const [viewportHeight, setViewportHeight] = useState(900);
  const [viewportWidth, setViewportWidth] = useState(1440);

  const num = parseFloat(value) || 0;

  function convert(unit: string): string {
    if (unit === fromUnit) return num.toFixed(2);
    let px = 0;
    switch (fromUnit) {
      case "px": px = num; break;
      case "rem": case "em": px = num * baseFontSize; break;
      case "vh": px = num * viewportHeight / 100; break;
      case "vw": px = num * viewportWidth / 100; break;
      case "%": px = num * baseFontSize / 100; break;
    }
    switch (unit) {
      case "px": return px.toFixed(2);
      case "rem": case "em": return (px / baseFontSize).toFixed(4);
      case "vh": return (px / viewportHeight * 100).toFixed(4);
      case "vw": return (px / viewportWidth * 100).toFixed(4);
      case "%": return (px / baseFontSize * 100).toFixed(2);
      default: return "0";
    }
  }

  return (
    <div>
      <ToolPageHeader name="CSS Unit Converter" description="Convert between px, rem, em, vh, vw, and %" icon="Ruler" slug="css-unit-converter" category="conversion" />
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => {setValue('16'); setFromUnit('px')}}>Load Demo</Button></div>
      <div className="space-y-4 max-w-lg">
        <div className="flex gap-3">
          <div className="flex-1 space-y-1"><Label>Value</Label><Input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="font-mono" /></div>
          <div className="space-y-1"><Label>Unit</Label>
            <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="h-10 w-20 rounded-lg border border-input bg-background px-2 text-sm">{units.map((u) => <option key={u} value={u}>{u}</option>)}</select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1"><Label>Base font size (px)</Label><Input type="number" value={baseFontSize} onChange={(e) => setBaseFontSize(parseInt(e.target.value) || 16)} className="h-8 text-xs" /></div>
          <div className="space-y-1"><Label>Viewport width (px)</Label><Input type="number" value={viewportWidth} onChange={(e) => setViewportWidth(parseInt(e.target.value) || 1440)} className="h-8 text-xs" /></div>
          <div className="space-y-1"><Label>Viewport height (px)</Label><Input type="number" value={viewportHeight} onChange={(e) => setViewportHeight(parseInt(e.target.value) || 900)} className="h-8 text-xs" /></div>
        </div>
        <div className="rounded-lg border border-border bg-muted/50 divide-y divide-border">
          {units.filter((u) => u !== fromUnit).map((u) => (
            <div key={u} className="flex items-center justify-between px-4 py-3 group hover:bg-muted/50">
              <span className="text-sm font-medium w-12">{u}</span>
              <code className="font-mono text-sm">{convert(u)}</code>
              <CopyButton text={`${convert(u)}${u}`} className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
