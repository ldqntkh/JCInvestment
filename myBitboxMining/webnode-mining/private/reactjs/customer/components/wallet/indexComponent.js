import React, {Component} from 'react';

// import component
import ListWalletComponent from './listWalletComponent';
import CreateWalletComponent from './createWalletComponent';
export default class MyWalletComponent extends Component {

    constructor(props) {
        super(props);

        this._reloadPage = this._reloadPage.bind(this);
    }

    async _reloadPage() {
        await this.refs.listWallet.reloadPage();
    }

    render() {
        return(
            <React.Fragment>
                <CreateWalletComponent _reloadPage={this._reloadPage}/>
                <ListWalletComponent  ref="listWallet"/>
            </React.Fragment>
        );
    }
}