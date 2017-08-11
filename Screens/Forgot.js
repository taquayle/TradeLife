// Author: Tyler Quayle
// File: Forgot.js
// Date: June 23, 2017

import React from 'react';
import {Text, View, StyleSheet, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import tradeStyle from "./Styles/DefaultStyle"

export class ForgotScreen extends React.Component {
  componentWillMount(){
    console.log("Current Screen: " + this.props.navigation.state.key)}
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
