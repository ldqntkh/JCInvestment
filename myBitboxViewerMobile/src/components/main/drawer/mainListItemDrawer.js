import React, {Component} from 'react';
import {
    Image,
    Linking,
    TouchableOpacity,
    AsyncStorage
} from 'react-native'
import {
    Container, Content, Header, Footer, Text, H2, List, ListItem, Icon
} from 'native-base'
import {
    drawerSlideStyle
} from '../../../styleSheets/drawer/mainSlideStyle'

import {
    URL_MAIN_PAGE, KEY_USER_LOGIN
} from '../../../const/variable'
import {
    LOG_IN_SCREEN, REGISTER_SCREEN, FORGOT_PASSWORD_SCREEN, MY_ACCOUNT_SCREEN, CHANGE_PASSWORD_SCREEN, MAIN_WALLET_SCREEN, 
} from '../../../const/variableScreen';

import {
    MY_WALLET, MY_ACCOUNT, CHANGE_PASSWORD, LOG_OUT, LOG_IN, FORGOT_PASSWORD
} from '../../../const/variableLabel';

import {
    ICON_WALLET, ICON_ACCOUNT, ICON_CHANGE_PASSWORD, ICON_LOG_IN, ICON_LOG_OUT
} from '../../../const/variableIconName';

var navitems =[
    {
        name: MY_WALLET,
        nav: MAIN_WALLET_SCREEN,
        checklogin: true,
        iconname: ICON_WALLET
    },
    {
        name: MY_ACCOUNT,
        nav: MY_ACCOUNT_SCREEN,
        checklogin: true,
        iconname: ICON_ACCOUNT
    },
    {
        name: CHANGE_PASSWORD,
        nav: CHANGE_PASSWORD_SCREEN,
        checklogin: true,
        iconname: ICON_CHANGE_PASSWORD
    },
    // tìm cách remove mấy thằng này nếu đã login
    {
        name: LOG_IN,
        nav: LOG_IN_SCREEN,
        iconname: ICON_LOG_IN
    },
    {
        name: LOG_OUT,
        nav: null,
        iconname: ICON_LOG_OUT
    }
]

//this is the custom component i want to put in the drawer, can be any component of course
class DrawerContent extends Component{ 
    constructor(props) {
        super(props)
    }

    openWebLink = () => {
        Linking.canOpenURL(URL_MAIN_PAGE).then(supported => {
            if (supported) {
              Linking.openURL(URL_MAIN_PAGE);
            } else {
              console.log("Don't know how to open URI: " + URL_MAIN_PAGE);
            }
        });
    }

    logout = async () => {
        try {
            await AsyncStorage.clear();
            this.props.navigation.navigate(LOG_IN_SCREEN);
        } catch(err) {
            console.log(err.message);
        }
    }

    checkLogin = async (nav) => {
        try {
            let user_login = await AsyncStorage.getItem(KEY_USER_LOGIN);
            user_login = JSON.parse(user_login);
            if(user_login && user_login.hasOwnProperty('userid')) {
                this.props.navigation.navigate(nav);
            } else {
                this.props.navigation.navigate(LOG_IN_SCREEN);
            }
        } catch (err) {
            console.log(err.message);
            this.props.navigation.navigate(LOG_IN_SCREEN);
        }
    }

    render(){
        return  (
            <Container style={drawerSlideStyle.parent}>
                <Header style={drawerSlideStyle.header}>
                    <Image source ={ require('../../../../public/images/logo.png') } style={{height: 100, width: 250}}/>
                </Header>
                <Content>
                    <List>
                        {
                            navitems.map((item, index) => {
                                return (
                                    <ListItem key={index}>
                                        <TouchableOpacity style={drawerSlideStyle.itemView} onPress={
                                            () => {
                                                if (item.nav !== null)
                                                    if(item.hasOwnProperty('checklogin') && item.checklogin) {
                                                        this.checkLogin(item.nav);
                                                    } else {
                                                        this.props.navigation.navigate(item.nav);
                                                    }
                                                else {
                                                    this.logout();
                                                }
                                            }
                                        }>
                                            <Icon style={drawerSlideStyle.itemIcon} type="MaterialCommunityIcons" name={item.iconname}></Icon>
                                            <Text style={drawerSlideStyle.itemLabel}> {item.name} </Text>
                                        </TouchableOpacity>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Content>
                <Footer style={drawerSlideStyle.footer}>
                    <TouchableOpacity onPress={this.openWebLink}>
                        <H2 style={drawerSlideStyle.url}> {URL_MAIN_PAGE} </H2>
                    </TouchableOpacity>
                </Footer>
            </Container>
        )
    }
}

export default DrawerContent;