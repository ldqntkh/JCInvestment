import React, {Component} from 'react';
import Modal from 'react-modal';
import { confirmAlert } from 'react-confirm-alert';

// import component
import ProductItemComponent from '../../../admin/components/product/productItemComponent';

// import variable
import { API_ADMIN_URL } from '../../const/variable';

// import const
const showMessage = require('../../../../../global/ResourceHelper').showAdminMessage;

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

export default class ListProductComponent extends Component {

    constructor (props) {
        super(props);
        this.state = {
            loaded: false,
            modalIsOpen: false,
            walletId: '',
            productItem: '',
            listProduct: []
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleUpdateProduct = this._handleUpdateProduct.bind(this);
        this._openConfirmationPopup = this._openConfirmationPopup.bind(this);
        this._handleRemoveProduct = this._handleRemoveProduct.bind(this);
    }

    componentDidMount() {
        if (this.props.dataProduct.length === 0) {
            this._getListProduct();
        } else {
            this.setState({
                loaded: true
            });
        }

        if (pageContext.page && pageContext.page === 'my-product') {
            Modal.setAppElement('#my-product-page');
        }
    }

    openModal(productItem) {
        this.setState({
            modalIsOpen: true,
            productItem: productItem
        });
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    _handleChange(e) {
        this.setState({walletId: parseInt(e.target.value)});
    }

    async _handleUpdateProduct() {
        try {
            let url = API_URL + 'products/update';
            let productItem = this.state.productItem;
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
            } else {
                console.log(jsonData.errMessage);
            }
        } catch(err) {
            console.log(err.message);
        }
        this.closeModal();
    }

    async _getListProduct () {
        let url = API_ADMIN_URL + 'products/list';
        try {
            if (this.props.dataProduct.length > 0) {
                this.setState({
                    loaded: true,
                    listProduct: this.props.dataProduct
                });
            } else {
                let response = await fetch(url, {
                    method: 'GET',
                    credentials: 'same-origin'
                });
                let jsonData = await response.json();
                if (jsonData.status === 'success') {
                    this.props.addListProduct(jsonData.data);
                    this.setState({
                        loaded: true,
                        listProduct: this.props.dataProduct
                    });
                } else {
                    this.setState({
                        loaded: true
                    })
                }
            }
        } catch (err) {
            this.setState({
                loaded: true
            })
            console.log(err.errMessage);
        }
    }

    _openConfirmationPopup (productItem) {
        try {
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

    async _handleRemoveProduct(productItem, callback) {
        try {
            let result = await fetch(API_URL + 'products/' + productItem.id + '/delete',{
                method: 'GET',
                credentials: 'same-origin'
            });
            let responsejson = await result.json();
            if (responsejson.status === 'success') {
                this.props.deleteProductFromList(productItem);
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

    render () {
        let screen = null;
        let page = pageContext.page;
        if (!this.state.loaded) screen = <i className="fa fa-spinner fa-spin fa-icon-loading"></i>
        else {
            screen = this.props.dataProduct.map((item, index)=> {
                return  <ProductItemComponent dataPriceBook={item.pricebooks} dataProduct={item} key={index} />;
            });
            screen = <React.Fragment>
                        <div className="card">
                            <div className="card-header card-header-warning">
                                <h4 className="card-title">{showMessage('TITLE_LIST_PRODUCT')}</h4>
                                <p className="card-category"></p>
                            </div>
                            <div className="card-body table-responsive">
                                <table className="table table-hover text-center">
                                    <thead className="text-warning">
                                        <tr>
                                            <th>{showMessage('LABEL_ID_TITLE')}</th>
                                            <th>{showMessage('LABEL_NAME_TITLE')}</th>
                                            <th>{showMessage('LABEL_SKU')}</th>
                                            <th>{showMessage('LABEL_PERIOD')}</th>
                                            <th>{showMessage('LABEL_STATE')}</th>
                                            <th>{showMessage('LABEL_ACTION_TITLE')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {screen}
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer">
                                <div className="stats">
                                    <i className="material-icons">access_time</i> {showMessage('RC_REFRESH')}
                                </div>
                            </div>
                        </div>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={this.closeModal}
                            style={customStyles}>
                            <div className="modal-content update-product-container">
                                <div className="modal-body text-center">
                                    <h3><i className="fa fa-folder fa-4x"></i></h3>
                                    <h2 className="text-center">{showMessage('RC_UPDATE_PRODUCT')}</h2>
                                    <div className="form-group">
                                        <select className="form-control wallet-address" name="wallet-address" onChange={this._handleChange}>
                                            <option>Default Option</option>
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
        }
        
        return (
            <div className="col-lg-12 col-md-12">
                <a href="/admin-product/add" className="btn btn-success">{showMessage('LABEL_ADD_NEW_PRODUCT')}</a>
                    {screen}
            </div>
        );
    }
}