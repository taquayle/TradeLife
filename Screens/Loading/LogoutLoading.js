// Author: Tyler Quayle
// File: LogoutLoading.js
// Date: August 10, 2017

import React from 'react';
import {Text, View, BackHandler, Image} from 'react-native'
import User from "../Stores/UserStore"
import Profile from "../Stores/ProfileStore"
import { StackNavigator } from 'react-navigation';
import tradeStyle from '../Styles/DefaultStyle'
import loadStyle from "../Styles/LoadingStyle"
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
      const { navigate } = this.props.navigation;
    return (
        <View style={loadStyle.bg, loadStyle.wrapper}>

            <View style={loadStyle.bg, loadStyle.topWrap}>
                <Image style={loadStyle.logo} source={require('../Images/TradeLife.png')} />
            </View>


              <Text style={loadStyle.loadingText}>GOODBYE</Text>



            <View style={loadStyle.bg, loadStyle.bottomBuffer}>
            </View>
        </View>
    );
  }
}
