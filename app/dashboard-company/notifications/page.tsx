import { NotificationsSimple } from "@/components/notifications/notifications"

export default function NotificationsPage() {
    return (
        <div className="container mx-auto py-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Notificaciones</h1>
                <p className="text-muted-foreground">Gestiona todas tus notificaciones</p>
            </div>

            <NotificationsSimple />
        </div>
    )
}
