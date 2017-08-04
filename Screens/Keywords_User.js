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
  ScrollView
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {observer} from "mobx-react";
import User from "./Stores/UserStore"
import Profile from "./Stores/ProfileStore"
import Server from "./Stores/TradeLifeStore"
import { ListItem, Button, List, Icon, FormLabel, FormInput, FormValidationMessage, Header } from 'react-native-elements';


@observer
export class KeywordsUserScreen extends React.Component {

  showUserKeys(keys)
  {
    if(keys == null)
      return (<Text style={profileStyle.title}> No User Keys </Text>)
    return(
    <List>
    {
      keys.map((word, i) => (
        <ListItem
          key={i}
          title={word['Name']}
          subtitleNumberOfLines={2}
          subtitle={<Text>{'\t\t'}Value: ${word['Value']}{'\t\t'}Hits: {word['Hits']}</Text>}
        />
      ))
    }
    </List>)
  }


  render(){
    const { navigate } = this.props.navigation;
    var keys = null
    if(Profile.getUserKeys() != null)
      keys = Object.values(Profile.getUserKeys())

    return(
      <View style={profileStyle.wrapper}>
        <View style={profileStyle.topWrap}>
          <View style={profileStyle.titleWrap}>
            <Icon reverse name='person'/>
            <Text style={profileStyle.title}>USER KEYWORDS</Text>

          </View>
            <Text style={profileStyle.text}>Keywords added by the user</Text>
          <View style={profileStyle.buttonWrap}>
            <Icon
              reverse
              name='add'
              onPress={() => navigate('KeywordsAdd')}
            />
            <Icon
              reverse
              name='vpn-key'
              onPress={() => navigate('ProfileKeywords')}
            />
          </View>
        </View>

        <View style={profileStyle.botWrap}>
          <ScrollView >
            {this.showUserKeys(keys)}
          </ScrollView>
        </View>
      </View>
    );
  }
}
