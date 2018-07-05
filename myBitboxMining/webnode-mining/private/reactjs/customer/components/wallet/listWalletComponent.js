import React, { PureComponent } from "react";
import Modal from 'react-modal';
// import container
import WalletItemContainer from '../../containers/wallet/walletItemContainer';

// import language
const language = require('../../../../../const/variableLabel');

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
export default class ListWalletComponent extends PureComponent {

    constructor(props) {
        super(props);
        
        this.state = {
            wallet_address : '',
            wallet_name : '',
            loaded : false,
            modalIsOpen: false,
            walletItem : null
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
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

    _handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value,
            err : ''
        });
    }

    openModal(walletItem) {
        this.setState({
            wallet_address : walletItem.walletAddress,
            wallet_name : walletItem.walletName,
            walletItem : walletItem,
            modalIsOpen: true
        });
    }

    closeModal() {
        this.setState({modalIsOpen: false, walletItem: null});
    }

    async UpdateWallet(walletItem) {
        let result = await fetch(API_URL + 'wallets/' + walletItem.id + '/update', {
            method : 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                walletItem: walletItem
            })
        });
        let dataJson = await result.json();
        console.log(dataJson)
        if (dataJson.status !== "success") {
            this.setState({
                err : dataJson.errMessage
            })
        } else {
            console.log(this.props)
            this.props.updateWalletItem(dataJson.data);
        }
        this.closeModal();
    }

    async _onSubmit() {
        if (this.state.wallet_address === '' || this.state.wallet_name === '') {
            this.setState({
                err : 'Please input value for all fiels'
            })
        } else {
            let walletItem = this.state.walletItem;
            walletItem.walletAddress = this.state.wallet_address;
            walletItem.walletName = this.state.wallet_name;
            this.UpdateWallet(walletItem);
        }
    }

    render() {
        return(
            <React.Fragment>
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
                                                return (<WalletItemContainer walletItem={item} key={index} OpenUpdateWallet={this.openModal}/>)
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <h3><i className="fa fa-folder fa-4x"></i></h3>
                            <h2 className="text-center">{language.en.AL_TITLE_EDIT_WALLET}</h2>
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
                            <div className="form-group">
                                <button onClick={this._onSubmit} type="button" name="recover-submit" className="btn btn-lg btn-primary btn-success" value={language.en.BTN_SUBMIT}>{language.en.BTN_SUBMIT}</button>
                                <button onClick={this.closeModal} type="button" name="recover-cancel" className="btn btn-lg btn-primary btn-dancer" value={language.en.AL_BTN_CANCEL}>{language.en.AL_BTN_CANCEL}</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}