import { EntityFactory } from '../core/models/entity-factory.model';
import { OrderStateFactory } from '../order-state/order-state.model';

export class Order {
    id: number;
    shipmentOptionID: number;
    total?: number;
    state?: string;
    mercadopagopaymentid?: string;
    businessName?: string;


    constructor(data: {
        id?: number;
        shipmentOptionID?: number;
        total?: number;
        state?: string;
        mercadopagopaymentid?: string;
        businessName?: string;

    }) {
        this.id = data.id ? data.id : 0;
        this.shipmentOptionID = data.shipmentOptionID ? data.shipmentOptionID : 0;
        this.total = data.total ? data.total : 0;
        this.state = data.state;
        this.mercadopagopaymentid = data.mercadopagopaymentid;
        this.businessName = data.businessName;
    }
}

export class OrderFactory implements EntityFactory {

    orderState: OrderStateFactory = new OrderStateFactory();

    mapToApi = (entity: Order) => {
        const data = {
            orderID: entity.id,
            total: entity.total
        };

        return data;
    }
    mapFromApi = (data: any): Order => {
        const id = data.orderID;
        const orderState = this.orderState.mapFromApi(data.orderState_Navigation);
        const state = orderState.name;
        const mercadopagopaymentid = data.mercadoPagoPaymentID;
        const businessName = data.branch_Navigation == null ?
            '' : data.branch_Navigation.customer_Navigation.bussinessName;
        const total = '$' + data.total.toFixed(2);
        return new Order({ ...data, id, state, mercadopagopaymentid, businessName, total });
    }

    mapFromApiById = (data: any) => {
        const orderID = data.orderID;
        const businessName = data.branch_Navigation == null  || data.branch_Navigation.customer_Navigation == null ?
                                '' : data.branch_Navigation.customer_Navigation.bussinessName;
        const branchAddress = data.branch_Navigation == null ? '' : data.branch_Navigation.address;
        const shipmentOption = data.shipmentOption_Navigation == null ? '' : data.shipmentOption_Navigation.name;
        const paidType = data.paymentOption_Navigation == null ? '' : data.paymentOption_Navigation.name;
        const items = data.itemOrders.map(item => {
            return this.prepareValues(item);

        });


        return ({ orderID , businessName, branchAddress, shipmentOption, paidType , items });
    }

    mapArrayFromApi = (data: any[]): Order[] => data.map(c => this.mapFromApi(c));

    mapArrayToApi = (orders: Order[]): any[] => orders.map(c => this.mapToApi(c));

    prepareValues(item) {
        const dollar = '$';
        const packingseparation = '---';
        if (item.packing_Navigation != null) {
            return{
                productName: item.packing_Navigation.product_Navigation.name,
                packing: item.packing_Navigation.name,
                price: dollar + item.packing_Navigation.price.toFixed(2),
                quantity: item.quantity
            };
        } else if (item.sale_Navigation != null) {
            return{
                productName: item.sale_Navigation.name == null ? '' : item.sale_Navigation.name ,
                packing: packingseparation,
                price: dollar + item.price.toFixed(2),
                quantity: item.sale_Navigation.packings[0].quantity
            };
        } else {
            return{
                productName: packingseparation,
                packing: packingseparation,
                price: dollar + item.price.toFixed(2),
                quantity: 0
            };
        }
    }
}
