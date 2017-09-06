// Author: Tyler Quayle
// File: LoginLoading.js
// Date: July 28, 2017
// Desc: Contact yodleeconnect server and add the new keywords

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

export class KeywordAddLoadingScreen extends React.Component {

  constructor(props)
  {
      super(props);
      this.state = {  message: "UPDATING USER KEYWORDS"};
  }
  /**************************************************************************/
  // Once mounted, contact server
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('KeywordsAdd');
      return true //Tell react-navigation that back button is handled
    }.bind(this));

    const { navigate } = this.props.navigation;
    console.log("---- ATTEMPTING TO SUBMIT NEW KEYWORDS TO SERVER ----");
    fetch(Server.profileAddURL(),
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
            keyWords:User.getTempKeys()
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

      if (responseData.error == false) //Success, keywords have been added
      {
          console.log("---- ADDING KEYWORDS SUCCESSFUL ----");
          Profile.setUserKeys(responseData.keywords)
      }
      else if (responseData.error == true) //Failure. log error
      {
          console.log("----  FAILED ----");
          this.setState({
            errMsg: responseData.message})
      }
      else //Unknown error, most likely php error and we just get the laravel text
      {
        console.log("---- UNKOWN ERROR ----");
        this.setState({
          errMsg: "Unknown Error Occured"})
      }
      navigate('KeywordsProfile')
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
