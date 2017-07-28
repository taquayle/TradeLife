// Author: Tyler Quayle
// File: Home.js
// Date: June 30, 2017

import React from 'react';
import {
  AppRegistry, Text, View, Button,
  StyleSheet, Image, TextInput, TouchableOpacity, Alert
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import store from "./Stores/UserStore"

export class TransactionScreen extends React.Component {
  _onSubmit() // Attempt to login.
  {
      let userNameInput = store.getUserName();
      let yodToken = store.getYodleeToken();

      console.log("---- ATTEMPTING TO GET TRANSACTIONS ----");
      fetch('http://192.168.33.10/transaction',
      {
          method: 'post',
          headers:
          {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body:JSON.stringify(
          {
              userName:userNameInput,
              yodleeToken:yodToken
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
              console.log("---- LOGIN SUCCESSFUL ----");
              navigate('Home');
          }
          else // ERROR: display and remain
          {
              console.log("---- COULD NOT GET TRANSACTIONS ----");
              console.log(responseData);
              Alert.alert(
                  JSON.stringify(responseData.messages))
          }
      })

      .done();
  }
  render() {
    return (
      <View>
      {/* Login Button */}
      <TouchableOpacity activeOpacity={.5}
      onPress={this._onSubmit.bind(this)}>
          <View style={logStyle.loginButton} >
              <Text style={logStyle.LoginText}>
                  Get Transactions
              </Text>
          </View>
      </TouchableOpacity>
      </View>
    )
  }
}
