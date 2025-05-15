"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Tipo para las notificaciones
interface Notification {
    id: string
    title: string
    description: string
    time: string
    read: boolean
}

export function NotificationsSimple() {
    const [notifications, setNotifications] = useState<Notification[]>([])

    // Cargar notificaciones desde localStorage
    useEffect(() => {
        const savedNotifications = localStorage.getItem("notifications")
        if (!savedNotifications) {
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
        } else {
            setNotifications(JSON.parse(savedNotifications))
        }
    }, [])

    // Función para marcar todas las notificaciones como leídas
    const markAllAsRead = () => {
        const updatedNotifications = notifications.map((notification) => ({
            ...notification,
            read: true,
        }))

        setNotifications(updatedNotifications)
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
        localStorage.setItem("notifications", JSON.stringify(updatedNotifications))

        // Disparar evento para que otros componentes se actualicen
        window.dispatchEvent(new Event("storage"))
    }

    // Contar notificaciones no leídas
    const unreadCount = notifications.filter((n) => !n.read).length

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <span className="text-sm text-muted-foreground">{unreadCount} notificaciones sin leer</span>
                </div>
                {unreadCount > 0 && (
                    <Button variant="outline" size="sm" onClick={markAllAsRead}>
                        Marcar todas como leídas
                    </Button>
                )}
            </div>

            <div className="space-y-4">
                {notifications.length === 0 ? (
                    <Card>
                        <CardContent className="p-6 text-center text-muted-foreground">No tienes notificaciones</CardContent>
                    </Card>
                ) : (
                    notifications.map((notification) => (
                        <Card
                            key={notification.id}
                            className={cn("transition-all", !notification.read ? "border-l-4 border-l-blue-500" : "")}
                        >
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className={cn("text-base font-medium", !notification.read ? "font-semibold" : "")}>
                                            {notification.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                                        <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                                    </div>
                                    {!notification.read && (
                                        <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)} className="text-xs">
                                            Marcar como leída
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
