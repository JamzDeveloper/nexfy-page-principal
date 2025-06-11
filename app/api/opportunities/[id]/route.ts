
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try {
        // Extrae el id de la URL
        const url = req.nextUrl.pathname;
        const id = url.split("/").pop();

        if (!id) {
            return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
        }

        const authHeader = req.headers.get("Authorization");
        const token = authHeader?.split(" ")[1];

        if (!token) {
            return NextResponse.json({ error: "Token requerido" }, { status: 401 });
        }

        // Leer el cuerpo como JSON
        const body = await req.json();

        // Reenviar al backend real
        const response = await fetch(`${process.env.API_URL}/opportunities/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const error = await response.text();
            return new NextResponse(error, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in PATCH /api/opportunities/[id]:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}