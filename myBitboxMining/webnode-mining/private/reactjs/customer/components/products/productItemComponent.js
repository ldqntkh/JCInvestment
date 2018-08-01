import React, {Component} from 'react';

// import const
import { MAIN_URL } from '../../const/variable';

// import const
const showMessage = require('../../../../../global/ResourceHelper').showMessage;

export default class ProductItemComponent extends Component {

    constructor(props) {
        super(props);

        this._onSubmit = this._onSubmit.bind(this);
    }

    _onSubmit() {
        // post data product to server. Not use api
        let product = this.props.dataProduct;
        document.getElementById("form-buy-product-" + product.id).submit();
    }

    render() {
        let product = this.props.dataProduct;
        let priceBook = this.props.dataPriceBook;
        return(
            <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="card cart-product">
                    <div className="card-header-product">
                        <h4 className="col-lg-11 card-title">
                            <strong>{showMessage('RC_ADDON')}</strong><br/>
                            <span>{ priceBook.name.toUpperCase() }</span>
                        </h4>
                        <button className="btn-buy btn btn-primary btn-md" onClick={this._onSubmit}>{showMessage('RC_BUY')}</button>
                    </div>
                    <div className="produt-price-container">
                        <h4 className="card-category">
                            <span className="text-primary">{showMessage('RC_PERIOD_LABEL')}</span><span> {product.period} {product.period > 1 ? showMessage('RC_MONTHS') : showMessage('RC_MONTH')}</span>
                        </h4>
                        {priceBook.price !== priceBook.sale_price ? 
                            <React.Fragment>
                                <h4 className="card-category">
                                    <span className="product-price-label">{showMessage('RC_PRICE')}</span>
                                    <del>{priceBook.symbol_currency}{priceBook.price}</del>
                                </h4>
                                <h4 className="card-category">
                                    <span className="product-price-label">{showMessage('RC_SALE_PRICE')}</span>
                                    {priceBook.symbol_currency + priceBook.sale_price}
                                </h4>
                            </React.Fragment>
                        : 
                            <React.Fragment>
                                <h4 className="card-category">
                                    <span className="product-price-label">{showMessage('RC_PRICE')}</span>
                                    {priceBook.symbol_currency + priceBook.price}
                                </h4>
                                <h4></h4>
                            </React.Fragment>
                        }
                        {priceBook.maintenance_fee > 0 && <h4 className="card-category maintenance-fee">
                            <span className="text-primary">{showMessage('LABEL_MAINTENANCE_FEE')}</span>
                            <span className="maintenance-fee-value">{priceBook.symbol_currency + priceBook.maintenance_fee + '/' + showMessage('RC_MONTH')}</span>
                        </h4>}
                    </div>
                    <div className="card-body">
                        {(priceBook.desc1 && priceBook.desc1 !== '') && <p className="card-category">
                            { priceBook.desc1 }
                        </p>}

                        { priceBook.desc2 && priceBook.desc2 !== '' && <p className="card-category">
                            {priceBook.desc2}
                        </p> }
                        { priceBook.desc3 && priceBook.desc3 !== '' && <p className="card-category">
                            {priceBook.desc3}
                        </p> }
                    </div>
                    <div className="card-footer">
                        <img src="/images/paypal-mini.png" alt="buy now" onClick={this._onSubmit}/>
                    </div>
                </div>
                <form id={"form-buy-product-" + product.id} method="POST" action={ MAIN_URL + 'products/' + product.id + '/buy' }>
                </form>
            </div>
        );
    }
}