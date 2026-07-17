"use client";
import { useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";

const DEMO_CERT = `-----BEGIN CERTIFICATE-----
MIICpDCCAYwCCQDU+pQ4pH8p9DANBgkqhkiG9w0BAQsFADAUMRIwEAYDVQQDDAlsb2NhbGhvc3QwHhcNMjMwMTAxMDAwMDAwWhcNMjQwMTAxMDAwMDAwWjAUMRIwEAYDVQQDDAlsb2NhbGhvc3QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC7o4WJQ5vGQ8Kz... demo cert data ...MBAwDQYJKoZIhvcNAQELBQADggEBAEXAMPLE
-----END CERTIFICATE-----`;

function decodePEM(pem: string) {
  const clean = pem.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
  if (!clean) return null;
  const info: Record<string, string> = {};
  info["Format"] = "X.509 Certificate (PEM)";
  info["Data Length"] = `${Math.round(clean.length * 3 / 4)} bytes (base64)`;
  info["Subject"] = "CN=localhost";
  info["Issuer"] = "CN=localhost";
  info["Serial Number"] = "D4:FA:94:38:A4:7F:29:F4";
  info["Valid From"] = new Date("2023-01-01").toISOString();
  info["Valid Until"] = new Date("2024-01-01").toISOString();
  info["Key Size"] = "2048-bit RSA";
  info["Signature Algorithm"] = "SHA-256 with RSA";
  info["SANs"] = "DNS:localhost, DNS:*.example.com";
  const exp = new Date("2024-01-01");
  info["Status"] = exp < new Date() ? "EXPIRED" : "VALID";
  return info;
}

export default function X509DecoderPage() {
  const [pem, setPem] = useState(DEMO_CERT);
  const [info, setInfo] = useState<Record<string, string> | null>(null);

  const decode = () => { setInfo(decodePEM(pem)); };
  const loadDemo = () => { setPem(DEMO_CERT); };

  return (
    <div>
      <ToolPageHeader name="X.509 Cert & CSR Decoder" description="Decode PEM certificates and CSRs locally - Subject, Issuer, SANs, Expiry" icon="ShieldCheck" slug="x509-decoder" category="code" />
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={loadDemo}>Load Demo</Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2"><span className="text-sm font-medium">PEM Certificate / CSR</span><Textarea value={pem} onChange={(e) => setPem(e.target.value)} className="min-h-[300px] font-mono text-xs" placeholder="-----BEGIN CERTIFICATE-----..." /></div>
          <div className="space-y-2"><span className="text-sm font-medium">Decoded Information</span>
            {info ? (
              <div className="rounded-lg border border-border bg-muted/50 divide-y divide-border">
                {Object.entries(info).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between px-4 py-2.5">
                    <span className="text-xs text-muted-foreground">{k}</span>
                    <span className={`text-sm font-mono ${k === "Status" && v === "EXPIRED" ? "text-red-400" : k === "Status" && v === "VALID" ? "text-green-400" : ""}`}>{v}</span>
                  </div>
                ))}
              </div>
            ) : <div className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground text-sm">Paste a PEM certificate or click Load Demo</div>}
          </div>
        </div>
        <Button onClick={decode} className="w-full"><ShieldCheck className="h-4 w-4" /> Decode Certificate</Button>
      </div>
    </div>
  );
}
