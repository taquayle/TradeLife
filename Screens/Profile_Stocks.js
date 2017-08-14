// Author: Tyler Quayle
// File: Profile_Stocks.js
// Date: August 2, 2017

import React from 'react';
import { Text, View, StyleSheet, Image, BackHandler} from 'react-native'
import { StackNavigator } from 'react-navigation';
import {observer} from "mobx-react";
import User from "./Stores/UserStore"
import Profile from "./Stores/ProfileStore"
import {COLOR_SCHEME, TEXT_SCHEME} from './Styles/Attributes'
import { Card, ListItem, Button, List, Header, Icon } from 'react-native-elements';
import tradeStyle from "./Styles/DefaultStyle"

@observer
export class ProfileStocksScreen extends React.Component {
  componentWillMount(){
    console.log("Current Screen: " + this.props.navigation.state.key)}

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('Home');
      return true //Tell react-navigation that back button is handled
    }.bind(this));
  }
  _onClick(preference) // Attempt to login.
  {
    const { navigate } = this.props.navigation;
    User.setSectorPref(preference)
    navigate('Stocks');
  }

  render(){
    const { navigate } = this.props.navigation;
    var sector = Profile.getTargetSectors();
    if(sector != null){
      sector = Object.values(sector)
    }
    else{
      sector = []
    }

    return(
      <View style={tradeStyle.wrapper}>
        <View style={tradeStyle.header}>
          <Header
            leftComponent={   <Icon size={30} name='menu' onPress={()=>navigate('DrawerOpen')}/>}
            centerComponent={ <Image source={require('./Images/TradeLife.png')} style={tradeStyle.logo}/>}
            rightComponent={  <Icon size={30} name='home' onPress={()=>navigate('Home')}/>}
          />
        </View>
        <View style={tradeStyle.topWrap}>
          <Text style={tradeStyle.title}> SUGGESTED SECTORS

          </Text>

          <Text style={tradeStyle.body}>Based on your Transaction keywords, these are the sectors you spend the most money in.</Text>


        </View>


          <List containerStyle={tradeStyle.botWrap}>

          <Button
            icon={{color: TEXT_SCHEME[0], name: 'autorenew', size: 32}}
            buttonStyle={{backgroundColor: COLOR_SCHEME[0], borderRadius: 40, marginVertical: 10}}
            textStyle={{textAlign: 'center', color:TEXT_SCHEME[0]}}
            title={'Refresh'}
            onPress={() => navigate('ProfileLoading')}
          />
          {
            sector.map((l, i) => (
              <ListItem
                key={i}
                title={l}
                onPress={this._onClick.bind(this, i)}
              />
            ))
          }
          </List>


      </View>
    );
  }
}
