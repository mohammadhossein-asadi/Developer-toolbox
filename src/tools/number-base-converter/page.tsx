import { useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const bases = [
  { name: "Binary", base: 2, prefix: "0b" },
  { name: "Octal", base: 8, prefix: "0o" },
  { name: "Decimal", base: 10, prefix: "" },
  { name: "Hexadecimal", base: 16, prefix: "0x" },
  { name: "Base-36", base: 36, prefix: "" },
];

const validChars: Record<number, RegExp> = {
  2: /^[01]*$/, 8: /^[0-7]*$/, 10: /^[0-9]*$/, 16: /^[0-9a-fA-F]*$/, 36: /^[0-9a-z]*$/i,
};

export default function NumberBaseConverterPage() {
  const [input, setInput] = useState("255");
  const [fromBase, setFromBase] = useState(10);

  const decimal = (() => { try { return parseInt(input, fromBase); } catch { return NaN; } })();
  const isValid = input === "" || (!isNaN(decimal) && decimal >= 0 && validChars[fromBase]?.test(input));

  return (
    <div>
      <ToolPageHeader name="Number Base Converter" description="Convert between binary, octal, decimal, hex, and base-36" icon="Hash" slug="number-base-converter" category="conversion" />
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => {setInput('255'); setFromBase(10)}}>Load Demo</Button></div>
      <div className="space-y-4 max-w-lg">
        <div className="flex gap-3">
          <div className="flex-1 space-y-1"><Label>Value</Label><Input value={input} onChange={(e) => setInput(e.target.value)} className={`font-mono ${!isValid ? "border-destructive" : ""}`} placeholder="Enter number..." /></div>
          <div className="space-y-1"><Label>From</Label>
            <select value={fromBase} onChange={(e) => setFromBase(parseInt(e.target.value))} className="h-10 rounded-lg border border-input bg-background px-2 text-sm">
              {bases.map((b) => <option key={b.base} value={b.base}>{b.name} ({b.base})</option>)}
            </select>
          </div>
        </div>
        {!isValid && <Badge variant="destructive">Invalid character for base {fromBase}</Badge>}
        {isValid && !isNaN(decimal) && decimal >= 0 && (
          <div className="rounded-lg border border-border bg-muted/50 divide-y divide-border">
            {bases.filter((b) => b.base !== fromBase).map((b) => {
              const converted = decimal.toString(b.base).toUpperCase();
              return (
                <div key={b.base} className="flex items-center justify-between px-4 py-3 group hover:bg-muted/50">
                  <span className="text-sm font-medium w-28">{b.name}</span>
                  <code className="font-mono text-sm break-all">{b.prefix}{converted}</code>
                  <CopyButton text={`${b.prefix}${converted}`} className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
