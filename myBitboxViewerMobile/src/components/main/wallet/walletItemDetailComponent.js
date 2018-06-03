import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import WalletBalanceComponent from './walletBalanceComponent';
import EarningDetailsComponent from '../earning/earningDetailsComponent';
import MainWorkersComponent from '../worker/mainWorkerComponent';

const BottomTabNavigator = createBottomTabNavigator({
    Wallet: {
        screen: WalletBalanceComponent
    },
    Earnings: {
        screen: EarningDetailsComponent
    },
    Workers: {
        screen: MainWorkersComponent
    }
});


class WalletItemDetailsComponent extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let headerTitle = params.walletName;
        return {
            headerTitle
        }
    }
    
    constructor(props) {
        super(props);
    }

    functionClick() {

    }

    componentDidMount() {
        // set param to call in navigation
        // this.props.navigation.setParams({
        //     functionClick: this.functionClick.bind(this)
        // });
    }

    // render tab navigation
    // wallet balance, earning, workers

    render () {
        return (
            <BottomTabNavigator screenProps={{
                walletId: this.props.navigation.state.params.walletId, 
                walletName: this.props.navigation.state.params.walletName,
                poolService: this.props.navigation.state.params.poolService,
                mainNavigate: this.props.navigation}}/>
        );
    }
}

export default WalletItemDetailsComponent