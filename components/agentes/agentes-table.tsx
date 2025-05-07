import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, DollarSign, MessageSquare, Star } from "lucide-react"
import Link from "next/link"
import { AgenteDetailsDialog } from "./agente-details-dialog"

export function AgentesTable() {
  const agentes = [
    {
      id: 1,
      name: "John Doe",
      avatar: "/professional-headshot.png",
      email: "john.doe@example.com",
      telefono: "+1 555-123-4567",
      especialidad: "Software Empresarial",
      fechaInicio: "15 Enero, 2023",
      ventas: 120000,
      comision: 24000,
      estado: "Activo",
      rating: 4,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: "/professional-woman-headshot.png",
      email: "sarah.johnson@example.com",
      telefono: "+1 555-987-6543",
      especialidad: "SaaS",
      fechaInicio: "3 Marzo, 2023",
      ventas: 180000,
      comision: 36000,
      estado: "Activo",
      rating: 5,
    },
    {
      id: 3,
      name: "Michael Chen",
      avatar: "/asian-businessman-confident.png",
      email: "michael.chen@example.com",
      telefono: "+1 555-456-7890",
      especialidad: "Servicios Financieros",
      fechaInicio: "10 Noviembre, 2022",
      ventas: 165000,
      comision: 33000,
      estado: "Activo",
      rating: 5,
    },
    {
      id: 4,
      name: "Emma Rodriguez",
      avatar: "/latina-executive-woman.png",
      email: "emma.rodriguez@example.com",
      telefono: "+1 555-789-0123",
      especialidad: "Retail",
      fechaInicio: "22 Abril, 2023",
      ventas: 145000,
      comision: 29000,
      estado: "Activo",
      rating: 4,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agentes de Ventas</CardTitle>
        <CardDescription>Gestiona tus relaciones con agentes de ventas</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agente</TableHead>
              <TableHead>Especialidad</TableHead>
              <TableHead>Fecha de Inicio</TableHead>
              <TableHead>Ventas Totales</TableHead>
              <TableHead>Comisión</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agentes.map((agente) => (
              <TableRow key={agente.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={agente.avatar || "/placeholder.svg"} alt={agente.name} />
                      <AvatarFallback>{agente.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{agente.name}</div>
                      <div className="text-xs text-muted-foreground">{agente.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{agente.especialidad}</TableCell>
                <TableCell>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    {agente.fechaInicio}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                    {agente.ventas.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                    {agente.comision.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < agente.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="success">{agente.estado}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <AgenteDetailsDialog agente={agente}>
                      <Button variant="outline" size="sm">
                        Ver Perfil
                      </Button>
                    </AgenteDetailsDialog>
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
