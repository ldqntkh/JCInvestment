import React, {Component} from 'react';
import { createDrawerNavigator } from 'react-navigation';

import LoginComponent from '../components/account/LoginComponent';
import RegisterComponent from '../components/account/RegisterComponent';
import ForgotPasswordComponent from '../components/account/ForgotPasswordComponent';
import MyAccountComponent from '../components/account/myAccountComponent';
import ChangePasswordComponent from '../components/account/ChangePasswordComponent';
import MainWalletContainer from '../containers/main/wallet/mainWalletContainer';
import WalletItemDetailsComponent from '../components/main/wallet/walletItemDetailComponent'

import DrawerContent from '../components/main/drawer/mainListItemDrawer';
import {
    LOG_IN_SCREEN
} from '../const/variableScreen';

let drawerScreen = {
    Login : {
        screen : LoginComponent
    },
    Register : {
        screen : RegisterComponent
    },
    ForgotPassword : {
        screen : ForgotPasswordComponent
    },
    MyAccount : {
        screen : MyAccountComponent
    },
    ChangePassword : {
        screen : ChangePasswordComponent
    },
    MainWallet: {
        screen: MainWalletContainer,
    },
    WalletItemDetails: {
        screen: WalletItemDetailsComponent,
    }
}

let drawerConfig = {
    initialRouteName: LOG_IN_SCREEN,
    contentComponent:({navigation})=> <DrawerContent navigation={navigation} routes={drawerScreen} />,
    drawerWidth: 300
}

let MainDrawerNavigation = createDrawerNavigator(drawerScreen, drawerConfig);
export default MainDrawerNavigation;