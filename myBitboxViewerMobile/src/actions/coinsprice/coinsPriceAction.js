import {
    ADD_NEW_DATA_COINS_PRICE
} from '../../actions/actionType';

export const UpdateCoinsPricesData = dataCoinsPrice => ({
    type: ADD_NEW_DATA_COINS_PRICE,
    dataCoinsPrice: dataCoinsPrice
})