import React, {Component} from 'react';

var urlCoinMarket = 'https://api.coinmarketcap.com/v2/ticker/?limit=20';
var interval = null,
    intervalLoadUrl = null;
class CoinPriesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCoin : [],
            elementSlide : document.getElementById('slide')
        }
    }

    componentDidMount() {
        this.loadCoinData();
        let that = this;
        intervalLoadUrl = setInterval(function() {
            that.loadCoinData()
        }, 20 * 60 * 1000);
    }

    componentWillUnmount() {
        clearInterval(intervalLoadUrl);
        clearInterval(interval);
    }

    async loadCoinData () {
        try {
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
                this.setState({
                    dataCoin : [...results]
                });
                this.runSlide();
            }
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

    runSlide() {
        let windowWidth = -window.innerWidth;
        document.getElementById('slide').style.right = `${-window.innerWidth}px`;
        clearInterval(interval);
        interval = setInterval(function() {
            windowWidth ++;
            if (windowWidth > 180 * 20) windowWidth = -window.innerWidth;
            document.getElementById('slide').style.right = `${windowWidth}px`;
        }, 50);
    }

    render() {
        return (
            <div className="dv-coinprices">
                <div id="slide">
                    {this.state.dataCoin.map((item, index) => {
                        if (index < 20) 
                        return <div className="dv-coin-item" key={index}>
                                    <p>{item.name} ({item.symbol})</p>
                                    <div>
                                        <span>${item.price.toFixed(4)}</span>
                                        <span className={item.status ? 'up' : 'down'}>
                                            <i className={item.status ? 'up' : 'down'}></i>
                                            {item.percent}%
                                        </span>
                                    </div>
                                </div>
                    })}
                </div>
            </div>
        )   
    }
    
}

export default CoinPriesComponent;