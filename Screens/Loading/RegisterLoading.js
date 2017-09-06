// Author: Tyler Quayle
// File: RegisterLoading.js
// Date: August 2, 2017

/******************************************************************************/
// React native & installed addons
import React from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator, BackHandler} from 'react-native'
import { StackNavigator } from 'react-navigation';

/******************************************************************************/
// Styles
import loadStyle from "../Styles/LoadingStyle"
import {MAIN_TEXT_COLOR} from "../Styles/Attributes"

/******************************************************************************/
// Stores
import User from "../Stores/UserStore"
import Server from "../Stores/TradeLifeStore"
import Profile from "../Stores/ProfileStore"

export class RegisterLoadingScreen extends React.Component {

  constructor(props)
  {
      super(props);
      this.state = {  message: "ATTEMPTING TO REGISTER"};
  }
  /**************************************************************************/
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('Login');
      return true //Tell react-navigation that back button is handled
    }.bind(this));

    const { navigate } = this.props.navigation;
    console.log("---- ATTEMPTING REGISTRATION ----");
    fetch(Server.registerPutURL(),
    {
        method: 'post',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(
        {
            userName: User.getName(),
            userPass: User.getPass(),
            userEMail: User.getMail(),
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
      console.log("---- SERVER RESPONSE ----")
      console.log(responseData)
      if (responseData.error == false) //Success, return to login
      {
          const { navigate } = this.props.navigation;
          console.log("---- REGISTRATION SUCCESSFUL ----");
          navigate('Login');
      }
      else if (responseData.error == true) // Failure, return to register with error
      {
          console.log("---- ERROR ON REGISTRATION ----");
          console.log(responseData);
          User.setError(responseData.message)
          navigate('Register')

      }
      else{
        console.log("---- UNKNOWN ERROR ----")
        console.log(responseData)
        User.setError("Unknown Error, please try again")
        navigate('Register')
      }
    })

    .done();
  }


  render() {
      const { navigate } = this.props.navigation;
    return (
        // Main Flex Wrapper
        <View style={loadStyle.bg, loadStyle.wrapper}>
            {/* Top graphic */}
            <View style={loadStyle.bg, loadStyle.topWrap}>
                <Image style={loadStyle.logo} source={require('../Images/TradeLife.png')} />
            </View>

            {/* Mid Flex */}
            <View style={loadStyle.bg, loadStyle.midWrap}>

              {/* Loading Icon */}
              <View style={loadStyle.bg, loadStyle.activityWrap}>
                <ActivityIndicator
                  color = { MAIN_TEXT_COLOR }
                  style={[loadStyle.bg, {transform: [{scale: 5.5}]}]}
                />
              </View>

              {/* Loading Text */}
              <View style={loadStyle.bg, loadStyle.textWrap}>
                <Text style={loadStyle.loadingText}>{this.state.message}</Text>
              </View>

            </View>{/* End Mid Flex */}

            {/* Bot Flex, empty, needed for centering */}
            <View style={loadStyle.bg, loadStyle.bottomBuffer}>
            </View>
        </View>// End Main Flex Wrapper
    );
  }
}
