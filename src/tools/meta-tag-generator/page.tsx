import { useMemo, useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton, ResetButton } from "@/components/shared/copy-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToolState } from "@/lib/hooks/use-tool-state";

export default function MetaTagGeneratorPage() {
  const [title, setTitle, reset] = useToolState("meta-title", "My Awesome Project");
  const [description, setDescription] = useToolState("meta-description", "A short, compelling description that shows up in search results and social cards.");
  const [url, setUrl] = useToolState("meta-url", "https://example.com");
  const [image, setImage] = useToolState("meta-image", "https://example.com/og-image.png");
  const [siteName, setSiteName] = useToolState("meta-site-name", "My Awesome Project");
  const [twitterHandle, setTwitterHandle] = useToolState("meta-twitter", "@yourhandle");

  const html = useMemo(() => {
    const lines = [
      `<!-- Primary Meta Tags -->`,
      `<title>${title}</title>`,
      `<meta name="title" content="${title}" />`,
      `<meta name="description" content="${description}" />`,
      ``,
      `<!-- Open Graph / Facebook -->`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:title" content="${title}" />`,
      `<meta property="og:description" content="${description}" />`,
      `<meta property="og:image" content="${image}" />`,
      ``,
      `<!-- Twitter / X -->`,
      `<meta property="twitter:card" content="summary_large_image" />`,
      `<meta property="twitter:url" content="${url}" />`,
      `<meta property="twitter:title" content="${title}" />`,
      `<meta property="twitter:description" content="${description}" />`,
      `<meta property="twitter:image" content="${image}" />`,
    ];
    if (siteName) lines.splice(7, 0, `<meta property="og:site_name" content="${siteName}" />`);
    if (twitterHandle) lines.push(`<meta name="twitter:site" content="${twitterHandle}" />`);
    return lines.join("\n");
  }, [title, description, url, image, siteName, twitterHandle]);

  const titleLen = title.length;
  const descLen = description.length;

  return (
    <div>
      <ToolPageHeader name="Meta Tag Generator" description="Generate SEO, Open Graph, and Twitter card tags with a live preview" icon="Globe" slug="meta-tag-generator" category="generator" copyText={html} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-end"><ResetButton onReset={() => { reset(); }} /></div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label htmlFor="mt-title">Page title</Label><span className={`text-xs ${titleLen > 60 ? "text-destructive" : "text-muted-foreground"}`}>{titleLen}/60</span></div>
            <Input id="mt-title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><Label htmlFor="mt-desc">Description</Label><span className={`text-xs ${descLen > 160 ? "text-destructive" : "text-muted-foreground"}`}>{descLen}/160</span></div>
            <Textarea id="mt-desc" value={description} onChange={(e) => setDescription(e.target.value)} maxLength={300} className="min-h-[80px]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mt-url">Page URL</Label>
            <Input id="mt-url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mt-image">Social image URL (1200×630 recommended)</Label>
            <Input id="mt-image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/og.png" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mt-site">Site name (optional)</Label>
              <Input id="mt-site" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mt-tw">Twitter handle (optional)</Label>
              <Input id="mt-tw" value={twitterHandle} onChange={(e) => setTwitterHandle(e.target.value)} placeholder="@handle" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Google SERP preview */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground uppercase tracking-wider">Google search preview</Label>
            <div className="rounded-xl border border-border bg-white p-4 space-y-1">
              <div className="text-xs text-[#4d5156]">{url}</div>
              <div className="text-lg text-[#1a0dab] truncate">{title || "Page title"}</div>
              <div className="text-xs text-[#4d5156] line-clamp-2">{description || "Page description appears here..."}</div>
            </div>
          </div>

          {/* Social card preview */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground uppercase tracking-wider">Social card preview</Label>
            <div className="rounded-xl border border-border overflow-hidden bg-card">
              {image ? (
                <div className="h-40 bg-muted flex items-center justify-center overflow-hidden">
                  <img src={image} alt="Social preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              ) : null}
              <div className="p-3 space-y-0.5">
                <div className="text-[10px] text-muted-foreground uppercase">{siteName || url}</div>
                <div className="text-sm font-medium truncate">{title || "Page title"}</div>
                <div className="text-xs text-muted-foreground line-clamp-2">{description || "Description..."}</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider">Generated HTML</Label>
              <CopyButton text={html} />
            </div>
            <pre className="rounded-xl border border-border bg-muted/50 p-4 text-xs font-mono overflow-auto max-h-[300px]">{html}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
