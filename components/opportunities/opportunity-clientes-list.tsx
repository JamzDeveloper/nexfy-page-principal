import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, MessageSquare } from "lucide-react"
import Link from "next/link"

export function OpportunityClientesList() {
  const opportunityClientes = [
    {
      id: 1,
      opportunity: "Enterprise Sales Representative",
      cliente: "Acme Corporation",
      contacto: "John Smith",
      fechaVenta: "15 Abril, 2023",
      valor: 45000,
      estado: "Cerrado",
    },
    {
      id: 2,
      opportunity: "Enterprise Sales Representative",
      cliente: "Globex Industries",
      contacto: "Jane Doe",
      fechaVenta: "N/A",
      valor: 0,
      estado: "En proceso",
    },
    {
      id: 3,
      opportunity: "Sales Development Representative",
      cliente: "Initech LLC",
      contacto: "Michael Johnson",
      fechaVenta: "2 Mayo, 2023",
      valor: 28500,
      estado: "Cerrado",
    },
    {
      id: 4,
      opportunity: "Inside Sales Representative",
      cliente: "Umbrella Corp",
      contacto: "Sarah Williams",
      fechaVenta: "10 Enero, 2023",
      valor: 12000,
      estado: "Cerrado",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Oportunidades por Clientes</CardTitle>
        <CardDescription>Visualiza las ventas a clientes por oportunidad</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Oportunidad</TableHead>
              <TableHead>Fecha de Venta</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {opportunityClientes.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.cliente}</TableCell>
                <TableCell>{item.contacto}</TableCell>
                <TableCell>{item.opportunity}</TableCell>
                <TableCell>
                  {item.fechaVenta !== "N/A" ? (
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="mr-1 h-4 w-4" />
                      {item.fechaVenta}
                    </div>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                    {item.valor.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.estado === "Cerrado" ? "success" : item.estado === "En proceso" ? "outline" : "secondary"
                    }
                  >
                    {item.estado}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/dashboard-company/clientes/${item.id}`}>
                      <Button variant="outline" size="sm">
                        Ver Detalles
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
