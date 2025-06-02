import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get("Authorization");
        const token = authHeader?.split(" ")[1];
        
        if (!token) {
            return NextResponse.json({ error: "Token requerido" }, { status: 401 });
        }

        console.log("Fetching opportunities from:", `${process.env.API_URL}/opportunities`);
        
        const res = await fetch(`${process.env.API_URL}/opportunities`, {
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
        console.error("Error in GET /api/opportunities:", error);
        return NextResponse.json(
            { error: "Error al obtener oportunidades" }, 
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
            return new Response("Unauthorized", { status: 401 });
        }

        const formData = await req.formData();

        // Enviar al backend
        const response = await fetch(`${process.env.API_URL}/opportunities`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const error = await response.text();
            return new Response(error, { status: response.status });
        }

        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        console.error("Error creating opportunity:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}