import type React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface TopAgentsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TopAgents({ className, ...props }: TopAgentsProps) {
  const agents = [
    {
      name: "Sarah Johnson",
      avatar: "/professional-woman-headshot.png",
      opportunity: "Software CRM para Retail",
      status: "Activo",
    },
    {
      name: "Michael Chen",
      avatar: "/asian-businessman-confident.png",
      opportunity: "Plataforma de Análisis Financiero",
      status: "En proceso",
    },
    {
      name: "Emma Rodriguez",
      avatar: "/latina-executive-woman.png",
      opportunity: "Sistema de Gestión de Inventario",
      status: "Activo",
    },
    {
      name: "John Doe",
      avatar: "/professional-headshot.png",
      opportunity: "Solución de Marketing Digital",
      status: "Pendiente",
    },
  ]

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>Últimos Agentes</CardTitle>
        <CardDescription>Agentes recientemente activos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {agents.map((agent, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                  <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{agent.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{agent.opportunity}</p>
                </div>
              </div>
              <Badge
                variant={agent.status === "Activo" ? "success" : agent.status === "En proceso" ? "warning" : "outline"}
                className="ml-auto"
              >
                {agent.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href="/dashboard-company/agentes"
          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors w-full justify-end"
        >
          Ver todos los agentes
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}
