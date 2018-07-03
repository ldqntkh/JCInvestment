import React, {Component} from 'react';

// import container
import ListWalletContainer from '../../containers/wallet/listWalletContainer';
import HandleWalletContainer from '../../containers/wallet/handleWalletContainer';
// import component
import CreateWalletComponent from './handleWalletComponent';
export default class MyWalletComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <React.Fragment>
                <HandleWalletContainer />
                <ListWalletContainer ref="listWallet"/>
            </React.Fragment>
        );
    }
}