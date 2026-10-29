import { useState, useRef, useCallback, useEffect } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, Download } from "lucide-react";
import { formatBytes } from "@/lib/utils";

interface Info {
  name: string;
  origW: number;
  origH: number;
  size: number;
}

export default function ImageResizerPage() {
  const [info, setInfo] = useState<Info | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [lockRatio, setLockRatio] = useState(true);
  const [quality, setQuality] = useState(85);
  const [format, setFormat] = useState<"image/jpeg" | "image/webp" | "image/png">("image/webp");
  const [result, setResult] = useState<{ url: string; size: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const load = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setInfo({ name: file.name, origW: img.naturalWidth, origH: img.naturalHeight, size: file.size });
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
      setResult(null);
    };
    img.src = url;
  }, []);

  const setW = (w: number) => {
    setWidth(w);
    if (lockRatio && imgRef.current) setHeight(Math.round((w / imgRef.current.naturalWidth) * imgRef.current.naturalHeight));
  };
  const setH = (h: number) => {
    setHeight(h);
    if (lockRatio && imgRef.current) setWidth(Math.round((h / imgRef.current.naturalHeight) * imgRef.current.naturalWidth));
  };

  const process = useCallback(async () => {
    const img = imgRef.current;
    if (!img || width < 1 || height < 1) return;
    setBusy(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      if (format !== "image/png") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, format, quality / 100));
      if (!blob) return;
      setResult({ url: URL.createObjectURL(blob), size: blob.size });
    } finally {
      setBusy(false);
    }
  }, [width, height, format, quality]);

  useEffect(() => () => { if (result) URL.revokeObjectURL(result.url); }, [result]);

  const ext = format === "image/jpeg" ? "jpg" : format === "image/webp" ? "webp" : "png";

  return (
    <div>
      <ToolPageHeader name="Image Resizer" description="Resize and compress images locally — nothing is uploaded" icon="PenTool" slug="image-resizer" category="conversion" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
        <div className="space-y-4">
          <div
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => { if (e.key === "Enter") inputRef.current?.click(); }}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f?.type.startsWith("image/")) load(f); }}
            className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}
          >
            <UploadCloud className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-medium">{info ? info.name : "Drop an image or click to browse"}</p>
            {info && (
              <Badge variant="secondary">{info.origW}×{info.origH} • {formatBytes(info.size)}</Badge>
            )}
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) load(f); }} />
          </div>

          {info && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ir-w">Width (px)</Label>
                  <input id="ir-w" type="number" min={1} value={width} onChange={(e) => setW(parseInt(e.target.value, 10) || 0)} className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ir-h">Height (px)</Label>
                    <label className="flex items-center gap-1 text-[10px] text-muted-foreground cursor-pointer">
                      <input type="checkbox" checked={lockRatio} onChange={(e) => setLockRatio(e.target.checked)} className="accent-[var(--color-primary)]" /> lock ratio
                    </label>
                  </div>
                  <input id="ir-h" type="number" min={1} value={height} onChange={(e) => setH(parseInt(e.target.value, 10) || 0)} className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between"><Label className="text-xs">Quality</Label><span className="text-xs font-mono text-muted-foreground">{quality}%</span></div>
                <Slider value={[quality]} min={10} max={100} onValueChange={([v]) => setQuality(v)} />
              </div>

              <div className="flex gap-2">
                {([["WebP", "image/webp"], ["JPEG", "image/jpeg"], ["PNG", "image/png"]] as const).map(([label, f]) => (
                  <Button key={f} size="sm" variant={format === f ? "default" : "outline"} onClick={() => setFormat(f)}>{label}</Button>
                ))}
              </div>

              <Button onClick={process} disabled={busy} size="sm">{busy ? "Processing…" : "Resize & Compress"}</Button>
            </>
          )}
        </div>

        <div className="space-y-4">
          {result ? (
            <div className="space-y-3">
              <div className="rounded-xl border border-border bg-muted/30 p-4 flex items-center justify-center min-h-[200px]">
                <img src={result.url} alt="Resized preview" className="max-w-full max-h-[300px] rounded-lg" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <Badge variant="secondary">{width}×{height} • {formatBytes(result.size)}</Badge>
                {info && result.size < info.size && (
                  <Badge variant="default">−{Math.round((1 - result.size / info.size) * 100)}% smaller</Badge>
                )}
              </div>
              <Button
                onClick={() => {
                  const a = document.createElement("a");
                  a.href = result.url;
                  a.download = `${(info?.name || "image").replace(/\.[^.]+$/, "")}-${width}x${height}.${ext}`;
                  a.click();
                }}
                size="sm"
              >
                <Download className="h-4 w-4" /> Download
              </Button>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground min-h-[200px] flex items-center justify-center">
              Resized output will appear here
            </div>
          )}
          {info && (
            <p className="text-xs text-muted-foreground">
              Original: {info.origW}×{info.origH}, {formatBytes(info.size)} — processed entirely on your device with canvas.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
