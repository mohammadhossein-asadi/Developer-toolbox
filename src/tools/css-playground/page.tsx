"use client";
import { useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => setCss(".box {\n  width: 150px; height: 150px;\n  background: linear-gradient(135deg, #667eea, #764ba2);\n  border-radius: 16px;\n  display: flex; align-items: center; justify-content: center;\n  color: white; font-weight: bold;\n  transition: transform 0.3s;\n  cursor: pointer;\n}\n.box:hover { transform: translateY(-8px) scale(1.05); }")}>Load Demo</Button></div>
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download } from "lucide-react";
import { downloadFile } from "@/lib/utils";

const defaultCss = `.box {
  width: 150px; height: 150px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 16px; display: flex; align-items: center; justify-content: center;
  color: white; font-weight: bold; font-size: 1.2rem;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer;
}
.box:hover { transform: translateY(-8px) scale(1.05); box-shadow: 0 16px 48px rgba(102, 126, 234, 0.6); }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.box.animated { animation: float 3s ease-in-out infinite; }`;

const previews: Record<string, string> = {
  box: `<div class="box">Hover me!</div>`,
  text: `<div class="styled-text">Hello World</div>`,
  card: `<div class="card"><h3>Card Title</h3><p>Card content goes here.</p></div>`,
};

export default function CssPlaygroundPage() {
  const [css, setCss] = useState(defaultCss);
  const [preview, setPreview] = useState<"box" | "text" | "card">("box");

  const fullHtml = `<!DOCTYPE html><html><head><style>body{display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#0a0a0a;font-family:system-ui}.styled-text{font-size:2rem;font-weight:bold}.card{padding:2rem;background:#1a1a1a;border-radius:12px;border:1px solid #333;color:white}.card h3{margin:0 0 .5rem}.card p{margin:0;color:#999}${css}</style></head><body>${previews[preview]}</body></html>`;

  return (
    <div>
      <ToolPageHeader name="CSS Playground" description="Experiment with CSS in real-time with live preview" icon="Paintbrush" slug="css-playground" category="design" copyText={css} />
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => setCss(".box {\n  width: 150px; height: 150px;\n  background: linear-gradient(135deg, #667eea, #764ba2);\n  border-radius: 16px;\n  display: flex; align-items: center; justify-content: center;\n  color: white; font-weight: bold;\n  transition: transform 0.3s;\n  cursor: pointer;\n}\n.box:hover { transform: translateY(-8px) scale(1.05); }")}>Load Demo</Button></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">CSS</span>
            <Button variant="outline" size="sm" onClick={() => downloadFile(css, "styles.css", "text/css")} className="ml-auto"><Download className="h-4 w-4" /> .css</Button>
          </div>
          <Textarea value={css} onChange={(e) => setCss(e.target.value)} className="min-h-[400px] font-mono text-sm" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Preview</span>
            <Tabs value={preview} onValueChange={(v) => setPreview(v as typeof preview)}><TabsList className="h-7"><TabsTrigger value="box" className="text-xs px-2 h-5">Box</TabsTrigger><TabsTrigger value="text" className="text-xs px-2 h-5">Text</TabsTrigger><TabsTrigger value="card" className="text-xs px-2 h-5">Card</TabsTrigger></TabsList></Tabs>
          </div>
          <div className="rounded-lg border border-border bg-[#0a0a0a] overflow-hidden flex items-center justify-center min-h-[400px]">
            <iframe srcDoc={fullHtml} className="w-full h-[400px] border-0" sandbox="allow-scripts" />
          </div>
        </div>
      </div>
    </div>
  );
}
