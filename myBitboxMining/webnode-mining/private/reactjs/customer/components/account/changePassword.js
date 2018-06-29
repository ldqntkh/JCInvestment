import React, {Component} from 'react';

export default class ChangePassword extends Component {
    constructor (props) {
        super(props);
        this.pageContext = typeof pageContext !== undefined ? pageContext : {};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let password = document.getElementById('password').value;
        let passwordConfirm = document.getElementById('passwordconfirm').value;
        if (password !== passwordConfirm) {
            document.getElementById('errPasswordConfirm').innerHTML = 'Your confirm password is not match. Please try again';
        } else {
            document.getElementById('form-change-password').submit();
        }
    }

    render() {
        return(
            <div className="container-fluid register-account-container">
                <div className="row justify-content-md-center">
                    <div className="col-md-6 register-account-form">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title">Change password</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">(<span className="text-danger">*</span>) is required</div>
                                </div>
                                <form id="form-change-password" method="POST" onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">Password <span className="text-danger">*</span></label>
                                                <input id="password" type="password" name="password" className="form-control" min-length="8" maxlength="50" required
                                                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[@!#$%^&])(?=.*[A-Z]).{8,50}$" />
                                                <p id="errPassword" className="text-danger"></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">Confirm password</label>
                                                <input id="passwordconfirm" type="password" name="passwordconfirm" className="form-control" maxlength="50" />
                                                <p id="errPasswordConfirm" className="text-danger"></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <button type="submit" className="btn btn-primary pull-right">Change password</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}