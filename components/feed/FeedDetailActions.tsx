"use client"

import * as React from "react"

import { useFavorites } from "@/components/favorites/FavoritesProvider"
import { cn } from "@/lib/utils"
import type { SourcePlatform } from "@/lib/types/feed"

const actionBaseClass =
  "inline-flex h-9 items-center justify-center rounded-full px-4 text-sm font-medium transition-colors active:scale-[0.98]"

type FeedDetailActionsProps = {
  itemId: string
  itemSource: SourcePlatform
  originalUrl: string
  primaryLabel: string
}

export function FeedDetailActions({
  itemId,
  itemSource: _itemSource,
  originalUrl,
  primaryLabel,
}: FeedDetailActionsProps) {
  const { isFavorited, toggleFavorite } = useFavorites()
  const favorited = isFavorited(itemId)

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <a
        href={originalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(actionBaseClass, "bg-violet-600 text-white shadow-sm")}
      >
        {primaryLabel}
      </a>
      <button
        type="button"
        onClick={() => toggleFavorite(itemId)}
        className={cn(
          actionBaseClass,
          favorited
            ? "bg-violet-100 text-violet-700 ring-1 ring-violet-200/80"
            : "bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200/80"
        )}
      >
        {favorited ? "已收藏" : "收藏"}
      </button>
    </div>
  )
}
