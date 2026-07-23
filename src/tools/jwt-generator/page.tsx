import { useState, useCallback } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound } from "lucide-react";

function base64url(str: string): string { return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }

export default function JwtGeneratorPage() {
  const [header, setHeader] = useState(JSON.stringify({ alg: "HS256", typ: "JWT" }, null, 2));
  const [payload, setPayload] = useState(JSON.stringify({ sub: "1234567890", name: "John Doe", iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 3600 }, null, 2));
  const [secret, setSecret] = useState("your-256-bit-secret");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const generate = useCallback(async () => {
    try {
      const h = JSON.parse(header);
      const p = JSON.parse(payload);
      const headerB64 = base64url(JSON.stringify(h));
      const payloadB64 = base64url(JSON.stringify(p));
      if (h.alg === "none") { setToken(`${headerB64}.${payloadB64}.`); setError(""); return; }
      const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
      const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${headerB64}.${payloadB64}`));
      const sigB64 = base64url(String.fromCharCode(...new Uint8Array(sig)));
      setToken(`${headerB64}.${payloadB64}.${sigB64}`);
      setError("");
    } catch (e) { setError((e as Error).message); setToken(""); }
  }, [header, payload, secret]);

  const loadDemo = () => {
    setHeader(JSON.stringify({ alg: "HS256", typ: "JWT" }, null, 2));
    setPayload(JSON.stringify({ sub: "1234567890", name: "John Doe", iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 3600 }, null, 2));
    setSecret("your-256-bit-secret");
  };

  return (
    <div>
      <ToolPageHeader name="JWT Generator (Mock Sandbox)" description="Generate dummy JWTs with custom headers, payloads, and mock secrets" icon="KeyRound" slug="jwt-generator" category="generator" copyText={token} />
      <div className="space-y-4">
        <Button variant="outline" size="sm" onClick={loadDemo}>Load Demo</Button>
        {error && <div className="text-sm text-destructive p-2 rounded-lg bg-destructive/10">{error}</div>}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="space-y-2"><span className="text-sm font-medium">Header</span><Textarea value={header} onChange={(e) => setHeader(e.target.value)} className="min-h-[150px] font-mono text-xs" /></div>
          <div className="space-y-2"><span className="text-sm font-medium">Payload</span><Textarea value={payload} onChange={(e) => setPayload(e.target.value)} className="min-h-[150px] font-mono text-xs" /></div>
          <div className="space-y-2"><Label>Secret Key</Label><Input value={secret} onChange={(e) => setSecret(e.target.value)} className="font-mono text-xs" /></div>
        </div>
        <Button onClick={generate} className="w-full"><KeyRound className="h-4 w-4" /> Generate JWT</Button>
        {token && (
          <div className="space-y-2"><div className="flex items-center justify-between"><span className="text-sm font-medium">Generated Token</span><CopyButton text={token} /></div>
            <div className="rounded-lg border border-border bg-muted/50 p-4 font-mono text-xs break-all">{token}</div>
          </div>
        )}
      </div>
    </div>
  );
}
