// Author: Tyler Quayle
// File: Keywords_Profile.js
// Date: July 26, 2017
// Desc: Show all the keywords the user currently has. With a swipe function

/******************************************************************************/
// RN and Addons
import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, BackHandler} from 'react-native'
import {observer} from "mobx-react";
import {StackNavigator} from 'react-navigation'
import { Card, ListItem, Button, List, Icon, Header } from 'react-native-elements';
import Swiper from 'react-native-swiper'

/******************************************************************************/
// STYLE
import tradeStyle from "./Styles/DefaultStyle"
import {COLOR_SCHEME, TEXT_SCHEME, MAIN_BG_COLOR} from "./Styles/Attributes"

/******************************************************************************/
// STORE
import User from "./Stores/UserStore"
import Profile from "./Stores/ProfileStore"

@observer
export class KeywordsProfileScreen extends React.Component {
  componentWillMount(){
    console.log("Current Screen: " + this.props.navigation.state.key)}

  // Override the android back button function
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('Home');
      return true //Tell react-navigation that back button is handled
    }.bind(this));
  }

  /**
  * Function to display the given keywords in a list.
  *
  * @param array of keywords
  * @return listview of keywords
  */
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

  /**
  * Attempt to show all user entered keywords. If no keyword are found, point to
  * the keywords_add screen.
  *
  * @return uerkeywords View
  */
  userKeys(){
    if(Profile.getUserKeys() != null){
      // Keywords found, display them
      return(
        <View>
          <Text style={tradeStyle.h2}>User Keywords</Text>
          {this.displayKeys(Object.values(Profile.getUserKeys()))}
        </View>
      )
    }
    else{
      const { navigate } = this.props.navigation;
      // No keywords found, show text and button pointing user to KeywordsAdd
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

  /**
  * Attempt to show all transactions based keywords, if no transaction keywords
  * found, point user to transactions screen
  *
  * @return transactions View
  */
  transactionKeys(){

    if(Profile.getKeywords() != null){
      // Transaction keywords found, display them
      return(
        <View>
          <Text style={tradeStyle.h2}>Transaction Keywords</Text>
          {this.displayKeys(Object.values(Profile.getKeywords()))}
        </View>
      );
    }

    else{
      const { navigate } = this.props.navigation;
      // No keywords found, show text and point to Transaction screen
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

        {/* Swiper to display user keywords */}
        <View style={tradeStyle.botWrap}>
          <Swiper>
            <ScrollView>
              {this.userKeys()}
            </ScrollView>
            <ScrollView>
              {this.transactionKeys()}
            </ScrollView>
          </Swiper>
        </View>

      </View>
    );
  }


}
