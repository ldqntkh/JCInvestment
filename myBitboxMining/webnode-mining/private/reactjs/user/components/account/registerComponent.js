import React, {Component} from 'react';


const urlCoinInfo = 'https://min-api.cryptocompare.com/data/top/exchanges/full?fsym={0}&tsym=USD';
export default class RegisterComponent extends Component {
    constructor (props) {
        super(props);
        this.pageContext = typeof pageContext !== undefined ? pageContext : {}
        this.state = {
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return(
            <div className="row justify-content-md-center">
                <div className="col-md-6 register-account-form">
                    <div className="card">
                        <div className="card-header card-header-primary">
                            <h4 className="card-title">Create user</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">(<span className="text-danger">*</span>) is required</div>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Username</label>
                                        <input type="text" name="username" className="form-control" maxlength="50" required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Email address <span className="text-danger">*</span></label>
                                        <input type="email" name="email" className="form-control" maxlength="50" required />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Full Name <span className="text-danger">*</span></label>
                                        <input type="text" name="fullname" className="form-control" maxlength="50" required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <select className="selectpicker">
                                            <option value="1">Admin</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Password <span className="text-danger">*</span></label>
                                        <input type="password" name="password" className="form-control" min-length="8" maxlength="50" required
                                            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[@!#$%^&])(?=.*[A-Z]).{8,50}$" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="bmd-label-floating">Confirm password</label>
                                        <input type="password" name="passwordconfirm" className="form-control" maxlength="50" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 message">
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary pull-right">Register</button>
                            <div className="clearfix"></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
