import React from 'react';
import ReactDOM from 'react-dom';

// import component
import IndexEthExchangeComponent from './components/dashboard/indexEthExchangeComponent';
import ListProductComponent from './components/products/listProductComponent';
import CoinCalculator from './components/calculation/coinCalculator';

if (typeof pageContext !== 'undefined') {
    let page = pageContext.page;
    if (page === 'dashboard') {
        ReactDOM.render(<IndexEthExchangeComponent />, document.getElementById('eth-exchange'));
        ReactDOM.render(<ListProductComponent />, document.getElementById('list-product'));
    } else if (page === 'calculation') {
        ReactDOM.render(<CoinCalculator />, document.getElementById('calculation_hashing'));
    }
}