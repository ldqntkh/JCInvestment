import React, {PureComponent} from 'react';
import {
    View,
    Text,
    ScrollView
} from 'react-native';

import {
    Icon
} from 'native-base';

import { coinsPriceStyle } from '../../../styleSheets/coinsprices/coinspriceStyle'

var urlCoinMarket = 'https://api.coinmarketcap.com/v2/ticker/?limit=50';

class CoinPriesComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataCoin : []
        }
    }

    componentDidMount() {
        this.loadCoinData();
    }

    async loadCoinData () {
        try {
            let dataCoinsPrice = this.props.dataCoinsPrice;
            if(dataCoinsPrice.data === undefined || (Date.now() - new Date(dataCoinsPrice.lastUpdate) >= 300 * 1000 )) {
                let html = await fetch(urlCoinMarket);
                let htmlCode = await html.json();
                let data = htmlCode.data;
                
                let results = []
                for(let index in data) {
                    let name = data[index].name,
                        rank = data[index].rank,
                        symbol = data[index].symbol,
                        price = data[index].quotes.USD.price,
                        percent = data[index].quotes.USD.percent_change_24h,
                        status = data[index].quotes.USD.percent_change_24h > 0 ? true : false;
                        
                    results.push({
                        name : name, 
                        rank : rank,
                        price: price, 
                        percent: percent,
                        symbol: symbol,
                        status: status
                    })
                }
                
                if (results.length > 0) {
                    results.sort(this.compare);
                    dataCoinsPrice = {
                        data : results,
                        lastUpdate: Date.now()
                    }
                    this.props.updateCoinsPricesData(dataCoinsPrice);
                }
            }
            this.setState({
                dataCoin : dataCoinsPrice.data
            });
        } catch(err) {
            console.log(err);
        }
    }

    compare(a,b) {
        if (a.rank < b.rank)
            return -1;
        if (a.rank > b.rank)
            return 1;
        return 0;
    }

    render() {
        return (
            <ScrollView style={coinsPriceStyle.parent}>
                {this.state.dataCoin.map((item, index) => {
                    return <View style={[coinsPriceStyle.itemView, index % 2 === 0 ? coinsPriceStyle.backgroundView : null]} key={index}>
                                <View style={coinsPriceStyle.viewRowItem}>
                                    <Text numberOfLines={1} style={coinsPriceStyle.name}>{item.name} ({item.symbol})</Text>
                                </View>
                                <View style={coinsPriceStyle.viewRowItem}>
                                    <Text style={coinsPriceStyle.price}>${item.price.toFixed(4)}</Text>
                                </View>
                                <View style={coinsPriceStyle.viewRowItem}>
                                    <Icon style={[coinsPriceStyle.icon, item.status ? coinsPriceStyle.percentUp : coinsPriceStyle.percentDown ]} name={item.status ? 'arrow-round-up' : 'arrow-round-down'} />
                                    <Text style={item.status ? coinsPriceStyle.percentUp : coinsPriceStyle.percentDown}>{item.percent}%</Text>
                                </View>
                            </View>
                })}
            </ScrollView>
        )   
    }
    
}

export default CoinPriesComponent;