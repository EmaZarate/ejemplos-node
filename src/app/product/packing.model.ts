import { EntityFactory } from '../core/models/entity-factory.model';
import { PriceList, PriceListFactory } from '../price-list/price-list.model';

export class Packing {
    id: number;
    name: string;
    quantity: number;
    priceLists: PriceList[];

    constructor(data: {
        id?: number;
        name: string;
        quantity: number;
        priceLists: PriceList[]
    }) {
        this.id = data.id ? data.id : 0;
        this.name = data.name;
        this.quantity = data.quantity;
        this.priceLists = data.priceLists;
    }
}

export class PackingFactory implements EntityFactory {
    priceListFactory: PriceListFactory = new PriceListFactory();

    mapToApi = (entity: Packing) => {
        const data = {
            packingID: entity.id,
            name: entity.name,
            quantity: entity.quantity,
            priceLists: this.priceListFactory.mapArrayToApi(entity.priceLists)
        };

        return data;
    }
    mapFromApi = (data: any): Packing => {
        const id = data.packingID;
        const priceLists = (data.priceLists as Array<any>).length > 0 ? this.priceListFactory.mapArrayFromApi(data.priceLists) : [];
        return new Packing({ ...data, id, priceLists });
    }

    mapArrayFromApi = (data: any[]): Packing[] => data.map(c => this.mapFromApi(c));

    mapArrayToApi = (packings: Packing[]): any[] => packings.map(p => this.mapToApi(p));
}
