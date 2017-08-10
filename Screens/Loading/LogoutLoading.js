// Author: Tyler Quayle
// File: LogoutLoading.js
// Date: August 10, 2017

import React from 'react';
import {Text, View,} from 'react-native';
import User from "../Stores/UserStore"
import Profile from "../Stores/ProfileStore"
import { StackNavigator } from 'react-navigation';

export class LogoutLoadingScreen extends React.Component {

  /**************************************************************************/
  componentDidMount() // Attempt to login.
  {
    Profile.signOut();
    User.signOut();
    const { navigate } = this.props.navigation;
    navigate('Login')
  }


  render() {
    return (
        <View>
          <Text>GOODBYE</Text>
        </View>
    );
  }
}
