import React, {Component} from 'react';
import { Link } from "react-router-dom";

// import module
const moment = require('moment');

export default class OrderItemComponent extends Component {
    

    render() {
        let order = this.props.dataOrder;
        let orderState = order.state.toLowerCase();
        return(
            <tr>
                <td>{order.id}</td>
                <td>{order.productname}</td>
                <td>{order.hashrate}</td>
                <td>{order.quantity}</td>
                <td>{order.description}</td>
                <td>{orderState}</td>
                <td>{order.amount} {order.currency}</td>
                <td>{order.product_period}</td>
                <td>{moment(order.createAt).format('DD/MM/YYYY')}</td>
                {orderState !== '' && <td className="td-action">
                    {orderState === 'approved' &&
                        <Link to={"/my-order/payment-detail/" + order.id}>
                            <i className="material-icons">search</i>
                        </Link>
                    }
                    {orderState !== 'approved' &&
                        <button type="button" className="btn btn-danger btn-link btn-sm">
                            <i className="material-icons">close</i>
                        </button>
                    }
                    </td>
                }
            </tr>
        );
    }
}