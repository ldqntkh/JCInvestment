import React, { Component } from "react";
import Modal from 'react-modal'; 

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
            modalIsOpen: false
        }
        this._getMaintainFee = this._getMaintainFee.bind(this);
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
            if (jsonData.status === 'success') {
                this.setState({
                    loaded: true,
                    modalIsOpen: true
                });
            } else {
                console.log(jsonData.errMessage);
            }
        } catch (err) {
            console.log(err.errMessage);
        }
    }

    async _openModal() {
        this.setState({modalIsOpen: true});
    }

    _closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
        let show_maintain_fee = localStorage.getItem('show_maintain_fee');
        if (show_maintain_fee !== null) {
            if (!show_maintain_fee.showed) {
                return null;
            } else {
                let expire = show_maintain_fee.expire;
                expire = Date.parse(expire);
                let diff = (Date.now() - expire) / 86400000;
                if (diff >= 1) {
                    show_maintain_fee.expire = Date.now();
                    show_maintain_fee.showed = true;
                } 
            }
        }
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this._closeModal}
                style={customStyles}>
                <div className="modal-content update-product-container">
                    <div className="modal-body text-center">
                        <img src="/images/maintainfee.png" alt="" />
                        <h2 className="text-center">{showMessage('RC_UPDATE_PRODUCT')}</h2>
                        <div className="form-group">

                        </div>
                        <div className="form-group">
                            <button onClick={this._onSubmit} type="button" name="recover-submit" className="btn btn-lg btn-primary btn-success" value={showMessage('BTN_SUBMIT')}>{showMessage('BTN_SUBMIT')}</button>
                            <button onClick={this._closeModal} type="button" name="recover-cancel" className="btn btn-lg btn-primary btn-dancer" value={showMessage('AL_BTN_CANCEL')}>{showMessage('AL_BTN_CANCEL')}</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default MaintenanceFeeComponent;