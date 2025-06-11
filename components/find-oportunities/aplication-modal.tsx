"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { opportunitiesApi } from "@/lib/api/find-opportunities"
import { Percent, DollarSign, FileText, Upload, X, CheckCircle, Building2, User, Briefcase } from "lucide-react"

interface ApplicationModalProps {
    isOpen: boolean
    onClose: () => void
    opportunity: {
        opportunityId: string
        title: string
        company: string
        commissionPercentage: number
        minimumPrice: number
    }
    agentId: string
    agentName: string
}

export function ApplicationModal({ isOpen, onClose, opportunity, agentId, agentName }: ApplicationModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [proposedCommission, setProposedCommission] = useState(opportunity.commissionPercentage.toString())
    const [minimumPrice, setMinimumPrice] = useState(opportunity.minimumPrice.toString())
    const [applicationDescription, setApplicationDescription] = useState("")
    const [documentFile, setDocumentFile] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // Validar tipo de archivo (PDF, DOC, DOCX)
            const allowedTypes = [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ]
            if (!allowedTypes.includes(file.type)) {
                setError("Solo se permiten archivos PDF, DOC o DOCX")
                return
            }

            // Validar tamaño (máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError("El archivo no puede ser mayor a 5MB")
                return
            }

            setDocumentFile(file)
            setError(null)
        }
    }

    const removeFile = () => {
        setDocumentFile(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        // Validaciones
        if (!applicationDescription.trim()) {
            setError("La descripción de la aplicación es requerida")
            setIsSubmitting(false)
            return
        }

        if (!documentFile) {
            setError("Debe subir un documento legal")
            setIsSubmitting(false)
            return
        }

        try {
            const applicationData = {
                opportunityId: opportunity.opportunityId,
                agentId,
                status: "pending",
                proposedCommission: Number.parseFloat(proposedCommission),
                minimumPrice: Number.parseFloat(minimumPrice),
                description: applicationDescription,
                documentLegal: documentFile.name,
            }

            await opportunitiesApi.applyToOpportunity(opportunity.opportunityId, applicationData)
            setSuccess(true)
            setTimeout(() => {
                onClose()
                setSuccess(false)
                resetForm()
            }, 2000)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al enviar la aplicación")
        } finally {
            setIsSubmitting(false)
        }
    }

    const resetForm = () => {
        setApplicationDescription("")
        setDocumentFile(null)
        setProposedCommission(opportunity.commissionPercentage.toString())
        setMinimumPrice(opportunity.minimumPrice.toString())
        setError(null)
    }

    const handleClose = () => {
        resetForm()
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[750px] max-h-[90vh] overflow-y-auto">
                <DialogHeader className="border-b border-gray-100 pb-4">
                    <DialogTitle className="text-xl font-semibold text-gray-900">Detalles de Postulación</DialogTitle>
                </DialogHeader>

                {success ? (
                    <div className="py-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                            <CheckCircle className="h-8 w-8" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">¡Postulación Enviada!</h3>
                        <p className="text-gray-600">Tu postulación ha sido enviada correctamente y está siendo revisada.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Información en 3 columnas */}
                        <div className="border-b border-gray-100 pb-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Información de la Oportunidad */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-3">Información de la Oportunidad</h4>
                                    <div className="flex items-start gap-3">
                                        <Briefcase className="w-5 h-5 text-blue-600 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-gray-900">{opportunity.title}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Información de la Compañía */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-3">Información de la Compañía</h4>
                                    <div className="flex items-start gap-3">
                                        <Building2 className="w-5 h-5 text-purple-600 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-gray-900">{opportunity.company}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Información del Agente */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 mb-3">Información del Agente</h4>
                                    <div className="flex items-start gap-3">
                                        <User className="w-5 h-5 text-green-600 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-gray-900">{agentName}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Información Financiera */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <DollarSign className="w-5 h-5 text-green-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Información Financiera</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Comisión Propuesta */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="proposedCommission"
                                        className="flex items-center gap-2 text-sm font-medium text-gray-700"
                                    >
                                        <Percent className="w-4 h-4 text-blue-600" />
                                        Comisión Propuesta
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="proposedCommission"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            max="100"
                                            value={proposedCommission}
                                            onChange={(e) => setProposedCommission(e.target.value)}
                                            className="pr-8"
                                            required
                                        />
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">%</span>
                                    </div>
                                    <p className="text-xs text-blue-600 font-medium">{proposedCommission}%</p>
                                </div>

                                {/* Precio Mínimo */}
                                <div className="space-y-2">
                                    <Label htmlFor="minimumPrice" className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <DollarSign className="w-4 h-4 text-green-600" />
                                        Precio Mínimo
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                        <Input
                                            id="minimumPrice"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={minimumPrice}
                                            onChange={(e) => setMinimumPrice(e.target.value)}
                                            className="pl-8"
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-gray-600">${Number.parseFloat(minimumPrice || "0").toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Descripción de la Postulación */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <FileText className="w-5 h-5 text-blue-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Descripción de la Postulación</h3>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="applicationDescription" className="text-sm font-medium text-gray-900">
                                    Describe tu experiencia y por qué eres el candidato ideal
                                </Label>
                                <RichTextEditor
                                    value={applicationDescription}
                                    onChange={setApplicationDescription}
                                    placeholder=""
                                    minHeight="150px"
                                />
                                <p className="text-xs text-gray-500">
                                    Utiliza la barra de herramientas para formatear tu texto con negrita, cursiva, listas y más.
                                </p>
                            </div>
                        </div>

                        {/* Documentación Legal
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <FileText className="w-5 h-5 text-purple-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Documentación Legal</h3>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-gray-700">Documento Legal Firmado</Label>

                                {!documentFile ? (
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600 mb-2">
                                            Arrastra y suelta tu documento legal aquí, o haz clic para seleccionar
                                        </p>
                                        <p className="text-xs text-gray-500 mb-4">Formatos soportados: PDF, DOC, DOCX (Máximo 5MB)</p>
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            id="document-upload"
                                        />
                                        <Label
                                            htmlFor="document-upload"
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                                        >
                                            <Upload className="w-4 h-4 mr-2" />
                                            Seleccionar Archivo
                                        </Label>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-5 h-5 text-blue-600" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{documentFile.name}</p>
                                                <p className="text-xs text-gray-500">{(documentFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={removeFile}
                                            className="text-gray-500 hover:text-red-600"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm flex items-center gap-2">
                                <X className="w-4 h-4 flex-shrink-0" />
                                {error}
                            </div>
                        )}*/}

                        <DialogFooter className="border-t border-gray-100 pt-4">
                            <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
                                {isSubmitting ? (
                                    <>
                                        <LoadingSpinner size="sm" className="mr-2" />
                                        Enviando...
                                    </>
                                ) : (
                                    "Enviar Postulación"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog> 
    )
}
