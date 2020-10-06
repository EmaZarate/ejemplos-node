import { EntityFactory } from '../core/models/entity-factory.model';


export class SalePrice {
    saleID: number;
    priceListID: number;
    price: number;

    constructor(data: {
        saleID: number;
        priceListID: number;
        price: number;
    }) {
        this.saleID = data.saleID;
        this.priceListID = data.priceListID;
        this.price = data.price;
    }
}

export class SalePriceFactory implements EntityFactory {

    mapToApi = (entity: SalePrice) => {
        const data = {
            saleID: entity.saleID,
            priceListID: entity.priceListID,
            price: entity.price,
        };

        return data;
    }
    mapFromApi = (data: any): SalePrice => {

        return new SalePrice({ ...data});
    }

    mapArrayFromApi = (data: any[]): SalePrice[] => data.map(c => this.mapFromApi(c));

    mapArrayToApi = (salePackings: SalePrice[]): any[] => salePackings.map(p => this.mapToApi(p));
}
