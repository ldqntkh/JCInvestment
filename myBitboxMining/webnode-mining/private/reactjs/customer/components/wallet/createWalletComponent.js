import React, { Component } from 'react';
import Modal from 'react-modal';

// import const
const showMessage = require('../../../../../global/ResourceHelper').showMessage;

// import const
import { API_URL } from '../../const/variable';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
export default class CreateWalletComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            wallet_address : '',
            wallet_name : '',
            err : '',
            modalIsOpen: false
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this._submit = this._submit.bind(this);
        this._handleChange = this._handleChange.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
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
                this.closeModal();
            }
        }
    }

    render() {
        return(
            <React.Fragment>
                {this.props.dataWallet.length === 0 &&
                <div className="row">
                    <a href="#" id="showModalWallet" onClick={this.openModal} className="btn btn-round btn-success">
                        <i className="material-icons">add</i>
                        {showMessage('RC_ADDWALLET')}
                    </a>
                </div>
                }
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <h3><i className="fa fa-folder fa-4x"></i></h3>
                            <h2 className="text-center">{showMessage('RC_ADD_NEW_WALLET')}</h2>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                                    <input name="wallet_address" placeholder={showMessage('WALLET_ADDRESS')} className="form-control"  type="input" value={this.state.wallet_address} onChange={this._handleChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                                    <input name="wallet_name" placeholder={showMessage('WALLET_NAME')} className="form-control"  type="input" value={this.state.wallet_name} onChange={this._handleChange}/>
                                </div>
                            </div>

                            {this.state.err === "" ? "" : this.state.err}
                            <div className="form-group">
                                <button onClick={this._submit} type="button" name="recover-submit" className="btn btn-lg btn-primary btn-success" value={showMessage('BTN_SUBMIT')}>{showMessage('BTN_SUBMIT')}</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}