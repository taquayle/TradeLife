// Author: Tyler Quayle
// File: TransactionLoading.js
// Date: July 28, 2017
// Desc: Call to server to update or retrieve transactions

/******************************************************************************/
// React native & installed addons
import React from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator, BackHandler} from 'react-native'
import { StackNavigator } from 'react-navigation';

/******************************************************************************/
// Styles
import loadStyle from "../Styles/LoadingStyle"
import {MAIN_TEXT_COLOR} from "../Styles/Attributes"

/******************************************************************************/
// Stores
import User from "../Stores/UserStore"
import Server from "../Stores/TradeLifeStore"
import Profile from "../Stores/ProfileStore"
import Nav from "../Stores/NavigationStore"

export class TransactionLoadingScreen extends React.Component {

  constructor(props)
  {
      super(props);
      this.state = {  message: ""};
  }
  /**************************************************************************/
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('Transact');
      return true //Tell react-navigation that back button is handled
    }.bind(this));

    // See which nav is selected, update transactions
    if(Nav.getTransPut()){
      this.transactionsPut()
    }
    // Or Show transactions
    else if(Nav.getTransGet()){
      this.transactionsGet()
    }

    else{
      console.log('Nav store error')
      Nav.reset();
      this.props.navigation.navigate('Transact')
    }


  }

  transactionsPut(){
    console.log("---- ATTEMPTING TO UPDATE TRANSACTIONS ----");
    this.setState({
      message: "UPDATING TRANSACTIONS...."})

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

        if (responseData.error == false)
        {
            console.log("---- TRANSACTIONS UPDATED ----");
            Profile.setTransactions(responseData.count)
        }
        else if (responseData.error == true)
        {
            console.log("---- COULD NOT GET TRANSACTIONS ----");
            console.log(responseData);
        }
        else{ // UKNOWN ERROR
          console.log("---- UNKNOWN ERROR ----");
          console.log(responseData);

        }

        Nav.reset();
        this.props.navigation.navigate('Transact')
    })

    .done();
  }

  transactionsGet(){
    this.setState({
      message: "GETTING TRANSACTIONS...."})
    console.log("---- ATTEMPTING TO GET TRANSACTIONS ----");

    fetch(Server.transactionGetURL(),
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

        if (responseData.error == false)
        {
            console.log("---- TRANSACTIONS HISTORY OBTAINED ----");
            Profile.setHistory(responseData.history)
        }
        else if (responseData.error == true)
        {
            console.log("---- COULD NOT GET TRANSACTIONS ----");
        }
        else{ // UKNOWN ERROR
          console.log("---- UNKNOWN ERROR ----");
        }

        Nav.reset();
        this.props.navigation.navigate('Transact')
    })

    .done();
  }

  render() {
      const { navigate } = this.props.navigation;
    return (
        // Main Flex Wrapper
        <View style={loadStyle.bg, loadStyle.wrapper}>
            {/* Top graphic */}
            <View style={loadStyle.bg, loadStyle.topWrap}>
                <Image style={loadStyle.logo} source={require('../Images/TradeLife.png')} />
            </View>

            {/* Mid Flex */}
            <View style={loadStyle.bg, loadStyle.midWrap}>

              {/* Loading Icon */}
              <View style={loadStyle.bg, loadStyle.activityWrap}>
                <ActivityIndicator
                  color = { MAIN_TEXT_COLOR }
                  style={[loadStyle.bg, {transform: [{scale: 5.5}]}]}
                />
              </View>

              {/* Loading Text */}
              <View style={loadStyle.bg, loadStyle.textWrap}>
                <Text style={loadStyle.loadingText}>{this.state.message}</Text>
              </View>

            </View>{/* End Mid Flex */}

            {/* Bot Flex, empty, needed for centering */}
            <View style={loadStyle.bg, loadStyle.bottomBuffer}>
            </View>
        </View>// End Main Flex Wrapper
    );
  }
}
