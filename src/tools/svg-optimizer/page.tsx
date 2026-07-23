import { useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PenTool } from "lucide-react";

const DEMO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="200.0000" height="200.0000" viewBox="0 0 200.0000 200.0000">
  <!-- This is a comment -->
  <title>Example Circle</title>
  <desc>A sample circle element</desc>
  <circle cx="100.0000" cy="100.0000" r="50.0000" fill="#6366f1" stroke-width="2.0000"/>
  <rect x="20.0000" y="20.0000" width="40.0000" height="40.0000" rx="5.0000" fill="#a855f7" opacity="0.8000"/>
</svg>`;

function optimizeSvg(svg: string, opts: { round: boolean; removeComments: boolean; removeMetadata: boolean; minify: boolean }) {
  let result = svg;
  if (opts.removeComments) result = result.replace(/<!--[\s\S]*?-->/g, "");
  if (opts.removeMetadata) {
    result = result.replace(/<title>[\s\S]*?<\/title>/g, "");
    result = result.replace(/<desc>[\s\S]*?<\/desc>/g, "");
    result = result.replace(/<metadata>[\s\S]*?<\/metadata>/g, "");
  }
  if (opts.round) {
    result = result.replace(/(\d+\.\d{3,})/g, (_, num) => parseFloat(num).toFixed(2));
  }
  if (opts.minify) {
    result = result.replace(/\s+/g, " ").replace(/> </g, "><").trim();
  }
  return result;
}

export default function SvgOptimizerPage() {
  const [input, setInput] = useState(DEMO_SVG);
  const [output, setOutput] = useState("");
  const [opts, setOpts] = useState({ round: true, removeComments: true, removeMetadata: true, minify: false });

  const optimize = () => setOutput(optimizeSvg(input, opts));
  const loadDemo = () => setInput(DEMO_SVG);
  const savings = input && output ? Math.round((1 - output.length / input.length) * 100) : 0;

  return (
    <div>
      <ToolPageHeader name="SVG Path Optimizer" description="Strip metadata, round coordinates, minify SVG with live preview" icon="PenTool" slug="svg-optimizer" category="design" copyText={output} />
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          {[["round","Round decimals"],["removeComments","Remove comments"],["removeMetadata","Remove metadata"],["minify","Minify"]].map(([k,l]) => (
            <div key={k} className="flex items-center gap-2"><Switch checked={opts[k as keyof typeof opts]} onCheckedChange={(v) => setOpts((p) => ({...p,[k]:v}))} /><Label className="text-sm">{l}</Label></div>
          ))}
          <Button variant="outline" size="sm" onClick={loadDemo}>Load Demo</Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2"><span className="text-sm font-medium">Input SVG ({input.length} chars)</span><Textarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[300px] font-mono text-xs" /></div>
          <div className="space-y-2"><div className="flex items-center justify-between"><span className="text-sm font-medium">Optimized ({output.length} chars, -{savings}%)</span>{output && <CopyButton text={output} />}</div><pre className="min-h-[300px] rounded-lg border border-border bg-muted/50 p-4 overflow-auto text-xs font-mono whitespace-pre-wrap">{output || "Output..."}</pre></div>
        </div>
        {output && (
          <div className="space-y-2"><span className="text-sm font-medium">Preview</span>
            <div className="rounded-lg border border-border bg-white p-4 flex items-center justify-center" dangerouslySetInnerHTML={{ __html: output }} />
          </div>
        )}
        <Button onClick={optimize} className="w-full"><PenTool className="h-4 w-4" /> Optimize SVG</Button>
      </div>
    </div>
  );
}
