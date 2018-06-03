import React from 'react';
import {
    StyleSheet
} from 'react-native';

import {
    MAIN_TEXT_COLOR,
    MAIN_HEADER_BACKGROUND
} from '../const/variable';

const headerStyle = StyleSheet.create({
    parent : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: MAIN_HEADER_BACKGROUND,
        height: 50
    },

    imgHamburger : {
        width : 40,
        height: 40,
        padding: 5,
        margin: 5,
        color: MAIN_TEXT_COLOR
    },

    title : {
        fontSize: 20,
        lineHeight: 50,
        color: MAIN_TEXT_COLOR,
        fontWeight: 'bold'
    }
});

export {headerStyle};