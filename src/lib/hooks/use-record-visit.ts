import { useEffect } from "react";
import { useFavorites } from "@/lib/stores/favorites";

export function useRecordVisit(slug?: string) {
  const recordVisit = useFavorites((s) => s.recordVisit);
  useEffect(() => {
    if (slug) recordVisit(slug);
  }, [slug, recordVisit]);
}
