// Author: Tyler Quayle
// File: Register.js
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
  Alert
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export class RegisterScreen extends React.Component {
  constructor(props)
  {
      super(props);
      this.state = {  uName: "sbMemtaquayle1", //REMOVE THESE HARDCODED FIELDS
                      pWord: "sbMemtaquayle1#123",
                      verify: "sbMemtaquayle1#123",
                      eMail: "example2@gmail.com",
                      jsonData: ''};
  }

  /**************************************************************************/
  // Login logic
  _onSubmit() // Attempt to login.
  {
      let userNameInput = this.state.uName;
      let passWordInput = this.state.pWord;
      let eMailInput = this.state.eMail;

      console.log("---- ATTEMPTING REGISTRATION ----");
      fetch('http://192.168.33.10/register',
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
              userPass:passWordInput,
              userEMail:eMailInput
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
          console.log("---- SERVER RESPONSE ----");
          console.log(responseData);

          if (responseData.errors == false) //Success, allow used in
          {
              const { navigate } = this.props.navigation;
              console.log("---- REGISTRATION SUCCESSFUL ----");
              navigate('Login');
          }
          else // ERROR: display and remain
          {
              console.log("---- ERROR ON REGISTRATION ----");
              console.log(responseData);
              Alert.alert(
                  JSON.stringify(responseData.messages))
          }
      })

      .done();
  }

  render() {
      const { navigate } = this.props.navigation;
    return (
        <View style={regStyle.wrapper}>

            <View style={regStyle.logTop}>
                <Image source={require('./Images/TechCliksLogo.png')} />
            </View>

            <View style={regStyle.logBot}>
                <View style={regStyle.formWrapper}>

                    {/* Username Field */}
                    <View style={regStyle.inputWrapper}>
                      <TextInput
                          placeholder="Username"
                          style={logStyle.input}
                          underlineColorAndroid="transparent"
                          onChangeText={(uName) => this.setState({uName})}
                      />
                    </View>

                    {/* Username Field */}
                    <View style={regStyle.inputWrapper}>
                    <TextInput
                        placeholder="E-Mail"
                        style={logStyle.input}
                        underlineColorAndroid="transparent"
                        onChangeText={(eMail) => this.setState({eMail})}
                    />
                    </View>

                    {/* Password Field */}
                    <View style={regStyle.inputWrapper}>
                        <TextInput
                          placeholder="Password"
                          secureTextEntry={true}
                          style={logStyle.input}
                          underlineColorAndroid="transparent"
                          onChangeText={(pWord) => this.setState({pWord})}
                        />
                    </View>

                    <View style={regStyle.inputWrapper}>
                        <TextInput
                          placeholder="Re-enter Password"
                          secureTextEntry={true}
                          style={logStyle.input}
                          underlineColorAndroid="transparent"
                          onChangeText={(pWord) => this.setState({verify})}
                        />
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity activeOpacity={.5}
                    onPress={this._onSubmit.bind(this)}>
                        <View style={logStyle.loginButton} >
                            <Text style={logStyle.LoginText}>
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

regStyle = StyleSheet.create({
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

AppRegistry.registerComponent('RegisterScreen', () => RegisterScreen);
