// Author: Tyler Quayle
// File: Transactions.js
// Date: June 30, 2017

import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, BackHandler} from 'react-native'
import { StackNavigator } from 'react-navigation';
import User from "./Stores/UserStore"
import Nav from './Stores/NavigationStore'
import Profile from './Stores/ProfileStore'
import tradeStyle from "./Styles/DefaultStyle"
import {COLOR_SCHEME} from './Styles/Attributes'
import { Button, Header, Icon, List, ListItem } from 'react-native-elements';

export class TransactionScreen extends React.Component {
  componentWillMount(){
    console.log("Current Screen: " + this.props.navigation.state.key)}

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('Login');
      return true //Tell react-navigation that back button is handled
    }.bind(this));
  }


  _showHistory(){
    Nav.setTransGet(true)
    this.props.navigation.navigate('TransactLoading')
  }

  _UpdateTransactions(){
    Nav.setTransPut(true)
    this.props.navigation.navigate('TransactLoading')
  }

  showTransactions(){
    if(Profile.getHistory() == null){
      return(
        <View>
          <Button
            icon={{name: 'autorenew', size: 32}}
            buttonStyle={{backgroundColor: COLOR_SCHEME[0], borderRadius: 40, marginVertical: 10}}
            textStyle={{textAlign: 'center'}}
            title={`Show Transactions`}
            onPress={() => this._showHistory(this)}
          />
        </View>
      )
    }
    else{
      var hist = Profile.getHistory();
      hist = Object.values(hist);
      console.log(Profile.getHistory())
      console.log(hist)
      return(

        <ScrollView>
        <Button
          icon={{name: 'autorenew', size: 32}}
          buttonStyle={{backgroundColor: COLOR_SCHEME[0], borderRadius: 40, marginVertical: 10}}
          textStyle={{textAlign: 'center'}}
          title={`Show Transactions`}
          onPress={() => this._showHistory(this)}
        />
        <List>
        {
          hist.map((trans, i) => (
            <ListItem
              key={i}
              title={trans['trans_date']}
              rightTitle={trans['amount']}
              subtitleNumberOfLines={2}
              subtitle={<Text style={tradeStyle.body}>{'Placeholder'}</Text>}
            />
          ))
        }
        </List>
        </ScrollView>
      )
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    var transCount = Profile.getTransactions();
    if(transCount == null)
      transCount = 0
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
        <Text style={tradeStyle.title}>
          Total Transactions: {transCount}
        </Text>
        <Button
          icon={{name: 'autorenew', size: 32}}
          buttonStyle={{backgroundColor: COLOR_SCHEME[0], borderRadius: 40, marginVertical: 10}}
          textStyle={{textAlign: 'center'}}
          title={`Update Transactions`}
          onPress={() => this._UpdateTransactions(this)}
        />
        </View>

        <View style={tradeStyle.botWrap}>
          {this.showTransactions()}
        </View>
      </View>
    )
  }
}
