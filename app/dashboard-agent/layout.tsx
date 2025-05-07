import type React from "react"
import { cookies } from "next/headers"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AgentSidebar } from "@/components/dashboard/agent-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function AgentDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Intentar obtener la preferencia de tema de la cookie
  const cookieStore = cookies()
  const authCookie = cookieStore.get("auth")
  let theme = "system" // Tema por defecto para agentes

  if (authCookie) {
    try {
      const userData = JSON.parse(authCookie.value)
      if (userData.theme) {
        theme = userData.theme
      }
    } catch (e) {
      console.error("Error parsing auth cookie:", e)
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <DashboardHeader userRole="agent" className="fixed top-0 left-0 right-0 z-50" />
        <div className="flex pt-16 flex-1">
          <AgentSidebar className="fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 hidden md:block" />
          <main className="flex-1 md:ml-64 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
