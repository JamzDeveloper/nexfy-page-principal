export type UserRole = "agent" | "company";

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    avatar?: string;
    createdAt: string;
    company?: {
        id: string;
        name: string;
    };
    profile?: {
        bio?: string;
        title?: string;
        location?: string;
        expertise?: string;
        phone?: string;
        website?: string;
    };
}
//fijo
export type AgentRegisterData = {
    user: {
        email: string
        password: string
        firstName: string
        lastName: string
    }
    agent: Record<string, never>
}
//fijo-por ver
export type CompanyRegisterData = {
    user: {
        email: string
        password: string
        firstName: string
        lastName: string
    }
    company: {
        companyName: string
        socialMedia: Record<string, never>
    }
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface UpdateProfileData {
    name?: string;
    email?: string;
    bio?: string;
    title?: string;
    location?: string;
    expertise?: string;
    phone?: string;
    website?: string;
    avatar?: string;
}
