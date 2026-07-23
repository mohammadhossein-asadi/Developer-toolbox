import { useState, useCallback } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function Base64ToolPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [urlSafe, setUrlSafe] = useState(false);

  const process = useCallback(() => {
    try {
      if (mode === "encode") {
        let b = btoa(new TextEncoder().encode(input).reduce((s, b) => s + String.fromCharCode(b), ""));
        if (urlSafe) b = b.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
        setOutput(b);
      } else {
        let b = input; if (urlSafe) { b = b.replace(/-/g, "+").replace(/_/g, "/"); while (b.length % 4) b += "="; }
        const bytes = Uint8Array.from(atob(b), (c) => c.charCodeAt(0));
        setOutput(new TextDecoder().decode(bytes));
      }
    } catch { setOutput("Error: Invalid input"); }
  }, [input, mode, urlSafe]);

  return (
    <div>
      <ToolPageHeader name="Base64 Tool" description="Encode and decode Base64 strings and files" icon="Binary" slug="base64-tool" category="conversion" copyText={output} />
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => {setInput("Hello, Developer Toolbox!")}}>Load Demo</Button></div>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant={mode === "encode" ? "default" : "outline"} size="sm" onClick={() => setMode("encode")}><ArrowUp className="h-4 w-4" /> Encode</Button>
            <Button variant={mode === "decode" ? "default" : "outline"} size="sm" onClick={() => setMode("decode")}><ArrowDown className="h-4 w-4" /> Decode</Button>
          </div>
          <div className="flex items-center gap-2 ml-auto"><Switch id="url-safe" checked={urlSafe} onCheckedChange={setUrlSafe} /><Label htmlFor="url-safe" className="text-sm">URL Safe</Label></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-sm font-medium">Input</span>
            <Textarea placeholder={mode === "encode" ? "Enter text..." : "Enter Base64..."} value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[200px] font-mono text-sm" />
            <Button onClick={process} size="sm">{mode === "encode" ? "Encode" : "Decode"}</Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between"><span className="text-sm font-medium">Output</span>{output && <CopyButton text={output} />}</div>
            <pre className="min-h-[200px] rounded-lg border border-border bg-muted/50 p-4 overflow-auto text-sm font-mono whitespace-pre-wrap break-all">{output || <span className="text-muted-foreground">Output will appear here...</span>}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
