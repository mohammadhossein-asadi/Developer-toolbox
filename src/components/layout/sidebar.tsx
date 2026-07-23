import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { tools, categories, getIcon } from "@/lib/constants";
import {
  ChevronDown, ChevronRight, Home, Search, Code, FileText, Palette, ArrowLeftRight, Wand2,
} from "lucide-react";
import { useState, useEffect } from "react";

const catIcons: Record<string, React.ElementType> = { code: Code, text: FileText, design: Palette, conversion: ArrowLeftRight, generator: Wand2 };

export function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const location = useLocation();
  const [expanded, setExpanded] = useState<Set<string>>(new Set(categories.map((c) => c.slug)));
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (isOpen === false) setFilter("");
  }, [isOpen]);

  const toggle = (slug: string) => setExpanded((p) => { const n = new Set(p); n.has(slug) ? n.delete(slug) : n.add(slug); return n; });

  const filtered = filter
    ? tools.filter((t) => t.name.toLowerCase().includes(filter.toLowerCase()) || t.keywords.some((k) => k.includes(filter.toLowerCase())))
    : null;

  const grouped = categories.map((cat) => ({
    ...cat,
    tools: filtered ? filtered.filter((t) => t.category === cat.slug) : tools.filter((t) => t.category === cat.slug),
  })).filter((g) => g.tools.length > 0);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />}

      <aside className={cn(
        "flex flex-col w-64 border-r border-border bg-card/50 h-screen select-none transition-transform duration-300 z-50",
        "fixed lg:sticky lg:top-0 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header */}
        <div className="p-3 border-b border-border flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-sm hover:opacity-80 transition-opacity" onClick={onClose}>
            <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
              <Wand2 className="h-3 w-3 text-primary-foreground" />
            </div>
            <span>DevToolbox</span>
          </Link>
          <button onClick={onClose} className="lg:hidden h-6 w-6 flex items-center justify-center rounded hover:bg-muted text-muted-foreground" aria-label="Close navigation menu">
            ✕
          </button>
        </div>

        {/* Search filter */}
        <div className="px-2 py-2 border-b border-border">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter..."
              className="w-full h-7 pl-7 pr-2 text-xs rounded-md bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Explorer tree */}
        <nav className="flex-1 overflow-y-auto py-1 px-1" aria-label="Tool navigation">
          <Link
            to="/"
            onClick={onClose}
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium transition-colors",
              location.pathname === "/" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            aria-current={location.pathname === "/" ? "page" : undefined}
          >
            <Home className="h-3.5 w-3.5 shrink-0" />
            Dashboard
          </Link>

          {grouped.map((group) => {
            const GroupIcon = catIcons[group.slug] || Code;
            const isOpenGroup = expanded.has(group.slug);

            return (
              <div key={group.slug} className="mt-1">
                <button
                  onClick={() => toggle(group.slug)}
                  className="flex items-center gap-1.5 w-full px-2 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors cursor-pointer"
                  aria-expanded={isOpenGroup}
                >
                  {isOpenGroup ? <ChevronDown className="h-3 w-3 shrink-0" /> : <ChevronRight className="h-3 w-3 shrink-0" />}
                  <GroupIcon className="h-3 w-3 shrink-0" />
                  {group.name}
                  <span className="ml-auto text-[10px] font-normal opacity-60">{group.tools.length}</span>
                </button>

                {isOpenGroup && (
                  <div className="ml-2 border-l border-border/50 pl-2 space-y-px">
                    {group.tools.map((tool) => {
                      const Icon = getIcon(tool.icon);
                      const active = location.pathname === `/tools/${tool.slug}`;
                      return (
                        <Link
                          key={tool.slug}
                          to={`/tools/${tool.slug}`}
                          onClick={onClose}
                          className={cn(
                            "flex items-center gap-2 rounded-md px-2 py-1 text-xs transition-colors",
                            active
                              ? "bg-primary/15 text-primary font-medium"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                          aria-current={active ? "page" : undefined}
                        >
                          <Icon className="h-3.5 w-3.5 shrink-0 opacity-70" />
                          <span className="truncate">{tool.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-2 border-t border-border">
          <div className="text-[10px] text-muted-foreground text-center opacity-50">
            {tools.length} tools • 100% client-side
          </div>
        </div>
      </aside>
    </>
  );
}