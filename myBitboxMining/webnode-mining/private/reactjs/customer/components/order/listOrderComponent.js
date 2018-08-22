import React, {Component} from 'react';

// import container
import OrderItemContainer from '../../containers/order/orderItemContainer';

// import variable
import { API_URL } from '../../const/variable';

// import const
const showMessage = require('../../../../../global/ResourceHelper').showMessage;

export default class ListOrderComponent extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        if (this.props.dataOrder.length <= 0) {
            this._getListOrder();
        } else {
            this.setState({loaded: true});
        }
    }

    async _getListOrder () {
        let url = API_URL + 'orders/list';
        try {
            let response = await fetch(url, {
                method: 'GET',
                credentials: 'same-origin'
            });
            let jsonData = await response.json();
            if (jsonData.status === 'success') {
                this.setState({
                    loaded: true
                });
                this.props.addListOrder(jsonData.data);
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

    render() {
        let screen = null;

        if (!this.state.loaded) screen = <i className="fa fa-spinner fa-spin fa-icon-loading"></i>
        else {
            screen = this.props.dataOrder.map((item, index)=> {
                return <OrderItemContainer dataOrder={item} key={index}/>;
            });
            screen = <React.Fragment>
                        <div className="card-header card-header-warning">
                            <h4 className="card-title">{showMessage('TITLE_CUSTOMER_ORDER')}</h4>
                            <p className="card-category"></p>
                        </div>
                        <div className="card-body table-responsive">
                            <table className="table table-hover text-center">
                                <thead className="text-warning">
                                    <tr>
                                        <th>{showMessage('RC_ID')}</th>
                                        <th>{showMessage('RC_NAME')}</th>
                                        <th>{showMessage('RC_HASHRATE')}</th>
                                        <th>{showMessage('RC_QUANTITY')}</th>
                                        <th>{showMessage('RC_DESCRIPTION')}</th>
                                        <th>{showMessage('RC_STATE')}</th>
                                        <th>{showMessage('RC_AMOUNT')}</th>
                                        <th>{showMessage('RC_PERIOD')}</th>
                                        <th>{showMessage('RC_CREATE_DATE')}</th>
                                        <th>{showMessage('RC_ACTION')}</th>
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
                <div className="card" >
                    {screen}
                </div>
            </div>
            
        );
    }
}