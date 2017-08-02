import React, { Component } from "react";
import {
  AppRegistry,
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { VictoryBar } from "victory-native";

export class TestScreen extends Component {
  render() {
    return (
      <View>
      <Text> TEST.JS </Text>
      <VictoryBar />
      </View>
    );
  }
}
