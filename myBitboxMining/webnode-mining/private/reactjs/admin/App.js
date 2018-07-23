import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// import component
import LoginComponent from './components/account/loginComponent';
import CreateUserComponent from './components/account/createUserComponent';
import IndexProductComponent from './components/product/indexComponent';

// import store
import ProductStore from './stores/productStore';

if (typeof pageContext !== 'undefined') {
    let page = pageContext.page;
    if (page === 'login') {
        ReactDOM.render(<LoginComponent />, document.getElementById('login-admin'));
    } else if (page === 'user') {
        ReactDOM.render(<CreateUserComponent />, document.getElementById('create-user'));
    } else if (page === 'admin-product') {
        ReactDOM.render(
            <Provider store={ProductStore}>
                <IndexProductComponent />
            </Provider>, document.getElementById('admin-product-page'));
    }
}