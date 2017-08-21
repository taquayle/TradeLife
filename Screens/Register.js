// Author: Tyler Quayle
// File: Register.js
// Date: June 23, 2017

import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, BackHandler} from 'react-native'
import { StackNavigator } from 'react-navigation';
import {
    Button,
    FormInput,
    FormLabel,
    FormValidationMessage
  } from 'react-native-elements';
import {COLOR_SCHEME, TEXT_SCHEME, MAIN_BG_COLOR} from './Styles/Attributes'
import User from "./Stores/UserStore"
import Server from "./Stores/TradeLifeStore"
import tradeStyle from "./Styles/DefaultStyle"
import {observable} from "mobx"
import {observer} from "mobx-react"

@observer
export class RegisterScreen extends React.Component {
  componentWillMount(){
    console.log("Current Screen: " + this.props.navigation.state.key)}

  @observable passwordValid = false
  @observable passwordMatch = false
  @observable emailValid = false
  @observable passwordError = ''
  @observable passwordMatchError = ''
  @observable emailError = ''
  @observable usernameValid = false
  @observable usernameError = ''

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('Login');
      return true //Tell react-navigation that back button is handled
    }.bind(this));
    User.setError("")
  }

  constructor(props)
  {
      super(props);

      this.state = {  uName: User.getName(),
                      pWord: User.getPass(),
                      verify: User.getPass(),
                      eMail: User.getMail(),
                      errMsg: User.getError()};
  }

  /**
  * Attempt to register, only submit after everything has been proven valid
  *
  */
  _onSubmit() // Attempt to login.
  {
    if(this.passwordValid && this.emailValid &&
      this.usernameValid && this.passwordMatch){
      const { navigate } = this.props.navigation;
      User.setName(this.state.uName)
      User.setPass(this.state.pWord)
      User.setMail(this.state.eMail)
      navigate('RegisterLoading')}
  }

  validateName(){
    var re = /^(?=.{4,}$)([a-zA-Z0-9_])*$/;
    if (!re.test(this.state.uName)){
      this.usernameValid = false
      this.usernameError = "Username: 4+ characters, A-Z, 0-9, _"
      console.log( "Invalid Username")
    }
    else{
      this.usernameValid = true
      this.usernameError = ""
      console.log( "Valid Username")
    }
    this.forceUpdate() // Refresh screen to show errors
  }

  // Check email, using regex to validate it's a 'good' email
  validateEmail(){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if (!re.test(this.state.eMail)){
       this.emailValid = false
       this.emailError = "Invalid Email"
       console.log( "Invalid Email")
     }
     else{
       this.emailValid = true
       this.emailError = ""
       console.log( "Valid Email")
     }
     this.forceUpdate() // Refresh screen to show errors
  };

  // Yodlee needs: 8+, 1 [A-Z], 1 [0-9], 1 [!@#$%^&*()]. So we may as well
  validatePassword(){
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
    if (!re.test(this.state.pWord)){
      this.passwordValid = false;
      this.passwordError = 'Password: 8+ char, 1 upper, 1 number, 1 special';
      console.log( "Invalid Email")
    }
    else{
      this.passwordValid = true;
      this.passwordError = '';
      console.log( "Password is good")
    }
    this.forceUpdate() // Refresh screen to show errors
  }

  // Check if both passwords are equal
  passwordEqualCheck(){

    if(this.state.verify == this.state.pWord){
      this.passwordMatch = true;
      this.passwordMatchError = '';
    }
    else {
      this.passwordMatch = false;
      this.passwordMatchError = 'Passwords do not match';
    }
    this.forceUpdate() // Refresh screen to show errors
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={tradeStyle.wrapper}>
        <View style={tradeStyle.header}>
        <Image source={require('./Images/TradeLife.png')} style={tradeStyle.logo}/>
        </View>

        <View style={tradeStyle.wrapper}>
          {/******************************************************************/}
          {/* Username Field */}
          <FormLabel fontFamily = 'monospace'>USERNAME</FormLabel>
          <FormValidationMessage>{this.usernameError}</FormValidationMessage>
          <FormInput
            defaultValue = {this.state.uName}
            onChangeText={(uName) => this.setState({uName})}
            onEndEditing={() => this.validateName()}
          />
          {/******************************************************************/}

          {/******************************************************************/}
          {/* Email Field */}
          <FormLabel fontFamily = 'monospace'>E-MAIL</FormLabel>
          <FormValidationMessage>{this.emailError}</FormValidationMessage>
          <FormInput
            defaultValue = {this.state.eMail}
            onChangeText={(eMail) => this.setState({eMail})}
            onEndEditing={() => this.validateEmail()}
          />
          {/******************************************************************/}

          {/******************************************************************/}
          {/* Password Field */}
          <FormLabel fontFamily = 'monospace'>PASSWORD</FormLabel>
          {/* Show password error */}
          <FormValidationMessage>{this.passwordError}</FormValidationMessage>
          <FormInput
            secureTextEntry
            defaultValue = {this.state.pWord}
            onChangeText={(pWord) => this.setState({pWord})}
            onEndEditing={() => this.validatePassword()}
          />
          {/******************************************************************/}

          {/******************************************************************/}
          {/* Verify password */}
          <FormLabel fontFamily = 'monospace'>VERIFY PASSWORD</FormLabel>
          {/* Password Match Error */}
          <FormValidationMessage>{this.passwordMatchError}</FormValidationMessage>
          <FormInput
            secureTextEntry
            defaultValue = {this.state.verify}
            onChangeText={(verify) => this.setState({verify})}
            onEndEditing={()=> this.passwordEqualCheck(this)}
          />
          {/******************************************************************/}

          {/******************************************************************/}
          {/* Submit and back buttons */}
          {/* SHOW ERROR MESSAGE FROM SERVER */}
          <FormValidationMessage>{this.state.errMsg}</FormValidationMessage>
          {/* Submit Button */}
          <Button
            large
            icon={{name: 'check', size: 32}}
            buttonStyle={{backgroundColor: COLOR_SCHEME[0], marginVertical: 10, borderRadius: 40}}
            textStyle={tradeStyle.h2,{color: TEXT_SCHEME[0]}}
            title={`SUBMIT`}
            onPress={this._onSubmit.bind(this)}
          />

          {/* Return Button */}

          <Button
            icon={{name: 'fast-rewind', size: 32}}
            buttonStyle={{backgroundColor: COLOR_SCHEME[1], marginVertical: 10, borderRadius: 40}}
            textStyle={tradeStyle.h2,{color: TEXT_SCHEME[1]}}
            title={`RETURN`}
            onPress={() => navigate('Login')}
          />
          {/******************************************************************/}
        </View>
      </View>
    );
  }
}
