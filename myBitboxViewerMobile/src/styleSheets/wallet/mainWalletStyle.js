import React from 'react';
import {
    StyleSheet
} from 'react-native';

import {
    MAIN_BACKGROUND
} from '../const/variable';

const mainWalletStyle = StyleSheet.create({
    parent : {
        display: 'flex',
        flex: 2,
        flexDirection: 'column',
        backgroundColor: MAIN_BACKGROUND,
    },
    parentCoinsPrice : {
        flex: 1,
        paddingBottom: 20,
        backgroundColor: MAIN_BACKGROUND,
    },
    parentViewLoading : {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MAIN_BACKGROUND
    },
});

export {mainWalletStyle};