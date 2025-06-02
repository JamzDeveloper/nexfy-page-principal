import { SocialMedia } from "./social-media.type";

export interface Company {
    id: number;
    userId: number;
    companyName: string;  // o name si ese es el campo que usa tu backend
    companyLogo?: string | null;
    description?: string;
    street?: string;
    number?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    industry?: string;
    targetIndustries?: string;
    activity?: string;
    companyType?: string;
    numberEmployees?: number;
    socialMedia?: SocialMedia;
}