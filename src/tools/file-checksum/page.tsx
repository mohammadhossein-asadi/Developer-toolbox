import { useState, useRef, useCallback } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, File as FileIcon } from "lucide-react";
import { formatBytes } from "@/lib/utils";
import { md5 } from "js-md5";

async function shaHex(algo: "SHA-1" | "SHA-256" | "SHA-512", data: ArrayBuffer): Promise<string> {
  const digest = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function crc32Hex(data: ArrayBuffer): string {
  const bytes = new Uint8Array(data);
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc ^= bytes[i];
    for (let bit = 0; bit < 8; bit++) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
    }
  }
  return ((crc ^ 0xffffffff) >>> 0).toString(16).padStart(8, "0");
}

interface Result {
  name: string;
  size: number;
  md5: string;
  sha1: string;
  sha256: string;
  sha512: string;
  crc32: string;
}

export default function FileChecksumPage() {
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const process = useCallback(async (file: File) => {
    setBusy(true);
    try {
      const buf = await file.arrayBuffer();
      const [md5h, s1, s256, s512] = await Promise.all([
        Promise.resolve(md5(new Uint8Array(buf))),
        shaHex("SHA-1", buf),
        shaHex("SHA-256", buf),
        shaHex("SHA-512", buf),
      ]);
      setResult({ name: file.name, size: file.size, md5: md5h, sha1: s1, sha256: s256, sha512: s512, crc32: crc32Hex(buf) });
    } finally {
      setBusy(false);
    }
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) process(file);
  };

  const rows: Array<[string, string]> = result
    ? [
        ["MD5", result.md5],
        ["SHA-1", result.sha1],
        ["SHA-256", result.sha256],
        ["SHA-512", result.sha512],
        ["CRC32", result.crc32],
      ]
    : [];

  return (
    <div>
      <ToolPageHeader name="File Checksum" description="Compute MD5, SHA-1/256/512, and CRC32 of any file locally" icon="Fingerprint" slug="file-checksum" category="conversion" />
      <div className="max-w-3xl space-y-6">
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === "Enter") inputRef.current?.click(); }}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-colors ${dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 hover:bg-muted/30"}`}
        >
          <UploadCloud className={`h-10 w-10 ${dragOver ? "text-primary" : "text-muted-foreground"}`} />
          <div>
            <p className="font-medium text-sm">Drop a file here or click to browse</p>
            <p className="text-xs text-muted-foreground mt-1">Files are hashed in your browser — never uploaded</p>
          </div>
          <input ref={inputRef} type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) process(f); }} />
        </div>

        {busy && <p className="text-sm text-muted-foreground text-center">Hashing…</p>}

        {result && !busy && (
          <div className="rounded-xl border border-border bg-card p-4 space-y-3">
            <div className="flex items-center gap-3 pb-2 border-b border-border">
              <FileIcon className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium truncate">{result.name}</span>
              <Badge variant="secondary" className="ml-auto">{formatBytes(result.size)}</Badge>
            </div>
            {rows.map(([label, hash]) => (
              <div key={label} className="flex items-center gap-3">
                <Badge variant="outline" className="w-20 justify-center shrink-0 font-mono text-[10px]">{label}</Badge>
                <code className="flex-1 text-xs font-mono break-all text-muted-foreground">{hash}</code>
                <CopyButton text={hash} />
              </div>
            ))}
            <div className="pt-2 border-t border-border flex justify-end">
              <CopyButton text={rows.map(([l, h]) => `${l.toLowerCase()}: ${h}`).join("\n")} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
