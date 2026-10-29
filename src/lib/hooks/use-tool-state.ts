import { useEffect, useRef, useState } from "react";

/**
 * Persist tool state to localStorage under `toolbox:<key>`, debounced.
 * Returns [value, setValue, resetValue].
 */
export function useToolState<T>(key: string, initial: T): [T, (v: T) => void, () => void] {
  const storageKey = `toolbox:${key}`;
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw !== null ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const set = (v: T) => {
    setValue(v);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(v));
      } catch {
        /* storage full or unavailable — ignore */
      }
    }, 300);
  };

  const reset = () => {
    if (timer.current) clearTimeout(timer.current);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
    setValue(initial);
  };

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return [value, set, reset];
}
