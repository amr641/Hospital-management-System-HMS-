export interface IBill {
    id: number;            
    amount: string;         
    patient_id: number;
    createdBy:number;  
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}
