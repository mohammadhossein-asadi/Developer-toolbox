import { useState, useMemo } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";

interface Agent {
  name: string;
  allow: string[];
  disallow: string[];
  crawlDelay: number | null;
}

const PRESET_AGENTS = ["*", "Googlebot", "Bingbot", "GPTBot", "ClaudeBot", "CCBot"];

export default function RobotsTxtGeneratorPage() {
  const [sitemap, setSitemap] = useState("https://example.com/sitemap.xml");
  const [agents, setAgents] = useState<Agent[]>([
    { name: "*", allow: ["/"], disallow: ["/admin", "/api"], crawlDelay: null },
    { name: "GPTBot", allow: [], disallow: ["/"], crawlDelay: null },
  ]);

  const output = useMemo(() => {
    const blocks = agents.map((a) => {
      const lines = [`User-agent: ${a.name}`];
      a.disallow.forEach((d) => lines.push(`Disallow: ${d || "/"}`));
      a.allow.forEach((l) => lines.push(`Allow: ${l}`));
      if (a.crawlDelay !== null) lines.push(`Crawl-delay: ${a.crawlDelay}`);
      return lines.join("\n");
    });
    const sitemapLine = sitemap.trim() ? `\nSitemap: ${sitemap.trim()}` : "";
    return `${blocks.join("\n\n")}${sitemapLine}\n`;
  }, [agents, sitemap]);

  const update = (i: number, patch: Partial<Agent>) => setAgents((as) => as.map((a, idx) => (idx === i ? { ...a, ...patch } : a)));

  return (
    <div>
      <ToolPageHeader name="robots.txt Generator" description="Build robots.txt rules to allow, block, or rate-limit crawlers" icon="Container" slug="robots-txt-generator" category="generator" copyText={output} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {agents.map((agent, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Input value={agent.name} onChange={(e) => update(i, { name: e.target.value })} className="h-8 w-40 font-mono text-xs" aria-label="User-agent" />
                <div className="flex flex-wrap gap-1">
                  {PRESET_AGENTS.slice(0, 4).map((p) => (
                    <button key={p} onClick={() => update(i, { name: p })} className="text-[10px] px-1.5 py-0.5 rounded border border-border hover:bg-muted transition-colors cursor-pointer">{p}</button>
                  ))}
                </div>
                {agents.length > 1 && (
                  <Button variant="ghost" size="icon" className="h-7 w-7 ml-auto text-destructive" onClick={() => setAgents((as) => as.filter((_, idx) => idx !== i))} aria-label={`Remove agent ${agent.name}`}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Disallow paths</Label>
                  {agent.disallow.map((d, di) => (
                    <div key={di} className="flex gap-1">
                      <Input value={d} onChange={(e) => update(i, { disallow: agent.disallow.map((x, xi) => (xi === di ? e.target.value : x)) })} className="h-7 font-mono text-xs" placeholder="/path" />
                      <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => update(i, { disallow: agent.disallow.filter((_, xi) => xi !== di) })} aria-label="Remove path">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => update(i, { disallow: [...agent.disallow, ""] })}>
                    <Plus className="h-3 w-3" /> Add
                  </Button>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Allow paths (overrides)</Label>
                  {agent.allow.map((a, ai) => (
                    <div key={ai} className="flex gap-1">
                      <Input value={a} onChange={(e) => update(i, { allow: agent.allow.map((x, xi) => (xi === ai ? e.target.value : x)) })} className="h-7 font-mono text-xs" placeholder="/path" />
                      <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => update(i, { allow: agent.allow.filter((_, xi) => xi !== ai) })} aria-label="Remove path">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => update(i, { allow: [...agent.allow, ""] })}>
                    <Plus className="h-3 w-3" /> Add
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Label className="text-xs text-muted-foreground">Crawl-delay (s)</Label>
                <Input
                  type="number"
                  min={0}
                  value={agent.crawlDelay ?? ""}
                  onChange={(e) => update(i, { crawlDelay: e.target.value === "" ? null : parseInt(e.target.value, 10) })}
                  className="h-7 w-20 font-mono text-xs"
                />
              </div>
            </div>
          ))}

          <Button variant="outline" size="sm" onClick={() => setAgents((as) => [...as, { name: "*", allow: ["/"], disallow: [], crawlDelay: null }])}>
            <Plus className="h-4 w-4" /> Add user-agent block
          </Button>

          <div className="space-y-2">
            <Label htmlFor="sitemap">Sitemap URL</Label>
            <Input id="sitemap" value={sitemap} onChange={(e) => setSitemap(e.target.value)} className="font-mono text-xs" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">robots.txt</span>
            <Badge variant="secondary">{output.split("\n").length} lines</Badge>
          </div>
          <pre className="rounded-xl border border-border bg-muted/50 p-4 text-xs font-mono overflow-auto whitespace-pre-wrap">{output}</pre>
          <CopyButton text={output} />
        </div>
      </div>
    </div>
  );
}
