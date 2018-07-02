import React, { Component } from 'react';

// import const
const language = require('../../../../../const/variableLabel');

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
            [e.target.name] : e.target.value
        });
    }

    async _submit() {
        await this.props._reloadPage()
    }

    render() {
        return(
            <React.Fragment>
            <div className="row">
                <a href="#" data-toggle="modal" data-target="#forgot-password" className="btn btn-round btn-success">
                    <i className="material-icons">add</i>
                    {language.en.RC_ADDWALLET}
                </a>
            </div>
            <div class="modal fade" id="forgot-password" tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-notify modal-success" role="document">
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