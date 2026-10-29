import { useMemo, useState } from "react";
import { ToolPageHeader } from "@/components/shared/tool-page-header";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface StatusEntry {
  code: number;
  name: string;
  description: string;
  cls: "1xx" | "2xx" | "3xx" | "4xx" | "5xx";
}

const DATA: StatusEntry[] = [
  { code: 100, name: "Continue", description: "Client should continue with the request body.", cls: "1xx" },
  { code: 101, name: "Switching Protocols", description: "Server is switching protocols (e.g. WebSocket upgrade).", cls: "1xx" },
  { code: 103, name: "Early Hints", description: "Preliminary response headers before the final message.", cls: "1xx" },
  { code: 200, name: "OK", description: "The request succeeded.", cls: "2xx" },
  { code: 201, name: "Created", description: "A new resource was created (Location header points to it).", cls: "2xx" },
  { code: 202, name: "Accepted", description: "Request accepted but not yet processed (async jobs).", cls: "2xx" },
  { code: 204, name: "No Content", description: "Success with no response body (common for DELETE/PUT).", cls: "2xx" },
  { code: 206, name: "Partial Content", description: "Range request fulfilled (video streaming, resume downloads).", cls: "2xx" },
  { code: 301, name: "Moved Permanently", description: "Resource permanently moved — update bookmarks, SEO transfers.", cls: "3xx" },
  { code: 302, name: "Found", description: "Temporary redirect; method may change (use 307/308 to preserve).", cls: "3xx" },
  { code: 304, name: "Not Modified", description: "Cached version is fresh (ETag/If-Modified-Since).", cls: "3xx" },
  { code: 307, name: "Temporary Redirect", description: "Temporary redirect preserving the HTTP method.", cls: "3xx" },
  { code: 308, name: "Permanent Redirect", description: "Permanent redirect preserving the HTTP method.", cls: "3xx" },
  { code: 400, name: "Bad Request", description: "Malformed syntax or invalid payload.", cls: "4xx" },
  { code: 401, name: "Unauthorized", description: "Authentication required or failed (WWW-Authenticate).", cls: "4xx" },
  { code: 402, name: "Payment Required", description: "Reserved — sometimes used by paid APIs for quota limits.", cls: "4xx" },
  { code: 403, name: "Forbidden", description: "Authenticated but not permitted to access the resource.", cls: "4xx" },
  { code: 404, name: "Not Found", description: "Resource does not exist at this URL.", cls: "4xx" },
  { code: 405, name: "Method Not Allowed", description: "HTTP method not supported (Allow header lists valid ones).", cls: "4xx" },
  { code: 409, name: "Conflict", description: "Request conflicts with resource state (version conflicts).", cls: "4xx" },
  { code: 410, name: "Gone", description: "Resource permanently removed — stronger than 404.", cls: "4xx" },
  { code: 413, name: "Payload Too Large", description: "Request body exceeds server limits.", cls: "4xx" },
  { code: 415, name: "Unsupported Media Type", description: "Content-Type not supported by the endpoint.", cls: "4xx" },
  { code: 418, name: "I'm a teapot", description: "RFC 2324 joke status — occasionally returned on purpose.", cls: "4xx" },
  { code: 422, name: "Unprocessable Content", description: "Syntactically valid but semantically wrong (validation errors).", cls: "4xx" },
  { code: 425, name: "Too Early", description: "Server unwilling to risk processing a replayed request.", cls: "4xx" },
  { code: 429, name: "Too Many Requests", description: "Rate limit exceeded (Retry-After header).", cls: "4xx" },
  { code: 451, name: "Unavailable For Legal Reasons", description: "Blocked due to legal demands.", cls: "4xx" },
  { code: 500, name: "Internal Server Error", description: "Unexpected server-side failure.", cls: "5xx" },
  { code: 501, name: "Not Implemented", description: "Server does not support the functionality.", cls: "5xx" },
  { code: 502, name: "Bad Gateway", description: "Upstream server returned an invalid response (proxy).", cls: "5xx" },
  { code: 503, name: "Service Unavailable", description: "Overloaded or down for maintenance (Retry-After).", cls: "5xx" },
  { code: 504, name: "Gateway Timeout", description: "Upstream server did not respond in time.", cls: "5xx" },
  { code: 507, name: "Insufficient Storage", description: "Server out of space to complete the request.", cls: "5xx" },
  { code: 508, name: "Loop Detected", description: "Infinite loop detected while processing (WebDAV).", cls: "5xx" },
];

const clsColor: Record<StatusEntry["cls"], string> = {
  "1xx": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "2xx": "bg-green-500/10 text-green-400 border-green-500/20",
  "3xx": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "4xx": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "5xx": "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function HttpStatusPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return DATA;
    return DATA.filter((s) => String(s.code).includes(q) || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
  }, [search]);

  return (
    <div>
      <ToolPageHeader name="HTTP Status Reference" description="Searchable guide to HTTP status codes with plain-English explanations" icon="Globe" slug="http-status" category="code" />
      <div className="max-w-3xl space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by code, name, or meaning (e.g. 429, redirect, rate)..." className="pl-10 h-11" />
        </div>
        <div className="rounded-xl border border-border divide-y divide-border overflow-hidden">
          {filtered.map((s) => (
            <div key={s.code} className="flex items-start gap-4 p-4 bg-card/50 hover:bg-card transition-colors">
              <div className={`shrink-0 w-16 h-10 rounded-lg border flex items-center justify-center font-mono font-bold text-sm ${clsColor[s.cls]}`}>
                {s.code}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium">{s.name}</h3>
                  <Badge variant="outline" className="text-[9px] px-1.5 py-0 font-mono">{s.cls}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="p-8 text-center text-sm text-muted-foreground">No status codes match "{search}"</div>}
        </div>
      </div>
    </div>
  );
}
