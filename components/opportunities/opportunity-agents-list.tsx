import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DollarSign, MessageSquare } from "lucide-react"
import Link from "next/link"

export function OpportunityAgentsList() {
  const opportunityAgents = [
    {
      id: 1,
      opportunity: "Enterprise Sales Representative",
      agent: {
        name: "John Doe",
        avatar: "/professional-headshot.png",
      },
      ventas: 45000,
      comision: 9000,
      estado: "Activo",
    },
    {
      id: 2,
      opportunity: "Enterprise Sales Representative",
      agent: {
        name: "Sarah Johnson",
        avatar: "/professional-woman-headshot.png",
      },
      ventas: 65000,
      comision: 13000,
      estado: "Activo",
    },
    {
      id: 3,
      opportunity: "Sales Development Representative",
      agent: {
        name: "Michael Chen",
        avatar: "/asian-businessman-confident.png",
      },
      ventas: 38000,
      comision: 7600,
      estado: "Activo",
    },
    {
      id: 4,
      opportunity: "Inside Sales Representative",
      agent: {
        name: "Emma Rodriguez",
        avatar: "/latina-executive-woman.png",
      },
      ventas: 42000,
      comision: 8400,
      estado: "Activo",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Oportunidades por Agentes</CardTitle>
        <CardDescription>Visualiza el rendimiento de los agentes por oportunidad</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agente</TableHead>
              <TableHead>Oportunidad</TableHead>
              <TableHead>Ventas</TableHead>
              <TableHead>Comisión</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {opportunityAgents.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={item.agent.avatar || "/placeholder.svg"} alt={item.agent.name} />
                      <AvatarFallback>{item.agent.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{item.agent.name}</div>
                  </div>
                </TableCell>
                <TableCell>{item.opportunity}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                    {item.ventas.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                    {item.comision.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="success">{item.estado}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/dashboard-company/agentes/${item.id}`}>
                      <Button variant="outline" size="sm">
                        Ver Perfil
                      </Button>
                    </Link>
                    <Link href={`/dashboard-company/messages`}>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
