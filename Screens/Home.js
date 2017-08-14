// Author: Tyler Quayle
// File: Home.js
// Date: June 23, 2017


import React from 'react';
import { Text, View, StyleSheet, Image, BackHandler} from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Tab, Router, Drawer } from './Navigation/Router'
import User from "./Stores/UserStore"
import Profile from "./Stores/ProfileStore"
import { Button, SideMenu, List, ListItem, Icon, Header } from 'react-native-elements'
import tradeStyle from "./Styles/DefaultStyle"
import {COLOR_SCHEME, TEXT_SCHEME} from './Styles/Attributes'


export class HomeScreen extends React.Component {
  componentWillMount(){
    console.log("Current Screen: " + this.props.navigation.state.key)}

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('Logout');
      return true //Tell react-navigation that back button is handled
    }.bind(this));
  }
  constructor (props) {
    super(props)
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={tradeStyle.wrapper}>
        <View style={tradeStyle.header}>
          <Header
            leftComponent={   <Icon size={30} name='menu' onPress={()=>navigate('DrawerOpen')}/>}
            centerComponent={ <Image source={require('./Images/TradeLife.png')} style={tradeStyle.logo}/>}
            rightComponent={  <Icon size={30} name='home' onPress={()=>navigate('Home')}/>}
          />
        </View>

        <View style={tradeStyle.topWrap}>

        </View>

        <View style={tradeStyle.botWrap}>

          <Button
            large
            icon={{name: 'trending-up', size: 32}}
            buttonStyle={{backgroundColor: COLOR_SCHEME[0], borderRadius: 40, marginVertical: 10}}
            textStyle={{textAlign: 'center'}}
            title={`Stocks`}
            onPress={() => navigate('ProfileStocks')}
          />


          <Button
            large
            icon={{name: 'vpn-key', size: 32}}
            buttonStyle={{backgroundColor: COLOR_SCHEME[1], borderRadius: 40, marginVertical: 10}}
            textStyle={{textAlign: 'center'}}
            title={`Keywords`}
            onPress={() => navigate('KeywordsProfile')}
          />


          <Button
            large
            icon={{name: 'receipt', size: 32}}
            buttonStyle={{backgroundColor: COLOR_SCHEME[2], borderRadius: 40, marginVertical: 10}}
            textStyle={{textAlign: 'center'}}
            title={`Transactions`}
            onPress={() => navigate('Transact')}
          />

          <Button
            large
            icon={{name: 'link', size: 32}}
            buttonStyle={{backgroundColor: COLOR_SCHEME[3], borderRadius: 40, marginVertical: 10}}
            textStyle={{textAlign: 'center'}}
            title={`FastLink`}
            onPress={() => navigate('FastLink')}
          />
        </View>
      </View>
    );
  }
}
