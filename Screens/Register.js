// Author: Tyler Quayle
// File: Register.js
// Date: June 23, 2017

import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Image,
  Alert
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {
    Button,
    FormInput,
    FormLabel,
    FormValidationMessage
  } from 'react-native-elements';

import User from "./Stores/UserStore"
import Server from "./Stores/TradeLifeStore"
import tradeStyle from "./Styles/Default"
export class RegisterScreen extends React.Component {
  componentDidMount()
  {
    User.setError("")
  }

  constructor(props)
  {
      super(props);

      this.state = {  uName: "sbMemtaquayle1", //REMOVE THESE HARDCODED FIELDS
                      pWord: "sbMemtaquayle1#123",
                      verify: "sbMemtaquayle1#123",
                      eMail: "example2@gmail.com",
                      errMsg: User.getError(),
                      jsonData: ''};
  }

  /**************************************************************************/
  // Login logic
  _onSubmit() // Attempt to login.
  {
    const { navigate } = this.props.navigation;
    User.setName(this.state.uName)
    User.setPass(this.state.pWord)
    User.setMail(this.state.eMail)
    navigate('RegisterLoading')
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={regStyle.wrapper}>

        <View style={regStyle.logTop}>
          <Image source={require('./Images/TradeLife.png')} style={logStyle.logo}/>
        </View>

        {/* SHOW ERROR MESSAGE FROM SERVER */}
        <FormValidationMessage>{this.state.errMsg}</FormValidationMessage>

        <View style={regStyle.logBot}>
          {/* Username Field */}
          <FormLabel fontFamily = 'monospace'>USERNAME</FormLabel>
          <FormInput
            autoCapitalize='characters'
            onChangeText={(uName) => this.setState({uName})}
          />

          {/* Email Field */}
          <FormLabel fontFamily = 'monospace'>E-MAIL</FormLabel>
          <FormInput
            autoCapitalize='characters'
            onChangeText={(eMail) => this.setState({eMail})}
          />


          {/* Password Field */}

          <FormLabel fontFamily = 'monospace'>PASSWORD</FormLabel>
          <FormInput
            autoCapitalize='characters'
            secureTextEntry={true}
            onChangeText={(pWord) => this.setState({pWord})}
          />

          <FormLabel fontFamily = 'monospace'>VERIFY PASSWORD</FormLabel>
          <FormInput
            autoCapitalize='characters'
            secureTextEntry={true}
            onChangeText={(pWord) => this.setState({verify})}
          />


          {/* Submit Button */}
          <Button
            large
            icon={{name: 'check', size: 32}}
            buttonStyle={{backgroundColor: "#16608B", marginVertical: 5, borderRadius: 40}}
            textStyle={{textAlign: 'center', fontFamily:'monospace'}}
            title={`SUBMIT`}
            onPress={this._onSubmit.bind(this)}
          />

          {/* Return Button */}

          <Button
            icon={{name: 'fast-rewind', size: 32}}
            buttonStyle={{backgroundColor: "red", marginVertical: 5, borderRadius: 40}}
            textStyle={{textAlign: 'center', fontFamily:'monospace'}}
            title={`RETURN`}
            onPress={() => navigate('Login')}
          />
        </View>
      </View>
    );
  }
}

regStyle = StyleSheet.create({
    wrapper:{
        flex: 1,
        justifyContent: 'center'
    },
    logTop:{
        flex: .25,
        backgroundColor: '#FFFFFF', //Black
        justifyContent: 'center',
        alignItems: 'center'
    },
    logBot:{
        flex: .75,
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

AppRegistry.registerComponent('RegisterScreen', () => RegisterScreen);
