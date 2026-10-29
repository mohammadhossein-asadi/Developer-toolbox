import { describe, it, expect, beforeEach } from "vitest";
import { useFavorites } from "./favorites";

describe("useFavorites store", () => {
  beforeEach(() => {
    useFavorites.setState({ favorites: [], recents: [] });
  });

  it("toggles favorites on and off", () => {
    const { toggleFavorite } = useFavorites.getState();
    toggleFavorite("json-formatter");
    expect(useFavorites.getState().favorites).toEqual(["json-formatter"]);
    toggleFavorite("json-formatter");
    expect(useFavorites.getState().favorites).toEqual([]);
  });

  it("does not duplicate favorites", () => {
    const { toggleFavorite } = useFavorites.getState();
    toggleFavorite("json-formatter");
    toggleFavorite("json-formatter");
    toggleFavorite("json-formatter");
    expect(useFavorites.getState().favorites).toEqual(["json-formatter"]);
  });

  it("records visits with most-recent-first ordering", () => {
    const { recordVisit } = useFavorites.getState();
    recordVisit("a");
    recordVisit("b");
    recordVisit("a");
    expect(useFavorites.getState().recents).toEqual(["a", "b"]);
  });

  it("caps recents at 12 entries", () => {
    const { recordVisit } = useFavorites.getState();
    for (let i = 0; i < 20; i++) recordVisit(`tool-${i}`);
    expect(useFavorites.getState().recents.length).toBe(12);
    expect(useFavorites.getState().recents[0]).toBe("tool-19");
  });

  it("clears recents", () => {
    const { recordVisit, clearRecents } = useFavorites.getState();
    recordVisit("x");
    clearRecents();
    expect(useFavorites.getState().recents).toEqual([]);
  });
});
