import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements'
import React from 'react';
import {COLOR_SCHEME, TEXT_SCHEME} from '../Styles/ColorScheme'

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
import { ProfileKeywordsScreen } from '../Keywords_Profile';
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
          name="home" />)
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
          name="trending-up" />)
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
          name="trending-up" />)
      }
  },

  ProfileKeywords: {
    screen: ProfileKeywordsScreen,
    navigationOptions:{
        drawerLabel: "Keywords",
        drawerIcon:({tintColor}) =>(
          <Icon
          reverse
          color = {COLOR_SCHEME[1]}
          name = "vpn-key" />)
      }
  },
  KeywordsAdd: {
    screen: KeywordsAddScreen,
    navigationOptions:{
        drawerLabel: "Add Keywords",
        drawerIcon:({tintColor}) =>(
          <Icon
          reverse
          color = {COLOR_SCHEME[2]}
          name = "add" />)
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
          name = "person" />)
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
          name="receipt" />)
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
          name="link" />)
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
          name = "x" />)
      }
  },

},
navigationOptions =
{
  drawerLockMode: 'locked-closed',
  headerMode: 'none', //Get rid of headers
});
