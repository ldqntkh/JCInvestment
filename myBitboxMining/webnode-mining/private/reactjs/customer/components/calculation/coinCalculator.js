import React, {Component} from 'react';

// import const
const showMessage = require('../../../../../global/ResourceHelper').showMessage;

const urlCoinInfo = 'https://min-api.cryptocompare.com/data/top/exchanges/full?fsym={0}&tsym=USD';
const urlETH = 'https://api.coinmarketcap.com/v2/ticker/1027/';

export default class CoinCalculator extends Component {
    constructor (props) {
        super(props);
        this.pageContext = typeof pageContext !== undefined ? pageContext : {}
        this.state = {
            coin_type : 'ETH',
            price: 0,
            totalCoin: 0,
            balanceTotalUsd : 0,
            usd1000: 0,
            usd2000: 0
        }
    }

    componentDidMount() {
        this.getCoinInfo();
    }

    async getCoinInfo () {
        try {
            let response = await fetch(urlCoinInfo.replace('{0}', this.state.coin_type));
            let dataJson = await response.json();
            if (dataJson.Response.toLowerCase() === 'success') {
                let coinInfo = dataJson.Data.CoinInfo;
                coinInfo.hashing = this.pageContext.totalHs;
                coinInfo.price = dataJson.Data.AggregatedData.PRICE;
                //coinInfo.BlockReward = 3;
                try {
                    response = await fetch(urlETH);
                    dataJson = await response.json();
                    if (dataJson.data) {
                        coinInfo.price = dataJson.data.quotes.USD.price;
                    }
                } catch (err) {
                    console.log(err.message);
                }

                this.calCulation(coinInfo);
            }
        } catch(err) {
            console.log(err);
        }
    }

    calCulation (CoinInfo) {
        try {
            let hashing = CoinInfo.hashing * 1000,
                price = CoinInfo.price,
                blockNumber = CoinInfo.BlockNumber,
                netHashesPerSecond = CoinInfo.NetHashesPerSecond,
                blockReward = CoinInfo.BlockReward;

            let totalCoin = hashing / (hashing + netHashesPerSecond) * blockNumber * blockReward,// 0.7 is fee to charge customer
                balanceTotalUsd = totalCoin * price ,
                usd1000 = totalCoin * 1000,
                usd2000 = totalCoin * 2000;
            this.setState({
                price: price,
                totalCoin: totalCoin,
                balanceTotalUsd : balanceTotalUsd,
                usd1000: usd1000,
                usd2000 : usd2000
            });
        } catch(err) {
            console.log(err)
        }
    }

    render() {
        let screen = null;
        if (this.state.totalCoin === 0 || isNaN(this.state.totalCoin)) screen = null;
        else {
            screen = <tbody>
                <tr>
                    <td>{showMessage('RC_HOUR')}</td>
                    <td>{(this.state.totalCoin / 24).toFixed(4)}</td>
                    <td>${(this.state.balanceTotalUsd / 24).toFixed(2)}</td>
                    <td>${(this.state.usd1000 / 24).toFixed(2)}</td>
                    <td>${(this.state.usd2000 / 24).toFixed(2)}</td>
                </tr>
                <tr className="success">
                    <td>{showMessage('RC_DAY')}</td>
                    <td>{this.state.totalCoin.toFixed(4)}</td>
                    <td>${this.state.balanceTotalUsd.toFixed(2)}</td>
                    <td>${this.state.usd1000.toFixed(2)}</td>
                    <td>${this.state.usd2000.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>{showMessage('RC_WEEK')}</td>
                    <td>{(this.state.totalCoin * 7).toFixed(4)}</td>
                    <td>${(this.state.balanceTotalUsd * 7).toFixed(2)}</td>
                    <td>${(this.state.usd1000 * 7).toFixed(2)}</td>
                    <td>${(this.state.usd2000 * 7).toFixed(2)}</td>
                </tr>
                <tr className="success">
                    <td>{showMessage('RC_MONTH')}</td>
                    <td>{(this.state.totalCoin * 30).toFixed(4)}</td>
                    <td>${(this.state.balanceTotalUsd * 30).toFixed(2)}</td>
                    <td>${(this.state.usd1000 * 30).toFixed(2)}</td>
                    <td>${(this.state.usd2000 * 30).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>{showMessage('RC_YEAR')}</td>
                    <td>{(this.state.totalCoin * 365).toFixed(4)}</td>
                    <td>${(this.state.balanceTotalUsd * 365).toFixed(2)}</td>
                    <td>${(this.state.usd1000 * 365).toFixed(2)}</td>
                    <td>${(this.state.usd2000 * 365).toFixed(2)}</td>
                </tr>
            </tbody>
        }

        return(
            <React.Fragment>
                <div className="row">
                    <div className="col-lg-12">
                        <p>{showMessage('RC_MY_TOTAL_HASH')} {this.pageContext.totalHs} Mh/s</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-6">
                        <div className="coin-info">
                            <img src="/images/ethereum.png" alt={this.state.coin_type}/>
                            <span>1{this.state.coin_type} = ${this.state.price}</span>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-6">
                        <div className="card">
                            <div className="card-header card-header-warning">
                                <h4 className="card-title">{showMessage('RC_MY_ESTIMATION')}</h4>
                                <p className="card-category"></p>
                            </div>
                            <div className="card-body table-responsive">
                                <table className="table table-hover text-center">
                                    <thead className="text-warning">
                                        <tr>
                                            <th>{showMessage('RC_PERIOD')}</th>
                                            <th>{showMessage('RC_COIN')}</th>
                                            <th>{showMessage('RC_USD')}</th>
                                            <th>{showMessage('RC_USD')}($1000)</th>
                                            <th>{showMessage('RC_USD')}($2000)</th>
                                        </tr>
                                    </thead>
                                    {
                                        screen   
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

/**
 * cách hoạt động (BTC, ETH, ETC, XMR, ZEC, PASC, DASH, LTC)
 * khi run component (lấy thông tin theo select box)
 * lấy giá coin (usd)
 * lấy BlockNumber, BlockReward và NetHash từ url https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=ETH&tsym=BTC
 * công thức tính số coin thu được trong 1 ngày (đơn vị tính dựa theo list) <YOUR HASHRATE> / (<YOUR HASHRATE> + <NETWORK HASHRATE>) x <BLOCKS PER 24H> x <BLOCK REWARD>
 * quy đổi ra giá usd
 */