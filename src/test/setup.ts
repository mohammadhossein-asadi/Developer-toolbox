import "@testing-library/jest-dom/vitest";
import { beforeEach } from "vitest";

// jsdom in this setup does not implement localStorage — provide a minimal in-memory polyfill
if (typeof globalThis.localStorage === "undefined") {
  const store = new Map<string, string>();
  const storage: Storage = {
    get length() {
      return store.size;
    },
    clear: () => store.clear(),
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    key: (i: number) => [...store.keys()][i] ?? null,
    removeItem: (k: string) => void store.delete(k),
    setItem: (k: string, v: string) => void store.set(k, String(v)),
  };
  Object.defineProperty(globalThis, "localStorage", { value: storage, configurable: true, writable: true });
}

beforeEach(() => {
  localStorage.clear();
});
