import {
    ADD_LIST_ORDER,
    ADD_PAYMENT_DETAIL
} from '../../actions/actionType';

export const OrderDataReducer = (orderData = [], action) =>{
    let result = [],
        index = -1;
    switch(action.type) {
        case ADD_LIST_ORDER:
            return action.dataOrder;
        case ADD_PAYMENT_DETAIL:
            result = [...orderData];
            index = result.findIndex(item => item.id === action.itemPaymentDetail.orderId);
            result[index].payment = action.itemPaymentDetail.paymentDetail;
            return result;
        default:
            return orderData;
    }
}