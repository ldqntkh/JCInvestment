import React, {Component} from 'react';
const moment = require('moment');

export default class OrderItemComponent extends Component {
    

    render() {
        let order = this.props.dataOrder;
        return(
            <tr>
                <td>{order.id}</td>
                <td>{order.productname}</td>
                <td>{order.hashrate}</td>
                <td>{order.quantity}</td>
                <td>{order.description}</td>
                <td>{order.state.toLowerCase()}</td>
                <td>{order.amount} {order.currency}</td>
                <td>{order.product_period}</td>
                <td>{moment(order.createAt).format('DD/MM/YYYY')}</td>
            </tr>
        );
    }
}