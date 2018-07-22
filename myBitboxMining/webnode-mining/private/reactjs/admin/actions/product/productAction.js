import {
    ADD_LIST_PRODUCT,
    ADD_PRODUCT_ITEM,
    DELETE_PRODUCT_FROM_LIST
} from '../actionType';

export const AddListProduct = dataProduct => ({
    type : ADD_LIST_PRODUCT,
    dataProduct : dataProduct
});

export const AddProductItem = dataProduct => ({
    type : ADD_PRODUCT_ITEM,
    dataProduct : dataProduct
});

export const DeleteProductFromList = dataProduct => ({
    type : DELETE_PRODUCT_FROM_LIST,
    productItem : dataProduct
});
