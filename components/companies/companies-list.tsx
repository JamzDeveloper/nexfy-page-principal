import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users } from "lucide-react"
import { CompanyDetailsDialog } from "./company-details-dialog"

export function CompaniesList() {
  const companies = [
    {
      id: 1,
      name: "TechCorp",
      contacto: "John Smith",
      email: "john@techcorp.com",
      telefono: "+34 612 345 678",
      industria: "Tecnología",
      ubicacion: "Madrid, España",
      fechaInicio: "15 Enero, 2023",
      oportunidades: 5,
      agentes: 3,
      estado: "Activo",
    },
    {
      id: 2,
      name: "GrowthTech",
      contacto: "Jane Doe",
      email: "jane@growthtech.com",
      telefono: "+34 623 456 789",
      industria: "SaaS",
      ubicacion: "Barcelona, España",
      fechaInicio: "3 Marzo, 2023",
      oportunidades: 3,
      agentes: 2,
      estado: "Activo",
    },
    {
      id: 3,
      name: "Innovate Inc",
      contacto: "Michael Johnson",
      email: "michael@innovate.com",
      telefono: "+34 634 567 890",
      industria: "Consultoría",
      ubicacion: "Valencia, España",
      fechaInicio: "10 Noviembre, 2022",
      oportunidades: 4,
      agentes: 4,
      estado: "Activo",
    },
    {
      id: 4,
      name: "GlobalSales Co",
      contacto: "Sarah Williams",
      email: "sarah@globalsales.com",
      telefono: "+34 645 678 901",
      industria: "Retail",
      ubicacion: "Sevilla, España",
      fechaInicio: "22 Abril, 2023",
      oportunidades: 2,
      agentes: 1,
      estado: "Pendiente",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compañías</CardTitle>
        <CardDescription>Gestiona tus relaciones con compañías</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Industria</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Fecha de Inicio</TableHead>
              <TableHead>Oportunidades</TableHead>
              <TableHead>Agentes</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.industria}</TableCell>
                <TableCell>{company.ubicacion}</TableCell>
                <TableCell>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    {company.fechaInicio}
                  </div>
                </TableCell>
                <TableCell>{company.oportunidades}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                    {company.agentes}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      company.estado === "Activo" ? "success" : company.estado === "Pendiente" ? "outline" : "secondary"
                    }
                  >
                    {company.estado}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <CompanyDetailsDialog company={company}>
                      <Button variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                    </CompanyDetailsDialog>
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
