import { connect } from 'react-redux'
import OrderItemComponent from '../../components/order/orderItemComponent';
import {
    DeleteOrderFromList
} from '../../actions/order/orderAction';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    addListOrder : dataOrder => dispatch(AddListOrder(dataOrder)),
    deleteOrderFromList: orderItem => dispatch(DeleteOrderFromList(orderItem))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderItemComponent)