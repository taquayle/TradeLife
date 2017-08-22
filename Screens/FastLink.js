// Author: Tyler Quayle
// File: Home.js
// Date: June 23, 2017

import React from 'react';
import { Text, View, StyleSheet, Image, BackHandler, Alert} from 'react-native'
import { StackNavigator } from 'react-navigation';
import { Header, Icon, Button } from 'react-native-elements'
import tradeStyle from './Styles/DefaultStyle'
import {COLOR_SCHEME } from './Styles/Attributes'
import Server from './Stores/TradeLifeStore'
import User from './Stores/UserStore'

export class FastLink extends React.Component {
  componentWillMount(){
    console.log("Current Screen: " + this.props.navigation.state.key)}

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('Home');
      return true //Tell react-navigation that back button is handled
    }.bind(this));

    this.getFastLinkTokens();
  }

  getFastLinkTokens(){

    console.log("---- ATTEMPTING TO GET FASTLINK TOKEN ----");
    fetch(Server.fastLinkURL(),
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
            yodleeToken:User.getYodleeToken()
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
      console.log("---- SERVER RESPONSE ----")
      console.log(responseData)

      if(!responseData.error){
        this.postFastLink(responseData.url, responseData.fastlinktokens)
      }
    })
  }

  postFastLink(url, linkTokens){
    console.log("---- ATTEMPTING TO LAUNCH FASTLINK ----");
    console.log("url: " + url)
    console.log("rSession: " + linkTokens['rsession'])
    fetch(url,
    {
        method: 'post',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(
        {
            rsession:linkTokens['rsession'],
            app:linkTokens['app'],
            token:linkTokens['token'],
            redirectReq:true
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
      console.log("---- SERVER RESPONSE ----")
      console.log(responseData)
    })
  }

  constructor (props) {
    super(props)
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={tradeStyle.wrapper}>
        <View style={tradeStyle.header}>
          <Header
            leftComponent={   <Icon size={30} name='menu' onPress={()=>navigate('DrawerOpen')}/>}
            centerComponent={ <Image source={require('./Images/TradeLife.png')} style={tradeStyle.logo}/>}
            rightComponent={  <Icon size={30} name='home' onPress={()=>navigate('Home')}/>}
          />
        </View>

        <View style={tradeStyle.topWrap}>

        </View>

        <View style={tradeStyle.botWrap}>

          <Text style={tradeStyle.title}>PLACEHOLDER</Text>
        </View>
      </View>
    );
  }
  }
