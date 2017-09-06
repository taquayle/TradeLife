// Author: Tyler Quayle
// File: Keywords_Add.js
// Date: July 30, 2017
// Desc: Allow users to add custom keywords into the app. User can enter as many
//      keywords as they want, will not update the profile until user hits the
//      checkmark button and submits to server

/******************************************************************************/
// RN and Addons
import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, BackHandler} from 'react-native'
import {  ListItem, Button, List, Icon, FormLabel, FormInput,
          FormValidationMessage, Header} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import {observer} from "mobx-react";

/******************************************************************************/
// STYLE
import tradeStyle from "./Styles/DefaultStyle"

/******************************************************************************/
// STORE
import User from "./Stores/UserStore"
import Profile from "./Stores/ProfileStore"
import Server from "./Stores/TradeLifeStore"




@observer
export class KeywordsAddScreen extends React.Component {
  componentWillMount(){
    console.log("Current Screen: " + this.props.navigation.state.key)}

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('KeywordsProfile');
      return true //Tell react-navigation that back button is handled
    }.bind(this));
  }
  constructor(props)
  {
      super(props);
      // Default attributes show instructions. will be destroyed upon entering
      // in a new keyword. Cannot post to server until !newScreen
      this.state = {  keyword: "",
                      newScreen: true,
                      tempKeys: ['Use + to add words', 'Press [Check] to submit to server']};
  }

  /**
  * Attempt to add the keywords to the current list. if a keyword is entered.
  * show in the current queue-list. If no keyword is entered. do nothing
  *
  */
  addKey(){

    if(this.state.keyword == "")
      return

    var temp = this.state.tempKeys
    if(this.state.newScreen){
      temp = [this.state.keyword]
    }
    else{
      temp.push(this.state.keyword) //Add to the current keyword array
    }
    this.setState({
      keyword: "",
      newScreen: false,
      tempKeys: temp,
      errMsg: ""})
  }

  /**
  * Navigate to keyword loading screen only if !newScreen, meaning user has
  * entered at least 1 keyword.
  *
  */
  _postToServer(){
    if(!this.state.newScreen){
      const { navigate } = this.props.navigation;
      console.log(this.state.tempKeys)
      User.setTempKeys(this.state.tempKeys)
      navigate('KeywordAddLoading')
    }
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
        <View style={addStyle.topWrap}>

          <Text style={tradeStyle.title}> ADD KEYWORDS</Text>

          {/* SHOW ERROR MESSAGE FROM SERVER */}
          <FormValidationMessage>{this.state.errMsg}</FormValidationMessage>

          <FormLabel fontFamily = 'monospace'>KEYWORD</FormLabel>
          <FormInput
          autoCapitalize='characters'
          onChangeText={(keyword) => this.setState({keyword})}
          onEndEditing={this.addKey.bind(this)}/>
          <View style={tradeStyle.buttonWrap}>
            <Icon
              reverse
              name='add'
              onPress={this.addKey.bind(this)}
            />
            <Icon
              reverse
              name='check'
              onPress={this._postToServer.bind(this)}/>
          </View>
        </View>

        <View style={addStyle.botWrap}>
          <ScrollView >
            <List>
            {
              this.state.tempKeys.map((word, i) => (
                <ListItem
                  hideChevron
                  key={i}
                  title={word}
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

// Custom keyword style
addStyle = StyleSheet.create({
    topWrap:{
      flex:.55,
      backgroundColor:"#FFFFFF",
      justifyContent: 'center',
      alignItems: 'center'
    },
    botWrap:{
      flex:.35,
      backgroundColor:"#FFFFFF",
    },
})
