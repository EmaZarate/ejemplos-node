import { EntityFactory } from '../core/models/entity-factory.model';

export class Customer {
    id: string;
    businessName: string;
    username: string;
    img: string;
    cellphone: string;
    email: string;
    password: string;
    clientcode: number;
    cuit: string;
    address: string;
    city: string;
    province: string;
    fiscalconditionid: number;
    pricelistid: number;
    shipmentday: number;
    isNotLocked: boolean;

    constructor(data: {
        id?: string;
        businessName?: string;
        username?: string;
        img?: string;
        cellphone?: string;
        email?: string;
        password?: string;
        clientcode?: number;
        cuit?: string;
        address?: string;
        city?: string;
        province?: string;
        fiscalconditionid?: number;
        pricelistid?: number;
        shipmentday?: number;
        isNotLocked?: boolean
    }) {
        this.id = data.id;
        this.businessName = data.businessName;
        this.username = data.username;
        this.img = data.img;
        this.cellphone = data.cellphone;
        this.email = data.email;
        this.password = data.password;
        this.clientcode = data.clientcode;
        this.cuit = data.cuit;
        this.address = data.address;
        this.city = data.city;
        this.province = data.province;
        this.fiscalconditionid = data.fiscalconditionid;
        this.pricelistid = data.pricelistid;
        this.shipmentday = data.shipmentday;
        this.isNotLocked = data.isNotLocked;
    }
}

export class CustomerFactory implements EntityFactory {

    mapToApi = (entity: Customer) => {
        const data = {
            id: entity.id,
            customerID: entity.id,
            bussinessName: entity.businessName,
            image: entity.img,
            username: entity.username,
            cellphone: entity.cellphone,
            email: entity.email,
            password: entity.password,
            address: entity.address,
            city: entity.city,
            province: entity.province,
            clientcode: entity.clientcode,
            cuit: entity.cuit,
            pricelistid: entity.pricelistid,
            shipmentday: entity.shipmentday,
            fiscalconditionid: entity.fiscalconditionid
        };

        return data;
    }
    mapFromApi = (data: any): Customer => {
        const id = data.id;
        const img = data.img;
        const businessName = data.bussinessName;
        return new Customer({ ...data, id, img, businessName });
    }

    mapArrayFromApi = (data: any[]): Customer[] => data.map(c => this.mapFromApi(c));
}
