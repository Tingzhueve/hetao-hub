"use client"

import * as React from "react"

type FavoritesContextValue = {
  favoriteIds: string[]
  clearFavorites: () => void
  isFavorited: (itemId: string) => boolean
  toggleFavorite: (itemId: string) => void
}

const FavoritesContext = React.createContext<FavoritesContextValue | null>(null)

const FAVORITES_STORAGE_KEY = "walnut-intelligence:favorites"

function readFavorites() {
  const rawValue = window.localStorage.getItem(FAVORITES_STORAGE_KEY)
  if (!rawValue) return []

  try {
    const parsed = JSON.parse(rawValue)
    return Array.isArray(parsed)
      ? parsed.filter((value): value is string => typeof value === "string")
      : []
  } catch {
    return []
  }
}

export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [favoriteIds, setFavoriteIds] = React.useState<string[]>([])

  React.useEffect(() => {
    setFavoriteIds(readFavorites())
  }, [])

  React.useEffect(() => {
    function syncFavorites(event: StorageEvent) {
      if (event.key !== FAVORITES_STORAGE_KEY) return
      setFavoriteIds(readFavorites())
    }

    window.addEventListener("storage", syncFavorites)
    return () => window.removeEventListener("storage", syncFavorites)
  }, [])

  const toggleFavorite = React.useCallback((itemId: string) => {
    setFavoriteIds((current) => {
      const next = current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId]

      window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const clearFavorites = React.useCallback(() => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([]))
    setFavoriteIds([])
  }, [])

  const value = React.useMemo<FavoritesContextValue>(
    () => ({
      clearFavorites,
      favoriteIds,
      isFavorited: (itemId) => favoriteIds.includes(itemId),
      toggleFavorite,
    }),
    [clearFavorites, favoriteIds, toggleFavorite]
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = React.useContext(FavoritesContext)

  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }

  return context
}
