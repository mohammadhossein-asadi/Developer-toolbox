import { useState, useEffect, useCallback } from "react";
import { generateTotp } from "@/lib/totp";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton, ResetButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RefreshCw } from "lucide-react";
import { useToolState } from "@/lib/hooks/use-tool-state";

export default function TotpGeneratorPage() {
  const [secret, setSecret, resetSecret] = useToolState("totp-secret", "JBSWY3DPEHPK3PXP");
  const [digits, setDigits] = useState(6);
  const [period, setPeriod] = useState(30);
  const [code, setCode] = useState("");
  const [remaining, setRemaining] = useState(period);
  const [error, setError] = useState("");

  const update = useCallback(async () => {
    try {
      const c = await generateTotp(secret, period, digits);
      setCode(c);
      setError("");
    } catch (e: unknown) {
      setError((e as Error).message);
      setCode("");
    }
  }, [secret, period, digits]);

  useEffect(() => {
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, [update]);

  useEffect(() => {
    setRemaining(period - (Math.floor(Date.now() / 1000) % period));
  }, [period, code]);

  return (
    <div>
      <ToolPageHeader name="TOTP Generator" description="Generate RFC 6238 two-factor codes locally from your secret" icon="Shield" slug="totp-generator" category="generator" copyText={code} />
      <div className="max-w-xl space-y-6">
        <div className="space-y-2">
          <Label htmlFor="totp-secret">Base32 secret</Label>
          <div className="flex gap-2">
            <Input id="totp-secret" value={secret} onChange={(e) => setSecret(e.target.value)} className="font-mono" placeholder="JBSWY3DPEHPK3PXP" />
            <ResetButton onReset={() => { resetSecret(); setError(""); }} />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="space-y-2">
            <Label>Digits</Label>
            <div className="flex gap-1">
              {[6, 7, 8].map((n) => <Button key={n} size="sm" variant={digits === n ? "default" : "outline"} onClick={() => setDigits(n)}>{n}</Button>)}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Period (s)</Label>
            <div className="flex gap-1">
              {[30, 60].map((n) => <Button key={n} size="sm" variant={period === n ? "default" : "outline"} onClick={() => setPeriod(n)}>{n}</Button>)}
            </div>
          </div>
        </div>

        {error ? (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive font-mono">{error}</div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-8 text-center space-y-3">
            <div className="flex items-center justify-center gap-6">
              <span className="font-mono text-5xl font-bold tracking-[0.2em] text-primary select-all">{code}</span>
              <CopyButton text={code} />
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <RefreshCw className="h-3 w-3" />
              <span>Expires in</span>
              <Badge variant="secondary" className="font-mono">{remaining}s</Badge>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${(remaining / period) * 100}%` }} />
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Codes are computed with the Web Crypto API on your device — the secret never leaves the browser.
        </p>
      </div>
    </div>
  );
}
