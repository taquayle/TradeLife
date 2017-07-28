// Author: Tyler Quayle
// File: Home.js
// Date: June 23, 2017

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

export class FastLink extends React.Component {
  render() {
    return (
        <View>
            
            <View>
                <Image source={require('../objects/TechCliksLogo.png')} />
            </View>
            
            <View>
                <Text>
                    FastLink
                </Text>
            </View>
        </View>
    );
  }
}

