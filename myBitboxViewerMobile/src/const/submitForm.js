import React from 'react'
import {
    AsyncStorage
} from 'react-native';
import { SubmissionError } from 'redux-form';
import {
    required,
    email,
    number,
    maxLength, 
    minLength
} from '../validator/validationFields'

import {
    API_URL,
    KEY_USER_LOGIN,
    ACCOUNT_LOGIN
} from '../const/variable';

import { encrypt } from './handleString'

const submitRegisterAccount = async (value) => {
    value.level = 1;
    value.phone = '';
    value.fullname = '';
    let data = {
        method: 'POST',
        body: JSON.stringify({
            'user': value
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return await fetch(API_URL + 'users/register', data)
    .then(response => response.json())  // promise
    .then(async json => {
        if (json.errCode == 1) {
            return new SubmissionError({
                hiddenField: json.errMessage,
                _error: 'register failed'
            })
        } else if (json.errCode == 2) {
            return new SubmissionError({
                email: json.errMessage,
                _error: 'email failed'
            })
        } else if (json.errCode == 3) {
            return new SubmissionError({
                phone: json.errMessage,
                _error: 'phone failed'
            })
        } else {
            // save account login
            try {
                await AsyncStorage.setItem(KEY_USER_LOGIN, JSON.stringify(json.data));
            } catch (error) {
                // Error saving data
                console.log('submitRegisterAccount:' + error.message);
            }
            return true;
        }
    }).catch(err => {
        console.log(err);
        return new SubmissionError({
            'hiddenField': err.message,
            '_error': '404'
        })
    });
}

const submitUpdateAccount = async (value) => {
    let user_login = await AsyncStorage.getItem(KEY_USER_LOGIN);
    user_login = JSON.parse(user_login);
    let token = encrypt(
        JSON.stringify({
            "userId": user_login.userid,
            "email": user_login.email
        })
    );
    value.token = token;
    let data = {
        method: 'POST',
        body: JSON.stringify({
            'data': value
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return await fetch(API_URL + 'users/user/update-mydetails', data)
    .then(response => response.json())  // promise
    .then(async json => {
        if (json.errCode == 1 || json.errCode == 2 || json.errCode == 3) {
            return new SubmissionError({
                hiddenField: json.errMessage,
                _error: 'update account failed'
            })
        } else {
            // save account login
            try {
                await AsyncStorage.removeItem(KEY_USER_LOGIN);
                await AsyncStorage.setItem(KEY_USER_LOGIN, JSON.stringify(json.data));
            } catch (error) {
                // Error saving data
            }
            return true;
        }
    }).catch(err => {
        console.log(err);
        return new SubmissionError({
            'hiddenField': err.message,
            '_error': '404'
        })
    });
}

const submitLoginForm = async (value) => {
    let data = {
        method: 'POST',
        body: JSON.stringify({
            data: value
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return fetch(API_URL + 'users/login', data)
    .then(response => response.json())  // promise
    .then(async json => {
        if (json.errCode == 1) {
            return new SubmissionError({
                email: json.errMessage,
                _error: 'submit failed'
            })
        } else if (json.errCode == 2) {
            return new SubmissionError({
                password: json.errMessage,
                _error: 'submit failed'
            })
        } else if (json.errCode == 3) {
            return new SubmissionError({
                hiddenField: json.errMessage,
                _error: 'Server error'
            })
        } else {
            // save account login
            try {
                await AsyncStorage.setItem(KEY_USER_LOGIN, JSON.stringify(json.data));
                await AsyncStorage.setItem(ACCOUNT_LOGIN, JSON.stringify({
                    email: value.email,
                    password: value.password
                }))
            } catch (error) {
                // Error saving data
                console.log(error)
            }
            return true;
        }
    }).catch(err => {
        console.log(err);
        return new SubmissionError({
            hiddenField: err.message,
            _error: '404'
        })
    });
}

const submitForgotPasswordForm = async value => {
    // step1 only property email
    let data = {
        method: 'POST',
        body: JSON.stringify({
            'data': value
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return await fetch(API_URL + 'users/user/resetpassword', data)
    .then(response => response.json())  // promise
    .then(async json => {
        if (json.errCode == 1) {
            return new SubmissionError({
                email: json.errMessage,
                _error: 'update account failed'
            })
        } else if (json.errCode == 2 || json.errCode == 3) {
            return new SubmissionError({
                hiddenField: json.errMessage,
                _error: 'update account failed'
            })
        } else if (json.errCode == 5) {
            return new SubmissionError({
                token: json.errMessage,
                _error: 'update account failed'
            })
        } else {
            if (value.token != undefined)
                return 2;
            else return 1;
        }
    }).catch(err => {
        console.log(err);
        return new SubmissionError({
            'hiddenField': err.message,
            '_error': '404'
        })
    });
}

const submitRegisterWalletItem = async (value) => {
    let user_login = await AsyncStorage.getItem(KEY_USER_LOGIN);
    user_login = JSON.parse(user_login);
    let token = encrypt(
        JSON.stringify({
            "userId": user_login.userid,
            "email": user_login.email
        })
    );
    let data = {
        method: 'POST',
        body: JSON.stringify({
            'data': {
                'token': token,
                'walletData': value
            }
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return await fetch(API_URL + 'wallets/wallet/handled', data)
    .then(response => response.json())  // promise
    .then(json => {
        if (json.errCode == -1) {
            return new SubmissionError({
                'hiddenField': json.errMessage,
                '_error': 'Error when server has some issues'
            })
        } else if (json.errCode == 1) {
            return new SubmissionError({
                'hiddenField': json.errMessage,
                '_error': 'Error while requesting data from client'
            })
        } else if (json.errCode == 2) {
            return new SubmissionError({
                'walletId': json.errMessage,
                '_error': 'Error: Wallet is already existed'
            })
        } else if (json.errCode == 3) {
            return new SubmissionError({
                'hiddenField': json.errMessage,
                '_error': 'Error while trying to insert into wallet'
            })
        } else if (json.errCode == 4) {
            return new SubmissionError({
                'hiddenField': json.errMessage,
                '_error': 'Error while account is not existed'
            })
        } else {
            return true;
        }
    }).catch(err => {
        console.log(err);
        return new SubmissionError({
            'hiddenField': err.message,
            '_error': '404'
        })
    });
}

const submitChangePassword = async(value) => {
    let user_login = await AsyncStorage.getItem(KEY_USER_LOGIN);
    user_login = JSON.parse(user_login);
    let token = encrypt(
        JSON.stringify({
            "userId": user_login.userid,
            "email": user_login.email
        })
    );
    value.token = token;
    let data = {
        method: 'POST',
        body: JSON.stringify({
            'data': value
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return await fetch(API_URL + 'users//user/change-password', data)
        .then(response => response.json())  // promise
        .then(async json => {
            if (json.errCode == 1 || json.errCode == 3 || json.errCode == 4) {
                return new SubmissionError({
                    'hiddenField': json.errMessage,
                    '_error': 'Error when server has some issues'
                })
            } else if (json.errCode == 2) {
                return new SubmissionError({
                    'password': json.errMessage,
                    '_error': 'incorrect password'
                })
            } else {
                return true;
            }
        }).catch(err => {
            console.log(err);
            return new SubmissionError({
                'hiddenField': err.message,
                '_error': '404'
            })
        });
}

export {
    submitRegisterAccount,
    submitLoginForm,
    submitUpdateAccount,
    submitForgotPasswordForm,
    submitRegisterWalletItem,
    submitChangePassword
}