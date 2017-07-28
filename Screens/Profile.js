// Author: Tyler Quayle
// File: Home.js
// Date: July 26, 2017

import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {observer} from "mobx-react";
import store from "./Stores/UserStore"


@observer
export class ProfileScreen extends React.Component {

  render() {
    return (
      <View>
        <Text>{console.log(store.getProfile())}Hello, {store.getUserName()} </Text>
        <Text>{store.getProfile()} </Text>
      </View>
    )
  }
}
