// lib/api/users.ts
import { UserTableType } from "@/types/usertable";

export async function fetchUsersFromAPI(token: string) {
    const res = await fetch("http://localhost:3000/api/users", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!res.ok) throw new Error("No se pudo cargar usuarios");
    return res.json();
}

export async function createUser(data: UserTableType, token: string) {
    const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            //Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        cache: "no-store",
    });

    if (!res.ok) throw new Error("No se pudo cargar usuarios");
    return res.json();
}