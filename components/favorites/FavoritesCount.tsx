"use client"

import { useFavorites } from "@/components/favorites/FavoritesProvider"

export function FavoritesCount() {
  const { favoriteIds } = useFavorites()

  return <>{favoriteIds.length}</>
}
