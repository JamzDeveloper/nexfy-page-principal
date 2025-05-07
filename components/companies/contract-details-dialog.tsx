"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, DollarSign, Building } from "lucide-react"

interface ContractDetailsProps {
  contract: {
    id: number
    name: string
    position: string
    startDate?: string
    endDate?: string
    proposedDate?: string
    proposedEndDate?: string
    totalSales?: number
    commission?: number
    commissionRate: string
    estimatedSales?: number
    status: string
  }
  isPending?: boolean
  children: React.ReactNode
}

export function ContractDetailsDialog({ contract, isPending = false, children }: ContractDetailsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{contract.position}</DialogTitle>
          <DialogDescription className="flex items-center mt-2">
            <Building className="mr-1 h-4 w-4" />
            {contract.name}
            <Badge className="ml-2" variant={isPending ? "outline" : "success"}>
              {contract.status}
            </Badge>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Calendar className="h-4 w-4 text-muted-foreground justify-self-end" />
            <div className="col-span-3">
              <p className="font-medium">
                {isPending
                  ? `${contract.proposedDate} - ${contract.proposedEndDate}`
                  : `${contract.startDate} - ${contract.endDate}`}
              </p>
              <p className="text-sm text-muted-foreground">
                {isPending ? "Periodo propuesto" : "Periodo del contrato"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <DollarSign className="h-4 w-4 text-muted-foreground justify-self-end" />
            <div className="col-span-3">
              <p className="font-medium">
                ${(isPending ? contract.estimatedSales : contract.totalSales)?.toLocaleString() || 0}
              </p>
              <p className="text-sm text-muted-foreground">{isPending ? "Ventas estimadas" : "Ventas totales"}</p>
            </div>
          </div>
          {!isPending && (
            <div className="grid grid-cols-4 items-center gap-4">
              <DollarSign className="h-4 w-4 text-muted-foreground justify-self-end" />
              <div className="col-span-3">
                <p className="font-medium">${contract.commission?.toLocaleString() || 0}</p>
                <p className="text-sm text-muted-foreground">Comisión total</p>
              </div>
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <DollarSign className="h-4 w-4 text-muted-foreground justify-self-end" />
            <div className="col-span-3">
              <p className="font-medium">{contract.commissionRate}</p>
              <p className="text-sm text-muted-foreground">Tasa de comisión</p>
            </div>
          </div>
          {isPending && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <h4 className="font-medium mb-2">Estado del contrato</h4>
              <p className="text-sm text-muted-foreground">
                {contract.status === "Negociación"
                  ? "Este contrato está actualmente en fase de negociación. Los términos pueden cambiar."
                  : contract.status === "Revisión Legal"
                    ? "Este contrato está siendo revisado por el departamento legal."
                    : "Este contrato está pendiente de firma por ambas partes."}
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline">
            {isPending ? "Ver Propuesta Completa" : "Ver Historial"}
          </Button>
          <Button type="button">{isPending ? "Continuar Proceso" : "Contactar"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
