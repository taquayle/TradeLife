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
import { Button } from 'react-native-elements';

@observer
export class ProfileStocksScreen extends React.Component {
  _onClick(preference) // Attempt to login.
  {
    const { navigate } = this.props.navigation;
    User.setSectorPref(preference)
    navigate('Stocks');
  }

  _refresh()
  {
    const { navigate } = this.props.navigation;
    navigate('ProfileLoading');
  }
  showKeyWords(input)
  {
    console.log("--- Keywords ---")
    console.log(input)

    var arr = Object.values(input);

    console.log(arr)

    var arr0 = Object.values(arr[0]);
    return arr.map(function(word){
        return(<Text>{word['Name']}</Text>)
    });
  }
  render() {
    const { navigate } = this.props.navigation;
    var sector = Object.values(Profile.getTargetSectors())
    return (

      <View style ={profileStyle.profileWrapper}>

          <View style={profileStyle.profileContainer1}>
            <Text style={profileStyle.profileText1}>Stocks for: {User.getUserName()}</Text>
            <Button
  raised
  icon={{name: 'home', size: 32}}
  buttonStyle={{backgroundColor: 'red', borderRadius: 10}}
  textStyle={{textAlign: 'center'}}
  title={`Welcome to\nReact Native Elements`}
/>
          </View>


            <View style={profileStyle.profileContainer2}>
              <TouchableHighlight
              onPress={this._onClick.bind(this, 0)}>
                  <Text style={profileStyle.profileText2}>{sector[0]}</Text>
              </TouchableHighlight>
            </View>




            <View style={profileStyle.profileContainer3}>
              <TouchableHighlight style={profileStyle.bigButton}
              onPress={this._onClick.bind(this,1)}>
                  <Text style={profileStyle.profileText3}>{sector[1]}</Text>
              </TouchableHighlight>
            </View>

            <View style={profileStyle.profileContainer4}>
              <TouchableHighlight style={profileStyle.bigButton}
              onPress={this._onClick.bind(this, 2)}>
                  <Text style={profileStyle.profileText4}>{sector[2]}</Text>
              </TouchableHighlight>
            </View>

      </View>
    )
  }
}

profileStyle = StyleSheet.create({
    profileWrapper:{
        flex: 1,
        backgroundColor:"#000000"
    },
    profileContainer1:{
      flex:1,
      backgroundColor:"#000000",
      justifyContent: 'center',
      alignItems: 'center'
    },
    profileContainer2:{
      flex:1,
      backgroundColor:"#011622"
    },
    refreshButton:{
      height:70,
      width:70,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      backgroundColor: "#16608B"
    },
    profileContainer3:{
      flex:1,
      backgroundColor:"#030525"
    },
    profileContainer4:{
      flex:1,
      backgroundColor:"#002613"
    },
    profileText1:{
        color: '#ffffff',
        fontSize: 30,
    },
    profileText2:{
        color: '#05456B',
        fontSize: 30,
    },
    profileText3:{
        color: '#0C1475',
        fontSize: 30,
    },
    profileText4:{
        color: '#00763A',
        fontSize: 30,
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
