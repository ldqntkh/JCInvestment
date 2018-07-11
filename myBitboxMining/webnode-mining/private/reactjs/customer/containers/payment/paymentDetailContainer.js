import { connect } from 'react-redux'
import PaymentDetailComponent from '../../components/payment/PaymentDetailComponent';
import {
    AddPaymentDetail
} from '../../actions/order/orderAction';

const mapStateToProps = state => ({
    dataOrder : state.OrderDataReducer
});

const mapDispatchToProps = dispatch => ({
    addPaymentDetail : itemPaymentDetail => dispatch(AddPaymentDetail(itemPaymentDetail))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentDetailComponent)