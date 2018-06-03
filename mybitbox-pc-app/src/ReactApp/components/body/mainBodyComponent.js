import React, {Component} from 'react';
import PropTypes from 'prop-types'

import MyWalletContainer from '../../containers/body/myWallet/myWalletContainer';
import MyEarningContainer from '../../containers/body/myEarning/myEarningContainer';
import MyBitboxContainer from '../../containers/body/myBitbox/myBitboxContainer';
import SettingComponent from './setting/settingComponent';

var interval = null;
class MainBodyComponent extends Component {

    constructor(props) {
        super(props);
    }

    toggleScreen (screen) {
        this.props.toggleScreen(screen);
    }

    render() {
        let mainScreen = null;
        switch(this.props.screen) {
            case 'mywallet': mainScreen = <MyWalletContainer />; break;
            case 'myearning': mainScreen = <MyEarningContainer />; break;
            case 'mybitbox': mainScreen = <MyBitboxContainer />; break;
            case 'setting': mainScreen = <SettingComponent />; break;
        }
        clearInterval(interval);

        if (this.props.screen != 'setting') {
            let screen = '';
            if (this.props.screen == 'mywallet') screen = 'myearning'
            if (this.props.screen == 'myearning') screen = 'mybitbox'
            if (this.props.screen == 'mybitbox') screen = 'mywallet'
            interval = setInterval(() => {
                this.toggleScreen(screen);
            }, 60000);
        } 

        return (
            <main>
                {mainScreen}
            </main>
        )
    }
}

export default MainBodyComponent;