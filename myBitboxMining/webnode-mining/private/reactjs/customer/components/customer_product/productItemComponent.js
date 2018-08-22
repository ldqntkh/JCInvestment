import React, {Component} from 'react';

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
                {page === 'maintenance-fee' && product.maintenance_fee > 0 && <td className="maintenance-fee symbol-currency">{product.maintenance_fee}</td>}
                {page === "my-product" && <td className="td-actions">
                            {!product.active && <button type="button" rel="tooltip" title="" className="btn btn-primary btn-link btn-sm" data-original-title="Edit product" onClick={this.openModal}>
                                <i className="material-icons">edit</i>
                            </button>}
                            {product.expired && <button type="button" rel="tooltip" title="" className="btn btn-danger btn-link btn-sm" data-original-title="Remove" onClick={this._removeProductModal}>
                                <i className="material-icons">close</i>
                            </button>}
                        </td>}
            </tr>
        );
    }
}