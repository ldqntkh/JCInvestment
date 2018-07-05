import React, {Component} from 'react';

// import const
const language = require('../../../../../const/variableLabel');

export default class MyEthValueComponent extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <React.Fragment>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card card-stats">
                        <div className="card-header card-header-info card-header-icon">
                            <div className="card-icon">
                                <i className="fa fa-usd"></i>
                            </div>
                            <p className="card-category">{language.en.RC_ETH_VALUE}</p>
                            {
                                !this.props.loaded ? <i className="fa fa-spinner fa-spin fa-icon-loading"></i>
                                : <h3 className="card-title">${(this.props.ethPrice * this.props.unpaidBalance).toFixed(2)}</h3>
                            }
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                                <i className="material-icons">update</i>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}