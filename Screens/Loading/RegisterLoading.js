// Author: Tyler Quayle
// File: RegisterLoading.js
// Date: August 2, 2017

import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import User from "../Stores/UserStore"
import Server from "../Stores/TradeLifeStore"
import Profile from "../Stores/ProfileStore"
import loadStyle from "../Styles/LoadingStyle"

export class RegisterLoadingScreen extends React.Component {

  constructor(props)
  {
      super(props);
      this.state = {  message: "ATTEMPTING TO REGISTER"};
  }
  /**************************************************************************/
  componentDidMount() // Attempt to login.
  {
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
        if (responseData.error == false) //Success, allow used in
        {
            const { navigate } = this.props.navigation;
            console.log("---- REGISTRATION SUCCESSFUL ----");
            navigate('Login');
        }
        else if (responseData.error == true) //Success, allow used in
        {
            console.log("---- ERROR ON REGISTRATION ----");
            console.log(responseData);
            User.setError(responseData.message)
            navigate('Register')

        }
    })

    .done();
  }


  render() {
    return (
        <View style={loadStyle.bg, loadStyle.wrapper}>

            <View style={loadStyle.bg, loadStyle.topWrap}>
                <Image style={loadStyle.logo} source={require('../Images/TradeLife.png')} />
            </View>

            <View style={loadStyle.bg, loadStyle.midWrap}>

            <View style={loadStyle.bg, loadStyle.activityWrap}>
              <ActivityIndicator
                color="#000000"
                style={[loadStyle.bg, {transform: [{scale: 5.5}]}]}
              />
            </View>

            <View style={loadStyle.bg, loadStyle.textWrap}>
              <Text style={loadStyle.loadingText}>{this.state.message}</Text>
            </View>

            </View>

            <View style={loadStyle.bg, loadStyle.bottomBuffer}>
            </View>
        </View>
    );
  }
}
