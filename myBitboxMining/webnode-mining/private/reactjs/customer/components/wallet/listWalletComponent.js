import React, { Component } from "react";

// import language
const language = require('../../../../../const/variableLabel');

export default class ListWalletComponent extends Component {

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
                                            <th> ID </th>
                                            <th> Name </th>
                                            <th> Wallet address </th>
                                            <th> Total hashrate </th>
                                            <th> Total balance </th>
                                            <th> Actions </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        <tr>
                                            <td>
                                                1
                                            </td>
                                            <td>
                                                Dakota Rice
                                            </td>
                                            <td>
                                                Niger
                                            </td>
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
                                        </tr>
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