import React, {Component} from 'react';

// import component
import HashingComponent from './hashingComponent';
import EthExchangeComponent from './ethExchangeComponent';
import MyEthValueComponent from './myEthValueComponent';
import UnpaidBalanceComponent from './unpaidBalanceComponent';

const url = 'https://api.coinmarketcap.com/v2/ticker/?limit=2';
export default class IndexEthExchangeComponent extends Component {
    constructor(props) {
        super(props);
        this.EthExchangeValue = typeof pageContext !== undefined ? pageContext : {}
        this.state = {
            EthPrice : 0,
            loaded: false
        }
    }

    componentDidMount() {
        this.getEthExchange();
    }
    
    async getEthExchange () {
        try {
            let response = await fetch(url);
            let jsonData = await response.json();
            if (jsonData.data) {
                let ethData = jsonData.data["1027"];
                let price = ethData.quotes.USD.price;
                this.setState({
                    EthPrice : price,
                    loaded: true
                })
            }
        } catch (err) {
            console.log(err);
            this.setState({
                loaded: true
            })
        }
    }

    render() {
        return(
            <React.Fragment>
                <HashingComponent hashing={this.EthExchangeValue.totalHs}/>
                <UnpaidBalanceComponent unpaidBalance={this.EthExchangeValue.unpaidBalance}/>
                <EthExchangeComponent loaded={this.state.loaded} ethPrice={this.state.EthPrice}/>
                <MyEthValueComponent loaded={this.state.loaded} ethPrice={this.state.EthPrice} unpaidBalance={this.EthExchangeValue.unpaidBalance}/>
            </React.Fragment>
        );
    }
}