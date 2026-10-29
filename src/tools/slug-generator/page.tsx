import { useMemo, useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton, ResetButton } from "@/components/shared/copy-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToolState } from "@/lib/hooks/use-tool-state";
import { slugify } from "@/lib/slug";

export default function SlugGeneratorPage() {
  const [input, setInput, reset] = useToolState("slug-input", "10 Tips for Better REST API Design (2026 Edition)");
  const [separator, setSeparator] = useState("-");

  const slugs = useMemo(() => {
    const lines = input.split("\n").map((l) => l.trim()).filter(Boolean);
    return lines.map((line) => ({ original: line, slug: slugify(line, separator) }));
  }, [input, separator]);

  const allSlugs = slugs.map((s) => s.slug).join("\n");

  return (
    <div>
      <ToolPageHeader name="Slug Generator" description="Turn any text into clean, URL-safe slugs with diacritics support" icon="Link" slug="slug-generator" category="text" copyText={allSlugs} />
      <div className="max-w-4xl space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="slug-input">Text (one per line for batch mode)</Label>
            <ResetButton onReset={() => { reset(); }} />
          </div>
          <Textarea id="slug-input" value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[120px] font-mono text-sm" placeholder="My Great Blog Post Title!" />
        </div>

        <div className="flex items-center gap-2">
          <Label className="text-xs text-muted-foreground">Separator:</Label>
          {["-", "_"].map((sep) => (
            <Button key={sep} size="sm" variant={separator === sep ? "default" : "outline"} className="font-mono" onClick={() => setSeparator(sep)}>
              {sep === "-" ? "dash ( - )" : "underscore ( _ )"}
            </Button>
          ))}
          <div className="ml-auto"><CopyButton text={allSlugs} /></div>
        </div>

        <div className="rounded-xl border border-border divide-y divide-border overflow-hidden">
          {slugs.map((s, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-card/50 hover:bg-card transition-colors">
              <div className="min-w-0 flex-1">
                <div className="text-xs text-muted-foreground truncate">{s.original}</div>
                <code className="text-sm font-mono text-primary break-all">{s.slug}</code>
              </div>
              <CopyButton text={s.slug} />
            </div>
          ))}
          {slugs.length === 0 && <div className="p-8 text-center text-sm text-muted-foreground">Enter some text above to generate slugs</div>}
        </div>
      </div>
    </div>
  );
}
