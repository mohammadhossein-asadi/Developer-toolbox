"use client";
import { Link } from "react-router-dom";
import { tools, categories } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCommandPalette } from "@/lib/hooks/use-command-palette";
import {
  Search, Command, Wand2, Zap, Shield, ArrowRight, Sparkles,
  Code, FileText, Palette, ArrowLeftRight, Braces, KeyRound, Binary,
  Fingerprint, QrCode, Regex, Rainbow, Clock, Paintbrush, Hash, Link as LinkIcon,
  Globe, Ruler, Network, ShieldCheck, Container, PenTool, Database, FileKey,
  ScanText, Lock, Table, Scissors, Terminal, LayoutGrid, GitCompare, CaseSensitive, SwatchBook,
} from "lucide-react";
import { useState, useEffect } from "react";

const iconMap: Record<string, React.ElementType> = {
  Braces, KeyRound, Binary, Fingerprint, QrCode, Regex, Palette, Rainbow,
  Clock, FileText, Code, Paintbrush, Sparkles, Hash, Link: LinkIcon,
  ArrowLeftRight, CaseSensitive, Globe, Ruler, Network, ShieldCheck,
  Container, PenTool, Database, FileKey, ScanText, Lock, Table, Scissors,
  Terminal, LayoutGrid, GitCompare, SwatchBook, Shield,
};

const catMeta: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  code: { icon: Code, color: "text-blue-400", bg: "bg-blue-500/10" },
  text: { icon: FileText, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  design: { icon: Palette, color: "text-purple-400", bg: "bg-purple-500/10" },
  conversion: { icon: ArrowLeftRight, color: "text-amber-400", bg: "bg-amber-500/10" },
  generator: { icon: Wand2, color: "text-pink-400", bg: "bg-pink-500/10" },
};

const heroWords = ["Format", "Decode", "Generate", "Convert", "Transform", "Optimize"];

function getIcon(name: string) { return iconMap[name] || Code; }

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const { open } = useCommandPalette();
  const [heroIdx, setHeroIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setHeroIdx((i) => (i + 1) % heroWords.length); setVisible(true); }, 300);
    }, 2500);
    return () => clearInterval(iv);
  }, []);

  const filtered = tools.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()) || t.keywords.some((k) => k.includes(search.toLowerCase())));
  const grouped = categories.map((cat) => ({ ...cat, tools: filtered.filter((t) => t.category === cat.slug) })).filter((g) => g.tools.length > 0);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 px-4 md:px-6">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-primary/20 blur-[120px] animate-pulse" />
          <div className="absolute top-10 -right-40 w-96 h-96 rounded-full bg-purple-500/15 blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-cyan-500/10 blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-muted/50 text-xs text-muted-foreground mb-6 animate-fade-in">
            <Sparkles className="h-3 w-3 text-primary" />
            <span>40+ developer tools — 100% client-side, privacy-first</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 animate-fade-in">
            <span className="text-foreground">The Ultimate</span><br />
            <span className="animate-gradient-text">Developer Toolbox</span>
          </h1>
          <div className="h-8 md:h-10 mb-4 animate-fade-in">
            <span className={`text-lg md:text-2xl text-muted-foreground transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
              {heroWords[heroIdx]} your JSON, JWTs, hashes, and more.
            </span>
          </div>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto mb-8 animate-fade-in">
            A premium, all-in-one toolkit for modern developers. Every tool runs in your browser — no data leaves your device.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 animate-fade-in">
            <a href="#tools" className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:scale-[1.02] text-sm">
              Explore Tools <ArrowRight className="h-4 w-4" />
            </a>
            <button onClick={open} className="inline-flex items-center gap-2 h-11 px-6 rounded-xl border border-border bg-background font-medium hover:bg-muted transition-all text-sm">
              <Command className="h-4 w-4" /> Quick Search
            </button>
          </div>
          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground animate-fade-in">
            <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-yellow-500" /> Instant Speed</span>
            <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-green-500" /> 100% Private</span>
            <span className="flex items-center gap-1.5"><Wand2 className="h-3.5 w-3.5 text-purple-500" /> 40+ Tools</span>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="px-4 md:px-6 pb-16 max-w-7xl mx-auto">
        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search 40+ developer tools..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-11 h-12 text-sm glass rounded-xl" />
          <button onClick={open} className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer border border-border rounded-md px-1.5 py-0.5">
            <Command className="h-2.5 w-2.5" />K
          </button>
        </div>

        {/* Category sections */}
        <div className="space-y-10">
          {grouped.map((group, gi) => {
            const meta = catMeta[group.slug] || catMeta.code;
            const CatIcon = meta.icon;
            return (
              <div key={group.slug}>
                {/* Category header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-8 w-8 rounded-lg ${meta.bg} flex items-center justify-center`}>
                    <CatIcon className={`h-4 w-4 ${meta.color}`} />
                  </div>
                  <h2 className="text-lg font-semibold">{group.name}</h2>
                  <Badge variant="secondary" className="rounded-full text-[10px] px-2 py-0">{group.tools.length}</Badge>
                  <div className="flex-1 h-px bg-border/50 ml-2" />
                </div>

                {/* Tool grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {group.tools.map((tool, ti) => {
                    const ToolIcon = getIcon(tool.icon);
                    const delay = (gi * 50 + ti * 30);
                    return (
                      <Link key={tool.slug} to={`/tools/${tool.slug}`} style={{ animationDelay: `${delay}ms` }}>
                        <div className="group relative h-full rounded-xl border border-border/60 bg-card/50 p-4 transition-all duration-200 hover:border-primary/30 hover:bg-card hover:shadow-md hover:shadow-primary/5 hover:-translate-y-0.5 cursor-pointer animate-fade-in">
                          {/* Gradient border on hover */}
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                          <div className="flex items-start gap-3">
                            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                              <ToolIcon className="h-4.5 w-4.5 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="text-sm font-medium group-hover:text-primary transition-colors leading-tight">{tool.name}</h3>
                              <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">{tool.description}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No tools found for &quot;{search}&quot;</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4 text-center text-[11px] text-muted-foreground">
        <p>Built with React, Vite, and Tailwind CSS — All tools run 100% client-side.</p>
      </footer>
    </div>
  );
}
