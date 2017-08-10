// Author: Tyler Quayle
// Date: August 8, 2017


import React from 'react';
import { View, StyleSheet, Image} from 'react-native'
import { StackNavigator } from 'react-navigation'
import { MAIN_BG_COLOR } from './Styles/ColorScheme'
export class SplashScreen extends React.Component {

  constructor(props) {
    super(props);

    const { navigate } = this.props.navigation;
    setTimeout(() => { // Execute ONCE
        this.setState(previousState => {navigate('Login')});
    }, 1000); //Milliseconds before switch
  }
  render() {
    return (
      <View style = {styles.splashScreen}>
        <Image source={require('./Images/TradeLife.png')} style={styles.logo}/>
      </View>
    );
  }
}



/******************************************************************************/
// Style Sheet
styles = StyleSheet.create({
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
