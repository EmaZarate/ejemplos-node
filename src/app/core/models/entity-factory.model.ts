export interface EntityFactory {
    mapToApi(entity): any;
    mapFromApi(data: any);
    mapArrayFromApi(data: any[]): any[];
}
