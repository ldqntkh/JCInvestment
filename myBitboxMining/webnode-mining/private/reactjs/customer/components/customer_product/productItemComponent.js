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
        let page = this.props.product_page;
        return(
            <tr>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.hashrate}</td>
                <td>{product.active === false ? "Not active" : "Active"}</td>
                <td>{product.period}</td>
                <td>{product.startDate === null ? "" : product.startDate}</td>
                <td>{product.endDate === null ? "" : product.endDate}</td>
                {page === "my-product" && <td className="td-actions">
                            {!product.active && <button type="button" rel="tooltip" title="" className="btn btn-primary btn-link btn-sm" data-original-title="Edit product">
                                <i className="material-icons">edit</i>
                            </button>}
                            {product.expired && <button type="button" rel="tooltip" title="" className="btn btn-danger btn-link btn-sm" data-original-title="Remove">
                                <i className="material-icons">close</i>
                            </button>}
                        </td>}
            </tr>
        );
    }
}