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
      proposedDate: "1 Junio, 2023",
      proposedEndDate: "1 Junio, 2024",
      estimatedSales: 150000,
      commissionRate: "22%",
      status: "Negociación",
    },
    {
      id: 2,
      name: "DataTech Inc",
      position: "Sales Team Lead",
      proposedDate: "15 Junio, 2023",
      proposedEndDate: "15 Junio, 2024",
      estimatedSales: 200000,
      commissionRate: "18%",
      status: "Revisión Legal",
    },
    {
      id: 3,
      name: "CloudServices",
      position: "Account Executive",
      proposedDate: "10 Julio, 2023",
      proposedEndDate: "10 Julio, 2024",
      estimatedSales: 180000,
      commissionRate: "20%",
      status: "Pendiente de Firma",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contratos Pendientes</CardTitle>
        <CardDescription>Contratos en proceso de negociación o aprobación</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Compañía</TableHead>
              <TableHead>Posición</TableHead>
              <TableHead>Periodo Propuesto</TableHead>
              <TableHead>Ventas Estimadas</TableHead>
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
                    {contract.proposedDate} - {contract.proposedEndDate}
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
                    <Link href={`/dashboard-agent/messages`}>
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
