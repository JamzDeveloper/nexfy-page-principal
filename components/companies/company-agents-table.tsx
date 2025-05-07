import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, Star } from "lucide-react"

interface CompanyAgentsTableProps {
  companyId: number
}

export function CompanyAgentsTable({ companyId }: CompanyAgentsTableProps) {
  // Datos de ejemplo - en una aplicación real, estos datos vendrían filtrados por companyId
  const agents = [
    {
      id: 1,
      name: "John Doe",
      avatar: "/professional-headshot.png",
      especialidad: "Software Empresarial",
      ventas: 120000,
      comision: 24000,
      estado: "Activo",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: "/professional-woman-headshot.png",
      especialidad: "SaaS",
      ventas: 180000,
      comision: 36000,
      estado: "Activo",
    },
    {
      id: 3,
      name: "Michael Chen",
      avatar: "/asian-businessman-confident.png",
      especialidad: "Servicios Financieros",
      ventas: 165000,
      comision: 33000,
      estado: "Activo",
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Agente</TableHead>
            <TableHead>Especialidad</TableHead>
            <TableHead>Ventas</TableHead>
            <TableHead>Comisión</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agents.map((agent) => (
            <TableRow key={agent.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                    <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="font-medium">{agent.name}</div>
                </div>
              </TableCell>
              <TableCell>{agent.especialidad}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                  {agent.ventas.toLocaleString()}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                  {agent.comision.toLocaleString()}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="success">{agent.estado}</Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Ver Perfil
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
