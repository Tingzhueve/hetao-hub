import { FeedCard } from "@/components/feed/FeedCard"
import { BottomTabBar } from "@/components/shell/BottomTabBar"
import { feedItems } from "@/lib/mock/feed"

export default function FeedPage() {
  return (
    <div className="flex min-h-dvh w-full justify-center bg-zinc-50">
      <div className="relative w-full max-w-[430px] flex-1">
        <header className="safe-top px-5 pt-4">
          <div className="flex flex-col gap-1">
            <div className="text-lg font-semibold tracking-tight">🥜 核桃情报局</div>
            <div className="text-sm text-muted-foreground">今日张凌赫情报</div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-black/5">
              <div className="text-xs text-muted-foreground">今日更新</div>
              <div className="mt-1 text-xl font-semibold text-violet-600">5</div>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-black/5">
              <div className="text-xs text-muted-foreground">即将活动</div>
              <div className="mt-1 text-xl font-semibold">2</div>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-black/5">
              <div className="text-xs text-muted-foreground">我的收藏</div>
              <div className="mt-1 text-xl font-semibold">0</div>
            </div>
          </div>
        </header>

        <main className="px-5 pb-28 pt-5">
          <div className="flex flex-col gap-4">
            {feedItems.map((item) => (
              <FeedCard key={item.id} item={item} />
            ))}
          </div>
        </main>

        <BottomTabBar />
      </div>
    </div>
  )
}
