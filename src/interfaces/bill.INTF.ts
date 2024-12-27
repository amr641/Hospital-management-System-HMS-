export interface IBill {
    id: number;            
    amount: string;         
    patient_id: number;
    createdBy:number|null;  
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}
