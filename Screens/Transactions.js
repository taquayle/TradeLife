// Author: Tyler Quayle
// File: Transactions.js
// Date: June 30, 2017

import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, BackHandler} from 'react-native'
import { StackNavigator } from 'react-navigation';
import User from "./Stores/UserStore"
import tradeStyle from "./Styles/DefaultStyle"
import {COLOR_SCHEME} from './Styles/Attributes'
import { Button, Header, Icon } from 'react-native-elements';

export class TransactionScreen extends React.Component {
  componentWillMount(){
    console.log("Current Screen: " + this.props.navigation.state.key)}

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('Login');
      return true //Tell react-navigation that back button is handled
    }.bind(this));
  }

  render() {
    console.log("At Trans");
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
          icon={{name: 'autorenew', size: 32}}
          buttonStyle={{backgroundColor: COLOR_SCHEME[0], borderRadius: 40, marginVertical: 10}}
          textStyle={{textAlign: 'center'}}
          title={`Update Transactions`}
          onPress={() => navigate('TransactLoading')}
        />
        </View>
      </View>
    )
  }
}
