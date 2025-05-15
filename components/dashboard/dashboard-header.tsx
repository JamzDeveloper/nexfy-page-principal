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
import { useEffect, useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  // Cargar notificaciones
  useEffect(() => {
    const loadNotifications = () => {
      const savedNotifications = localStorage.getItem("notifications")
      if (savedNotifications) {
        const parsedNotifications = JSON.parse(savedNotifications)
        setNotifications(parsedNotifications)
        setUnreadCount(parsedNotifications.filter((n: Notification) => !n.read).length)
      } else {
        // Si no hay notificaciones guardadas, crear algunas de ejemplo
        const defaultNotifications: Notification[] = [
          {
            id: "1",
            title: "Nueva Oportunidad Disponible",
            description: "Se ha publicado una nueva oportunidad que coincide con tu perfil",
            time: "Hace 5 minutos",
            read: false,
          },
          {
            id: "2",
            title: "Solicitud Aceptada",
            description: "Tu solicitud para la oportunidad 'Ventas B2B' ha sido aceptada",
            time: "Hace 1 hora",
            read: false,
          },
          {
            id: "3",
            title: "Nuevo Mensaje",
            description: "Has recibido un nuevo mensaje de Empresa ABC",
            time: "Hace 3 horas",
            read: false,
          },
          {
            id: "4",
            title: "Recordatorio de Reunión",
            description: "Tienes una reunión programada para mañana a las 10:00 AM",
            time: "Ayer",
            read: true,
          },
          {
            id: "5",
            title: "Actualización de Contrato",
            description: "El contrato con Cliente XYZ ha sido actualizado",
            time: "Hace 2 días",
            read: true,
          },
        ]
        localStorage.setItem("notifications", JSON.stringify(defaultNotifications))
        setNotifications(defaultNotifications)
        setUnreadCount(defaultNotifications.filter((n) => !n.read).length)
      }
    }

    loadNotifications()

    // Escuchar cambios en localStorage
    window.addEventListener("storage", loadNotifications)

    return () => {
      window.removeEventListener("storage", loadNotifications)
    }
  }, [])

  // Función para marcar todas las notificaciones como leídas
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }))

    setNotifications(updatedNotifications)
    setUnreadCount(0)
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications))

    // Disparar evento para que otros componentes se actualicen
    window.dispatchEvent(new Event("storage"))
  }

  // Función para marcar una notificación como leída
  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification,
    )

    setNotifications(updatedNotifications)
    setUnreadCount(updatedNotifications.filter((n) => !n.read).length)
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications))

    // Disparar evento para que otros componentes se actualicen
    window.dispatchEvent(new Event("storage"))
  }

  // Obtener las iniciales del nombre del usuario
  const getUserInitials = () => {
    if (!user || !user.name) return userRole === "agent" ? "A" : "C"

    const nameParts = user.name.split(" ")
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase()

    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase()
  }

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
                <DropdownMenuLabel className="p-0">Notificaciones</DropdownMenuLabel>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-blue-600 text-xs font-medium"
                    onClick={markAllAsRead}
                  >
                    Marcar todas como leídas
                  </Button>
                )}
              </div>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                {notifications.slice(0, 5).map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={cn(
                      "flex flex-col items-start p-3 cursor-default",
                      !notification.read ? "bg-blue-50 dark:bg-blue-900/20" : "",
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex justify-between w-full">
                      <span className={cn("font-medium text-sm", !notification.read ? "font-semibold" : "")}>
                        {notification.title}
                      </span>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                  </DropdownMenuItem>
                ))}

                {notifications.length === 0 && (
                  <div className="py-4 text-center text-sm text-muted-foreground">No hay notificaciones</div>
                )}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-blue-600 font-medium" asChild>
                <Link href={`/dashboard-${userRole}/notifications`}>Ver todas las notificaciones</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-3">
                {/*
                <Avatar className="h-8 w-8">
                  {user?.profileImage ? (
                    <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name || "Usuario"} />
                  ) : (
                    <AvatarFallback className="bg-orange-500 text-white">{getUserInitials()}</AvatarFallback>
                  )}
                </Avatar>
                */}
                <span className="hidden md:inline-block text-sm font-medium">
                  {user?.name || (userRole === "agent" ? "Agente" : "Compañía")}
                </span>
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
              <DropdownMenuItem className="hover:bg-red-100 dark:hover:bg-red-600">
                <Link
                  href="/auth/login"
                  className="w-full text-inherit hover:text-red-600 dark:hover:text-red-600 transition-colors"
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
