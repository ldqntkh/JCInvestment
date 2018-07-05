import React, {Component} from 'react';

// import const
const showMessage = require('../../../../../global/ResourceHelper').showMessage;

export default class UnpaipBalanceComponent extends Component {

    render () {
        let unpaidBalance = 0;
        if (typeof pageContext !== 'undefined') {
            unpaidBalance = pageContext.unpaidBalance;
        }
        return (
            <React.Fragment>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card card-stats">
                        <div className="card-header card-header-success card-header-icon">
                            <div className="card-icon">
                                <i className="fa fa-btc"></i>
                            </div>
                            <p className="card-category">{showMessage('RC_UNPAID_BALANCE')}</p>
                            <h3 className="card-title">{unpaidBalance} ETH</h3>
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                                <i className="material-icons">date_range</i> {showMessage('RC_LAST_24H')}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}