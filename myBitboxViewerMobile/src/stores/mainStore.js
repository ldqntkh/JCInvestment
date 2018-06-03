import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {WalletDataReducer} from '../reducers/wallet/walletReducer';
import {CoinsPriceDataReducer} from '../reducers/coinsprices/coinsPriceReducer'

const rootReducer = combineReducers({
    form: formReducer,
    WalletDataReducer,
    CoinsPriceDataReducer
});

const mainStore = createStore(rootReducer);
export default mainStore;