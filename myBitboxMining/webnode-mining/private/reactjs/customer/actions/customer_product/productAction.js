import {
    ADD_LIST_PRODUCT,
    UPDATE_LIST_PRODUCT,
    DELETE_PRODUCT_FROM_LIST
} from '../actionType';

export const AddListProduct = dataProduct => ({
    type : ADD_LIST_PRODUCT,
    dataProduct : dataProduct
});

export const UpdateListProduct = dataProduct => ({
    type : UPDATE_LIST_PRODUCT,
    dataProduct : dataProduct
});

export const DeleteProductFromList = dataProduct => ({
    type : DELETE_PRODUCT_FROM_LIST,
    productItem : dataProduct
});
