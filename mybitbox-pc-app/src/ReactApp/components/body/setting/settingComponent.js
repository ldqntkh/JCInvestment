import React, {Component} from 'react';
import {KEY_DATA} from '../../../const/index';
const urlApi = 'http://mybitbox888.vn:8088/api/v1/pools/all';
class SettingComponent extends Component {

    constructor(props) {
        super (props);
        this.state = {
            claymorepath : "",
            walletid: '',
            pool: '',
            minername: '',
            poolservice: '',
            poolservicedata : []
        }
    }

    componentWillMount() {
        let data = localStorage.getItem(KEY_DATA);
        if (data) {
            let dataJson = JSON.parse(data);
            if (dataJson.claymorepath && dataJson.walletid && dataJson.pool && dataJson.minername && dataJson.poolservice) {
                this.setState(dataJson);
            }
        }
    }

    componentDidMount() {
        this.getPoolService();
    }

    async getPoolService() {
        try {
            let results = await fetch(urlApi);
            let rsJson = await results.json();
            if (rsJson.errCode === 0 && rsJson.data) {
                this.setState({
                    poolservicedata: rsJson.data
                })
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    async saveData(state) {
        if (state.claymorepath == '') {
            alert('Please choose a claymore path!');
        } else if (state.walletid == '') {
            alert('Please enter a valid wallet id!');
            this.refs.walletid.focus();
        } else if (state.pool == '') {
            alert('Please enter a valid pool!');
            this.refs.pool.focus();
        } else if (state.minername == '') {
            alert('Please enter a valid miner name!');
            this.refs.minername.focus();
        } else if (state.poolservice == '') {
            alert('Please choose a pool service');
        } else {
            try {
                let data = {
                    claymorepath : state.claymorepath,
                    walletid : state.walletid,
                    pool : state.pool,
                    minername : state.minername,
                    poolservice: state.poolservice
                }
                localStorage.setItem(KEY_DATA, JSON.stringify(data));
                await writeConfigFile(data);
                alert('Please restart your computer to update new data for claymore');
            } catch (err) {
                console.log(err);
            }
        }
    }

    chooseFolderPath() {
        let folderPath = ChoosePathFolder();
        if (folderPath && folderPath.length > 0) {
            this.setState({
                claymorepath: folderPath[0]
            })
        }
    }

    render() {
        return (
            <div className="pt_setting">
                <div className="dv-row">
                    <label>Claymore path:</label>
                    <input name="claymorepath" type="text" readOnly={true} 
                        value={this.state.claymorepath} 
                        onChange={(e)=> this.setState({claymorepath: e.target.value.trim()})}
                    />
                    <button onClick={()=> this.chooseFolderPath()}>...</button>
                </div>
                <div className="dv-row">
                    <label>Wallet id:</label>
                    <input name="walletid" ref="walletid" type="text" 
                        value={this.state.walletid}
                        onChange={(e)=> this.setState({walletid: e.target.value.trim().replace(/ /g, "")})}
                    />
                </div>
                <div className="dv-row">
                    <label>Pool Service:</label>
                    <select name="poolservice"
                        value={this.state.poolservice}
                        onChange={(e) => {
                        this.setState({poolservice : e.target.value});
                    }}>
                        <option value="">Please choose a pool service</option>
                        {this.state.poolservicedata.map((item, index) => <option value={item.poolservice} key={index}> {item.poolname} </option>)}
                    </select>
                </div>
                <div className="dv-row">
                    <label>Pool:</label>
                    <input name="pool" ref="pool" type="text" 
                        value={this.state.pool}
                        onChange={(e)=> this.setState({pool: e.target.value.trim().replace(/ /g, "")})}
                    />
                </div>
                <div className="dv-row">
                    <label>Miner name:</label>
                    <input name="minername" ref="minername" type="text" 
                        value={this.state.minername}
                        onChange={(e)=> this.setState({minername: e.target.value.trim().replace(/ /g, "")})}
                    />
                </div>
                <div className="dv-button-save">
                    <button onClick={() => this.saveData(this.state)}>Save</button>
                </div>
            </div>
        );
    }
}

export default SettingComponent;