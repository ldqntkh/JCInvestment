import React, {Component} from 'react';

// import component
import ProductItemComponent from './productItemComponent';

// import variable
import { API_URL } from '../../const/variable';

const showMessage = require('../../../../../global/ResourceHelper').showMessage;

export default class ListProductComponent extends Component {

    constructor (props) {
        super(props);
        this.state = {
            loaded: false,
            listProduct: [],
            localeId: 'en'
        }
    }

    componentDidMount() {
        this._getListProduct();
    }

    async _getListProduct () {
        let url = API_URL + 'products/list';
        try {
            let response = await fetch(url, {
                method: 'GET',
                credentials: 'same-origin'
            });
            let jsonData = await response.json();
            if (jsonData.status === 'success') {
                this.setState({
                    loaded: true,
                    listProduct: jsonData.data
                });
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

    render () {
        let screen = null;
        let listProduct = this.state.listProduct;
        let productsWithMaintenanceFee = [];
        let productsNotMaintenanceFee = [];
        let product = '';
        let screenProductWithMaintenanceFee = null;
        let screenProductNotMaintenanceFee = null;
        for (var index in listProduct) {
            product = listProduct[index];
            let indexOfPriceBook = product.pricebooks.findIndex(item => item.localeId === this.state.localeId); // return -1 if not match condition
            let priceBook = product.pricebooks[indexOfPriceBook];
            if (priceBook.maintenance_fee === 0) {
                productsWithMaintenanceFee.push(product);
            } else {
                productsNotMaintenanceFee.push(product);
            }
        }
        if (!this.state.loaded) screen = <i className="fa fa-spinner fa-spin fa-icon-loading"></i>
        else {
            screenProductWithMaintenanceFee = productsWithMaintenanceFee.map((item, index)=> {
                let indexOfPriceBook = item.pricebooks.findIndex(item => item.localeId === this.state.localeId); // return -1 if not match condition
                let priceBook = item.pricebooks[indexOfPriceBook];
                if (typeof priceBook !== 'undefined') {
                    return <ProductItemComponent dataPriceBook={priceBook} dataProduct={item} key={index} />;
                }
            });

            screenProductNotMaintenanceFee = productsNotMaintenanceFee.map((item, index)=> {
                let indexOfPriceBook = item.pricebooks.findIndex(item => item.localeId === this.state.localeId); // return -1 if not match condition
                let priceBook = item.pricebooks[indexOfPriceBook];
                if (typeof priceBook !== 'undefined') {
                    return <ProductItemComponent dataPriceBook={priceBook} dataProduct={item} key={index} />;
                }
            });
        }
        return (
            screen !== null ? 
            screen :
            <div>
                <h3 className="text-primary">{showMessage('RC_OUR_SERVICES')}</h3>
                {screenProductWithMaintenanceFee !== null && screenProductWithMaintenanceFee.length > 0 && <div>
                    <h4 className="text-secondary">{showMessage('LABEL_PRODUCT_INCLUDED_MAINTAINCE_FEE')}</h4>
                    <div className="row">
                        {screenProductWithMaintenanceFee}
                    </div>
                </div>}
                {screenProductNotMaintenanceFee !== null && screenProductNotMaintenanceFee.length > 0 && <div>
                    <h4 className="text-secondary">{showMessage('LABEL_PRODUCT_WITHOUT_MAINTAINCE_FEE')}</h4>
                    <div className="row">
                        {screenProductNotMaintenanceFee}
                    </div>
                </div>}
            </div>
        );
    }
}