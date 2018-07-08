import React, {Component} from 'react';

// import component
import HistoryItemComponent from './HistoryItemComponent';

// import variable
import { API_URL } from '../../const/variable';

// import const
const showMessage = require('../../../../../global/ResourceHelper').showMessage;

export default class ListHistoryComponent extends Component {

    constructor (props) {
        super(props);
        this.state = {
            loaded: false,
            listHistory: []
        }
    }

    componentDidMount() {
        this._getListHistory();
    }

    async _getListHistory () {
        let url = API_URL + 'customerhistories/list';
        try {
            let response = await fetch(url, {
                method: 'GET',
                credentials: 'same-origin'
            });
            let jsonData = await response.json();
            if (jsonData.status === 'success') {
                this.setState({
                    loaded: true,
                    listHistory: jsonData.data
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
            console.log(err.message);
        }
    } 

    render() {
        let screen = null;

        if (!this.state.loaded) screen = <i className="fa fa-spinner fa-spin fa-icon-loading"></i>
        else {
            screen = this.state.listHistory.map((item, index)=> {
                return <HistoryItemComponent dataHistory={item} key={index}/>;
            });
            screen = <React.Fragment>
                        <div className="card-header card-header-primary">
                            <h4 className="card-title">{showMessage('TITLE_CUSTOMER_HISTORY')}</h4>
                            <p className="card-category"></p>
                        </div>
                        <div className="card-body table-responsive">
                            <table className="table table-hover text-center">
                                <thead className="text-warning">
                                    <tr>
                                        <th>{showMessage('RC_ID')}</th>
                                        <th>{showMessage('RC_DESCRIPTION')}</th>
                                        <th>{showMessage('RC_CREATE_DATE')}</th>
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
            screen
        );
    }
}