import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Image,
    Text,
    AsyncStorage,
    Alert
} from 'react-native';
import {
    Container, Content
} from 'native-base'
import WorkerItemComponent from './workerItemComponent';
import HeaderDetailsComponent from '../header/headerDetailsComponent'
import { listWorkerStyle } from '../../../styleSheets/worker/listWorkerStyle';
import {
    API_URL,
    KEY_USER_LOGIN
} from '../../../const/variable';
import Button from 'react-native-button';
import {encrypt} from '../../../const/handleString';

import {
    RELOAD, DELETE_ALL
} from '../../../const/variableLabel';

class ListWorkersComponent extends Component {
    static navigationOptions = {
        headerStyle: {
          display: 'none' 
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            dataWorkers : [],
            loaded: false,
            message: ''
        }
    }

    componentDidMount() {
        this.getDataWorkers();
    }

    getDataWorkers = async ()=> {
        let response = await fetch(API_URL + 'workers/worker/list/' + this.props.screenProps.walletId);
        let dataJson = await response.json();
        if (dataJson.errCode == 0) {
            let results = [];
            for(let i in dataJson.data) {
                results.push(dataJson.data[i]);
            }
            this.setState({
                dataWorkers: [...results],
                loaded: true
            });
        } else {
            this.setState({
                loaded: true,
                message: dataJson.errMessage
            });
        }
    }

    deleteAllWorkers = async () => {
        let user_login = await AsyncStorage.getItem(KEY_USER_LOGIN);
        user_login = JSON.parse(user_login);
        let token = encrypt(
            JSON.stringify({
                "userId": user_login.userId,
                "email": user_login.email
            })
        );
        let data = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'token': token
            })
        }
        return fetch(API_URL + 'workers/wallet/' + this.props.screenProps.walletId + '/deleteall', data)
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.errCode == 0) {
                this.setState({loaded: true});
                alert('delete all worker successfully!');
            } else {
                this.setState({loaded: true});
                alert('delete all worker fail!');
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render () {
        let screen  = null;
        if (!this.state.loaded) {
            screen = <View style={listWorkerStyle.parentViewLoading}>
                        <Image source={require('../../../../public/images/loading.gif')}
                          style={{width: 200, height: 150}} />
                    </View>
        } else {
            // make func reload and delete all
            let lstWorker = this.state.dataWorkers.length > 0 ?
                            <ScrollView style={listWorkerStyle.parent}>
                                <View style={listWorkerStyle.parentView}>
                                    { this.state.dataWorkers.map((item, index) => {
                                        return <WorkerItemComponent workerItem={JSON.stringify(item)} key={index} navigation={this.props.navigation}/>
                                    }) }
                                </View>
                            </ScrollView>
                            :
                            <Text style={{fontWeight: 'bold', color: 'red', marginTop: 10}}> {this.state.message} </Text>
            
            screen = <View style={listWorkerStyle.parent}>
                        <View style={listWorkerStyle.viewButton}>
                            <Button 
                                style={listWorkerStyle.btnDetails}
                                containerStyle={listWorkerStyle.btnCustom}
                                onPress={() => {
                                    this.setState({
                                        dataWorkers : [],
                                        loaded: false
                                    });
                                    this.getDataWorkers();
                                }} >
                                {RELOAD}
                            </Button>
                            <Button 
                                style={listWorkerStyle.btnDetails}
                                containerStyle={listWorkerStyle.btnRemove}
                                onPress={() => 
                                    Alert.alert(
                                        'Delete all worker',
                                        'After deleted all worker,the worker data will be updated in 5 minutes',
                                        [
                                            {
                                                text : 'No',
                                                style : 'cancel',
                                                onPress : ()=> {
                                                    // 
                                                }
                                            },
                                            {
                                                text : 'Yes',
                                                style : 'ok',
                                                onPress : ()=> {
                                                    this.deleteAllWorkers();
                                                }
                                            }
                                        ],
                                        {
                                            cancelable: true
                                        }
                                    )
                                }>
                                {DELETE_ALL}
                            </Button>
                        </View>
                        {lstWorker}
                    </View>
        }
        return (
            <Container style={ listWorkerStyle.parentContainer }>
                <HeaderDetailsComponent walletName={this.props.screenProps.walletName} navigation={this.props.screenProps.mainNavigate}/>
                <Content>
                    {screen}
                </Content>
            </Container>
        )
    }
}

export default ListWorkersComponent