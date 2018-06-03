import { connect } from 'react-redux'
import MainWalletComponent from '../../../components/main/wallet/mainWalletComponent';
import { UpdateWalletData, DeleteWalletItem, AddNewItemWallet } from '../../../actions/wallet/walletAction'

const mapStateToProps = state => ({
    dataWallet : state.WalletDataReducer,
    dataCoinsPrice: state.CoinsPriceDataReducer
});

const mapDispatchToProps = dispatch => ({
    updateWalletData : dataWallet => dispatch(UpdateWalletData(dataWallet)),
    addNewItemWallet : dataWallet => dispatch(AddNewItemWallet(dataWallet)),
    deleteWalletItem: walletId => dispatch(DeleteWalletItem(walletId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainWalletComponent)