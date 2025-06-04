import {
    CreateOpportunityFormInput,
    OpportunityFull,
} from "@/types/opportunity";
import { patchFetch } from "next/dist/server/app-render/entry-base";

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

export async function updateOpportunityApi(
    id: number,
    data: Partial<CreateOpportunityFormInput>,
    token: string
) {
    try {
        const formData = new FormData();

        // Datos básicos
        formData.append("companyId", String(data.companyId));
        formData.append("title", data.title!);

        // Strings opcionales
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

        // Números
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

        const response = await fetch(`/api/opportunities/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Error actuali opportunity");
        }

        return await response.json();
    } catch (error) {
        console.error("Error in updateOpportunityApi:", error);
        throw error;
    }
}
