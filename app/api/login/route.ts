// Ejemplo: app/api/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const resApi = await fetch(`${process.env.API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await resApi.json();

    console.log("resp api", data);

    if (!data || !data.token || !data.token.access_token || !data.user || !data.user.role) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

        const res = NextResponse.json({
        success: true,
        user: data.user,
        token: data.token.access_token,
    });

    // Guardar cookies de sesión
    res.cookies.set("session-token", data.token.access_token, {
        httpOnly: false,
    });
    res.cookies.set("role", data.user.role, { httpOnly: false });

    return res;
}
