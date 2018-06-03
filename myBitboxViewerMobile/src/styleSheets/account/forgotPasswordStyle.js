import React from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';

import {
    MAIN_BACKGROUND,
    MAIN_TEXT_COLOR,
    BTN_LOGIN_BG_COLOR,
    BTN_CANCEL_BG_COLOR
} from '../const/variable';

const forgotPasswordStyle = StyleSheet.create({
    parentView : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: Dimensions.get('window').height,
        backgroundColor: MAIN_BACKGROUND,
        paddingTop: 30
    },

    header : {
        fontSize: 40,
        height: 50,
        color: MAIN_TEXT_COLOR,
    },

    _input: {
        borderColor: MAIN_TEXT_COLOR,
        color: MAIN_TEXT_COLOR,
        width: Dimensions.get('window').width < 360 ? 320 : 350,
        height: 40,
        fontSize: 16,
        padding: 5,
    },

    hidden_input: {
        width: 0,
        height: 0
    },

    viewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },

    btnForgotPass : {
        fontSize: 20,
        color: MAIN_TEXT_COLOR,
        padding: 10,
        width: 120
    },
    btnForgotCustom: {
        backgroundColor: BTN_LOGIN_BG_COLOR,
        borderRadius: 40,
        paddingLeft: 20,
        paddingRight: 20,
        marginRight: 5
    },

    btnCancelCustom: {
        backgroundColor: BTN_CANCEL_BG_COLOR,
        borderRadius: 40,
        paddingLeft: 20,
        paddingRight: 20,
        marginLeft: 5
    },
    validtoken: {
        color: 'red',
        margin: 5
    }
});

export {forgotPasswordStyle};