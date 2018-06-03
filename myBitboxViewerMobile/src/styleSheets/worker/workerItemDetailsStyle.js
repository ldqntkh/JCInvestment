import React from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';

import {
    MAIN_BACKGROUND,
    MAIN_TEXT_COLOR,
    LABEL_COLOR_PURPLE,
    BTN_LOGIN_BG_COLOR,
    BTN_CANCEL_BG_COLOR
} from '../const/variable';

let hashrateWidth = (Dimensions.get('window').width -10) / 3;
let columnWidth = (Dimensions.get('window').width -70) / 3;

const workerItemDetailsStyle = StyleSheet.create({
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
        justifyContent: 'center',
        alignItems: 'center',
    },

    parentDetails : {
        borderWidth: 1
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
        width: 40,
        height: 30
    },
    colHeader_hr : {
        width: hashrateWidth,
        height: 30,
    },
    colHeader : {
        width: columnWidth,
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
        width: 40,
        height: 30
    },
    colValue_hr : {
        width: hashrateWidth,
        height: 30
    },
    colValue : {
        width: columnWidth,
        height: 30
    },
    textValue : {
        textAlign: 'center',
        textAlignVertical: 'center',
        lineHeight: 30,
    },

    totalhash : {
        marginTop: 10,
        color: MAIN_TEXT_COLOR,
        fontSize: 16
    },

    viewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },

    btnDetails : {
        fontSize: 20,
        color: MAIN_TEXT_COLOR,
        padding: 10,
        width: 120
    },
    btnCustom: {
        backgroundColor: BTN_LOGIN_BG_COLOR,
        borderRadius: 40,
        paddingLeft: 20,
        paddingRight: 20,
        marginRight: 5
    },
    btnRemove: {
        backgroundColor: BTN_CANCEL_BG_COLOR,
        borderRadius: 40,
        paddingLeft: 20,
        paddingRight: 20,
        marginRight: 5
    }
});

export {workerItemDetailsStyle};