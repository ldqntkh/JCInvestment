import React, {Component} from 'react';
import { Link } from "react-router-dom";

const showMessage = require('../../../../../global/ResourceHelper').showAdminMessage;
export default class ProductItemComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            productItem: '',
            pricesBooks: []
        };

        this.openModal = this.openModal.bind(this);
        this._removeProductModal = this._removeProductModal.bind(this);
    }

    openModal () {
        this.props.onUpdateProduct(this.props.dataProduct);
    }

    _removeProductModal (){
        this.props._openConfirmationPopup(this.props.dataProduct);
    }

    render() {
        let product = this.props.dataProduct;
        let priceBook = '';
        if (this.props.dataPriceBook.length > 0) {
            priceBook = this.props.dataPriceBook.sort()[0];
        }
        return(
            <tr>
                <td>{product.id}</td>
                <td>{priceBook !== '' ? priceBook.name : ''}</td>
                <td>{product.sku}</td>
                <td>{product.period}</td>
                <td>{priceBook !== '' && priceBook.enable ? showMessage('LABEL_ACTIVE_TITLE') : showMessage('LABEL_UNACTIVE')}</td>
                <td className="td-actions">
                    <Link to={'/admin-product/detail/' + product.id}><i className="material-icons product-detail">search</i></Link>
                    <button type="button" rel="tooltip" title="" className="btn btn-danger btn-link btn-sm" data-original-title="Remove" onClick={this._removeProductModal}>
                        <i className="material-icons">close</i>
                    </button>
                </td>
            </tr>
        );
    }
}