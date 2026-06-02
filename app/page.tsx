import { FeedCard } from "@/components/feed/FeedCard"
import { BottomTabBar } from "@/components/shell/BottomTabBar"
import { Badge } from "@/components/ui/badge"
import { feedItems, highlightedUpdates } from "@/lib/mock/feed"

export default function FeedPage() {
  return (
    <div className="flex min-h-dvh w-full justify-center bg-zinc-50">
      <div className="relative w-full max-w-[430px] flex-1">
        <header className="safe-top px-5 pt-4">
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="text-lg font-semibold tracking-tight">
                🥜 核桃情报局
              </div>
              <div className="text-sm text-muted-foreground">
                陪你记录每一个闪闪发光的瞬间 ✨
              </div>
            </div>

            <div className="whitespace-nowrap text-xs text-zinc-500">
              共 {feedItems.length} 条
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2.5">
            <div className="rounded-2xl bg-white px-3.5 py-2.5 ring-1 ring-black/5">
              <div className="text-[11px] text-muted-foreground">今日更新</div>
              <div className="mt-1 text-lg font-semibold text-violet-600">5</div>
            </div>
            <div className="rounded-2xl bg-white px-3.5 py-2.5 ring-1 ring-black/5">
              <div className="text-[11px] text-muted-foreground">即将活动</div>
              <div className="mt-1 text-lg font-semibold">2</div>
            </div>
            <div className="rounded-2xl bg-white px-3.5 py-2.5 ring-1 ring-black/5">
              <div className="text-[11px] text-muted-foreground">我的收藏</div>
              <div className="mt-1 text-lg font-semibold">0</div>
            </div>
          </div>
        </header>

        <main className="px-5 pb-28 pt-3">
          <section aria-label="今日不容错过">
            <h2 className="text-[15px] font-semibold tracking-tight text-zinc-900">
              🌟 今日不容错过
            </h2>
            <ul className="mt-2 flex flex-col gap-1.5">
              {highlightedUpdates.map((update) => (
                <li key={update.id}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2.5 rounded-2xl bg-white px-3 py-2.5 text-left ring-1 ring-black/5 transition-colors active:bg-violet-50/80"
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-lg leading-none"
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
                      <span className="text-[10px] font-medium text-violet-600">
                        {update.status}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-4" aria-label="最新动态">
            <div>
              <h2 className="text-[15px] font-semibold tracking-tight text-zinc-900">
                🫧 最新动态
              </h2>
              <p className="mt-0.5 text-[12px] text-muted-foreground">
                今天也有新的惊喜
              </p>
            </div>

            <div className="mt-2 flex flex-col gap-2">
              {feedItems.map((item) => (
                <FeedCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        </main>

        <BottomTabBar />
      </div>
    </div>
  )
}
