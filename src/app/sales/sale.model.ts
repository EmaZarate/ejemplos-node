import { EntityFactory } from '../core/models/entity-factory.model';
import { SalePackings, SalePackingsFactory } from './salePackings.model';
import { SalePrice, SalePriceFactory } from './salePrice.model';

export class Sale {
    id: number;
    name: string;
    isDeleted: boolean;
    packings: SalePackings[];
    priceLists: SalePrice[];

    constructor(data: {
        id?: number;
        name: string;
        isDeleted: boolean;
        packings: SalePackings[]
        priceLists: SalePrice[]
    }) {
        this.id = data.id;
        this.name = data.name;
        this.isDeleted = data.isDeleted;
        this.packings = data.packings;
        this.priceLists = data.priceLists;
    }
}

export class SaleFactory implements EntityFactory {

    salePackingsFactory: SalePackingsFactory = new SalePackingsFactory();
    salePriceFactory: SalePriceFactory = new SalePriceFactory();
    mapToApi = (entity: Sale) => {
        const data = {
            saleID: entity.id,
            name: entity.name,
            isDeleted: entity.isDeleted,
            packings: this.salePackingsFactory.mapArrayToApi(entity.packings),
            priceLists: this.salePriceFactory.mapArrayToApi(entity.priceLists)
        };
        return data;
    }
    mapFromApi = (data: any): Sale => {
        const id = data.saleID;
        const packings = (data.packings as Array<any>).length > 0 ? this.salePackingsFactory.mapArrayFromApi(data.packings) : [];
        const priceLists = (data.priceLists as Array<any>).length > 0 ? this.salePriceFactory.mapArrayFromApi(data.priceLists) : [];
        return new Sale({ ...data, id, packings, priceLists});
    }

    mapArrayFromApi = (data: any[]): Sale[] => data.map(c => this.mapFromApi(c));

    mapArrayToApi = (salePackings: Sale[]): any[] => salePackings.map(p => this.mapToApi(p));
}
