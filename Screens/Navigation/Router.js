import { StackNavigator, TabNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import { Icon, Button, Header } from 'react-native-elements'
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
import { StocksProfileScreen } from '../Stocks_Profile';
import { StocksSectorScreen } from '../Stocks_Sector';
import { StocksTailoredScreen } from '../Stocks_Tailored';
import { KeywordsProfileScreen } from '../Keywords_Profile';
import { KeywordsAddScreen } from '../Keywords_Add';


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

const ImageHeader = props => (
  <View style={drawerStyle.header}>
    <Header
      leftComponent={   <Icon size={30} name='menu' onPress={()=>navigate('DrawerOpen')}/>}
      centerComponent={ <Image source={require('../Images/TradeLife.png')} style={drawerStyle.logo}/>}
      rightComponent={  <Icon size={30} name='home' onPress={()=>navigate('Home')}/>}
    />
  </View>
);


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
  StocksProfile: {screen: StocksProfileScreen,
    navigationOptions: { drawerLockMode: 'locked-closed', drawerLabel: <Hidden/>,}},
  StocksSector: {screen: StocksSectorScreen,
    navigationOptions: { drawerLockMode: 'locked-closed', drawerLabel: <Hidden/>,}},
  StocksTailored: {screen: StocksTailoredScreen,
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
      <Text style={drawStyle.h1}>Hello, {User.getName()}!</Text>
      <Button
        icon={{color: TEXT_SCHEME[3], name: 'autorenew', size: 30}}
        buttonStyle={{backgroundColor: COLOR_SCHEME[3], borderRadius: 40, marginVertical: 5}}
        textStyle={{textAlign: 'center', color:TEXT_SCHEME[3]}}
        title={'Refresh Profile'}
        onPress={() => navigation.navigate('ProfileLoading')}
      />
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
      onPress={() => navigation.navigate('StocksProfile')}
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

  backBehavior: 'none',


});




export const Router = StackNavigator({
  DrawNav: {screen: Drawer}
},
navigationOptions =
{
  drawerLockMode: 'locked-closed',

  backBehavior: 'none',
  headerMode:'none'

});
