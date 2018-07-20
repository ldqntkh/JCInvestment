import React, {Component} from 'react';

// import const
import { MAIN_URL, API_ADMIN_URL } from '../../const/variable';

const showMessage = require('../../../../../global/ResourceHelper').showAdminMessage;

export default class ProductItemComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            productItem: '',
            listLocale: []
        };

        this._getListLocale = this._getListLocale.bind(this);
    }

    componentDidMount() {
        if (this.state.productItem === '') {
            this._getListLocale();
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
                //this.props.addListOrder(jsonData.data);
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
                                        <div className="col-md-2">
                                            <label className="bmd-label-floating">{showMessage('LABEL_LOCALE')}</label>
                                        </div>
                                        <div className="col-md-10">
                                            <select className="custom-select">
                                                <option value="en">{showMessage('LABEL_DEFAULT')}</option>
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
                                    <input className="form-control" value="Label" type="text" required maxLength="100" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="bmd-label-floating">{showMessage('LABEL_SKU')}</label>
                                    <input className="form-control" type="text" required maxLength="100" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="bmd-label-floating">{showMessage('LABEL_HASHRATE')}</label>
                                    <input className="form-control" type="text" required maxLength="100" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="bmd-label-floating">{showMessage('LABEL_PERIOD')}</label>
                                    <input className="form-control" type="number" required maxLength="10"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="bmd-label-floating">{showMessage('LABEL_PRICE')}</label>
                                    <input className="form-control" type="text" required maxLength="100" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="bmd-label-floating">{showMessage('LABEL_SALE_PRICE')}</label>
                                    <input className="form-control" type="text" required maxLength="100" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="bmd-label-floating">{showMessage('LABEL_CURRENCY')}</label>
                                    <input className="form-control" type="text" required maxLength="100" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="bmd-label-floating">{showMessage('LABEL_SALE_PRICE')}</label>
                                    <input className="form-control" type="text" required maxLength="100" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="bmd-label-floating">{showMessage('LABEL_CURRENCY_SYMBOL')}</label>
                                    <input className="form-control" type="text" required maxLength="100" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group row state">
                                    <div className="col-md-2"><label className="bmd-label-floating">{showMessage('LABEL_STATE')}</label></div>
                                    <div className="col-md-10">
                                        <select className="custom-select">
                                            <option>Active</option>
                                            <option>Disable</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                <div className="col-md-3 label-description"><label className="">{showMessage('LABEL_DESC_FIRST')}</label></div>
                                    <div className="col-md-9"><textarea className="form-control" cols="50" rows="5"></textarea></div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <div className="col-md-3 label-description"><label className="">{showMessage('LABEL_DESC_SECOND')}</label></div>
                                    <div className="col-md-9"><textarea className="form-control" cols="50" rows="5"></textarea></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                <div className="col-md-3 label-description"><label className="">{showMessage('LABEL_DESC_THIRD')}</label></div>
                                    <div className="col-md-9"><textarea className="form-control" cols="50" rows="5"></textarea></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 message <%= typeof isError !== 'undefined' && isError ? 'text-danger' : 'text-success' %>">
                                <span></span>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary pull-right">{showMessage('LABEL_APPLY')}</button>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        );
    }
}