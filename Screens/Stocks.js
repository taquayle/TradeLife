// Author: Tyler Quayle
// File: SectorOne.js
// Date: June 23, 2017

import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import User from "./Stores/UserStore"
import Profile from "./Stores/ProfileStore"
import { Card, ListItem, Button, List } from 'react-native-elements';

export class StocksScreen extends React.Component {

  render() {
    var stocks = Profile.getCapStocks();
    var sectorTitle = Object.values(Profile.getTargetSectors())
    var stocksArray = Object.values(stocks)
    var sector = Object.values(stocksArray[User.getSectorPref()])
    return (
      <View style={oneStyle.oneWrapper}>

        <View style={oneStyle.oneTop}>
          <Text style={oneStyle.title}>{sectorTitle[User.getSectorPref()]} STOCKS</Text>
        </View>

        <View style={oneStyle.oneBot}>
          <List>
          {
            sector.map((company, i) => (
              <ListItem
                key={i}
                title={company['name']}
                rightTitle={company['symbol']}
                subtitleNumberOfLines={2}
                subtitle={<Text>{'\t'} Cap: ${company['cap']}{'\n\t\t'}Price: ${company['price']}</Text>}
              />
            ))
          }
          </List>
        </View>
      </View>
    );
  }
}

oneStyle = StyleSheet.create({
    oneWrapper:{
        flex: 1,
        backgroundColor:"#FFFFFF"
    },
    oneTop:{
      flex:.5,
      backgroundColor:"#FFFFFF"
    },
    oneBot:{
      flex:2,
      backgroundColor:"#FFFFFF"
    },

    title:{
        color: '#000000',
        fontSize: 30,
    },
    profileText:{
        color: '#00763A',
        fontSize: 20,
    },
})
