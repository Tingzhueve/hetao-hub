"use client"

import Image from "next/image"
import * as React from "react"
import { ExternalLink, Heart } from "lucide-react"

import type { FeedItem } from "@/lib/types/feed"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

function isNewWithin24Hours(publishedAt: string) {
  const s = publishedAt.trim()

  // MVP heuristic based on the provided mock strings
  if (s.includes("今天")) return true
  if (s.includes("分钟前")) return true

  const hourMatch = s.match(/(\d+)\s*小时/)
  if (hourMatch) {
    const hours = Number(hourMatch[1])
    return Number.isFinite(hours) && hours <= 24
  }

  return false
}

export function FeedCard({ item }: { item: FeedItem }) {
  const [isFavorited, setIsFavorited] = React.useState(false)
  const isNew = isNewWithin24Hours(item.publishedAt)

  return (
    <Card
      size="sm"
      className="rounded-3xl ring-1 ring-black/5 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
    >
      <CardHeader className="pb-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-white text-zinc-900 ring-1 ring-black/5">
              {item.source}
            </Badge>
            <Badge
              variant="secondary"
              className="bg-zinc-100 text-zinc-900 ring-1 ring-black/5"
            >
              {item.type}
            </Badge>
            {isNew ? (
              <Badge className="bg-violet-600 text-white ring-1 ring-violet-600/30">
                New
              </Badge>
            ) : null}
          </div>

          <div className="text-[11px] text-zinc-500 leading-none whitespace-nowrap pt-1">
            {item.publishedAt}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="mt-2 flex gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-[15px] leading-5 font-semibold tracking-tight text-zinc-900">
              {item.title}
            </div>
            <div className="mt-1 text-[13px] leading-5 text-zinc-600">
              {item.description}
            </div>
          </div>

          <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-2xl bg-muted ring-1 ring-black/5">
            <Image
              src={item.thumbnailUrl}
              alt={item.title}
              fill
              className="object-cover"
              sizes="72px"
              priority={false}
            />

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsFavorited((v) => !v)}
              className={cn(
                "absolute right-1 top-1 h-7 w-7 rounded-full bg-white/90 ring-1 ring-black/5 backdrop-blur",
                "hover:bg-white",
                isFavorited ? "text-violet-600" : "text-zinc-700"
              )}
              aria-label={isFavorited ? "取消收藏" : "收藏"}
            >
              <Heart className={cn("h-4 w-4", isFavorited && "fill-current")} />
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="justify-between gap-3">
        <div className="min-w-0 text-xs text-muted-foreground truncate">
          打开原平台查看详情
        </div>

        <a
          href={item.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ size: "sm" }),
            "shrink-0 bg-violet-600 hover:bg-violet-600/90"
          )}
        >
          查看原文 <ExternalLink className="ml-1 h-3.5 w-3.5" />
        </a>
      </CardFooter>
    </Card>
  )
}