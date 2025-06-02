import { Company } from "./company";

export interface QaItem {
    question: string;
    answer: string;
}

export enum EnumTypeOpportunityAsset {
    IMAGE = "image",
    VIDEO = "video",
    DOCUMENT = "document",
}

export interface OpportunityAsset {
    id: string;
    type: EnumTypeOpportunityAsset;
    s3Key: string | null;
    url: string;
    originalFilename: string | null;
    description: string | null;
    createdAt: string;
}

export interface OpportunityFull {
    id?: number;
    companyId: number;
    company?: {
        id: number;
        companyName: string;
    };
    title: string;
    targetIndustry?: string;
    languages?: string[];
    currency?: string;
    country?: string;
    city?: string;
    targetAudience?: string;
    contentDescription?: string;
    averageDealValue?: number;
    pricingStructureNotes?: string;
    commissionPercentage?: number;
    deliverLeads?: boolean;
    salesCycleEstimation?: string;
    qa?: QaItem[];
    videoLinks?: string[];
    assets?: OpportunityAsset[];
    applicationsCount?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateOpportunityFormInput extends Omit<OpportunityFull, 'id' | 'company' | 'assets' | 'createdAt' | 'updatedAt' | 'applicationsCount'> {
    documents?: File[];
    images?: File[];
}

export interface OpportunityTableItem {
    id: number;
    title: string;
    companyName: string;
    targetIndustry: string;
    commissionPercentage: number;
    applicationsCount: number;
    createdAt: string;
}

export interface OpportunityFilters {
    search?: string;
    industry?: string;
    status?: string;
    dateRange?: {
        from: Date;
        to: Date;
    };
}

// export interface OpportunityAsset {
//   id: string;
//   type: "image" | "video" | "document";
//   s3Key: string | null;
//   url: string;
//   originalFilename: string | null;
//   description: string | null;
//   createdAt: string;
// }

// export interface OpportunityFull {
//     id?: number;
//     company?: Company;
//     companyId?: number;
//     title: string;
//     targetIndustry?: string;
//     languages?: string[];
//     currency?: string;
//     country?: string;
//     city?: string;
//     targetAudience?: string;
//     contentDescription?: string;
//     averageDealValue?: number;
//     pricingStructureNotes?: string;
//     commissionPercentage?: number;
//     deliverLeads?: boolean;
//     salesCycleEstimation?: string;
//     qa?: QaItem[];
//     videoLinks?: string[];
//     status?: string;
//     createdAt?: string;
//     updatedAt?: string;
//     assets?: OpportunityAsset[];
//     applicationsCount?: number;
// }

// export interface CreateOpportunityFormInput extends OpportunityFull {
//     documents?: any[] | undefined;
//     images?: any[] | undefined;
// }
// export interface CreateOpportunityFormInput {
//   companyId: string;
//   title: string;
//   targetIndustry?: string;
//   languages?: string[];
//   currency?: string;
//   country?: string;
//   city?: string;
//   targetAudience?: string;
//   contentDescription?: string;
//   averageDealValue?: number;
//   pricingStructureNotes?: string;
//   commissionPercentage?: number;
//   deliverLeads?: boolean;
//   salesCycleEstimation?: string;
//   qa?: QaItem[];
//   videoLinks?: string[];
// }

// ...existing code...
