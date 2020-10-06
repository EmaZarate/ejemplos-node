import { EntityFactory } from '../core/models/entity-factory.model';

export class Category {
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

export class CategoryFactory implements EntityFactory {

    mapToApi = (entity: Category) => {
        const data = {
            categoryID: entity.id,
            name: entity.name
        };

        return data;
    }
    mapFromApi = (data: any): Category => {
        const id = data.categoryID;
        return new Category({ ...data, id });
    }

    mapArrayFromApi = (data: any[]): Category[] => data.map(c => this.mapFromApi(c));
}
