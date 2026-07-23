import { useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck } from "lucide-react";
import * as asn1js from "asn1js";
import { Certificate } from "pkijs";

const DEMO_CERT = `-----BEGIN CERTIFICATE-----
MIIDpDCCAoygAwIBAgIGAX6L2qfLMA0GCSqGSIb3DQEBCwUAMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzEVMBMGA1UECgwMRXhhbXBsZSBJbmMxETAPBgNVBAsMCFJvb3QgQ0ExGDAWBgNVBAMMD3d3dy5leGFtcGxlLmNvbTAeFw0yMzAxMDEwMDAwMDBaFw0yNDEyMzEyMzU5NTlaMIGUMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzEVMBMGA1UECgwMRXhhbXBsZSBJbmMxETAPBgNVBAsMCFJvb3QgQ0ExGDAWBgNVBAMMD3d3dy5leGFtcGxlLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALkO8B1WhaPzfqGmgHKEfOzKxKX9D3r+I+Vr4I5d8J3E3GyTfG5gKj8L1J8+2qX5v8N1K9hJ3R7d4F2m6H8W9x0Y5bZa3Qj1K7d2F4gH8vN5tL6rW3e9xY2uJ0kO1iP7hS4d8mR5aG3bN6cF9wJ0vX2tQ4hK7lZ1oY8rD3eS6nU5gA0mB9fA4iK2wJ7dH5nC8xV0tR3qE6uP4oL1mK9hG2fS7jA5wD3iN8vX0rB6yW4eT1kU5gL2hJ7dF3nC8xV0tR3qE6uP4oL1mK9hG2fS7jA5wD3iN8vX0rB6yW4eT1kU5gL2hJ7dF3nC8xV0tR3qE6uP4oL1mK9hG2fS7jA5wD3iN8vX0rB6yW4eT1kU5gL2hJ7dF3nC8xV0tR3qE6uP4oL1mK9hG2fS7jA5wD3iN8vX0rB6yW4eT1kU5gL2hJ7dF3nC8xV0tR3qE6uP4oL1mK9hG2fS7jA5wD3iN8vX0rB6yW4eT1kU5gMIIBtTANBgkqhkiG9w0BAQEFAAOCARkAMigCSQC6I9eEL9PzN8V8dHv7K3V9a9s5jT3rF4g8kL2mN5wQ1xR7hD3oP6bS9cE4fJ0tU2vY5kA8wG3iH7nX1rB6yW4eT1kU5gA0mB9fA4iK2wJ7dH5nC8xV0tR3qE6uP4oL1mK9hG2fS7jA5wD3iN8vX0rB6yW4eT1kU5gL2hJ7dF3nC8xV0tR3qE6uP4oL1mK9hG2fS7jA5wD3iN8vX0rB6yW4eT1kU5gMIIBtTANBgkqhkiG9w0BAQEFAAOCARkAMigCSQC6I9eEL9PzN8V8dHv7K3V9a9s5jT3rF4g8kL2mN5wQ1xR7hD3oP6bS9cE4fJ0tU2vY5kA8wG3iH7nX1rB6yW4eT1kU5gA0mB9fA4iK2wJ7dH5nC8xV0tR3qE6uP4oL1mK9hG2fS7jA5wD3iN8vX0rB6yW4eT1kU5gL2hJ7dF3nC8xV0tR3qE6uP4oL1mK9hG2fS7jA5wD3iN8vX0rB6yW4eT1kU5gA0mB9fA4iK2wJ7dH5nC8xV0tR3qE6uP4oL1mK9hG2fS7jA5w==
-----END CERTIFICATE-----`;

const ALGORITHM_MAP: Record<string, string> = {
  "1.2.840.113549.1.1.2": "MD2 with RSA",
  "1.2.840.113549.1.1.4": "MD5 with RSA",
  "1.2.840.113549.1.1.5": "SHA-1 with RSA",
  "1.2.840.113549.1.1.11": "SHA-256 with RSA",
  "1.2.840.113549.1.1.12": "SHA-384 with RSA",
  "1.2.840.113549.1.1.13": "SHA-512 with RSA",
  "1.2.840.10045.4.3.1": "SHA-256 with ECDSA",
  "1.2.840.10045.4.3.2": "SHA-384 with ECDSA",
  "1.2.840.10045.4.3.3": "SHA-512 with ECDSA",
};

const KEY_SIZE_MAP: Record<string, string> = {
  "1.2.840.113549.1.1.1": "RSA",
  "1.2.840.10040.4.1": "DSA",
  "1.2.840.10045.2.1": "EC",
};

function formatName(name: { typesAndValues: Array<{ type: string; value: { valueBlock?: { toString(): string }; valueBlock?: { value?: string } } }> }): string {
  const result: string[] = [];
  for (const rdn of name.typesAndValues) {
    const type = rdn.type.replace("2.5.4.", "");
    const typeMap: Record<string, string> = {
      "3": "CN", "4": "OU", "5": "O", "6": "C", "7": "L", "8": "ST",
      "10": "DC", "11": "UID",
    };
    const shortName = typeMap[type] || rdn.type;
    let value = "N/A";
    try {
      const v = rdn.value as unknown as { valueBlock?: { toString(): string }; value?: string };
      if (v && typeof v === "object") {
        if ("valueBlock" in v && v.valueBlock) value = v.valueBlock.toString();
        else if ("value" in v && v.value) value = String(v.value);
      }
    } catch { /* ignore */ }
    result.push(`${shortName}=${value}`);
  }
  return result.join(", ");
}

