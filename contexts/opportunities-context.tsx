"use client"

import type React from "react"
import { createContext, useContext, useReducer, useCallback } from "react"
import type { Opportunity, OpportunityFilters } from "@/types/application"
import { opportunitiesApi } from "@/lib/api/find-opportunities"
// Tipos para el estado del contexto
interface OpportunitiesState {
    opportunities: Opportunity[]
    filteredOpportunities: Opportunity[]
    filters: OpportunityFilters
    loading: boolean
    error: string | null
}

// Tipos para las acciones del reducer
type OpportunitiesAction =
    | { type: "SET_LOADING"; payload: boolean }
    | { type: "SET_OPPORTUNITIES"; payload: Opportunity[] }
    | { type: "SET_ERROR"; payload: string | null }
    | { type: "UPDATE_FILTERS"; payload: Partial<OpportunityFilters> }
    | { type: "CLEAR_FILTERS" }

// Estado inicial
const initialState: OpportunitiesState = {
    opportunities: [],
    filteredOpportunities: [],
    filters: {
        industries: [],
        targetAudiences: [],
        languages: [],
        locations: [],
        minPrice: 0,
        maxPrice: 0,
        commission: "",
    },
    loading: false,
    error: null,
}

/**
 * Reducer para manejar el estado de las oportunidades
 * Maneja la carga, filtrado y actualización de oportunidades
 */
function opportunitiesReducer(state: OpportunitiesState, action: OpportunitiesAction): OpportunitiesState {
    switch (action.type) {
        case "SET_LOADING":
            return { ...state, loading: action.payload }

        case "SET_OPPORTUNITIES":
            return {
                ...state,
                opportunities: action.payload,
                filteredOpportunities: filterOpportunities(action.payload, state.filters),
                loading: false,
                error: null,
            }

        case "SET_ERROR":
            return { ...state, error: action.payload, loading: false }

        case "UPDATE_FILTERS":
            const newFilters = { ...state.filters, ...action.payload }
            return {
                ...state,
                filters: newFilters,
                filteredOpportunities: filterOpportunities(state.opportunities, newFilters),
            }

        case "CLEAR_FILTERS":
            const clearedFilters = initialState.filters
            return {
                ...state,
                filters: clearedFilters,
                filteredOpportunities: state.opportunities,
            }

        default:
            return state
    }
}

/**
 * Función para filtrar oportunidades basada en los filtros activos
 */
function filterOpportunities(opportunities: Opportunity[], filters: OpportunityFilters): Opportunity[] {
    return opportunities.filter((opportunity) => {
        // Filtro por industria
        if (filters.industries.length > 0 && !filters.industries.includes(opportunity.industry)) {
            return false
        }

        // Filtro por audiencia objetivo
        if (
            filters.targetAudiences.length > 0 &&
            opportunity.targetAudience &&
            !filters.targetAudiences.includes(opportunity.targetAudience)
        ) {
            return false
        }

        // Filtro por idioma
        if (filters.languages.length > 0 && !filters.languages.includes(opportunity.language)) {
            return false
        }

        // Filtro por ubicación
        if (filters.locations.length > 0 && !filters.locations.includes(opportunity.location)) {
            return false
        }

        // Filtro por precio mínimo
        if (filters.minPrice > 0 && (opportunity.minimumPrice || 0) < filters.minPrice) {
            return false
        }

        // Filtro por precio máximo
        if (filters.maxPrice > 0 && (opportunity.minimumPrice || 0) > filters.maxPrice) {
            return false
        }

        return true
    })
}

// Contexto
const OpportunitiesContext = createContext<{
    state: OpportunitiesState
    fetchOpportunities: () => Promise<void>
    updateFilters: (filters: Partial<OpportunityFilters>) => void
    clearFilters: () => void
} | null>(null)

/**
 * Provider del contexto de oportunidades
 * Maneja el estado global y las operaciones relacionadas con oportunidades
 */
export function OpportunitiesProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(opportunitiesReducer, initialState)

    // Función para obtener oportunidades desde la API
    const fetchOpportunities = useCallback(async () => {
        dispatch({ type: "SET_LOADING", payload: true })

        try {
            const opportunities = await opportunitiesApi.getAll()
            dispatch({ type: "SET_OPPORTUNITIES", payload: opportunities })
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido"
            dispatch({ type: "SET_ERROR", payload: errorMessage })
        }
    }, [])

    // Función para actualizar filtros
    const updateFilters = useCallback((filters: Partial<OpportunityFilters>) => {
        dispatch({ type: "UPDATE_FILTERS", payload: filters })
    }, [])

    // Función para limpiar filtros
    const clearFilters = useCallback(() => {
        dispatch({ type: "CLEAR_FILTERS" })
    }, [])

    const value = {
        state,
        fetchOpportunities,
        updateFilters,
        clearFilters,
    }

    return <OpportunitiesContext.Provider value={value}>{children}</OpportunitiesContext.Provider>
}

/**
 * Hook personalizado para usar el contexto de oportunidades
 */
export function useOpportunities() {
    const context = useContext(OpportunitiesContext)
    if (!context) {
        throw new Error("useOpportunities debe ser usado dentro de OpportunitiesProvider")
    }
    return context
}
