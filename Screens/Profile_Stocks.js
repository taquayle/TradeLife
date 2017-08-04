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
import { Card, ListItem, Button, List } from 'react-native-elements';

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
      <View style={profileStyle.wrapper}>
        <View style={profileStyle.topWrap}>
          <Text style={profileStyle.title}> SUGGESTED SECTORS

          </Text>

          <Text style={profileStyle.text}>Based on your Transaction keywords, these are the sectors you spend the most money in.</Text>

          <Button
            icon={{name: 'autorenew', size: 32}}
            buttonStyle={{backgroundColor: "#16608B", borderRadius: 40, marginVertical: 10}}
            textStyle={{textAlign: 'center'}}
            title={'Refresh'}
            onPress={() => navigate('ProfileLoading')}
          />
        </View>


          <List containerStyle={profileStyle.botWrap}>
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

profileStyle = StyleSheet.create({
    wrapper:{
        flex: 1,
        backgroundColor:"#FFFFFF"
    },
    listContainer: {
    width: 300
    },
    topWrap:{
      flex:.35,
      backgroundColor:"#FFFFFF",
      justifyContent: 'center',
      alignItems: 'center'
    },
    titleWrap:{
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    botWrap:{
      flex:.65,
      backgroundColor:"#FFFFFF"
    },
    buttonWrap:{
      flex:.5,
      flexDirection:'row'
    },
    title:{
        color: '#000000',
        fontSize: 30,
    },
    text:{
        color: '#000000',
        fontSize: 15,
    },
})
