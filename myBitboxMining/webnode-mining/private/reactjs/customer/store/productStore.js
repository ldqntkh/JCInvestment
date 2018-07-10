import {createStore, combineReducers} from 'redux';
import { ProductDataReducer } from '../reducers/customer_product/productReducer';

const productReducer = combineReducers({
    ProductDataReducer
});
const productStore = createStore(productReducer);
export default productStore;