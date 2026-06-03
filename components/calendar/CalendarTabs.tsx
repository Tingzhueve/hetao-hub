"use client"

import * as React from "react"

import { ActivityCard } from "@/components/calendar/ActivityCard"
import type { PastActivity, UpcomingActivity } from "@/lib/types/calendar"
import { cn } from "@/lib/utils"

type CalendarTab = "upcoming" | "past"

const tabs: { id: CalendarTab; label: string }[] = [
  { id: "upcoming", label: "即将到来" },
  { id: "past", label: "已结束" },
]

export function CalendarTabs({
  upcoming,
  past,
}: {
  upcoming: UpcomingActivity[]
  past: PastActivity[]
}) {
  const [selectedTab, setSelectedTab] = React.useState<CalendarTab>("upcoming")

  const items = selectedTab === "upcoming" ? upcoming : past
  const emptyLabel =
    selectedTab === "upcoming"
      ? "暂无即将到来的活动 ✨"
      : "暂无历史活动记录 ✨"

  return (
    <>
      <div className="rounded-full border border-white/80 bg-zinc-100/90 p-1 shadow-[0_4px_14px_rgba(91,33,182,0.06)] ring-1 ring-violet-100/60 backdrop-blur-sm">
        <div className="grid grid-cols-2 gap-1">
          {tabs.map((tab) => {
            const isActive = selectedTab === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedTab(tab.id)}
                className={cn(
                  "inline-flex h-9 w-full items-center justify-center rounded-full px-4 text-sm font-medium whitespace-nowrap transition-all duration-200",
                  isActive
                    ? "bg-linear-to-r from-violet-500 to-violet-600 text-white shadow-sm"
                    : "bg-white text-zinc-700 ring-1 ring-zinc-200/80"
                )}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {items.length > 0 ? (
          items.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))
        ) : (
          <div className="rounded-[24px] border border-violet-100/60 bg-white/95 px-4 py-10 text-center text-sm text-zinc-500 ring-1 ring-violet-100/50">
            {emptyLabel}
          </div>
        )}
      </div>
    </>
  )
}
