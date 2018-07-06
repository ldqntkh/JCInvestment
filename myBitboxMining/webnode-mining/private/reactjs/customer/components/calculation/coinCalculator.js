import React, {Component} from 'react';

// import const
const showMessage = require('../../../../../global/ResourceHelper').showMessage;

const urlCoinInfo = 'https://min-api.cryptocompare.com/data/top/exchanges/full?fsym={0}&tsym=USD';
export default class CoinCalculator extends Component {
    constructor (props) {
        super(props);
        this.pageContext = typeof pageContext !== undefined ? pageContext : {}
        this.state = {
            coin_type : 'ETH',
            price: 0,
            totalCoin: 0,
            balanceTotalUsd : 0
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

            let totalCoin = hashing / (hashing + netHashesPerSecond) * blockNumber * blockReward * 0.7,// 0.7 is fee to charge customer
                balanceTotalUsd = totalCoin * price * 0.7;
            this.setState({
                price: price,
                totalCoin: totalCoin,
                balanceTotalUsd : balanceTotalUsd
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
                </tr>
                <tr className="success">
                    <td>{showMessage('RC_DAY')}</td>
                    <td>{this.state.totalCoin.toFixed(4)}</td>
                    <td>${this.state.balanceTotalUsd.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>{showMessage('RC_WEEK')}</td>
                    <td>{(this.state.totalCoin * 7).toFixed(4)}</td>
                    <td>${(this.state.balanceTotalUsd * 7).toFixed(2)}</td>
                </tr>
                <tr className="success">
                    <td>{showMessage('RC_MONTH')}</td>
                    <td>{(this.state.totalCoin * 30).toFixed(4)}</td>
                    <td>${(this.state.balanceTotalUsd * 30).toFixed(2)}</td>
                </tr>
                <tr>
                    <td>{showMessage('RC_YEAR')}</td>
                    <td>{(this.state.totalCoin * 365).toFixed(4)}</td>
                    <td>${(this.state.balanceTotalUsd * 365).toFixed(2)}</td>
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
                    <div className="col-lg-4 col-md-4 col-sm-6">
                        <div className="coin-info">
                            <img src="/images/ethereum.png" alt={this.state.coin_type}/>
                            <span>1{this.state.coin_type} = ${this.state.price}</span>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-6">
                        <div class="card">
                            <div class="card-header card-header-warning">
                                <h4 class="card-title">{showMessage('RC_MY_ESTIMATION')}</h4>
                                <p class="card-category"></p>
                            </div>
                            <div class="card-body table-responsive">
                                <table class="table table-hover">
                                    <thead className="text-warning">
                                        <tr>
                                            <td>{showMessage('RC_PERIOD')}</td>
                                            <td>{showMessage('RC_COIN')}</td>
                                            <td>{showMessage('RC_USD')}</td>
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