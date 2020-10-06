import { EntityFactory } from '../core/models/entity-factory.model';
import { Product, ProductFactory } from '../product/product.model';
// import { Packing, PackingFactory } from '../product/packing.model';


export class SalePackings {
    productID: number;
    packingID: number;
    saleID: number;
    quantity: number;
    // packing: Packing

    constructor(data: {
        productID: number;
        packingID: number;
        saleID: number;
        quantity: number;
        // packing: Packing;
    }) {
        this.productID = data.productID;
        this.packingID = data.packingID;
        this.quantity = data.quantity;
        this.saleID = data.saleID;
        // this.packing = data.packing
    }
}

export class SalePackingsFactory implements EntityFactory {
    // packingFactory: PackingFactory = new PackingFactory()

    mapToApi = (entity: SalePackings) => {
        const data = {
            saleID: entity.saleID,
            productID: entity.productID,
            packingID: entity.packingID,
            quantity : entity.quantity,
            // packing: this.packingFactory.mapToApi(entity.packing)
        };

        return data;
    }
    mapFromApi = (data: any): SalePackings => {
        const saleID = data.saleID;
        const productID = data.productID;
        const packingID = data.packingID;
        const quantity = data.quantity;
        return new SalePackings({ ...data, saleID});
    }

    mapArrayFromApi = (data: any[]): SalePackings[] => data.map(c => this.mapFromApi(c));

    mapArrayToApi = (salePackings: SalePackings[]): any[] => salePackings.map(p => this.mapToApi(p));
}
