export interface IAppointment {
    id: number
    department: string;
    date: Date;
    Doctor_id: number;
    patient_id: number;
    staff_id:number;
    room_id: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null
}