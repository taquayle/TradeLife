// Author: Tyler Quayle
// File: Profile_Keywords.js
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
import { Card, ListItem, Button, List,Icon } from 'react-native-elements';
import tradeStyle from "./Styles/Default"
@observer
export class ProfileKeywordsScreen extends React.Component {

  render(){
    const { navigate } = this.props.navigation;
    var keys = Object.values(Profile.getDescKeys())
    return(
      <View style={tradeStyle.wrapper}>
        <View style={tradeStyle.topWrap}>
          <View style={tradeStyle.titleWrap}>
            <Icon reverse name='vpn-key'/>
            <Text style={tradeStyle.title}>KEYWORDS</Text>
          </View>
          <Text style={tradeStyle.text}>Based on your Transactions These are the keywords TradeLife could extract</Text>
          <View style={tradeStyle.buttonWrap}>
            <Icon
              reverse
              name='add'
              onPress={() => navigate('KeywordsAdd')}
            />
            <Icon
              reverse
              name='person'
              onPress={() => navigate('KeywordsUser')}
            />
          </View>
        </View>

        <View style={tradeStyle.botWrap}>
          <ScrollView >
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
            </List>
          </ScrollView>
        </View>
      </View>
    );
  }


}
