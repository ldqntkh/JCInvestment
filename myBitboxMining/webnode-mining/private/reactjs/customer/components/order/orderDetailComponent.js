import React, {Component} from 'react';
import { confirmAlert } from 'react-confirm-alert'; 
import { Link } from "react-router-dom";

// import variable
import { API_URL } from '../../const/variable';

// import module
const moment = require('moment');

// import const
const showMessage = require('../../../../../global/ResourceHelper').showMessage;

export default class OrderDetailComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            orderDetail: ''
        }

        this._getOrderDetail = this._getOrderDetail.bind(this);
        this._getListOrder = this._getListOrder.bind(this);
        this._openConfirmationPopup = this._openConfirmationPopup.bind(this);
        this._handleRemoveOrder = this._handleRemoveOrder.bind(this);
    }

    componentDidMount() {
        this._getOrderDetail();
    }

    async _getListOrder () {
        let url = API_URL + 'orders/list';
        try {
            let response = await fetch(url, {
                method: 'GET',
                credentials: 'same-origin'
            });
            let jsonData = await response.json();
            if (jsonData.status === 'success') {
                this.props.addListOrder(jsonData.data);
            } else {
                console.log(jsonData.errMessage);
            }
        } catch (err) {
            console.log(err.errMessage);
        }
    }

    async _getOrderDetail() {
        try {
            if (this.props.dataOrder.length <= 0) {
                await this._getListOrder();
            }

            let orderId = this.props.match.params.orderId;
            let orders = this.props.dataOrder;
            let index = -1;
            index = orders.findIndex(item => item.id === parseInt(orderId));
            let order = orders[index];
            
            this.setState({
                loaded: true,
                orderDetail: typeof order !== 'undefined' ? order : ''
            });
        } catch(err) {
            console.log(err.message);
            this.setState({
                loaded: true
            });
        }
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
                this.props.history.push('/my-order');
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
            let orderItem = this.state.orderDetail;
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
        let screen = null;
        let orderDetail = this.state.orderDetail;
        if (!this.state.loaded) screen = <i className="fa fa-spinner fa-spin fa-icon-loading"></i>
        else {
            screen = <div className="payment-detail-container">
                        <div className="card-header card-header-warning">
                            <h4 className="card-title">{showMessage('TITLE_CUSTOMER_ORDER_DETAIL')}</h4>
                            <Link to="/my-order">
                                <button type="button" className="btn btn-primary btn-sm pull-right">{showMessage('RC_BACK')}</button>
                            </Link>
                            <p className="card-category"></p>
                        </div>
                        <div className="card-body table-responsive">
                            {orderDetail === '' ? <strong>{showMessage('LABEL_ORDER_NOTFOUND')}</strong> : <table className="table table-hover text-center">
                                <tbody>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_ID').toUpperCase()}</td>
                                        <td>{orderDetail.id}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_NAME').toUpperCase()}</td>
                                        <td>{orderDetail.productname}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_QUANTITY').toUpperCase()}</td>
                                        <td>{orderDetail.quantity}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_HASHRATE').toUpperCase()}</td>
                                        <td>{orderDetail.hashrate}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_DESCRIPTION').toUpperCase()}</td>
                                        <td>{orderDetail.description}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_STATE').toUpperCase()}</td>
                                        <td>{orderDetail.state}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_AMOUNT').toUpperCase()}</td>
                                        <td>{orderDetail.amount}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_CURRENCY').toUpperCase()}</td>
                                        <td>{orderDetail.currency}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_PERIOD')}</td>
                                        <td>{orderDetail.product_period}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_CREATE_DATE')}</td>
                                        <td>{moment(orderDetail.createAt).format('DD/MM/YYYY')}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('TITLE_CUSTOMER_PAYMENT_DETAIL')}</td>
                                        <td>
                                        {orderDetail.state === 'approved' &&
                                            <Link to={"/my-order/" + orderDetail.id + "/payment-detail"}>
                                                <i className="material-icons">search</i>
                                            </Link>
                                        }
                                        {orderDetail.state !== 'approved' &&
                                            <button type="button" className="btn btn-danger btn-link btn-sm" onClick={this._openConfirmationPopup}>
                                                <i className="material-icons">close</i>
                                            </button>
                                        }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            }
                        </div>
                        
                        <div className="card-footer">
                            <div className="stats">
                                <Link to="/my-order">
                                    <button type="button" className="btn btn-warning pull-left">Back</button>
                                </Link>
                            </div>
                        </div>
                    </div>
        }
        return(
            <div className="col-lg-10 col-md-10 offset-lg-1 offset-md-1 ">
                <div className="card" >
                    {screen}
                </div>
            </div>
        );
    }
}