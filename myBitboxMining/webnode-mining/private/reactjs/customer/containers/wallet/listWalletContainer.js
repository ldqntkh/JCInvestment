import { connect } from 'react-redux'
import ListWalletComponent from '../../components/wallet/listWalletComponent';
import {
    AddListWallet, AddItemWallet, UpdateWalletItem, DeleteWalletItem
} from '../../actions/wallet/walletAction';

const mapStateToProps = state => ({
    dataWallet : state.WalletDataReducer
});

const mapDispatchToProps = dispatch => ({
    addListWallet : dataWallet => dispatch(AddListWallet(dataWallet)),
    addItemWallet : itemWallet => dispatch(AddItemWallet(itemWallet)),
    updateWalletItem : itemWallet => dispatch(UpdateWalletItem(itemWallet)),
    deleteWalletItem : itemWallet => dispatch(DeleteWalletItem(itemWallet))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListWalletComponent)