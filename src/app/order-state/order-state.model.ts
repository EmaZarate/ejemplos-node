import { EntityFactory } from '../core/models/entity-factory.model';

export class OrderState {
    id: number;
    name: string;

    constructor(data: {
        id?: number;
        name: string;
    }) {
        this.id = data.id ? data.id : 0;
        this.name = data.name;
    }
}

export class OrderStateFactory implements EntityFactory {

    mapToApi = (entity: OrderState) => {
        const data = {
            orderStateID: entity.id,
            name: entity.name
        };

        return data;
    }
    mapFromApi = (data: any): OrderState => {
        const id = data.orderStateID;
        const name = data.name;
        return new OrderState({ ...data, id, name });
    }

    mapArrayFromApi = (data: any[]): OrderState[] => data.map(c => this.mapFromApi(c));
}
