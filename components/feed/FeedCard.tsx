"use client"

import Image from "next/image"
import * as React from "react"
import { ExternalLink, Heart } from "lucide-react"

import type { FeedItem } from "@/lib/types/feed"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function FeedCard({ item }: { item: FeedItem }) {
  const [isFavorited, setIsFavorited] = React.useState(false)

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[16/9] w-full bg-muted">
        <Image
          src={item.thumbnailUrl}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 430px) 100vw, 430px"
          priority={false}
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge className="bg-white/90 text-zinc-900 ring-1 ring-black/5">
            {item.source}
          </Badge>
          <Badge
            variant="secondary"
            className="bg-white/70 text-zinc-900 ring-1 ring-black/5"
          >
            {item.type}
          </Badge>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setIsFavorited((v) => !v)}
          className={cn(
            "absolute right-2 top-2 h-10 w-10 rounded-full bg-white/85 ring-1 ring-black/5 backdrop-blur",
            "hover:bg-white",
            isFavorited ? "text-violet-600" : "text-zinc-700"
          )}
          aria-label={isFavorited ? "取消收藏" : "收藏"}
        >
          <Heart className={cn("h-5 w-5", isFavorited && "fill-current")} />
        </Button>
      </div>

      <CardHeader className="gap-1">
        <CardTitle className="text-[15px] leading-6">{item.title}</CardTitle>
        <div className="text-sm text-muted-foreground">{item.description}</div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="text-xs text-zinc-500">{item.publishedAt}</div>
      </CardContent>

      <CardFooter className="justify-between">
        <div className="text-xs text-muted-foreground">打开原平台查看详情</div>
        <a
          href={item.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ size: "sm", className: "" }),
            "bg-violet-600 hover:bg-violet-600/90"
          )}
        >
          查看原文 <ExternalLink className="ml-1 h-4 w-4" />
        </a>
      </CardFooter>
    </Card>
  )
}

