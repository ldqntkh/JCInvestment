import {
    ADD_LIST_PRODUCT
} from '../../actions/actionType';

export const ProductDataReducer = (productData = [], action) =>{
    let result = [],
        productItem = null,
        index = -1;
    switch(action.type) {
        case ADD_LIST_PRODUCT:
            return action.dataProduct;
        default:
            return productData;
    }
}