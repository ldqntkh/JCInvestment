import React, { Component } from 'react';
import {
    Text,
    Image,
    ScrollView,
    View
} from 'react-native';
import {
    Container, Content
} from 'native-base'
import { earningStyle } from '../../../styleSheets/earning/earningStyle';

import {
    PERIOUS, HOUR, DAY, WEEK, MONTH, YEAR, ETH, BTC, USD
} from '../../../const/variableLabel';

import {
    API_URL
} from '../../../const/variable';
import HeaderDetailsComponent from '../header/headerDetailsComponent'
const urlApi = API_URL + 'walletbalance/{walletid}/{pool}/myearning';

class EarningDetailsComponent extends Component {

    static navigationOptions = {
        tabBarIcon : () => {
            return <Image source={require('../../../../public/images/earning.png')}
                          style={{width: 25, height: 25}} />
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            dataEarnings : [],
            loaded: false
        }
    }

    componentDidMount() {
        this.loadPerious();
    }

    loadPerious = async ()=> {
        if (this.props.screenProps.walletId !== null) {
            let url = urlApi.replace('{walletid}', this.props.screenProps.walletId)
                            .replace('{pool}', this.props.screenProps.poolService);
            try {
                let response = await fetch(url);
                let dataJson = await response.json();
                let results = [];
                let ethPerMin = 0, usdPerMin = 0, btcPerMin = 0;
                if (dataJson.errCode === 0) {
                    if (typeof(dataJson.data) === 'object') {
                        ethPerMin = parseFloat(dataJson.data.ethPerMin.toString());
                        usdPerMin = parseFloat(dataJson.data.usdPerMin.toString());
                        btcPerMin = parseFloat(dataJson.data.btcPerMin.toString());
                    }
                }
                
                // hour
                let eth = (ethPerMin * 60).toFixed(5),
                    btc = (btcPerMin * 60).toFixed(5),
                    usd = (usdPerMin * 60).toFixed(2);
                results.push({eth, btc, usd});
                // day
                eth = (ethPerMin * 60 * 24).toFixed(5),
                btc = (btcPerMin * 60 * 24).toFixed(5),
                usd = (usdPerMin * 60 * 24).toFixed(2);
                results.push({eth, btc, usd});
                // week
                eth = (ethPerMin * 60 * 24 * 7).toFixed(5),
                btc = (btcPerMin * 60 * 24 * 7).toFixed(5),
                usd = (usdPerMin * 60 * 24 * 7).toFixed(2);
                results.push({eth, btc, usd});
                // month
                eth = (ethPerMin * 60 * 24 * 30).toFixed(5),
                btc = (btcPerMin * 60 * 24 * 30).toFixed(5),
                usd = (usdPerMin * 60 * 24 * 30).toFixed(2);
                results.push({eth, btc, usd});
                // year
                eth = (ethPerMin * 60 * 24 * 365).toFixed(5),
                btc = (btcPerMin * 60 * 24 * 365).toFixed(5),
                usd = (usdPerMin * 60 * 24 * 365).toFixed(2);
                results.push({eth, btc, usd});
                
                if (results.length > 0) {
                    this.setState({
                        dataEarnings : results,
                        loaded: true
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    render () {
        if (this.state.loaded) {
            screen =  <ScrollView style={earningStyle.parent}>
                            <View style={earningStyle.tableRowHeader}>
                                <View style={earningStyle.colHeader_left}> 
                                    <Text style={earningStyle.textHeader}> {PERIOUS} </Text>
                                </View>
                                <View style={earningStyle.colHeader}>
                                    <Text style={earningStyle.textHeader}> {ETH} </Text>
                                </View>
                                <View style={earningStyle.colHeader}>
                                    <Text style={earningStyle.textHeader}> {BTC} </Text>
                                </View>
                                <View style={earningStyle.colHeader}>
                                    <Text style={earningStyle.textHeader}> {USD} </Text>
                                </View>
                            </View>
                            {/* View rows */}
                            { 
                                this.state.dataEarnings.map((item, index)=> {
                                    let titleRow = '',
                                        _color = 'black';
                                    switch(index) {
                                        case 0: titleRow = HOUR; break;
                                        case 1: titleRow = DAY; break;
                                        case 2: titleRow = WEEK; break;
                                        case 3: titleRow = MONTH; break;
                                        case 4: titleRow = YEAR; break;
                                    }
                                    return  (
                                        <View style={earningStyle.tableRowBody} key={index}>
                                            <View style={earningStyle.colValue_left}>
                                                <Text style={[earningStyle.textValue, {color: _color}]}> { titleRow } </Text>
                                            </View>
                                            <View style={earningStyle.colValue}>
                                                <Text style={[earningStyle.textValue, {color: _color}]}> { item.eth } </Text>
                                            </View>
                                            <View style={earningStyle.colValue}>
                                                <Text style={[earningStyle.textValue, {color: _color}]}> { item.btc } </Text>
                                            </View>
                                            <View style={earningStyle.colValue}>
                                                <Text style={[earningStyle.textValue, {color: _color}]}> ${ item.usd } </Text>
                                            </View>
                                        </View>
                                    );
                                })
                            }
                    </ScrollView>
        } else {
            screen = <View style={earningStyle.parentViewLoading}>
                        <Image source={require('../../../../public/images/loading.gif')}
                          style={{width: 200, height: 150}} />
                    </View>
        }

        return (
            <Container style={ earningStyle.parentContainer }>
                <HeaderDetailsComponent walletName={this.props.screenProps.walletName} navigation={this.props.screenProps.mainNavigate}/>
                <Content>
                    {screen}
                </Content>
            </Container>
        )
    }
}

export default EarningDetailsComponent