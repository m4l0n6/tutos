"use client"

import { NuqsAdapter } from "nuqs/adapters/next/app"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/AuthContext"
import { TooltipProvider } from "@/components/ui/tooltip"
import { queryClient } from "@/lib/query-client"
import { SocketProvider } from "@/hooks/websocket/SocketContext"
import { useNotificationSync } from "@/hooks/useNotificationSync"

function NotificationSync() {
  useNotificationSync()
  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>
          <NotificationSync />
          <ThemeProvider>
            <TooltipProvider>
              <AuthProvider>{children}</AuthProvider>
            </TooltipProvider>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </SocketProvider>
      </QueryClientProvider>
    </NuqsAdapter>
  )
}
