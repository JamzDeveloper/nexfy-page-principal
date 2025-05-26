import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    const url = req.nextUrl.pathname;
    const id = url.split("/").pop(); // Extrae el id de la URL

    if (!id) {
        return NextResponse.json(
            { error: "ID de usuario no proporcionado" },
            { status: 400 }
        );
    }

    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return NextResponse.json({ error: "Token requerido" }, { status: 401 });
    }
    const body = await req.json();

    const res = await fetch(`${process.env.API_URL}/agents/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Si es necesario
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        return new Response("Error al actualizar usuario", { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
}
