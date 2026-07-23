import type { ToolDef } from "@/types/tool";
import {
  Braces, KeyRound, Binary, Fingerprint, QrCode, Regex, Palette, Rainbow,
  Clock, FileText, Code, Paintbrush, Sparkles, Hash, Link as LinkIcon,
  ArrowLeftRight, CaseSensitive, Globe, Ruler, Network, ShieldCheck,
  Container, PenTool, Database, FileKey, ScanText, Lock, Table, Scissors,
  Terminal, LayoutGrid, GitCompare, SwatchBook, Shield, Home,
} from "lucide-react";

export const ICON_MAP: Record<string, React.ElementType> = {
  Braces, KeyRound, Binary, Fingerprint, QrCode, Regex, Palette, Rainbow,
  Clock, FileText, Code, Paintbrush, Sparkles, Hash, Link: LinkIcon,
  ArrowLeftRight, CaseSensitive, Globe, Ruler, Network, ShieldCheck,
  Container, PenTool, Database, FileKey, ScanText, Lock, Table, Scissors,
  Terminal, LayoutGrid, GitCompare, SwatchBook, Shield, Home,
};

export function getIcon(name: string): React.ElementType {
  return ICON_MAP[name] || Code;
}

export const tools: ToolDef[] = [
  // === Category A: Common Tools ===
  { slug: "json-formatter", name: "JSON Formatter & Validator", description: "Format, minify, validate with tree-view and schema validation", icon: "Braces", category: "code", keywords: ["json", "format", "minify", "validate", "tree", "schema"] },
  { slug: "base64-tool", name: "Base64 File & Text Converter", description: "Drag-and-drop files, encode/decode Base64 in-browser", icon: "Binary", category: "conversion", keywords: ["base64", "encode", "decode", "file", "drag"] },
  { slug: "url-encoder", name: "URL Encoder / Decoder", description: "Encode/decode URLs with query string table view", icon: "Link", category: "conversion", keywords: ["url", "encode", "decode", "query", "percent"] },
  { slug: "jwt-debugger", name: "JWT Debugger", description: "Decode JWT header/payload, expiration warnings, timestamp analysis", icon: "KeyRound", category: "code", keywords: ["jwt", "token", "decode", "expire", "header", "payload"] },
  { slug: "markdown-preview", name: "Markdown to HTML Previewer", description: "Live synchronized scrolling Markdown preview with GitHub styling", icon: "FileText", category: "text", keywords: ["markdown", "preview", "github", "html", "md"] },
  { slug: "regex-tester", name: "Regex Tester & Explainer", description: "Live matching with visual capturing group breakdown", icon: "Regex", category: "code", keywords: ["regex", "regular", "expression", "pattern", "group", "explain"] },
  { slug: "css-flexgrid", name: "CSS Flexbox & Grid Generator", description: "Visual interactive playground outputting CSS/Tailwind code", icon: "LayoutGrid", category: "design", keywords: ["css", "flexbox", "grid", "layout", "tailwind"] },
  { slug: "diff-checker", name: "Diff Checker", description: "Side-by-side and inline text comparison with highlighting", icon: "GitCompare", category: "text", keywords: ["diff", "compare", "text", "highlight", "change"] },
  { slug: "timestamp-converter", name: "Epoch / Unix Timestamp Converter", description: "Live converting to ISO, UTC, local, and relative times", icon: "Clock", category: "conversion", keywords: ["timestamp", "unix", "epoch", "date", "time", "iso"] },
  { slug: "hash-generator", name: "Hash & HMAC Generator", description: "SHA-256, SHA-512, MD5, HMAC via Web Crypto API locally", icon: "Hash", category: "conversion", keywords: ["hash", "md5", "sha", "hmac", "crypto", "digest"] },

  // === Category B: Niche Tools ===
  { slug: "x509-decoder", name: "X.509 Cert & CSR Decoder", description: "Decode PEM certificates and CSRs locally - Subject, Issuer, SANs, Expiry", icon: "ShieldCheck", category: "code", keywords: ["x509", "certificate", "csr", "pem", "ssl", "tls"] },
  { slug: "cbor-msgpack", name: "CBOR & MsgPack Translator", description: "Convert binary serialization formats to/from JSON", icon: "Binary", category: "conversion", keywords: ["cbor", "msgpack", "binary", "iot", "web3", "serialize"] },
  { slug: "cidr-calculator", name: "CIDR Subnet Calculator", description: "IPv4/IPv6 subnet ranges, broadcast, masks without server pings", icon: "Network", category: "conversion", keywords: ["cidr", "subnet", "ip", "network", "ipv4", "ipv6"] },
  { slug: "k8s-splitter", name: "Kubernetes Multi-Doc Splitter", description: "Parse K8s YAML files separated by --- and extract resources", icon: "Container", category: "code", keywords: ["kubernetes", "k8s", "yaml", "split", "resource"] },
  { slug: "svg-optimizer", name: "SVG Path Optimizer", description: "Strip metadata, round coordinates, minify SVG with live preview", icon: "PenTool", category: "design", keywords: ["svg", "optimize", "path", "minify", "round"] },
  { slug: "mock-generator", name: "Schema-Based Mock Generator", description: "Generate SQL inserts, CSV, or nested JSON from custom schemas", icon: "Database", category: "generator", keywords: ["mock", "generator", "sql", "csv", "schema", "fake"] },
  { slug: "jwt-generator", name: "JWT Generator (Mock Sandbox)", description: "Generate dummy JWTs with custom headers, payloads, mock secrets", icon: "KeyRound", category: "generator", keywords: ["jwt", "generate", "mock", "sandbox", "token"] },
  { slug: "env-converter", name: ".env ↔ JSON Converter", description: "Convert environment variables to nested JSON and back, flag syntax bugs", icon: "FileKey", category: "conversion", keywords: ["env", "environment", "json", "config", "dotenv"] },
  { slug: "unicode-inspector", name: "HTML Entities / Unicode Inspector", description: "Encode/decode entities, detect invisible/suspicious Unicode characters", icon: "ScanText", category: "text", keywords: ["unicode", "html", "entity", "homoglyph", "phishing", "invisible"] },
  { slug: "rsa-keygen", name: "RSA Key Pair Generator", description: "Generate RSA Public/Private key pairs in PEM via Web Crypto API", icon: "Lock", category: "generator", keywords: ["rsa", "key", "pem", "public", "private", "crypto"] },
  { slug: "ddl-parser", name: "Database DDL to JSON / Mermaid", description: "Parse SQL CREATE TABLE to JSON Schema or visual Mermaid ER diagrams", icon: "Table", category: "code", keywords: ["sql", "ddl", "create", "table", "mermaid", "schema", "er"] },
  { slug: "css-purger", name: "CSS Purger & Class Analyzer", description: "Scan HTML for unused CSS classes, show KB saved", icon: "Scissors", category: "design", keywords: ["css", "purge", "unused", "class", "optimize", "minify"] },
  { slug: "curl-converter", name: "Curl Command Converter", description: "Parse curl to Fetch, Axios, Python Requests, or Go HTTP code", icon: "Terminal", category: "code", keywords: ["curl", "fetch", "axios", "python", "go", "http", "convert"] },
  { slug: "graphql-visualizer", name: "GraphQL Schema Visualizer", description: "SDL to searchable index tree of Queries, Mutations, and Types", icon: "Network", category: "code", keywords: ["graphql", "schema", "sdl", "query", "mutation", "type"] },

  // === Existing Tools ===
  { slug: "uuid-generator", name: "UUID Generator", description: "Generate UUIDs v1, v4, v6, and v7", icon: "Fingerprint", category: "generator", keywords: ["uuid", "v1", "v4", "v6", "v7"] },
  { slug: "qr-generator", name: "QR Code Generator", description: "Generate QR codes for text, URLs, WiFi, and more", icon: "QrCode", category: "generator", keywords: ["qr", "qrcode", "wifi", "url"] },
  { slug: "color-picker", name: "Color Picker", description: "Pick colors, check contrast, and explore harmonies", icon: "Palette", category: "design", keywords: ["color", "picker", "hex", "rgb", "hsl", "wcag"] },
  { slug: "gradient-generator", name: "Gradient Generator", description: "Create beautiful CSS gradients with live preview", icon: "Rainbow", category: "design", keywords: ["gradient", "linear", "radial", "conic", "css"] },
  { slug: "html-preview", name: "HTML Preview", description: "Live HTML/CSS/JS preview with responsive modes", icon: "Code", category: "code", keywords: ["html", "css", "javascript", "preview"] },
  { slug: "css-playground", name: "CSS Playground", description: "Experiment with CSS in real-time with live preview", icon: "Paintbrush", category: "design", keywords: ["css", "playground", "styles"] },
  { slug: "code-assistant", name: "Code Assistant", description: "Static code analysis with improvement suggestions", icon: "Sparkles", category: "code", keywords: ["ai", "code", "assist", "improve"] },
  { slug: "lorem-ipsum", name: "Lorem Ipsum Generator", description: "Generate placeholder text with paragraph/word counts", icon: "FileText", category: "text", keywords: ["lorem", "ipsum", "placeholder"] },
  { slug: "json-csv-converter", name: "JSON ↔ CSV Converter", description: "Convert between JSON arrays and CSV format", icon: "ArrowLeftRight", category: "conversion", keywords: ["json", "csv", "convert"] },
  { slug: "password-generator", name: "Password Generator", description: "Generate secure passwords with customizable options", icon: "Shield", category: "generator", keywords: ["password", "secure", "random"] },
  { slug: "text-case-converter", name: "Text Case Converter", description: "Convert text between camelCase, snake_case, and more", icon: "CaseSensitive", category: "text", keywords: ["case", "camel", "snake", "kebab"] },
  { slug: "ip-lookup", name: "IP Address Lookup", description: "Show local/public IP address and browser info", icon: "Globe", category: "conversion", keywords: ["ip", "address", "network"] },
  { slug: "color-palette", name: "Color Palette Generator", description: "Generate color palettes from a base color", icon: "SwatchBook", category: "design", keywords: ["color", "palette", "scheme"] },
  { slug: "css-unit-converter", name: "CSS Unit Converter", description: "Convert between px, rem, em, vh, vw, and %", icon: "Ruler", category: "conversion", keywords: ["css", "unit", "convert", "px", "rem"] },
  { slug: "number-base-converter", name: "Number Base Converter", description: "Convert between binary, octal, decimal, hex, and base-36", icon: "Hash", category: "conversion", keywords: ["number", "base", "binary", "hex"] },
  { slug: "cron-parser", name: "Cron Expression Parser", description: "Build, validate, and understand cron expressions with human-readable descriptions", icon: "Clock", category: "code", keywords: ["cron", "schedule", "expression", "timer", "job"] },
];

export const categories = [
  { slug: "code", name: "Code" },
  { slug: "text", name: "Text" },
  { slug: "design", name: "Design" },
  { slug: "conversion", name: "Conversion" },
  { slug: "generator", name: "Generator" },
] as const;

export function getToolBySlug(slug: string): ToolDef | undefined {
  return tools.find((t) => t.slug === slug);
}