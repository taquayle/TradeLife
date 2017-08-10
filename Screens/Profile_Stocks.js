// Author: Tyler Quayle
// File: Profile_Stocks.js
// Date: August 2, 2017

import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {observer} from "mobx-react";
import { toJS } from 'mobx';
import User from "./Stores/UserStore"
import Profile from "./Stores/ProfileStore"
import { Card, ListItem, Button, List, Header, Icon } from 'react-native-elements';
import tradeStyle from "./Styles/Default"

@observer
export class ProfileStocksScreen extends React.Component {
  _onClick(preference) // Attempt to login.
  {
    const { navigate } = this.props.navigation;
    User.setSectorPref(preference)
    navigate('Stocks');
  }

  render(){
    const { navigate } = this.props.navigation;
    var sector = Object.values(Profile.getTargetSectors())
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

          <Text style={tradeStyle.text}>Based on your Transaction keywords, these are the sectors you spend the most money in.</Text>


        </View>


          <List containerStyle={tradeStyle.botWrap}>

          <Button
            icon={{name: 'autorenew', size: 32}}
            buttonStyle={{backgroundColor: "#16608B", borderRadius: 40, marginVertical: 10}}
            textStyle={{textAlign: 'center'}}
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
