import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    BackHandler,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';

import {
    Container, Content
} from 'native-base'

import Button from 'react-native-button';

import {Field, reduxForm, SubmissionError} from 'redux-form';
import {renderInputField} from '../../const/inputFields'

import {registerStyle} from '../../styleSheets/account/registerStyle';

import {
    maxLength, minLength, number, required, match
} from '../../validator/validationFields';

import {
    submitChangePassword
} from '../../const/submitForm';

import {
    MAIN_WALLET_SCREEN
} from '../../const/variableScreen'

import {
    CANCEL, SAVE, CHANGE_PASSWORD
} from '../../const/variableLabel'

const maxLength50 = maxLength(50);
const minLength6 = minLength(6);
const maxLengthPhone = maxLength(15);
const minLengthPhone = minLength(9);
const matchPassword = match('newpassword');

class ChangePasswordComponent extends Component {

    static navigationOptions = {
        headerStyle: {
          display: 'none'
        }
    };

    constructor(props) {
        super(props);
    }

    
    async componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        try {
            this.props.initialize({ 
                'password': '',
                'newpassword': '',
                'newpasswordconfirm': ''
            });
        } catch (err) {
            console.log(err);
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.navigation.navigate("");
        return true;
    }

    updateChangePassword = async(value) => {
        Keyboard.dismiss();
        try {
            let result = await submitChangePassword(value);
            if (result instanceof SubmissionError) {
                throw result;
            }

            if (result) {
                await AsyncStorage.clear();
                this.props.navigation.navigate(MAIN_WALLET_SCREEN);
            }
        } catch (err) {
            console.log(err);
            if (err instanceof SubmissionError) {
                throw err;
            }
        }
    }

    cancel = () => {
        Keyboard.dismiss();
        this.props.navigation.navigate(MAIN_WALLET_SCREEN);
    }

    render () {
        const {handleSubmit, submitting} = this.props;
        return(
            <Container style={registerStyle.parent}>
                <Content>
                    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} style={registerStyle.parentView}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={registerStyle.parentView}>
                                <Text style={registerStyle.header}>{CHANGE_PASSWORD}</Text>
                                <View>
                                    <Field name="password" keyboardType="default" label="Old password *" component={renderInputField} style={registerStyle._input} validate={[required, minLength6, maxLength50]} secureTextEntry={true}/>
                                    <Field name="newpassword" keyboardType="default" label="Create new password *" component={renderInputField} style={registerStyle._input} validate={[required, minLength6, maxLength50]} secureTextEntry={true}/>
                                    <Field name="newpasswordconfirm" keyboardType="default" label="Confirm new password *" component={renderInputField} style={registerStyle._input} validate={[required, minLength6, maxLength50, matchPassword]} secureTextEntry={true}/>
                                    <Field name="hiddenField" keyboardType="default" label="hiddenField" component={renderInputField} style={registerStyle.hidden_input} />
                                </View>
                                {submitting ? <ActivityIndicator size="small" color="#00ff00" /> : 
                                    <View style={registerStyle.viewButton}>
                                        <Button
                                            style={registerStyle.btnRegister}
                                            containerStyle={registerStyle.btnRegisterCustom}
                                            onPress={handleSubmit(this.updateChangePassword)}
                                        >
                                            {SAVE}
                                        </Button>
                                        <Button
                                            style={registerStyle.btnRegister}
                                            containerStyle={registerStyle.btnCancelCustom}
                                            onPress={this.cancel}
                                        >
                                            {CANCEL}
                                        </Button>
                                    </View>
                                }
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </Content>
            </Container>
        );
    }
}

export default ChangePasswordComponent = reduxForm({
    form: "changePassword"
})(ChangePasswordComponent);