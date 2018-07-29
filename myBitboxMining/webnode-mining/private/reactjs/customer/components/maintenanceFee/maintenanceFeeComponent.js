import React, {Component} from 'react';

// import component
import ProductItemComponent from '../customer_product/productItemComponent';

// import variable
import { API_URL } from '../../const/variable';

// import const
const showMessage = require('../../../../../global/ResourceHelper').showMessage;
const moment = require('moment');

export default class ListProductComponent extends Component {

    constructor (props) {
        super(props);
        this.state = {
            loaded: false,
            productItem: '',
            listProduct: []
        }
    }

    componentDidMount() {
        this._getListProduct();
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
        let page = pageContext.page;

        if (!this.state.loaded) screen = <i className="fa fa-spinner fa-spin fa-icon-loading"></i>
        else {
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
            <div className="col-lg-12 col-md-12">
                <div className="card">
                    {screen}
                </div>
            </div>
        );
    }
}