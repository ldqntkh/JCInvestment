import React from 'react';
import {
    StyleSheet
} from 'react-native';

const ScannerQrCodeStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    cancelView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center'
    },
    cancelLabel: {
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        fontSize: 16
    },
});

export {ScannerQrCodeStyle};