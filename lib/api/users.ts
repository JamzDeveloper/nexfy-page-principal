// lib/api/users.ts
import { UserTableType } from "@/types/usertable";
import { AgentRegisterData, CompanyRegisterData } from "@/types/auth";


export async function fetchUsersFromAPI(token: string) {
    const res = await fetch(`${process.env.EXTERNAL_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!res.ok) throw new Error("No se pudo cargar usuarios");
    return res.json();
}

export async function createUser(data: UserTableType, token: string) {
    const res = await fetch(`${process.env.EXTERNAL_URL}/users`, {
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

export async function updateUser(
    userId: number,
    data: Partial<UserTableType>,
    token: string
) {
    const res = await fetch(`${process.env.EXTERNAL_URL}/users/${userId}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        cache: "no-store",
    });

    if (!res.ok) throw new Error("No se pudo actualizar el usuario");
    return res.json();
}
//agente-crear
export async function createAgent(data: AgentRegisterData, token: string) {
    const res = await fetch(`${process.env.EXTERNAL_URL}/agents`, {
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
//agente-actualizar
export async function updateAgent(
    userId: number,
    data: Partial<AgentRegisterData>,
    token: string
) {
    const res = await fetch(`${process.env.EXTERNAL_URL}/agents/${userId}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        cache: "no-store",
    });

    if (!res.ok) throw new Error("No se pudo actualizar el usuario");
    return res.json();
}
//company-crear
export async function createCompany(data: CompanyRegisterData, token: string) {   
    const res = await fetch(`${process.env.EXTERNAL_URL}/companies`, {
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
//company-actualizar
export async function updateCompany(
    userId: number,
    data: Partial<CompanyRegisterData>,
    token: string
) {
    const res = await fetch(`${process.env.EXTERNAL_URL}/companies/${userId}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        cache: "no-store",
    });

    if (!res.ok) throw new Error("No se pudo actualizar el usuario");
    return res.json();
}