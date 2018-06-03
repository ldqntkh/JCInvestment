import React, {Component} from 'react';
import {
    Header, Left, Body, Right, Button, Icon, Title
} from 'native-base'
import {
    MAIN_WALLET_SCREEN
} from '../../../const/variableScreen';
export default class HeaderDetailsComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Header style={{ backgroundColor: 'black' }}>
                <Left>
                    <Button transparent onPress={
                        () => {
                            try {
                                this.props.navigation.navigate(MAIN_WALLET_SCREEN)
                            } catch (err) {
                                console.log(err.message);
                            }
                        }
                    }>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title style={{color:'white'}}>{ this.props.walletName }</Title>
                </Body>
                <Right>
                    {/* <Button transparent>
                        <Icon name='menu' />
                    </Button> */}
                </Right>
            </Header>
        )
    }
}