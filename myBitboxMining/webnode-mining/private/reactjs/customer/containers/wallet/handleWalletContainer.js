import { connect } from 'react-redux'
import HandleWalletComponent from '../../components/wallet/handleWalletComponent';
import {
    AddListWallet, AddItemWallet, UpdateWalletItem, DeleteWalletItem
} from '../../actions/wallet/walletAction';

const mapStateToProps = state => ({
    dataWallet : state.WalletDataReducer
});

const mapDispatchToProps = dispatch => ({
    addItemWallet : itemWallet => dispatch(AddItemWallet(itemWallet)),
    updateWalletItem : itemWallet => dispatch(UpdateWalletItem(itemWallet))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HandleWalletComponent)