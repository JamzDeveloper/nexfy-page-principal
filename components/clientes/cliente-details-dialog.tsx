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
import { Calendar, DollarSign, Mail, Phone, User } from "lucide-react"

interface ClienteDetailsProps {
  cliente: {
    id: number
    name: string
    contacto: string
    email: string
    telefono: string
    estado: string
    ultimaCompra: string
    valorTotal: number
    agente?: string
  }
  children: React.ReactNode
}

export function ClienteDetailsDialog({ cliente, children }: ClienteDetailsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{cliente.name}</DialogTitle>
          <DialogDescription>
            <Badge
              variant={
                cliente.estado === "Activo" ? "success" : cliente.estado === "Prospecto" ? "outline" : "secondary"
              }
              className="mt-2"
            >
              {cliente.estado}
            </Badge>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <User className="h-4 w-4 text-muted-foreground justify-self-end" />
            <div className="col-span-3">
              <p className="font-medium">{cliente.contacto}</p>
              <p className="text-sm text-muted-foreground">Contacto principal</p>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Mail className="h-4 w-4 text-muted-foreground justify-self-end" />
            <div className="col-span-3">
              <p className="font-medium">{cliente.email}</p>
              <p className="text-sm text-muted-foreground">Email de contacto</p>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Phone className="h-4 w-4 text-muted-foreground justify-self-end" />
            <div className="col-span-3">
              <p className="font-medium">{cliente.telefono}</p>
              <p className="text-sm text-muted-foreground">Teléfono de contacto</p>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Calendar className="h-4 w-4 text-muted-foreground justify-self-end" />
            <div className="col-span-3">
              <p className="font-medium">{cliente.ultimaCompra !== "N/A" ? cliente.ultimaCompra : "Sin compras"}</p>
              <p className="text-sm text-muted-foreground">Última compra</p>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <DollarSign className="h-4 w-4 text-muted-foreground justify-self-end" />
            <div className="col-span-3">
              <p className="font-medium">${cliente.valorTotal.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Valor total de compras</p>
            </div>
          </div>
          {cliente.agente && (
            <div className="grid grid-cols-4 items-center gap-4">
              <User className="h-4 w-4 text-muted-foreground justify-self-end" />
              <div className="col-span-3">
                <p className="font-medium">{cliente.agente}</p>
                <p className="text-sm text-muted-foreground">Agente asignado</p>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline">
            Editar Cliente
          </Button>
          <Button type="button">Contactar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
