import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Ellipsis } from "lucide-react"
import { notFound } from "next/navigation"

import { ActivityDetailActions } from "@/components/calendar/ActivityDetailActions"
import { FeedCard } from "@/components/feed/FeedCard"
import { Badge } from "@/components/ui/badge"
import { feedItems } from "@/lib/mock/feed"
import {
  getCalendarActivityBySlug,
  upcomingStatusLabel,
} from "@/lib/mock/calendar"
import { cn } from "@/lib/utils"
import type { ActivityPlatform } from "@/lib/types/calendar"

const platformAccent: Record<ActivityPlatform, string> = {
  微博: "bg-rose-50 text-rose-600 ring-1 ring-rose-100",
  小红书: "bg-orange-50 text-orange-600 ring-1 ring-orange-100",
  抖音: "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
  INS: "bg-fuchsia-50 text-fuchsia-700 ring-1 ring-fuchsia-100",
  腾讯视频: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  淘宝直播: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  品牌官方: "bg-violet-50 text-violet-700 ring-1 ring-violet-100",
}

export default async function ActivityDetailPage(
  props: PageProps<"/calendar/[slug]">
) {
  const { slug } = await props.params
  const activity = getCalendarActivityBySlug(slug)

  if (!activity) {
    notFound()
  }

  const relatedUpdates = feedItems.filter((item) =>
    item.relatedActivityIds?.includes(activity.id)
  )

  const statusLabel =
    activity.phase === "upcoming" ? upcomingStatusLabel[activity.status] : "已结束"

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
                href="/calendar"
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
                  src={activity.image.src}
                  alt={activity.image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 430px) 100vw, 430px"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-zinc-950/35 to-transparent" />
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge
                    className={cn(
                      "h-5 px-1.5 text-[10px] font-medium",
                      platformAccent[activity.platform]
                    )}
                  >
                    {activity.platform}
                  </Badge>
                  <Badge className="h-5 bg-violet-50 px-1.5 text-[10px] font-medium text-violet-700 ring-1 ring-violet-100">
                    {statusLabel}
                  </Badge>
                </div>

                <h1 className="mt-3 text-[24px] leading-8 font-semibold tracking-tight text-zinc-900">
                  {activity.title}
                </h1>

                <div className="mt-3 rounded-3xl border border-violet-100/70 bg-white/90 px-4 py-3 text-sm text-zinc-600 shadow-[0_4px_16px_rgba(91,33,182,0.05)] ring-1 ring-violet-100/60">
                  <div className="text-[11px] text-zinc-500">活动时间</div>
                  <div className="mt-1 font-medium text-zinc-800">{activity.date}</div>
                </div>

                <p className="mt-4 text-[14px] leading-6 text-zinc-600">
                  {activity.description}
                </p>

                <ActivityDetailActions
                  activityId={activity.id}
                  phase={activity.phase}
                />
              </div>
            </section>

            <section className="mt-7" aria-labelledby="related-updates-heading">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2
                    id="related-updates-heading"
                    className="text-[15px] font-semibold tracking-tight text-zinc-900"
                  >
                    相关动态
                  </h2>
                </div>
              </div>

              <div className="mt-3 flex flex-col gap-2.5">
                {relatedUpdates.length > 0 ? (
                  relatedUpdates.map((item) => <FeedCard key={item.id} item={item} />)
                ) : (
                  <div className="rounded-[24px] border border-violet-100/60 bg-white/95 px-4 py-8 text-center text-sm text-zinc-500 ring-1 ring-violet-100/50">
                    暂无关联动态 ✨
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
