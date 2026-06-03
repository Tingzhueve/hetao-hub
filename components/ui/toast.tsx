"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type ToastContextValue = {
  showToast: (message: string) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = React.useState<string | null>(null)

  const showToast = React.useCallback((nextMessage: string) => {
    setMessage(nextMessage)
  }, [])

  React.useEffect(() => {
    if (!message) return

    const timeoutId = window.setTimeout(() => {
      setMessage(null)
    }, 1800)

    return () => window.clearTimeout(timeoutId)
  }, [message])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        className={cn(
          "pointer-events-none fixed inset-x-0 z-[9999] flex justify-center px-5 transition-all duration-200",
          "bottom-[calc(96px+env(safe-area-inset-bottom))]",
          message ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        )}
      >
        <div className="rounded-full bg-zinc-950/88 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm">
          {message ?? ""}
        </div>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }

  return context
}
