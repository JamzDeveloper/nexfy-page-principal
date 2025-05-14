"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart, FileText, MessageSquare, PlusCircle, Search, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Actualizar la interfaz QuickActionsProps para incluir la propiedad userRole
interface QuickActionsProps {
  className?: string
  userRole?: string // Añadir esta propiedad
}

export function QuickActions({ className, userRole }: QuickActionsProps) {
  const pathname = usePathname()

  // Determinar si estamos en el dashboard de agente o compañía
  const isAgentDashboard = pathname.includes("/dashboard-agent")

  // Definir acciones según el rol
  const actions = isAgentDashboard
    ? [
        {
          icon: Search,
          label: "Buscar Oportunidades",
          href: "/dashboard-agent/find-opportunities",
        },
        {
          icon: Users,
          label: "Mis Compañías",
          href: "/dashboard-agent/my-companies",
        },
        {
          icon: MessageSquare,
          label: "Mensajes",
          href: "/dashboard-agent/messages",
        },
        {
          icon: BarChart,
          label: "Rendimiento",
          href: "/dashboard-agent/performance",
        },
      ]
    : [
        {
          icon: PlusCircle,
          label: "Nueva Oportunidad",
          href: "/dashboard-company/opportunities/new",
        },
        {
          icon: FileText,
          label: "Mis Oportunidades",
          href: "/dashboard-company/opportunities",
        },
        {
          icon: Users,
          label: "Agentes",
          href: "/dashboard-company/agentes",
        },
        {
          icon: MessageSquare,
          label: "Mensajes",
          href: "/dashboard-company/messages",
        },
      ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
        <CardDescription>Accede rápidamente a las funciones principales</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            className="h-auto flex-col gap-2 p-4 justify-start items-center"
            asChild
          >
            <Link href={action.href}>
              <action.icon className="h-5 w-5" />
              <span className="text-xs text-center">{action.label}</span>
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
