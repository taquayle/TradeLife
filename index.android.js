// Author: Tyler Quayle
// Date: June 23, 2017
// Desc: Starting file for test app, contains the splash screen when the app is
//        started. Also contains the routing table for rest of app

//  TODO: - Seperate routingtable from this file, put into components
//        - Seperate splash screen from file, put into components

import React from 'react';
import {AppRegistry, Text, View, Button, StyleSheet, Image} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { LoginScreen } from './Screens/Login';
import { RegisterScreen } from './Screens/Register';
import { HomeScreen } from './Screens/Home';
import { ForgotScreen } from './Screens/Forgot';
import { FastLink } from './Screens/FastLink';
import { TransactionScreen } from './Screens/Transactions'
import { ProfileScreen } from './Screens/Profile';
import store from './Screens/Stores/UserStore'

/******************************************************************************/
// Default class
export default class SplashScreen extends React.Component {
  static navigationOptions = {
    title: "Hello", //Useless, a Placeholder
  };
  constructor(props) {
    super(props);
    const { navigate } = this.props.navigation;
    setTimeout(() => { // Execute ONCE
        this.setState(previousState => {navigate('Login')
      });
    }, 1000); //Milliseconds before switch
  }
  render() {
    return (
      <View style = {styles.splashScreen}>
        <Image source={require('./objects/TechCliksLogo.png')}/>
      </View>
    );
  }
}

/******************************************************************************/
// Routing table
const TradeLife = StackNavigator(
{
  Splash: { screen: SplashScreen },
  Login: { screen: LoginScreen },
  Register:{screen: RegisterScreen},
  Home: {screen: HomeScreen},
  Forgot: {screen: ForgotScreen},
  FastLink: {screen: FastLink},
  Transact: {screen: TransactionScreen},
  Profile: {screen: ProfileScreen},
},
navigationOptions =
{
  headerMode: 'none', //Get rid of headers
});

/******************************************************************************/
// Style Sheet
styles = StyleSheet.create({
  splashScreen:{
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
})


AppRegistry.registerComponent('TradeLife', () => TradeLife);
