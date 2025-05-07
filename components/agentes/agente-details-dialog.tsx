"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Calendar, DollarSign, Mail, Phone, Star, User } from "lucide-react"

interface AgenteDetailsProps {
  agente: {
    id: number
    name: string
    avatar: string
    email: string
    telefono: string
    especialidad: string
    fechaInicio: string
    ventas: number
    comision: number
    estado: string
    rating: number
  }
  children: React.ReactNode
}

export function AgenteDetailsDialog({ agente, children }: AgenteDetailsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader className="flex flex-row items-center gap-4 sm:flex-row">
          <Avatar className="h-16 w-16">
            <AvatarImage src={agente.avatar || "/placeholder.svg"} alt={agente.name} />
            <AvatarFallback>{agente.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <DialogTitle className="text-2xl">{agente.name}</DialogTitle>
            <DialogDescription className="flex items-center mt-2">
              <Badge variant="success" className="mr-2">
                {agente.estado}
              </Badge>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < agente.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <User className="h-4 w-4 text-muted-foreground justify-self-end" />
            <div className="col-span-3">
              <p className="font-medium">{agente.especialidad}</p>
              <p className="text-sm text-muted-foreground">Especialidad</p>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Mail className="h-4 w-4 text-muted-foreground justify-self-end" />
            <div className="col-span-3">
              <p className="font-medium">{agente.email}</p>
              <p className="text-sm text-muted-foreground">Email de contacto</p>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Phone className="h-4 w-4 text-muted-foreground justify-self-end" />
            <div className="col-span-3">
              <p className="font-medium">{agente.telefono}</p>
              <p className="text-sm text-muted-foreground">Teléfono de contacto</p>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Calendar className="h-4 w-4 text-muted-foreground justify-self-end" />
            <div className="col-span-3">
              <p className="font-medium">{agente.fechaInicio}</p>
              <p className="text-sm text-muted-foreground">Fecha de inicio</p>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <DollarSign className="h-4 w-4 text-muted-foreground justify-self-end" />
            <div className="col-span-3">
              <p className="font-medium">${agente.ventas.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Ventas totales</p>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <DollarSign className="h-4 w-4 text-muted-foreground justify-self-end" />
            <div className="col-span-3">
              <p className="font-medium">${agente.comision.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Comisión total</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline">
            Ver Historial
          </Button>
          <Button type="button">Contactar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
