"use client";
import { useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => setInput("hello world example text")}>Load Demo</Button></div>
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function toCamel(s: string) { return s.replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()).replace(/^[A-Z]/, (c) => c.toLowerCase()); }
function toSnake(s: string) { return s.replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[\s\-]+/g, "_").toLowerCase(); }
function toKebab(s: string) { return s.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase(); }
function toPascal(s: string) { return s.replace(/(^|[\s_\-])(\w)/g, (_, __, c) => c.toUpperCase()); }
function toUpper(s: string) { return s.toUpperCase(); }
function toLower(s: string) { return s.toLowerCase(); }
function toTitle(s: string) { return s.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()); }
function toSentence(s: string) { return s.replace(/(^\s*|[.!?]\s+)(\w)/g, (m, p, c) => p + c.toUpperCase()).toLowerCase(); }

const cases = [
  { name: "camelCase", fn: toCamel },
  { name: "snake_case", fn: toSnake },
  { name: "kebab-case", fn: toKebab },
  { name: "PascalCase", fn: toPascal },
  { name: "UPPER_CASE", fn: toUpper },
  { name: "lower_case", fn: toLower },
  { name: "Title Case", fn: toTitle },
  { name: "Sentence case", fn: toSentence },
];

export default function TextCaseConverterPage() {
  const [input, setInput] = useState("hello world example text");
  const [output, setOutput] = useState("");

  return (
    <div>
      <ToolPageHeader name="Text Case Converter" description="Convert text between camelCase, snake_case, kebab-case, and more" icon="CaseSensitive" slug="text-case-converter" category="text" copyText={output} />
        <div className="flex gap-2 mb-4"><Button variant="outline" size="sm" onClick={() => setInput("hello world example text")}>Load Demo</Button></div>
      <div className="space-y-4">
        <div className="space-y-2"><span className="text-sm font-medium">Input</span><Textarea value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[100px] font-mono text-sm" /></div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {cases.map((c) => <Button key={c.name} variant="outline" size="sm" onClick={() => setOutput(c.fn(input))}>{c.name}</Button>)}
        </div>
        {output && (
          <div className="space-y-2"><div className="flex items-center justify-between"><span className="text-sm font-medium">Output</span><CopyButton text={output} /></div>
            <pre className="min-h-[100px] rounded-lg border border-border bg-muted/50 p-4 font-mono text-sm whitespace-pre-wrap">{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
