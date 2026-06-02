import Image from "next/image"
import { FeedList } from "@/components/feed/FeedList"
import { BottomTabBar } from "@/components/shell/BottomTabBar"
import { Badge } from "@/components/ui/badge"
import { feedItems, highlightedUpdates } from "@/lib/mock/feed"
import { cn } from "@/lib/utils"

function isUrgentStatus(status: string) {
  if (status.includes("直播中") || status.includes("即将开始")) return true
  if (status.includes("今晚")) return true
  return /\d{1,2}:\d{2}/.test(status)
}

export default function FeedPage() {
  return (
    <div className="flex min-h-dvh w-full justify-center bg-white">
      <div className="relative w-full max-w-[430px] flex-1">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-gradient-to-b from-violet-50 via-violet-50/45 to-white"
          aria-hidden
        />

        <header className="safe-top relative px-5 pt-4 pb-1">
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/feed/hetao.jpg"
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 shrink-0 object-contain"
                  priority
                />
                <div className="text-lg font-semibold tracking-tight text-zinc-900">
                  核桃情报局
                </div>
              </div>
              <div className="text-sm text-zinc-500">
                陪你记录每一个闪闪发光的瞬间 ✨
              </div>
            </div>

            <div className="whitespace-nowrap text-xs text-zinc-500">
              共 {feedItems.length} 条
            </div>
          </div>

          <div className="mt-2.5 grid grid-cols-3 gap-2">
            <div className="rounded-2xl border border-white/70 bg-white/85 px-3.5 py-2 shadow-[0_2px_10px_rgba(91,33,182,0.05)] ring-1 ring-violet-100/70 backdrop-blur-sm">
              <div className="text-[11px] text-muted-foreground">今日更新</div>
              <div className="mt-0.5 text-lg font-semibold text-violet-600">5</div>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/85 px-3.5 py-2 shadow-[0_2px_10px_rgba(91,33,182,0.05)] ring-1 ring-violet-100/70 backdrop-blur-sm">
              <div className="text-[11px] text-muted-foreground">即将活动</div>
              <div className="mt-0.5 text-lg font-semibold text-zinc-900">2</div>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/85 px-3.5 py-2 shadow-[0_2px_10px_rgba(91,33,182,0.05)] ring-1 ring-violet-100/70 backdrop-blur-sm">
              <div className="text-[11px] text-muted-foreground">我的收藏</div>
              <div className="mt-0.5 text-lg font-semibold text-zinc-900">0</div>
            </div>
          </div>
        </header>

        <main className="relative px-5 pb-28">
          <section aria-label="今日不容错过">
            <h2 className="text-[15px] font-semibold tracking-tight text-zinc-900">
              🌟 今日不容错过
            </h2>
            <ul className="mt-1.5 flex flex-col gap-1.5">
              {highlightedUpdates.map((update) => (
                <li key={update.id}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-2xl border border-white/70 bg-white/90 px-3 py-2 text-left shadow-[0_2px_10px_rgba(91,33,182,0.05)] ring-1 ring-violet-100/60 transition-colors active:bg-violet-50/80"
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-base leading-none ring-1 ring-violet-100/80"
                      aria-hidden
                    >
                      {update.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-semibold text-zinc-900">
                        {update.title}
                      </div>
                      <div className="mt-0.5 truncate text-[11px] text-zinc-500">
                        {update.subtitle}
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <Badge className="h-5 bg-violet-50 px-1.5 text-[10px] font-medium text-violet-700 ring-1 ring-violet-200/80">
                        {update.source}
                      </Badge>
                      <span
                        className={cn(
                          "text-[10px] font-medium",
                          isUrgentStatus(update.status)
                            ? "text-rose-600"
                            : "text-violet-600"
                        )}
                      >
                        {update.status}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-3" aria-label="最新动态">
            <FeedList items={feedItems} />
          </section>
        </main>

        <BottomTabBar />
      </div>
    </div>
  )
}
