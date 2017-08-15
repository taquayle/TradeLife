// Author: Tyler Quayle
// File: Profile_Keywords.js
// Date: July 26, 2017

import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, BackHandler} from 'react-native'
import {observer} from "mobx-react";
import User from "./Stores/UserStore"
import Profile from "./Stores/ProfileStore"
import {StackNavigator} from 'react-navigation'
import { Card, ListItem, Button, List, Icon, Header } from 'react-native-elements';
import tradeStyle from "./Styles/DefaultStyle"
import {COLOR_SCHEME, TEXT_SCHEME, MAIN_BG_COLOR} from "./Styles/Attributes"
import Swiper from 'react-native-swiper'
@observer




export class KeywordsProfileScreen extends React.Component {
  componentWillMount(){
    console.log("Current Screen: " + this.props.navigation.state.key)}

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('Home');
      return true //Tell react-navigation that back button is handled
    }.bind(this));
  }

  displayKeys(keys){
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
      </List>
    )
  }
  userKeys(){
    if(Profile.getUserKeys() != null){
      return(
        <View>
          <Text style={tradeStyle.h2}>User Keywords</Text>
          {this.displayKeys(Object.values(Profile.getUserKeys()))}
        </View>
      )
    }
    else{
      const { navigate } = this.props.navigation;
      return(

        <View>
          <Text style={tradeStyle.h2}> No User Keys </Text>
          <Button
            large
            icon={{name: 'add', size: 32}}
            buttonStyle={{backgroundColor: COLOR_SCHEME[3], borderRadius: 40, marginVertical: 10}}
            textStyle={{textAlign: 'center'}}
            title={`Add Keywords`}
            onPress={() => navigate('KeywordsAdd')}
          />
        </View>
      );
    }
  }

  transactionKeys(){

    if(Profile.getDescKeys() != null){
      return(
        <View>
          <Text style={tradeStyle.h2}>Transaction Keywords</Text>
          {this.displayKeys(Object.values(Profile.getDescKeys()))}
        </View>
      );
    }

    else{
      const { navigate } = this.props.navigation;
      return(
          <View>
              <Text style={tradeStyle.h2}> No Transaction Keywords Found </Text>

              <Button
                large
                icon={{name: 'add', size: 32}}
                buttonStyle={{backgroundColor: COLOR_SCHEME[3], borderRadius: 40, marginVertical: 10}}
                textStyle={{textAlign: 'center'}}
                title={`Update Transactions`}
                onPress={() => navigate('Transact')}
              />

          </View>
      );
    }
  }

  render(){
    const { navigate } = this.props.navigation;

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
          <Text style={tradeStyle.title}>KEYWORDS</Text>
          <Text style={tradeStyle.h1}>Swipe to navigate between keywords</Text>

          <View style={tradeStyle.buttonWrap}>
            <Icon
              reverse
              name='add'
              size = {15}
              onPress={() => navigate('KeywordsAdd')}
            />
          </View>
        </View>
        <View style={tradeStyle.botWrap}>
          <ScrollView>
          <Swiper>

            {this.userKeys()}
            {this.transactionKeys()}

          </Swiper>
          </ScrollView>
        </View>
      </View>
    );
  }


}
