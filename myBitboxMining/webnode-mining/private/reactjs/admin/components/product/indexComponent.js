import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

// import container
import ListProductContainer from '../../containers/product/listProductContainer';
import AddProductContainer from '../../containers/product/addProductContainer';
class IndexComponent extends Component {

    render() {
        return(
            <Router>
                <React.Fragment>
                    <Route exact path="/admin-product" component={ListProductContainer}/>
                    <Route path="/admin-product/add" component={AddProductContainer} />
                </React.Fragment>
            </Router>
        )
    }
}
export default IndexComponent;
