"use client";
import { useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Container } from "lucide-react";

const DEMO_K8S = `apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: default
data:
  key: value
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app
        image: nginx:latest
---
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: my-app
  ports:
  - port: 80
    targetPort: 8080`;

export default function K8sSplitterPage() {
  const [input, setInput] = useState(DEMO_K8S);
  const [docs, setDocs] = useState<{ name: string; kind: string; content: string }[]>([]);

  const split = () => {
    const parts = input.split(/^---$/m).filter((s) => s.trim());
    const parsed = parts.map((part) => {
      const kindMatch = part.match(/kind:\s*(.+)/);
      const nameMatch = part.match(/name:\s*(.+)/);
      return { kind: kindMatch?.[1]?.trim() || "Unknown", name: nameMatch?.[1]?.trim() || "unnamed", content: part.trim() };
    });
    setDocs(parsed);
  };

  const loadDemo = () => { setInput(DEMO_K8S); };

  return (
    <div>
      <ToolPageHeader name="Kubernetes Multi-Doc Splitter" description="Parse K8s YAML files separated by --- and extract resources" icon="Container" slug="k8s-splitter" category="code" />
      <div className="space-y-4">
        <div className="flex gap-2"><Button variant="outline" size="sm" onClick={loadDemo}>Load Demo</Button></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2"><span className="text-sm font-medium">K8s YAML Input</span><Textarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[400px] font-mono text-xs" /></div>
          <div className="space-y-2"><span className="text-sm font-medium">Extracted Resources ({docs.length})</span>
            {docs.length > 0 ? (
              <div className="space-y-2 max-h-[400px] overflow-auto">
                {docs.map((doc, i) => (
                  <div key={i} className="rounded-lg border border-border bg-muted/50 p-3">
                    <div className="flex items-center gap-2 mb-2"><Badge variant="secondary">{doc.kind}</Badge><span className="text-sm font-medium">{doc.name}</span></div>
                    <pre className="text-xs font-mono whitespace-pre-wrap overflow-auto max-h-[150px]">{doc.content}</pre>
                    <CopyButton text={doc.content} className="mt-2" />
                  </div>
                ))}
              </div>
            ) : <div className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground text-sm">Paste K8s YAML or click Load Demo</div>}
          </div>
        </div>
        <Button onClick={split} className="w-full"><Container className="h-4 w-4" /> Split Resources</Button>
      </div>
    </div>
  );
}
