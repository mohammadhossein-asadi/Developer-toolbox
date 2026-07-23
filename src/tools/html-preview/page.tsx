import { useState, useRef, useEffect } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Tablet, Smartphone } from "lucide-react";

const defaultHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { font-family: system-ui; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
    .card { background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border-radius: 16px; padding: 2rem; text-align: center; }
    h1 { margin: 0 0 0.5rem; } p { margin: 0; opacity: 0.8; }
  </style>
</head>
<body>
  <div class="card"><h1>Hello, Developer!</h1><p>Edit this HTML to see live changes</p></div>
</body>
</html>`;

type VP = "desktop" | "tablet" | "mobile";
const vpSizes: Record<VP, number> = { desktop: 100, tablet: 768, mobile: 375 };

export default function HtmlPreviewPage() {
  const [html, setHtml] = useState(defaultHtml);
  const [vp, setVp] = useState<VP>("desktop");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => { const doc = iframeRef.current?.contentDocument; if (doc) { doc.open(); doc.write(html); doc.close(); } }, [html]);

  return (
    <div>
      <ToolPageHeader name="HTML Preview" description="Live HTML/CSS/JS preview with responsive modes" icon="Code" slug="html-preview" category="code" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          <span className="text-sm font-medium">Code</span>
          <Textarea value={html} onChange={(e) => setHtml(e.target.value)} className="min-h-[500px] font-mono text-sm" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Preview</span>
            <div className="flex gap-1">
              {([["desktop", Monitor], ["tablet", Tablet], ["mobile", Smartphone]] as const).map(([k, Icon]) => (
                <Button key={k} variant={vp === k ? "default" : "ghost"} size="sm" className="h-8 px-2" onClick={() => setVp(k)} title={k}>
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-white overflow-hidden flex justify-center">
            <iframe ref={iframeRef} className="border-0 bg-white transition-all duration-300" style={{ width: vp === "desktop" ? "100%" : `${vpSizes[vp]}px`, height: "500px" }} sandbox="allow-scripts" />
          </div>
        </div>
      </div>
    </div>
  );
}
