import React, {Component} from 'react';

export default class EthExchangeComponent extends Component {

    constructor(props) {
        super(props);
    }
    render () {
        return (
            <React.Fragment>
                <div class="col-lg-3 col-md-6 col-sm-6">
                    <div class="card card-stats" id="eth-exchange">
                        <div className="card-header card-header-danger card-header-icon">
                            <div className="card-icon">
                                <i className="fa fa-usd"></i>
                            </div>
                            <p className="card-category">ETH price</p>
                            {
                                !this.props.loaded ? <i className="fa fa-spinner fa-spin fa-icon-loading"></i>
                                : <h3 className="card-title">${this.props.ethPrice}</h3> 
                            }
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                                <i className="material-icons">local_offer</i> Price of Coinmarket
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}