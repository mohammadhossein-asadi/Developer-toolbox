import { useState, useCallback } from "react";
import { format as formatSql } from "sql-formatter";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton, ResetButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import { useToolState } from "@/lib/hooks/use-tool-state";

const DEMO = "select u.id, u.name, count(o.id) as order_count from users u left join orders o on o.user_id = u.id where u.created_at > '2024-01-01' group by u.id, u.name having count(o.id) > 5 order by order_count desc limit 20;";

export default function SqlFormatterPage() {
  const [input, setInput, reset] = useToolState("sql-input", DEMO);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("postgresql");
  const [indent, setIndent] = useState("2");

  const format = useCallback(() => {
    try {
      setOutput(formatSql(input, { language, tabWidth: parseInt(indent, 10), keywordCase: "upper" }));
      setError("");
    } catch (e: unknown) {
      setError((e as Error).message);
      setOutput("");
    }
  }, [input, language, indent]);

  return (
    <div>
      <ToolPageHeader name="SQL Formatter" description="Pretty-print SQL for PostgreSQL, MySQL, SQLite, and more" icon="Table" slug="sql-formatter" category="code" copyText={output} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="h-8 w-40 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="postgresql">PostgreSQL</SelectItem>
                <SelectItem value="mysql">MySQL</SelectItem>
                <SelectItem value="sqlite">SQLite</SelectItem>
                <SelectItem value="mariadb">MariaDB</SelectItem>
                <SelectItem value="bigquery">BigQuery</SelectItem>
                <SelectItem value="transactsql">T-SQL</SelectItem>
                <SelectItem value="plsql">PL/SQL</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Indent:</span>
              {["2", "4", "tab"].map((n) => <Button key={n} size="sm" variant={indent === n ? "default" : "ghost"} className="h-7 px-2 text-xs" onClick={() => setIndent(n)}>{n}</Button>)}
            </div>
            <div className="ml-auto flex gap-2">
              <ResetButton onReset={() => { reset(); setOutput(""); setError(""); }} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Input</span>
            {input.trim() && <Badge variant="secondary">{input.length} chars</Badge>}
          </div>
          <Textarea placeholder="Paste SQL here..." value={input} onChange={(e) => setInput(e.target.value)} className="min-h-[400px] font-mono text-sm" />
          <Button onClick={format} size="sm">Format</Button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Output</span>
            <div className="ml-auto"><CopyButton text={output} /></div>
          </div>
          {error ? (
            <div className="min-h-[400px] rounded-lg border border-destructive/50 bg-destructive/10 p-4 flex items-start gap-2"><AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" /><span className="text-sm text-destructive font-mono">{error}</span></div>
          ) : (
            <pre className="min-h-[400px] rounded-lg border border-border bg-muted/50 p-4 overflow-auto text-sm font-mono whitespace-pre-wrap">{output || <span className="text-muted-foreground">Formatted SQL will appear here...</span>}</pre>
          )}
        </div>
      </div>
    </div>
  );
}
