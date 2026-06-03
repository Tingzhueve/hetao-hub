import { BottomTabBar } from "@/components/shell/BottomTabBar"
import { CalendarTabs } from "@/components/calendar/CalendarTabs"
import { Calendar, Ellipsis } from "lucide-react"

import { upcomingActivities, pastActivities } from "@/lib/mock/calendar"

export default function CalendarPage() {
  return (
    <div className="flex min-h-dvh w-full justify-center bg-white">
      <div className="relative w-full max-w-[430px] flex-1">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[380px] bg-gradient-to-b from-violet-50 via-violet-50/50 to-white"
          aria-hidden
        />

        <main className="relative px-5 pb-28 pt-4">
          <div className="safe-top">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-lg font-semibold tracking-tight text-zinc-900">
                  活动日历
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="日历操作"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/85 text-violet-600 shadow-[0_2px_10px_rgba(91,33,182,0.05)] ring-1 ring-violet-100/70 backdrop-blur-sm transition-colors active:bg-violet-50/80"
                >
                  <Calendar className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="更多操作"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/85 text-zinc-600 shadow-[0_2px_10px_rgba(91,33,182,0.05)] ring-1 ring-violet-100/70 backdrop-blur-sm transition-colors active:bg-violet-50/80"
                >
                  <Ellipsis className="h-4 w-4" />
                </button>
              </div>
            </div>

            <section className="mt-4" aria-label="活动日历">
              <CalendarTabs
                upcoming={upcomingActivities}
                past={pastActivities}
              />
            </section>
          </div>
        </main>

        <BottomTabBar />
      </div>
    </div>
  )
}