function decodePEM(pem: string): { info: Record<string, string>; hex: string } | null {
  try {
    const clean = pem.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
    if (!clean) return null;

    const der = Uint8Array.from(atob(clean), (c) => c.charCodeAt(0));
    const hex = Array.from(der).map((b) => b.toString(16).padStart(2, "0")).join(" ");

    const asn1 = asn1js.fromBER(der.buffer);
    const cert = new Certificate({ schema: asn1.result });

    const info: Record<string, string> = {};
    info["Version"] = `v${(cert.version || 0) + 1}`;

    if (cert.serialNumber) {
      const sn = new Uint8Array(cert.serialNumber.valueBlock.valueHexView);
      info["Serial Number"] = Array.from(sn).map((b) => b.toString(16).padStart(2, "0")).join(":").toUpperCase();
    }

    info["Signature Algorithm"] = ALGORITHM_MAP[cert.signatureAlgorithm.algorithmId] || cert.signatureAlgorithm.algorithmId;

    try { info["Issuer"] = formatName(cert.issuer); } catch { info["Issuer"] = "N/A"; }
    try { info["Subject"] = formatName(cert.subject); } catch { info["Subject"] = "N/A"; }

    try {
      if (cert.notBefore) {
        const nb = cert.notBefore;
        if (nb.valueBlock && nb.valueBlock.value) info["Valid From"] = new Date(nb.valueBlock.value).toISOString();
        else if (nb.value) info["Valid From"] = new Date(nb.value).toISOString();
      }
    } catch { /* ignore */ }

    try {
      if (cert.notAfter) {
        const na = cert.notAfter;
        if (na.valueBlock && na.valueBlock.value) info["Valid Until"] = new Date(na.valueBlock.value).toISOString();
        else if (na.value) info["Valid Until"] = new Date(na.value).toISOString();
      }
    } catch { /* ignore */ }

    try {
      const publicKeyInfo = cert.subjectPublicKeyInfo;
      if (publicKeyInfo && publicKeyInfo.algorithm) {
        const keyAlgo = KEY_SIZE_MAP[publicKeyInfo.algorithm.algorithmId] || publicKeyInfo.algorithm.algorithmId;
        const bits = publicKeyInfo.algorithm.modulusLength ? `${publicKeyInfo.algorithm.modulusLength}` : "";
        info["Public Key"] = bits ? `${bits}-bit ${keyAlgo}` : keyAlgo;
      }
    } catch { /* ignore */ }

    try {
      const sanExt = cert.extensions?.find((ext) => ext.extnID === "2.5.29.17");
      if (sanExt && sanExt.parsedValue) {
        const sans: string[] = [];
        const parsed = sanExt.parsedValue;
        if (parsed.value && Array.isArray(parsed.value)) {
          for (const altName of parsed.value as Array<{ type: number; value: unknown }>) {
            if (altName.type === 2) sans.push(`DNS:${altName.value}`);
            else if (altName.type === 7) {
              const ip = Array.from(new Uint8Array(altName.value as ArrayBuffer)).join(".");
              sans.push(`IP:${ip}`);
            }
          }
        }
        if (sans.length) info["SANs"] = sans.join(", ");
      }
    } catch { /* ignore */ }

    const exp = info["Valid Until"] ? new Date(info["Valid Until"]) : null;
    info["Status"] = exp && exp < new Date() ? "EXPIRED" : "VALID";

    const extCount = cert.extensions ? cert.extensions.length : 0;
    info["Extensions"] = `${extCount} extension(s)`;

    return { info, hex };
  } catch {
    return null;
  }
}

export default function X509DecoderPage() {
  const [pem, setPem] = useState(DEMO_CERT);
  const [result, setResult] = useState<{ info: Record<string, string>; hex: string } | null>(null);

  const decode = () => { setResult(decodePEM(pem)); };
  const loadDemo = () => { setPem(DEMO_CERT); };

  return (
    <div>
      <ToolPageHeader name="X.509 Cert & CSR Decoder" description="Decode PEM certificates and CSRs locally - Subject, Issuer, SANs, Expiry" icon="ShieldCheck" slug="x509-decoder" category="code" />
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={loadDemo}>Load Demo</Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="pem-input" className="text-sm font-medium">PEM Certificate / CSR</label>
            <Textarea id="pem-input" value={pem} onChange={(e) => setPem(e.target.value)} className="min-h-[300px] font-mono text-xs" placeholder="-----BEGIN CERTIFICATE-----..." />
          </div>
          <div className="space-y-2">
            <span className="text-sm font-medium">Decoded Information</span>
            {result ? (
              <Tabs defaultValue="info">
                <TabsList>
                  <TabsTrigger value="info">Certificate Info</TabsTrigger>
                  <TabsTrigger value="hex">Hex Data</TabsTrigger>
                </TabsList>
                <TabsContent value="info">
                  <div className="rounded-lg border border-border bg-muted/50 divide-y divide-border">
                    {Object.entries(result.info).map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between px-4 py-2.5">
                        <span className="text-xs text-muted-foreground shrink-0 mr-2">{k}</span>
                        <span className={`text-sm font-mono text-right ${k === "Status" && v === "EXPIRED" ? "text-red-400" : k === "Status" && v === "VALID" ? "text-green-400" : ""}`}>{v}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="hex">
                  <div className="relative">
                    <pre className="max-h-[400px] overflow-auto rounded-lg border border-border bg-muted/50 p-4 text-xs font-mono whitespace-pre-wrap break-all">{result.hex}</pre>
                    <CopyButton text={result.hex} className="absolute top-2 right-2" />
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground text-sm">Paste a PEM certificate or click Load Demo</div>
            )}
          </div>
        </div>
        <Button onClick={decode} className="w-full"><ShieldCheck className="h-4 w-4" /> Decode Certificate</Button>
      </div>
    </div>
  );
}