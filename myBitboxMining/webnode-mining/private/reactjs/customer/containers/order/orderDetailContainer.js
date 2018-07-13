import { connect } from 'react-redux'
import OrderDetailComponent from '../../components/order/orderDetailComponent';
import {
    AddListOrder,
    DeleteOrderFromList
} from '../../actions/order/orderAction';

const mapStateToProps = state => ({
    dataOrder: state.OrderDataReducer
});

const mapDispatchToProps = dispatch => ({
    addListOrder: dataOrder => dispatch(AddListOrder(dataOrder)),
    deleteOrderFromList: orderItem => dispatch(DeleteOrderFromList(orderItem))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderDetailComponent)