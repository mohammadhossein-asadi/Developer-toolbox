"use client";
import { useParams } from "react-router-dom";
import { getToolBySlug } from "@/lib/constants";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const toolModules: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  // Category A
  "json-formatter": lazy(() => import("./tools/json-formatter/page")),
  "base64-tool": lazy(() => import("./tools/base64-tool/page")),
  "url-encoder": lazy(() => import("./tools/url-encoder/page")),
  "jwt-debugger": lazy(() => import("./tools/jwt-decoder/page")),
  "markdown-preview": lazy(() => import("./tools/markdown-preview/page")),
  "regex-tester": lazy(() => import("./tools/regex-tester/page")),
  "css-flexgrid": lazy(() => import("./tools/css-flexgrid/page")),
  "diff-checker": lazy(() => import("./tools/diff-checker/page")),
  "timestamp-converter": lazy(() => import("./tools/timestamp-converter/page")),
  "hash-generator": lazy(() => import("./tools/hash-generator/page")),
  // Category B - Niche
  "x509-decoder": lazy(() => import("./tools/x509-decoder/page")),
  "cbor-msgpack": lazy(() => import("./tools/cbor-msgpack/page")),
  "cidr-calculator": lazy(() => import("./tools/cidr-calculator/page")),
  "k8s-splitter": lazy(() => import("./tools/k8s-splitter/page")),
  "svg-optimizer": lazy(() => import("./tools/svg-optimizer/page")),
  "mock-generator": lazy(() => import("./tools/mock-generator/page")),
  "jwt-generator": lazy(() => import("./tools/jwt-generator/page")),
  "env-converter": lazy(() => import("./tools/env-converter/page")),
  "unicode-inspector": lazy(() => import("./tools/unicode-inspector/page")),
  "rsa-keygen": lazy(() => import("./tools/rsa-keygen/page")),
  "ddl-parser": lazy(() => import("./tools/ddl-parser/page")),
  "css-purger": lazy(() => import("./tools/css-purger/page")),
  "curl-converter": lazy(() => import("./tools/curl-converter/page")),
  "graphql-visualizer": lazy(() => import("./tools/graphql-visualizer/page")),
  // Existing
  "jwt-decoder": lazy(() => import("./tools/jwt-decoder/page")),
  "uuid-generator": lazy(() => import("./tools/uuid-generator/page")),
  "qr-generator": lazy(() => import("./tools/qr-generator/page")),
  "color-picker": lazy(() => import("./tools/color-picker/page")),
  "gradient-generator": lazy(() => import("./tools/gradient-generator/page")),
  "html-preview": lazy(() => import("./tools/html-preview/page")),
  "css-playground": lazy(() => import("./tools/css-playground/page")),
  "code-assistant": lazy(() => import("./tools/code-assistant/page")),
  "lorem-ipsum": lazy(() => import("./tools/lorem-ipsum/page")),
  "json-csv-converter": lazy(() => import("./tools/json-csv-converter/page")),
  "cron-parser": lazy(() => import("./tools/cron-parser/page")),
  "password-generator": lazy(() => import("./tools/password-generator/page")),
  "text-case-converter": lazy(() => import("./tools/text-case-converter/page")),
  "ip-lookup": lazy(() => import("./tools/ip-lookup/page")),
  "color-palette": lazy(() => import("./tools/color-palette/page")),
  "css-unit-converter": lazy(() => import("./tools/css-unit-converter/page")),
  "number-base-converter": lazy(() => import("./tools/number-base-converter/page")),
};

function Loading() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-4">
      <Skeleton className="h-12 w-64" />
      <Skeleton className="h-4 w-96" />
      <div className="grid grid-cols-2 gap-4 mt-8">
        <Skeleton className="h-[400px]" />
        <Skeleton className="h-[400px]" />
      </div>
    </div>
  );
}

export default function ToolPage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = getToolBySlug(slug || "");
  const Component = toolModules[slug || ""];

  if (!tool || !Component) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center glass rounded-2xl p-8 max-w-md">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <p className="text-muted-foreground text-lg mb-6">This tool could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">
      <Suspense fallback={<Loading />}>
        <Component />
      </Suspense>
    </div>
  );
}
