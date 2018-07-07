import React, {Component} from 'react';

// import component
import ProductItemComponent from './productItemComponent';

// import variable
import { API_URL } from '../../const/variable';


export default class ListProductComponent extends Component {

    constructor (props) {
        super(props);
        this.state = {
            loaded: false,
            listProduct: []
        }
    }

    componentDidMount() {
        this._getListProduct();
    }

    async _getListProduct () {
        let url = API_URL + 'products/list';
        try {
            let response = await fetch(url, {
                method: 'GET',
                credentials: 'same-origin'
            });
            let jsonData = await response.json();
            if (jsonData.status === 'success') {
                this.setState({
                    loaded: true,
                    listProduct: jsonData.data
                });
            } else {
                this.setState({
                    loaded: true
                })
                console.log(jsonData.errMessage);
            }
        } catch (err) {
            this.setState({
                loaded: true
            })
            console.log(err.errMessage);
        }
    } 

    render () {
        let screen = null;
        if (!this.state.loaded) screen = <i className="fa fa-spinner fa-spin fa-icon-loading"></i>
        else {
            screen = this.state.listProduct.map((item, index)=> {
                return <ProductItemComponent dataProduct={item} key={index} />;
            });
        }
        return (
            screen
        );
    }
}