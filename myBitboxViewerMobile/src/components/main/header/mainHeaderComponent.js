import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'native-base'

import {headerStyle} from '../../../styleSheets/header/headerStyle';

import {
    MY_WALLET
} from '../../../const/variableLabel';

class MainHeaderComponent extends Component {

    constructor(props) {
        super(props);
    }
    
    render () {
        let showRightButton = this.props.showRightButton;
        return (
            <View style={ headerStyle.parent }>
                <TouchableOpacity onPress={()=> {
                    this.props.navigation.toggleDrawer();
                }}>
                    <Icon 
                        style={ headerStyle.imgHamburger }
                        name ="menu"/>
                </TouchableOpacity>

                <Text style={headerStyle.title}> {MY_WALLET} </Text>

                <TouchableOpacity onPress={ () => {
                    this.props.showWalletModal();
                } }>
                    <Icon 
                        style={ headerStyle.imgHamburger }
                        name="add-circle"/>
                </TouchableOpacity>
            </View>
        )
    }
}

export default MainHeaderComponent