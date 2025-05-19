import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return NextResponse.json({ error: "Token requerido" }, { status: 401 });
    }
    try {
        console.log("AuthHeader", token);
        const res = await fetch(`${process.env.API_URL}/users/validate-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
                // Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NzA2NzgxNywiZXhwIjoxNzQ3MDcxNDE3fQ.E8tYx2XbsEi9AoMuFp7jr3SaR5Y3F9TuiocW61tgV5g"
            },
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json(
                { error: "Token inválido o expirado" },
                { status: res.status }
            );
        }

        // Asegúrate que la respuesta tenga el usuario y el rol
        if (!data.user || !data.user.role) {
            return NextResponse.json(
                { error: "Usuario o rol no encontrado" },
                { status: 401 }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error al validar token externo:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}









/*            response.cookies.set("token", "", {
                maxAge: 0,
                path: "/",
                httpOnly: false,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
            });
            return response;
        }

        const data = await res.json();
        return Response.json(data);
    } catch (error) {
        console.error("Error al validar token externo:", error);
        const response = NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
        response.cookies.set("token", "", { maxAge: 0 }); // Por si acaso
        return response;
    }
}
*/