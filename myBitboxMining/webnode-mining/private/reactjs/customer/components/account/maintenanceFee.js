import React, { Component } from "react";
import Modal from 'react-modal'; 
import momemt from 'moment';

// import variable
import { API_URL } from '../../const/variable';
// import const
const showMessage = require('../../../../../global/ResourceHelper').showMessage;

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};
class MaintenanceFeeComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            modalIsOpen: false,
            maintain_data : null
        }
        this._getMaintainFee = this._getMaintainFee.bind(this);
        this._viewDetail = this._viewDetail.bind(this);
        this._openModal = this._openModal.bind(this);
        this._closeModal = this._closeModal.bind(this);
    }

    componentDidMount() {
        this._getMaintainFee();
        Modal.setAppElement('#notification');
    }

    async _getMaintainFee() {
        let url = API_URL + 'maintenances/maintenancefee';
        try {
            let response = await fetch(url, {
                method: 'GET',
                credentials: 'same-origin'
            });
            let jsonData = await response.json();
            if (jsonData.status === 'success' && jsonData.data !== null) {
                console.log(jsonData.data)
                this.setState({
                    loaded: true,
                    modalIsOpen: true,
                    maintain_data: jsonData.data
                });
            } else {
                console.log(jsonData.errMessage);
            }
        } catch (err) {
            console.log(err.errMessage);
        }
    }

    _viewDetail () {
        location.href = '/maintenance-fee';
    }

    async _openModal() {
        this.setState({modalIsOpen: true});
    }

    _closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
        // let show_maintain_fee = localStorage.getItem('show_maintain_fee');
        // if (show_maintain_fee !== null) {
        //     if (!show_maintain_fee.showed) {
        //         return null;
        //     } else {
        //         let expire = show_maintain_fee.expire;
        //         expire = Date.parse(expire);
        //         let diff = (Date.now() - expire) / 86400000;
        //         if (diff >= 1) {
        //             show_maintain_fee.expire = Date.now();
        //             show_maintain_fee.showed = true;
        //         } 
        //     }
        // }
        if (this.state.maintain_data === null) return null;
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this._closeModal}
                style={customStyles}>
                <div className="modal-content update-product-container">
                    <div className="modal-body text-center">
                        <img src="/images/maintainfee.png" alt="" />
                        <h2 className="text-center">{showMessage('TITLE_CUSTOMER_MAINTAINCE_FEE')}</h2>
                        <div className="form-group">
                            <p>
                                <span className="title">{showMessage('TITLE_AMOUNT_PAIR')}</span>
                                <span className="value">{this.state.maintain_data.symbol_currency + this.state.maintain_data.payment_amount}</span>
                            </p>
                            <p>
                                <span className="title">{showMessage('TITLE_PAYMENT_TERN')}</span>
                                <span className="value">{momemt(this.state.maintain_data.maturity).format('DD/MM/YYYY')}</span>
                            </p>
                            <i className="note">
                                {showMessage('NOTE_MAINTAIN_FEE')}
                            </i>
                        </div>
                        <div className="form-group">
                            <button onClick={this._viewDetail} type="button" name="recover-submit" className="btn btn-lg btn-primary btn-success" value={showMessage('BTN_DETAILS')}>{showMessage('BTN_DETAILS')}</button>
                            <button onClick={this._closeModal} type="button" name="recover-cancel" className="btn btn-lg btn-primary btn-dancer" value={showMessage('BTN_CLOSE')}>{showMessage('BTN_CLOSE')}</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default MaintenanceFeeComponent;