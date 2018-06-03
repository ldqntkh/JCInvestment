import {
    ADD_ITEM_TO_LIST_WALLET,
    ADD_ALL_ITEM_TO_LIST_WALLET,
    DELETE_ITEM_WALLET
} from '../../actions/actionType';

export const WalletDataReducer = (walletData=[] ,action) => {
    switch(action.type) {
        case ADD_ALL_ITEM_TO_LIST_WALLET: 
            return action.dataWallet;
        case ADD_ITEM_TO_LIST_WALLET: 
            return action.dataWallet;
        case DELETE_ITEM_WALLET:
            let result = [...walletData];
            let index = result.findIndex(item => item.walletId == action.walletId);
            if (index >= 0) {
                result = result.splice(index, 1);
            }
            return result;
        default:
            return walletData
    }
}