import {
    ADD_LIST_PRODUCT,
    ADD_PRODUCT_ITEM
} from '../actionType';

export const AddListProduct = dataProduct => ({
    type : ADD_LIST_PRODUCT,
    dataProduct : dataProduct
});

export const AddProductItem = dataProduct => ({
    type : ADD_PRODUCT_ITEM,
    dataProduct : dataProduct
});
