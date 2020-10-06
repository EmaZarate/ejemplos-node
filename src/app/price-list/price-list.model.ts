import { EntityFactory } from '../core/models/entity-factory.model';

export class PriceList {
    id: number;
    code: string;
    price?: number;
    minimumLimit?: number;

    constructor(data: {
        id?: number;
        code: string;
        price?: number;
        minimumLimit?: number;
    }) {
        this.id = data.id ? data.id : 0;
        this.code = data.code;
        this.price = data.price ? data.price : 0;
        this.minimumLimit = data.minimumLimit ? data.minimumLimit : 0;
    }
}

export class PriceListFactory implements EntityFactory {

    mapToApi = (entity: PriceList) => {
        const data = {
            priceListID: entity.id,
            code: entity.code,
            price: entity.price,
            minimumLimit: entity.minimumLimit
        };

        return data;
    }
    mapFromApi = (data: any): PriceList => {
        const id = data.priceListID;
        return new PriceList({ ...data, id });
    }

    mapArrayFromApi = (data: any[]): PriceList[] => data.map(c => this.mapFromApi(c));

    mapArrayToApi = (priceLists: PriceList[]): any[] => priceLists.map(c => this.mapToApi(c));
}
