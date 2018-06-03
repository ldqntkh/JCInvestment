import { connect } from 'react-redux';
import CoinsPriceComponent from '../../../components/main/coinsprice/coinsPriceComponent';
import { UpdateCoinsPricesData } from '../../../actions/coinsprice/coinsPriceAction';

const mapStateToProps = state => ({
    dataCoinsPrice: state.CoinsPriceDataReducer
})

const mapDispatchToProps = dispatch => ({
    updateCoinsPricesData : dataCoinsPrice => dispatch(UpdateCoinsPricesData(dataCoinsPrice))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CoinsPriceComponent)