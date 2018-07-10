import {
    ADD_LIST_PRODUCT,
    UPDATE_LIST_PRODUCT
} from '../actionType';

export const AddListProduct = dataProduct => ({
    type : ADD_LIST_PRODUCT,
    dataProduct : dataProduct
});

export const UpdateListProduct = dataProduct => ({
    type : UPDATE_LIST_PRODUCT,
    dataProduct : dataProduct
});
