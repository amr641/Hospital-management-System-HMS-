export interface IInventory {
    id: number
    item_name: string;       
    category: string;        
    quantity: number;       
    Supplier_SSN: number;    
    handled_by: number;      
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}
