import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Ellipsis } from "lucide-react"
import { notFound } from "next/navigation"

import { FeedDetailActions } from "@/components/feed/FeedDetailActions"
import { Badge } from "@/components/ui/badge"
import { getCalendarActivityById } from "@/lib/mock/calendar"
import { getFeedItemById } from "@/lib/mock/feed"
import { cn } from "@/lib/utils"
import type { SourcePlatform } from "@/lib/types/feed"

const platformAccent: Record<SourcePlatform, string> = {
  微博: "bg-rose-50 text-rose-600 ring-1 ring-rose-100",
  小红书: "bg-orange-50 text-orange-600 ring-1 ring-orange-100",
  抖音: "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
  INS: "bg-fuchsia-50 text-fuchsia-700 ring-1 ring-fuchsia-100",
  腾讯视频: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  淘宝直播: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
}

const platformLogo: Record<SourcePlatform, string> = {
  微博: "/logos/weibo.png",
  小红书: "/logos/redbook.png",
  抖音: "/logos/douyin.png",
  INS: "/logos/ins.png",
  腾讯视频: "/logos/tengxun.png",
  淘宝直播: "/logos/taobao.png",
}

function getPrimaryActionLabel(source: SourcePlatform) {
  switch (source) {
    case "微博":
      return "查看微博"
    case "小红书":
      return "查看笔记"
    case "抖音":
      return "查看视频"
    case "INS":
      return "查看INS"
    case "腾讯视频":
      return "立即观看"
    case "淘宝直播":
      return "查看直播"
    default:
      return "查看详情"
  }
}

export default async function FeedDetailPage(props: PageProps<"/feed/[id]">) {
  const { id } = await props.params
  const item = getFeedItemById(id)

  if (!item) {
    notFound()
  }

  const relatedActivityId = item.relatedActivityIds?.[0]
  const relatedActivity = relatedActivityId
    ? getCalendarActivityById(relatedActivityId)
    : undefined

  return (
    <div className="flex min-h-dvh w-full justify-center bg-white">
      <div className="relative w-full max-w-[430px] flex-1">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-gradient-to-b from-violet-50 via-violet-50/45 to-white"
          aria-hidden
        />

        <main className="relative px-5 pb-12 pt-4">
          <div className="safe-top">
            <div className="flex items-center justify-between gap-3">
              <Link
                href="/"
                className="inline-flex h-9 items-center gap-1 rounded-full border border-white/70 bg-white/85 px-3 text-sm font-medium text-zinc-700 shadow-[0_2px_10px_rgba(91,33,182,0.05)] ring-1 ring-violet-100/70 backdrop-blur-sm"
              >
                <ChevronLeft className="h-4 w-4" />
                返回
              </Link>

              <button
                type="button"
                aria-label="更多操作"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/85 text-zinc-600 shadow-[0_2px_10px_rgba(91,33,182,0.05)] ring-1 ring-violet-100/70 backdrop-blur-sm transition-colors active:bg-violet-50/80"
              >
                <Ellipsis className="h-4 w-4" />
              </button>
            </div>

            <section className="mt-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] ring-1 ring-violet-100/70">
                <Image
                  src={item.thumbnailUrl ?? "/images/feed/hetao.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 430px) 100vw, 430px"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-zinc-950/35 to-transparent" />
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-violet-100/70">
                    <Image
                      src={platformLogo[item.source]}
                      alt=""
                      width={18}
                      height={18}
                      className="h-[18px] w-[18px] object-contain"
                    />
                  </span>
                  <Badge
                    className={cn(
                      "h-5 px-1.5 text-[10px] font-medium",
                      platformAccent[item.source]
                    )}
                  >
                    {item.source}
                  </Badge>
                  <span className="text-[11px] text-zinc-500">{item.publishedAt}</span>
                </div>

                <h1 className="mt-3 text-[24px] leading-8 font-semibold tracking-tight text-zinc-900">
                  {item.title}
                </h1>

                <p className="mt-4 text-[14px] leading-6 text-zinc-600">
                  {item.description}
                </p>

                <FeedDetailActions
                  itemId={item.id}
                  itemSource={item.source}
                  originalUrl={item.originalUrl}
                  primaryLabel={getPrimaryActionLabel(item.source)}
                />
              </div>
            </section>

            {relatedActivity ? (
              <section className="mt-7" aria-labelledby="related-activity-heading">
                <div>
                  <h2
                    id="related-activity-heading"
                    className="text-[15px] font-semibold tracking-tight text-zinc-900"
                  >
                    相关活动
                  </h2>
                </div>

                <Link
                  href={`/calendar/${relatedActivity.slug}`}
                  className="mt-3 block rounded-[24px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
                >
                  <div className="rounded-[24px] border border-violet-100/70 bg-white/95 p-4 shadow-[0_4px_16px_rgba(91,33,182,0.06)] ring-1 ring-violet-100/60 transition-transform active:scale-[0.99]">
                    <div className="text-[15px] font-semibold tracking-tight text-zinc-900">
                      {relatedActivity.title}
                    </div>
                    <div className="mt-2 text-sm text-zinc-500">
                      {relatedActivity.date}
                    </div>

                    <div className="mt-4">
                      <span className="inline-flex h-9 items-center justify-center rounded-full bg-violet-600 px-4 text-sm font-medium text-white shadow-sm">
                        查看活动
                      </span>
                    </div>
                  </div>
                </Link>
              </section>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  )
}
