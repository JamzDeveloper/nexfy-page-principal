"use client"

import React from "react"

import { useOpportunities } from "@/contexts/opportunities-context"
import { OpportunityCard } from "./opportunities-card"
import { OpportunityFilters } from "./opportunities-filters"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

/**
 * Contenedor principal que maneja la visualización de oportunidades
 * Incluye filtros, lista de oportunidades y estados de carga/error
 */
export function OpportunitiesContainer() {
    const { state, fetchOpportunities } = useOpportunities()
    const { opportunities, filteredOpportunities, loading, error } = state

    // Efecto para cargar oportunidades al montar el componente
    React.useEffect(() => {
        fetchOpportunities()
    }, [fetchOpportunities])

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <LoadingSpinner size="lg" />
            </div>
        )
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Error al cargar las oportunidades: {error}</AlertDescription>
            </Alert>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Panel de filtros - Sidebar derecho */}
            <div className="lg:col-span-1 order-2 lg:order-2">
                <OpportunityFilters />
            </div>

            {/* Lista de oportunidades - Contenido principal */}
            <div className="lg:col-span-3 order-1 lg:order-1">
                <div className="space-y-4">
                    {filteredOpportunities.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No se encontraron oportunidades que coincidan con los filtros</p>
                        </div>
                    ) : (
                        filteredOpportunities.map((opportunity) => (
                            <OpportunityCard 
                                key={opportunity.opportunityId} 
                                opportunity={opportunity} 
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
