import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log("BODY RECIBIDO:", body);

    // Valida los campos que esperas en body.user
  // ...existing code...
    const { user, company } = body;
    const { firstName, lastName, email, password } = user || {};
    const { companyName, socialMedia } = company || {};

    if (!firstName || !lastName || !email || !password || !companyName || !socialMedia) {
        return new Response("Faltan campos obligatorios", { status: 400 });
    }
// ...existing code...

    const res = await fetch(`${process.env.API_URL}/companies`, {
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

export async function GET(req: NextRequest) {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("session-token")?.value;

    console.log("cookieStore", cookieStore.getAll());
    console.log("llego a la api", cookie);

    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) {
        return NextResponse.json({ error: "Token requerido" }, { status: 401 });
    }

    console.log(`${process.env.API_URL}/companies/with-token`);
    const res = await fetch(`${process.env.API_URL}/companies/with-token`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error("Error al obtener datos de la compañia:", res.status, errorText);
        return NextResponse.json({ error: "Error al obtener datos de la compañia", detail: errorText }, { status: res.status });
    }

    console.log("res api front", res);
    const data = await res.json();
    console.log("res api data", data);

    return Response.json(data);
}