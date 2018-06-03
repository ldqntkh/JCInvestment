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
import {forgotPasswordStyle} from '../../styleSheets/account/forgotPasswordStyle';

import { 
    email, maxLength, minLength, required, match
} from '../../validator/validationFields';

import {
    submitForgotPasswordForm
} from '../../const/submitForm';
import {renderInputField} from '../../const/inputFields'

import {
    FORGOT_PASSWORD, SEND, CANCEL, VALID_TOKEN_EMAIL
} from '../../const/variableLabel'

import {
    LOG_IN_SCREEN
} from '../../const/variableScreen'

const maxLength50 = maxLength(50);
const minLength6 = minLength(6);
const matchPassword = match('newpassword');

class ForgotPasswordComponent extends Component {

    static navigationOptions = {
        headerStyle: {
            display: 'none'
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            step1: false,
            email: null
        }
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

    cancel = () => {
        Keyboard.dismiss();
        this.props.navigation.navigate(LOG_IN_SCREEN);
    }

    send = async value => {
        Keyboard.dismiss();
        try {
            if (this.state.step1) value.email = this.state.email;
            let result = await submitForgotPasswordForm(value);
            if(result instanceof SubmissionError)  throw result;
            if (result == 1) {
                this.setState({
                    step1 : true,
                    email: value.email
                })
            } else if (result == 2) {
                this.props.navigation.navigate(LOG_IN_SCREEN);
            }
        } catch (err) {
            console.log(err);
            if(err instanceof SubmissionError)  throw err
        }
    }

    render() {
        const {handleSubmit, submitting} = this.props;
        return(
            <Container>
                <Content>
                    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} style={ forgotPasswordStyle.parentView }>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={ forgotPasswordStyle.parentView }>
                                <Text style={ forgotPasswordStyle.header }> { FORGOT_PASSWORD } </Text>
                                <View>
                                    {
                                        !this.state.step1 ? <Field name="email" keyboardType="email-address" label="Email *" component={renderInputField} style={forgotPasswordStyle._input} validate={[required, email, minLength6, maxLength50]}/> :
                                        <React.Fragment>
                                            <Text style={ forgotPasswordStyle.validtoken }>{VALID_TOKEN_EMAIL} </Text>
                                            <Field name="token" keyboardType="default" label="Token *" component={renderInputField} style={forgotPasswordStyle._input} validate={[required]}/>
                                            <Field name="newpassword" keyboardType="default" label="Password *" component={renderInputField} style={forgotPasswordStyle._input} validate={[required, minLength6, maxLength50]} secureTextEntry={true}/>
                                            <Field name="newpasswordconfirm" keyboardType="default" label="Confirm password *" component={renderInputField} style={forgotPasswordStyle._input} validate={[required, minLength6, maxLength50, matchPassword]} secureTextEntry={true}/>
                                        </React.Fragment>
                                    }
                                    <Field name="hiddenField" keyboardType="default" label="hiddenField" component={renderInputField} style={forgotPasswordStyle.hidden_input}/>
                                </View>
                                {submitting ? <ActivityIndicator size="small" color="#00ff00" /> :
                                    <View style={forgotPasswordStyle.viewButton}>
                                        <Button
                                            style={forgotPasswordStyle.btnForgotPass}
                                            containerStyle={forgotPasswordStyle.btnForgotCustom}
                                            onPress={handleSubmit(this.send)}
                                        > { SEND } </Button>
                                        <Button
                                            style={forgotPasswordStyle.btnForgotPass}
                                            containerStyle={forgotPasswordStyle.btnCancelCustom}
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

export default ForgotPasswordComponent = reduxForm({
    form: "forgotpassword"
})(ForgotPasswordComponent);