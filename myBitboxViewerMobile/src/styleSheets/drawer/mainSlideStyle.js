import React from 'react';
import {
    StyleSheet
} from 'react-native';

import {
    DRAWER_BACKGROUND,
    MAIN_BACKGROUND,
    MAIN_TEXT_COLOR,
    BTN_LOGIN_BG_COLOR,
    BTN_CANCEL_BG_COLOR
} from '../const/variable';

const drawerSlideStyle = StyleSheet.create({
    parent : {
        backgroundColor: DRAWER_BACKGROUND,
        maxWidth: 300
    },

    header: {
        height: 120,
        backgroundColor: MAIN_BACKGROUND
    },

    footer: {
        backgroundColor: MAIN_BACKGROUND,
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center'
    },

    itemView: {
        display: 'flex',
        flex:1,
        flexDirection:'row',
        padding: 5,
        paddingLeft: 0
    },

    itemLabel: {
        marginLeft: 10
    },

    itemIcon: {
        color: 'blue'
    },

    url: {
        color: MAIN_TEXT_COLOR
    }
});

export {drawerSlideStyle};