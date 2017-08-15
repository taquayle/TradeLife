import { StackNavigator, TabNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import { Icon, Button } from 'react-native-elements'
import {View, Text, ScrollView } from 'react-native'
import React from 'react';
import {COLOR_SCHEME, TEXT_SCHEME,
        MAIN_BG_COLOR, DRAWER_BUTTON_COLOR,
        DRAWER_ICON_COLOR } from '../Styles/Attributes'
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
import { ProfileStocksScreen } from '../Profile_Stocks';
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
          navigationOptions: {drawerLockMode: 'locked-closed', drawerLabel: <Hidden />, }},
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

  Home: {screen: HomeScreen,
    navigationOptions: { drawerLockMode: 'locked-closed', drawerLabel: <Hidden/>,}},
  ProfileStocks: {screen: ProfileStocksScreen,
    navigationOptions: { drawerLockMode: 'locked-closed', drawerLabel: <Hidden/>,}},
  Stocks: {screen: StocksScreen,
    navigationOptions: { drawerLockMode: 'locked-closed', drawerLabel: <Hidden/>,}},
  KeywordsProfile: {screen: KeywordsProfileScreen,
    navigationOptions: { drawerLockMode: 'locked-closed', drawerLabel: <Hidden/>,}},
  KeywordsAdd: {screen: KeywordsAddScreen,
    navigationOptions: { drawerLockMode: 'locked-closed', drawerLabel: <Hidden/>,}},
  Transact: {screen: TransactionScreen,
    navigationOptions: { drawerLockMode: 'locked-closed', drawerLabel: <Hidden/>,}},
  FastLink: {screen: FastLink,
    navigationOptions: { drawerLockMode: 'locked-closed', drawerLabel: <Hidden/>,}},
  Logout: {screen: LogoutLoadingScreen,
    navigationOptions: { drawerLockMode: 'locked-closed', drawerLabel: <Hidden/>,}},

},{
  contentComponent: ({props, navigation}) =>{return (<View style={drawStyle.wrapper}>
    <View style={drawStyle.topWrap}>
      <Text style={drawStyle.title}>Hello {User.getName()}!</Text>
    </View>
    <View style={[drawStyle.botWrap, {justifyContent: 'center'}]}>
    <Button
      icon={{size: 30, color: DRAWER_ICON_COLOR, name: "home" }}
      buttonStyle={{backgroundColor: DRAWER_BUTTON_COLOR, marginVertical: 10, borderRadius: 10}}
      textStyle={{color: TEXT_SCHEME[0]}}
      title={`Home`}
      onPress={() => navigation.navigate('Home')}
    />
    <Button
      icon={{size: 30, color: DRAWER_ICON_COLOR, name: "trending-up" }}
      buttonStyle={{backgroundColor: DRAWER_BUTTON_COLOR, marginVertical: 10, borderRadius: 10}}
      textStyle={{color: TEXT_SCHEME[0]}}
      title={`Stocks`}
      onPress={() => navigation.navigate('ProfileStocks')}
    />
    <Button
      icon={{size: 30, color: DRAWER_ICON_COLOR, name: "vpn-key" }}
      buttonStyle={{backgroundColor: DRAWER_BUTTON_COLOR, marginVertical: 10, borderRadius: 10}}
      textStyle={{color: TEXT_SCHEME[0]}}
      title={`Keywords`}
      onPress={() => navigation.navigate('KeywordsProfile')}
    />
    <Button
      icon={{size: 30, color: DRAWER_ICON_COLOR, name: "add" }}
      buttonStyle={{backgroundColor: DRAWER_BUTTON_COLOR, marginVertical: 10, borderRadius: 10}}
      textStyle={{color: TEXT_SCHEME[0]}}
      title={`Add Keywords`}
      onPress={() => navigation.navigate('KeywordsAdd')}
    />
    <Button
      icon={{size: 30, color: DRAWER_ICON_COLOR, name: "receipt" }}
      buttonStyle={{backgroundColor: DRAWER_BUTTON_COLOR, marginVertical: 10, borderRadius: 10}}
      textStyle={{color: TEXT_SCHEME[0]}}
      title={`Transactions`}
      onPress={() => navigation.navigate('Transact')}
    />
    <Button
      icon={{size: 30, color: DRAWER_ICON_COLOR, name: "link" }}
      buttonStyle={{backgroundColor: DRAWER_BUTTON_COLOR, marginVertical: 10, borderRadius: 10}}
      textStyle={{color: TEXT_SCHEME[0]}}
      title={`FastLink`}
      onPress={() => navigation.navigate('FastLink')}
    />
    <Button
      icon={{size: 30, color: DRAWER_ICON_COLOR, type: "foundation", name: "x"}}
      buttonStyle={{backgroundColor: '#ff0000', marginVertical: 10, borderRadius: 10}}
      textStyle={{color: '#000000'}}
      title={`Logout`}
      onPress={() => navigation.navigate('Logout')}
    />
    </View>

  </View>)}
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
