import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Command, Sun, Moon, Home, Wand2, ArrowLeft, Menu } from "lucide-react";
import { useCommandPalette } from "@/lib/hooks/use-command-palette";
import { Button } from "@/components/ui/button";
import { getToolBySlug } from "@/lib/constants";

export function Header({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const { open } = useCommandPalette();
  const location = useLocation();
  const isToolPage = location.pathname.startsWith("/tools/");
  const slug = location.pathname.split("/tools/")[1];
  const tool = slug ? getToolBySlug(slug) : null;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-14 items-center gap-4 px-4 md:px-6">
        {/* Mobile menu button */}
        {onMenuToggle && (
          <button onClick={onMenuToggle} className="lg:hidden flex items-center justify-center h-9 w-9 rounded-lg hover:bg-muted transition-colors" aria-label="Open navigation menu">
            <Menu className="h-5 w-5" />
          </button>
        )}

        {/* Left: Logo + Back button */}
        <div className="flex items-center gap-3 min-w-0">
          {isToolPage ? (
            <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          ) : (
            <Link to="/" className="flex items-center gap-2 font-bold text-base shrink-0">
              <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
                <Wand2 className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span className="hidden sm:inline">DevToolbox</span>
            </Link>
          )}
          {isToolPage && tool && (
            <>
              <span className="text-muted-foreground hidden sm:inline">/</span>
              <span className="text-sm font-medium truncate">{tool.name}</span>
            </>
          )}
        </div>

        <div className="flex-1" />

        {/* Right: Search + Theme */}
        <button onClick={open} className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-background text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
          <Search className="h-4 w-4" />
          <span>Search...</span>
          <kbd className="pointer-events-none ml-2 h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium flex">
            <Command className="h-3 w-3" />K
          </kbd>
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "dark" | "light") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <Button variant="ghost" size="icon" className="h-9 w-9" onClick={toggle}>
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}