import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, MessageSquare } from "lucide-react"
import Link from "next/link"
import { ContractDetailsDialog } from "./contract-details-dialog"

export function PendingContractsTable() {
  const pendingContracts = [
    {
      id: 1,
      name: "SoftwareSolutions",
      position: "Senior Sales Executive",
      fecha: "1 Junio, 2023",
      estimatedSales: 150000,
      commissionRate: "22%",
      status: "Negociación",
    },
    {
      id: 2,
      name: "DataTech Inc",
      position: "Sales Team Lead",
      fecha: "1 Junio, 2023",
      estimatedSales: 200000,
      commissionRate: "18%",
      status: "Revisión Legal",
    },
    {
      id: 3,
      name: "CloudServices",
      position: "Account Executive",
      fecha: "1 Junio, 2023",
      estimatedSales: 180000,
      commissionRate: "20%",
      status: "Pendiente de Firma",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Oportunidades aplicadas</CardTitle>
        <CardDescription>Oportunidades a las cuales has aplicado</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Compañía</TableHead>
              <TableHead>Posición</TableHead>
              <TableHead>fecha</TableHead>
              <TableHead>Ventas Promedio</TableHead>
              <TableHead>Comisión</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingContracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell className="font-medium">{contract.name}</TableCell>
                <TableCell>{contract.position}</TableCell>
                <TableCell>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    {contract.fecha}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                    {contract.estimatedSales.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell>{contract.commissionRate}</TableCell>
                <TableCell>
                  <Badge variant="outline">{contract.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <ContractDetailsDialog contract={contract} isPending={true}>
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
