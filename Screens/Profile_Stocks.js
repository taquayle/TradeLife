// Author: Tyler Quayle
// File: Home.js
// Date: July 26, 2017

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

  // render(){
  //   var sector = Object.values(Profile.getTargetSectors())
  //   return(
  //     <Card title="Recommended Stock Sectors">
  //     {
  //       sector.map((u, i) => {
  //         return (
  //           <View key={i}>
  //           <Button
  //             icon={{name: 'room', size: 32}}
  //             buttonStyle={{backgroundColor: "#16608B", marginVertical: 10, borderRadius: 40}}
  //             textStyle={{textAlign: 'center', fontFamily:'monospace'}}
  //             title={u}
  //             onPress={this._onClick.bind(this, i)}
  //           />
  //           </View>
  //         );
  //       })
  //     }
  //   </Card>
  // )
  // }
}

profileStyle = StyleSheet.create({
    wrapper:{
        flex: 1,
        backgroundColor:"#FFFFFF"
    },
    topWrap:{
      flex:.35,
      backgroundColor:"#FFFFFF",
      justifyContent: 'center',
      alignItems: 'center'
    },
    botWrap:{
      flex:.65,
      backgroundColor:"#FFFFFF"
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
