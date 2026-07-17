"use client";
import { CopyButton } from "./copy-button";
import { Badge } from "@/components/ui/badge";
import * as Icons from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getIcon(name: string) { const Icon = (Icons as any)[name]; return Icon || Icons.Code; }

export function ToolPageHeader({ name, description, icon, slug, category, copyText }: { name: string; description: string; icon: string; slug: string; category: string; copyText?: string }) {
  const Icon = getIcon(icon);
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{name}</h1>
            <Badge variant="secondary" className="capitalize">{category}</Badge>
          </div>
          <p className="text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
      {copyText && <CopyButton text={copyText} />}
    </div>
  );
}
