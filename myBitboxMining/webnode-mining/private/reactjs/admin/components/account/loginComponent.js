import React, {Component} from 'react';

// import variable
import { MAIN_URL } from '../../const/variable';

// import const
const showMessage = require('../../../../../global/FileHelper').showMessage;

export default class LoginComponent extends Component {
    constructor (props) {
        super(props);
        this.pageContext = typeof pageContext !== undefined ? pageContext : {}
        this.state = {
            message: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        try {
            let response = await fetch(MAIN_URL + 'admin/login', {
                method: 'POST',
                body: JSON.stringify({
                    email: document.getElementById('login-email').value,
                    password: document.getElementById('login-password').value
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            let jsonData = await response.json();
            if (jsonData) {
                let errorMessage = document.getElementById('error-message');
                if (jsonData.errCode === 1) {
                    errorMessage.className = 'text-danger';
                    errorMessage.innerHTML = jsonData.message;
                } else {
                    window.location.href ='/admin';
                }
            }
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        return(
            <div className="row justify-content-md-center">
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-header-product login-header">
                            <h4 className="card-title"><strong>{showMessage('LABEL_LOGIN_TITLE')}</strong></h4>
                        </div>
                        <div className="card-body">
                            <div id="login-alert" className="alert alert-danger col-sm-12"></div>
                            <form id="loginform" className="col-md-12" role="form" method="POST" onSubmit={this.handleSubmit}>
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                    <input id="login-email" type="email" className="form-control" name="email" placeholder={showMessage('LABEL_EMAIL')} required />
                                    <p className="error-email"></p>
                                </div>

                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                    <input id="login-password" type="password" className="form-control" name="password" placeholder={showMessage('LABEL_PASSWORD')}
                                        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[@!#$%^&])(?=.*[A-Z]).{8,50}$" required />
                                </div>
                                <div className="form-group">
                                    <p id="error-message"></p>
                                    <div className="col-sm-12 controls">
                                        <button id="btn-login" type="submit" className="btn btn-success">{showMessage('LABEL_BUTTON_LOGIN')}</button>
                                    </div>
                                </div>
                            </form>
                            <div className="card-footer">
                                <div className="stats">
                                    <a href="#" data-toggle="modal" data-target="#forgot-password">
                                        <span>{showMessage('LABEL_BUTTON_FORGOT_PASSWORD')}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
