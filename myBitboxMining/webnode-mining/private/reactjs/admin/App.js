import React from 'react';
import ReactDOM from 'react-dom';

// import component
import LoginComponent from './components/account/loginComponent';
import CreateUserComponent from './components/account/createUserComponent';

if (typeof pageContext !== 'undefined') {
    let page = pageContext.page;
    if (page === 'login') {
        ReactDOM.render(<LoginComponent />, document.getElementById('login-admin'));
    } else if (page === 'createuser') {
        ReactDOM.render(<CreateUserComponent />, document.getElementById('create-user'));
    }
}