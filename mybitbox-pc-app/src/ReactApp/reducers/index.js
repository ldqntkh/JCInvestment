import { combineReducers } from 'redux'

import MyWalletReducer from './myWalletReducer';
import MainScreenReducer from './mainScreenReducer';

const rootReducer = combineReducers({
    MyWalletReducer,
    MainScreenReducer
});

export default rootReducer;