export interface IReport {
    id: number;
    result: string;
    patient_id?: number;
    appointment_id?: number;
    createdBy?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;

}
