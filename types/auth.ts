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
