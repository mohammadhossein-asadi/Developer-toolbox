import { useState, useEffect } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { Button } from "@/components/ui/button";
import { Globe, RefreshCw } from "lucide-react";

export default function IpLookupPage() {
  const [localIp, setLocalIp] = useState("Loading...");
  const [publicIp, setPublicIp] = useState("Loading...");
  const userAgent = navigator.userAgent;

  const getLocalIp = () => {
    setLocalIp("Loading...");
    try {
      const pc = new RTCPeerConnection({ iceServers: [] });
      pc.createDataChannel("");
      pc.createOffer().then((o) => pc.setLocalDescription(o));
      pc.onicecandidate = (e) => {
        if (!e.candidate) return;
        const ip = e.candidate.candidate.match(/(\d+\.\d+\.\d+\.\d+)/);
        if (ip) { setLocalIp(ip[1]); pc.close(); }
      };
      setTimeout(() => setLocalIp("Could not detect (try HTTPS)"), 3000);
    } catch { setLocalIp("Not available"); }
  };

  const getPublicIp = async () => {
    setPublicIp("Loading...");
    try { const r = await fetch("https://api.ipify.org?format=json"); const d = await r.json(); setPublicIp(d.ip); }
    catch { setPublicIp("Could not fetch"); }
  };

  const refresh = () => { getLocalIp(); getPublicIp(); };

  useEffect(() => { getLocalIp(); getPublicIp(); }, []);

  return (
    <div>
      <ToolPageHeader name="IP Address Lookup" description="Show local/public IP address and browser info" icon="Globe" slug="ip-lookup" category="conversion" />
      <div className="space-y-4 max-w-lg">
        <div className="flex gap-2"><Button variant="outline" size="sm" onClick={refresh}><RefreshCw className="h-4 w-4" /> Refresh</Button></div>
        <div className="rounded-lg border border-border bg-muted/50 divide-y divide-border">
          <div className="px-4 py-3"><span className="text-xs text-muted-foreground">Local IP</span><div className="text-sm font-mono mt-0.5">{localIp}</div></div>
          <div className="px-4 py-3"><span className="text-xs text-muted-foreground">Public IP</span><div className="text-sm font-mono mt-0.5">{publicIp}</div></div>
          <div className="px-4 py-3"><span className="text-xs text-muted-foreground">User Agent</span><div className="text-sm mt-0.5 break-all">{userAgent}</div></div>
        </div>
      </div>
    </div>
  );
}