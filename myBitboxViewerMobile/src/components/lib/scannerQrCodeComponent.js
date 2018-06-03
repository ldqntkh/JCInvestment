import React, { Component } from 'react';
import {
    LayoutAnimation,
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import {ScannerQrCodeStyle} from '../../styleSheets/lib/scannerQrCodeStyle';

import {
    CANCEL
} from '../../const/variableLabel'

export default class ScannerQrCodeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            lastScannedUrl: null,
            showQrCode: false
        };
    }

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    _handleBarCodeRead = result => {
        if (result.data !== this.state.lastScannedUrl) {
            LayoutAnimation.spring();
            this.props.onChangeValueInput(result.data);
            this.setState({ lastScannedUrl: result.data, showQrCode: false });
        }
    };

    _handlePressCancel = () => {
        this.setState({ lastScannedUrl: null });
    };

    openQRCode = () => {
        this.setState({
            showQrCode: true
        })
    }

    render() {
        if (!this.state.showQrCode) return null;
        return (
            <View style={ScannerQrCodeStyle.container}>
                {this.state.hasCameraPermission === null
                ? <Text>Requesting for camera permission</Text>
                : this.state.hasCameraPermission === false
                    ? <Text style={{ color: '#fff' }}>
                        Camera permission is not granted
                        </Text>
                    : <BarCodeScanner
                        onBarCodeRead={this._handleBarCodeRead}
                        style={StyleSheet.absoluteFill}
                        />}
                <TouchableOpacity style={ScannerQrCodeStyle.cancelView} onPress={
                    () => {
                        this.props.onChangeValueInput("");
                        this.setState({showQrCode: false });
                    }
                }>
                    <Text style={ScannerQrCodeStyle.cancelLabel}>{ CANCEL }</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


