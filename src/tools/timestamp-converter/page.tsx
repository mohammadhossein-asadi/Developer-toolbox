"use client";
import { useState, useEffect } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => setTimestamp(Math.floor(Date.now() / 1000).toString())}>Load Demo</Button></div>
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, RefreshCw } from "lucide-react";
import { format } from "date-fns";

const timezones = ["UTC", "America/New_York", "America/Chicago", "America/Los_Angeles", "Europe/London", "Europe/Paris", "Asia/Tokyo", "Asia/Shanghai", "Australia/Sydney"];

export default function TimestampConverterPage() {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [unit, setUnit] = useState<"seconds" | "milliseconds">("seconds");
  const [liveTime, setLiveTime] = useState(Math.floor(Date.now() / 1000));

  useEffect(() => { const i = setInterval(() => setLiveTime(Math.floor(Date.now() / 1000)), 1000); return () => clearInterval(i); }, []);

  const ms = unit === "seconds" ? parseInt(timestamp || "0") * 1000 : parseInt(timestamp || "0");
  const date = new Date(ms);
  const isValid = !isNaN(date.getTime());

  function getRelative(date: Date) {
    const diff = Date.now() - date.getTime(); const a = Math.abs(diff);
    const p = diff > 0 ? "" : "in "; const s = diff > 0 ? " ago" : "";
    if (a < 60000) return `${p}${Math.floor(a / 1000)}s${s}`; if (a < 3600000) return `${p}${Math.floor(a / 60000)}m${s}`; if (a < 86400000) return `${p}${Math.floor(a / 3600000)}h${s}`; return `${p}${Math.floor(a / 86400000)}d${s}`;
  }

  return (
    <div>
      <ToolPageHeader name="Timestamp Converter" description="Convert between Unix timestamps and human dates" icon="Clock" slug="timestamp-converter" category="conversion" />
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => setTimestamp(Math.floor(Date.now() / 1000).toString())}>Load Demo</Button></div>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Input type="number" placeholder="Unix timestamp..." value={timestamp} onChange={(e) => setTimestamp(e.target.value)} className="font-mono flex-1" />
          <div className="flex gap-1">
            <Button variant={unit === "seconds" ? "default" : "outline"} size="sm" onClick={() => setUnit("seconds")}>Seconds</Button>
            <Button variant={unit === "milliseconds" ? "default" : "outline"} size="sm" onClick={() => setUnit("milliseconds")}>ms</Button>
          </div>
          <Button variant="outline" size="sm" onClick={() => setTimestamp(Math.floor(Date.now() / 1000).toString())}><RefreshCw className="h-4 w-4" /> Now</Button>
        </div>
        {isValid && (
          <div className="rounded-xl border border-border bg-muted/30 divide-y divide-border">
            {[
              { l: "ISO 8601", v: date.toISOString() },
              { l: "RFC 2822", v: date.toUTCString() },
              { l: "Relative", v: getRelative(date) },
              { l: "Local", v: format(date, "yyyy-MM-dd HH:mm:ss") },
              { l: "Full", v: format(date, "EEEE, MMMM do yyyy, h:mm:ss a") },
              { l: "Unix (seconds)", v: Math.floor(date.getTime() / 1000).toString() },
              { l: "Unix (milliseconds)", v: date.getTime().toString() },
            ].map((f) => (
              <div key={f.l} className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 group">
                <div><span className="text-xs text-muted-foreground">{f.l}</span><div className="text-sm font-mono mt-0.5">{f.v}</div></div>
                <CopyButton text={f.v} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        )}
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <div className="flex items-center gap-2 mb-2"><Clock className="h-4 w-4 text-primary" /><span className="text-sm font-medium">Live Timestamp</span></div>
          <div className="font-mono text-2xl">{liveTime}</div>
          <div className="text-xs text-muted-foreground mt-1">{format(new Date(liveTime * 1000), "yyyy-MM-dd HH:mm:ss")} UTC</div>
        </div>
      </div>
    </div>
  );
}
