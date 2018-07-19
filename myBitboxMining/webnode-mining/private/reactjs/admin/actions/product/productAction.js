import {
    ADD_LIST_PRODUCT
} from '../actionType';

export const AddListProduct = dataProduct => ({
    type : ADD_LIST_PRODUCT,
    dataProduct : dataProduct
});
