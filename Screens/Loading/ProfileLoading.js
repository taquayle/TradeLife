// Author: Tyler Quayle
// File: ProfileLoading.js
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

export class ProfileLoadingScreen extends React.Component {

  constructor(props)
  {
      super(props);
      this.state = {  message: "GENERATING PROFILE"};
  }
  /**************************************************************************/
  componentDidMount() // Attempt to login.
  {
    const { navigate } = this.props.navigation;
    console.log("---- ATTEMPTING TO GET PROFILE ----");
    fetch(Server.profilePutURL(),
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
            if(responseData.error_code == 1){
              console.log("---- NO TRANSACTION HISTORY  ----");
              console.log(responseData);
              navigate('Transact')
            }
            if(responseData.error_code == 2){
              console.log("---- NO COMPANY DATABASE ----");
              console.log(responseData);
              navigate('Home')
            }
            else{
              console.log("---- GENERIC ERROR CODE ----")
              console.log(responseData);
              navigate('ProfileStocks')
            }
        }
        else {
          console.log("---- UNKNOWN ERROR ----");
          console.log(responseData);
          navigate('ProfileStocks')
        }
    })
  }

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
        if (responseData.error == false) //Success move on
        {
            const { navigate } = this.props.navigation;
            console.log("---- STOCKDATA RETRIEVED ----");
            console.log(responseData.profile);
            this.setState({
              message: "Profile Found.."})
            Profile.setProfile(responseData.profile)
            navigate('ProfileStocks')
        }
        else if (responseData.error == true) // ERROR: display and remain
        {
            if(responseData.error_code == 1){
              console.log("---- NO TRANSACTION HISTORY  ----");
              console.log(responseData);
              navigate('Transact')
            }
            if(responseData.error_code == 2){
              console.log("---- NO COMPANY DATABASE ----");
              console.log(responseData);
              navigate('Home')
            }
            else{
              console.log("---- GENERIC ERROR CODE ----")
              console.log(responseData);
              navigate('ProfileStocks')
            }
        }
        else {
          console.log("---- UNKNOWN ERROR ----");
          console.log(responseData);
        }
    })
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
