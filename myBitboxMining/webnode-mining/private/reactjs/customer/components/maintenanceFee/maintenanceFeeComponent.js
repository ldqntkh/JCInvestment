import React, {Component} from 'react';
import momemt from 'moment';
// import component
import ProductItemComponent from '../customer_product/productItemComponent';

// import variable
import { API_URL } from '../../const/variable';

// import const
const showMessage = require('../../../../../global/ResourceHelper').showMessage;
const moment = require('moment');
const url = 'https://api.coinmarketcap.com/v2/ticker/1027/';

export default class ListProductComponent extends Component {

    constructor (props) {
        super(props);
        this.state = {
            loaded: false,
            productItem: '',
            maintainfee: '',
            EthPrice: 0,
            listProduct: []
        }
        this.getEthExchange = this.getEthExchange.bind(this);
        this._paid = this._paid.bind(this);
    }

    componentDidMount() {
        this.getEthExchange();
        this._getListProduct();
    }

    async getEthExchange () {
        try {
            let response = await fetch(url);
            let jsonData = await response.json();
            if (jsonData.data) {
                let price = jsonData.data.quotes.USD.price;
                this.setState({
                    EthPrice : price
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    async _getListProduct () {
        let urlProduct = API_URL + 'products/product_of_customer';
        let urlMaintain = API_URL + 'maintenances/maintenancefee';
        var dataProduct = null;
        var dataMaintainFee = null;
        try {
            let response = await fetch(urlProduct, {
                method: 'GET',
                credentials: 'same-origin'
            });
            let jsonData = await response.json();
            if (jsonData.status === 'success') {
                dataProduct = jsonData.data;
            } else {
                console.log(jsonData.errMessage);
            }

            let responseMaintain = await fetch(urlMaintain, {
                method: 'GET',
                credentials: 'same-origin'
            });
            let jsonMaintain = await responseMaintain.json();
            if(jsonMaintain.status === 'success') {
                dataMaintainFee = jsonMaintain.data;
            } else {
                console.log(dataMaintainFee.errMessage);
            }

            if (dataProduct !== null || dataMaintainFee !== null) {
                this.setState({
                    listProduct: dataProduct,
                    maintainfee: dataMaintainFee,
                    loaded: true
                });
            } else {
                this.setState({
                    loaded: false
                })
            }

        } catch (err) {
            this.setState({
                loaded: true
            })
            console.log(err.errMessage);
        }
    } 

    async _paid(ethvalue) {
        let result = await fetch(API_URL + 'maintenances/maintainpaid', {
            method : 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fee: ethvalue
            })
        });

        let dataJson = await result.json();
        if (dataJson.status === 'success') {
            window.location.reload();
        } else {
            console.log(dataJson.errMessage);
        }
    }

    render () {
        let screen = null;
        let maintain = null;
        let page = pageContext.page;

        if (!this.state.loaded) screen = <i className="fa fa-spinner fa-spin fa-icon-loading"></i>
        else {
            let maintainfee = this.state.maintainfee;
            if (maintainfee !== null) {
                maintain = <div className="payment-detail-container">
                                <div className="card-header card-header-primary">
                                    <h4 className="card-title">{showMessage('TITLE_CUSTOMER_MAINTAINCE_FEE')}</h4>
                                </div>
                                <div className="card-body table-responsive">
                                    <table className="table table-hover text-center">
                                        <tbody>
                                            <tr className="payment-detail-content">
                                                <td>{showMessage('TITLE_AMOUNT_PAIR').toUpperCase()}</td>
                                                <td>{maintainfee.symbol_currency + maintainfee.payment_amount}</td>
                                            </tr>
                                            <tr className="payment-detail-content">
                                                <td>{showMessage('TITLE_PAYMENT_TERN').toUpperCase()}</td>
                                                <td>{momemt(maintainfee.maturity).format('DD/MM/YYYY')}</td>
                                            </tr>
                                            <tr className="payment-detail-content">
                                                <td>{(showMessage('MAINTAIN_FEE_STATUS') + ':').toUpperCase()}</td>
                                                <td>
                                                    {maintainfee.status ? showMessage('MAINTAIN_PAID') : showMessage('MAINTAIN_NOT_PAID')}
                                                </td>
                                            </tr>
                                            {!maintainfee.status && 
                                                <React.Fragment>
                                                    <tr className="payment-detail-content">
                                                        <td>{(showMessage('RC_AMOUNT') + ':').toUpperCase()}</td>
                                                        <td>
                                                            { maintainfee.symbol_currency + maintainfee.payment_amount}
                                                        </td>
                                                    </tr>
                                                    <tr className="payment-detail-content">
                                                        <td>{(showMessage('MAINTAIN_PAID_ETH') + ':').toUpperCase()}</td>
                                                        <td>
                                                            { maintainfee.payment_amount / this.state.EthPrice } {showMessage('MAINTAIN_ETH')}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            <button onClick={()=> this._paid(maintainfee.payment_amount / this.state.EthPrice)} 
                                                            style={{float:'left'}} className="btn btn-lg btn-primary btn-success">
                                                            {showMessage('MAINTAIN_PAID')}</button>
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-footer">
                                    <div className="form-group">
                                        <i className="note">
                                            {showMessage('NOTE_MAINTAIN_FEE')}
                                        </i>
                                    </div>
                                </div>
                            </div>
            }

            screen = this.state.listProduct.map((item, index)=> {
                return (item.active > 0 && item.maintenance_fee > 0) ? <ProductItemComponent dataProduct={item} key={index} product_page={page} onUpdateProduct={this.openModal} onDeleteProduct={this._openConfirmationPopup} /> : null;
            });
            screen = <React.Fragment>
                        <div className="card-header card-header-warning">
                            <h4 className="card-title">{showMessage('TITLE_MY_PRODUCT')}</h4>
                            <p className="card-category"></p>
                        </div>
                        <div className="card-body table-responsive">
                            <table className="table table-hover text-center">
                                <thead className="text-warning">
                                    <tr>
                                        <th>{showMessage('RC_ID')}</th>
                                        <th>{showMessage('RC_NAME')}</th>
                                        <th>{showMessage('RC_HASHRATE')}</th>
                                        <th>{showMessage('RC_ACTIVE')}</th>
                                        <th>{showMessage('RC_PERIOD')}</th>
                                        <th>{showMessage('RC_START_DATE')}</th>
                                        <th>{showMessage('RC_END_DATE')}</th>
                                        <th>{showMessage('RC_MAINTENANCE_FEE')}</th>
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
                    </React.Fragment>
        }
        return (
            <React.Fragment>
                {maintain !== null && <div className="col-lg-12 col-md-12">
                    <div className="card">
                        {maintain}
                    </div>
                </div>}
                <div className="col-lg-12 col-md-12">
                    <div className="card">
                        {screen}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}