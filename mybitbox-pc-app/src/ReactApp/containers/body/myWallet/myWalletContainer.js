import { connect } from 'react-redux'
import MyWalletComponent from '../../../components/body/myWallet/myWalletComponent';
import { ToggleScreen } from '../../../actions/index'

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    toggleScreen: screen => dispatch(ToggleScreen(screen))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyWalletComponent)