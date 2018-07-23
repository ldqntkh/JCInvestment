import React, {Component} from 'react';

// import const
const showMessage = require('../../../../../global/ResourceHelper').showAdminMessage;

export default class CreateUserComponent extends Component {
    constructor (props) {
        super(props);
        this.pageContext = typeof pageContext !== undefined ? pageContext : {}
        this.state = {
            message: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let password = document.getElementById('password');
        let passwordConfirm = document.getElementById('password-confirm');
        if (password.value !== passwordConfirm.value) {
            this.setState({message: showMessage('ERROR_PASSWORD_CONFIRM_MESSAGE')});
        } else {
            document.getElementById('form-create-user').submit();
        }
    }

    render() {
        return(
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="row justify-content-md-center">
                        <div className="col-md-12 register-account-form">
                            <div className="card">
                                <div className="card-header card-header-primary">
                                    <h4 className="card-title">{showMessage('LABEL_CREATE_USER_TITLE')}</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">(<span className="text-danger">*</span>) {showMessage('LABEL_TEXT_IS_REQUIRED')}</div>
                                    </div>
                                    <form id="form-create-user" onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">{showMessage('LABEL_FORM_USERNAME')} <span className="text-danger">*</span></label>
                                                <input id="username" type="text" name="username" className="form-control" maxlength="50" required/>
                                                <p id="err-username"></p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">{showMessage('LABEL_FORM_EMAIL')} <span className="text-danger">*</span></label>
                                                <input id="email" type="email" name="email" className="form-control" maxlength="50" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">{showMessage('LABEL_FORM_PASSWORD')} <span className="text-danger">*</span></label>
                                                <input id="password" type="password" name="password" className="form-control" min-length="8" maxlength="50" required
                                                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[@!#$%^&])(?=.*[A-Z]).{8,50}$" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">{showMessage('LABEL_FORM_PASSWORD_CONFIRM')}</label>
                                                <input id="password-confirm" type="password" name="passwordconfirm" className="form-control" maxlength="50" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">{showMessage('LABEL_FORM_FULLNAME')} <span className="text-danger">*</span></label>
                                                <input id="full-name" type="text" name="fullname" className="form-control" maxlength="50" required />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="bmd-label-floating">{showMessage('LABEL_FORM_PHONENUMBER')}</label>
                                                <input id="phone" type="tel" name="phone" class="form-control" maxlength="11" pattern="\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{5})" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 text-danger">{this.state.message}</div>
                                    </div>
                                    <button type="submit" className="btn btn-primary pull-right">{showMessage('LABEL_BUTTON_CREATE')}</button>
                                    <div className="clearfix"></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
