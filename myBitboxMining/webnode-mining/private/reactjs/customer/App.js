import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// import component
import IndexEthExchangeComponent from './components/dashboard/indexEthExchangeComponent';
import ListProductComponent from './components/products/listProductComponent';
import WalletPageComponent from './components/wallet/indexComponent';
import ListHistoryComponent from './components/history/listHistoryComponent';
import IndexOrderComponent from './components/order/indexComponent';
import IndexProductCustomerComponent from './components/customer_product/indexComponent';
import MaintenanceFeeComponent from './components/account/maintenanceFee';
import CoinCalculator from './components/calculation/coinCalculator';
import ForgotPassword from './components/account/forgotPassword';
import ChangePassword from './components/account/changePassword';

import MaintenanceFee from './components/MaintenanceFee/maintenanceFeeComponent';
//import container
import ListProductCustomerContainer from './containers/customer_product/listProductContainer';


// import store
import walletStore from './store/walletStore';
import productStore from './store/productStore';
import orderStore from './store/orderStore';

if (typeof pageContext !== 'undefined') {
    let page = pageContext.page;
    if (page === 'dashboard') {
        ReactDOM.render(<IndexEthExchangeComponent />, document.getElementById('eth-exchange'));
        ReactDOM.render(<ListProductComponent />, document.getElementById('list-product'));
        ReactDOM.render(
            <Provider store={productStore}>
                <ListProductCustomerContainer />
            </Provider>, document.getElementById('table-product-customer'));
        ReactDOM.render(<ListHistoryComponent />, document.getElementById('table-history-customer'));
        ReactDOM.render(<MaintenanceFeeComponent />, document.getElementById('notification'));
    } else if (page === 'calculation') {
        ReactDOM.render(<CoinCalculator />, document.getElementById('calculation_hashing'));
    } else if (page === 'forgotpassword') {
        ReactDOM.render(<ForgotPassword />, document.getElementById('forgot-password'));
    } else if(page === 'changepassword') {
        ReactDOM.render(<ChangePassword />, document.getElementById('change-password'));
    } else if(page === 'my-product') {
        ReactDOM.render(
            <Provider store={productStore}>
                <IndexProductCustomerComponent />
            </Provider>, document.getElementById('my-product-page'));
    } else if(page === 'maintenance-fee') {
        ReactDOM.render(<MaintenanceFee />, document.getElementById('maintenance-fee-page'));
    } else if(page === 'my-order') {
        ReactDOM.render(
            <Provider store={orderStore}>
                <IndexOrderComponent />
            </Provider>, document.getElementById('my-order-page'));
    } else if(page === 'my-history') {
        ReactDOM.render(<ListHistoryComponent />, document.getElementById('my-history-page'));
    } else if(page === 'my-wallet') {
        ReactDOM.render(
            <Provider store={walletStore}>
                <WalletPageComponent />
            </Provider>
            , document.getElementById('my-wallet-page'));
    }
}