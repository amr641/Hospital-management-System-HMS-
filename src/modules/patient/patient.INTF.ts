interface IPatient {
    id: number
    name: string;
    email: string;
    phone_Number: string;
    gender: string;
    DOB: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}