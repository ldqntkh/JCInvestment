import React, {Component} from 'react';

export default class HashingComponent extends Component {

    render () {
        let totalHs = 0;
        if (typeof pageContext !== 'undefined') {
            totalHs = pageContext.totalHs;
        }
        return (
            <React.Fragment>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card card-stats">
                        <div className="card-header card-header-warning card-header-icon">
                            <div className="card-icon">
                                <i className="material-icons">content_copy</i>
                            </div>
                            <p className="card-category">Hashrate (MH/S)</p>
                            <h3 className="card-title"> {totalHs}
                                <small>Mh/s</small>
                            </h3>
                        </div>
                        <div className="card-footer">
                            <div className="stats">
                                <i className="material-icons text-danger">warning</i>
                                <a href="#pablo">Get more hashing...</a>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}