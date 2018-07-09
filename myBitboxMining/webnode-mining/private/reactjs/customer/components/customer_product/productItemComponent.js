import React, {Component} from 'react';
import Modal from 'react-modal';

// import const
import { MAIN_URL, API_URL } from '../../const/variable';

const showMessage = require('../../../../../global/ResourceHelper').showMessage;

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

//Modal.setAppElement('#my-product-page');
export default class ProductItemComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            listWallets: [],
            walletAddress: ''
        };

        this._handleUpdateProduct = this._handleUpdateProduct.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({walletAddress: e.target.value});
    }

    async _handleUpdateProduct() {
        let result = await fetch(API_URL + 'products/', {
            method: 'GET',
            credentials: 'same-origin'
        });
        let dataJson = await result.json();
        if (dataJson.status !== 'success') {
            console.log(dataJson.errMessage)
        }
        return dataJson.data === null ? [] : dataJson.data;
    }

    async openModal() {
        let listWallets = await this.getListWallet();
        let defaultData = {id: '', walletName: showMessage('WALLET_DEFAULT_NAME_OPTION')};
        if (listWallets.length > 0) {
            listWallets.unshift(defaultData);
            this.setState({listWallets: listWallets});
        }
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    async getListWallet() {
        let result = await fetch(API_URL + 'wallets/list', {
            method: 'GET',
            credentials: 'same-origin'
        });
        let dataJson = await result.json();
        if (dataJson.status !== 'success') {
            console.log(dataJson.errMessage)
        }
        return dataJson.data === null ? [] : dataJson.data;
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
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={customStyles}>
                <div className="modal-content update-product-container">
                    <div className="modal-body text-center">
                        <h3><i className="fa fa-folder fa-4x"></i></h3>
                        <h2 className="text-center">{showMessage('RC_UPDATE_PRODUCT')}</h2>
                        <div className="form-group">
                            <select className="form-control wallet-address" name="wallet-address">
                                {this.state.listWallets.map((item, index) =>
                                    <option key={index} value={item.id} onChange={this.handleChange}>{item.walletName}</option>
                                )}
                            </select>
                        </div>
                        {this.state.err === "" ? "" : this.state.err}
                        <div className="form-group">
                            <button onClick={this._handleUpdateProduct} type="button" name="recover-submit" className="btn btn-lg btn-primary btn-success" value={showMessage('BTN_SUBMIT')}>{showMessage('BTN_SUBMIT')}</button>
                        </div>
                    </div>
                </div>
            </Modal>
            </React.Fragment>
        );
    }
}