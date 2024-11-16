export interface IRoom {
    [x: string]: any;
    id: number;
    availability: boolean;
    capacity: number;
    department: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}
