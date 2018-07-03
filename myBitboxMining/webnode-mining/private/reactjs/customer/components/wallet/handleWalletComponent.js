import React, { Component } from 'react';
import $ from 'jquery';
// import const
const language = require('../../../../../const/variableLabel');

// import const
import { API_URL } from '../../const/variable';

export default class CreateWalletComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            wallet_address : '',
            wallet_name : '',
            err : ''
        }

        this._submit = this._submit.bind(this);
        this._handleChange = this._handleChange.bind(this);
    }

    _handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value,
            err : ''
        });
    }

    async _submit() {
        if (this.state.wallet_address === '' || this.state.wallet_name === '') {
            this.setState({
                err : 'Please input value for all fiels'
            })
        } else {
            let result = await fetch(API_URL + 'wallets/add-wallet', {
                method : 'POST',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    wallet_address: this.state.wallet_address,
                    wallet_name: this.state.wallet_name
                })
            });

            let dataJson = await result.json();
            if (dataJson.status !== "success") {
                this.setState({
                    err : dataJson.errMessage
                })
            } else {
                this.props.addItemWallet(dataJson.data);
                $('#close-modal').click();
            }
        }
    }

    render() {
        return(
            <React.Fragment>
            <div className="row">
                <a href="#" data-toggle="modal" data-target="#handle-wallet" className="btn btn-round btn-success">
                    <i className="material-icons">add</i>
                    {language.en.RC_ADDWALLET}
                </a>
            </div>
            <div class="modal fade" id="handle-wallet" tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-notify modal-success" role="document">
                    <div className="modal-header">
                        <button type="button" className="close" id="close-modal" data-dismiss="modal" aria-label="Close">
                            <i className="material-icons">close</i>
                        </button>
                    </div>
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <h3><i className="fa fa-folder fa-4x"></i></h3>
                            <h2 className="text-center">{language.en.RC_ADD_NEW_WALLET}</h2>

                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                                    <input name="wallet_address" placeholder={language.en.WALLET_ADDRESS} className="form-control"  type="input" value={this.state.wallet_address} onChange={this._handleChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                                    <input name="wallet_name" placeholder={language.en.WALLET_NAME} className="form-control"  type="input" value={this.state.wallet_name} onChange={this._handleChange}/>
                                </div>
                            </div>

                            {this.state.err === "" ? "" : this.state.err}
                            <div class="form-group">
                                <button onClick={this._submit} type="button" name="recover-submit" className="btn btn-lg btn-primary btn-success" value={language.en.BTN_SUBMIT}>{language.en.BTN_SUBMIT}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </React.Fragment>
        );
    }
}