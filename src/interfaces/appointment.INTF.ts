import { Status } from "../enums/appointment.ENUM";

export interface IAppointment {
    [x: string]: any;
    id: number
    department: string;
    date: Date;
    doctor_id: number;
    patient_id?: number;
    staff_SSN: number;
    status: Status;
    room_id: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}