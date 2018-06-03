import React from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';

import {
    MAIN_BACKGROUND,
    MAIN_TEXT_COLOR,
    LABEL_COLOR_PURPLE
} from '../const/variable';

const earningStyle = StyleSheet.create({
    parentContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: MAIN_BACKGROUND
    },
    parent: {
        display: 'flex',
        flex: 1,
        backgroundColor: MAIN_BACKGROUND
    },
    parentViewLoading : {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MAIN_BACKGROUND
    },
    tableRowHeader : {
        display: 'flex',
        flexDirection: 'row',
        flexWrap : 'nowrap',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'white'
    },
    colHeader_left : {
        width: 80,
        height: 30
    },
    colHeader : {
        width: (Dimensions.get('window').width -80) / 3,
        height: 30,
    },
    textHeader : {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,
        color: MAIN_TEXT_COLOR,
        lineHeight: 30,
    },

    tableRowBody : {
        display: 'flex',
        flexDirection: 'row',
        flexWrap : 'nowrap',
        borderBottomWidth: 0.5,
        borderColor: 'white'
    },
    colValue_left : {
        width: 80,
        height: 30
    },
    colValue : {
        width: (Dimensions.get('window').width -80) / 3,
        height: 30
    },
    textValue : {
        textAlign: 'center',
        textAlignVertical: 'center',
        lineHeight: 30,
    }
});

export {earningStyle};