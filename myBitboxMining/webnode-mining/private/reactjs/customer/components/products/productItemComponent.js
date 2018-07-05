import React, {Component} from 'react';

// import const
import { MAIN_URL } from '../../const/variable';

// import const
const language = require('../../../../../const/variableLabel');

export default class ProductItemComponent extends Component {

    constructor(props) {
        super(props);
    }

    _onSubmit(productId) {
        // post data product to server. Not use api
        document.getElementById("form-buy-product-" + productId).submit();
    }

    render() {
        let product = this.props.dataProduct;
        return(
            <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card cart-product">
                    <div className="card-header-product">
                        <h4 className="card-title">
                            <strong>{language.en.RC_ADDON}</strong><br/>
                            <span>{ product.name.toUpperCase() }</span>
                        </h4>
                        <h3>
                            <span>{language.en.RC_PRICE}</span>
                            {product.sale_price !== null ? <React.Fragment><del>{product.symbol_currency}{product.price}</del>{product.symbol_currency}{product.sale_price}</React.Fragment> : product.symbol_currency + product.price}
                        </h3>
                        <button className="btn-buy" onClick={() => this._onSubmit(product.id)}>{language.en.RC_BUY}</button>
                    </div>
                    <div className="card-body">
                        <p className="card-category">
                            { product.desc1 }
                        </p>
                        { product.desc2 && <p className="card-category">
                            {product.desc2}
                        </p> }
                        { product.desc3 && <p className="card-category">
                            {product.desc3}
                        </p> }
                    </div>
                    <div className="card-footer">
                        <img src="http://mybitbox888.vn/wp-content/uploads/2018/06/paynow-l.png" alt="buy now" onClick={() => this._onSubmit(product.id)}/>
                    </div>
                </div>
                <form id={"form-buy-product-" + product.id} method="POST" action={ MAIN_URL + 'products/' + product.id + '/buy' }>
                </form>
            </div>
        );
    }
}