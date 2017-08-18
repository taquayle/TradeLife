import { StackNavigator, TabNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import { Icon, Button } from 'react-native-elements'
import {View, Text, ScrollView } from 'react-native'
import React from 'react';
import {COLOR_SCHEME, TEXT_SCHEME } from '../Styles/Attributes'
import drawStyle from '../Styles/DrawerStyle'

import User from '../Stores/UserStore'
/******************************************************************************/
// SCREENS
import { SplashScreen } from '../Splash';
import { LoginScreen } from '../Login';
import { RegisterScreen } from '../Register';
import { HomeScreen } from '../Home';
import { ForgotScreen } from '../Forgot';
import { FastLink } from '../FastLink';
import { TransactionScreen } from '../Transactions'
import { StocksProfileScreen } from '../Profile_Stocks';
import { KeywordsProfileScreen } from '../Keywords_Profile';
import { KeywordsAddScreen } from '../Keywords_Add';
import { StocksScreen } from '../Stocks';

/******************************************************************************/
// LOADING SCREENS
import { LoginLoadingScreen } from '../Loading/LoginLoading'
import { LogoutLoadingScreen } from '../Loading/LogoutLoading'
import { RegisterLoadingScreen } from '../Loading/RegisterLoading'
import { TransactionLoadingScreen } from '../Loading/TransactionLoading'
import { ProfileLoadingScreen } from '../Loading/ProfileLoading'
import { KeywordAddLoadingScreen } from '../Loading/KeywordAddLoading'

class Hidden extends React.Component {
  render() {
    return null;
  }
}




export const Drawer = DrawerNavigator({
  Splash: {screen: SplashScreen,
          navigationOptions: {drawerLockMode: 'locked-closed', drawerLabel: <Hidden />}},
  Login: { screen: LoginScreen,
          navigationOptions: {/*drawerLockMode: 'locked-closed',*/ drawerLabel: <Hidden />, }},
  Register:{screen: RegisterScreen,
          navigationOptions: {drawerLockMode: 'locked-closed', drawerLabel: <Hidden />, }},
  Forgot: {screen: ForgotScreen,
          navigationOptions: {drawerLockMode: 'locked-closed', drawerLabel: <Hidden />, }},
  KeywordAddLoading: {screen: KeywordAddLoadingScreen,
          navigationOptions: {drawerLockMode: 'locked-closed', drawerLabel: <Hidden />, }},
  LoginLoading: {screen: LoginLoadingScreen,
          navigationOptions: {drawerLockMode: 'locked-closed', drawerLabel: <Hidden />, }},
  ProfileLoading: {screen: ProfileLoadingScreen,
          navigationOptions: {drawerLockMode: 'locked-closed', drawerLabel: <Hidden />, }},
  RegisterLoading: {screen: RegisterLoadingScreen,
          navigationOptions: {drawerLockMode: 'locked-closed', drawerLabel: <Hidden />, }},
  TransactLoading: {screen: TransactionLoadingScreen,
          navigationOptions: {drawerLockMode: 'locked-closed', drawerLabel: <Hidden />, }},


  Home: {
    screen: HomeScreen,
    navigationOptions:{
        drawerLabel: "Home",
        drawerIcon:({tintColor}) =>(
          <Icon
          reverse
          size = {30}
          color= {COLOR_SCHEME[0]}
          name="home" />),
        drawerLockMode: 'locked-closed',
      }
  },
  StocksProfile: {
    screen: StocksProfileScreen,
    navigationOptions:{
        drawerLabel: "Stocks",
        drawerIcon:({tintColor}) =>(
          <Icon
          reverse
          color= {COLOR_SCHEME[1]}
          name="trending-up" />),
        drawerLockMode: 'locked-closed',
      }
  },
  Stocks: {
    screen: StocksScreen,
    navigationOptions:{
        drawerLockMode: 'locked-closed',
        drawerLabel: <Hidden/>,
      }
  },

  KeywordsProfile: {
    screen: KeywordsProfileScreen,
    navigationOptions:{
        drawerLabel: "Keywords",
        drawerIcon:({tintColor}) =>(
          <Icon
          reverse
          color = {COLOR_SCHEME[3]}
          name = "vpn-key" />),
        drawerLockMode: 'locked-closed',
      }
  },

  KeywordsAdd: {
    screen: KeywordsAddScreen,
    navigationOptions:{
        drawerLabel: "Add Keywords",
        drawerIcon:({tintColor}) =>(
          <Icon
          reverse
          color = {COLOR_SCHEME[0]}
          name = "add" />),
        drawerLockMode: 'locked-closed',
      }
  },

  Transact: {
    screen: TransactionScreen,
    navigationOptions:{
        drawerLabel: "Transactions",
        drawerIcon:({tintColor}) =>(
          <Icon
          reverse
          color= {COLOR_SCHEME[1]}
          name="receipt" />),
        drawerLockMode: 'locked-closed',
      }
  },
  FastLink: {
    screen: FastLink,
    navigationOptions:{
        drawerLabel: "FastLink",
        drawerIcon:({tintColor}) =>(
          <Icon
          reverse
          color= {COLOR_SCHEME[2]}
          name="link" />),
        drawerLockMode: 'locked-closed',
      }
  },

  Logout: {
    screen: LogoutLoadingScreen,
    navigationOptions:{
        drawerLabel: "LOGOUT",
        drawerIcon:({tintColor}) =>(
          <Icon
          reverse
          type = "foundation"
          color = 'red'
          name = "x" />),
        drawerLockMode: 'locked-closed',
      }
  },

},
navigationOptions =
{
  drawerLockMode: 'locked-closed',
  headerMode: 'none', //Get rid of headers
  backBehavior: 'none',

});

export const Router = StackNavigator({
  DrawNav: {screen: Drawer}
},
navigationOptions =
{
  headerMode: 'none', //Get rid of headers
});
