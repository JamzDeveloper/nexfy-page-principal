import { redirect } from "next/navigation";

export async function login(email: string, password: string) {
    const res = await fetch(`http://localhost:3000/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        cache: "no-store",
    });

    console.log("res ", res);
    if (!res.ok) throw new Error("No se pudo iniciar sesión");
    return res.json();
}

// falta el logout