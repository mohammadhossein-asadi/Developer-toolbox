"use client";
import { useState, useMemo } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shuffle } from "lucide-react";

interface Stop { color: string; position: number; }
const presets = [
  { n: "Sunset", s: [{ color: "#f97316", position: 0 }, { color: "#ec4899", position: 50 }, { color: "#8b5cf6", position: 100 }] },
  { n: "Ocean", s: [{ color: "#0ea5e9", position: 0 }, { color: "#06b6d4", position: 50 }, { color: "#14b8a6", position: 100 }] },
  { n: "Aurora", s: [{ color: "#6366f1", position: 0 }, { color: "#a855f7", position: 50 }, { color: "#ec4899", position: 100 }] },
  { n: "Forest", s: [{ color: "#22c55e", position: 0 }, { color: "#059669", position: 50 }, { color: "#0d9488", position: 100 }] },
  { n: "Neon", s: [{ color: "#f43f5e", position: 0 }, { color: "#8b5cf6", position: 50 }, { color: "#06b6d4", position: 100 }] },
  { n: "Fire", s: [{ color: "#ef4444", position: 0 }, { color: "#f97316", position: 50 }, { color: "#eab308", position: 100 }] },
];

export default function GradientGeneratorPage() {
  const [type, setType] = useState<"linear" | "radial" | "conic">("linear");
  const [angle, setAngle] = useState(90);
  const [stops, setStops] = useState<Stop[]>([{ color: "#6366f1", position: 0 }, { color: "#a855f7", position: 100 }]);

  const css = useMemo(() => {
    const s = stops.map((st) => `${st.color} ${st.position}%`).join(", ");
    return type === "linear" ? `linear-gradient(${angle}deg, ${s})` : type === "radial" ? `radial-gradient(circle, ${s})` : `conic-gradient(from ${angle}deg, ${s})`;
  }, [type, angle, stops]);

  const svgCode = useMemo(() => {
    if (type === "linear") { const rad = (angle - 90) * Math.PI / 180; const x1 = 50 - Math.cos(rad) * 50; const y1 = 50 - Math.sin(rad) * 50; const x2 = 50 + Math.cos(rad) * 50; const y2 = 50 + Math.sin(rad) * 50; return `<linearGradient id="grad" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">\n${stops.map((s) => `  <stop offset="${s.position}%" stop-color="${s.color}"/>
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => {setStops([{color:'#6366f1',position:0},{color:'#a855f7',position:100}])}}>Load Demo</Button></div>`).join("\n")}\n</linearGradient>`; }
    return `<radialGradient id="grad" cx="50%" cy="50%" r="50%">\n${stops.map((s) => `  <stop offset="${s.position}%" stop-color="${s.color}"/>`).join("\n")}\n</radialGradient>`;
  }, [type, angle, stops]);

  const addStop = () => setStops((p) => [...p, { color: "#10b981", position: 50 }].sort((a, b) => a.position - b.position));
  const removeStop = (i: number) => { if (stops.length > 2) setStops((p) => p.filter((_, idx) => idx !== i)); };
  const randomize = () => { const rc = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`; setStops([{ color: rc(), position: 0 }, { color: rc(), position: 50 }, { color: rc(), position: 100 }]); };

  return (
    <div>
      <ToolPageHeader name="Gradient Generator" description="Create beautiful CSS gradients with live preview" icon="Rainbow" slug="gradient-generator" category="design" copyText={css} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Tabs value={type} onValueChange={(v) => setType(v as typeof type)}><TabsList><TabsTrigger value="linear">Linear</TabsTrigger><TabsTrigger value="radial">Radial</TabsTrigger><TabsTrigger value="conic">Conic</TabsTrigger></TabsList></Tabs>
            <Button variant="outline" size="sm" onClick={randomize}><Shuffle className="h-4 w-4" /> Random</Button>
          </div>
          <div className="flex items-center gap-2"><Label className="w-12 text-sm">Angle:</Label><input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(parseInt(e.target.value))} className="flex-1" /><Input type="number" value={angle} onChange={(e) => setAngle(parseInt(e.target.value) || 0)} className="w-16 h-8 text-xs" /><span className="text-xs text-muted-foreground">deg</span></div>
          <div className="space-y-2"><div className="flex items-center justify-between"><Label>Color Stops</Label><Button variant="outline" size="sm" onClick={addStop}>Add Stop</Button></div>
            {stops.map((stop, i) => <div key={i} className="flex items-center gap-2"><input type="color" value={stop.color} onChange={(e) => { const n = [...stops]; n[i] = { ...n[i], color: e.target.value }; setStops(n); }} className="h-8 w-8 rounded cursor-pointer" /><Input value={stop.color} onChange={(e) => { const n = [...stops]; n[i] = { ...n[i], color: e.target.value }; setStops(n); }} className="h-8 text-xs font-mono w-24" /><input type="range" min={0} max={100} value={stop.position} onChange={(e) => { const n = [...stops]; n[i] = { ...n[i], position: parseInt(e.target.value) }; setStops(n); }} className="flex-1" /><span className="text-xs w-8 text-right">{stop.position}%</span><Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => removeStop(i)} disabled={stops.length <= 2}>×</Button></div>)}
          </div>
          <div className="space-y-2"><Label>Presets</Label><div className="grid grid-cols-3 gap-2">{presets.map((p) => <button key={p.n} className="h-10 rounded-lg border border-border cursor-pointer hover:scale-105 transition-transform" style={{ background: `linear-gradient(90deg, ${p.s.map((s) => `${s.color} ${s.position}%`).join(", ")})` }} onClick={() => setStops([...p.s])} title={p.n} />)}</div></div>
        </div>
        <div className="space-y-4">
          <div className="h-64 rounded-2xl border border-border" style={{ background: css }} />
          <div className="p-3 rounded-lg bg-muted/50 border border-border text-sm font-mono"><span className="text-muted-foreground text-xs">CSS:</span><div className="mt-1 flex items-center justify-between"><span className="break-all">{css}</span><CopyButton text={`background: ${css};`} /></div></div>
          <div className="p-3 rounded-lg bg-muted/50 border border-border text-sm font-mono"><span className="text-muted-foreground text-xs">SVG:</span><pre className="mt-1 text-xs overflow-auto max-h-24">{svgCode}</pre><CopyButton text={svgCode} className="mt-2" /></div>
        </div>
      </div>
    </div>
  );
}
