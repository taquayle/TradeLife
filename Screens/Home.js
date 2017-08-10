// Author: Tyler Quayle
// File: Home.js
// Date: June 23, 2017


import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Tab, Router, Drawer } from './Navigation/Router'
import User from "./Stores/UserStore"
import Profile from "./Stores/ProfileStore"
import { Button, SideMenu, List, ListItem, Icon, Header } from 'react-native-elements'
import tradeStyle from "./Styles/Default"

class Logo extends React.Component {
  render(){
    return(
      <View style={tradeStyle.temp}>
        <Image source={require('./Images/TradeLife.png')} style={tradeStyle.logo}/>
      </View>
    )}
}

export class HomeScreen extends React.Component {


  constructor (props) {
    super(props)
  }

  _onProfileStockClick(){
    console.log("--- Going to Profile-STOCKS ---")
    const { navigate } = this.props.navigation;
    if (Profile.exists()){
      navigate('ProfileStocks')
    }
    else{
      navigate('ProfileLoading')
    }

  }

  _onProfileKeywordClick(){
    console.log("--- Going to Profile-KEYWORDS ---")
    const { navigate } = this.props.navigation;
    if (Profile.exists()){
      navigate('ProfileKeywords')
    }
    else{
      navigate('ProfileLoading')
    }
  }


  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={tradeStyle.wrapper}>
        <View style={tradeStyle.header}>
          <Header
            leftComponent={
              <Icon
              size={30}
              name='menu'
              onPress={()=>navigate('DrawerOpen')}/>
            }
            centerComponent={<Logo/>}
            rightComponent={<Icon
            size={30}
            name='home'
            onPress={()=>navigate('Home')}/>}
          />
        </View>

        <View style={tradeStyle.topWrap}>

        </View>

        <View style={tradeStyle.botWrap}>

          <Button
            large
            icon={{name: 'trending-up', size: 32}}
            buttonStyle={{backgroundColor: 'red', borderRadius: 40, marginVertical: 10}}
            textStyle={{textAlign: 'center'}}
            title={`Stocks`}
            onPress={this._onProfileStockClick.bind(this)}
          />


          <Button
            large
            icon={{name: 'vpn-key', size: 32}}
            buttonStyle={{backgroundColor: 'blue', borderRadius: 40, marginVertical: 10}}
            textStyle={{textAlign: 'center'}}
            title={`Keywords`}
            onPress={this._onProfileKeywordClick.bind(this)}
          />


          <Button
            large
            icon={{name: 'receipt', size: 32}}
            buttonStyle={{backgroundColor: 'green', borderRadius: 40, marginVertical: 10}}
            textStyle={{textAlign: 'center'}}
            title={`Transactions`}
            onPress={() => navigate('Transact')}
          />

          <Button
            large
            icon={{name: 'link', size: 32}}
            buttonStyle={{backgroundColor: 'orange', borderRadius: 40, marginVertical: 10}}
            textStyle={{textAlign: 'center'}}
            title={`FastLink`}
            onPress={() => navigate('FastLink')}
          />
        </View>
      </View>
    );
  }
}
