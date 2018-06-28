import React from 'react';
import ReactDOM from 'react-dom';

// import component
import IndexEthExchangeComponent from './components/dashboard/indexEthExchangeComponent';
import CoinCalculator from './components/calculation/coinCalculator';
import Forgotpassword from './components/account/forgotPassword';

if (typeof pageContext !== 'undefined') {
    let page = pageContext.page;
    if (page === 'dashboard') {
        ReactDOM.render(<IndexEthExchangeComponent />, document.getElementById('eth-exchange'));
    } else if (page === 'calculation') {
        ReactDOM.render(<CoinCalculator />, document.getElementById('calculation_hashing'));
    } else if (page === 'forgotpassword') {
        ReactDOM.render(<Forgotpassword />, document.getElementById('forgot-password'));
    }
}