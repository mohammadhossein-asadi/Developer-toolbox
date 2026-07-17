"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";
import toast from "react-hot-toast";

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const handle = async () => { await copyToClipboard(text); setCopied(true); toast.success("Copied!"); setTimeout(() => setCopied(false), 2000); };
  return (
    <Button variant="outline" size="sm" onClick={handle} className={className}>
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
}
