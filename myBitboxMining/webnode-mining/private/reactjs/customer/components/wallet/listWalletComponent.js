import React, { Component } from "react";

// import language
const language = require('../../../../../const/variableLabel');

// import const
import { API_URL } from '../../const/variable';

export default class ListWalletComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded : false
        }

        this.reloadPage = this.reloadPage.bind(this);
    }

    componentDidMount() {
        this.reloadPage();
    }

    async reloadPage() {
        this.setState({
            loaded: false
        })
        let result = await fetch(API_URL + 'wallets/list', {
            method: 'GET',
            credentials: 'same-origin'
        });
        let dataJson = await result.json();
        if (dataJson.status !== 'success') {
            console.log(dataJson.errMessage)
        }
        let data = dataJson.data === null ? [] : dataJson.data;
        this.props.addListWallet(data);

        this.setState({
            loaded: true
        })
    }

    render() {
        return(
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header card-header-primary">
                            <h4 className="card-title ">{language.en.RC_TABLE_WALLET}</h4>
                            <p className="card-category"> Here is a subtitle for this table</p>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className=" text-primary text-center">
                                        <tr>
                                            <th> {language.en.RC_ID} </th>
                                            <th> {language.en.RC_NAME} </th>
                                            <th> {language.en.RC_WALLET_ADDRESS} </th>
                                            <th> {language.en.RC_TOTAL_HASHRATE} </th>
                                            <th> {language.en.RC_TOTAL_BALANCE} </th>
                                            <th> {language.en.RC_ACTION} </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {this.props.dataWallet.map((item, index) => {
                                            return (<tr key={index}>
                                                        <td> {item.id} </td>
                                                        <td> {item.walletName} </td>
                                                        <td> {item.walletAddress.substr(0,15) + '...'} </td>
                                                        <td>
                                                            Oud-Turnhout
                                                        </td>
                                                        <td className="text-primary">
                                                            $36,738
                                                        </td>
                                                        <td className="td-actions">
                                                            <button type="button" rel="tooltip" title="" className="btn btn-primary btn-link btn-sm" data-original-title="Edit Task">
                                                                <i className="material-icons">edit</i>
                                                            </button>
                                                            <button type="button" rel="tooltip" title="" className="btn btn-danger btn-link btn-sm" data-original-title="Remove">
                                                                <i className="material-icons">close</i>
                                                            </button>
                                                        </td>
                                                    </tr>)
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}