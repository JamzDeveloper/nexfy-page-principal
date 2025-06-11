import { type NextRequest, NextResponse } from "next/server"

/**
 * API Route Handler para aplicar a oportunidades
 * Maneja las peticiones POST para enviar aplicaciones al backend externo
 */

// URL del backend externo (debería venir de variables de entorno)
const EXTERNAL_API_URL = process.env.EXTERNAL_API_URL || "https://api.external-backend.com"
const API_KEY = process.env.EXTERNAL_API_KEY || ""

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const opportunityId = params.id
        const body = await request.json()

        // Validar datos de entrada
        if (!body.agentId || !body.description) {
            return NextResponse.json(
                {
                    error: "Faltan campos requeridos para la aplicación",
                },
                { status: 400 },
            )
        }

        // Preparar datos para enviar al backend externo
        const applicationData = {
            opportunityId,
            agentId: body.agentId,
            status: "pending",
            commissionPercentage: body.commissionPercentage,
            minimumPrice: body.minimumPrice,
            description: body.description,
            documentLegal: body.documentLegal,
            applicationDate: new Date().toISOString(),
        }

        console.log("Sending application to external API:", applicationData)

        // En una aplicación real, aquí enviaríamos los datos al backend externo
        // Simulamos una respuesta exitosa después de un pequeño delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Simulamos respuesta del backend externo
        const externalResponse = {
            success: true,
            applicationId: `app-${Date.now()}`,
            status: "pending",
            message: "Aplicación recibida correctamente",
        }

        return NextResponse.json({
            success: true,
            application: externalResponse,
            timestamp: new Date().toISOString(),
        })
    } catch (error) {
        console.error("Error processing application:", error)

        return NextResponse.json(
            {
                error: "Error al procesar la aplicación",
                message: error instanceof Error ? error.message : "Error desconocido",
            },
            { status: 500 },
        )
    }
}
