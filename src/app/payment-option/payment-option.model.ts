import { EntityFactory } from '../core/models/entity-factory.model';

export class PaymentOption {
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

export class PaymentOptionFactory implements EntityFactory {

    mapToApi = (entity: PaymentOption) => {
        const data = {
            paymentOptionID: entity.id,
            name: entity.name,
            percent: entity.percent
        };

        return data;
    }
    mapFromApi = (data: any): PaymentOption => {
        const id = data.paymentOptionID;
        return new PaymentOption({ ...data, id });
    }

    mapArrayFromApi = (data: any[]): PaymentOption[] => data.map(c => this.mapFromApi(c));
}
