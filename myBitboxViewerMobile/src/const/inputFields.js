import React from 'react'
import {
    View,
    TextInput,
    Text
} from 'react-native';
import {
    Picker
} from 'native-base';
import {
    Item, Icon
} from 'native-base';

import { MAIN_TEXT_COLOR } from '../styleSheets/const/variable';

const renderInputField = ({label, keyboardType, secureTextEntry, name, style, styleItem, meta: {touched, error, warn}, input:{onChange, ...restInput} }) => {
    let result = null;
    if (label == "hiddenField") {
        result = <TextInput style={style}/>
    }
    else {
        let inputFiel = <TextInput placeholder={label} style={style}
                            autoCapitalize={"none"}
                            keyboardType={keyboardType}
                            placeholderTextColor='white'
                            secureTextEntry={secureTextEntry}
                            underlineColorAndroid="transparent"
                            onChange={onChange} {...restInput}
                        />
        let icon = null;
        switch (label) {
            case "Email *":
                icon = <Icon name="md-mail"></Icon>;
                break;
            case "Password *":case "Confirm password *":
                icon = <Icon name="md-key"></Icon>;
                break;
            case "Phone number *":
                icon = <Icon name="md-phone-portrait"></Icon>;
                break;
            case "Full name *":
                icon = <Icon name="md-person"></Icon>;
                break;
            case "Token *":
                icon = <Icon name="md-lock"></Icon>
        }
        if (touched && error) {
            result = <Item rounded error style={styleItem ? styleItem : {width:320}}>
                        {icon}
                        {inputFiel}
                    </Item>
        } else {
            result = <Item rounded style={styleItem ? styleItem : {width:320}}>
                        {icon}
                        {inputFiel}
                    </Item>
        }
    }
    return (
        <View style={{marginTop: 10}}>
            { result }
            {touched && ((error && <Text style={{color: 'red'}}>{error}</Text>) ||
                        (warn && <Text style={{color: 'yellow'}}>{warn}</Text>)) }
        </View>
    );
}


const renderInputLoginField = ({label, keyboardType, secureTextEntry, name, style, meta: {touched, error, warn}, input:{onChange, ...restInput} }) => {
    let result = null;
    if (label == "hiddenField") {
        result = <TextInput style={style}/>
    }
    else {
        inputFiel = <TextInput placeholder={label} style={style}
                            autoCapitalize={"none"}
                            keyboardType={keyboardType}
                            placeholderTextColor='white'
                            underlineColorAndroid="transparent"
                            secureTextEntry={secureTextEntry}
                            onChange={onChange} {...restInput}
                        />
        if (touched && error) {
            result = <Item rounded error style={{width:320}}>
                        {label == "Email *"? <Icon name="md-contact"></Icon> : <Icon name="md-key"></Icon>}
                        {inputFiel}
                    </Item>
        } else {
            result = <Item rounded style={{width:320}}>
                        {label == "Email *"? <Icon name="md-contact"></Icon> : <Icon name="md-key"></Icon>}
                        {inputFiel}
                    </Item>
        }
    }
    return (
        <View style={{marginTop: 15}}>
            { result }
            {touched && ((error && <Text style={{color: 'red'}}>{error}</Text>) ||
                        (warn && <Text style={{color: 'yellow'}}>{warn}</Text>)) }
        </View>
    );
}

const renderPicker = ( { input: { onChange, value, ...inputProps }, meta: {touched, error, warn}, children, ...pickerProps, style, viewStyle, iosHeader } ) => {
    let result = null;
    let inputField = null;
    inputField = <Picker
                    mode="dropdown"
                    iosHeader={iosHeader}
                    iosIcon={<Icon name="arrow-dropdown-circle"
                        style={{ color: "#007aff", fontSize: 25 }} />}
                    style={[style]}
                    textStyle={ {color: MAIN_TEXT_COLOR} }
                    selectedValue= { value }
                    onValueChange={ value => onChange(value)}
                    { ...inputProps }
                    { ...pickerProps }
                >
                    { children }
                </Picker>
    return (
        <View>
            <View style={viewStyle}>
                { inputField }
            </View>
            { touched && ((error && <Text style={{color: 'red'}}>{error}</Text>) ||
            (warn && <Text style={{color: 'yellow'}}>{warn}</Text>)) }
        </View>
    );
};

export {
    renderInputField,
    renderInputLoginField,
    renderPicker
}