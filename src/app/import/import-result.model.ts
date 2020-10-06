export interface ImportResult {
   categoriesAdded: number;
   productsAdded: number;
   packingsAdded: number;
   packingsUpdated: number;
   clientsAdded: number;
   errors: ImportError[];
}

export interface ImportError {
    rowNum: number;
    errorName: string;
}
