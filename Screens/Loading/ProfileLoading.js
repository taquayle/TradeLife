// Author: Tyler Quayle
// File: ProfileLoading.js
// Date: July 28, 2017
// Desc: Update the user profile from server. Server destroys old profile and
//        rebuilds.

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

export class ProfileLoadingScreen extends React.Component {

  constructor(props)
  {
      super(props);
      this.state = {  message: "GENERATING PROFILE"};
  }
  /**************************************************************************/
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('StocksProfile');
      return true //Tell react-navigation that back button is handled
    }.bind(this));

    const { navigate } = this.props.navigation;
    console.log("---- ATTEMPTING TO GET PROFILE ----");
    fetch(Server.profileUpdateURL(),
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
        if (responseData.error == false) //Success move on
        {
            const { navigate } = this.props.navigation;
            console.log("---- PROFILE GENERATION SUCCESSFUL ----");
            this.setState({
              message: "GETTING STOCK DATA"})
            this.retrieveStockData()
        }
        else if (responseData.error == true) // ERROR: display and remain
        {
            // Re-did logic to allow the use of only userkeywords.
            if(responseData.error_code == 1){
              console.log("---- NO TRANSACTION HISTORY  ----");
              console.log(responseData);
              this.setState({
                message: "GETTING STOCK DATA"})
              this.retrieveStockData()
            }
            else if(responseData.error_code == 2){
              console.log("---- NO COMPANY DATABASE ----");
              console.log(responseData);
              navigate('StocksProfile')
            }
            else{
              console.log("---- GENERIC ERROR CODE ----")
              console.log(responseData);
              navigate('StocksProfile')
            }
        }
        else {
          console.log("---- UNKNOWN ERROR ----");
          console.log(responseData);
          navigate('StocksProfile')
        }
    })
  }

  // Connect to QUANDL Servers to get stock data for company
  retrieveStockData()
  {
    const { navigate } = this.props.navigation;
    console.log("---- ATTEMPTING TO DOWNLOAD STOCK DATA ----");
    fetch(Server.stocksGetURL(),
    {
        method: 'post',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(
        {
            userName:User.getName()
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
         navigate('Home')
     })

    .then((responseData) =>
    {
      console.log("---- SERVER RESPONSE ----")
      console.log(responseData)
      if (responseData.error == false) //Success move on
      {
          const { navigate } = this.props.navigation;
          console.log("---- STOCKDATA RETRIEVED ----");
          this.setState({
            message: "Profile Found.."})
          Profile.setProfile(responseData.profile)
      }
      else if (responseData.error == true)
      {
          if(responseData.error_code == 1){
            console.log("---- NO TRANSACTION HISTORY  ----");
            console.log(responseData);
          }
          if(responseData.error_code == 2){
            console.log("---- NO COMPANY DATABASE ----");
            console.log(responseData);

          }
          else{
            console.log("---- GENERIC ERROR CODE ----")
            console.log(responseData);
          }
      }
      else {
        console.log("---- UNKNOWN ERROR ----");
        console.log(responseData);

      }
      navigate('StocksProfile')
    })
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
