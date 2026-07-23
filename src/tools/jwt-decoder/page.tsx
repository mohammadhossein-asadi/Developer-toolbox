import { useState, useEffect } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, Shield } from "lucide-react";

function decodeBase64Url(str: string) {
  let b = str.replace(/-/g, "+").replace(/_/g, "/");
  while (b.length % 4) b += "=";
  return decodeURIComponent(atob(b).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
}

function parseJwt(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length < 3) return null;
    return { header: JSON.parse(decodeBase64Url(parts[0])), payload: JSON.parse(decodeBase64Url(parts[1])), signature: parts[2] };
  } catch { return null; }
}

function getTimeRemaining(exp: number) {
  const diff = exp - Math.floor(Date.now() / 1000);
  if (diff < 0) return { text: "Expired", status: "expired" as const };
  if (diff < 300) return { text: `${diff}s remaining`, status: "warning" as const };
  if (diff < 3600) return { text: `${Math.floor(diff / 60)}m remaining`, status: "valid" as const };
  return { text: `${Math.floor(diff / 3600)}h remaining`, status: "valid" as const };
}

const claimDescriptions: Record<string, string> = {
  iss: "Issuer", sub: "Subject", aud: "Audience", exp: "Expiration Time", nbf: "Not Before", iat: "Issued At", jti: "JWT ID", scope: "Scope", roles: "Roles", email: "Email", name: "Name",
};

export default function JwtDecoderPage() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<ReturnType<typeof parseJwt>>(null);
  const [timeInfo, setTimeInfo] = useState<ReturnType<typeof getTimeRemaining> | null>(null);

  useEffect(() => {
    if (decoded?.payload && typeof decoded.payload.exp === "number") {
      const update = () => setTimeInfo(getTimeRemaining(decoded!.payload.exp as number));
      update(); const interval = setInterval(update, 1000); return () => clearInterval(interval);
    }
  }, [decoded]);

  const handleDecode = () => setDecoded(parseJwt(token.trim()));
  const parts = token.trim().split(".");

  return (
    <div>
      <ToolPageHeader name="JWT Decoder" description="Decode and inspect JSON Web Tokens" icon="KeyRound" slug="jwt-decoder" category="code" />
      <div className="space-y-4">
        <div>
          <span className="text-sm font-medium mb-2 block">Paste JWT Token</span>
          <Textarea placeholder="eyJhbGciOiJIUzI1NiJ9..." value={token} onChange={(e) => setToken(e.target.value)} onBlur={handleDecode} className="font-mono text-sm min-h-[100px]" />
        </div>
        {decoded && (
          <>
            {timeInfo && (
              <div className={`flex items-center gap-2 p-3 rounded-lg border ${timeInfo.status === "expired" ? "border-destructive/50 bg-destructive/10" : timeInfo.status === "warning" ? "border-yellow-500/50 bg-yellow-500/10" : "border-green-500/50 bg-green-500/10"}`}>
                <Clock className="h-4 w-4" /><span className="text-sm font-medium">{timeInfo.text}</span>
                {timeInfo.status === "expired" && <AlertTriangle className="h-4 w-4 text-destructive" />}
              </div>
            )}
            <Tabs defaultValue="header">
              <TabsList><TabsTrigger value="header">Header</TabsTrigger><TabsTrigger value="payload">Payload</TabsTrigger><TabsTrigger value="signature">Signature</TabsTrigger><TabsTrigger value="ai">Analysis</TabsTrigger></TabsList>
              <TabsContent value="header"><div className="relative rounded-lg border border-border bg-muted/50 p-4"><pre className="text-sm font-mono whitespace-pre-wrap">{JSON.stringify(decoded.header, null, 2)}</pre><CopyButton text={JSON.stringify(decoded.header, null, 2)} className="absolute top-2 right-2" /></div></TabsContent>
              <TabsContent value="payload"><div className="relative rounded-lg border border-border bg-muted/50 p-4"><pre className="text-sm font-mono whitespace-pre-wrap">{JSON.stringify(decoded.payload, null, 2)}</pre><CopyButton text={JSON.stringify(decoded.payload, null, 2)} className="absolute top-2 right-2" /></div></TabsContent>
              <TabsContent value="signature"><div className="rounded-lg border border-border bg-muted/50 p-4"><code className="text-sm font-mono break-all">{parts[2]}</code></div></TabsContent>
              <TabsContent value="ai">
                <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium"><Shield className="h-4 w-4 text-primary" />Token Analysis</div>
                  <div className="space-y-2 text-sm">
                    {Object.entries(decoded.payload).map(([key, value]) => (
                      <div key={key} className="flex gap-2">
                        <Badge variant="outline" className="shrink-0">{key}</Badge>
                        <span className="text-muted-foreground">{claimDescriptions[key] || "Custom claim"}{typeof value === "string" && ` = "${value}"`}{typeof value === "number" && key.includes("time") && ` = ${new Date(value * 1000).toISOString()}`}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
        {!decoded && token && <div className="text-center py-8 text-muted-foreground"><AlertTriangle className="h-8 w-8 mx-auto mb-2" /><p>Could not decode token. Make sure it's a valid JWT.</p></div>}
      </div>
    </div>
  );
}
