"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Heart, Home } from "lucide-react"

import { cn } from "@/lib/utils"

type Tab = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const tabs: Tab[] = [
  { href: "/", label: "Feed", icon: Home },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/favorites", label: "Favorites", icon: Heart },
]

export function BottomTabBar() {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[430px]",
        "border-t bg-background/80 backdrop-blur",
        "pb-[env(safe-area-inset-bottom)]"
      )}
      aria-label="底部导航"
    >
      <div className="grid grid-cols-3 px-3 py-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          const Icon = tab.icon
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs",
                isActive ? "text-violet-600" : "text-muted-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5",
                  isActive ? "text-violet-600" : "text-muted-foreground"
                )}
              />
              <span className="leading-none">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

