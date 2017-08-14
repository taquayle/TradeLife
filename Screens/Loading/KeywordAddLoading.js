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
import {MAIN_TEXT_COLOR} from "../Styles/LoadingStyle"

export class KeywordAddLoadingScreen extends React.Component {

  constructor(props)
  {
      super(props);
      this.state = {  message: "UPDATING USER KEYWORDS"};
  }
  /**************************************************************************/
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('KeywordsAdd');
      return true //Tell react-navigation that back button is handled
    }.bind(this));

    const { navigate } = this.props.navigation;
    console.log("---- ATTEMPTING TO SUBMIT NEW KEYWORDS TO SERVER ----");
    fetch(Server.profilePostURL(),
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
        console.log(responseData)

        if (responseData.error == false) //Success, allow used in
        {
            console.log("---- ADDING KEYWORDS SUCCESSFUL ----");
            Profile.setUserKeys(responseData.keywords)
            navigate('KeywordsProfile')
        }
        else if (responseData.error == true) //Success, allow used in
        {
            console.log("----  FAILED ----");
            console.log(responseData);
            this.setState({
              errMsg: responseData.message})
        }
        else
        {
          console.log("---- UNKOWN ERROR ----");
          console.log(responseData);
          this.setState({
            errMsg: "Unknown Error Occured"})
        }
        navigate('KeywordsProfile')
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
