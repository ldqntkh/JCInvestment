import React, {Component} from 'react';

// import const
import { MAIN_URL, API_URL } from '../../const/variable';

const showMessage = require('../../../../../global/ResourceHelper').showMessage;

//Modal.setAppElement('#my-product-page');
export default class ProductItemComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            listWallets: [],
            walletAddress: ''
        };

        this.openModal = this.openModal.bind(this);
    }

    openModal () {
        this.props.onUpdateProduct(this.props.dataProduct);
    }


    render() {
        let product = this.props.dataProduct;
        let page = this.props.product_page;
        return(
            <React.Fragment>
            <tr>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.hashrate}</td>
                <td>{product.active === false ? "Not active" : "Active"}</td>
                <td>{product.period}</td>
                <td>{product.startDate === null ? "" : product.startDate}</td>
                <td>{product.endDate === null ? "" : product.endDate}</td>
                {page === "my-product" && <td className="td-actions">
                            {!product.active && <button type="button" rel="tooltip" title="" className="btn btn-primary btn-link btn-sm" data-original-title="Edit product" onClick={this.openModal}>
                                <i className="material-icons">edit</i>
                            </button>}
                            {product.expired && <button type="button" rel="tooltip" title="" className="btn btn-danger btn-link btn-sm" data-original-title="Remove">
                                <i className="material-icons">close</i>
                            </button>}
                        </td>}
            </tr>
            </React.Fragment>
        );
    }
}