import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import container
import ListOrderContainer from '../../containers/order/listOrderContainer';
import PaymentDetailContainer from '../../containers/payment/paymentDetailContainer';
import OrderDetailContainer from '../../containers/order/orderDetailContainer';

class IndexComponent extends Component {

    render() {
        return(
            <Router>
                <React.Fragment>
                    <Route exact path="/my-order" component={ListOrderContainer}/>
                    <Route path="/my-order/:orderId/payment-detail" component={PaymentDetailContainer} />
                    <Route path="/my-order/:orderId/detail" component={OrderDetailContainer} />
                </React.Fragment>
            </Router>
        )
    }
}
export default IndexComponent;
