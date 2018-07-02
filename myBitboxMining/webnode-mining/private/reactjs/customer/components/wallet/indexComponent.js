import React, {Component} from 'react';

// import component
import ListWalletComponent from './listWalletComponent';

export default class MyWalletComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <ListWalletComponent />
        );
    }
}