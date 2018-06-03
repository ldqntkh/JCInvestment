import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import stores from './stores/index'; 

import MainHeaderContainer from './containers/header/mainHeaderContainer';
import MainFooterContainer from './containers/footer/mainFooterContainer';
import CoinPriesComponent from './components/coinprices/coinPricesComponent';
import MainBodyContainer from './containers/body/mainBodyContainer';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Provider store={stores}>
                    <div>
                        <MainHeaderContainer />
                        <MainBodyContainer />
                        <CoinPriesComponent />
                        <MainFooterContainer />
                    </div>
                </Provider>
        );
    }
}



ReactDOM.render(<App/>, document.getElementById('root'));