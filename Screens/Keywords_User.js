// Author: Tyler Quayle
// File: Home.js
// Date: July 26, 2017

import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {observer} from "mobx-react";
import User from "./Stores/UserStore"
import Profile from "./Stores/ProfileStore"
import Server from "./Stores/TradeLifeStore"
import { ListItem, Button, List, Icon, FormLabel, FormInput, FormValidationMessage, Header } from 'react-native-elements';
import tradeStyle from "./Styles/Default"

@observer
export class KeywordsUserScreen extends React.Component {

  showUserKeys(keys)
  {
    if(keys == null)
      return (<Text style={tradeStyle.title}> No User Keys </Text>)
    return(
    <List>
    {
      keys.map((word, i) => (
        <ListItem
          key={i}
          title={word['Name']}
          subtitleNumberOfLines={2}
          subtitle={<Text style={tradeStyle.body}>{'\t\t'}Value: ${word['Value']}{'\t\t'}Hits: {word['Hits']}</Text>}
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
      <View style={tradeStyle.wrapper}>
        <View style={tradeStyle.header}>
          <Header
            leftComponent={   <Icon size={30} name='menu' onPress={()=>navigate('DrawerOpen')}/>}
            centerComponent={ <Image source={require('./Images/TradeLife.png')} style={tradeStyle.logo}/>}
            rightComponent={  <Icon size={30} name='home' onPress={()=>navigate('Home')}/>}
          />
        </View>
        <View style={tradeStyle.topWrap}>


          <View style={tradeStyle.titleWrap}>
            <Icon reverse name='person'/>
            <Text style={tradeStyle.title}>USER KEYWORDS</Text>

          </View>
            <Text style={tradeStyle.body}>Keywords added by the user</Text>
          <View style={tradeStyle.buttonWrap}>
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

        <View style={tradeStyle.botWrap}>
          <ScrollView >
            {this.showUserKeys(keys)}
          </ScrollView>
        </View>
      </View>
    );
  }
}
