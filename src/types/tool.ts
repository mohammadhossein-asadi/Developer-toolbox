export interface ToolDef {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: "code" | "text" | "design" | "conversion" | "generator";
  keywords: string[];
}

export interface Snippet {
  id: string;
  toolSlug: string;
  title: string;
  content: string;
  createdAt: number;
}
