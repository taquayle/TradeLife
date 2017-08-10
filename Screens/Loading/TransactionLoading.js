// Author: Tyler Quayle
// File: TransactionLoading.js
// Date: July 28, 2017

import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import User from "../Stores/UserStore"
import Server from "../Stores/TradeLifeStore"
import Profile from "../Stores/ProfileStore"
import loadStyle from "../Styles/LoadingStyle"

export class TransactionLoadingScreen extends React.Component {

  constructor(props)
  {
      super(props);
      this.state = {  message: "Getting Transactions..."};
  }
  /**************************************************************************/
  componentDidMount() // Attempt to login.
  {

    console.log("---- ATTEMPTING TO GET TRANSACTIONS ----");
    fetch(Server.transactionPutURL(),
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
        console.log("---- SERVER RESPONSE ----");
        console.log(responseData);

        if (responseData.error == false) //Success, allow used in
        {
            const { navigate } = this.props.navigation;
            console.log("---- TRANSACTIONS UPDATED ----");
            navigate('Transact');
        }
        else // ERROR: display and remain
        {
            console.log("---- COULD NOT GET TRANSACTIONS ----");
            console.log(responseData);
            navigate('Transact')
        }
    })

    .done();
  }


  render() {
      const { navigate } = this.props.navigation;
    return (
        <View style={loadStyle.bg, loadStyle.wrapper}>

            <View style={loadStyle.bg, loadStyle.topWrap}>
                <Image style={loadStyle.logo} source={require('../Images/TradeLife.png')} />
            </View>

            <View style={loadStyle.bg, loadStyle.midWrap}>

            <View style={loadStyle.bg, loadStyle.activityWrap}>
              <ActivityIndicator
                color="#000000"
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
    );
  }
}
