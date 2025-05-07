"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building, Calendar, DollarSign, Edit, MapPin, Users } from "lucide-react"
import { OpportunityEditForm } from "./opportunity-edit-form"

interface OpportunityDetailsDialogProps {
  opportunity: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OpportunityDetailsDialog({ opportunity, open, onOpenChange }: OpportunityDetailsDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("detalles")

  // Datos de ejemplo para aplicantes
  const applicants = [
    { id: 1, name: "Carlos Rodríguez", email: "carlos@example.com", date: "2023-05-16", status: "Revisión" },
    { id: 2, name: "María López", email: "maria@example.com", date: "2023-05-17", status: "Entrevista" },
    { id: 3, name: "Juan García", email: "juan@example.com", date: "2023-05-18", status: "Rechazado" },
    { id: 4, name: "Ana Martínez", email: "ana@example.com", date: "2023-05-19", status: "Contratado" },
  ]

  if (isEditing) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Editar Oportunidad</DialogTitle>
            <DialogDescription>Modifica los detalles de esta oportunidad</DialogDescription>
          </DialogHeader>
          <OpportunityEditForm
            opportunity={opportunity}
            onCancel={() => setIsEditing(false)}
            onSave={() => {
              setIsEditing(false)
              // Aquí iría la lógica para guardar los cambios
            }}
          />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div>
            <DialogTitle>{opportunity.title}</DialogTitle>
            <DialogDescription className="flex items-center mt-1">
              <Building className="mr-1 h-4 w-4" />
              {opportunity.company}
            </DialogDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
        </DialogHeader>

        <Tabs defaultValue="detalles" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="detalles">Detalles</TabsTrigger>
            <TabsTrigger value="aplicantes">Aplicantes ({applicants.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="detalles" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Información General</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">ID</p>
                    <p className="text-sm text-muted-foreground">{opportunity.id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Estado</p>
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
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Ubicación</p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {opportunity.location}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Fecha de Creación</p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {opportunity.createdAt}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Salario</p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <DollarSign className="mr-1 h-4 w-4" />
                      {opportunity.salary}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Tipo</p>
                    <p className="text-sm text-muted-foreground">{opportunity.type}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Esta posición es para un {opportunity.title} en {opportunity.company}. El candidato ideal tendrá
                  experiencia en ventas y desarrollo de negocios, con habilidades excepcionales de comunicación y
                  negociación.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Requisitos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  <li>Mínimo 3 años de experiencia en ventas</li>
                  <li>Excelentes habilidades de comunicación</li>
                  <li>Capacidad para trabajar en equipo</li>
                  <li>Orientación a resultados</li>
                  <li>Disponibilidad para viajar ocasionalmente</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aplicantes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Aplicantes
                </CardTitle>
                <CardDescription>Lista de candidatos que han aplicado a esta oportunidad</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applicants.map((applicant) => (
                        <TableRow key={applicant.id}>
                          <TableCell className="font-medium">{applicant.name}</TableCell>
                          <TableCell>{applicant.email}</TableCell>
                          <TableCell>{applicant.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                applicant.status === "Contratado"
                                  ? "success"
                                  : applicant.status === "Entrevista"
                                    ? "default"
                                    : applicant.status === "Revisión"
                                      ? "secondary"
                                      : "destructive"
                              }
                            >
                              {applicant.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
