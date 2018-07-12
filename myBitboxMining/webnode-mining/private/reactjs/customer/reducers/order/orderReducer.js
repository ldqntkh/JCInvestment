import {
    ADD_LIST_ORDER,
    ADD_PAYMENT_DETAIL,
    DELETE_ITEM_ORDER_FROM_LIST
} from '../../actions/actionType';

export const OrderDataReducer = (orderData = [], action) =>{
    let result = [],
        index = -1,
        order = {};
    switch(action.type) {
        case ADD_LIST_ORDER:
            return action.dataOrder;
        case ADD_PAYMENT_DETAIL:
            result = [...orderData];
            index = result.findIndex(item => item.id === action.itemPaymentDetail.orderId);
            order = Object.assign(result[index], {payment: action.itemPaymentDetail.paymentDetail});
            result[index] = order;
            return result;
        case DELETE_ITEM_ORDER_FROM_LIST:
            order = action.orderItem;
            result = [...orderData]; 
            index = result.findIndex(item => item.id = order.id);
            result.splice(index, 1);
            return result;
        default:
            return orderData;
    }
}