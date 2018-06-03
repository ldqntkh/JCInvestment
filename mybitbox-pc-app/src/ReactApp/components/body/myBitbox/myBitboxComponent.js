import React from 'react';
import { KEY_DATA } from '../../../const/index'

class MyBitboxComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            walletId: '',
            minerName: '',
            dataMiner: []
        }
    }

    componentDidMount() {
        try {
            let storageData = JSON.parse(localStorage.getItem(KEY_DATA));
            let walletId = storageData.walletid;
            let minerName = storageData.minername;
            let claymorepath = storageData.claymorepath;
            this.setState({
                walletId: walletId,
                minerName: minerName
            })
            this.readDataMiner(claymorepath);
        } catch(err) {
            console.log(err);
            this.props.toggleScreen('setting');
        }
    }

    async readDataMiner(folderPath) {
        let fileObj = await getLatestLogFile(folderPath);
        if (fileObj) {
            let fileName = folderPath + '/' + fileObj.fileName
            let data = await readLogFile(fileName);
            if (data && data.length > 0) {
                await this.UpdateWorkerData(data, {
                    claymorepath: folderPath,
                    walletId: this.state.walletId
                });
                this.setState({
                    loaded: true,
                    dataMiner: data
                })
            } 
        }
    }

    async getLatestLogFile(folderPath) {
        let data = await getLatestLogFile(folderPath);
        if (data && data.length > 0) {
            return data;
        }
    }

    async UpdateWorkerData(dataJson, dataConfig) {
        if (await updateWorkerData(dataConfig)) {
            fetch('http://mybitbox888.vn:8088/api/v1/workers/worker/handle', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({data: {
                    workerId: dataBitbox.workerId,
                    name: this.state.minerName,
                    walletId: this.state.walletId,
                    workers: dataJson,
                }})
            }).then(response => response.json())
            .then(result => console.log(result))
            .catch(err => console.log(err));
        }
    }
    render() {
        if (!this.state.loaded) {
            return null;
        }
        else {
            let totalHash = 0;
            return (
                <div className="pt_bitbox">
                    <table>
                        <tbody>
                            <tr className="header">
                                <td>GPU</td>
                                <td>Hashrate (Mh/s)</td>
                                <td>Temp(°C)</td>
                                <td>Fan speed (%)</td>
                            </tr>
                            { this.state.dataMiner.map((item, index) => {
                                totalHash += item.hashrate;
                                return <tr className="row-data" key={index}>
                                            <td>#{index+1}</td>
                                            <td> {item.hashrate} </td>
                                            <td> {item.temp} </td>
                                            <td> {item.fan} </td>
                                        </tr>
                            }) }
                        </tbody>
                    </table>
                    <h3>Total hashrate: {totalHash} Mh/s </h3>
                </div>
            );
        }
    }
}

export default MyBitboxComponent;