import Link from "next/link"

import { BottomTabBar } from "@/components/shell/BottomTabBar"

export default function FavoritesPage() {
  return (
    <div className="flex min-h-dvh w-full justify-center bg-zinc-50">
      <div className="relative w-full max-w-[430px] flex-1 px-5 pb-28 pt-6">
        <div className="safe-top">
          <h1 className="text-lg font-semibold">❤️ Favorites</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            收藏页 MVP 占位。之后可以用 Supabase 保存收藏列表。
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-sm font-medium text-violet-600"
          >
            返回 Feed
          </Link>
        </div>

        <BottomTabBar />
      </div>
    </div>
  )
}

