import { connect } from 'react-redux'
import CreateWalletComponent from '../../components/wallet/createWalletComponent';
import {
    AddItemWallet
} from '../../actions/wallet/walletAction';

const mapStateToProps = state => ({
    dataWallet : state.WalletDataReducer
});

const mapDispatchToProps = dispatch => ({
    addItemWallet : itemWallet => dispatch(AddItemWallet(itemWallet))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateWalletComponent)