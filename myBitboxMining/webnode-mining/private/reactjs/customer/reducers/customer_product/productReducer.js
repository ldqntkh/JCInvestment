import {
    ADD_LIST_PRODUCT,
    UPDATE_LIST_PRODUCT,
    DELETE_PRODUCT_FROM_LIST
} from '../../actions/actionType';

export const ProductDataReducer = (productData = [], action) =>{
    let result = [],
        productItem = null,
        index = -1;
    switch(action.type) {
        case ADD_LIST_PRODUCT:
            return action.dataProduct;
        case UPDATE_LIST_PRODUCT:
            result = [...productData];
            productItem = action.dataProduct;
            index = result.findIndex(item => item.id === productItem.id);
            result[index] = productItem;
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