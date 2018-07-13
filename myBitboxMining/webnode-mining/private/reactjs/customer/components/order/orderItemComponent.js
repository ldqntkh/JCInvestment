import React, {Component} from 'react';
import { confirmAlert } from 'react-confirm-alert'; 
import { Link } from "react-router-dom";

// import module
const moment = require('moment');

// import variable
import { API_URL } from '../../const/variable';

// import const
const showMessage = require('../../../../../global/ResourceHelper').showMessage;

export default class OrderItemComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            err: ''
        }

        this._openConfirmationPopup = this._openConfirmationPopup.bind(this);
        this._handleRemoveOrder = this._handleRemoveOrder.bind(this);
    }

    async _handleRemoveOrder(orderItem, callback) {
        try {
            let result = await fetch(API_URL + 'orders/' + orderItem.id + '/delete',{
                                        method: 'GET',
                                        credentials: 'same-origin'
                                    });
            let responsejson = await result.json();
            if (responsejson.status === 'success') {
                this.props.deleteOrderFromList(orderItem);
            } else {
                this.setState({
                    err : responsejson.errMessage
                });
            }
            callback();
        } catch (err) {
            this.setState({
                err : err.message
            });
            callback();
        }
    }

    _openConfirmationPopup () {
        try {
            let orderItem = this.props.dataOrder;
            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <div className='custom-ui'>
                            <h1>{showMessage('AL_TITLE_CONFIRM')}</h1>
                            <p>  {showMessage('AL_TITLE_DESC', ['product name: ' + orderItem.productname])} </p>
                            <div className="form-group">
                                <button onClick={()=> { onClose();}} type="button" name="recover-submit" className="btn btn-lg btn-primary" value={showMessage('AL_BTN_NO')}>{showMessage('AL_BTN_NO')}</button>
                                <button onClick={() => {
                                        this._handleRemoveOrder(orderItem, onClose);
                                    }} type="button" name="recover-cancel" className="btn btn-lg btn-primary btn-success" value={showMessage('AL_BTN_YES')}>{showMessage('AL_BTN_YES')}</button>
                            </div>
                        </div>
                    )
                }
            });
        } catch(err) {
            console.log(err.message);
        }
    }

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
                        <Link to={"/my-order/" + order.id + "/payment-detail"}>
                            <i className="material-icons">search</i>
                        </Link>
                    }
                    {orderState !== 'approved' &&
                        <button type="button" className="btn btn-danger btn-link btn-sm" onClick={this._openConfirmationPopup}>
                            <i className="material-icons">close</i>
                        </button>
                    }
                    </td>
                }
                {this.state.err !== '' && <td className="text-danger">{this.state.err}</td>}
            </tr>
        );
    }
}