import React, {Component} from 'react';

// import const
import { MAIN_URL } from '../../const/variable';

export default class ProductItemComponent extends Component {

    constructor(props) {
        super(props);
    }

    _onSubmit(productId) {
        // post data product to server. Not use api
        document.getElementById("form-buy-product-" + productId).submit();
    }

    render() {
        let product = this.props.dataProduct;
        return(
            <tr>
                <td className="text-center">{product.id}</td>
                <td className="text-center">{product.name}</td>
                <td className="text-center">{product.hashrate}</td>
                <td className="text-center">{product.active === false ? "Not active" : "Active"}</td>
                <td className="text-center">{product.period}</td>
                <td className="text-center">{product.startDate === null ? "" : product.startDate}</td>
                <td className="text-center">{product.endDate === null ? "" : product.endDate}</td>
            </tr>
        );
    }
}