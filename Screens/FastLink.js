// Author: Tyler Quayle
// File: Home.js
// Date: June 23, 2017

import React from 'react';
import { Text, View, StyleSheet, Image,} from 'react-native';
import { StackNavigator } from 'react-navigation';

export class FastLink extends React.Component {
  componentWillMount(){
    console.log("Current Screen: " + this.props.navigation.state.key)}
  render() {
    return (
        <View>
        <Text style={tradeStyle.body}>EMPTY</Text>
        </View>
    );
  }
}
