"use client";
import { Link } from "react-router-dom";
import { tools, categories } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
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

const catIcons: Record<string, React.ElementType> = { code: Code, text: FileText, design: Palette, conversion: ArrowLeftRight, generator: Wand2 };
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
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-primary/20 blur-[120px] animate-pulse" />
          <div className="absolute top-20 -right-40 w-96 h-96 rounded-full bg-purple-500/15 blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-cyan-500/10 blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-muted/50 text-xs text-muted-foreground mb-8 animate-fade-in">
            <Sparkles className="h-3 w-3 text-primary" />
            <span>40+ developer tools — 100% client-side, privacy-first</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in">
            <span className="text-foreground">The Ultimate</span><br />
            <span className="animate-gradient-text">Developer Toolbox</span>
          </h1>
          <div className="h-10 mb-6 animate-fade-in">
            <span className={`text-xl md:text-2xl text-muted-foreground transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
              {heroWords[heroIdx]} your JSON, JWTs, hashes, and more.
            </span>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 animate-fade-in">
            A premium, all-in-one toolkit for modern developers. Every tool runs in your browser — no data leaves your device.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-fade-in">
            <a href="#tools" className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:scale-[1.02]">
              Explore Tools <ArrowRight className="h-4 w-4" />
            </a>
            <button onClick={open} className="inline-flex items-center gap-2 h-12 px-8 rounded-xl border border-border bg-background font-medium hover:bg-muted transition-all">
              <Command className="h-4 w-4" /> Quick Search
            </button>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in">
            <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-yellow-500" /> Instant Speed</div>
            <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-green-500" /> 100% Private</div>
            <div className="flex items-center gap-2"><Wand2 className="h-4 w-4 text-purple-500" /> 40+ Tools</div>
          </div>
        </div>
      </section>

      <section id="tools" className="px-6 pb-20 max-w-7xl mx-auto">
        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search 40+ developer tools..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-12 h-14 text-base glass rounded-2xl" />
          <button onClick={open} className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <Command className="h-3 w-3" />K
          </button>
        </div>

        {grouped.map((group) => {
          const GroupIcon = catIcons[group.slug] || Code;
          return (
            <div key={group.slug} className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center"><GroupIcon className="h-4 w-4 text-primary" /></div>
                <h2 className="text-xl font-semibold">{group.name}</h2>
                <Badge variant="secondary" className="rounded-full">{group.tools.length}</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 stagger">
                {group.tools.map((tool) => {
                  const ToolIcon = getIcon(tool.icon);
                  return (
                    <Link key={tool.slug} to={`/tools/${tool.slug}`}>
                      <Card className="group glass glass-hover cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10 h-full">
                        <CardContent className="p-5">
                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                              <ToolIcon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{tool.name}</h3>
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{tool.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && <div className="text-center py-20"><p className="text-muted-foreground text-lg">No tools found for &quot;{search}&quot;</p></div>}
      </section>

      <footer className="border-t border-border py-8 px-6 text-center text-xs text-muted-foreground">
        <p>Built with React, Vite, and Tailwind CSS — All tools run 100% client-side.</p>
      </footer>
    </div>
  );
}
