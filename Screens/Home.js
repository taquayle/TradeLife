// Author: Tyler Quayle
// File: Home.js
// Date: June 23, 2017

import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import User from "./Stores/UserStore"
import Profile from "./Stores/ProfileStore"


export class HomeScreen extends React.Component {
  constructor(props)
  {
      super(props);
  }

  /**************************************************************************/
  // Login logic
  _onProfileClick(){
    let userNameInput = User.getUserName();
    let yodToken = User.getYodleeToken();

    console.log("---- ATTEMPTING TO GET PROFILE ----");
    fetch('http://192.168.33.10/profile',
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
        console.log(responseData.profile);
        console.log(responseData.profile['Desc_Keywords'][0]);
        if (responseData.error == false) //Success move on
        {
            const { navigate } = this.props.navigation;
            console.log("---- PROFILE SUCCESSFUL ----");
            Profile.setProfile(responseData.profile)
            navigate('Profile');
        }
        else if (responseData.error == true) // ERROR: display and remain
        {
            console.log("---- INVALID LOGIN ----");
            console.log(responseData);
            Alert.alert(
                JSON.stringify(responseData.messages))
        }
        else {
          console.log("---- UNKNOWN ERROR ----");
          console.log(responseData);
        }
    })

    .done();
  }

  _onSubmit() // Attempt to login.
  {
      console.log("---- ATTEMPTING LOGIN ----");
      fetch('http://192.168.33.10/login',
      {
          method: 'post',
          headers:
          {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body:JSON.stringify(
          {

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
              console.log("---- INVALID LOGIN ----");
              console.log(responseData);
              Alert.alert(
                  JSON.stringify(responseData.messages))
          }
      })

      .done();
  }
  render() {
      const { navigate } = this.props.navigation;
    return (
        <View style={homeStyle.homeWrapper}>

            <View style={homeStyle.homeTop}>
                <Image source={require('../objects/TechCliksLogo.png')} />
            </View>

            <View style={homeStyle.homeBot}>


                <View style={homeStyle.homeCont}>
                    <TouchableOpacity activeOpacity={.5}
                    onPress={this._onProfileClick.bind(this)}>
                        <View style={homeStyle.tranButton} >
                            <Text style={homeStyle.LoginText}>
                                Profile
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={.5}
                    onPress={this._onProfileClick.bind(this)}>
                        <View style={homeStyle.tranButton} >
                            <Text style={homeStyle.LoginText}>
                                Profile
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={homeStyle.homeCont}>

                    {/* Register Button */}
                    <TouchableOpacity activeOpacity={.5}
                    onPress={() => navigate('Transact')}>
                        <View style={homeStyle.tranButton} >
                            <Text style={homeStyle.LoginText}>
                                Update Transactions
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {/* Register Button */}
                    <TouchableOpacity activeOpacity={.5}
                    onPress={() => navigate('FastLink')}>
                        <View style={homeStyle.tranButton} >
                            <Text style={homeStyle.LoginText}>
                                FastLink, not implemented
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
  }
}

homeStyle = StyleSheet.create({
    homeWrapper:{
        flex: 1,
    },
    homeTop:{
        flex: 1,
        backgroundColor: '#000000', //Black
    },
    homeBot:{
        flex: 2,
        backgroundColor: '#000000', //Black
        flexDirection: 'column'
    },
    homeText:{
        color: '#ffffff',
        fontSize: 30,
    },
    homeCont:{
      flex: 1,
    },
    tranButton:{
        backgroundColor: "#16608B",
        paddingVertical: 10,
        marginVertical: 30,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    LoginText:{
        color: '#FFFFFF', //White
        fontSize: 18
    },
})
