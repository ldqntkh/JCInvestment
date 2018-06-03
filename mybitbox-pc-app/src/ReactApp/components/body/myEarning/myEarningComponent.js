import React from 'react';
import QRCode from 'qrcode.react';
import { KEY_DATA } from '../../../const/index'

const urlApi = 'http://mybitbox888.vn:8088/api/v1/walletbalance/{walletid}/{pool}/myearning';

class MyEarningComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataEarnings : [],
            loaded: false
        }
    }

    componentDidMount() {
        try {
            let localData = JSON.parse(localStorage.getItem(KEY_DATA));
            let walletId = localData.walletid;
            let poolservice = localData.poolservice;
            let now = new Date();
            let diffMs = now - dataBitbox.myEarning.lastUpdate;

            if (Math.floor((diffMs % 86400000) / 3600000) > 1 || dataBitbox.myEarning.dataEarnings == null)
                this.loadPerious(walletId, poolservice);
            else {
                this.setState({
                    dataEarnings: dataBitbox.myEarning.dataEarnings,
                    loaded: true
                });
            }
            
        } catch(err) {
            console.log(err);
            this.props.toggleScreen('setting');
        }
    }

    async loadPerious (walletId, poolservice) {
        if (walletId !== null) {
            let url = urlApi.replace('{walletid}', walletId).replace('{pool}', poolservice);
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
                    dataBitbox.myEarning.lastUpdate = new Date();
                    dataBitbox.myEarning.dataEarnings = results
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
    
    render() {
        if (!this.state.loaded) {
            return null;
        }
        return (
            <div className="pt_earning">
                <table>
                    <tbody>
                        <tr className="header">
                            <td>Period</td>
                            <td>ETH</td>
                            <td>BTC</td>
                            <td>USD</td>
                        </tr>
                        <tr className="hour">
                            <td>Hour</td>
                            <td> {this.state.dataEarnings[0].eth} </td>
                            <td> {this.state.dataEarnings[0].btc} </td>
                            <td> ${this.state.dataEarnings[0].usd} </td>
                        </tr>
                        <tr className="day">
                            <td>Day</td>
                            <td> {this.state.dataEarnings[1].eth} </td>
                            <td> {this.state.dataEarnings[1].btc} </td>
                            <td> ${this.state.dataEarnings[1].usd} </td>
                        </tr>
                        <tr className="week">
                            <td>Week</td>
                            <td> {this.state.dataEarnings[2].eth} </td>
                            <td> {this.state.dataEarnings[2].btc} </td>
                            <td> ${this.state.dataEarnings[2].usd} </td>
                        </tr>
                        <tr className="month">
                            <td>Month</td>
                            <td> {this.state.dataEarnings[3].eth} </td>
                            <td> {this.state.dataEarnings[3].btc} </td>
                            <td> ${this.state.dataEarnings[3].usd} </td>
                        </tr>
                        <tr className="year">
                            <td>Year</td>
                            <td> {this.state.dataEarnings[4].eth} </td>
                            <td> {this.state.dataEarnings[4].btc} </td>
                            <td> ${this.state.dataEarnings[4].usd} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MyEarningComponent;