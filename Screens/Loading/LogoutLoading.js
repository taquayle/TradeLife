// Author: Tyler Quayle
// File: LogoutLoading.js
// Date: August 10, 2017
// Desc: Log the user out, simply set user store to null.

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


export class LogoutLoadingScreen extends React.Component {

  /**************************************************************************/
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('Login');
      return true //Tell react-navigation that back button is handled
    }.bind(this));

    Profile.signOut();    // Destroy user profile
    User.signOut();
    const { navigate } = this.props.navigation;
    navigate('Login')
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
                <Text style={loadStyle.loadingText}>GOODBYE</Text>
              </View>

            </View>{/* End Mid Flex */}

            {/* Bot Flex, empty, needed for centering */}
            <View style={loadStyle.bg, loadStyle.bottomBuffer}>
            </View>
        </View>// End Main Flex Wrapper
    );
  }
}
