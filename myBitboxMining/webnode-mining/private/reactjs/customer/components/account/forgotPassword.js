import React, {Component} from 'react';
// import const
const language = require('../../../../../const/variableLabel');

export default class ForgotPassword extends Component {
    constructor (props) {
        super(props);
        this.pageContext = typeof pageContext !== undefined ? pageContext : {};
        this.state = {
            email: '',
            message: '',
            errCode: 0
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange= this.handleChange.bind(this);
    }

    async handleSubmit() {
        let email = this.state.email;
        
        if (email === '') {
            this.setState({
                emailError: language.en.RC_EMAIL_RESET_PASS_REQUIRED
            });
        } else {
            try {
                let url = 'http://localhost:3030/resetpassword';
                let response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({email: email}),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                });
                let dataJson = await response.json();
                if (dataJson) {
                    this.setState({
                        message: dataJson.message,
                        errCode: dataJson.errCode
                    });
                }
            } catch(err) {
                console.log(err);
            }
        }
    }

    handleChange(event) {
        this.setState({email: event.target.value});
    }

    render() {
        let errMsgSection = null;
        if (this.state.message !== '' ) {
            errMsgSection = <p className={this.state.errCode > 0 ? 'text-danger' : 'text-success'}>{this.state.message}</p>
        }

        return(
            <div className="modal-dialog modal-notify modal-success" role="document">
                <div className="modal-content">
                    <div className="modal-body text-center">
                        <h3><i className="fa fa-lock fa-4x"></i></h3>
                        <h2 className="text-center">{language.en.TITLE_FORGOT_PASS}</h2>
                        <p>{language.en.TITLE_FORGOT_PASS_DESC}</p>

                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                                <input placeholder="Email address" className="form-control"  type="email" value={this.state.value} onChange={this.handleChange}/>
                            </div>
                        </div>
                        {errMsgSection}
                        <div class="form-group">
                            <button type="button" name="recover-submit" className="btn btn-lg btn-primary btn-success" value={language.en.TITLE_RESET_PASSWORD} onClick={this.handleSubmit}>{language.en.TITLE_RESET_PASSWORD}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}