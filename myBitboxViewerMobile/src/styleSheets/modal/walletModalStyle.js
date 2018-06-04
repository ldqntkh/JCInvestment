import React from 'react';
import {
    StyleSheet,
    Platform,
} from 'react-native';

import {
    MAIN_BACKGROUND,
    MAIN_TEXT_COLOR,
    BTN_LOGIN_BG_COLOR,
    BTN_CANCEL_BG_COLOR
} from '../const/variable';

const walletModalStyle = StyleSheet.create({
    parent : {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10,
        height: 350,
        width: 320,
        padding: 5,
        backgroundColor: MAIN_BACKGROUND
    },

    title : {
        fontSize: 25,
        color: MAIN_TEXT_COLOR,
        textAlign: 'center',
        marginTop: 10,
        fontWeight: 'bold'
    },

    description: {
        color: 'red',
        textAlign: 'center',
    },

    inputField : {
        borderColor: MAIN_TEXT_COLOR,
        color: MAIN_TEXT_COLOR,
        width: 300,
        height: 40,
        fontSize: 16,
        padding: 5
    },

    hiddenInput: {
        width: 0,
        height: 0
    },

    pickerView : {
        borderWidth: 0.5,
        borderColor: MAIN_TEXT_COLOR,
        borderRadius: 40,
        width: 300,
        height: 40,
        marginLeft: 3,
        marginTop: 10
    },

    picker : {
        ...Platform.select({
            android: {
                color: MAIN_TEXT_COLOR
            }
        }),
        width: 300,
        height: 40
    },

    btnGroup : {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },

    btnTextModal : {
        fontSize: 20,
        color: MAIN_TEXT_COLOR,
        textAlign: 'center'
    },
    btnCustom: {
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
        width: 120,
        margin: 5
    },
    btnSaveCustom: {
        backgroundColor: BTN_LOGIN_BG_COLOR,
        borderColor: BTN_LOGIN_BG_COLOR
    },
    btnCancelCustom: {
        backgroundColor: BTN_CANCEL_BG_COLOR,
        borderColor: BTN_CANCEL_BG_COLOR
    },
    buttonText : {
        color: MAIN_TEXT_COLOR,
        textAlign: 'center'
    },
    buttonCamera: {
        position: 'absolute',
        top: 10.5,
        right: 9,
        width: 40,
        zIndex: 999,
        backgroundColor: 'white',
        ...Platform.select({
            android: {
                padding: 6
            },
            ios: {
                padding: 4
            }
        }),
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    iconCamera: {
        color: 'red'
    }
});

export {walletModalStyle};