import React, { Component } from 'react';
import {
    Text,
    Image,
    ScrollView,
    View
} from 'react-native';

import { workerItemDetailsStyle } from '../../../styleSheets/worker/workerItemDetailsStyle';
import {
    API_URL
} from '../../../const/variable';
import Button from 'react-native-button';

import {
    TEMP, FAN_SPEED, HASH_RATE, GPU, TOTAL_HASH_RATE
} from '../../../const/variableLabel';

import {
    Container, Content
} from 'native-base'
import HeaderDetailsComponent from '../header/headerDetailsComponent'

class WorkerItemDetailsComponent extends Component {

    static navigationOptions = {
        headerStyle: {
          display: 'none' 
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            dataDetails : []
        }
    }

    getWorkerDetails = async()=> {
        if (this.props.navigation.state.params.status) {
            let response = await fetch(API_URL + 'workers/worker/list/' + this.props.navigation.state.params.workerId + '/detail')
            let dataJson = await response.json();
            if (dataJson.errCode == 0) {
                let data = dataJson.data;
                this.setState({
                    loaded: true,
                    dataDetails: [...data]
                });
            } else {
                this.setState({
                    loaded: true,
                    dataDetails: []
                });
                alert(dataJson.errMessage);
            }
        } else {
            this.setState({
                loaded: true
            });
        }
    }

    deleteWorkerDetail = async() => {
        let response = await fetch(API_URL + 'workers/worker/' + this.props.navigation.state.params.workerId + '/delete')
        let dataJson = await response.json();
        if (dataJson.errCode == 0) {
            let data = dataJson.data;
            this.setState({
                loaded: true
            });
            this.props.navigation.goBack();
        } else {
            this.setState({
                loaded: true
            });
            alert(dataJson.errMessage);
        }
    }

    componentDidMount() {
        this.getWorkerDetails();
    }

    render () {
        let screen = null;
        let totalhash = 0;
        if (this.state.loaded) {
            screen = <ScrollView style={workerItemDetailsStyle.parent}>
                        <View style={workerItemDetailsStyle.parentDetails}>
                            <View style={workerItemDetailsStyle.tableRowHeader}>
                                <View style={workerItemDetailsStyle.colHeader_left}> 
                                    <Text style={workerItemDetailsStyle.textHeader}> {GPU} </Text>
                                </View>
                                <View style={workerItemDetailsStyle.colHeader_hr}>
                                    <Text style={workerItemDetailsStyle.textHeader}> {HASH_RATE} </Text>
                                </View>
                                <View style={workerItemDetailsStyle.colHeader}>
                                    <Text style={workerItemDetailsStyle.textHeader}> {TEMP} </Text>
                                </View>
                                <View style={workerItemDetailsStyle.colHeader}>
                                    <Text style={workerItemDetailsStyle.textHeader}> {FAN_SPEED} </Text>
                                </View>
                            </View>

                            { 
                                this.state.dataDetails.map((item, index)=> {
                                    totalhash += item.hashrate;
                                    return  (<View style={workerItemDetailsStyle.tableRowBody} key={index}>
                                                <View style={workerItemDetailsStyle.colValue_left}>
                                                    <Text style={workerItemDetailsStyle.textValue}> { "#" + (index + 1) } </Text>
                                                </View>
                                                <View style={workerItemDetailsStyle.colValue_hr}>
                                                    <Text style={workerItemDetailsStyle.textValue}> { item.hashrate } </Text>
                                                </View>
                                                <View style={workerItemDetailsStyle.colValue}>
                                                    <Text style={workerItemDetailsStyle.textValue}> { item.temp } </Text>
                                                </View>
                                                <View style={workerItemDetailsStyle.colValue}>
                                                    <Text style={workerItemDetailsStyle.textValue}> { item.fan } </Text>
                                                </View>
                                            </View>);
                                })
                            }
                        </View>
                        {
                            totalhash > 0 && <View>
                                                <Text style={workerItemDetailsStyle.totalhash}> {TOTAL_HASH_RATE} {totalhash.toFixed(3)}</Text>
                                            </View>
                        }
                        <View style={workerItemDetailsStyle.viewButton}>
                            <Button 
                                style={workerItemDetailsStyle.btnDetails}
                                containerStyle={workerItemDetailsStyle.btnCustom}
                                onPress={() => this.props.navigation.goBack()} >
                                Back
                            </Button>
                            <Button 
                                style={workerItemDetailsStyle.btnDetails}
                                containerStyle={workerItemDetailsStyle.btnCustom}
                                onPress={() => {
                                    this.setState({
                                        loaded: false,
                                        dataDetails: []
                                    });
                                    this.getWorkerDetails();
                                }}>
                                Reload
                            </Button>
                        </View>
                        {
                            !this.props.navigation.state.params.status ? 
                                <View style={workerItemDetailsStyle.viewButton}>
                                <Button 
                                    style={workerItemDetailsStyle.btnDetails}
                                    containerStyle={workerItemDetailsStyle.btnRemove}
                                    onPress={() => {
                                        this.deleteWorkerDetail();
                                    }}>
                                    Delete
                                </Button>
                            </View> : null
                        }
                    </ScrollView>
        } else {
            screen = <View style={workerItemDetailsStyle.parentViewLoading}>
                        <Image source={require('../../../../public/images/loading.gif')}
                          style={{width: 200, height: 150}} />
                    </View>
        }

        return (
            <Container style={ workerItemDetailsStyle.parentContainer }>
                <HeaderDetailsComponent walletName={this.props.screenProps.walletName} navigation={this.props.screenProps.mainNavigate}/>
                <Content>
                    {screen}
                </Content>
            </Container>
        )
    }
}

export default WorkerItemDetailsComponent