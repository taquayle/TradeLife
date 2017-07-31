// Author: Tyler Quayle
// File: Home.js
// Date: June 23, 2017

import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import User from "./Stores/UserStore"
import Profile from "./Stores/ProfileStore"
import { Button } from 'react-native-elements';

export class HomeScreen extends React.Component {
  constructor(props)
  {
      super(props);
  }

  _onProfileStockClick(){
    const { navigate } = this.props.navigation;
    console.log("DOES PROFILE EXIST?")
    console.log(Profile.exists())
    if (Profile.exists()){
      navigate('ProfileStocks')
    }
    else{
      navigate('ProfileLoading')
    }

  }

  _onProfileKeywordClick(){
    const { navigate } = this.props.navigation;
    if (Profile.exists()){
      navigate('Profile')
    }
    navigate('ProfileLoading')
  }

  render() {
      const { navigate } = this.props.navigation;
    return (

        <View style={homeStyle.wrapper}>
            <View style={homeStyle.homeTop}>
                <Image source={require('./Images/TechCliksLogo.png')} />
            </View>

            <View style={homeStyle.homeBot}>
              <Button
                raised
                icon={{name: 'room', size: 32}}
                buttonStyle={{backgroundColor: 'red', borderRadius: 10}}
                textStyle={{textAlign: 'center'}}
                title={`Stocks`}
                onPress={this._onProfileStockClick.bind(this)}
              />


              <Button
                raised
                icon={{name: 'room', size: 32}}
                buttonStyle={{backgroundColor: 'blue', borderRadius: 10}}
                textStyle={{textAlign: 'center'}}
                title={`Keywords`}
                onPress={this._onProfileStockClick.bind(this)}
              />


              <Button
                raised
                icon={{name: 'room', size: 32}}
                buttonStyle={{backgroundColor: 'green', borderRadius: 10}}
                textStyle={{textAlign: 'center'}}
                title={`Transactions`}
                onPress={() => navigate('Transact')}
              />

              <Button
                raised
                icon={{name: 'room', size: 32}}
                buttonStyle={{backgroundColor: 'orange', borderRadius: 10}}
                textStyle={{textAlign: 'center'}}
                title={`FastLink`}
                onPress={() => navigate('FastLink')}
              />

            </View>
        </View>
    );
  }
}

homeStyle = StyleSheet.create({
    wrapper:{
        flex: 1,
          backgroundColor: '#ffffff'
    },
    homeTop:{
        flex: 1,
        backgroundColor: '#ffffff', //Black
    },
    homeBot:{
        flex: 2,
        backgroundColor: '#ffffff', //Black
        flexDirection: 'column'
    },
    homeText:{
        color: '#ffffff',
        fontSize: 30,
    },
    homeCont:{
      flex: 1,
    },
    button:{
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
