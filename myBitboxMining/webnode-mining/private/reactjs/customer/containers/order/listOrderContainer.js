import { connect } from 'react-redux'
import ListOrderComponent from '../../components/order/listOrderComponent';
import {
    AddListOrder
} from '../../actions/order/orderAction';

const mapStateToProps = state => ({
    dataOrder : state.OrderDataReducer
});

const mapDispatchToProps = dispatch => ({
    addListOrder : dataOrder => dispatch(AddListOrder(dataOrder))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListOrderComponent)