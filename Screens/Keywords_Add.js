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
import {  ListItem,
          Button,
          List,
          Icon,
          FormLabel,
          FormInput,
          FormValidationMessage,
          Header
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import {observer} from "mobx-react";
import User from "./Stores/UserStore"
import Profile from "./Stores/ProfileStore"
import Server from "./Stores/TradeLifeStore"
import tradeStyle from "./Styles/Default"



@observer
export class KeywordsAddScreen extends React.Component {
  constructor(props)
  {
      super(props);
      this.state = {  keyword: "",
                      newScreen: true,
                      tempKeys: ['Use + to add words', 'Press [Check] to submit to server']};
  }

  addKey(){

    if(this.state.keyword == "")
      return

    var temp = this.state.tempKeys
    if(this.state.newScreen){
      temp = [this.state.keyword]
    }
    else{
      temp.push(this.state.keyword)
    }
    this.setState({
      keyword: "",
      newScreen: false,
      tempKeys: temp,
      errMsg: ""})
  }

  _postToServer(){
    const { navigate } = this.props.navigation;
    if(this.state.newScreen){
      this.setState({
        keyword: "",
        newScreen: true,
        tempKeys: ['Must Enter Keyword before submitting']})
        return
    }



    console.log("---- ATTEMPTING TO SUBMIT NEW KEYWORDS TO SERVER ----");
    fetch(Server.profilePostURL(),
    {
        method: 'post',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(
        {
            userName:User.getName(),
            keyWords:this.state.tempKeys
        })
    })

    .then((response) => {
      // In this case, we check the content-type of the response
      if (response.headers.get('content-type').match(/application\/json/)) {
        return response.json();
      }
      return response.text();
      })
     .catch((error) =>
     {
         console.log(error);
         (response) => response.text();
     })
    .then((responseData) =>
    {
        console.log(responseData)

        if (responseData.error == false) //Success, allow used in
        {
            console.log("---- ADDING KEYWORDS SUCCESSFUL ----");
            Profile.setUserKeys(responseData.keywords)
            this.setState({
              keyword: "",
              newScreen: true,
              tempKeys: ['Successfully Submitted']})
            navigate('KeywordsUser')
        }
        else if (responseData.error == true) //Success, allow used in
        {
            console.log("----  FAILED ----");
            console.log(responseData);
            this.setState({
              errMsg: responseData.message})
        }
        else
        {
          console.log("---- UNKOWN ERROR ----");
          console.log(responseData);
          this.setState({
            errMsg: "Unknown Error Occured"})
        }
    })
  }

  render(){
    const { navigate } = this.props.navigation;
    var keys = null
    if(Profile.getUserKeys() != null)
      keys = Object.values(Profile.getUserKeys())

    return(



      <View style={tradeStyle.wrapper}>
        <View style={tradeStyle.topWrap}>
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

        <View style={tradeStyle.botWrap}>
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


            {/*{this.showUserKeys(keys)}*/}
          </ScrollView>
        </View>
      </View>
    );
  }
}

addStyle = StyleSheet.create({
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
    titleAndForm:{
      flex:.5,
    },
    buttonWrap:{
      flex:.5,
      flexDirection:'row'
    },
    botWrap:{
      flex:.65,
      backgroundColor:"#FFFFFF",
    },
    title:{
        color: '#000000',
        fontSize: 30,
        textAlign: 'center'
    },
    text:{
        color: '#000000',
        fontSize: 15,
    },
})
