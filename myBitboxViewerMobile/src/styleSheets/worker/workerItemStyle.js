import React from 'react';
import {
    StyleSheet
} from 'react-native';

import {
    MAIN_TEXT_COLOR,
    BORDER_WORKER_COLOR
} from '../const/variable';

const workerItemStyle = StyleSheet.create({
    parent : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 100,
        height: 100,
        margin: 10,
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: BORDER_WORKER_COLOR
    },

    workerInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    imageWorker: {
        width: 100,
        height: 55
    },

    activeText: {
        color: MAIN_TEXT_COLOR
    },

    inactiveText: {
        color: 'red'
    }
});

export {workerItemStyle};