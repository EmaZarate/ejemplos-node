import { EntityFactory } from '../core/models/entity-factory.model';
import { Category, CategoryFactory } from '../category/category.model';
import { Packing, PackingFactory } from './packing.model';

export class Product {
    id: number;
    name: string;
    img: string;
    sku: string;
    category: Category;
    packings: Packing[];

    constructor(data: {
        id?: number;
        name: string;
        img?: string;
        sku?: string;
        category: Category,
        packings: Packing[]
    }) {
        this.id = data.id ? data.id : 0;
        this.name = data.name;
        this.img = data.img;
        this.sku = data.sku;
        this.category = data.category;
        this.packings = data.packings;
    }
}

export class ProductFactory implements EntityFactory {
    categoryFactory: CategoryFactory = new CategoryFactory();
    packingFactory: PackingFactory = new PackingFactory();

    mapToApi = (entity: Product) => {
        const data = {
            productID: entity.id,
            name: entity.name,
            image: entity.img,
            sKU: entity.sku,
            category_Navigation: this.categoryFactory.mapToApi(entity.category),
            packings: this.packingFactory.mapArrayToApi(entity.packings)
        };

        return data;
    }
    mapFromApi = (data: any): Product => {
        const id = data.productID;
        const category = this.categoryFactory.mapFromApi(data.category_Navigation);
        const packings = (data.packings as Array<any>).length > 0 ? this.packingFactory.mapArrayFromApi(data.packings) : [];
        const img = data.image;

        return new Product({ ...data, id, category, packings, img });
    }

    mapArrayFromApi = (data: any[]): Product[] => data.map(c => this.mapFromApi(c));
}
