import { useCallback, useEffect, useState } from "react";

/**
 * Sync a single string value to a URL query parameter so tool state is shareable.
 * Reads the initial value from `?key=` (decoded), writes back on change via history.replaceState.
 */
export function useUrlState(key: string): [string, (v: string) => void] {
  const [value, setValue] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get(key) ?? "";
  });

  const set = useCallback(
    (v: string) => {
      setValue(v);
      const params = new URLSearchParams(window.location.search);
      if (v) params.set(key, v);
      else params.delete(key);
      const qs = params.toString();
      window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
    },
    [key]
  );

  useEffect(() => {
    const onPop = () => {
      setValue(new URLSearchParams(window.location.search).get(key) ?? "");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [key]);

  return [value, set];
}
