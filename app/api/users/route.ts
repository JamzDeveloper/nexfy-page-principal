import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const cookieStore = await cookies();

    console.log("cookieStore", cookieStore.getAll());
    const cookie = cookieStore.get("session-token")?.value;

    console.log("llego a la api", cookie);
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) {
        return NextResponse.json({ error: "Token requerido" }, { status: 401 });
    }
    console.log(`${process.env.API_URL}/users`);
    const res = await fetch(`${process.env.API_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log("res api front", res);
    const data = await res.json();
    console.log("res api data", data);

    return Response.json(data);
}

export async function POST(req: NextRequest) {
    const body = await req.json();

    // Valida los campos que esperas
    const { firstName, lastName, email, password, role } = body;

    if (!firstName || !lastName || !email || !password || !role) {
        return new Response("Faltan campos obligatorios", { status: 400 });
    }

    const res = await fetch(`${process.env.API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            role,
        }),
    });

    if (!res.ok) {
        return new Response("Error al crear usuario", { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
}