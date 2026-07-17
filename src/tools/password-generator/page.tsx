"use client";
import { useState, useCallback } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";

const charsets = { upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", lower: "abcdefghijklmnopqrstuvwxyz", nums: "0123456789", syms: "!@#$%^&*()_+-=[]{}|;:,.<>?" };

function getStrength(len: number, opts: Record<string, boolean>) {
  let pool = 0; if (opts.upper) pool += 26; if (opts.lower) pool += 26; if (opts.nums) pool += 10; if (opts.syms) pool += 27;
  const e = len * Math.log2(pool || 1);
  if (e < 28) return { label: "Weak", color: "destructive" as const };
  if (e < 60) return { label: "Fair", color: "secondary" as const };
  if (e < 120) return { label: "Strong", color: "default" as const };
  return { label: "Very Strong", color: "default" as const };
}

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, nums: true, syms: true });
  const [password, setPassword] = useState("");

  const generate = useCallback(() => {
    let chars = ""; if (opts.upper) chars += charsets.upper; if (opts.lower) chars += charsets.lower; if (opts.nums) chars += charsets.nums; if (opts.syms) chars += charsets.syms;
    if (!chars) return;
    const arr = new Uint32Array(length); crypto.getRandomValues(arr);
    setPassword(Array.from(arr, (n) => chars[n % chars.length]).join(""));
  }, [length, opts]);

  const strength = getStrength(password.length || length, opts);

  return (
    <div>
      <ToolPageHeader name="Password Generator" description="Generate secure passwords with customizable options" icon="Shield" slug="password-generator" category="generator" copyText={password} />
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => {setLength(16); setOpts({upper:true,lower:true,nums:true,syms:true})}}>Load Demo</Button></div>
      <div className="space-y-4 max-w-lg">
        <div className="rounded-lg border border-border bg-muted/50 p-4 font-mono text-lg break-all min-h-[3rem]">{password || "Click Generate"}</div>
        <div className="flex items-center justify-between"><span className="text-sm font-medium">Length: {length}</span><Badge variant={strength.color}>{strength.label}</Badge></div>
        <input type="range" min={4} max={128} value={length} onChange={(e) => setLength(parseInt(e.target.value))} className="w-full" />
        <div className="grid grid-cols-2 gap-3">
          {[["upper","Uppercase"],["lower","Lowercase"],["nums","Numbers"],["syms","Symbols"]].map(([k,l]) => (
            <div key={k} className="flex items-center gap-2"><Switch checked={opts[k as keyof typeof opts]} onCheckedChange={(v) => setOpts((p) => ({...p,[k]:v}))} /><Label className="text-sm">{l}</Label></div>
          ))}
        </div>
        <div className="flex gap-2"><Button onClick={generate} className="flex-1"><Shield className="h-4 w-4" /> Generate</Button>{password && <CopyButton text={password} />}</div>
      </div>
    </div>
  );
}
