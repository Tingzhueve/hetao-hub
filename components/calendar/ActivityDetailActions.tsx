"use client"

import * as React from "react"

import { useToast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"

const actionBaseClass =
  "inline-flex h-9 items-center justify-center rounded-full px-4 text-sm font-medium transition-colors active:scale-[0.98]"

type ActivityDetailActionsProps = {
  activityId: string
  phase: "upcoming" | "past"
}

function reminderStorageKey(activityId: string) {
  return `walnut-intelligence:reminder:${activityId}`
}

export function ActivityDetailActions({
  activityId,
  phase,
}: ActivityDetailActionsProps) {
  const [hasReminder, setHasReminder] = React.useState(false)
  const { showToast } = useToast()

  React.useEffect(() => {
    if (phase !== "upcoming") return

    const storedValue = window.localStorage.getItem(reminderStorageKey(activityId))
    setHasReminder(storedValue === "true")
  }, [activityId, phase])

  function handleAddToCalendar() {
    showToast("📅 已加入日历")
  }

  function handleSetReminder() {
    if (hasReminder) {
      window.localStorage.removeItem(reminderStorageKey(activityId))
      setHasReminder(false)
      showToast("已取消提醒")
      return
    }

    window.localStorage.setItem(reminderStorageKey(activityId), "true")
    setHasReminder(true)
    showToast("🔔 已设置提醒")
  }

  function handleComingSoon() {
    showToast("即将上线")
  }

  return (
    <>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {phase === "upcoming" ? (
          <>
            <button
              type="button"
              onClick={handleAddToCalendar}
              className={cn(actionBaseClass, "bg-violet-600 text-white shadow-sm")}
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
                  : "bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200/80"
              )}
            >
              {hasReminder ? "🔔 已提醒" : "设置提醒"}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={handleComingSoon}
              className={cn(actionBaseClass, "bg-violet-600 text-white shadow-sm")}
            >
              查看回顾
            </button>
            <button
              type="button"
              onClick={handleComingSoon}
              className={cn(
                actionBaseClass,
                "bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200/80"
              )}
            >
              相关动态
            </button>
          </>
        )}
      </div>
    </>
  )
}
