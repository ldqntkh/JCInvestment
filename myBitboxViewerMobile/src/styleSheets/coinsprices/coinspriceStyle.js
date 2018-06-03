import React from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';

import {
    MAIN_TEXT_COLOR
} from '../const/variable';

const coinsPriceStyle = StyleSheet.create({
    parent: {
        display: 'flex',
        borderTopWidth: 2,
        borderColor: MAIN_TEXT_COLOR,
        paddingLeft: 5,
        paddingRight: 5
    },
    itemView : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: MAIN_TEXT_COLOR
    },
    backgroundView : {
        backgroundColor: 'silver'
    },
    viewRowItem : {
        width: Dimensions.get('window').width / 3,
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    percentUp : {
        color: 'green'
    },
    percentDown : {
        color : 'red'
    },
    icon : {
        marginRight: 5,
        fontSize: 15
    },
    name : {
        color: MAIN_TEXT_COLOR,
        fontWeight: 'bold'
    },
    price : {
        color: MAIN_TEXT_COLOR
    }
});

export {coinsPriceStyle};