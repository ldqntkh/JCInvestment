import React, {Component} from 'react';

// import component
import ProductItemComponent from './productItemComponent';

// import variable
import { API_URL } from '../../const/variable';

// import const
const language = require('../../../../../const/variableLabel');

export default class ListProductComponent extends Component {

    constructor (props) {
        super(props);
        this.state = {
            loaded: false,
            listProduct: []
        }
    }

    componentDidMount() {
        this._getListProduct();
    }

    async _getListProduct () {
        let url = API_URL + 'products/product_of_customer';
        try {
            let response = await fetch(url);
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
        if (!this.state.loaded) screen = <i className="fa fa-spinner fa-spin fa-icon-loading"></i>
        else {
            screen = this.state.listProduct.map((item, index)=> {
                return <ProductItemComponent dataProduct={item} key={index} />;
            });
            screen = <React.Fragment>
                        <div className="card-header card-header-warning">
                            <h4 className="card-title">{language.en.TITLE_MY_PRODUCT}</h4>
                            <p className="card-category"></p>
                        </div>
                        <div className="card-body table-responsive">
                            <table className="table table-hover">
                                <thead className="text-warning">
                                    <th>{language.en.RC_ID}</th>
                                    <th>{language.en.RC_NAME}</th>
                                    <th>{language.en.RC_HASHRATE}</th>
                                    <th>{language.en.RC_ACTIVE}</th>
                                    <th>{language.en.RC_PERIOD}</th>
                                    <th>{language.en.RC_START_DATE}</th>
                                    <th>{language.en.RC_END_DATE}</th>
                                </thead>
                                <tbody>
                                    {screen}
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                                <i className="material-icons">access_time</i> {language.en.RC_REFRESH}
                            </div>
                        </div>
                    </React.Fragment>
        }
        
        return (
            screen
        );
    }
}