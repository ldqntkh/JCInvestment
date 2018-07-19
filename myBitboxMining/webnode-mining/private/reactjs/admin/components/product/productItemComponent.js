import React, {Component} from 'react';

// import const
import { MAIN_URL, API_URL } from '../../const/variable';

const showMessage = require('../../../../../global/ResourceHelper').showMessage;

export default class ProductItemComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            listWallets: [],
            walletAddress: ''
        };

        this.openModal = this.openModal.bind(this);
        this._removeProductModal = this._removeProductModal.bind(this);
    }

    openModal () {
        this.props.onUpdateProduct(this.props.dataProduct);
    }

    _removeProductModal (){
        this.props.onDeleteProduct(this.props.dataProduct);
    }

    render() {
        let product = this.props.dataProduct;
        let priceBook = this.props.dataPriceBook;
        return(
            <tr>
                <td>{product.id}</td>
                <td>{priceBook.name}</td>
                <td>{product.sku}</td>
                <td>{priceBook.period}</td>
                <td>{priceBook.enable === false ? "Not active" : "Active"}</td>
                <td className="td-actions">
                    <i className="material-icons product-detail">search</i>
                    {!priceBook.enable && <button type="button" rel="tooltip" title="" className="btn btn-primary btn-link btn-sm" data-original-title="Edit product" onClick={this.openModal}>
                        <i className="material-icons">edit</i>
                    </button>}
                    {priceBook.expired && <button type="button" rel="tooltip" title="" className="btn btn-danger btn-link btn-sm" data-original-title="Remove" onClick={this._removeProductModal}>
                        <i className="material-icons">close</i>
                    </button>}
                </td>
            </tr>
        );
    }
}