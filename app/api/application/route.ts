    import { type NextRequest, NextResponse } from "next/server"

    /**
     * API Route Handler para oportunidades
     * Maneja las peticiones GET para obtener oportunidades desde el backend externo
     */

    // URL del backend externo (debería venir de variables de entorno)

    // const EXTERNAL_API_URL = process.env.EXTERNAL_API_URL || "https://api.external-backend.com"
    // const API_KEY = process.env.EXTERNAL_API_KEY || ""

    /**
     * Maneja las peticiones GET para obtener todas las oportunidades
     * Actúa como proxy entre el frontend y el backend externo
     */
    // export async function GET(request: NextRequest) {
    //     try {
    //         // Obtener parámetros de consulta si los hay
    //         const { searchParams } = new URL(request.url)
    //         const queryString = searchParams.toString()

    //         // Construir URL completa para el backend externo
    //         const externalUrl = `${EXTERNAL_API_URL}/opportunities${queryString ? `?${queryString}` : ""}`

    //         console.log("Fetching opportunities from external API:", externalUrl)

    //         // Realizar petición al backend externo
    //         const response = await fetch(externalUrl, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${API_KEY}`,
    //                 // Agregar otros headers necesarios
    //             },
    //             // Configurar timeout y otras opciones
    //             next: { revalidate: 300 }, // Cache por 5 minutos
    //         })

    //         // Verificar si la respuesta es exitosa
    //         if (!response.ok) {
    //             console.error("External API error:", response.status, response.statusText)
    //             return NextResponse.json(
    //                 {
    //                     error: "Error al obtener oportunidades del servidor externo",
    //                     status: response.status,
    //                 },
    //                 { status: response.status },
    //             )
    //         }

    //         // Obtener datos del backend externo
    //         const externalData = await response.json()

    //         // Transformar datos si es necesario para que coincidan con nuestro formato
    //         const transformedData = transformOpportunitiesData(externalData)

    //         // Retornar datos transformados
    //         return NextResponse.json({
    //             success: true,
    //             opportunities: transformedData,
    //             total: transformedData.length,
    //             timestamp: new Date().toISOString(),
    //         })
    //     } catch (error) {
    //         console.error("Error in opportunities API route:", error)

    //         return NextResponse.json(
    //             {
    //                 error: "Error interno del servidor",
    //                 message: error instanceof Error ? error.message : "Error desconocido",
    //             },
    //             { status: 500 },
    //         )
    //     }
    // }

    export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get("Authorization");
        const token = authHeader?.split(" ")[1];
        
        if (!token) {
            return NextResponse.json({ error: "Token requerido" }, { status: 401 });
        }

        console.log("Fetching opportunities from:", `${process.env.API_URL}/application`);
        
        const res = await fetch(`${process.env.API_URL}/application`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Error fetching opportunities:", res.status, errorText);
            throw new Error(`Error fetching opportunities: ${errorText}`);
        }

        const data = await res.json();
        console.log("Opportunities data received:", data);

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in GET /api/application:", error);
        return NextResponse.json(
            { error: "Error al obtener oportunidades" }, 
            { status: 500 }
        );
    }
}

    /**
     * Maneja las peticiones POST para crear nuevas aplicaciones
     */
    export async function POST(request: NextRequest) {
        try {
            const body = await request.json()

            // Validar datos de entrada
            if (!body.opportunityId || !body.agentId) {
                return NextResponse.json({ error: "opportunityId y agentId son requeridos" }, { status: 400 })
            }

            // Enviar aplicación al backend externo
            const response = await fetch(`${EXTERNAL_API_URL}/applications`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_KEY}`,
                },
                body: JSON.stringify(body),
            })

            if (!response.ok) {
                return NextResponse.json({ error: "Error al enviar aplicación" }, { status: response.status })
            }

            const result = await response.json()

            return NextResponse.json({
                success: true,
                application: result,
                timestamp: new Date().toISOString(),
            })
        } catch (error) {
            console.error("Error creating application:", error)

            return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
        }
    }

    /**
     * Transforma los datos del backend externo al formato esperado por el frontend
     * @param externalData - Datos del backend externo
     * @returns Datos transformados
     */
    function transformOpportunitiesData(externalData: any): any[] {
        // Si los datos ya están en el formato correcto, retornarlos directamente
        if (Array.isArray(externalData)) {
            return externalData
        }

        // Si los datos vienen en un wrapper, extraer el array
        if (externalData.opportunities && Array.isArray(externalData.opportunities)) {
            return externalData.opportunities
        }

        // Si es un objeto único, convertirlo a array
        if (typeof externalData === "object" && externalData !== null) {
            return [externalData]
        }

        // Datos de ejemplo si no hay datos del backend (para desarrollo)
        return [
            {
                opportunityId: "1",
                agentId: "agent-1",
                title: "Vendedor/a a domicilio",
                description: "Oportunidad de venta directa con excelente comisión",
                industry: "Consumer goods",
                targetAudience: "B2C",
                location: "Spain - Blanes",
                language: "Spanish",
                minimumPrice: 1000,
                commissionPercentage: 10,
                status: "active",
                documentLegal: "https://link-to-signed-document.com/doc.pdf",
            },
            {
                opportunityId: "2",
                agentId: "agent-2",
                title: "Sales Agents (Freelance / Commission-Based) Wanted",
                description: "Revolutionize the AI Market with Human-Centered Solutions",
                industry: "Customer support",
                targetAudience: "B2B",
                location: "Austria - Graz",
                language: "English",
                minimumPrice: 150000,
                commissionPercentage: 5,
                status: "active",
                documentLegal: "https://link-to-signed-document.com/doc.pdf",
            },
        ]
    }