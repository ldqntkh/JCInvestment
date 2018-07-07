import React, {Component} from 'react';

// import const
const showMessage = require('../../../../../global/ResourceHelper').showMessage;

export default class EthExchangeComponent extends Component {

    constructor(props) {
        super(props);
    }
    render () {
        return (
            <React.Fragment>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card card-stats" id="eth-exchange">
                        <div className="card-header card-header-danger card-header-icon">
                            <div className="card-icon">
                                <i className="fa fa-usd"></i>
                            </div>
                            <p className="card-category">{showMessage('RC_ETH_PRICE')}</p>
                            {
                                !this.props.loaded ? <i className="fa fa-spinner fa-spin fa-icon-loading"></i>
                                : <h3 className="card-title">${this.props.ethPrice}</h3> 
                            }
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                                <i className="material-icons">local_offer</i> {showMessage('RC_PRICE_COINMARKET')}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}