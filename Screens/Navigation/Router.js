import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements'
import React from 'react';
import {COLOR_SCHEME } from '../Styles/Attributes'
/******************************************************************************/
// SCREENS
import { SplashScreen } from '../Splash';
import { LoginScreen } from '../Login';
import { RegisterScreen } from '../Register';
import { HomeScreen } from '../Home';
import { ForgotScreen } from '../Forgot';
import { FastLink } from '../FastLink';
import { TransactionScreen } from '../Transactions'
import { ProfileStocksScreen } from '../Profile_Stocks';
import { KeywordsProfileScreen, KeywordsFromUser, KeywordsFromTransactions } from '../Keywords_Profile';
import { KeywordsAddScreen } from '../Keywords_Add';
import { KeywordsUserScreen } from '../Keywords_User';
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
          navigationOptions: {drawerLockMode: 'locked-closed',  drawerLabel: <Hidden />}},
  Login: { screen: LoginScreen,
          navigationOptions: {drawerLockMode: 'locked-closed', drawerLabel: <Hidden />}},
  Register:{screen: RegisterScreen,
          navigationOptions: {drawerLockMode: 'locked-closed',  drawerLabel: <Hidden />}},
  Forgot: {screen: ForgotScreen,
          navigationOptions: {drawerLockMode: 'locked-closed',  drawerLabel: <Hidden />}},
  KeywordAddLoading: {screen: KeywordAddLoadingScreen,
          navigationOptions: {drawerLockMode: 'locked-closed', drawerLabel: <Hidden />}},
  LoginLoading: {screen: LoginLoadingScreen,
          navigationOptions: {drawerLockMode: 'locked-closed', drawerLabel: <Hidden />}},
  ProfileLoading: {screen: ProfileLoadingScreen,
          navigationOptions: {drawerLockMode: 'locked-closed', drawerLabel: <Hidden />}},
  RegisterLoading: {screen: RegisterLoadingScreen,
          navigationOptions: {drawerLockMode: 'locked-closed',  drawerLabel: <Hidden />}},
  TransactLoading: {screen: TransactionLoadingScreen,
          navigationOptions: {drawerLockMode: 'locked-closed',  drawerLabel: <Hidden />}},


  Home: {
    screen: HomeScreen,
    navigationOptions:{
        drawerLabel: "Home",
        drawerIcon:({tintColor}) =>(
          <Icon
          reverse
          color= {COLOR_SCHEME[0]}
          name="home" />),
        drawerLockMode: 'locked-closed',
      }
  },
  ProfileStocks: {
    screen: ProfileStocksScreen,
    navigationOptions:{
        drawerLabel: "Stock Sector",
        drawerIcon:({tintColor}) =>(
          <Icon
          reverse
          color= {COLOR_SCHEME[0]}
          name="trending-up" />),
        drawerLockMode: 'locked-closed',
      }
  },
  Stocks: {
    screen: StocksScreen,
    navigationOptions:{
        drawerLabel: "Top Stocks",
        drawerIcon:({tintColor}) =>(
          <Icon
          reverse
          color= {COLOR_SCHEME[0]}
          name="trending-up" />),
        drawerLockMode: 'locked-closed',
      }
  },

  KeywordsProfile: {
    screen: KeywordsProfileScreen,
    navigationOptions:{
        drawerLabel: "Keywords",
        drawerIcon:({tintColor}) =>(
          <Icon
          reverse
          color = {COLOR_SCHEME[1]}
          name = "vpn-key" />),
        drawerLockMode: 'locked-closed',
      }
  },
  _KeyWordsFromUser: {screen: KeywordsFromUser,
          navigationOptions: {drawerLockMode: 'locked-closed', drawerLabel: <Hidden />}},

  _KeyWordsFromTransactions: {screen: KeywordsFromTransactions,
          navigationOptions: {drawerLockMode: 'locked-closed', drawerLabel: <Hidden />}},

  KeywordsAdd: {
    screen: KeywordsAddScreen,
    navigationOptions:{
        drawerLabel: "Add Keywords",
        drawerIcon:({tintColor}) =>(
          <Icon
          reverse
          color = {COLOR_SCHEME[2]}
          name = "add" />),
        drawerLockMode: 'locked-closed',
      }
  },
  KeywordsUser: {
    screen: KeywordsUserScreen,
    navigationOptions:{
        drawerLabel: "User Keywords",
        drawerIcon:({tintColor}) =>(
          <Icon
          reverse
          color = {COLOR_SCHEME[3]}
          name = "person" />),
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
          color= {COLOR_SCHEME[0]}
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
          color= {COLOR_SCHEME[0]}
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
          color = {COLOR_SCHEME[4]}
          name = "x" />),
        drawerLockMode: 'locked-closed',
      }
  },

},
navigationOptions =
{
  drawerLockMode: 'locked-closed',
  headerMode: 'none', //Get rid of headers
});
