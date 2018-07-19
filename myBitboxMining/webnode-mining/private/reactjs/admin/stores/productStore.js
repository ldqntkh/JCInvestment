import {createStore, combineReducers} from 'redux';
import { ProductDataReducer } from '../reducers/product/productReducer';

const productReducer = combineReducers({
    ProductDataReducer
});
const productStore = createStore(productReducer);
export default productStore;