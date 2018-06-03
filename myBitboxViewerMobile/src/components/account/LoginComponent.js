
import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';

import {
    Container, Content
} from 'native-base'

import Button from 'react-native-button';

import {Field, reduxForm, SubmissionError} from 'redux-form';
import {renderInputLoginField} from '../../const/inputFields'

import {loginStyle} from '../../styleSheets/account/loginStyle';

import { 
    email, maxLength, minLength, number, required
} from '../../validator/validationFields';

import {
    submitLoginForm
} from '../../const/submitForm';

import {
    ACCOUNT_LOGIN,
    URL_MAIN_PAGE
} from '../../const/variable';

import {
    FORGOT_PASSWORD, LOG_IN, REGISTER
} from '../../const/variableLabel';

import {
    MAIN_WALLET_SCREEN, REGISTER_SCREEN, FORGOT_PASSWORD_SCREEN
} from '../../const/variableScreen'

import crypto from '../../package/crypto';

const maxLength50 = maxLength(50);
const minLength6 = minLength(6);
const uri = URL_MAIN_PAGE;
class LoginComponent extends Component {

    static navigationOptions = {
        headerStyle: {
          display: 'none' 
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            logged: false
        }
    }

    async componentDidMount() {
        try {
            //await AsyncStorage.clear();
            let account_login = await AsyncStorage.getItem(ACCOUNT_LOGIN);
            if (account_login) {
                //this.props.navigation.navigate(MAIN_WALLET_SCREEN);
                let accountdata = JSON.parse(account_login);
                this.props.initialize({ 
                    email: accountdata.email,
                    password: accountdata.password
                });
                
                this.setState({
                    logged : true
                }); 
                this.touchable.props.onPress();
            } else {
                this.setState({
                    logged : true
                });
            }
        } catch (err) {
            console.log(err);
            this.setState({
                logged : true
            })
        }
    }

    openWebLink = () => {
        Linking.canOpenURL(uri).then(supported => {
            if (supported) {
              Linking.openURL(uri);
            } else {
              console.log("Don't know how to open URI: " + uri);
            }
        });
    }

    login = async value => {
        Keyboard.dismiss();
        // check value before navigate to main screen
        try {
            let result = await submitLoginForm(value);
            if(result instanceof SubmissionError)  throw result;
            if (result) {
                this.props.initialize({ 
                    email: "",
                    password: ""
                });
                this.props.navigation.navigate(MAIN_WALLET_SCREEN);
            }
        } catch (err) {
            console.log(err);
            if(err instanceof SubmissionError)  throw err
        }
    }

    register = () => {
        Keyboard.dismiss();
        this.props.navigation.navigate(REGISTER_SCREEN);
    }

    forgotPassword = ()=> {
        Keyboard.dismiss();
        this.props.navigation.navigate(FORGOT_PASSWORD_SCREEN);
    }

    render () {
        const {handleSubmit, submitting} = this.props;
        
        let screen = null;
        if (!this.state.logged) {
            screen = <View style={loginStyle.parentViewLoading}>
                        <Image source={require('../../../public/images/loading.gif')}
                          style={{width: 200, height: 150}} />
                    </View>
        } else {
            screen = <Container>
                        <Content>
                            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} style={ loginStyle.parentView }>
                                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                    <View style={ loginStyle.parentView }>
                                        <Image source ={ require('../../../public/images/logo.png') } style={ loginStyle.logo_image }/>
                                        <View>
                                            <Field name="email" keyboardType="email-address" label="Email *" component={renderInputLoginField} style={loginStyle.email_input} validate={[required, email, minLength6, maxLength50]}/>
                                            <Field name="password" keyboardType="default" label="Password *" component={renderInputLoginField} style={loginStyle.email_input} validate={[required, minLength6, maxLength50]} secureTextEntry={true}/>
                                            <Field name="hiddenField" keyboardType="default" label="hiddenField" component={renderInputLoginField} style={loginStyle.hidden_input}/>
                                        </View>
                                        <TouchableOpacity onPress={ this.forgotPassword }>
                                            <Text style={ loginStyle.forgotPassword }> { FORGOT_PASSWORD } </Text>
                                        </TouchableOpacity>
                                        {submitting ? <ActivityIndicator size="small" color="#00ff00" /> : 
                                            <React.Fragment>
                                                <Button 
                                                    ref={component => this.touchable = component}
                                                    style={ loginStyle.btnLogin } 
                                                    containerStyle={ loginStyle.btnLoginCustom }
                                                    onPress = { handleSubmit(this.login) }
                                                > {LOG_IN} </Button>

                                                <Button 
                                                    style={ loginStyle.btnLogin } 
                                                    containerStyle={ loginStyle.btnRegisterCustom }
                                                    onPress = { this.register }
                                                > { REGISTER } </Button>
                                            </React.Fragment>
                                        }

                                        <TouchableOpacity onPress={ this.openWebLink }>
                                            <Text style={ loginStyle.url }> {uri} </Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableWithoutFeedback>
                            </KeyboardAvoidingView>
                        </Content>
                    </Container>
        }
        return (
            screen
        );
    }
}

export default LoginComponent = reduxForm({
    form: "login"
})(LoginComponent);