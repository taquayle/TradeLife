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
import { ListItem, Button, List, Icon, FormLabel, FormInput, Header } from 'react-native-elements';

<Header
  leftComponent={{ icon: 'menu', color: '#fff' }}
  centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
  rightComponent={{ icon: 'home', color: '#fff' }}
/>

@observer
export class KeywordsAddScreen extends React.Component {
  constructor(props)
  {
      super(props);
      this.state = {  keyword: "",
                      newScreen: true,
                      tempKeys: ['Use + to add words and check to submit to server']};
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
      tempKeys: temp})
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
            userName:User.getUserName(),
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
        this.setState({
          keyword: "",
          newScreen: true,
          tempKeys: ['Successfully Submitted']})
        // else if (responseData.error == false) //Success, allow used in
        // {
        //     console.log("---- ADDING KEYWORDS SUCCESSFUL ----");
        //     User.setYodleeToken(responseData.yodleeToken);
        //     this.setState({
        //       message: "Login Successful.. Getting profile"})
        //     this.getUserProfile()
        //     navigate('KeywordsAdd');
        // }
        // else if (responseData.error == true) //Success, allow used in
        // {
        //     console.log("---- LOGIN FAILED ----");
        //     console.log(responseData);
        //     User.setError(responseData.messages)
        //     navigate('Login');
        // }
        // else
        // {
        //   console.log("---- UNKOWN ERROR ----");
        //   console.log(responseData);
        //   User.setError(responseData.messages)
        //   navigate('Login');
        // }
    })
  }

  render(){
    const { navigate } = this.props.navigation;
    var keys = Object.values(Profile.getUserKeys())

    console.log(keys)
    return(



      <View style={profileStyle.wrapper}>
        <View style={profileStyle.topWrap}>
          <Text style={profileStyle.title}> ADD KEYWORDS</Text>

          <FormLabel fontFamily = 'monospace'>KEYWORD</FormLabel>
          <FormInput
          autoCapitalize='characters'
          onChangeText={(keyword) => this.setState({keyword})}/>
          <View style={addStyle.buttonWrap}>
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

        <View style={profileStyle.botWrap}>
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
    },
    text:{
        color: '#000000',
        fontSize: 15,
    },
})
