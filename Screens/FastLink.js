// Author: Tyler Quayle
// File: FastLink.js
// Date: August 13, 2017
// Desc: Attempt to launch fastlink 2.0 app.

/******************************************************************************/
// RN and Addons
import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Image, BackHandler, Alert} from 'react-native'
import { StackNavigator } from 'react-navigation';
import { Header, Icon, Button } from 'react-native-elements'

/******************************************************************************/
// STYLE
import tradeStyle from './Styles/DefaultStyle'
import loadStyle from './Styles/LoadingStyle'
import {COLOR_SCHEME, MAIN_TEXT_COLOR } from './Styles/Attributes'

/******************************************************************************/
// STORE
import Server from './Stores/TradeLifeStore'
import User from './Stores/UserStore'



export class FastLink extends React.Component {
  componentWillMount(){
    console.log("Current Screen: " + this.props.navigation.state.key)}

  constructor(props){
      super(props);
      this.state = { doneLoading: false,
                     message: 'GATHERING FASTLINK TOKENS'}
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('Home');
      return true //Tell react-navigation that back button is handled
    }.bind(this));

    // Attempt to launch the fastlink app.
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
        this.setState({
          message: "GOT FASTLINK TOKENS"})
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
      this.setState({
        message: responseData,
        doneLoading: true})
    })
  }



  launchFastLink(){

    if(this.state.doneLoading){
      return(
        <View>
        <Text style={tradeStyle.title}>
          {this.state.message}
        </Text>
        </View>
      )
    }
    else{
      return(
        <View style={loadStyle.bg, loadStyle.wrapper}>
            <View style={loadStyle.bg, loadStyle.midWrap}>

            <View style={loadStyle.bg, loadStyle.activityWrap}>
              <ActivityIndicator
                color = { MAIN_TEXT_COLOR }
                style={[loadStyle.bg, {transform: [{scale: 5.5}]}]}
              />
            </View>

            <View style={loadStyle.bg, loadStyle.textWrap}>
              <Text style={loadStyle.loadingText}>{this.state.message}</Text>
            </View>

            </View>

            <View style={loadStyle.bg, loadStyle.bottomBuffer}>
            </View>
        </View>
      )
    }
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

          {this.launchFastLink()}
        </View>
      </View>
    );
  }
  }
