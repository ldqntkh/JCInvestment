import React from 'react';
import ReactDOM from 'react-dom';

// import component
import RegisterComponent from './components/account/registerComponent';

if (typeof pageContext !== 'undefined') {
    let page = pageContext.page;
    if (page === 'register') {
        ReactDOM.render(<RegisterComponent />, document.getElementById('register-user'));
    }
}