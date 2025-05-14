import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, MessageSquare } from "lucide-react"
import Link from "next/link"
import { ContractDetailsDialog } from "./contract-details-dialog"

export function CompaniesTable() {
  const companies = [
    {
      id: 1,
      name: "TechCorp",
      position: "Enterprise Sales Representative",
      Date: "15 Enero, 2023",
      totalSales: 120000,
      commission: 24000,
      commissionRate: "20%",
      status: "Activo",
    },
    {
      id: 2,
      name: "GrowthTech",
      position: "Sales Development Representative",
      Date: "15 Enero, 2023",
      totalSales: 85000,
      commission: 17000,
      commissionRate: "20%",
      status: "Activo",
    },
    {
      id: 3,
      name: "Innovate Inc",
      position: "Regional Sales Manager",
      Date: "15 Enero, 2023",
      totalSales: 210000,
      commission: 42000,
      commissionRate: "20%",
      status: "Activo",
    },
    {
      id: 4,
      name: "GlobalSales Co",
      position: "Inside Sales Representative",
      Date: "15 Enero, 2023",
      totalSales: 65000,
      commission: 13000,
      commissionRate: "20%",
      status: "Activo",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Oportunidades</CardTitle>
        <CardDescription>Oportunidades que tienes activas actualmente</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Compañía</TableHead>
              <TableHead>Posición</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Ventas Totales</TableHead>
              <TableHead>Comisión</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.position}</TableCell>
                <TableCell>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    {company.Date}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                    {company.totalSales.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>${company.commission.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground">({company.commissionRate})</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="success">{company.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <ContractDetailsDialog contract={company}>
                      <Button variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                    </ContractDetailsDialog>
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
