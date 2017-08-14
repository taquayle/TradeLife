// Author: Tyler Quayle
// File: Home.js
// Date: June 23, 2017

import React from 'react';
import { Text, View, StyleSheet, Image, BackHandler} from 'react-native'
import { StackNavigator } from 'react-navigation';
import tradeStyle from './Styles/DefaultStyle'

export class FastLink extends React.Component {
  componentWillMount(){
    console.log("Current Screen: " + this.props.navigation.state.key)}
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('Home');
      return true //Tell react-navigation that back button is handled
    }.bind(this));
  }
  render() {
    return (
        <View>
        <Text style={tradeStyle.body}>EMPTY</Text>
        </View>
    );
  }
}
