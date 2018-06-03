import React from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';

import {
    MAIN_BACKGROUND,
    MAIN_TEXT_COLOR,
    BTN_LOGIN_BG_COLOR,
    BTN_REGISTER_BG_COLOR
} from '../const/variable';

const loginStyle = StyleSheet.create({
    parentView : {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height,
        backgroundColor: MAIN_BACKGROUND,
    },

    parentViewLoading : {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MAIN_BACKGROUND
    },

    titleText : {
        color : MAIN_TEXT_COLOR,
        fontSize: 20,
    },

    logo_image : {
        width: Dimensions.get('window').width < 360 ? 320 : 350,
        height: 120,
        marginBottom: 20
    },

    email_input: {
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

    btnLogin : {
        fontSize: 20,
        color: MAIN_TEXT_COLOR,
        padding: 10,
        width: 120
    },
    btnLoginCustom: {
        backgroundColor: BTN_LOGIN_BG_COLOR,
        borderRadius: 40,
        marginBottom: 20,
        marginTop: 20
    },

    btnRegisterCustom: {
        backgroundColor: BTN_REGISTER_BG_COLOR,
        borderRadius: 40,
        marginBottom: 20
    },

    url : {
        fontSize: 20,
        marginTop: 10,
        color: MAIN_TEXT_COLOR,
        textDecorationLine: 'underline',
    },

    forgotPassword : {
        fontSize: 20,
        fontStyle: 'italic',
        marginTop: 10,
        color: MAIN_TEXT_COLOR,
        textDecorationLine: 'underline',
    }
});

export {loginStyle};