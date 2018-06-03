import React, { Component } from 'react';
import {
    Text,
    Image, 
    View,
    ScrollView
} from 'react-native';
import QRCode from 'react-native-qrcode';
import {
    Container, Content
} from 'native-base'
import { walletBalanceStyle } from '../../../styleSheets/wallet/walletBalanceStyle'

import {
    ACTIVE_WORKERS, UNPAID_BALANCE, WALLET_BALANCE, WALLET_ID
} from '../../../const/variableLabel'
import {
    API_URL
} from '../../../const/variable';


import HeaderDetailsComponent from '../header/headerDetailsComponent'

const urlApi = API_URL + 'walletbalance/{walletid}/{pool}/mywallet';

class WalletBalanceComponent extends Component {
    
    static navigationOptions = {
        tabBarIcon : () => {
            return <Image source={require('../../../../public/images/wallet.png')}
                          style={{width: 25, height: 25}} />
        }
    };

    
    constructor(props) {
        super(props);
        this.state = {
            activeWorker: 0,
            unpaidBalance: 0,
            totalBalance: 0,
            loaded: false
        }
    }

    componentDidMount() {
        this.getUnpaidBalance();
    }

    // get UnpaidBalance
    getUnpaidBalance = async()=> {
        if (this.props.screenProps.walletId !== null) {
            let activeWorker = 0;
            let unpaidBalance = 0;
            let totalBalance = 0;
            let walletId = this.props.screenProps.walletId;
            let poolService = this.props.screenProps.poolService;

            let url = urlApi.replace('{walletid}', walletId).replace('{pool}', poolService);
            try {
                let response = await fetch(url);
                let responseJson = await response.json();
                if (responseJson.errCode === 0) {
                    if (typeof(responseJson.data) === 'object') {
                        activeWorker = responseJson.data.activeWorker;
                        unpaidBalance = responseJson.data.unpaidBalance;
                        totalBalance = responseJson.data.totalBalance;
                    }
                }
            } catch (error) {
                console.error(error);
            }

            this.setState({
                activeWorker : activeWorker,
                unpaidBalance : unpaidBalance.toFixed(4),
                totalBalance: totalBalance.toFixed(4),
                loaded: true
            });
        }
    }

    render () {
        let screen = null;
        if (this.state.loaded) {
            screen = <ScrollView style={ walletBalanceStyle.parent }>
                        <View style={ walletBalanceStyle.parentView }>
                            <View style={ walletBalanceStyle.qrCode }>
                                <QRCode value={ this.props.screenProps.walletId }
                                    size={250}
                                    bgColor='black'
                                    fgColor='white'/>
                            </View>
                            <Text style={walletBalanceStyle.labelWLValue}>{ this.props.screenProps.walletId }</Text>
                            <View style={walletBalanceStyle.viewLabel}>
                                <Text style={ walletBalanceStyle.label }> {ACTIVE_WORKERS} </Text>
                                <Text style={walletBalanceStyle.labelValue}>{ this.state.activeWorker }</Text>
                            </View>
                            <View style={walletBalanceStyle.viewLabel}>
                                <Text style={ walletBalanceStyle.label }> {UNPAID_BALANCE} </Text>
                                <Text style={walletBalanceStyle.labelValue}>{ this.state.unpaidBalance } ETH</Text>
                            </View>
                            <View style={walletBalanceStyle.viewLabel}>
                                <Text style={ walletBalanceStyle.label }> {WALLET_BALANCE} </Text>
                                <Text style={walletBalanceStyle.labelValue}>{ this.state.totalBalance } ETH</Text>
                            </View>
                        </View>
                    </ScrollView>
                
        } else {
            screen = <View style={walletBalanceStyle.parentViewLoading}>
                        <Image source={require('../../../../public/images/loading.gif')}
                          style={{width: 200, height: 150}} />
                    </View>
        }

        return (
            <Container style={ walletBalanceStyle.parentContainer }>
                <HeaderDetailsComponent walletName={this.props.screenProps.walletName} navigation={this.props.screenProps.mainNavigate}/>
                <Content>
                    {screen}
                </Content>
            </Container>
        )
    }
}

export default WalletBalanceComponent