"use client";
import { useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { CopyButton } from "@/components/shared/copy-button";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Network } from "lucide-react";

const DEMO_SDL = `type User {
  id: ID!
  name: String!
  email: String!
  age: Int
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  createdAt: DateTime!
}

type Query {
  user(id: ID!): User
  users(limit: Int, offset: Int): [User!]!
  post(id: ID!): Post
  posts: [Post!]!
}

type Mutation {
  createUser(name: String!, email: String!): User!
  updateUser(id: ID!, name: String, email: String): User!
  deleteUser(id: ID!): Boolean!
  createPost(title: String!, content: String!, authorId: ID!): Post!
}

scalar DateTime`;

function parseSDL(sdl: string) {
  const types: { name: string; kind: string; fields: { name: string; type: string; required: boolean }[] }[] = [];
  const typeRegex = /(type|input|interface|enum|union)\s+(\w+)(?:\s+implements\s+\w+)?\s*\{([\s\S]*?)\}/g;
  let m;
  while ((m = typeRegex.exec(sdl)) !== null) {
    const kind = m[1]; const name = m[2]; const body = m[3];
    const fields = body.split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#") && !l.startsWith("//")).map((l) => {
      const parts = l.replace(/[!]/g, "").replace(/:\s*/, ":").split(":");
      const fname = parts[0]?.trim() || "";
      const ftype = parts.slice(1).join(":").trim() || "";
      const required = l.includes("!");
      const argsMatch = fname.match(/^(\w+)\((.+)\)/);
      return { name: argsMatch?.[1] || fname, type: ftype, required, args: argsMatch?.[2] || "" };
    }).filter((f) => f.name);
    types.push({ name, kind, fields });
  }
  const scalars = (sdl.match(/scalar\s+(\w+)/g) || []).map((s) => s.replace("scalar ", ""));
  return { types, scalars };
}

function searchSchema(parsed: ReturnType<typeof parseSDL>, query: string) {
  if (!query) return parsed.types;
  const q = query.toLowerCase();
  return parsed.types.filter((t) => t.name.toLowerCase().includes(q) || t.fields.some((f) => f.name.toLowerCase().includes(q) || f.type.toLowerCase().includes(q)));
}

export default function GraphQLVisualizerPage() {
  const [sdl, setSdl] = useState(DEMO_SDL);
  const [search, setSearch] = useState("");
  const [parsed, setParsed] = useState<ReturnType<typeof parseSDL> | null>(null);

  const parse = () => setParsed(parseSDL(sdl));
  const loadDemo = () => { setSdl(DEMO_SDL); setSearch(""); };

  const filtered = parsed ? searchSchema(parsed, search) : [];
  const queries = filtered.find((t) => t.name === "Query");
  const mutations = filtered.find((t) => t.name === "Mutation");

  return (
    <div>
      <ToolPageHeader name="GraphQL Schema Visualizer" description="SDL to searchable index tree of Queries, Mutations, and Types" icon="Network" slug="graphql-visualizer" category="code" />
      <div className="space-y-4">
        <div className="flex items-center gap-2"><Button variant="outline" size="sm" onClick={loadDemo}>Load Demo</Button></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2"><span className="text-sm font-medium">GraphQL SDL</span><Textarea value={sdl} onChange={(e) => setSdl(e.target.value)} className="min-h-[350px] font-mono text-xs" /></div>
          <div className="space-y-2"><span className="text-sm font-medium">Schema Index</span>
            {parsed ? (
              <div className="space-y-2 max-h-[400px] overflow-auto">
                <Input placeholder="Search types, fields..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-8 text-xs" />
                {parsed.scalars.length > 0 && <div className="flex items-center gap-1"><Badge variant="secondary">Scalars</Badge><span className="text-xs text-muted-foreground">{parsed.scalars.join(", ")}</span></div>}
                {queries && (
                  <div className="rounded-lg border border-border bg-muted/50 p-3">
                    <div className="flex items-center gap-2 mb-2"><Badge>Query</Badge></div>
                    {queries.fields.map((f) => <div key={f.name} className="text-xs font-mono ml-2"><span className="text-primary">{f.name}</span>: <span className="text-muted-foreground">{f.type}</span>{f.args && <span className="text-muted-foreground">({f.args})</span>}</div>)}
                  </div>
                )}
                {mutations && (
                  <div className="rounded-lg border border-border bg-muted/50 p-3">
                    <div className="flex items-center gap-2 mb-2"><Badge variant="destructive">Mutation</Badge></div>
                    {mutations.fields.map((f) => <div key={f.name} className="text-xs font-mono ml-2"><span className="text-primary">{f.name}</span>: <span className="text-muted-foreground">{f.type}</span>{f.args && <span className="text-muted-foreground">({f.args})</span>}</div>)}
                  </div>
                )}
                {filtered.filter((t) => t.name !== "Query" && t.name !== "Mutation").map((t) => (
                  <div key={t.name} className="rounded-lg border border-border bg-muted/50 p-3">
                    <div className="flex items-center gap-2 mb-2"><Badge variant="outline">{t.kind}</Badge><span className="text-sm font-medium">{t.name}</span></div>
                    {t.fields.map((f) => <div key={f.name} className="text-xs font-mono ml-2"><span className="text-primary">{f.name}</span>: <span className="text-muted-foreground">{f.type}</span>{f.required && <span className="text-destructive">!</span>}</div>)}
                  </div>
                ))}
              </div>
            ) : <div className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground text-sm">Paste GraphQL SDL or click Load Demo</div>}
          </div>
        </div>
        <Button onClick={parse} className="w-full"><Network className="h-4 w-4" /> Parse Schema</Button>
      </div>
    </div>
  );
}
