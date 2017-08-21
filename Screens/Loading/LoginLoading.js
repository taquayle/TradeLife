// Author: Tyler Quayle
// File: LoginLoading.js
// Date: July 28, 2017

import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  BackHandler} from 'react-native'
import { StackNavigator } from 'react-navigation';
import User from "../Stores/UserStore"
import Server from "../Stores/TradeLifeStore"
import Profile from "../Stores/ProfileStore"
import loadStyle from "../Styles/LoadingStyle"
import {MAIN_TEXT_COLOR} from "../Styles/Attributes"

export class LoginLoadingScreen extends React.Component {

  constructor(props)
  {
      super(props);
      this.state = {  message: "ATTEMPTING LOGIN...."};
  }
  /**************************************************************************/
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('Login');
      return true //Tell react-navigation that back button is handled
    }.bind(this));

    this.loginToServer()

  }

  /**
  * Login to the tradelife Server
  *
  *
  * @return navigation, to the login screen if failed, to home if successful
  */
  loginToServer(){
    console.log(Server.loginURL())
    const { navigate } = this.props.navigation;
    console.log("---- ATTEMPTING LOGIN ----");
    fetch(Server.loginURL(),
    {
        method: 'post',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(
        {
            userName:User.getName(),
            userPassword:User.getPass()
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
        if(responseData == null){
          console.log("--- COULD NOT CONNECT TO TRADELIFE SERVER ---")
            User.setError("Could not connect to server")
            navigate('Login')
        }
        else if (responseData.error == false) //Success, allow used in
        {
            console.log("---- LOGIN SUCCESSFUL ----");
            User.setYodleeToken(responseData.yodleeToken);
            this.setState({
              message: "LOGIN SUCCESSFUL"})
            this.getUserProfile()
        }
        else if (responseData.error == true)
        {
            console.log("---- LOGIN FAILED ----");
            console.log(responseData);
            User.setError(responseData.messages)
            navigate('Login');
        }
        else
        {
          console.log("---- UNKOWN ERROR ----");
          console.log(responseData);
          User.setError(responseData.messages)
          navigate('Login');
        }
    })
  }
  getUserProfile()
  {
    const { navigate } = this.props.navigation;
    console.log("---- ATTEMPTING TO GET PROFILE ----");
    this.setState({
      message: "GETTING PROFILE"})
    fetch(Server.profileGetURL(),
    {
        method: 'post',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(
        {
            userName:User.getName(),
            yodleeToken:User.getYodleeToken()
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
      if (responseData.error == false) //Success move on
      {
          const { navigate } = this.props.navigation;
          console.log("---- PROFILE SUCCESSFUL ----");
          this.setState({
            message: "PROFILE FOUND"})
          if(responseData.profile['Target_Companies'] == null)
            Profile.baseProfile(responseData.profile)
          else //User has valid keywords
            Profile.setProfile(responseData.profile)
      }
      else if (responseData.error == true) // ERROR: display and remain
      {
          console.log("---- NO PROFILE  ----");

      }
      else {
        console.log("---- UNKNOWN ERROR ----");
      }
      navigate('Home')
    })

  }

  render() {
      const { navigate } = this.props.navigation;
    return (
        <View style={loadStyle.bg, loadStyle.wrapper}>

            <View style={loadStyle.bg, loadStyle.topWrap}>
                <Image style={loadStyle.logo} source={require('../Images/TradeLife.png')} />
            </View>

            <View style={loadStyle.bg, loadStyle.midWrap}>

            <View style={loadStyle.bg, loadStyle.activityWrap}>
              <ActivityIndicator
                color = { MAIN_TEXT_COLOR }
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
