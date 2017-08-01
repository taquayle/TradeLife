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

  _refresh()
  {
    const { navigate } = this.props.navigation;
    navigate('ProfileLoading');
  }

  render(){
    var sector = Object.values(Profile.getTargetSectors())
    return(
      <View>
      <List>
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
  // render() {
  //   const { navigate } = this.props.navigation;
  //   var sector = Object.values(Profile.getTargetSectors())
  //   return (
  //
  //     <View style ={profileStyle.profileWrapper}>
  //
  //         <View style={profileStyle.profileContainer1}>
  //           <Text style={profileStyle.profileText1}>Stocks for: {User.getUserName()}</Text>
  //         </View>
  //
  //
  //           <View style={profileStyle.profileContainer2}>
  //             <TouchableHighlight
  //             onPress={this._onClick.bind(this, 0)}>
  //                 <Text style={profileStyle.profileText2}>{sector[0]}</Text>
  //             </TouchableHighlight>
  //           </View>
  //
  //
  //
  //
  //           <View style={profileStyle.profileContainer3}>
  //             <TouchableHighlight style={profileStyle.bigButton}
  //             onPress={this._onClick.bind(this,1)}>
  //                 <Text style={profileStyle.profileText3}>{sector[1]}</Text>
  //             </TouchableHighlight>
  //           </View>
  //
  //           <View style={profileStyle.profileContainer4}>
  //             <TouchableHighlight style={profileStyle.bigButton}
  //             onPress={this._onClick.bind(this, 2)}>
  //                 <Text style={profileStyle.profileText4}>{sector[2]}</Text>
  //             </TouchableHighlight>
  //           </View>
  //
  //     </View>
  //   )
  // }
}

profileStyle = StyleSheet.create({
    profileWrapper:{
        flex: 1,
        backgroundColor:"#FFFFFF"
    },
    profileContainer1:{
      flex:1,
      backgroundColor:"#FFFFFF",
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
        color: '#000000',
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
