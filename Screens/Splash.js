// Author: Tyler Quayle
// File: Splash.js
// Date: June 23, 2017
// Desc: Show tradelife logo before going to login screen

/******************************************************************************/
// RN and Addons
import React from 'react';
import { View, StyleSheet, Image} from 'react-native'
import { StackNavigator } from 'react-navigation'
/******************************************************************************/
// STYLE
/******************************************************************************/
// STORE

import { MAIN_BG_COLOR } from './Styles/Attributes'
export class SplashScreen extends React.Component {
  componentWillMount(){
    console.log("Current Screen: " + this.props.navigation.state.key)}

  constructor(props) {
    super(props);

    const { navigate } = this.props.navigation;
    setTimeout(() => { // Execute ONCE
        this.setState(previousState => {navigate('Login')});
    }, 1000); //Milliseconds before switch
  }
  render() {
    return (
      <View style = {splashStyle.splashScreen}>
        <Image source={require('./Images/TradeLife.png')} style={splashStyle.logo}/>
      </View>
    );
  }
}



/******************************************************************************/
// Style Sheet
splashStyle = StyleSheet.create({
  splashScreen:{
    flex: 1,
    backgroundColor: MAIN_BG_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo:{
    resizeMode: 'contain',
    height: 45,
    backgroundColor: 'transparent'
  }
})
