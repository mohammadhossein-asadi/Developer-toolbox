"use client";
import { useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Binary } from "lucide-react";

const DEMO = '{"name":"Alice","age":30,"scores":[95,87,92],"active":true}';

function jsonToCbor(obj: unknown): Uint8Array {
  const parts: number[] = [];
  function encode(val: unknown) {
    if (val === null) { parts.push(0xf6); return; }
    if (typeof val === "boolean") { parts.push(val ? 0xf5 : 0xf4); return; }
    if (typeof val === "number") {
      if (Number.isInteger(val) && val >= 0 && val <= 23) { parts.push(0x00 + val); }
      else if (typeof val === "number" && Number.isInteger(val) && val <= 0xff) { parts.push(0x18, val); }
      else if (typeof val === "number" && Number.isInteger(val) && val <= 0xffff) { parts.push(0x19, (val >> 8) & 0xff, val & 0xff); }
      else if (typeof val === "number" && Number.isInteger(val)) { parts.push(0x1a, (val >> 24) & 0xff, (val >> 16) & 0xff, (val >> 8) & 0xff, val & 0xff); }
      else { const buf = new ArrayBuffer(8); new DataView(buf).setFloat64(0, val as number); parts.push(0xfb, ...new Uint8Array(buf)); }
      return;
    }
    if (typeof val === "string") {
      const enc = new TextEncoder().encode(val);
      if (enc.length <= 23) parts.push(0x60 + enc.length);
      else parts.push(0x78, enc.length);
      parts.push(...enc); return;
    }
    if (Array.isArray(val)) {
      if (val.length <= 23) parts.push(0x80 + val.length);
      else parts.push(0x99, (val.length >> 8) & 0xff, val.length & 0xff);
      val.forEach(encode); return;
    }
    if (typeof val === "object") {
      const entries = Object.entries(val as Record<string, unknown>);
      if (entries.length <= 23) parts.push(0xa0 + entries.length);
      else parts.push(0xb9, (entries.length >> 8) & 0xff, entries.length & 0xff);
      entries.forEach(([k, v]) => { encode(k); encode(v); });
    }
  }
  encode(obj);
  return new Uint8Array(parts);
}

function cborToJson(bytes: Uint8Array): unknown {
  let pos = 0;
  function decode(): unknown {
    if (pos >= bytes.length) throw new Error("Unexpected end");
    const byte = bytes[pos++];
    const major = byte >> 5;
    const additional = byte & 0x1f;
    if (major === 0) { if (additional <= 23) return additional; if (additional === 24) return bytes[pos++]; if (additional === 25) { const v = (bytes[pos] << 8) | bytes[pos + 1]; pos += 2; return v; } throw new Error("Unsupported int"); }
    if (major === 1) { const v = decode(); return -(v as number) - 1; }
    if (major === 3) { const len = additional <= 23 ? additional : bytes[pos++]; const str = new TextDecoder().decode(bytes.slice(pos, pos + len)); pos += len; return str; }
    if (major === 4) { const len = additional <= 23 ? additional : (bytes[pos++] << 8) | bytes[pos++]; const arr = []; for (let i = 0; i < len; i++) arr.push(decode()); return arr; }
    if (major === 5) { const len = additional <= 23 ? additional : (bytes[pos++] << 8) | bytes[pos++]; const obj: Record<string, unknown> = {}; for (let i = 0; i < len; i++) { const k = decode() as string; obj[k] = decode(); } return obj; }
    if (major === 7) { if (additional === 20) return false; if (additional === 21) return true; if (additional === 22) return null; }
    throw new Error("Unsupported type");
  }
  return decode();
}

export default function CborMsgpackPage() {
  const [input, setInput] = useState(DEMO);
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"json2cbor" | "cbor2json">("json2cbor");
  const [error, setError] = useState("");

  const convert = () => {
    try {
      if (mode === "json2cbor") {
        const obj = JSON.parse(input);
        const bytes = jsonToCbor(obj);
        setOutput(`Hex: ${Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join(" ")}\n\nBase64: ${btoa(String.fromCharCode(...bytes))}\n\nSize: ${bytes.length} bytes`);
      } else {
        const hex = input.replace(/[^0-9a-fA-F]/g, "");
        const bytes = new Uint8Array(hex.match(/.{1,2}/g)!.map((h) => parseInt(h, 16)));
        setOutput(JSON.stringify(cborToJson(bytes), null, 2));
      }
      setError("");
    } catch (e) { setError((e as Error).message); setOutput(""); }
  };

  return (
    <div>
      <ToolPageHeader name="CBOR & MsgPack Translator" description="Convert binary serialization formats to/from JSON" icon="Binary" slug="cbor-msgpack" category="conversion" copyText={output} />
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}><TabsList><TabsTrigger value="json2cbor">JSON → CBOR</TabsTrigger><TabsTrigger value="cbor2json">CBOR → JSON</TabsTrigger></TabsList></Tabs>
          <Button variant="outline" size="sm" onClick={() => setInput(DEMO)}>Load Demo</Button>
        </div>
        {error && <div className="text-sm text-destructive p-2 rounded-lg bg-destructive/10">{error}</div>}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2"><span className="text-sm font-medium">Input</span><Textarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[250px] font-mono text-xs" /></div>
          <div className="space-y-2"><div className="flex items-center justify-between"><span className="text-sm font-medium">Output</span>{output && <CopyButton text={output} />}</div><pre className="min-h-[250px] rounded-lg border border-border bg-muted/50 p-4 overflow-auto text-xs font-mono whitespace-pre-wrap">{output || "Output..."}</pre></div>
        </div>
        <Button onClick={convert} className="w-full"><Binary className="h-4 w-4" /> Convert</Button>
      </div>
    </div>
  );
}
