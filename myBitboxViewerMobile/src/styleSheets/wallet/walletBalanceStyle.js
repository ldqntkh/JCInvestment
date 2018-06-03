import React from 'react';
import {
    StyleSheet
} from 'react-native';

import {
    MAIN_BACKGROUND,
    LABEL_COLOR_PURPLE
} from '../const/variable';

const walletBalanceStyle = StyleSheet.create({
    parentContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: MAIN_BACKGROUND
    },
    parent : {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: 20
    },

    parentView : {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 50
    },

    parentViewLoading : {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MAIN_BACKGROUND
    },

    qrCode: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: 290,
        paddingVertical: 20,
        paddingHorizontal: null
    },

    label: {
        fontSize: 20,
        color: LABEL_COLOR_PURPLE
    },

    labelValue: {
        fontSize: 20
    },

    labelWLValue: {
        fontSize: 20,
        textAlign:'center',
        marginBottom: 10
    },

    viewLabel: {
        display: 'flex',
        flexDirection: 'row',
    }
});

export {walletBalanceStyle};