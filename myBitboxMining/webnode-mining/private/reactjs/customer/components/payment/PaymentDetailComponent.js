import React, {Component} from 'react';
import { Link } from "react-router-dom";

// import variable
import { API_URL } from '../../const/variable';

class PaymentDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            paymentDetail: ''
        }
        this.getPaymentDetail = this.getPaymentDetail.bind(this);
    }

    componentDidMount() {
        this.getPaymentDetail();
    }

    async getPaymentDetail() {
        try {
            let {orderId} = this.props.match.params;
            let orders = this.props.dataOrder;
            let index = -1;
            index = orders.findIndex(item => item.id === parseInt(orderId));
            let order = orders[index];
            console.log(index);
            if (typeof order.payment !== 'undefined') {
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
                    console.log(JSON.stringify(jsonData.data));
                    this.props.addPaymentDetail({
                        orderId: parseInt(orderId),
                        paymentDetail: jsonData.data
                    });
                    this.setState({
                        loaded: true,
                        paymentDetail: paymentDetail
                    });
                } else {
                    this.setState({
                        loaded: true
                    });
                    console.log(jsonData.errMessage);
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
        return (
            <div>
                <h3>Payment Detail</h3>
                <p>{this.props.match.params.orderId}</p>
                <Link to="/my-order">
                    <i className="material-icons">search</i>
                </Link>
            </div>
        )
    }
}
export default PaymentDetailComponent;
