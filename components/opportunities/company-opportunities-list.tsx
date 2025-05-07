"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, MoreHorizontal, Plus } from "lucide-react"
import { OpportunityDetailsDialog } from "./opportunity-details-dialog"

// Datos de ejemplo para oportunidades
const opportunities = [
  {
    id: "OPP-001",
    title: "Representante de Ventas Senior",
    company: "TechCorp",
    location: "Madrid, España",
    status: "Activa",
    applicants: 12,
    createdAt: "2023-05-15",
    salary: "€45,000 - €60,000",
    type: "Tiempo completo",
  },
  {
    id: "OPP-002",
    title: "Ejecutivo de Cuentas",
    company: "Innovate Inc",
    location: "Barcelona, España",
    status: "Activa",
    applicants: 8,
    createdAt: "2023-05-18",
    salary: "€40,000 - €55,000",
    type: "Tiempo completo",
  },
  {
    id: "OPP-003",
    title: "Gerente de Ventas Regional",
    company: "GlobalSales Co",
    location: "Valencia, España",
    status: "Cerrada",
    applicants: 15,
    createdAt: "2023-04-30",
    salary: "€60,000 - €75,000",
    type: "Tiempo completo",
  },
  {
    id: "OPP-004",
    title: "Representante de Ventas Internas",
    company: "ConsultPro",
    location: "Sevilla, España",
    status: "Pausada",
    applicants: 5,
    createdAt: "2023-05-10",
    salary: "€35,000 - €45,000",
    type: "Tiempo completo",
  },
  {
    id: "OPP-005",
    title: "Consultor de Ventas",
    company: "SalesForce",
    location: "Bilbao, España",
    status: "Activa",
    applicants: 10,
    createdAt: "2023-05-20",
    salary: "€50,000 - €65,000",
    type: "Contrato",
  },
]

export function CompanyOpportunitiesList() {
  const [selectedOpportunity, setSelectedOpportunity] = useState<any | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const handleViewDetails = (opportunity: any) => {
    setSelectedOpportunity(opportunity)
    setIsDetailsOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Listado de Oportunidades</h3>
        <Link href="/dashboard-company/opportunities/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Crear Oportunidad
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Aplicantes</TableHead>
              <TableHead>Fecha Creación</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {opportunities.map((opportunity) => (
              <TableRow key={opportunity.id}>
                <TableCell className="font-medium">{opportunity.id}</TableCell>
                <TableCell>{opportunity.title}</TableCell>
                <TableCell>{opportunity.company}</TableCell>
                <TableCell>{opportunity.location}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      opportunity.status === "Activa"
                        ? "success"
                        : opportunity.status === "Pausada"
                          ? "warning"
                          : "destructive"
                    }
                  >
                    {opportunity.status}
                  </Badge>
                </TableCell>
                <TableCell>{opportunity.applicants}</TableCell>
                <TableCell>{opportunity.createdAt}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(opportunity)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalles
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedOpportunity && (
        <OpportunityDetailsDialog
          opportunity={selectedOpportunity}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
        />
      )}
    </div>
  )
}
