"use client"

import * as React from "react"

import { FeedCard } from "@/components/feed/FeedCard"
import type { FeedItem, SourcePlatform } from "@/lib/types/feed"
import { cn } from "@/lib/utils"

export type PlatformFilter = "全部" | SourcePlatform

const PLATFORM_FILTERS: readonly PlatformFilter[] = [
  "全部",
  "微博",
  "小红书",
  "抖音",
  "INS",
  "腾讯视频",
  "淘宝直播",
] as const

export function FeedList({ items }: { items: FeedItem[] }) {
  const [selectedPlatform, setSelectedPlatform] =
    React.useState<PlatformFilter>("全部")

  const safeItems = React.useMemo(() => items ?? [], [items])

  const filteredItems = React.useMemo(() => {
    if (selectedPlatform === "全部") return safeItems
    return safeItems.filter((item) => item.source === selectedPlatform)
  }, [safeItems, selectedPlatform])

  return (
    <>
      <div className="-mx-5 overflow-x-auto px-5 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-2">
          {PLATFORM_FILTERS.map((platform) => (
            <button
              key={platform}
              type="button"
              onClick={() => setSelectedPlatform(platform)}
              className={cn(
                "inline-flex h-9 shrink-0 items-center rounded-full px-3.5 text-xs font-medium whitespace-nowrap transition-colors",
                selectedPlatform === platform
                  ? "bg-violet-600 text-white shadow-sm"
                  : "bg-white text-zinc-700 ring-1 ring-zinc-200/80"
              )}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-2">
        <h2 className="text-[15px] font-semibold tracking-tight text-zinc-900">
          🫧 最新动态
        </h2>
        <p className="mt-0.5 text-[12px] text-muted-foreground">
          今天也有新的惊喜
        </p>
      </div>

      <div className="mt-2.5 flex flex-col gap-2.5">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => <FeedCard key={item.id} item={item} />)
        ) : (
          <div className="rounded-2xl border border-violet-100/60 bg-white px-4 py-8 text-center text-sm text-zinc-500 ring-1 ring-violet-100/50">
            今天还没有这个平台的新动态 ✨
          </div>
        )}
      </div>
    </>
  )
}
