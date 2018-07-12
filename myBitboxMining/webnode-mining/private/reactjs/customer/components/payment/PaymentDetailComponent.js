import React, {Component} from 'react';
import { Link } from "react-router-dom";

// import variable
import { API_URL } from '../../const/variable';

// import const
const showMessage = require('../../../../../global/ResourceHelper').showMessage;

class PaymentDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            paymentDetail: ''
        }
        this.getPaymentDetail = this.getPaymentDetail.bind(this);
        this._getListOrder = this._getListOrder.bind(this);
    }

    componentDidMount() {
        this.getPaymentDetail();
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

    async getPaymentDetail() {
        try {
            if (this.props.dataOrder.length <= 0) {
                await this._getListOrder();
            }

            let {orderId} = this.props.match.params;
            let orders = this.props.dataOrder.length > 0 ? this.props.dataOrder : [];
            let index = -1;
            index = orders.findIndex(item => item.id === parseInt(orderId));
            let order = orders.length > 0 ? orders[index] : '';
            if (order !== '' && typeof order.payment !== 'undefined') {
                this.setState({
                    loaded: true,
                    paymentDetail: order.payment
                });
            } else {
                let response = await fetch(API_URL + 'orders/' + orderId + '/payment-detail', {
                    method: 'GET',
                    credentials: 'same-origin'
                });

                let jsonData = await response.json();
                if (jsonData.status === 'success') {
                    this.props.addPaymentDetail({
                        orderId: parseInt(orderId),
                        paymentDetail: jsonData.data
                    });
                    this.setState({
                        loaded: true,
                        paymentDetail: jsonData.data
                    });
                } else {
                    console.log(jsonData.errMessage);
                    this.setState({loaded: true});
                }
            }
        } catch(err) {
            console.log(err.message);
            this.setState({
                loaded: true
            });
        }
    }

    render() {
        let screen = null;
        let paymentDetail = this.state.paymentDetail;
        if (!this.state.loaded) screen = <i className="fa fa-spinner fa-spin fa-icon-loading"></i>
        else {
            screen = <div className="payment-detail-container">
                        <div className="card-header card-header-warning">
                            <h4 className="card-title">{showMessage('TITLE_CUSTOMER_PAYMENT_DETAIL')}</h4>
                            <Link to="/my-order">
                                <button type="button" className="btn btn-primary btn-sm pull-right">Back</button>
                            </Link>
                            <p className="card-category"></p>
                        </div>
                        <div className="card-body table-responsive">
                            <table className="table table-hover text-center">
                                <tbody>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_ID').toUpperCase()}</td>
                                        <td>{paymentDetail.id}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_EMAIL')}</td>
                                        <td>{paymentDetail.email}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_FIRST_NAME')}</td>
                                        <td>{paymentDetail.firstname}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_LAST_NAME')}</td>
                                        <td>{paymentDetail.lastname}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_PAYMENT_METHOD')}</td>
                                        <td>{paymentDetail.payment_method}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_PAYMENT_USER_ID')}</td>
                                        <td>{paymentDetail.payerid}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_PAYMENT_COUNTRY_CODE')}</td>
                                        <td>{paymentDetail.countrycode}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_STATE')}</td>
                                        <td>{paymentDetail.state}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_PAYMENT_CART_NUMBER')}</td>
                                        <td>{paymentDetail.cart}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_CREATE_DATE')}</td>
                                        <td>{paymentDetail.createAt}</td>
                                    </tr>
                                </tbody>
                            </table>
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
        return (
            <div className="col-lg-10 col-md-10 offset-lg-1 offset-md-1 ">
                <div className="card" >
                    {screen}
                </div>
            </div>
        )
    }
}
export default PaymentDetailComponent;
