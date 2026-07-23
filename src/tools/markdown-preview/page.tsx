import { useState, useMemo, useEffect, useRef } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download } from "lucide-react";
import { marked } from "marked";
import hljs from "highlight.js";
import DOMPurify from "dompurify";

marked.use({ breaks: true, gfm: true });

const defaultMd = `# Developer Toolbox

## Features

- **Bold text** and *italic text*
- \`inline code\` support

### Code Example

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return true;
}
\`\`\`

### Table

| Feature | Status |
|---------|--------|
| JSON Formatter | Done |
| JWT Decoder | Done |
| QR Generator | Done |

### Blockquote

> "The best developer tools are the ones that feel invisible."

### Task List

- [x] Build core UI
- [x] Add all tools
- [ ] Ship to production`;

export default function MarkdownPreviewPage() {
  const [markdown, setMarkdown] = useState(defaultMd);
  const [view, setView] = useState<"edit" | "preview" | "split">("split");
  const previewRef = useRef<HTMLDivElement>(null);

  const html = useMemo(() => DOMPurify.sanitize(marked.parse(markdown) as string), [markdown]);
  useEffect(() => { if (previewRef.current) previewRef.current.innerHTML = html; }, [html]);

  const downloadHtml = () => {
    const fullHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{font-family:system-ui;max-width:800px;margin:0 auto;padding:2rem;line-height:1.6}pre{background:#f6f8fa;padding:1rem;border-radius:6px;overflow-x:auto}code{background:#f6f8fa;padding:.2rem .4rem;border-radius:3px;font-size:85%}pre code{background:none;padding:0}table{border-collapse:collapse;width:100%}th,td{border:1px solid #d0d7de;padding:6px 13px}th{background:#f6f8fa}blockquote{border-left:4px solid #d0d7de;margin:0;padding:0 1rem;color:#656d76}</style></head><body>${html}</body></html>`;
    const blob = new Blob([fullHtml], { type: "text/html" }); const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "markdown.html"; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div>
      <ToolPageHeader name="Markdown Preview" description="Live Markdown preview with GitHub styling" icon="FileText" slug="markdown-preview" category="text" />
      <div className="flex items-center gap-2 mb-4">
        <Tabs value={view} onValueChange={(v) => setView(v as typeof view)}><TabsList><TabsTrigger value="edit">Edit</TabsTrigger><TabsTrigger value="split">Split</TabsTrigger><TabsTrigger value="preview">Preview</TabsTrigger></TabsList></Tabs>
        <Button variant="outline" size="sm" onClick={downloadHtml} className="ml-auto"><Download className="h-4 w-4" /> Export HTML</Button>
      </div>
      <div className={`grid gap-4 ${view === "split" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
        {(view === "edit" || view === "split") && <Textarea value={markdown} onChange={(e) => setMarkdown(e.target.value)} className="min-h-[500px] font-mono text-sm" placeholder="Write Markdown..." />}
        {(view === "preview" || view === "split") && <div ref={previewRef} className="min-h-[500px] rounded-lg border border-border bg-background p-6 overflow-auto [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-6 [&_p]:mb-3 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3 [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-4 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_table]:w-full [&_table]:border-collapse [&_table]:mb-4 [&_th]:border [&_th]:border-border [&_th]:px-3 [&_th]:py-2 [&_th]:bg-muted [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_a]:text-primary [&_a]:underline [&_hr]:border-border [&_hr]:my-6 [&_img]:max-w-full [&_img]:rounded-lg" />}
      </div>
    </div>
  );
}
