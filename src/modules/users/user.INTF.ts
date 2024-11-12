import { Roles } from "./Roles.ENUMS";

export interface IUser {
    id?: number
    name: string,
    email: string,
    password: string,
    SSN: number,
    department?: string,
    role: Roles;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}