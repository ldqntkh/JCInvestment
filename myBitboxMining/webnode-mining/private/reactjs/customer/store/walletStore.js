import {createStore, combineReducers} from 'redux';
import { WalletDataReducer } from '../reducers/wallet/walletReducer';

const walletReducer = combineReducers({
    WalletDataReducer
});
const walletStore = createStore(walletReducer);
export default walletStore;