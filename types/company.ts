
import { SocialMedia } from "./social-media.type";

export interface Company {
    id: number;
    companyName: string;
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