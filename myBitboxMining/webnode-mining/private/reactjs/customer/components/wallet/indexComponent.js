import React, {Component} from 'react';

// import container
import ListWalletContainer from '../../containers/wallet/listWalletContainer';
import CreateWalletContainer from '../../containers/wallet/createWalletContainer';
// import component
export default class MyWalletComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <React.Fragment>
                <CreateWalletContainer ref="CreateWallet"/>
                <ListWalletContainer ref="listWallet" refCreateWallet={this.refs.CreateWallet}/>
            </React.Fragment>
        );
    }
}