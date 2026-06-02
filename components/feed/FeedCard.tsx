"use client"

import Image from "next/image"
import * as React from "react"
import type { FeedItem, SourcePlatform } from "@/lib/types/feed"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const THUMB_WIDTH_PX = 96

const platformLogo: Record<SourcePlatform, string> = {
  微博: "/logos/weibo.png",
  小红书: "/logos/redbook.png",
  抖音: "/logos/douyin.png",
  腾讯视频: "/logos/tengxun.png",
  淘宝直播: "/logos/taobao.png",
}

const softActionBase =
  "inline-flex h-7 shrink-0 items-center justify-center rounded-full px-3 text-[11px] font-medium transition-colors active:scale-[0.98]"

function getPrimaryActionLabel(source: SourcePlatform) {
  switch (source) {
    case "微博":
      return "查看微博"
    case "小红书":
      return "查看笔记"
    case "抖音":
      return "查看视频"
    case "腾讯视频":
      return "立即观看"
    case "淘宝直播":
      return "查看直播"
    default:
      return "查看详情"
  }
}

function PlatformIcon({ source }: { source: SourcePlatform }) {
  return (
    <span
      className="flex h-6 w-6 shrink-0 items-center justify-center"
      aria-hidden
    >
      <Image
        src={platformLogo[source]}
        alt=""
        width={24}
        height={24}
        className="h-full w-full object-contain"
      />
    </span>
  )
}

function FeedThumbnail({
  item,
  className,
}: {
  item: FeedItem
  className?: string
}) {
  if (!item.thumbnailUrl) return null

  return (
    <div
      className={cn(
        "relative h-[124px] w-[96px] shrink-0 overflow-hidden rounded-xl ring-1 ring-black/5",
        className
      )}
    >
      <Image
        src={item.thumbnailUrl}
        alt={item.title}
        fill
        className="object-cover"
        sizes={`${THUMB_WIDTH_PX}px`}
      />
    </div>
  )
}

export function FeedCard({ item }: { item: FeedItem }) {
  const [isFavorited, setIsFavorited] = React.useState(false)
  const primaryLabel = getPrimaryActionLabel(item.source)

  return (
    <Card
      size="sm"
      className="gap-0 rounded-2xl pb-1.5 pt-2.5 shadow-[0_1px_0_rgba(0,0,0,0.02)] ring-1 ring-black/5"
    >
      <CardContent className="px-0 pt-0 pb-0">
        <div className="flex items-start gap-3 pl-4 pr-3.5">
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-1">
                <PlatformIcon source={item.source} />
                <span className="truncate text-[11px] font-medium leading-none text-zinc-700">
                  {item.source}
                </span>
              </div>

              <span className="shrink-0 text-[10px] leading-none whitespace-nowrap text-zinc-500">
                {item.publishedAt}
              </span>
            </div>

            <div className="mt-0.5 text-[13px] leading-[18px] font-semibold tracking-tight text-zinc-900 line-clamp-2">
              {item.title}
            </div>
            <div className="mt-0.5 text-[11px] leading-4 text-zinc-600 line-clamp-2">
              {item.description}
            </div>

            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              <a
                href={item.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  softActionBase,
                  "bg-violet-100 text-violet-700 hover:bg-violet-100/80"
                )}
              >
                {primaryLabel}
              </a>

              <button
                type="button"
                onClick={() => setIsFavorited((v) => !v)}
                className={cn(
                  softActionBase,
                  "bg-zinc-100 text-zinc-600 hover:bg-zinc-100/80",
                  isFavorited && "bg-violet-50 text-violet-600"
                )}
                aria-label={isFavorited ? "取消收藏" : "收藏"}
              >
                {isFavorited ? "♥ 已收藏" : "♡ 收藏"}
              </button>
            </div>
          </div>

          <FeedThumbnail item={item} />
        </div>
      </CardContent>
    </Card>
  )
}
