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
import store from "./Stores/UserStore"


/******************************************************************************/
// Login Screen Form
@observer
export class LoginScreen extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {  uName: "sbMemtaquayle1", //REMOVE THESE HARDCODED FIELDS
                        pWord: "sbMemtaquayle1#123",
                        jsonData: ''};
    }

    /**************************************************************************/
    // Login logic
    _onSubmit() // Attempt to login.
    {
        let userNameInput = this.state.uName;
        let passWordInput = this.state.pWord;

        console.log("---- ATTEMPTING LOGIN ----");
        fetch('http://192.168.33.10/login',
        {
            method: 'post',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(
            {
                userName:userNameInput,
                userPassword:passWordInput
            })
        })

        .then((response) => {
          // In this case, we check the content-type of the response
          if (response.headers.get('content-type').match(/application\/json/)) {
            return response.json();
          }
          return response.text();
          })
         .catch((error) =>
         {
             console.log(error);
             (response) => response.text();
         })
        .then((responseData) =>
        {
            if (responseData.error == false) //Success, allow used in
            {
                const { navigate } = this.props.navigation;
                console.log("---- LOGIN SUCCESSFUL ----");
                store.setUserName(userNameInput);
                store.setYodleeToken(responseData.yodleeToken);
                navigate('Home');
            }
            else if (responseData.error == true) //Success, allow used in
            {
                console.log("---- INVALID LOGIN ----");
                console.log(responseData);
                Alert.alert(
                    JSON.stringify(responseData.messages))
            }
            else
            {
              console.log("---- UNKOWN ERROR ----");
            }
        })

        .done();
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            /******************************************************************/
            // Textinput and buttons
            <View style={logStyle.wrapper}>

                <View style={logStyle.logTop}>
                    <Image source={require('../objects/TechCliksLogo.png')} />
                </View>

                <View style={logStyle.logBot}>
                    <View style={logStyle.formWrapper}>

                        {/* Username Field */}
                        <View style={logStyle.inputWrapper}>
                            <TextInput
                                placeholder="Username"
                                style={logStyle.input}
                                underlineColorAndroid="transparent"
                                onChangeText={(uName) => this.setState({uName})}
                            />
                        </View>

                        {/* Password Field */}
                        <View style={logStyle.inputWrapper}>
                            <TextInput
                                placeholder="Password"
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

//AppRegistry.registerComponent('LoginScreen', () => LoginScreen);
