"use client";
import { useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";

function arrayBufferToPem(buffer: ArrayBuffer, label: string): string {
  const bytes = new Uint8Array(buffer);
  let binary = ""; for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  const b64 = btoa(binary).match(/.{1,64}/g)!.join("\n");
  return `-----BEGIN ${label}-----\n${b64}\n-----END ${label}-----`;
}

export default function RsaKeygenPage() {
  const [keySize, setKeySize] = useState(2048);
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [generating, setGenerating] = useState(false);

  const generate = async () => {
    setGenerating(true);
    try {
      const keyPair = await crypto.subtle.generateKey(
        { name: "RSA-OAEP", modulusLength: keySize, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
        true, ["encrypt", "decrypt"]
      );
      const pubRaw = await crypto.subtle.exportKey("spki", keyPair.publicKey);
      const privRaw = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
      setPublicKey(arrayBufferToPem(pubRaw, "PUBLIC KEY"));
      setPrivateKey(arrayBufferToPem(privRaw, "PRIVATE KEY"));
    } catch (e) { console.error(e); }
    setGenerating(false);
  };

  return (
    <div>
      <ToolPageHeader name="RSA Key Pair Generator" description="Generate RSA Public/Private key pairs in PEM via Web Crypto API" icon="Lock" slug="rsa-keygen" category="generator" />
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => {setKeySize(2048)}}>Load Demo</Button></div>
      <div className="space-y-4 max-w-2xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Key Size:</span>
            {[1024, 2048, 4096].map((s) => <Badge key={s} variant={keySize === s ? "default" : "outline"} className="cursor-pointer" onClick={() => setKeySize(s)}>{s}</Badge>)}
          </div>
          <Button onClick={generate} disabled={generating} size="sm"><Lock className="h-4 w-4" /> {generating ? "Generating..." : "Generate Keys"}</Button>
        </div>
        <div className="space-y-2"><div className="flex items-center justify-between"><span className="text-sm font-medium">Public Key</span>{publicKey && <CopyButton text={publicKey} />}</div>
          <pre className="min-h-[150px] rounded-lg border border-border bg-muted/50 p-4 overflow-auto text-xs font-mono whitespace-pre-wrap">{publicKey || "Click Generate"}</pre>
        </div>
        <div className="space-y-2"><div className="flex items-center justify-between"><span className="text-sm font-medium">Private Key</span>{privateKey && <CopyButton text={privateKey} />}</div>
          <pre className="min-h-[150px] rounded-lg border border-border bg-muted/50 p-4 overflow-auto text-xs font-mono whitespace-pre-wrap">{privateKey || "Click Generate"}</pre>
        </div>
        <p className="text-xs text-muted-foreground">Keys generated locally using Web Crypto API. Never leaves your browser.</p>
      </div>
    </div>
  );
}
