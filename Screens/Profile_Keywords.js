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
import { Card, ListItem, Button, List } from 'react-native-elements';

@observer
export class ProfileKeywordsScreen extends React.Component {

  render(){
    const { navigate } = this.props.navigation;
    var keys = Object.values(Profile.getDescKeys())
    return(
      <View style={profileStyle.wrapper}>
        <View style={profileStyle.topWrap}>
          <Text style={profileStyle.title}> KEYWORDS

          </Text>

          <Text style={profileStyle.text}>Based on your Transactions These are the keywords TradeLife could extract</Text>
          <Button
            icon={{name: 'add', size: 32}}
            buttonStyle={{backgroundColor: "#16608B", borderRadius: 40, marginVertical: 10}}
            title={'Add'}
            onPress={() => navigate('KeywordsAdd')}
          />
        </View>

        <View style={profileStyle.botWrap}>
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
