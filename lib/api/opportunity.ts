import {
    CreateOpportunityFormInput,
    OpportunityFull,
} from "@/types/opportunity";

export async function fetchOpportunityFormApi(token: string) {
    console.log("Fetching opportunities with token:", token);
    
    const res = await fetch(`${process.env.EXTERNAL_URL}/opportunities`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error("Error fetching opportunities:", errorText);
        throw new Error("No se pudo cargar las oportunidades");
    }

    const data = await res.json();
    console.log("Opportunities fetched:", data);
    return data;
}

export async function createOpportunityApi(
    data: Partial<CreateOpportunityFormInput>,
    token: string
) {
    try {
        const formData = new FormData();

        // Datos básicos
        formData.append("companyId", String(data.companyId));
        formData.append("title", data.title!);

        // Datos opcionales como strings
        const stringFields = [
            "targetIndustry",
            "currency",
            "country",
            "city",
            "targetAudience",
            "contentDescription",
            "pricingStructureNotes",
            "salesCycleEstimation"
        ];

        stringFields.forEach(field => {
            if (data[field as keyof typeof data]) {
                formData.append(field, String(data[field as keyof typeof data]));
            }
        });

        // Datos numéricos
        const numberFields = ["averageDealValue", "commissionPercentage"];
        numberFields.forEach(field => {
            if (data[field as keyof typeof data] !== undefined) {
                formData.append(field, String(data[field as keyof typeof data]));
            }
        });

        // Booleanos
        if (data.deliverLeads !== undefined) {
            formData.append("deliverLeads", String(data.deliverLeads));
        }

        // Arrays como JSON
        const arrayFields = ["languages", "qa", "videoLinks"];
        arrayFields.forEach(field => {
            const value = data[field as keyof typeof data];
            if (value && Array.isArray(value) && value.length > 0) {
                formData.append(field, JSON.stringify(value));
            }
        });

        // Archivos
        if (data.documents?.length) {
            data.documents.forEach(doc => formData.append("documents", doc));
        }

        if (data.images?.length) {
            data.images.forEach(img => formData.append("images", img));
        }

        const response = await fetch("/api/opportunities", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Error creating opportunity");
        }

        return await response.json();
    } catch (error) {
        console.error("Error in createOpportunityApi:", error);
        throw error;
    }
}

// export async function createOpportunityApi(
//     data: Partial<CreateOpportunityFormInput>,
//     token: string
// ) {
//     //   console.log("createOpportunityApi data", data);
//     //   const formData = new FormData();
//     //   for (const key in data) {
//     //     const value = data[key as keyof OpportunityFull];

//     //     if (value instanceof File) {
//     //       formData.append(key, value);
//     //     } else if (typeof value !== "undefined" && value !== null) {
//     //       formData.append(key, String(value));
//     //     }
//     //   }
//     const formData = new FormData();

//     formData.append("company_id", String(data.companyId));
//     formData.append("title", data.title!);

//     if (data.targetIndustry)
//         formData.append("targetIndustry", data.targetIndustry);
//     if (data.currency) formData.append("currency", data.currency);
//     if (data.country) formData.append("country", data.country);
//     if (data.city) formData.append("city", data.city);
//     if (data.targetAudience)
//         formData.append("targetAudience", data.targetAudience);
//     if (data.averageDealValue !== undefined)
//         formData.append("averageDealValue", String(data.averageDealValue));
//     if (data.commissionPercentage !== undefined)
//         formData.append("commissionPercentage", String(data.commissionPercentage));
//     if (data.deliverLeads !== undefined)
//         formData.append("deliverLeads", String(data.deliverLeads));
//     if (data.salesCycleEstimation)
//         formData.append("salesCycleEstimation", data.salesCycleEstimation);
//     if (data.contentDescription)
//         formData.append("contentDescription", data.contentDescription);
//     if (data.pricingStructureNotes)
//         formData.append("pricingStructureNotes", data.pricingStructureNotes);

//     // Arrays (como stringificado JSON)
//     if (data.languages?.length) {
//         formData.append("languages", JSON.stringify(data.languages));
//     }

//     if (data.qa?.length) {
//         formData.append("qa", JSON.stringify(data.qa));
//     }

//     if (data.videoLinks?.length) {
//         formData.append("videoLinks", JSON.stringify(data.videoLinks));
//     }

//     // Archivos
//     if (data.documents?.length) {
//         data.documents.forEach((doc) => formData.append("documents", doc));
//     }

//     if (data.images?.length) {
//         data.images.forEach((img) => formData.append("images", img));
//     }

//     //   for (const [key, value] of formData.entries()) {
//     //     console.log(`${key}:`, value);
//     //   }
//     try {
//         const response = await fetch(`${process.env.API_URL}/opportunities`, {
//             method: "POST",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//             body: formData,
//         });

//         if (!response.ok) {
//             const error = await response.json();
//             throw new Error(error.message || "Error creating opportunity");
//         }

//         return await response.json();
//     } catch (error) {
//         console.error("Error in createOpportunityApi:", error);
//         throw error;
//     }
// }