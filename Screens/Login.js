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
import {observer} from "mobx-react";
import { Icon } from 'react-native-elements'
import User from "./Stores/UserStore"
import Server from "./Stores/TradeLifeStore"
import tradeStyle from "./Styles/Default"
import {COLOR_SCHEME, TEXT_SCHEME, MAIN_BG_COLOR} from './Styles/ColorScheme'
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
      //dispatch({type: 'Reset', index: 0, actions: [{ type: 'Navigate', routeName:'Login'}]})
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
            <View style={tradeStyle.wrapper}>
                <View style={tradeStyle.topWrap}>
                    <Image source={require('./Images/TradeLife.png')} style={tradeStyle.logo}/>
                </View>

                <View style={tradeStyle.botWrap}>
                    <View style={tradeStyle.formWrapper}>

                        {/* SHOW ERROR MESSAGE FROM SERVER */}
                        <FormValidationMessage>{this.state.errMsg}</FormValidationMessage>

                        {/* Username Field */}
                        <FormLabel fontFamily = 'monospace'>USERNAME</FormLabel>
                        <FormInput onChangeText={(uName) => this.setState({uName})}/>
                        {/* Password Field */}
                        <FormLabel fontFamily = 'monospace'>PASSWORD</FormLabel>
                        <FormInput secureTextEntry onChangeText={(pWord) => this.setState({pWord})}/>
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
                          buttonStyle={{backgroundColor: MAIN_BG_COLOR, borderRadius: 10}}
                          textStyle={{color: "#000000", textAlign: 'center', fontFamily:'monospace'}}
                          title={`FORGOT PASSWORD`}
                          onPress={() => navigate('Forgot')}
                        />


                </View>
            </View>
        );
    }
}

/******************************************************************************/
