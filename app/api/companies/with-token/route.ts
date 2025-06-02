import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];
    
    if (!token) {
        return NextResponse.json({ error: "Token no encontrado" }, { status: 401 });
    }
    // Verificar si el token es válido
    try {
        // Llamar al endpoint externo con el token en el header Authorization
        const res = await fetch(`${process.env.API_URL}/companies/with-token`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Error al obtener datos de la compañia" }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Error en la petición" }, { status: 500 });
    }
}

