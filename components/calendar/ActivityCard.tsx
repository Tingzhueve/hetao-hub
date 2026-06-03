"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import { upcomingStatusLabel } from "@/lib/mock/calendar"
import type {
  ActivityPlatform,
  PastActivity,
  UpcomingActivity,
} from "@/lib/types/calendar"

const platformAccent: Record<ActivityPlatform, string> = {
  微博: "bg-rose-50 text-rose-600 ring-1 ring-rose-100",
  小红书: "bg-orange-50 text-orange-600 ring-1 ring-orange-100",
  抖音: "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
  INS: "bg-fuchsia-50 text-fuchsia-700 ring-1 ring-fuchsia-100",
  腾讯视频: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  淘宝直播: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  品牌官方: "bg-violet-50 text-violet-700 ring-1 ring-violet-100",
}

const actionBaseClass =
  "inline-flex h-8 shrink-0 items-center justify-center rounded-full px-3 text-[11px] font-medium transition-colors active:scale-[0.98]"

function reminderStorageKey(activityId: string) {
  return `walnut-intelligence:reminder:${activityId}`
}

type ParsedDateBlock = {
  top: string
  middle: string
  bottom: string
  detail: string
  isUrgentTime: boolean
}

function getWeekdayLabel(month: number, day: number) {
  const weekday = new Date(2026, month - 1, day).getDay()
  const labels = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
  return labels[weekday]
}

function parseDateDisplay(date: string): ParsedDateBlock {
  const exactMatch = date.match(/^(\d{1,2})月(\d{1,2})日(?:\s+(\d{1,2}:\d{2}))?$/)

  if (exactMatch) {
    const month = Number(exactMatch[1])
    const day = exactMatch[2]
    const time = exactMatch[3]

    return {
      top: `${month}月`,
      middle: day,
      bottom: getWeekdayLabel(month, Number(day)),
      detail: time ? `${month}月${day}日 ${time}` : `${month}月${day}日`,
      isUrgentTime: Boolean(time),
    }
  }

  const approximateMatch = date.match(/^(\d{1,2})月(.+)$/)
  if (approximateMatch) {
    return {
      top: `${approximateMatch[1]}月`,
      middle: "",
      bottom: "待定",
      detail: `预计 ${date}`,
      isUrgentTime: false,
    }
  }

  return {
    top: "待定",
    middle: "",
    bottom: "待定",
    detail: date,
    isUrgentTime: false,
  }
}

function DateBlock({ date }: { date: string }) {
  const { top, middle, bottom } = parseDateDisplay(date)
  const isApproximate = !middle && bottom === "待定"

  return (
    <div className="flex h-[96px] w-[62px] shrink-0 flex-col items-center justify-center rounded-2xl bg-violet-50/90 px-1.5 py-2 text-center ring-1 ring-violet-100/80">
      <span className="text-[10px] leading-none font-medium text-violet-500">
        {top}
      </span>
      <span
        className={cn(
          "mt-1 flex min-h-6 items-center justify-center leading-none font-semibold tracking-tight text-violet-700",
          middle ? "text-[24px]" : "text-[16px]"
        )}
      >
        {middle}
      </span>
      <span
        className={cn(
          "mt-1 leading-none",
          isApproximate
            ? "text-[15px] font-semibold tracking-tight text-violet-500"
            : "min-h-3 text-[10px] text-violet-400"
        )}
      >
        {bottom}
      </span>
    </div>
  )
}

function ActivityImage({
  src,
  alt,
}: {
  src: string
  alt: string
}) {
  return (
    <div className="relative h-[96px] w-[76px] shrink-0 overflow-hidden rounded-2xl ring-1 ring-violet-100/70">
      <Image src={src} alt={alt} fill className="object-cover" sizes="76px" />
    </div>
  )
}

function PlatformBadge({ platform }: { platform: ActivityPlatform }) {
  return (
    <Badge className={cn("h-5 px-1.5 text-[10px] font-medium", platformAccent[platform])}>
      {platform}
    </Badge>
  )
}

function ActivityShell({
  slug,
  children,
}: {
  slug: string
  children: React.ReactNode
}) {
  const router = useRouter()

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={() => router.push(`/calendar/${slug}`)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          router.push(`/calendar/${slug}`)
        }
      }}
      className="block rounded-[24px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
    >
      {children}
    </article>
  )
}

