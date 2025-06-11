import type { Opportunity } from "@/types/application"

/**
 * Servicio para interactuar con la API interna de oportunidades
 * Maneja todas las peticiones HTTP relacionadas con oportunidades
 */
class OpportunitiesApiService {
    // private baseUrl = "/application"

    /**
     * Obtiene todas las oportunidades disponibles
     * @returns Promise<Opportunity[]> Lista de oportunidades
     */
    async getAll(): Promise<Opportunity[]> {
        try {
            const response = await fetch(`${process.env.EXTERNAL_URL}/application`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`)
            }

            const data = await response.json()
            return data.opportunities || []
        } catch (error) {
            console.error("Error fetching opportunities:", error)
            throw new Error("No se pudieron cargar las oportunidades")
        }
    }

    /**
     * Obtiene una oportunidad específica por ID
     * @param id - ID de la oportunidad
     * @returns Promise<Opportunity> Oportunidad específica
     */
    async getById(id: string): Promise<Opportunity> {
        try {
            const response = await fetch(`${process.env.EXTERNAL_URL}/application/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`)
            }

            const data = await response.json()
            return data.opportunity
        } catch (error) {
            console.error("Error fetching opportunity:", error)
            throw new Error("No se pudo cargar la oportunidad")
        }
    }

    /**
     * Aplica a una oportunidad específica
     * @param id - ID de la oportunidad
     * @param applicationData - Datos de la aplicación
     * @returns Promise<any> Respuesta de la aplicación
     */
    async applyToOpportunity(id: string, applicationData: any): Promise<any> {
        try {
            const response = await fetch(`${process.env.EXTERNAL_URL}/application/${id}/apply`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(applicationData),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`)
            }

            return await response.json()
        } catch (error) {
            console.error("Error applying to opportunity:", error)
            throw error
        }
    }
}

// Instancia singleton del servicio
export const opportunitiesApi = new OpportunitiesApiService()
