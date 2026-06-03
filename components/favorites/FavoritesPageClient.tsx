"use client"

import * as React from "react"
import { Trash2 } from "lucide-react"

import { FeedCard } from "@/components/feed/FeedCard"
import { useFavorites } from "@/components/favorites/FavoritesProvider"
import { BottomTabBar } from "@/components/shell/BottomTabBar"
import { useToast } from "@/components/ui/toast"
import { feedItems } from "@/lib/mock/feed"
import { cn } from "@/lib/utils"

type FavoriteFilter = "all" | "post" | "video" | "live"

function getFavoriteFilter(item: (typeof feedItems)[number]): FavoriteFilter {
  if (item.source === "抖音" || item.source === "腾讯视频") return "video"
  if (item.source === "淘宝直播") return "live"
  return "post"
}

function CategoryEmptyState({ filter }: { filter: Exclude<FavoriteFilter, "all"> }) {
  const icon = filter === "post" ? "📝" : filter === "video" ? "🎬" : "📺"
  const title =
    filter === "post"
      ? "暂无收藏的帖子"
      : filter === "video"
        ? "暂无收藏的视频"
        : "暂无收藏的直播"

  return (
    <div className="rounded-[28px] border border-violet-100/70 bg-white/92 px-6 py-12 text-center shadow-[0_4px_16px_rgba(91,33,182,0.06)] ring-1 ring-violet-100/60">
      <div className="text-2xl">{icon}</div>
      <div className="mt-3 text-[15px] font-semibold tracking-tight text-zinc-900">
        {title}
      </div>
    </div>
  )
}

function GlobalEmptyState() {
  return (
    <div className="rounded-[28px] border border-violet-100/70 bg-white/92 px-6 py-12 text-center shadow-[0_4px_16px_rgba(91,33,182,0.06)] ring-1 ring-violet-100/60">
      <div className="text-2xl">❤️</div>
      <div className="mt-3 text-[15px] font-semibold tracking-tight text-zinc-900">
        暂无收藏
      </div>
      <p className="mt-2 text-sm leading-6 text-zinc-500">
        看到喜欢的内容，
        <br />
        记得点一下收藏哦
      </p>
    </div>
  )
}

export function FavoritesPageClient() {
  const { clearFavorites, favoriteIds } = useFavorites()
  const { showToast } = useToast()
  const [selectedFilter, setSelectedFilter] =
    React.useState<FavoriteFilter>("all")
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false)

  const favoriteItems = feedItems.filter((item) => favoriteIds.includes(item.id))
  const filteredItems =
    selectedFilter === "all"
      ? favoriteItems
      : favoriteItems.filter((item) => getFavoriteFilter(item) === selectedFilter)

  const filterOptions: Array<{ id: FavoriteFilter; label: string; count: number }> = [
    { id: "all", label: "全部", count: favoriteItems.length },
    {
      id: "post",
      label: "帖子",
      count: favoriteItems.filter((item) => getFavoriteFilter(item) === "post")
        .length,
    },
    {
      id: "video",
      label: "视频",
      count: favoriteItems.filter((item) => getFavoriteFilter(item) === "video")
        .length,
    },
    {
      id: "live",
      label: "直播",
      count: favoriteItems.filter((item) => getFavoriteFilter(item) === "live")
        .length,
    },
  ]

  function handleConfirmClear() {
    clearFavorites()
    setIsConfirmOpen(false)
    setSelectedFilter("all")
    showToast("已清空所有收藏")
  }

  return (
    <div className="flex min-h-dvh w-full justify-center bg-white">
      <div className="relative w-full max-w-[430px] flex-1">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[340px] bg-gradient-to-b from-violet-50 via-violet-50/45 to-white"
          aria-hidden
        />

        <main className="relative px-5 pb-28 pt-4">
          <div className="safe-top">
            <header>
              <div className="text-lg font-semibold tracking-tight text-zinc-900">
                我的收藏
              </div>
              <p className="mt-1 text-sm text-zinc-500">
                把喜欢的内容留在这里
              </p>
            </header>

            {favoriteItems.length > 0 ? (
              <section className="mt-4" aria-label="收藏筛选">
                <div className="flex items-center gap-3">
                  <div className="-mx-1 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div className="flex w-max gap-2 px-1">
                      {filterOptions.map((option) => {
                        const isActive = selectedFilter === option.id

                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setSelectedFilter(option.id)}
                            className={cn(
                              "inline-flex h-9 shrink-0 items-center rounded-2xl px-3.5 text-xs font-medium whitespace-nowrap transition-colors",
                              isActive
                                ? "bg-violet-600 text-white shadow-sm"
                                : "bg-white text-zinc-700 ring-1 ring-zinc-200/80"
                            )}
                          >
                            <span>{option.label}</span>
                            <span className="ml-1.5">{option.count}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsConfirmOpen(true)}
                    aria-label="清空所有收藏"
                    className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-zinc-500 transition-colors active:text-violet-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </section>
            ) : null}

            <section className="mt-4" aria-label="收藏列表">
              {favoriteItems.length === 0 ? (
                <GlobalEmptyState />
              ) : filteredItems.length > 0 ? (
                <div className="flex flex-col gap-2.5">
                  {filteredItems.map((item) => (
                    <FeedCard
                      key={item.id}
                      item={item}
                      favoriteButtonMode="remove"
                    />
                  ))}
                </div>
              ) : selectedFilter === "all" ? (
                <GlobalEmptyState />
              ) : (
                <CategoryEmptyState filter={selectedFilter} />
              )}
            </section>
          </div>
        </main>

        <BottomTabBar />

        {isConfirmOpen ? (
          <div className="fixed inset-0 z-[70] flex items-end justify-center bg-zinc-950/28 px-4 pb-6 pt-10 backdrop-blur-[2px]">
            <div className="w-full max-w-[398px] rounded-[28px] bg-white p-5 shadow-[0_24px_80px_rgba(24,24,27,0.18)] ring-1 ring-zinc-200/80">
              <h2 className="text-[17px] font-semibold tracking-tight text-zinc-900">
                确认清空所有收藏？
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                此操作将移除所有已收藏的动态，
                <br />
                且无法撤销。
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setIsConfirmOpen(false)}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-100 text-sm font-medium text-zinc-700"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={handleConfirmClear}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-violet-600 text-sm font-medium text-white shadow-sm"
                >
                  清空收藏
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
