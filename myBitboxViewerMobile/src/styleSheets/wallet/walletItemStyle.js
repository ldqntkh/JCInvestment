import React from 'react';
import {
    StyleSheet
} from 'react-native';

import {
    MAIN_TEXT_COLOR,
    TRANSPARENT_COLOR
} from '../const/variable';

const walletItemStyle = StyleSheet.create({
    parent : {
        display: 'flex',
        flexDirection: 'row',
        borderBottomColor: '#47315a',
        borderBottomWidth: 1,
        height: 90
    },

    walletItem: {
        display: 'flex',
        flexDirection: 'row',
    },

    image : {
        width: 80,
        height: 80,
        padding: 5,
        paddingTop: 0,
        paddingBottom: 0
    },

    imgShow : {
        marginTop: 30,
        width: 30,
        height: 30,
    },

    leftImage: {
        width: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    rightImage : {
        width: 50
    },

    childText : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 5,
        flex: 2
    },

    walletValue: {
        color: MAIN_TEXT_COLOR,
        fontSize: 15
    },

    walletLabel : {
        color: 'orange',
        fontSize: 16,
        fontWeight: 'bold'
    },

    // swipe
    swipeWallet : {
        backgroundColor: TRANSPARENT_COLOR
    }
});

export {walletItemStyle};