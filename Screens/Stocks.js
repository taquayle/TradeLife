// Author: Tyler Quayle
// File: SectorOne.js
// Date: June 23, 2017

import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import User from "./Stores/UserStore"
import Profile from "./Stores/ProfileStore"

export class StocksScreen extends React.Component {
  showCompanies(input, secNum){
    console.log("--- Companies ---")
    console.log(input)


    var arr = Object.values(input);

    console.log(arr)

    var sectorArr = Object.values(arr[secNum]);
    return sectorArr.map(function(word, i){
        return(<Text key={i}>
          {i+1}. {word['name']}
          {'\n'}      Symbol: {word['symbol']} 
          {'\n'}      Market Cap: ${word['cap']} Million
          {'\n'}      Trading At: ${word['price']}
          {'\n\n'}
          </Text>)
    });
  }
  render() {
    var sector = Object.values(Profile.getTargetSectors())
    return (
        <View style={oneStyle.oneWrapper}>
          <View style={oneStyle.oneTop}>
          <Text style={oneStyle.profileTextTitle}>{sector[User.getSectorPref()]} STOCKS</Text>
          </View>

          <View style={oneStyle.oneBot}>
          <Text style={oneStyle.profileText}>{this.showCompanies(Profile.getCapStocks(), User.getSectorPref())}</Text>
          </View>
        </View>
    );
  }
}

oneStyle = StyleSheet.create({
    oneWrapper:{
        flex: 1,
        backgroundColor:"#000000"
    },
    oneTop:{
      flex:.5,
      backgroundColor:"#000000"
    },
    oneBot:{
      flex:2,
      backgroundColor:"#002613"
    },

    profileTextTitle:{
        color: '#ffffff',
        fontSize: 30,
    },
    profileText:{
        color: '#00763A',
        fontSize: 20,
    },
    profileButton:{
        backgroundColor: "#16608B",
        paddingVertical: 10,
        marginVertical: 30,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
})
