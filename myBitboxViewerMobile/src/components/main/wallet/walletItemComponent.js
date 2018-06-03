import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    Alert,
    AsyncStorage
} from 'react-native';

import Swipeout from 'react-native-swipeout';

import {walletItemStyle} from '../../../styleSheets/wallet/walletItemStyle';
import {
    API_URL,
    KEY_USER_LOGIN
} from '../../../const/variable';
import {encrypt} from '../../../const/handleString';

import {
    WALLET_ID, WALLET_NAME
} from '../../../const/variableLabel'

import {
    WALLET_ITEM_DETAILS_SCREEN
} from '../../../const/variableScreen';

class WalletItemComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            activeRowKey : null // walletID
        }
    }

    showWalletDetails = (walletItem)=> {
        let {walletId, walletName, poolService} = walletItem;
        this.props.navigation.navigate(WALLET_ITEM_DETAILS_SCREEN, {walletId, walletName, poolService: poolService});
    }

    deleteWalletDetail = async (walletId) => {
        try {
            let user_login = await AsyncStorage.getItem(KEY_USER_LOGIN);
            user_login = JSON.parse(user_login);
            let token = encrypt(
                JSON.stringify({
                    "userId": user_login.userid,
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
                    'data': {
                        'token': token,
                        'walletData': {
                            'walletId': walletId
                        }
                    }
                })
            };
            let response = await fetch(API_URL + 'wallets/wallet/delete/', data);
            let dataJson = await response.json();
            if (dataJson.errCode == 0) {
                alert('Delete successfully');
                this.props.deleteWallet();
            } else {
                alert(dataJson.errMessage);
            }
        } catch (err) {
            console.error(err);
        }
    }

    render () {
        const swipeSetting = {
            autoClose : true,
            onClose: (secId, rowId, direction) => {
                if (this.state.activeRowKey !== null) {
                    this.setState({
                        activeRowKey : null
                    });
                }
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({
                    activeRowKey : this.props.walletItem.walletId
                }); 
            },
            right : [
                {
                    onPress : ()=> {
                        this.props.showWalletModal(this.props.walletItem)
                    },
                    text: 'Edit',
                    type: 'edit'
                },
                {
                    onPress : ()=> {
                        Alert.alert(
                            'Delete wallet',
                            'Are you sure want to delete?',
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
                                        this.deleteWalletDetail(this.props.walletItem.walletId);
                                    }
                                }
                            ],
                            {
                                cancelable: true
                            }
                        );
                    },
                    text: 'Delete',
                    type: 'delete'
                }
            ],
            left : [
                
            ],
            rowId: this.props.walletIndex,
            sectionId: 1
        };
        return (
            <Swipeout {...swipeSetting} style={ walletItemStyle.swipeWallet }>
                <TouchableOpacity style={ walletItemStyle.parent }
                                    onPress={() => this.showWalletDetails(this.props.walletItem)}>
                    <View style={walletItemStyle.leftImage}>
                        <Image 
                            style={ walletItemStyle.image }
                            source={ this.props.walletItem.image }/>
                    </View>

                    <View style={ walletItemStyle.childText }>
                        <Text numberOfLines={1}>
                            <Text style={ walletItemStyle.walletLabel }>{WALLET_ID}</Text>
                            <Text numberOfLines={1} style={ walletItemStyle.walletValue }> {this.props.walletItem.walletId} </Text>
                        </Text>
                        <Text numberOfLines={1}>
                            <Text style={ walletItemStyle.walletLabel }>{WALLET_NAME}</Text>
                            <Text numberOfLines={1} style={ walletItemStyle.walletValue }> {this.props.walletItem.walletName} </Text>
                        </Text>
                    </View>
                    <TouchableOpacity style={walletItemStyle.rightImage}
                        onPress={() => this.showWalletDetails(this.props.walletItem)}
                        >
                        <Image 
                            style={ walletItemStyle.imgShow }
                            source={ require('../../../../public/images/magnifying.png') }/>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Swipeout>
        )
    }
}

export default WalletItemComponent