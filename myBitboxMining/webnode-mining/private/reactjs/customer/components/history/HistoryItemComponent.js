import React, {Component} from 'react';
const moment = require('moment');
export default class HistoryItemComponent extends Component {

    render() {
        let history = this.props.dataHistory;
        return(
            <tr>
                <td>{history.id}</td>
                <td dangerouslySetInnerHTML={{__html: history.description}} />
                <td>{moment(history.createAt).format('DD/MM/YYYY')}</td>
            </tr>
        );
    }
}