function UpcomingCard({ activity }: { activity: UpcomingActivity }) {
  const dateDisplay = parseDateDisplay(activity.date)
  const [hasReminder, setHasReminder] = React.useState(false)
  const { showToast } = useToast()

  React.useEffect(() => {
    const storedValue = window.localStorage.getItem(reminderStorageKey(activity.id))
    setHasReminder(storedValue === "true")
  }, [activity.id])

  function handleAddToCalendar(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    showToast("📅 已加入日历")
  }

  function handleSetReminder(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    if (hasReminder) {
      window.localStorage.removeItem(reminderStorageKey(activity.id))
      setHasReminder(false)
      showToast("已取消提醒")
      return
    }

    window.localStorage.setItem(reminderStorageKey(activity.id), "true")
    setHasReminder(true)
    showToast("🔔 已设置提醒")
  }

  return (
    <ActivityShell slug={activity.slug}>
        <div className="rounded-[24px] border border-violet-100/70 bg-white/95 p-3.5 shadow-[0_4px_16px_rgba(91,33,182,0.06)] ring-1 ring-violet-100/50 backdrop-blur-sm transition-transform active:scale-[0.99]">
        <div className="flex items-start gap-3">
          <DateBlock date={activity.date} />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-[14px] leading-5 font-semibold tracking-tight text-zinc-900">
                  {activity.title}
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <PlatformBadge platform={activity.platform} />
                  <Badge className="h-5 bg-violet-50 px-1.5 text-[10px] font-medium text-violet-700 ring-1 ring-violet-100">
                    {upcomingStatusLabel[activity.status]}
                  </Badge>
                </div>
                <div className="mt-2 text-[11px] text-zinc-500">
                  {dateDisplay.detail}
                </div>
              </div>

              <ActivityImage src={activity.image.src} alt={activity.image.alt} />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleAddToCalendar}
                className={cn(
                  actionBaseClass,
                  "bg-violet-100 text-violet-700 hover:bg-violet-100/80"
                )}
              >
                加入日历
              </button>
              <button
                type="button"
                onClick={handleSetReminder}
                className={cn(
                  actionBaseClass,
                  hasReminder
                    ? "bg-violet-100 text-violet-700 ring-1 ring-violet-200/80"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-100/80"
                )}
              >
                {hasReminder ? "🔔 已提醒" : "设置提醒"}
              </button>
            </div>
          </div>
        </div>
        </div>
      </ActivityShell>
  )
}

function PastCard({ activity }: { activity: PastActivity }) {
  const dateDisplay = parseDateDisplay(activity.date)
  const { showToast } = useToast()

  function handleComingSoon(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    showToast("即将上线")
  }

  return (
    <ActivityShell slug={activity.slug}>
        <div className="rounded-[24px] border border-violet-100/70 bg-white/95 p-3.5 shadow-[0_4px_16px_rgba(91,33,182,0.06)] ring-1 ring-violet-100/50 backdrop-blur-sm transition-transform active:scale-[0.99]">
        <div className="flex items-start gap-3">
          <DateBlock date={activity.date} />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-[14px] leading-5 font-semibold tracking-tight text-zinc-900">
                  {activity.title}
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <PlatformBadge platform={activity.platform} />
                </div>
                <div className="mt-2 text-[11px] text-zinc-500">
                  {dateDisplay.detail}
                </div>
              </div>

              <ActivityImage src={activity.image.src} alt={activity.image.alt} />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleComingSoon}
                className={cn(
                  actionBaseClass,
                  "bg-violet-100 text-violet-700 hover:bg-violet-100/80"
                )}
              >
                查看回顾
              </button>
              <button
                type="button"
                onClick={handleComingSoon}
                className={cn(
                  actionBaseClass,
                  "bg-zinc-100 text-zinc-600 hover:bg-zinc-100/80"
                )}
              >
                相关动态
              </button>
            </div>
          </div>
        </div>
        </div>
      </ActivityShell>
  )
}

export function ActivityCard({
  activity,
}: {
  activity: UpcomingActivity | PastActivity
}) {
  if (activity.phase === "upcoming") {
    return <UpcomingCard activity={activity} />
  }

  return <PastCard activity={activity} />
}
