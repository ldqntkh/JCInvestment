import {
    ADD_LIST_PRODUCT,
    UPDATE_LIST_PRODUCT
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
            index = productData.findIndex(item => item.id === productItem.id);
            result[index] = productItem;
            return result;
        default:
            return productData;
    }
}