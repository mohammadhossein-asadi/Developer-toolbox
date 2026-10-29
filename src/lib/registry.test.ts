import { describe, it, expect } from "vitest";
import { tools, categories, getIcon } from "./constants";
import { toolModules } from "../ToolPage";

describe("tool registry integrity", () => {
  it("has no duplicate slugs", () => {
    const slugs = tools.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every tool has a non-empty name and description", () => {
    for (const tool of tools) {
      expect(tool.name.length, tool.slug).toBeGreaterThan(0);
      expect(tool.description.length, tool.slug).toBeGreaterThan(0);
    }
  });

  it("every tool has a valid category", () => {
    const validCategories = new Set(categories.map((c) => c.slug));
    for (const tool of tools) {
      expect(validCategories.has(tool.category), `${tool.slug} has category "${tool.category}"`).toBe(true);
    }
  });

  it("every tool icon resolves in the icon map", () => {
    for (const tool of tools) {
      const Icon = getIcon(tool.icon);
      expect(Icon, `icon "${tool.icon}" for ${tool.slug} should not fall back`).not.toBe(getIcon("__nonexistent__"));
    }
  });

  it("every tool has a lazy page module", () => {
    for (const tool of tools) {
      expect(toolModules[tool.slug], `${tool.slug} is missing a page module`).toBeDefined();
    }
  });

  it("every page module is registered in the tool list (no orphans)", () => {
    const slugs = new Set(tools.map((t) => t.slug));
    const orphans = Object.keys(toolModules).filter((slug) => !slugs.has(slug));
    expect(orphans, `orphan modules found: ${orphans.join(", ")}`).toEqual([]);
  });

  it("every tool has at least one keyword", () => {
    for (const tool of tools) {
      expect(tool.keywords.length, tool.slug).toBeGreaterThan(0);
    }
  });
});
