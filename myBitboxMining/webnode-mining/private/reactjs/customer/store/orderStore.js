import {createStore, combineReducers} from 'redux';
import { OrderDataReducer } from '../reducers/order/orderReducer';

const orderReducer = combineReducers({
    OrderDataReducer
});
const orderStore = createStore(orderReducer);
export default orderStore;