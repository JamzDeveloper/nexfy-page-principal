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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Calendar, DollarSign, Mail, Phone, User } from "lucide-react"
import { CompanyAgentsTable } from "./company-agents-table"

interface CompanyDetailsProps {
  company: {
    id: number
    name: string
    contacto: string
    email: string
    telefono: string
    industria: string
    ubicacion: string
    fechaInicio: string
    oportunidades: number
    agentes: number
    estado: string
  }
  children: React.ReactNode
}

export function CompanyDetailsDialog({ company, children }: CompanyDetailsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{company.name}</DialogTitle>
          <DialogDescription>
            <Badge
              variant={
                company.estado === "Activo" ? "success" : company.estado === "Pendiente" ? "outline" : "secondary"
              }
              className="mt-2"
            >
              {company.estado}
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <User className="h-4 w-4 text-muted-foreground justify-self-end" />
              <div className="col-span-3">
                <p className="font-medium">{company.contacto}</p>
                <p className="text-sm text-muted-foreground">Contacto principal</p>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Mail className="h-4 w-4 text-muted-foreground justify-self-end" />
              <div className="col-span-3">
                <p className="font-medium">{company.email}</p>
                <p className="text-sm text-muted-foreground">Email de contacto</p>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Phone className="h-4 w-4 text-muted-foreground justify-self-end" />
              <div className="col-span-3">
                <p className="font-medium">{company.telefono}</p>
                <p className="text-sm text-muted-foreground">Teléfono de contacto</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Building className="h-4 w-4 text-muted-foreground justify-self-end" />
              <div className="col-span-3">
                <p className="font-medium">{company.industria}</p>
                <p className="text-sm text-muted-foreground">Industria</p>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Calendar className="h-4 w-4 text-muted-foreground justify-self-end" />
              <div className="col-span-3">
                <p className="font-medium">{company.fechaInicio}</p>
                <p className="text-sm text-muted-foreground">Fecha de inicio</p>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <DollarSign className="h-4 w-4 text-muted-foreground justify-self-end" />
              <div className="col-span-3">
                <p className="font-medium">
                  {company.oportunidades} oportunidades / {company.agentes} agentes
                </p>
                <p className="text-sm text-muted-foreground">Actividad</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="agentes" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="agentes">Agentes</TabsTrigger>
            <TabsTrigger value="oportunidades">Oportunidades</TabsTrigger>
          </TabsList>
          <TabsContent value="agentes" className="pt-4">
            <CompanyAgentsTable companyId={company.id} />
          </TabsContent>
          <TabsContent value="oportunidades" className="pt-4">
            <div className="text-center py-4">
              <p className="text-muted-foreground">Oportunidades de {company.name}</p>
              <p className="text-sm text-muted-foreground">Total: {company.oportunidades} oportunidades activas</p>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button type="button" variant="outline">
            Editar Compañía
          </Button>
          <Button type="button">Contactar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
