export interface ToolDef {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: "code" | "text" | "design" | "conversion" | "generator";
  keywords: string[];
}