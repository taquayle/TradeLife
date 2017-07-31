// Author: Tyler Quayle
// File: Login.js
// Date: June 23, 2017

import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {observer} from "mobx-react";
import User from "./Stores/UserStore"
import Server from "./Stores/TradeLifeStore"


/******************************************************************************/
// Login Loading Screen
@observer
export class LoginScreen extends React.Component {

    componentDidMount()
    {
      User.setError("")

    }
    constructor(props)
    {
        super(props);
        this.state = {  uName: User.getUserName(),
                        pWord: "sbMemtaquayle1#123",
                        errMsg: User.getError()};
    }

    /**************************************************************************/
    // Login logic
    _onSubmit() // Attempt to login.
    {
      const { navigate } = this.props.navigation;
      User.setUserName(this.state.uName)
      User.setUserPass(this.state.pWord)
      navigate('LoginLoading');
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            /******************************************************************/
            // Textinput and buttons
            <View style={logStyle.wrapper}>
                <View style={logStyle.logTop}>
                    <Image source={require('./Images/TechCliksLogo.png')} />
                </View>

                <View style={logStyle.logBot}>
                    <View style={logStyle.formWrapper}>

                        {/* Show Login Errors*/}
                        <Text style={logStyle.errorText}>
                          {this.state.errMsg}
                        </Text>

                        {/* Username Field */}
                        <View style={logStyle.inputWrapper}>
                            <TextInput
                                placeholder={this.state.uName}
                                style={logStyle.input}
                                underlineColorAndroid="transparent"
                                onChangeText={(uName) => this.setState({uName})}
                            />
                        </View>

                        {/* Password Field */}
                        <View style={logStyle.inputWrapper}>
                            <TextInput
                                placeholder={"Password"}
                                secureTextEntry={true}
                                style={logStyle.input}
                                underlineColorAndroid="transparent"
                                onChangeText={(pWord) => this.setState({pWord})}
                            />
                        </View>

                        {/* Login Button */}
                        <TouchableOpacity activeOpacity={.5}
                        onPress={this._onSubmit.bind(this)}>
                            <View style={logStyle.loginButton} >
                                <Text style={logStyle.LoginText}>
                                    Sign In
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Register Button */}
                        <TouchableOpacity activeOpacity={.5}
                        onPress={() => navigate('Register')}>
                            <View style={logStyle.registerButton} >
                                <Text style={logStyle.LoginText}>
                                    Register
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Forgot password button */}
                        <TouchableOpacity activeOpacity={.5}
                        onPress={() => navigate('Forgot')}>
                            <View>
                                <Text style={logStyle.forgotText}>
                                    Forget Password
                                </Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        );
    }
}

/******************************************************************************/
// Style Sheet
logStyle = StyleSheet.create({
    errorText:{
      color: '#ff0000',
      fontSize: 15
    },
    backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    },
    wrapper:{
        flex: 1,
        justifyContent: 'center'
    },
    logTop:{
        flex: 1,
        backgroundColor: '#000000', //Black
        justifyContent: 'center',
        alignItems: 'center'
    },
    logBot:{
        flex: 2,
        backgroundColor: '#000000', //Black
    },
    defaultText:{
        color: '#ffffff',
        fontSize: 30
    },
    inputWrapper:{
        flexDirection: "row",
        marginVertical: 10,
        height: 40,
        backgroundColor: "transparent"
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor:"#fff"
    },
    formWrapper:{
       paddingHorizontal: 20
    },
    loginButton:{
        backgroundColor: "#16608B",
        paddingVertical: 15,
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerButton:{
        backgroundColor: "#16608B",
        paddingVertical: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    LoginText:{
        color: '#FFFFFF', //White
        fontSize: 18
    },
    forgotText:{
        color: "#FFFFFF", //white
        backgroundColor: "transparent",
        textAlign: 'center'
    }
})
