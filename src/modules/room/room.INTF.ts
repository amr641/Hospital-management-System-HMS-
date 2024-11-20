export interface IRoom {
    [x: string]: any;
    id: number;
    availability: number;
    capacity: number;
    department: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}
