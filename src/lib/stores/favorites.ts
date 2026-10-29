import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: string[];
  recents: string[];
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  recordVisit: (slug: string) => void;
  clearRecents: () => void;
}

const MAX_RECENTS = 12;

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      recents: [],
      toggleFavorite: (slug) =>
        set((s) => ({
          favorites: s.favorites.includes(slug)
            ? s.favorites.filter((f) => f !== slug)
            : [...s.favorites, slug],
        })),
      isFavorite: (slug) => get().favorites.includes(slug),
      recordVisit: (slug) =>
        set((s) => ({ recents: [slug, ...s.recents.filter((r) => r !== slug)].slice(0, MAX_RECENTS) })),
      clearRecents: () => set({ recents: [] }),
    }),
    { name: "devtoolbox-favorites" }
  )
);
