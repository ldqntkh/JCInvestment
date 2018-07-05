import { connect } from 'react-redux'
import WalletItemComponent from '../../components/wallet/walletItemComponent';
import {
    DeleteWalletItem, UpdateWalletItem
} from '../../actions/wallet/walletAction';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    updateWalletItem : itemWallet => dispatch(UpdateWalletItem(itemWallet)),
    deleteWalletItem : itemWallet => dispatch(DeleteWalletItem(itemWallet))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WalletItemComponent)