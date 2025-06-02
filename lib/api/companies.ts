
export async function fetchCompaniesFromAPI(token: string) {
    const res = await fetch(`${process.env.EXTERNAL_URL}/companies/with-token`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    // const data = await res.json();
    // console.log("Respuesta de /companies/with-token:", data);
    // if (!res.ok) throw new Error("No se pudo cargar usuarios");
    // return data;
    const data = await res.json();
    // Si data es un objeto único, conviértelo en array
    const companies = Array.isArray(data) ? data : data ? [data] : [];
    return companies;
}

// export async function fetchCompaniesFromAPI(token: string) {
//     try {
//         if (!token) {
//             throw new Error("Token no proporcionado");
//         }

//         console.log("Fetching companies with URL:", `${process.env.EXTERNAL_URL}/companies`);

//         const res = await fetch(`${process.env.EXTERNAL_URL}/companies`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//             cache: "no-store",
//         });

//         console.log("Response status:", res.status);

//         if (!res.ok) {
//             const errorData = await res.text();
//             console.error("Error response:", errorData);
//             throw new Error(`Error al cargar compañías: ${res.status} ${errorData}`);
//         }

//         const data = await res.json();
//         console.log("Companies loaded:", data.length);
//         return data;
//     } catch (error) {
//         console.error("Error en fetchCompaniesFromAPI:", error);
//         throw error;
//     }
// }
