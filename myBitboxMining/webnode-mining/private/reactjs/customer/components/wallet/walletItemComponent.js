import React, { Component } from "react";
import { confirmAlert } from 'react-confirm-alert'; 


// import language
const language = require('../../../../../const/variableLabel');

// import const
import { API_URL } from '../../const/variable';

export default class WalletItemComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // wallet_address : '',
            // wallet_name : '',
            err : ''
        }
   
        this.RemoveWallet = this.RemoveWallet.bind(this);
        this.submitDeleteWallet = this.submitDeleteWallet.bind(this);
        this.submitEditWallet = this.submitEditWallet.bind(this);
    }

    async RemoveWallet(walletItem, callback) {
        try {
            let result = await fetch(API_URL + 'wallets/' + walletItem.id + '/delete',{
                                        method: 'GET',
                                        credentials: 'same-origin'
                                    });
            let responsejson = await result.json();
            if (responsejson.status === 'success') {
                this.props.deleteWalletItem(walletItem);
            } else {
                this.setState({
                    err : err.message
                });
            }
            callback();
        } catch (err) {
            this.setState({
                err : err.message
            });
            callback();
        }
    }
    submitEditWallet() {
        this.props.OpenUpdateWallet(this.props.walletItem);
    }

    async submitDeleteWallet() {
        let walletItem = this.props.walletItem;
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>{language.en.AL_TITLE_CONFIRM}</h1>
                        <p> {language.en.AL_TITLE_DESC.replace('{0}', 'wallet name: ' + walletItem.walletName)} </p>
                        <div className="form-group">
                            <button onClick={()=> { onClose();}} type="button" name="recover-submit" className="btn btn-lg btn-primary" value={language.en.AL_BTN_NO}>{language.en.AL_BTN_NO}</button>
                            <button onClick={() => {
                                    this.RemoveWallet(walletItem, onClose);
                                }} type="button" name="recover-cancel" className="btn btn-lg btn-primary btn-success" value={language.en.AL_BTN_YES}>{language.en.AL_BTN_YES}</button>
                        </div>
                    </div>
                )
            }
        })
    };

    render() {
        let item = this.props.walletItem;
        return (
            <tr>
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
                    <button type="button" rel="tooltip" title="" className="btn btn-primary btn-link btn-sm" data-original-title="Edit Wallet" onClick={this.submitEditWallet}>
                        <i className="material-icons">edit</i>
                    </button>
                    <button type="button" rel="tooltip" title="" className="btn btn-danger btn-link btn-sm" data-original-title="Remove" onClick={this.submitDeleteWallet}>
                        <i className="material-icons">close</i>
                    </button>
                </td>
            </tr>
        );
    }
}