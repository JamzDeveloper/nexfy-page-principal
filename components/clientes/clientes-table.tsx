import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign } from "lucide-react"
import { ClienteDetailsDialog } from "./cliente-details-dialog"

export function ClientesTable() {
  const clientes = [
    {
      id: 1,
      name: "Acme Corporation",
      contacto: "John Smith",
      email: "john@acme.com",
      telefono: "+1 555-123-4567",
      estado: "Activo",
      ultimaCompra: "15 Abril, 2023",
      valorTotal: 45000,
    },
    {
      id: 2,
      name: "Globex Industries",
      contacto: "Jane Doe",
      email: "jane@globex.com",
      telefono: "+1 555-987-6543",
      estado: "Prospecto",
      ultimaCompra: "N/A",
      valorTotal: 0,
    },
    {
      id: 3,
      name: "Initech LLC",
      contacto: "Michael Johnson",
      email: "michael@initech.com",
      telefono: "+1 555-456-7890",
      estado: "Activo",
      ultimaCompra: "2 Mayo, 2023",
      valorTotal: 28500,
    },
    {
      id: 4,
      name: "Umbrella Corp",
      contacto: "Sarah Williams",
      email: "sarah@umbrella.com",
      telefono: "+1 555-789-0123",
      estado: "Inactivo",
      ultimaCompra: "10 Enero, 2023",
      valorTotal: 12000,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mis Clientes</CardTitle>
        <CardDescription>Gestiona tus relaciones con clientes y prospectos</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Última Compra</TableHead>
              <TableHead>Valor Total</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell className="font-medium">{cliente.name}</TableCell>
                <TableCell>{cliente.contacto}</TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>{cliente.telefono}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      cliente.estado === "Activo" ? "success" : cliente.estado === "Prospecto" ? "outline" : "secondary"
                    }
                  >
                    {cliente.estado}
                  </Badge>
                </TableCell>
                <TableCell>
                  {cliente.ultimaCompra !== "N/A" ? (
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="mr-1 h-4 w-4" />
                      {cliente.ultimaCompra}
                    </div>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                    {cliente.valorTotal.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <ClienteDetailsDialog cliente={cliente}>
                      <Button variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                    </ClienteDetailsDialog>
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
