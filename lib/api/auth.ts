import { redirect } from "next/navigation";

export async function login(email: string, password: string) {
    const res = await fetch(`${process.env.EXTERNAL_URL}/login`, {
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
export async function logout() {
    const res = await fetch(`${process.env.EXTERNAL_URL}/logout`, {
        method: "POST",
        headers: {},

        cache: "no-store",
    });

    console.log("res ", res);
    if (!res.ok) throw new Error("No se pudo cerrar session");
    redirect("/auth/login");
}
