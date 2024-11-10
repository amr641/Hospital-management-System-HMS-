export interface Bill {
    id: number;             // Unique identifier for the bill
    amount: string;         // Amount for the bill as a string, up to 45 characters
    patient_id: number;    // Foreign key referencing the patient associated with this bill
}
