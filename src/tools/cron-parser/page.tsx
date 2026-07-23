import { useState, useMemo } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { parseExpression } from "cron-parser";

const presets = [
  { name: "Every minute", cron: "* * * * *" },
  { name: "Every 5 min", cron: "*/5 * * * *" },
  { name: "Every hour", cron: "0 * * * *" },
  { name: "Daily 9am", cron: "0 9 * * *" },
  { name: "Weekly Mon", cron: "0 9 * * 1" },
  { name: "Monthly 1st", cron: "0 9 1 * *" },
];

export default function CronParserPage() {
  const [fields, setFields] = useState({ minute: "0", hour: "9", dayOfMonth: "*", month: "*", dayOfWeek: "*" });
  const cron = `${fields.minute} ${fields.hour} ${fields.dayOfMonth} ${fields.month} ${fields.dayOfWeek}`;

  const result = useMemo(() => {
    try {
      const interval = parseExpression(cron);
      const nextRuns = Array.from({ length: 5 }, () => interval.next().toDate().toLocaleString());
      return { valid: true, nextRuns, desc: describeCron(fields) };
    } catch { return { valid: false, nextRuns: [] as string[], desc: "Invalid expression" }; }
  }, [cron]);

  function describeCron(f: typeof fields) {
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    if (f.minute==="*"&&f.hour==="*") return "Every minute";
    if (f.dayOfMonth!=="*") return `Day ${f.dayOfMonth} at ${f.hour}:${f.minute.padStart(2,"0")}`;
    if (f.dayOfWeek!=="*") return `${days[parseInt(f.dayOfWeek)]||f.dayOfWeek} at ${f.hour}:${f.minute.padStart(2,"0")}`;
    return `Every day at ${f.hour}:${f.minute.padStart(2,"0")}`;
  }

  return (
    <div>
      <ToolPageHeader name="Cron Expression Parser" description="Build cron expressions and see human-readable descriptions" icon="Clock" slug="cron-parser" category="code" copyText={cron} />
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => {setFields({minute:'0',hour:'9',dayOfMonth:'*',month:'*',dayOfWeek:'*'})}}>Load Demo</Button></div>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {Object.entries(fields).map(([key, val]) => (
            <div key={key} className="space-y-1">
              <label className="text-xs text-muted-foreground">{key.replace(/([A-Z])/g, " $1")}</label>
              <Input value={val} onChange={(e) => setFields((p) => ({ ...p, [key]: e.target.value }))} className="w-20 h-8 text-xs font-mono" />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <code className="font-mono text-sm px-2 py-1 rounded bg-muted">{cron}</code>
          <CopyButton text={cron} />
          {result.valid ? <Badge variant="default">Valid</Badge> : <Badge variant="destructive">Invalid</Badge>}
        </div>
        <div className="p-3 rounded-lg border border-border bg-muted/50 text-sm">{result.desc}</div>
        {result.nextRuns.length > 0 && (
          <div className="space-y-2"><span className="text-sm font-medium">Next 5 runs:</span>
            <div className="rounded-lg border border-border bg-muted/50 divide-y divide-border">
              {result.nextRuns.map((run, i) => <div key={i} className="px-4 py-2 text-sm font-mono">{run}</div>)}
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => <Button key={p.name} variant="outline" size="sm" onClick={() => { const [m,h,dom,mo,dow]=p.cron.split(" "); setFields({minute:m,hour:h,dayOfMonth:dom,month:mo,dayOfWeek:dow}); }}>{p.name}</Button>)}
        </div>
      </div>
    </div>
  );
}
