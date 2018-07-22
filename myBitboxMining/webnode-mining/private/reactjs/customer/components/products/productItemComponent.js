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
            <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card cart-product">
                    <div className="card-header-product">
                        <h4 className="card-title">
                            <strong>{showMessage('RC_ADDON')}</strong><br/>
                            <span>{ priceBook.name.toUpperCase() }</span>
                        </h4>
                        <h3>
                            <span>{showMessage('RC_PRICE')}</span>
                            {priceBook.sale_price !== null ? <React.Fragment><del>{priceBook.symbol_currency}{priceBook.price}</del>{priceBook.symbol_currency}{priceBook.sale_price}</React.Fragment> : priceBook.symbol_currency + priceBook.price}
                        </h3>
                        <button className="btn-buy" onClick={this._onSubmit}>{showMessage('RC_BUY')}</button>
                    </div>
                    <div className="card-body">
                        <p className="card-category">
                            { priceBook.desc1 }
                        </p>
                        { priceBook.desc2 && <p className="card-category">
                            {priceBook.desc2}
                        </p> }
                        { priceBook.desc3 && <p className="card-category">
                            {product.desc3}
                        </p> }
                    </div>
                    <div className="card-footer">
                        <img src="http://mybitbox888.vn/wp-content/uploads/2018/06/paynow-l.png" alt="buy now" onClick={this._onSubmit}/>
                    </div>
                </div>
                <form id={"form-buy-product-" + product.id} method="POST" action={ MAIN_URL + 'products/' + product.id + '/buy' }>
                </form>
            </div>
        );
    }
}