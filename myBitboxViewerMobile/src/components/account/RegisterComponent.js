import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    BackHandler,
    ActivityIndicator
} from 'react-native';

import {
    Container, Content
} from 'native-base'

import Button from 'react-native-button';

import {Field, reduxForm, submit, SubmissionError} from 'redux-form';
import {renderInputField} from '../../const/inputFields'

import {registerStyle} from '../../styleSheets/account/registerStyle';

import { 
    email, maxLength, minLength, number, required, match
} from '../../validator/validationFields';

import {
    submitRegisterAccount
} from '../../const/submitForm';

import {
    MAIN_WALLET_SCREEN, LOG_IN_SCREEN
} from '../../const/variableScreen'

import {
    CANCEL, REGISTER, CREATE_ACCOUNT_LABEL
} from '../../const/variableLabel'

const maxLength50 = maxLength(50);
const minLength6 = minLength(6);
const maxLengthPhone = maxLength(15);
const minLengthPhone = minLength(9);
const matchPassword = match('password');

class RegisterComponent extends Component {

    static navigationOptions = {
        headerStyle: {
          display: 'none' 
        }
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = ()=> {
        this.props.navigation.navigate("");
        return true;
    }

    register = async (value) => {
        try {
            let result = await submitRegisterAccount(value);
            let that = this;
            Keyboard.dismiss();

            if (result instanceof SubmissionError) {
                throw result;
            }

            if (result) {
                that.props.navigation.navigate(MAIN_WALLET_SCREEN);
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
        this.props.navigation.navigate(LOG_IN_SCREEN);
    }

    render () {
        const {handleSubmit, submitting} = this.props;
        return (
            <Container style={registerStyle.parent}>
                <Content>
                    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} style={registerStyle.parentView}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={registerStyle.parentView}>
                                <Text style={registerStyle.header}>{CREATE_ACCOUNT_LABEL}</Text>
                                <View>
                                    <Field name="email" keyboardType="email-address" label="Email *" component={renderInputField} style={registerStyle._input} validate={[required, email, minLength6, maxLength50]}/>
                                    <Field name="password" keyboardType="default" label="Password *" component={renderInputField} style={registerStyle._input} validate={[required, minLength6, maxLength50]} secureTextEntry={true}/>
                                    <Field name="passwordconfirm" keyboardType="default" label="Confirm password *" component={renderInputField} style={registerStyle._input} validate={[required, minLength6, maxLength50, matchPassword]} secureTextEntry={true}/>
                                    <Field name="hiddenField" keyboardType="default" label="hiddenField" component={renderInputField} style={registerStyle.hidden_input}/>
                                </View>
                                {submitting ? <ActivityIndicator size="small" color="#00ff00" /> :
                                    <View style={registerStyle.viewButton}>
                                        <Button
                                            style={registerStyle.btnRegister}
                                            containerStyle={registerStyle.btnRegisterCustom}
                                            onPress={handleSubmit(this.register)}
                                        > { REGISTER } </Button>
                                        <Button
                                            style={registerStyle.btnRegister}
                                            containerStyle={registerStyle.btnCancelCustom}
                                            onPress={this.cancel}
                                        > { CANCEL } </Button>
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

export default RegisterComponent = reduxForm({
    form: "register"
})(RegisterComponent);