"use client"

import Link from "next/link"
import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { Logo } from "@/components/ui/logo"
import { useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"

// Tipo para las notificaciones
interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
}

interface DashboardHeaderProps {
  userRole: "agent" | "company"
  className?: string
}

export function DashboardHeader({ userRole, className = "" }: DashboardHeaderProps) {
  const userName = userRole === "agent" ? "Agente" : "Compañía"

  // Estado para las notificaciones
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New User Registration",
      description: "John Smith has registered as an agent",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: "2",
      title: "New Opportunity Created",
      description: "Acme Corp added a new sales opportunity",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      title: "Sale Confirmed",
      description: "A new sale worth $5,200 has been confirmed",
      time: "3 hours ago",
      read: false,
    },
    {
      id: "4",
      title: "New Application",
      description: "Sarah Johnson applied to Enterprise Software Sales",
      time: "Yesterday",
      read: false,
    },
  ])

  // Función para marcar todas las notificaciones como leídas
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  // Contar notificaciones no leídas
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className={`w-full border-b bg-background ${className}`}>
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center">
          <SidebarTrigger className="mr-2 md:hidden">
            <Menu className="h-5 w-5" />
          </SidebarTrigger>
          <div className="flex items-center border-r pr-4">
            <Logo href={userRole === "agent" ? "/dashboard-agent/dashboard" : "/dashboard-company/dashboard"} />
          </div>
        </div>

        <div className="flex-1"></div>

        <div className="flex items-center gap-4">
          {/* Invertido: primero ModeToggle, luego notificaciones */}
          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[280px] sm:w-80">
              <div className="flex items-center justify-between px-4 py-2">
                <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-blue-600 text-xs font-medium"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </Button>
              </div>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-default">
                    <div className="flex justify-between w-full">
                      <span className="font-medium text-sm">{notification.title}</span>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-blue-600 font-medium" asChild>
                <Link href={`/dashboard-${userRole}/notifications`}>View all notifications</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-3">
                <div className="relative h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs">
                  {userName.charAt(0)}
                </div>
                <span className="hidden md:inline-block text-sm font-medium">{userName} User</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/dashboard-${userRole}/profile`} className="w-full">
                  Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-red-100 dark:hover:bg-red-900">
                <Link
                  href="/auth/login"
                  className="w-full text-inherit hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  Cerrar sesión
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
