import React from 'react';
import QRCode from 'qrcode.react';

import { KEY_DATA } from '../../../const/index'

const urlApi = 'http://mybitbox888.vn:8088/api/v1/walletbalance/{walletid}/{pool}/mywallet';

class MyWalletComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            walletData : {
                'activeWorker' : 0,
                'unpaidBalance' : 0,
                'totalBalance' : 0
            },
            walletId: '',
            loaded: false
        }
    }

    componentDidMount() {
        try {
            let localData = JSON.parse(localStorage.getItem(KEY_DATA));
            let walletId = localData.walletid;
            let poolservice = localData.poolservice;

            let now = new Date();
            let diffMs = now - dataBitbox.myWallet.lastUpdate;

            if (Math.floor((diffMs % 86400000) / 3600000) > 1 || dataBitbox.myWallet.walletData == null)
                this.getUnpaidBalance(walletId, poolservice);
            else {
                this.setState({
                    walletData : dataBitbox.myWallet.walletData,
                    walletId: walletId,
                    loaded: true
                });
            }
        } catch(err) {
            console.log(this.props);
            this.props.toggleScreen('setting');
        }
    }

    // get UnpaidBalance
    async getUnpaidBalance (walletId, poolservice) {
        if (walletId !== null) {
            let activeWorker = 0;
            let unpaidBalance = 0;
            let walletBalance = 0;
            let totalBalance = 0;
            let url = urlApi.replace('{walletid}', walletId).replace('{pool}', poolservice);
            try {
                let response = await fetch(url);
                let responseJson = await response.json();
                console.log(response)
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

            dataBitbox.myWallet.lastUpdate = new Date();
            dataBitbox.myWallet.walletData = {
                'activeWorker' : activeWorker,
                'unpaidBalance' : unpaidBalance.toFixed(4),
                'totalBalance' : totalBalance.toFixed(4)
            }

            this.setState({
                walletData : {
                    'activeWorker' : activeWorker,
                    'unpaidBalance' : unpaidBalance.toFixed(4),
                    'totalBalance' : totalBalance.toFixed(4)
                },
                walletId: walletId,
                loaded: true
            });
        }
    }
    
    render() {
        if (!this.state.loaded) {
            return null;
        }
        return (
            <div className="pt_wallet">
                <div className="dv-input-wallet">
                    <label>Wallet Id:</label>
                    <input type="text" value={this.state.walletId} readOnly={true} />
                </div>
                <div className="qrcode-container">
                    <QRCode value={this.state.walletId} size={170} level='Q'/>
                </div>
                <div className="dv-wallet-details">
                    <div>
                        <p>Active workers:</p>
                        <p> {this.state.walletData.activeWorker} </p>
                    </div>
                    <div>
                        <p>Unpaid balance:</p>
                        <p> {this.state.walletData.unpaidBalance} ETH</p>
                    </div>
                    <div>
                        <p>Wallet balance:</p>
                        <p> {this.state.walletData.totalBalance} ETH</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyWalletComponent;