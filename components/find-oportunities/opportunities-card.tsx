"use client"

import { useState } from "react"
import { MapPin, DollarSign, Building2, Users, Globe, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ApplicationModal } from "./aplication-modal"

interface Opportunity {
    opportunityId: string
    title: string
    company: string
    description: string
    industry: string
    targetAudience: string
    location: string
    language: string
    minimumPrice: number
    commissionPercentage: number
    status: "active" | "inactive" | "pending"
    publishedAt: string
    createdAt?: string
    updatedAt?: string
}

interface OpportunityCardProps {
    opportunity: Opportunity
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    // En una aplicación real, estos datos vendrían del contexto de autenticación
    const loggedInAgentId = "4" // Simulamos que el agente con ID 4 está logueado
    const loggedInAgentName = "John Smith" // Nombre del agente logueado

    const getCommissionBadgeColor = (percentage: number) => {
        if (percentage >= 20) return "bg-emerald-100 text-emerald-800 border-emerald-200"
        if (percentage >= 15) return "bg-blue-100 text-blue-800 border-blue-200"
        if (percentage >= 10) return "bg-purple-100 text-purple-800 border-purple-200"
        return "bg-gray-100 text-gray-800 border-gray-200"
    }

    return (
        <>
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 overflow-hidden">
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        {/* Lado izquierdo - Información principal */}
                        <div className="flex-1 pr-8">
                            {/* Title y Company */}
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                                    {opportunity.title}
                                </h3>
                                <div className="flex items-center text-gray-600">
                                    <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                                    <span className="font-medium">{opportunity.company}</span>
                                </div>
                            </div>

                            {/* Badges informativos */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {opportunity.targetAudience}
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-purple-50 text-purple-700 border-purple-200 flex items-center gap-1"
                                >
                                    <MapPin className="w-3 h-3" />
                                    {opportunity.location}
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1"
                                >
                                    <Globe className="w-3 h-3" />
                                    {opportunity.language}
                                </Badge>
                            </div>
                        </div>

                        {/* Lado derecho - Precio y comisión */}
                        <div className="flex flex-col items-end min-w-[200px]">
                            <div className="text-right">
                                <div className="flex items-center justify-end mb-2">
                                    <DollarSign className="w-5 h-5 text-emerald-600 mr-1" />
                                    <span className="text-2xl font-bold text-gray-900">${opportunity.minimumPrice.toLocaleString()}</span>
                                    <span className="text-gray-500 ml-1">(USD)</span>
                                </div>
                                <Badge
                                    className={`${getCommissionBadgeColor(opportunity.commissionPercentage)} font-semibold px-3 py-1`}
                                >
                                    Commission: {opportunity.commissionPercentage}%
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Description y Action Button en la misma línea */}
                    <div className="flex items-center justify-between">
                        <p className="text-black line-clamp-2 leading-relaxed flex-1 pr-6">{opportunity.description}</p>
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 group-hover:shadow-lg flex items-center gap-2 flex-shrink-0"
                        >
                            Aplicar Ahora
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>

            <ApplicationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                opportunity={{
                    opportunityId: opportunity.opportunityId,
                    title: opportunity.title,
                    company: opportunity.company,
                    commissionPercentage: opportunity.commissionPercentage,
                    minimumPrice: opportunity.minimumPrice,
                }}
                agentId={loggedInAgentId}
                agentName={loggedInAgentName}
            />
        </>
    )
}
