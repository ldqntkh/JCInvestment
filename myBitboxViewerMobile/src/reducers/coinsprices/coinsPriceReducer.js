import {
    ADD_NEW_DATA_COINS_PRICE
} from '../../actions/actionType';

export const CoinsPriceDataReducer = (dataCoinsPrice = {}, action) => {
    switch(action.type) {
        case ADD_NEW_DATA_COINS_PRICE:
            return action.dataCoinsPrice;
            break;
        default: return dataCoinsPrice
    }
}