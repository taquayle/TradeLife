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
  ActivityIndicator
} from 'react-native';
import { StackNavigator } from 'react-navigation';
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
  componentDidMount() // Attempt to login.
  {
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
          else if (responseData.error == true) //Success, allow used in
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

        if (responseData.error == false) //Success move on
        {
            const { navigate } = this.props.navigation;
            console.log("---- PROFILE SUCCESSFUL ----");
            console.log(responseData.profile)
            this.setState({
              message: "PROFILE FOUND"})
            Profile.setProfile(responseData.profile)
        }
        else if (responseData.error == true) // ERROR: display and remain
        {
            console.log("---- NO PROFILE  ----");
            console.log(responseData);
        }
        else {
          console.log("---- UNKNOWN ERROR ----");
          console.log(responseData);
        }
        navigate('Home')
    })

  }

  render() {
      const { navigate } = this.props.navigation;
    return (
        <View style={loading.bg, loading.wrapper}>

            <View style={loading.bg, loading.topWrap}>
                <Image style={loading.logo} source={require('../Images/TradeLife.png')} />
            </View>

            <View style={loading.bg, loading.midWrap}>

            <View style={loading.bg, loading.activityWrap}>
              <ActivityIndicator
                color="#000000"
                style={[loading.bg, {transform: [{scale: 5.5}]}]}
              />
            </View>

            <View style={loading.bg, loading.textWrap}>
              <Text style={loading.loadingText}>{this.state.message}</Text>
            </View>

            </View>

            <View style={loading.bg, loading.bottomBuffer}>
            </View>
        </View>
    );
  }
}

loading = StyleSheet.create({
    logo:{
      resizeMode: 'contain',
      height: 45,
      backgroundColor: 'transparent'
    },
    bg:{
      backgroundColor: '#FFFFFF', //Black
    },
    centering: {
      flex: 2,
    },
    wrapper:{
        flex: 1,
        backgroundColor: '#FFFFFF', //Black
    },
    topWrap:{
        flex: 1,
        alignItems:'center'
    },
    midWrap:{
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activityWrap:{
      flex: 2,
    },
    textWrap:{
      flex:2,
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    bottomBuffer:{
        flex: 2,
    },
    loadingText:{
        color: '#000000',
        fontSize: 20,
        alignItems: 'center',
        fontFamily:'monospace'
    },
})
