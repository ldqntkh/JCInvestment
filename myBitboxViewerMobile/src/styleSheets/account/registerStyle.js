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

const registerStyle = StyleSheet.create({
    parent : {
        backgroundColor: MAIN_BACKGROUND,
    },

    parentView : {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: Dimensions.get('window').height,
        paddingTop: 20,
        paddingBottom: 20
    },
    parentViewLoading : {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MAIN_BACKGROUND
    },

    header: {
        fontSize: 35,
        color: MAIN_TEXT_COLOR,
        fontWeight: 'bold',
        textAlign: 'center'
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

    btnRegister : {
        fontSize: 20,
        color: MAIN_TEXT_COLOR,
        padding: 10,
        width: 120
    },
    btnRegisterCustom: {
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
    }
});

export {registerStyle};