// Author: Tyler Quayle
// File: Forgot.js
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
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import tradeStyle from "./Styles/Default"

export class ForgotScreen extends React.Component {
  render() {
      const { navigate } = this.props.navigation;
    return (

        <View style={logStyle.wrapper}>

            <View style={logStyle.logTop}>
                <Image source={require('./Images/TechCliksLogo.png')} />
            </View>

            <View style={logStyle.logBot}>
                <View style={logStyle.formWrapper}>

                    {/* Username Field */}
                    <View style={logStyle.inputWrapper}>
                        <TextInput
                            placeholder="E-Mail"
                            style={logStyle.input}
                            underlineColorAndroid="transparent"
                        />
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity activeOpacity={.5}
                     onPress={() => navigate('Login')}>
                        <View style={regStyle.loginButton} >
                            <Text style={regStyle.LoginText}>
                                Submit
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {/* Return Button */}
                    <TouchableOpacity activeOpacity={.5}
                    onPress={() => navigate('Login')}>
                        <View style={regStyle.registerButton} >
                            <Text style={regStyle.LoginText}>
                                Go Back
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
  }
}
