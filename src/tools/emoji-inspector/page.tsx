import { useMemo, useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface Emoji {
  char: string;
  name: string;
  keywords: string[];
  group: string;
}

const EMOJIS: Emoji[] = [
  { char: "😀", name: "grinning face", keywords: ["smile", "happy"], group: "Smileys" },
  { char: "😂", name: "face with tears of joy", keywords: ["lol", "laugh", "cry"], group: "Smileys" },
  { char: "🥰", name: "smiling face with hearts", keywords: ["love", "hearts"], group: "Smileys" },
  { char: "😎", name: "smiling face with sunglasses", keywords: ["cool", "sunglasses"], group: "Smileys" },
  { char: "🤔", name: "thinking face", keywords: ["hmm", "think"], group: "Smileys" },
  { char: "😴", name: "sleeping face", keywords: ["sleep", "tired", "zzz"], group: "Smileys" },
  { char: "🥳", name: "partying face", keywords: ["party", "celebrate"], group: "Smileys" },
  { char: "😭", name: "loudly crying face", keywords: ["cry", "sad", "sob"], group: "Smileys" },
  { char: "🫡", name: "saluting face", keywords: ["salute", "yes sir"], group: "Smileys" },
  { char: "🤖", name: "robot", keywords: ["bot", "ai", "machine"], group: "Smileys" },
  { char: "❤️", name: "red heart", keywords: ["love", "heart"], group: "Symbols" },
  { char: "🔥", name: "fire", keywords: ["hot", "flame", "lit"], group: "Symbols" },
  { char: "⭐", name: "star", keywords: ["star", "favorite"], group: "Symbols" },
  { char: "✅", name: "check mark button", keywords: ["check", "done", "yes"], group: "Symbols" },
  { char: "❌", name: "cross mark", keywords: ["x", "no", "wrong"], group: "Symbols" },
  { char: "⚠️", name: "warning", keywords: ["warning", "caution", "alert"], group: "Symbols" },
  { char: "💡", name: "light bulb", keywords: ["idea", "bulb"], group: "Objects" },
  { char: "🚀", name: "rocket", keywords: ["rocket", "launch", "ship"], group: "Objects" },
  { char: "📦", name: "package", keywords: ["box", "package", "npm"], group: "Objects" },
  { char: "🔒", name: "locked", keywords: ["lock", "secure", "private"], group: "Objects" },
  { char: "🔑", name: "key", keywords: ["key", "password"], group: "Objects" },
  { char: "🛠️", name: "hammer and wrench", keywords: ["tools", "fix", "build"], group: "Objects" },
  { char: "💻", name: "laptop", keywords: ["laptop", "computer", "code"], group: "Objects" },
  { char: "📱", name: "mobile phone", keywords: ["phone", "mobile"], group: "Objects" },
  { char: "⌘", name: "place of interest sign", keywords: ["command", "cmd", "mac"], group: "Symbols" },
  { char: "🎉", name: "party popper", keywords: ["party", "tada", "celebrate"], group: "Objects" },
  { char: "🐛", name: "bug", keywords: ["bug", "insect", "error"], group: "Animals" },
  { char: "🐙", name: "octopus", keywords: ["octopus", "github"], group: "Animals" },
  { char: "🐢", name: "turtle", keywords: ["turtle", "slow"], group: "Animals" },
  { char: "🦄", name: "unicorn", keywords: ["unicorn", "magical"], group: "Animals" },
  { char: "🍕", name: "pizza", keywords: ["pizza", "food"], group: "Food" },
  { char: "☕", name: "hot beverage", keywords: ["coffee", "tea", "drink"], group: "Food" },
  { char: "🍺", name: "beer mug", keywords: ["beer", "drink"], group: "Food" },
  { char: "🍎", name: "red apple", keywords: ["apple", "fruit"], group: "Food" },
  { char: "🌍", name: "globe showing Europe-Africa", keywords: ["earth", "world", "globe"], group: "Travel" },
  { char: "🏠", name: "house", keywords: ["home", "house"], group: "Travel" },
  { char: "✈️", name: "airplane", keywords: ["plane", "flight", "travel"], group: "Travel" },
  { char: "🚗", name: "automobile", keywords: ["car", "auto"], group: "Travel" },
  { char: "⚡", name: "high voltage", keywords: ["lightning", "fast", "zap", "power"], group: "Symbols" },
  { char: "🎯", name: "direct hit", keywords: ["target", "dart", "goal"], group: "Objects" },
];

function toCodePoints(char: string): string {
  return [...char].map((c) => `U+${c.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0")}`).join(" ");
}

function toHtmlEntities(char: string): string {
  return [...char].map((c) => `&#${c.codePointAt(0)!};`).join("");
}

function toCssEscape(char: string): string {
  return [...char].map((c) => `\\${c.codePointAt(0)!.toString(16)}`).join(" ");
}

export default function EmojiInspectorPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return EMOJIS;
    return EMOJIS.filter((e) => e.name.includes(q) || e.keywords.some((k) => k.includes(q)) || e.group.toLowerCase().includes(q));
  }, [search]);

  return (
    <div>
      <ToolPageHeader name="Emoji Inspector" description="Search emoji, inspect codepoints, and copy as HTML/CSS/Unicode" icon="ScanText" slug="emoji-inspector" category="text" />
      <div className="max-w-4xl space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search emoji (e.g. fire, rocket, love)..." className="pl-10 h-11" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
          {filtered.map((emoji) => (
            <div key={emoji.name} className="group rounded-xl border border-border bg-card/50 p-3 text-center hover:border-primary/30 hover:bg-card transition-all cursor-default" title={`${emoji.name} (${emoji.group})`}>
              <div className="text-3xl mb-1">{emoji.char}</div>
              <div className="text-[10px] text-muted-foreground truncate">{emoji.name}</div>
              <div className="flex justify-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => navigator.clipboard.writeText(emoji.char)} className="text-[9px] px-1.5 py-0.5 rounded border border-border hover:bg-muted transition-colors cursor-pointer" aria-label={`Copy ${emoji.char}`}>char</button>
                <button onClick={() => navigator.clipboard.writeText(toCodePoints(emoji.char))} className="text-[9px] px-1.5 py-0.5 rounded border border-border hover:bg-muted transition-colors cursor-pointer" aria-label={`Copy codepoints of ${emoji.name}`}>U+</button>
                <button onClick={() => navigator.clipboard.writeText(toHtmlEntities(emoji.char))} className="text-[9px] px-1.5 py-0.5 rounded border border-border hover:bg-muted transition-colors cursor-pointer" aria-label={`Copy HTML entity of ${emoji.name}`}>HTML</button>
                <button onClick={() => navigator.clipboard.writeText(toCssEscape(emoji.char))} className="text-[9px] px-1.5 py-0.5 rounded border border-border hover:bg-muted transition-colors cursor-pointer" aria-label={`Copy CSS escape of ${emoji.name}`}>CSS</button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-sm text-muted-foreground">No emoji found for "{search}"</div>
        )}

        <div className="rounded-xl border border-border bg-card p-4 space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Format reference</h3>
          <div className="flex items-center gap-3 text-xs">
            <Badge variant="outline" className="font-mono">🔥</Badge>
            <code className="text-muted-foreground">U+1F525</code>
            <code className="text-muted-foreground">&# Ampersand encoding: {"&#128293;"}</code>
            <code className="text-muted-foreground">CSS: \1f525</code>
          </div>
        </div>
      </div>
    </div>
  );
}
