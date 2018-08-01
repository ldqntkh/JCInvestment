import React, {Component} from 'react';
import { confirmAlert } from 'react-confirm-alert'; 
import Modal from 'react-modal';
import { Link } from "react-router-dom";

// import variable
import { API_URL } from '../../const/variable';

// import const
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

class ProductDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            productDetail: '',
            modalIsOpen: false,
            listWallets: [],
            walletId: ''
        }
        this._getProductDetail = this._getProductDetail.bind(this);
        this._getListProduct = this._getListProduct.bind(this);
        this._openModal = this._openModal.bind(this);
        this._closeModal = this._closeModal.bind(this);
        this._getListWallet = this._getListWallet.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleUpdateProduct = this._handleUpdateProduct.bind(this);
        this._handleRemoveProduct = this._handleRemoveProduct.bind(this);
        this._openConfirmationPopup = this._openConfirmationPopup.bind(this);
    }

    componentDidMount() {
        this._getProductDetail();
        Modal.setAppElement('#my-product-page');
    }

    async _getListProduct () {
        let url = API_URL + 'products/product_of_customer';
        try {
            let response = await fetch(url, {
                method: 'GET',
                credentials: 'same-origin'
            });
            let jsonData = await response.json();
            if (jsonData.status === 'success') {
                this.setState({
                    loaded: true
                });
                this.props.addListProduct(jsonData.data);
            } else {
                this.setState({
                    loaded: true
                })
                console.log(jsonData.errMessage);
            }
        } catch (err) {
            this.setState({
                loaded: true
            })
            console.log(err.errMessage);
        }
    }

    async _getProductDetail() {
        try {
            if (this.props.dataProduct.length <= 0) {
                await this._getListProduct();
            }

            let productId = parseInt(this.props.match.params.productId);
            let products = this.props.dataProduct;
            let index = -1;
            index = products.findIndex(item => item.id === productId);
            let product = products[index];
            
            this.setState({
                loaded: true,
                productDetail: typeof product !== 'undefined' ? product : ''
            });
        } catch(err) {
            console.log(err.message);
            this.setState({
                loaded: true
            });
        }
    }

    async _openModal() {
        try {
            await this._getListWallet();
            this.setState({
                modalIsOpen: true
            });
        } catch(err) {
            console.log(err.message);
        }
    }

    _closeModal() {
        this.setState({modalIsOpen: false});
    }

    async _getListWallet() {
        try {
            let result = await fetch(API_URL + 'wallets/list', {
                method: 'GET',
                credentials: 'same-origin'
            });
            let dataJson = await result.json();
            if (dataJson.status !== 'success') {
                console.log(dataJson.errMessage)
            }
    
            let defaultData = {id: '', walletName: showMessage('WALLET_DEFAULT_NAME_OPTION')};
            if (dataJson.data !== null) {
                dataJson.data.unshift(defaultData);
                this.setState({listWallets: dataJson.data});
            }
        } catch(err) {
            console.log(err.message);
        }
    }

    _handleChange(e) {
        this.setState({walletId: parseInt(e.target.value)});
    }

    async _handleUpdateProduct() {
        try {
            let url = API_URL + 'products/update';
            let productItem = this.state.productDetail;
            productItem.walletId = this.state.walletId;
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productItem: productItem
                })
            });
            let jsonData = await response.json();
            if (jsonData.status === 'success') {
                this.props.updateListProduct(jsonData.data);
                await this._getProductDetail();
            } else {
                console.log(jsonData.errMessage);
            }
        } catch(err) {
            console.log(err.message);
        }
        this._closeModal();
    }

    async _handleRemoveProduct(productItem, callback) {
        try {
            let result = await fetch(API_URL + 'products/' + productItem.id + '/delete',{
                method: 'GET',
                credentials: 'same-origin'
            });
            let responsejson = await result.json();
            if (responsejson.status === 'success') {
                this.props.deleteProductFromList(productItem);
                this.setState({productDetail: ''});
            } else {
                this.setState({
                    err : responsejson.errMessage
                });
            }
            callback();
        } catch(err) {
            console.log(err);
        }
    }

    _openConfirmationPopup () {
        try {
            let productItem = this.state.productDetail;
            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <div className='custom-ui'>
                            <h1>{showMessage('AL_TITLE_CONFIRM')}</h1>
                            <p>  {showMessage('AL_TITLE_DESC', ['product name: ' + productItem.name])} </p>
                            <div className="form-group">
                                <button onClick={()=> { onClose();}} type="button" name="recover-submit" className="btn btn-lg btn-primary" value={showMessage('AL_BTN_NO')}>{showMessage('AL_BTN_NO')}</button>
                                <button onClick={() => {
                                        this._handleRemoveProduct(productItem, onClose);
                                    }} type="button" name="recover-cancel" className="btn btn-lg btn-primary btn-success" value={showMessage('AL_BTN_YES')}>{showMessage('AL_BTN_YES')}</button>
                            </div>
                        </div>
                    )
                }
            });
        } catch(err) {
            console.log(err.message);
        }
    }

    render() {
        let screen = null;
        let productDetail = this.state.productDetail;
        if (!this.state.loaded) screen = <i className="fa fa-spinner fa-spin fa-icon-loading"></i>
        else {
            screen = <div className="payment-detail-container">
                        <div className="card-header card-header-warning">
                            <h4 className="card-title">{showMessage('TITLE_MY_PRODUCT')}</h4>
                            <Link to="/my-product">
                                <button type="button" className="btn btn-primary btn-sm pull-right">{showMessage('RC_BACK')}</button>
                            </Link>
                            <p className="card-category"></p>
                        </div>
                        <div className="card-body table-responsive">
                            {productDetail === '' ? <p>{'you do not have any product'}</p> :
                            <table className="table table-hover text-center">
                                <tbody>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_ID').toUpperCase()}</td>
                                        <td>{productDetail.id}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_NAME')}</td>
                                        <td>{productDetail.name}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_HASHRATE')}</td>
                                        <td>{productDetail.hashrate}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_STATE')}</td>
                                        <td>{productDetail.active ? showMessage('RC_ACTIVE') : showMessage('RC_NOT_ACTIVE')}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_PERIOD')}</td>
                                        <td>{productDetail.period}</td>
                                    </tr>
                                    {productDetail.maintenance_fee > 0 && <tr className="payment-detail-content">
                                        <td>{showMessage('RC_MAINTENANCE_FEE')}</td>
                                        <td className="symbol-currency">{productDetail.maintenance_fee}</td>
                                    </tr>}
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_START_DATE')}</td>
                                        <td>{productDetail.startDate}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_END_DATE')}</td>
                                        <td>{productDetail.endDate}</td>
                                    </tr>
                                    <tr className="payment-detail-content">
                                        <td>{showMessage('RC_ACTION')}</td>
                                        <td>
                                        {!productDetail.active && <button type="button" rel="tooltip" title="" className="btn btn-primary btn-link btn-sm" data-original-title="Edit product" onClick={this._openModal}>
                                            <i className="material-icons">edit</i>
                                        </button>}
                                        {productDetail.expired && <button type="button" rel="tooltip" title="" className="btn btn-danger btn-link btn-sm" data-original-title="Remove" onClick={this._openConfirmationPopup}>
                                            <i className="material-icons">close</i>
                                        </button>}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            }
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                                <Link to="/my-product">
                                    <button type="button" className="btn btn-warning pull-left">{showMessage('RC_BACK')}</button>
                                </Link>
                            </div>
                        </div>
                    </div>
        }
        return (
            <div className="col-lg-10 col-md-10 offset-lg-1 offset-md-1 ">
                <div className="card" >
                    {screen}
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this._closeModal}
                    style={customStyles}>
                    <div className="modal-content update-product-container">
                        <div className="modal-body text-center">
                            <h3><i className="fa fa-folder fa-4x"></i></h3>
                            <h2 className="text-center">{showMessage('RC_UPDATE_PRODUCT')}</h2>
                            <div className="form-group">
                                <select className="form-control wallet-address" name="wallet-address" onChange={this._handleChange}>
                                    {this.state.listWallets.map((item, index) =>
                                        <option key={index} value={item.id} >{item.walletName}</option>
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
            </div>
        )
    }
}
export default ProductDetailComponent;
