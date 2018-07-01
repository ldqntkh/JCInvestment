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
                <td class="td-actions text-center">
                    <button type="button" rel="tooltip" title={product.active? "Show Product" : "Edit Product"} class="btn btn-primary btn-link btn-sm">
                        <i class="material-icons">{product.active ? "search" : "edit"}</i>
                    </button>
                    <button type="button" rel="tooltip" title="Remove Product" class="btn btn-danger btn-link btn-sm">
                        <i class="material-icons">close</i>
                    </button>
                </td>
            </tr>
        );
    }
}