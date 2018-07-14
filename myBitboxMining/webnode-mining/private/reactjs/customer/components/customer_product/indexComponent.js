import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

// import container
import ListProductContainer from '../../containers/customer_product/listProductContainer';
import ProductDetailContainer from '../../containers/customer_product/productDetailContainer';

class IndexComponent extends Component {

    render() {
        return(
            <Router>
                <React.Fragment>
                    <Route exact path="/my-product" component={ListProductContainer}/>
                    <Route path="/my-product/:productId" component={ProductDetailContainer} />
                </React.Fragment>
            </Router>
        )
    }
}
export default IndexComponent;
