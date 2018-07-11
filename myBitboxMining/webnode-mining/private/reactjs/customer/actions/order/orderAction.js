import {
    ADD_LIST_ORDER,
    ADD_PAYMENT_DETAIL
} from '../actionType';

export const AddListOrder = dataOrder => ({
    type : ADD_LIST_ORDER,
    dataOrder : dataOrder
});

export const AddPaymentDetail = itemPaymentDetail => ({
    type : ADD_PAYMENT_DETAIL,
    itemPaymentDetail : itemPaymentDetail
});
