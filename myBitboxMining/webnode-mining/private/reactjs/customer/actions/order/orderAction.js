import {
    ADD_LIST_ORDER,
    ADD_PAYMENT_DETAIL,
    DELETE_ITEM_ORDER_FROM_LIST
} from '../actionType';

export const AddListOrder = dataOrder => ({
    type : ADD_LIST_ORDER,
    dataOrder : dataOrder
});

export const DeleteOrderFromList = orderItem => ({
    type: DELETE_ITEM_ORDER_FROM_LIST,
    orderItem: orderItem
});

export const AddPaymentDetail = itemPaymentDetail => ({
    type : ADD_PAYMENT_DETAIL,
    itemPaymentDetail : itemPaymentDetail
});
