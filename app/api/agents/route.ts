import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log("BODY RECIBIDO:", body);

    // Valida los campos que esperas en body.user
  // ...existing code...
    const { firstName, lastName, email, password } = body.user || {};

    if (!firstName || !lastName || !email || !password || !body.agent) {
        return new Response("Faltan campos obligatorios", { status: 400 });
    }
// ...existing code...

    const res = await fetch(`${process.env.API_URL}/agents`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        return new Response("Error al crear usuario", { status: res.status });
    }

    const data = await res.json();
    console.log("RESPUESTA BACKEND:", data);
    return Response.json(data);
}