import {
    ADD_ALL_ITEM_TO_LIST_WALLET,
    ADD_ITEM_TO_LIST_WALLET,
    DELETE_ITEM_WALLET
} from '../actionType'

export const UpdateWalletData = dataWallet => ({
    type: ADD_ALL_ITEM_TO_LIST_WALLET,
    dataWallet : dataWallet
})

export const AddNewItemWallet = dataWallet => ({
    type: ADD_ITEM_TO_LIST_WALLET,
    dataWallet
})

export const DeleteWalletItem = walletId => ({
    type: DELETE_ITEM_WALLET,
    walletId
})