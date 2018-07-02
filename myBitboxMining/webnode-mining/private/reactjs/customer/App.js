import React from 'react';
import ReactDOM from 'react-dom';

// import component
import IndexEthExchangeComponent from './components/dashboard/indexEthExchangeComponent';
import ListProductComponent from './components/products/listProductComponent';
import ListProductCustomerComponent from './components/customer_product/listProductComponent';
import WalletPageComponent from './components/wallet/indexComponent';

import CoinCalculator from './components/calculation/coinCalculator';
import ForgotPassword from './components/account/forgotPassword';
import ChangePassword from './components/account/changePassword';

if (typeof pageContext !== 'undefined') {
    let page = pageContext.page;
    if (page === 'dashboard') {
        ReactDOM.render(<IndexEthExchangeComponent />, document.getElementById('eth-exchange'));
        ReactDOM.render(<ListProductComponent />, document.getElementById('list-product'));
        ReactDOM.render(<ListProductCustomerComponent />, document.getElementById('table-product-customer'));
    } else if (page === 'calculation') {
        ReactDOM.render(<CoinCalculator />, document.getElementById('calculation_hashing'));
    } else if (page === 'forgotpassword') {
        ReactDOM.render(<ForgotPassword />, document.getElementById('forgot-password'));
    } else if(page === 'changepassword') {
        ReactDOM.render(<ChangePassword />, document.getElementById('change-password'));
    } else if(page === 'my-wallet') {
        ReactDOM.render(<WalletPageComponent />, document.getElementById('my-wallet-page'));
    }
}