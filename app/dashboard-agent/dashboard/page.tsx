import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { UpcomingMeetings } from "@/components/dashboard/upcoming-meetings"

export default function AgentDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard de Agente</h2>
        <p className="text-muted-foreground">Bienvenido de nuevo! Aquí tienes un resumen de tu actividad.</p>
      </div>
      <DashboardOverview userRole="agent" />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        <RevenueChart className="md:col-span-1 lg:col-span-4" />
        <div className="md:col-span-1 lg:col-span-3 space-y-8">
          <QuickActions className="w-full" userRole="agent" />
          <UpcomingMeetings className="w-full" />
        </div>
      </div>
    </div>
  )
}
