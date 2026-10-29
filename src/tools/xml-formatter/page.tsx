import { useState, useCallback } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton, ResetButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { useToolState } from "@/lib/hooks/use-tool-state";

const DEMO = `<catalog><book id="bk101"><author>Gambardella, Matthew</author><title>XML Developer's Guide</title><price>44.95</price></book><book id="bk102"><author>Ralls, Kim</author><title>Midnight Rain</title><price>5.95</price></book></catalog>`;

function escapeXmlText(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function serialize(node: Node, depth: number, indent: number): string {
  const pad = " ".repeat(depth * indent);
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent?.trim() ?? "";
    return text ? `${pad}${escapeXmlText(text)}\n` : "";
  }
  if (node.nodeType === Node.COMMENT_NODE) {
    return `${pad}<!--${node.textContent}-->\n`;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return "";

  const el = node as Element;
  const attrs = Array.from(el.attributes).map((a) => ` ${a.name}="${a.value}"`).join("");
  const children = Array.from(el.childNodes);
  const inner = children.map((c) => serialize(c, depth + 1, indent)).join("");

  if (!children.length) return `${pad}<${el.tagName}${attrs}/>\n`;
  if (children.length === 1 && children[0].nodeType === Node.TEXT_NODE && (children[0].textContent ?? "").trim().length < 60) {
    return `${pad}<${el.tagName}${attrs}>${escapeXmlText((children[0].textContent ?? "").trim())}</${el.tagName}>\n`;
  }
  return `${pad}<${el.tagName}${attrs}>\n${inner}${pad}</${el.tagName}>\n`;
}

export default function XmlFormatterPage() {
  const [input, setInput, reset] = useToolState("xml-input", DEMO);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  const format = useCallback(() => {
    try {
      const doc = new DOMParser().parseFromString(input, "application/xml");
      const errNode = doc.querySelector("parsererror");
      if (errNode) throw new Error(errNode.textContent?.split("\n")[0] || "Invalid XML");
      setOutput(serialize(doc.documentElement, 0, indent).trimEnd());
      setError("");
    } catch (e: unknown) {
      setError((e as Error).message);
      setOutput("");
    }
  }, [input, indent]);

  const minify = useCallback(() => {
    try {
      const doc = new DOMParser().parseFromString(input, "application/xml");
      const errNode = doc.querySelector("parsererror");
      if (errNode) throw new Error(errNode.textContent?.split("\n")[0] || "Invalid XML");
      setOutput(new XMLSerializer().serializeToString(doc));
      setError("");
    } catch (e: unknown) {
      setError((e as Error).message);
      setOutput("");
    }
  }, [input]);

  const isValid = (() => {
    try {
      const doc = new DOMParser().parseFromString(input, "application/xml");
      return !doc.querySelector("parsererror");
    } catch {
      return false;
    }
  })();

  return (
    <div>
      <ToolPageHeader name="XML Formatter" description="Pretty-print, minify, and validate XML entirely in your browser" icon="Code" slug="xml-formatter" category="code" copyText={output} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Indent:</span>
              {[2, 4].map((n) => <Button key={n} size="sm" variant={indent === n ? "default" : "ghost"} className="h-7 px-2 text-xs" onClick={() => setIndent(n)}>{n}</Button>)}
            </div>
            <ResetButton onReset={() => { reset(); setOutput(""); setError(""); }} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Input</span>
            {input.trim() && <Badge variant={isValid ? "default" : "destructive"}>{isValid ? "Valid" : "Invalid"}</Badge>}
          </div>
          <Textarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[400px] font-mono text-sm" placeholder="<root>paste XML here</root>" />
          <div className="flex gap-2">
            <Button onClick={format} size="sm">Format</Button>
            <Button onClick={minify} size="sm" variant="outline">Minify</Button>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Output</span>
            <div className="ml-auto"><CopyButton text={output} /></div>
          </div>
          {error ? (
            <div className="min-h-[400px] rounded-lg border border-destructive/50 bg-destructive/10 p-4 flex items-start gap-2"><AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" /><span className="text-sm text-destructive font-mono">{error}</span></div>
          ) : (
            <pre className="min-h-[400px] rounded-lg border border-border bg-muted/50 p-4 overflow-auto text-sm font-mono whitespace-pre-wrap">{output || <span className="text-muted-foreground">Output will appear here...</span>}</pre>
          )}
        </div>
      </div>
    </div>
  );
}
