// Author: Tyler Quayle
// File: Forgot.js
// Date: June 23, 2017
// Desc: User forgot screen. Allow user to request new passwqrd. currently a
//        placeholder

/******************************************************************************/
// RN and Addons
import React from 'react';
import {Text, View, StyleSheet, Image , BackHandler} from 'react-native'
import { StackNavigator } from 'react-navigation';
/******************************************************************************/
// STYLE
/******************************************************************************/
// STORE
import tradeStyle from "./Styles/DefaultStyle"

export class ForgotScreen extends React.Component {
  componentWillMount(){
    console.log("Current Screen: " + this.props.navigation.state.key)}

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('Login');
      return true //Tell react-navigation that back button is handled
    }.bind(this));
  }
  render() {
      const { navigate } = this.props.navigation;
    return (

      <View style={tradeStyle.wrapper}>

        <View style={tradeStyle.topWrap}>
            <Image source={require('./Images/TradeLife.png')} />
        </View>

        <View style={tradeStyle.botWrap}>
          <Text style={tradeStyle.body}>PLACEHOLDER</Text>
        </View>
      </View>
    );
  }
}
