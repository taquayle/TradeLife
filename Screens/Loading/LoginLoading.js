// Author: Tyler Quayle
// File: LoginLoading.js
// Date: July 28, 2017
// Desc: Attempt to login to yodleeConnect server

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

        if(responseData == null){ // Most likely timeout from server
          console.log("--- COULD NOT CONNECT TO TRADELIFE SERVER ---")
            User.setError("Could not connect to server")
            navigate('Login')
        }
        //Success, attempt to get user profile
        else if (responseData.error == false)
        {
            console.log("---- LOGIN SUCCESSFUL ----");
            User.setYodleeToken(responseData.yodleeToken);
            this.setState({
              message: "LOGIN SUCCESSFUL"})
            this.getUserProfile()
        }

        // Failure, return to login and display error
        else if (responseData.error == true)
        {
            console.log("---- LOGIN FAILED ----");
            User.setError(responseData.messages)
            navigate('Login');
        }

        // Unkown error, most likely laravel php error as the response
        else
        {
          console.log("---- UNKOWN ERROR ----");
          User.setError("Unknown Error Occured")
          navigate('Login');
        }
    })
  }

  /**
  * Attempt to get the user profile, if the user is new the server will create a
  * 'baseProfile' which contains a creation date and name.
  *
  */
  getUserProfile()
  {
    const { navigate } = this.props.navigation;
    console.log("---- ATTEMPTING TO GET PROFILE ----");
    this.setState({
      message: "GETTING PROFILE"})
    fetch(Server.profileRetrieveURL(),
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

      // Success, profile controller returned profile
      if (responseData.error == false)
      {
          const { navigate } = this.props.navigation;
          console.log("---- PROFILE SUCCESSFUL ----");
          this.setState({
            message: "PROFILE FOUND"})

          // Check if the user has ever generated target companies, if the user
          // hasn't then it's a 'baseProfile'
          if(responseData.profile['Target_Companies'] == null)
            Profile.baseProfile(responseData.profile)

          //User has full profile. continue
          else
            Profile.setProfile(responseData.profile)
      }

      // Failure, this shouldn't happen since if no profile exists the Server
      // will send a 'baseProfile'
      else if (responseData.error == true) // ERROR: display and remain
      {
          console.log("---- NO PROFILE  ----");

      }

      // This will be shown if server responds with laravel php error
      else {
        console.log("---- UNKNOWN ERROR ----");
      }
      navigate('Home')
    })

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
