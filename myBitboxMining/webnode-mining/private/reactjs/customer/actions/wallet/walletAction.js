import {
    ADD_LIST_WALLET,
    ADD_ITEM_WALLET_TO_LIST,
    UPDATE_ITEM_WALLET_TO_LIST,
    DELETE_ITEM_WALLET_FROM_LIST
} from '../actionType';

export const AddListWallet = dataWallet => ({
    type : ADD_LIST_WALLET,
    dataWallet : dataWallet
});

export const AddItemWallet = item => ({
    type : ADD_ITEM_WALLET_TO_LIST,
    dataWalletItem : item
});

export const UpdateWalletItem = item => ({
    type : UPDATE_ITEM_WALLET_TO_LIST,
    dataWalletItem : item
});

export const DeleteWalletItem = item => ({
    type : DELETE_ITEM_WALLET_FROM_LIST,
    dataWalletItem : item
});