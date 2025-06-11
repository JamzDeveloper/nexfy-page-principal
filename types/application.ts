/**
 * Tipos TypeScript para el sistema de oportunidades
 * Define las interfaces y tipos utilizados en toda la aplicación
 */

// Interfaz principal para una oportunidad
export interface Opportunity {
    opportunityId: string
    agentId: string
    title: string
    description: string
    industry: string
    targetAudience?: string
    location: string
    language: string
    minimumPrice?: number
    commissionPercentage: number
    status: "active" | "inactive" | "pending"
    documentLegal?: string
    
    createdAt?: string
    updatedAt?: string
}

// Interfaz para los filtros de oportunidades
export interface OpportunityFilters {
    industries: string[]
    targetAudiences: string[]
    languages: string[]
    locations: string[]
    minPrice: number
    maxPrice: number
    commission: string
}

// Interfaz para la respuesta de la API
export interface OpportunitiesApiResponse {
    success: boolean
    opportunities: Opportunity[]
    total: number
    timestamp: string
    error?: string
}

// Interfaz para aplicación a una oportunidad
export interface OpportunityApplication {
    opportunityId: string
    agentId: string
    applicationDate: string
    status: "pending" | "approved" | "rejected"
    notes?: string
}

// Tipos para el estado de carga
export type LoadingState = "idle" | "loading" | "success" | "error"

// Constantes para las opciones de filtros
export const INDUSTRIES = [
    "Automotive",
    "Computer Software",
    "Construction",
    "Consumer goods",
    "Customer support",
    "Digital Marketing & Advertising",
    "Entertainment",
    "Financial services",
    "Health & Fitness",
    "IT",
] as const

export const LANGUAGES = ["English", "Spanish", "French", "German"] as const

export const TARGET_AUDIENCES = ["All", "B2B", "B2C"] as const

export type Industry = (typeof INDUSTRIES)[number]
export type Language = (typeof LANGUAGES)[number]
export type TargetAudience = (typeof TARGET_AUDIENCES)[number]
