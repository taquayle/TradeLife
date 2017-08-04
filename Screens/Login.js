// Author: Tyler Quayle
// File: Login.js
// Date: June 23, 2017

import React from 'react';
import {
  AppRegistry,
  Text,
  View,
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
import {
    Button,
    FormInput,
    FormLabel,
    FormValidationMessage
  } from 'react-native-elements';

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
        this.state = {  uName: User.getName(),
                        pWord: User.getPass(),
                        errMsg: User.getError()};
    }

    /**************************************************************************/
    // Login logic
    _onSubmit() // Attempt to login.
    {
      const { navigate } = this.props.navigation;
      //User.setName(this.state.uName)
      User.setName(this.state.uName)
      //User.setPass(this.state.pWord)
      User.setPass(this.state.pWord)
      navigate('LoginLoading');
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            /******************************************************************/
            // Textinput and buttons
            <View style={logStyle.wrapper}>
                <View style={logStyle.logTop}>
                    <Image source={require('./Images/TradeLife.png')} style={logStyle.logo}/>
                </View>

                <View style={logStyle.logBot}>
                    <View style={logStyle.formWrapper}>

                        {/* SHOW ERROR MESSAGE FROM SERVER */}
                        <FormValidationMessage>{this.state.errMsg}</FormValidationMessage>

                        {/* Username Field */}
                        <FormLabel fontFamily = 'monospace'>USERNAME</FormLabel>
                        <FormInput onChangeText={(uName) => this.setState({uName})}/>
                        {/* Password Field */}
                        <FormLabel fontFamily = 'monospace'>PASSWORD</FormLabel>
                        <FormInput onChangeText={(pWord) => this.setState({pWord})}/>
                    </View>


                        {/* Login Button */}
                        <Button
                          large
                          icon={{name: 'check', size: 32}}
                          buttonStyle={{backgroundColor: "#16608B", marginVertical: 10, borderRadius: 40}}
                          textStyle={{textAlign: 'center', fontFamily:'monospace'}}
                          title={`LOGIN`}
                          onPress={this._onSubmit.bind(this)}
                        />

                        {/* Register Button */}
                        <Button
                          icon={{name: 'room', size: 32}}
                          buttonStyle={{backgroundColor: 'red', borderRadius: 40}}
                          textStyle={{textAlign: 'center', fontFamily:'monospace'}}
                          title={`REGISTER`}
                          onPress={() => navigate('Register')}
                        />

                        {/* Forgot Password*/}
                        <Button
                          buttonStyle={{backgroundColor: 'white', borderRadius: 10}}
                          textStyle={{color: '#000000', textAlign: 'center', fontFamily:'monospace'}}
                          title={`FORGOT PASSWORD`}
                          onPress={() => navigate('Forgot')}
                        />


                </View>
            </View>
        );
    }
}

/******************************************************************************/
// Style Sheet
logStyle = StyleSheet.create({
    logo:{
      resizeMode: 'contain',
      height: 45,
      backgroundColor: 'transparent'
    },
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
        backgroundColor: '#FFFFFF', //Black
        justifyContent: 'center',
        alignItems: 'center'
    },
    logBot:{
        flex: 2,
        backgroundColor: '#FFFFFF', //Black
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
       alignItems: 'center'
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
