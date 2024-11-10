export interface Report {
    id: number;              // Unique identifier for the report
    result: string;          // Result of the report, up to 45 characters
    patient_id: number;     // Foreign key referencing the patient associated with this report
    appointment_id: number; // Foreign key referencing the appointment (nullable)
}
