import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Command } from "cmdk";
import { useCommandPalette } from "@/lib/hooks/use-command-palette";
import { tools, getIcon } from "@/lib/constants";
import { Home } from "lucide-react";

export function CommandPalette() {
  const { isOpen, open, close } = useCommandPalette();
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); useCommandPalette.getState().toggle(); }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const run = (action: () => void) => { close(); action(); };

  return (
    <Command.Dialog open={isOpen} onOpenChange={(v) => v ? open() : close()} label="Command Palette" className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={close} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg glass rounded-2xl overflow-hidden">
        <Command.Input placeholder="Search tools, actions..." className="h-12 w-full bg-transparent border-b border-border px-4 text-sm outline-none" />
        <Command.List className="max-h-[400px] p-2 overflow-auto">
          <Command.Empty className="py-6 text-center text-sm text-muted-foreground">No results found.</Command.Empty>
          <Command.Group heading="Tools" className="px-2">
            {tools.map((tool) => {
              const Icon = getIcon(tool.icon);
              return (
                <Command.Item key={tool.slug} value={tool.name} onSelect={() => run(() => navigate(`/tools/${tool.slug}`))} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer aria-selected:bg-accent">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="font-medium">{tool.name}</div>
                    <div className="text-xs text-muted-foreground">{tool.description}</div>
                  </div>
                </Command.Item>
              );
            })}
          </Command.Group>
          <Command.Separator className="my-2 h-px bg-border" />
          <Command.Group heading="Actions" className="px-2">
            <Command.Item onSelect={() => run(() => navigate("/"))} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm cursor-pointer aria-selected:bg-accent">
              <Home className="h-4 w-4 text-muted-foreground" /> Go to Dashboard
            </Command.Item>
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
}