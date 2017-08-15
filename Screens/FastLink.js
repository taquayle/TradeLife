// Author: Tyler Quayle
// File: Home.js
// Date: June 23, 2017

import React from 'react';
import { Text, View, StyleSheet, Image, BackHandler} from 'react-native'
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
    }.bind(this));}

    _onClick(){

      console.log('CLIK')
      const { navigate } = this.props.navigation;
      fetch(Server.exchangeGetURL(),
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
              userPassword:User.getPass()
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

          if(responseData == null){
            console.log("--- COULD NOT CONNECT TO TRADELIFE SERVER ---")
              User.setError("Could not connect to server")
          }
          else if (responseData.error == false) //Success, allow used in
          {
              console.log("---- LOGIN SUCCESSFUL ----");
              User.setYodleeToken(responseData.yodleeToken);
          }
          else if (responseData.error == true)
          {
              console.log("---- LOGIN FAILED ----");
              console.log(responseData);

          }
          else
          {
            console.log("---- UNKOWN ERROR ----");
            console.log(responseData);
          }
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
        <Button
          large
          icon={{name: 'autorenew', size: 32}}
          buttonStyle={{backgroundColor: COLOR_SCHEME[0], borderRadius: 40, marginVertical: 10}}
          textStyle={{textAlign: 'center'}}
          title={`Update Transactions`}
          onPress={()=> this._onClick()}
        />
        <Text style={tradeStyle.title}>PLACEHOLDER</Text>
        </View>
      </View>
    );
  }
  }
