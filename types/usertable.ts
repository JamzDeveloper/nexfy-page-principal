export type UserTableType = {
    id?: string;
    firstName: string;
    lastName?: string;
    email: string;
    role: "admin" | "company" | "agent";
    createdAt?: string;
    avatar?: string;
    password?: string;
    updatedAt?: string;

};