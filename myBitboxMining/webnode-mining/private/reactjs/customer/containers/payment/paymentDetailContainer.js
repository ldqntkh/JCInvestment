import { connect } from 'react-redux'
import PaymentDetailComponent from '../../components/payment/PaymentDetailComponent';
import {
    AddPaymentDetail,
    AddListOrder
} from '../../actions/order/orderAction';

const mapStateToProps = state => ({
    dataOrder : state.OrderDataReducer
});

const mapDispatchToProps = dispatch => ({
    addPaymentDetail : itemPaymentDetail => dispatch(AddPaymentDetail(itemPaymentDetail)),
    addListOrder : dataOrder => dispatch(AddListOrder(dataOrder))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentDetailComponent)