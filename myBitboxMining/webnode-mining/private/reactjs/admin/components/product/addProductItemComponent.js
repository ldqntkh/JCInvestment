import React, {Component} from 'react';
import { Link } from "react-router-dom";

// import const
import { MAIN_URL, API_ADMIN_URL } from '../../const/variable';

const showMessage = require('../../../../../global/ResourceHelper').showAdminMessage;
const moment = require('moment');

export default class ProductItemComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productItem: '',
            listLocale: [],
            productId: '',
            localeId: '',
            name: '',
            sku: '',
            hashrate: '',
            period: '',
            price: '',
            sale_price: '',
            currency: '',
            symbol_currency: '',
            enable: 0,
            desc1: '',
            desc2: '',
            desc3: '',
            errMessage: ''
        };

        this._getListLocale = this._getListLocale.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleAddProduct = this._handleAddProduct.bind(this);
        this._getProductDetail = this._getProductDetail.bind(this);
        this._getProductByLocale = this._getProductByLocale.bind(this);
    }

    componentDidMount() {
        this._getListLocale();
        this.setState({
            sku: moment(Date.now()).format('X')
        });
        if (typeof this.props.match.params.productId !== 'undefined') {
            this.setState({productId: this.props.match.params.productId});
            document.getElementsByClassName('sku')[0].disabled = true;
            document.getElementsByClassName('hashrate')[0].disabled = true;
            document.getElementsByClassName('period')[0].disabled = true;
            this._getProductDetail(this.props.match.params.productId);
        } else {
            document.getElementsByClassName('sku')[0].disabled = false;
            document.getElementsByClassName('hashrate')[0].disabled = false;
            document.getElementsByClassName('period')[0].disabled = false;
        }
    }

    async _getProductDetail(productId) {
        try {
            let url = API_ADMIN_URL + 'products/product/detail/' + productId;
            let response = await fetch(url, {
                method: 'GET',
                credentials: 'same-origin'
            });
            let jsonData = await response.json();
            if (jsonData.status === 'success') {
                let product = jsonData.data;
                this.props.addProduct(jsonData.data);
                this.setState({
                    sku: product.sku,
                    hashrate: product.hashrate,
                    period: product.period
                });
                if (product.pricebooks.length > 0) {
                    let pricebook = product.pricebooks[0];
                    this.setState({
                        name: pricebook.name,
                        localeId: pricebook.localeId,
                        price: pricebook.price,
                        sale_price: pricebook.sale_price,
                        currency: pricebook.currency,
                        symbol_currency: pricebook.symbol_currency,
                        enable: !pricebook.enable ? 0 : 1,
                        desc1: pricebook.desc1,
                        desc2: pricebook.desc2,
                        desc3: pricebook.desc3
                    });
                }
            } else {
                this.setState({
                    loaded: true
                })
                console.log(jsonData.errMessage);
            }
        } catch(err) {
            console.log(err.message);
        }
    }

    async _getListLocale() {
        try {
            let url = API_ADMIN_URL + 'products/locale/list';
            let response = await fetch(url, {
                method: 'GET',
                credentials: 'same-origin'
            });
            let jsonData = await response.json();
            if (jsonData.status === 'success') {
                this.setState({listLocale: jsonData.data});
            } else {
                this.setState({
                    loaded: true
                })
                console.log(jsonData.errMessage);
            }
        } catch(err) {
            console.log(err.message);
        }
    }

    _handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
        if (e.target.name === 'localeId' && this.props.match.params.productId !== '') {
            this._getProductByLocale(this.props.match.params.productId, e.target.value);
        }
    }

    async _getProductByLocale(productId, localeId) {
        try {
            let locale = localeId === '' ? 'en' : localeId;
            let url = API_ADMIN_URL + 'products/product/' + productId + '/locale/' + locale;
            let response = await fetch(url, {
                method: 'GET',
                credentials: 'same-origin'
            });
            let jsonData = await response.json();
            if (jsonData.status === 'success') {
                let product = jsonData.data;
                if (typeof product.pricebooks !== 'undefined' && product.pricebooks.length > 0) {
                    let priceBook = product.pricebooks[0];
                    this.setState({
                        name: priceBook.name,
                        localeId: localeId,
                        price: priceBook.price,
                        sale_price: priceBook.sale_price,
                        currency: priceBook.currency,
                        symbol_currency: priceBook.symbol_currency,
                        enable: !priceBook.enable ? 0 : 1,
                        desc1: priceBook.desc1,
                        desc2: priceBook.desc2,
                        desc3: priceBook.desc3
                    });
                } else {
                    this.setState({
                        name: '',
                        localeId: localeId,
                        price: '',
                        sale_price: '',
                        currency: '',
                        symbol_currency: '',
                        enable: 0,
                        desc1: '',
                        desc2: '',
                        desc3: ''
                    });
                }
            } else {
                this.setState({
                    loaded: true
                })
                console.log(jsonData.errMessage);
            }
        } catch(err) {
            console.log(err.message);
        }
    }

    async _handleAddProduct() {
        try {
            let product = {
                localeId: this.state.localeId,
                name: this.state.name,
                sku: this.state.sku,
                hashrate: this.state.hashrate,
                period: this.state.period,
                price: this.state.price,
                sale_price: this.state.sale_price,
                currency: this.state.currency,
                symbol_currency: this.state.symbol_currency,
                enable: this.state.enable,
                desc1: this.state.desc1,
                desc2: this.state.desc2,
                desc3: this.state.desc3
            }

            if (typeof this.props.match.params.productId !== 'undefined') {
                // handle update or insert new product
                let url = API_ADMIN_URL + 'products/product/update/' + this.props.match.params.productId;
                let result = await fetch(url, {
                    method : 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        product: product
                    })
                });
                let dataJson = await result.json();
                if (dataJson.status !== "success") {
                    this.setState({
                        errMessage : dataJson.errMessage
                    });
                } else {
                    return window.location.href = '/admin-product';
                }
            } else {
                let url = API_ADMIN_URL + 'products/product/add';
                let result = await fetch(url, {
                    method : 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        product: product
                    })
                });
                let dataJson = await result.json();
                if (dataJson.status !== "success") {
                    this.setState({
                        errMessage : dataJson.errMessage
                    });
                } else {
                    return window.location.href = '/admin-product';
                }
            }
        } catch(err) {
            console.log(err.message);
        }
    }

    render() {
        let localeOptions = this.state.listLocale.sort().map((item, index) =>
            <option value={item.id} key={index}>{item.name}</option>
        );
        return(
            <div className="col-md-12 add-product-container">
                <div className="card">
                    <div className="card-header card-header-primary">
                        <h4 className="card-title">{showMessage('LABEL_ADD_OR_UPDATE_PRODUCT')}</h4>
                        <p className="card-category"></p>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group locale">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <label className="bmd-label-floating">{showMessage('LABEL_CHOOSE_LANGUAGE')}</label>
                                        </div>
                                        <div className="col-md-9">
                                            <select name="localeId" className="custom-select" onChange={this._handleChange} value={this.state.localeId} >
                                                <option value="">{showMessage('LABEL_DEFAULT')}</option>
                                                {localeOptions}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="bmd-label-floating">{showMessage('LABEL_NAME_TITLE')}</label>
                                    <input className="form-control" name="name" type="text" required maxLength="100" onChange={this._handleChange} value={this.state.name} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="bmd-label-floating">{showMessage('LABEL_SKU')}</label>
                                    <input className="form-control sku" name="sku" type="text" required maxLength="100" onChange={this._handleChange} value={this.state.sku} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="bmd-label-floating">{showMessage('LABEL_HASHRATE')}</label>
                                    <input name="hashrate" className="form-control hashrate" type="text" required maxLength="100" onChange={this._handleChange} value={this.state.hashrate} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="bmd-label-floating">{showMessage('LABEL_PERIOD')}</label>
                                    <input name="period" className="form-control period" type="number" required maxLength="10" onChange={this._handleChange} value={this.state.period} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="bmd-label-floating">{showMessage('LABEL_PRICE')}</label>
                                    <input name="price" className="form-control" type="text" required maxLength="100" onChange={this._handleChange} value={this.state.price} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="bmd-label-floating">{showMessage('LABEL_SALE_PRICE')}</label>
                                    <input name="sale_price" className="form-control" type="text" required maxLength="100" onChange={this._handleChange} value={this.state.sale_price} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="bmd-label-floating">{showMessage('LABEL_CURRENCY')}</label>
                                    <input name="currency" className="form-control" type="text" required maxLength="100" onChange={this._handleChange} value={this.state.currency} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="bmd-label-floating">{showMessage('LABEL_CURRENCY_SYMBOL')}</label>
                                    <input name="symbol_currency" className="form-control" type="text" required maxLength="100" onChange={this._handleChange} value={this.state.symbol_currency} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="bmd-label-floating">{showMessage('LABEL_STATE')}</label>
                                <select name="enable" className="custom-select" onChange={this._handleChange} value={this.state.enable}>
                                    <option value="1">{showMessage('LABEL_ACTIVE_TITLE')}</option>
                                    <option value="0">{showMessage('LABEL_UNACTIVE')}</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                <div className="col-md-3 label-description"><label className="">{showMessage('LABEL_DESC_FIRST')}</label></div>
                                    <div className="col-md-9">
                                        <textarea name="desc1" className="form-control" cols="50" rows="5" onChange={this._handleChange} value={this.state.desc1} ></textarea>
                                        </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <div className="col-md-2 label-description"><label className="">{showMessage('LABEL_DESC_SECOND')}</label></div>
                                    <div className="col-md-10">
                                        <textarea name="desc2" className="form-control" cols="50" rows="5" onChange={this._handleChange} value={this.state.desc2} ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                <div className="col-md-3 label-description"><label className="">{showMessage('LABEL_DESC_THIRD')}</label></div>
                                    <div className="col-md-9">
                                        <textarea name="desc3" className="form-control" cols="50" rows="5"onChange={this._handleChange} value={this.state.desc3} ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {this.state.errMessage !== '' && <div className="col-md-12 message text-danger">
                                <span>{this.state.errMessage}</span>
                                </div>
                            }
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                            {(this.state.productId !== '') && <Link to={'/admin-product'}>
                                <button type="submit" className="btn btn-primary pull-left btn-back">{showMessage('LABEL_BACK')}
                                </button>
                            </Link>}
                                <button type="submit" className="btn btn-primary pull-left" onClick={this._handleAddProduct}>{showMessage('LABEL_APPLY')}</button>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        );
    }
}