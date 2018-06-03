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

import {Field, reduxForm, submit, SubmissionError} from 'redux-form';
import {renderInputField} from '../../const/inputFields'

import {registerStyle} from '../../styleSheets/account/registerStyle';

import { 
    email, maxLength, minLength, number, required, match
} from '../../validator/validationFields';

import {
    submitUpdateAccount
} from '../../const/submitForm';

import {
    MAIN_WALLET_SCREEN, LOG_IN_SCREEN
} from '../../const/variableScreen'

import {
    CANCEL, SAVE, EDIT_YOUR_ACCOUNT
} from '../../const/variableLabel'

import {
    KEY_USER_LOGIN
} from '../../const/variable';

const maxLength50 = maxLength(50);
const minLength6 = minLength(6);
const maxLengthPhone = maxLength(15);
const minLengthPhone = minLength(9);

class MyAccountComponent extends Component {

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
            let user_login = await AsyncStorage.getItem(KEY_USER_LOGIN);
            if (user_login) {
                let jsonData = JSON.parse(user_login);
                this.props.initialize({ 
                    email: jsonData.email,
                    phone: jsonData.phone,
                    fullname: jsonData.fullname
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    async componentDidMount() {
        
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = ()=> {
        this.props.navigation.navigate("");
        return true;
    }

    updateAccount = async (value) => {
        Keyboard.dismiss();
        try {
            let result = await submitUpdateAccount(value);
            if (result instanceof SubmissionError) {
                throw result;
            }

            if (result) {
                alert('Update information success!');
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
        return <Container style={registerStyle.parent}>
                    <Content>
                        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} style={registerStyle.parentView}>
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <View style={registerStyle.parentView}>
                                    <Text style={registerStyle.header}>{EDIT_YOUR_ACCOUNT}</Text>
                                    <View>
                                        <Field name="email" keyboardType="email-address" label="Email *" component={renderInputField} style={registerStyle._input} validate={[required, email, minLength6, maxLength50]}/>
                                        <Field name="phone" keyboardType="numeric" label="Phone number *" component={renderInputField} style={registerStyle._input} validate={[required, minLengthPhone, maxLengthPhone, number]}/>
                                        <Field name="fullname" keyboardType="default" label="Full name *" component={renderInputField} style={registerStyle._input} validate={[required, minLength6, maxLength50]}/>
                                        <Field name="hiddenField" keyboardType="default" label="hiddenField" component={renderInputField} style={registerStyle.hidden_input}/>
                                    </View>
                                    {submitting ? <ActivityIndicator size="small" color="#00ff00" /> :
                                        <View style={registerStyle.viewButton}>
                                            <Button
                                                style={registerStyle.btnRegister}
                                                containerStyle={registerStyle.btnRegisterCustom}
                                                onPress={handleSubmit(this.updateAccount)}
                                            > { SAVE } </Button>
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
    }
}

export default MyAccountComponent = reduxForm({
    form: "editAccount"
})(MyAccountComponent);