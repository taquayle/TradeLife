// Author: Tyler Quayle
// File: LogoutLoading.js
// Date: August 10, 2017

import React from 'react';
import {Text, View, BackHandler} from 'react-native'
import User from "../Stores/UserStore"
import Profile from "../Stores/ProfileStore"
import { StackNavigator } from 'react-navigation';
import tradeStyle from '../Styles/DefaultStyle'
export class LogoutLoadingScreen extends React.Component {

  /**************************************************************************/
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('Login');
      return true //Tell react-navigation that back button is handled
    }.bind(this));

    Profile.signOut();
    User.signOut();
    const { navigate } = this.props.navigation;
    navigate('Login')
  }


  render() {
    return (
        <View>
          <Text style={tradeStyle.body}>GOODBYE</Text>
        </View>
    );
  }
}
