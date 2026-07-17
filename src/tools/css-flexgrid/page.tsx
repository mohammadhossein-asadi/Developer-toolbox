"use client";
import { useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => { setFlexProps({direction:"row",wrap:"wrap",justify:"flex-start",align:"stretch",gap:"16"}); }}>Load Demo</Button></div>
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CssFlexgridPage() {
  const [mode, setMode] = useState<"flex" | "grid">("flex");
  const [flexProps, setFlexProps] = useState({ direction: "row", wrap: "wrap", justify: "flex-start", align: "stretch", gap: "16" });
  const [gridProps, setGridProps] = useState({ columns: "3", rows: "auto", gap: "16", colSpan: "1" });
  const [items, setItems] = useState(6);

  const flexCss = `display: flex;\nflex-direction: ${flexProps.direction};\nflex-wrap: ${flexProps.wrap};\njustify-content: ${flexProps.justify};\nalign-items: ${flexProps.align};\ngap: ${flexProps.gap}px;`;
  const gridCss = `display: grid;\ngrid-template-columns: repeat(${gridProps.columns}, 1fr);\ngrid-template-rows: ${gridProps.rows};\ngap: ${gridProps.gap}px;`;
  const css = mode === "flex" ? flexCss : gridCss;
  const containerStyle = mode === "flex"
    ? { display: "flex", flexDirection: flexProps.direction as any, flexWrap: flexProps.wrap as any, justifyContent: flexProps.justify as any, alignItems: flexProps.align as any, gap: `${flexProps.gap}px` }
    : { display: "grid", gridTemplateColumns: `repeat(${gridProps.columns}, 1fr)`, gridTemplateRows: gridProps.rows, gap: `${gridProps.gap}px` };

  return (
    <div>
      <ToolPageHeader name="CSS Flexbox & Grid Generator" description="Visual interactive playground outputting CSS/Tailwind code" icon="LayoutGrid" slug="css-flexgrid" category="design" copyText={css} />
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => { setFlexProps({direction:"row",wrap:"wrap",justify:"flex-start",align:"stretch",gap:"16"}); }}>Load Demo</Button></div>
      <div className="space-y-4">
        <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}><TabsList><TabsTrigger value="flex">Flexbox</TabsTrigger><TabsTrigger value="grid">Grid</TabsTrigger></TabsList></Tabs>
        {mode === "flex" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries({ direction: ["row","column","row-reverse","column-reverse"], wrap: ["nowrap","wrap","wrap-reverse"], justify: ["flex-start","center","flex-end","space-between","space-around","space-evenly"], align: ["stretch","flex-start","center","flex-end","baseline"] }).map(([key, opts]) => (
              <div key={key} className="space-y-1"><Label className="text-xs capitalize">{key}</Label><select value={flexProps[key as keyof typeof flexProps]} onChange={(e) => setFlexProps((p) => ({...p, [key]: e.target.value}))} className="w-full h-8 rounded-lg border border-input bg-background px-2 text-xs">{opts.map((o) => <option key={o} value={o}>{o}</option>)}</select></div>
            ))}
            <div className="space-y-1"><Label className="text-xs">Gap (px)</Label><Input value={flexProps.gap} onChange={(e) => setFlexProps((p) => ({...p, gap: e.target.value}))} className="h-8 text-xs" /></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="space-y-1"><Label className="text-xs">Columns</Label><Input value={gridProps.columns} onChange={(e) => setGridProps((p) => ({...p, columns: e.target.value}))} className="h-8 text-xs" /></div>
            <div className="space-y-1"><Label className="text-xs">Rows</Label><Input value={gridProps.rows} onChange={(e) => setGridProps((p) => ({...p, rows: e.target.value}))} className="h-8 text-xs" /></div>
            <div className="space-y-1"><Label className="text-xs">Gap (px)</Label><Input value={gridProps.gap} onChange={(e) => setGridProps((p) => ({...p, gap: e.target.value}))} className="h-8 text-xs" /></div>
          </div>
        )}
        <div className="flex items-center gap-2"><Label className="text-xs">Items:</Label><Input type="number" min={1} max={20} value={items} onChange={(e) => setItems(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))} className="w-16 h-8 text-xs" /></div>
        <div className="rounded-lg border border-border bg-background p-4 min-h-[200px]" style={containerStyle}>
          {Array.from({ length: items }, (_, i) => <div key={i} className="rounded-lg bg-primary/20 border border-primary/30 p-4 text-center text-xs font-medium text-primary">{i + 1}</div>)}
        </div>
        <div className="p-3 rounded-lg bg-muted/50 border border-border text-sm font-mono whitespace-pre-wrap"><CopyButton text={css} className="float-right" />{css}</div>
      </div>
    </div>
  );
}
