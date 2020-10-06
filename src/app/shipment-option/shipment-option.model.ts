import { EntityFactory } from '../core/models/entity-factory.model';

export class ShipmentOption {
    id: number;
    name: string;
    percent: number;

    constructor(data: {
        id?: number;
        name: string;
        percent: number;
    }) {
        this.id = data.id ? data.id : 0;
        this.name = data.name;
        this.percent = data.percent ? data.percent : 100;
    }
}

export class ShipmentOptionFactory implements EntityFactory {

    mapToApi = (entity: ShipmentOption) => {
        const data = {
            shipmentOptionID: entity.id,
            name: entity.name,
            percent: entity.percent
        };

        return data;
    }
    mapFromApi = (data: any): ShipmentOption => {
        const id = data.shipmentOptionID;
        return new ShipmentOption({ ...data, id });
    }

    mapArrayFromApi = (data: any[]): ShipmentOption[] => data.map(c => this.mapFromApi(c));
}
