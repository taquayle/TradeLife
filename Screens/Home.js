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
    console.log("--- Going to Profile-STOCKS ---")
    const { navigate } = this.props.navigation;
    if (Profile.exists()){
      navigate('ProfileStocks')
    }
    else{
      navigate('ProfileLoading')
    }

  }

  _onProfileKeywordClick(){
    console.log("--- Going to Profile-KEYWORDS ---")
    const { navigate } = this.props.navigation;
    if (Profile.exists()){
      navigate('ProfileKeywords')
    }
    else{
      navigate('ProfileLoading')
    }
  }

  render() {
      const { navigate } = this.props.navigation;
    return (

        <View style={homeStyle.wrapper}>
            <View style={homeStyle.homeTop}>


                  <Image source={require('./Images/TradeLife.png')} style={homeStyle.logo}/>

            </View>

            <View style={homeStyle.homeBot}>

              <Button
                large
                icon={{name: 'room', size: 32}}
                buttonStyle={{backgroundColor: 'red', borderRadius: 40, marginVertical: 10}}
                textStyle={{textAlign: 'center'}}
                title={`Stocks`}
                onPress={this._onProfileStockClick.bind(this)}
              />


              <Button
                large
                icon={{name: 'room', size: 32}}
                buttonStyle={{backgroundColor: 'blue', borderRadius: 40, marginVertical: 10}}
                textStyle={{textAlign: 'center'}}
                title={`Keywords`}
                onPress={this._onProfileKeywordClick.bind(this)}
              />


              <Button
                large
                icon={{name: 'room', size: 32}}
                buttonStyle={{backgroundColor: 'green', borderRadius: 40, marginVertical: 10}}
                textStyle={{textAlign: 'center'}}
                title={`Transactions`}
                onPress={() => navigate('Transact')}
              />

              <Button
                large
                icon={{name: 'room', size: 32}}
                buttonStyle={{backgroundColor: 'orange', borderRadius: 40, marginVertical: 10}}
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
    logo:{
      resizeMode: 'contain',
      height: 25,
      backgroundColor: 'transparent',

    },
    wrapper:{
        flex: 1,
          backgroundColor: '#ffffff'
    },
    homeTop:{
        flex: 1,
        backgroundColor: '#ffffff', //Black

        alignItems: 'center'
    },
    homeBot:{
        flex: 2,
        backgroundColor: '#ffffff', //Black

    },
    homeText:{
        color: '#ffffff',
        fontSize: 30,
    },
    container1:{
      flex: 2,
      alignItems:'flex-start',
      backgroundColor: "#00ff00"
    },
    container2:{
      flex: 2,
      alignItems:'flex-start',
      backgroundColor: "#0000ff"
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
