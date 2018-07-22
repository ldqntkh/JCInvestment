import {
    ADD_LIST_PRODUCT,
    ADD_PRODUCT_ITEM,
    DELETE_PRODUCT_FROM_LIST
} from '../../actions/actionType';

export const ProductDataReducer = (productData = [], action) =>{
    let result = [],
        productItem = null,
        index = -1;
    switch(action.type) {
        case ADD_LIST_PRODUCT:
            return action.dataProduct;
        case ADD_PRODUCT_ITEM:
            result = [...productData];
            index = result.findIndex(item => item.id === action.dataProduct.id);
            result[index] = action.dataProduct;
            return result;
        case DELETE_PRODUCT_FROM_LIST:
            result = [...productData];
            productItem = action.productItem;
            index = result.findIndex(item => item.id === productItem.id);
            result.splice(index, 1);
            return result;
        default:
            return productData;
    }
}