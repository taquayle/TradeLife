// Author: Tyler Quayle
// File: Profile_Stocks.js
// Date: August 2, 2017

/******************************************************************************/
// RN and Addons
import React from 'react';
import { Text, View, StyleSheet, Image, BackHandler} from 'react-native'
import { StackNavigator } from 'react-navigation';
import {observer} from "mobx-react";
import Swiper from 'react-native-swiper'

/******************************************************************************/
// STYLE
import {COLOR_SCHEME, TEXT_SCHEME} from './Styles/Attributes'
import { Card, ListItem, Button, List, Header, Icon } from 'react-native-elements';
import tradeStyle from "./Styles/DefaultStyle"

/******************************************************************************/
// STORE
import User from "./Stores/UserStore"
import Profile from "./Stores/ProfileStore"
import Nav from './Stores/NavigationStore'



@observer
export class StocksProfileScreen extends React.Component {
  componentWillMount(){
    console.log("Current Screen: " + this.props.navigation.state.key)}

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('Home');
      return true //Tell react-navigation that back button is handled
    }.bind(this));
  }

  /**
  * Navigate to the Stocks_Sector screen and set the users selected nav to the
  * store.
  */
  _sectorClick(preference) // Attempt to login.
  {
    const { navigate } = this.props.navigation;
    Nav.setSectorPref(preference)
    navigate('StocksSector');
  }

  /**
  * Navigate to the Stocks_Tailored screen and set the users selected nav to the
  * store.
  */
  _tailorClick(preference) // Attempt to login.
  {
    const { navigate } = this.props.navigation;
    Nav.setTailorPref(preference)
    navigate('StocksTailored');
  }

  /**
  * Show the tailored stocks, if there is none in the store show a message
  * pointing the user to the pages used to update keywords
  */
  byTailored(){
    var tailor = Profile.getTailoredCompanies()
    if(tailor != null){
      tailor = Object.values(tailor)
      // Tailored found.
      return(
        <View style={tradeStyle.wrapper}>
          <View style={tradeStyle.topWrap}>
            <Text style={tradeStyle.title}> TAILORED STOCKS</Text>

            <Text style={tradeStyle.body}>
            These stocks are directly related to your keywords
            </Text>
          </View>
          <View style={tradeStyle.botWrap}>
            <List>
            {
              tailor.map((company, i) => (
                <ListItem
                  key={i}
                  title={company['name']}
                  onPress={this._tailorClick.bind(this, i)}
                />
              ))
            }
            </List>
          </View>
        </View>
      )}
    else{
      // Nothing was found, print the 'error msg'
      return(
        <View style={tradeStyle.wrapper}>

            <Text style={tradeStyle.title}> NO TAILORED SUGGESSTIONS FOUND </Text>

            <Text style={tradeStyle.body}>
            Most likely you have not linked any accounts or entered keywords.
            Navigate to the add keywords page. Add some words, then hit
            refresh profile button. Found in the drawer on the left.
            </Text>
        </View>
      )
    }
  }

  /**
  * Show the sector by stocks, if there is none in the store show a message
  * pointing the user to the pages used to update keywords
  */
  bySector(){
    var sector = Profile.getTargetSectors();
    if(sector != null){
      sector = Object.values(sector)
      return(
        // Sector Stocks found.
        <View style={tradeStyle.wrapper}>
          <View style={tradeStyle.topWrap}>
            <Text style={tradeStyle.title}> SUGGESTED SECTORS </Text>

            <Text style={tradeStyle.body}>
            Based on your Transaction keywords, these are the sectors you spend
            the most money in. Click on a sector to see the top 3 companies for
            each
            </Text>
          </View>
          <View style={tradeStyle.botWrap}>
            <List>
            {
              sector.map((l, i) => (
                <ListItem
                  key={i}
                  title={l}
                  onPress={this._sectorClick.bind(this, i)}
                />
              ))
            }
            </List>
          </View>
        </View>
      )
    }
    else{
      // No sectors stocks found, display error message
      return(
        <View style={tradeStyle.wrapper}>

            <Text style={tradeStyle.title}> NO SECTOR SUGGESTIONS FOUND </Text>

            <Text style={tradeStyle.body}>
            Most likely you have not linked any accounts or entered keywords.
            Navigate to the add keywords page. Add some words, then hit
            refresh profile button. Found in the drawer on the left.
            </Text>
        </View>
      )
    }
  }

  render(){
    const { navigate } = this.props.navigation;




    return(
      <View style={tradeStyle.wrapper}>
        <View style={tradeStyle.header}>
          <Header
            leftComponent={   <Icon size={30} name='menu' onPress={()=>navigate('DrawerOpen')}/>}
            centerComponent={ <Image source={require('./Images/TradeLife.png')} style={tradeStyle.logo}/>}
            rightComponent={  <Icon size={30} name='home' onPress={()=>navigate('Home')}/>}
          />
        </View>
        <View style={tradeStyle.wrapper}>
          <Swiper>
            {this.bySector()}
            {this.byTailored()}
            </Swiper>
        </View>

      </View>
    );
  }
}
