import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useToolState } from "./use-tool-state";

describe("useToolState", () => {
  it("returns the initial value when storage is empty", () => {
    const { result } = renderHook(() => useToolState("test-key", "hello"));
    expect(result.current[0]).toBe("hello");
  });

  it("persists value to localStorage", async () => {
    const { result } = renderHook(() => useToolState("persist-key", "init"));
    act(() => result.current[1]("updated"));
    expect(result.current[0]).toBe("updated");
    // Debounced write
    await act(async () => {
      await new Promise((r) => setTimeout(r, 400));
    });
    expect(JSON.parse(localStorage.getItem("toolbox:persist-key")!)).toBe("updated");
  });

  it("restores value from localStorage on mount", () => {
    localStorage.setItem("toolbox:restore-key", JSON.stringify({ a: 1 }));
    const { result } = renderHook(() => useToolState<{ a: number }>("restore-key", { a: 0 }));
    expect(result.current[0]).toEqual({ a: 1 });
  });

  it("reset clears storage and restores initial", () => {
    localStorage.setItem("toolbox:reset-key", JSON.stringify("old"));
    const { result } = renderHook(() => useToolState("reset-key", "initial"));
    expect(result.current[0]).toBe("old");
    act(() => result.current[2]());
    expect(result.current[0]).toBe("initial");
    expect(localStorage.getItem("toolbox:reset-key")).toBeNull();
  });

  it("falls back to initial value on corrupted storage", () => {
    localStorage.setItem("toolbox:bad-key", "{not json");
    const { result } = renderHook(() => useToolState("bad-key", "fallback"));
    expect(result.current[0]).toBe("fallback");
  });
});
