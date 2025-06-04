
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try {
        // Extrae el id de la URL
        const url = req.nextUrl.pathname;
        const id = url.split("/").pop();

        if (!id) {
            return NextResponse.json(
                { error: "ID de oportunidad no proporcionado" },
                { status: 400 }
            );
        }

        const authHeader = req.headers.get("Authorization");
        const token = authHeader?.split(" ")[1];

        if (!token) {
            return NextResponse.json({ error: "Token requerido" }, { status: 401 });
        }

        // Recibe el formData del frontend
        const formData = await req.formData();

        // Log para debug
        console.log("Updating opportunity with ID:", id);
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        // Envía el formData al backend real
        const response = await fetch(`${process.env.API_URL}/opportunities/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const error = await response.text();
            console.error("Backend error:", error);
            return new Response(error, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in PATCH /api/opportunities/[id]:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}