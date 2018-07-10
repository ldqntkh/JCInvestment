import {
    ADD_ITEM_WALLET_TO_LIST,
    ADD_LIST_WALLET,
    DELETE_ITEM_WALLET_FROM_LIST,
    UPDATE_ITEM_WALLET_TO_LIST
} from '../../actions/actionType';

export const WalletDataReducer = (walletData = [], action) =>{
    let result = null,
        walletItem = null,
        index = -1;
    switch(action.type) {
        case ADD_LIST_WALLET: 
            return action.dataWallet;
        case ADD_ITEM_WALLET_TO_LIST:
            result = [...walletData];
            result.push(action.dataWalletItem);
            return result;
        case UPDATE_ITEM_WALLET_TO_LIST :
            result = [...walletData]; 
            walletItem = action.dataWalletItem;
            index = result.findIndex(item => item.id = walletItem.id);
            result[index] = walletItem;
            return result;
        case DELETE_ITEM_WALLET_FROM_LIST :
            walletItem = action.dataWalletItem;
            result = [...walletData]; 
            index = result.findIndex(item => item.id = walletItem.id);
            result.splice(index, 1);
            return result;
        default:
            return walletData
    }
}