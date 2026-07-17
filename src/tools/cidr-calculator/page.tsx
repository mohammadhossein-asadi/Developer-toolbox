"use client";
import { useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Network } from "lucide-react";

function ipToInt(ip: string): number { const p = ip.split(".").map(Number); return ((p[0] << 24) | (p[1] << 16) | (p[2] << 8) | p[3]) >>> 0; }
function intToIp(n: number): string { return [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff].join("."); }

export default function CidrCalculatorPage() {
  const [cidr, setCidr] = useState("192.168.1.0/24");
  const [result, setResult] = useState<Record<string, string> | null>(null);

  const calculate = () => {
    try {
      const [ip, bits] = cidr.split("/");
      const prefix = parseInt(bits);
      if (!ip || isNaN(prefix) || prefix < 0 || prefix > 32) throw new Error("Invalid CIDR");
      const ipNum = ipToInt(ip);
      const mask = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
      const network = (ipNum & mask) >>> 0;
      const broadcast = (network | ~mask) >>> 0;
      const firstHost = prefix >= 31 ? network : (network + 1) >>> 0;
      const lastHost = prefix >= 31 ? broadcast : (broadcast - 1) >>> 0;
      const totalHosts = prefix >= 31 ? (prefix === 32 ? 1 : 2) : Math.pow(2, 32 - prefix) - 2;
      setResult({
        "Network Address": intToIp(network),
        "Subnet Mask": intToIp(mask),
        "Broadcast Address": intToIp(broadcast),
        "First Host": intToIp(firstHost),
        "Last Host": intToIp(lastHost),
        "Total Hosts": totalHosts.toLocaleString(),
        "Prefix Length": `/${prefix}`,
        "Wildcard Mask": intToIp(~mask >>> 0),
        "CIDR": cidr,
      });
    } catch (e) { setResult({ Error: (e as Error).message }); }
  };

  const loadDemo = () => { setCidr("192.168.1.0/24"); };

  return (
    <div>
      <ToolPageHeader name="CIDR Subnet Calculator" description="Compute usable IP ranges, broadcast, masks for IPv4/IPv6" icon="Network" slug="cidr-calculator" category="conversion" />
      <div className="space-y-4 max-w-lg">
        <div className="flex gap-2">
          <div className="flex-1 space-y-1"><Label>CIDR Notation</Label><Input value={cidr} onChange={(e) => setCidr(e.target.value)} className="font-mono" placeholder="192.168.1.0/24" /></div>
          <div className="flex items-end gap-2"><Button onClick={calculate} size="sm"><Network className="h-4 w-4" /> Calculate</Button><Button variant="outline" size="sm" onClick={loadDemo}>Demo</Button></div>
        </div>
        {result && (
          <div className="rounded-lg border border-border bg-muted/50 divide-y divide-border">
            {Object.entries(result).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between px-4 py-2.5 group">
                <span className="text-xs text-muted-foreground">{k}</span>
                <div className="flex items-center gap-2"><span className="text-sm font-mono">{v}</span><CopyButton text={v} className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity" /></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
