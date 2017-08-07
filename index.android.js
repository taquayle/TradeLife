// Author: Tyler Quayle
// Date: June 23, 2017
// Desc: Starting file for test app, contains the splash screen when the app is
//        started. Also contains the routing table for rest of app

//  TODO: - Seperate routingtable from this file, put into components
//        - Seperate splash screen from file, put into components

import React from 'react';
import {AppRegistry, Text, View, Button, StyleSheet, Image} from 'react-native';
import { StackNavigator } from 'react-navigation';

/******************************************************************************/
// SCREENS
import { LoginScreen } from './Screens/Login';
import { RegisterScreen } from './Screens/Register';
import { HomeScreen } from './Screens/Home';
import { ForgotScreen } from './Screens/Forgot';
import { FastLink } from './Screens/FastLink';
import { TransactionScreen } from './Screens/Transactions'
import { ProfileStocksScreen } from './Screens/Profile_Stocks';
import { ProfileKeywordsScreen } from './Screens/Profile_Keywords';
import { KeywordsAddScreen } from './Screens/Keywords_Add';
import { KeywordsUserScreen } from './Screens/Keywords_User';
import { StocksScreen } from './Screens/Stocks';

/******************************************************************************/
// LOADING SCREENS
import { LoginLoadingScreen } from './Screens/Loading/LoginLoading'
import { RegisterLoadingScreen } from './Screens/Loading/RegisterLoading'
import { ProfileLoadingScreen } from './Screens/Loading/ProfileLoading'

/******************************************************************************/
// STYLES

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
        this.setState(previousState => {navigate('Login')});
    }, 1000); //Milliseconds before switch
  }
  render() {
    return (
      <View style = {styles.splashScreen}>
        <Image source={require('./Screens/Images/TradeLife.png')} style={styles.logo}/>
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
  ProfileStocks: {screen: ProfileStocksScreen},
  ProfileKeywords: {screen: ProfileKeywordsScreen},
  KeywordsAdd: {screen: KeywordsAddScreen},
  KeywordsUser: {screen: KeywordsUserScreen},
  Stocks: { screen: StocksScreen },
  LoginLoading: {screen: LoginLoadingScreen},
  ProfileLoading: {screen: ProfileLoadingScreen},
  RegisterLoading: {screen: RegisterLoadingScreen},
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
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo:{
    resizeMode: 'contain',
    height: 45,
    backgroundColor: 'transparent'
  }
})


AppRegistry.registerComponent('TradeLife', () => TradeLife);
