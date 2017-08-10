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
import { ProfileKeywordsScreen } from '../Profile_Keywords';
import { KeywordsAddScreen } from '../Keywords_Add';
import { KeywordsUserScreen } from '../Keywords_User';
import { StocksScreen } from '../Stocks';

/******************************************************************************/
// LOADING SCREENS
import { LoginLoadingScreen } from '../Loading/LoginLoading'
import { RegisterLoadingScreen } from '../Loading/RegisterLoading'
import { ProfileLoadingScreen } from '../Loading/ProfileLoading'
import { KeywordAddLoadingScreen } from '../Loading/KeywordAddLoading'

class Hidden extends React.Component {
  render() {
    return null;
  }
}
/******************************************************************************/
// Routing table
export const Router = StackNavigator(
{
  Splash: {screen: SplashScreen},
  Login: { screen: LoginScreen,
          navigationOptions: { drawerLockMode: 'locked-closed', }},
  Register:{screen: RegisterScreen,
          navigationOptions: { drawerLockMode: 'locked-closed', }},
  Forgot: {screen: ForgotScreen,
          navigationOptions: { drawerLockMode: 'locked-closed', }},
  Home: {screen: HomeScreen},

  FastLink: {screen: FastLink},
  Transact: {screen: TransactionScreen},
  ProfileStocks: {screen: ProfileStocksScreen},
  ProfileKeywords: {screen: ProfileKeywordsScreen},
  KeywordsAdd: {screen: KeywordsAddScreen},
  KeywordsUser: {screen: KeywordsUserScreen},
  Stocks: { screen: StocksScreen },
  KeywordAddLoading: {screen: KeywordAddLoadingScreen},
  LoginLoading: {screen: LoginLoadingScreen},
  ProfileLoading: {screen: ProfileLoadingScreen},
  RegisterLoading: {screen: RegisterLoadingScreen},

},
navigationOptions =
{
  headerMode: 'none', //Get rid of headers
  gesturesEnabled: false,
});



export const Drawer = DrawerNavigator({
  Stack: { screen: Router,
          navigationOptions: { drawerLabel: <Hidden />}},
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
},
navigationOptions =
{
  headerMode: 'none', //Get rid of headers
});
