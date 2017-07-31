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

                <TouchableOpacity activeOpacity={.5}
                onPress={this._onProfileStockClick.bind(this)}>
                    <View style={homeStyle.button} >
                        <Text style={homeStyle.LoginText}>
                            Stocks
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={.5}
                onPress={this._onProfileKeywordClick.bind(this)}>
                    <View style={homeStyle.button} >
                        <Text style={homeStyle.LoginText}>
                            Keywords
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Register Button */}
                <TouchableOpacity activeOpacity={.5}
                onPress={() => navigate('Transact')}>
                    <View style={homeStyle.button} >
                        <Text style={homeStyle.LoginText}>
                            Update Transactions
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Register Button */}
                <TouchableOpacity activeOpacity={.5}
                onPress={() => navigate('FastLink')}>
                    <View style={homeStyle.button} >
                        <Text style={homeStyle.LoginText}>
                            FastLink, not implemented
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
  }
}

homeStyle = StyleSheet.create({

    wrapper:{
        flex: 1,
        backgroundColor: '#000000'
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
