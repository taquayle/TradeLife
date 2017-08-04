// Author: Tyler Quayle
// File: Stocks.js
// Date: July 27, 2017

import React from 'react';
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import User from "./Stores/UserStore"
import Profile from "./Stores/ProfileStore"
import { Slider, ListItem, Button, List, Icon, FormLabel, FormInput, Header } from 'react-native-elements';




export class StocksScreen extends React.Component {
  constructor(props)
  {
      super(props);
      this.state = { invest: 100,
                    disOrCap: false,
                    order: "BY MARKET CAP",
                    icon: 'memory',
                    stocks: Profile.getCapStocks()}
  }

  simpleReturn(company){
    if(company == null) // If quandl data could not be found
      return "N/A"
    var closeValue = Object.values(company)
    var returnValue = 0
    
    for (i = 1; i < closeValue.length; i++){
      if(closeValue[i] != null && closeValue[i] != null){
        returnValue += ((closeValue[i] - closeValue[i-1])/closeValue[i-1])
      }
    }

    return ((this.state.invest * returnValue)).toFixed(2)
  }

  updateInvest(val){
    this.setState({invest: val})
  }



  switchOrder(){
    if(this.state.disOrCap){
      this.setState({ disOrCap: !this.state.disOrCap,
                      order: "BY MARKET CAP",
                      icon:"memory",
                      stocks: Profile.getCapStocks()})
    }
    else{
      this.setState({ disOrCap: !this.state.disOrCap,
                      order: "BY DISRUPTION",
                      icon:"attach-money",
                      stocks: Profile.getDisruptiveStocks()})
    }
  }
  render() {
    var sectorTitle = Object.values(Profile.getTargetSectors())
    var stocksArray = Object.values(this.state.stocks)
    var sector = Object.values(stocksArray[User.getSectorPref()])
    return (
      <View style={profileStyle.wrapper}>

        <View style={profileStyle.oneTop}>
          <Text style={profileStyle.title}>{sectorTitle[User.getSectorPref()]} STOCKS {this.state.order}</Text>
          <Text>These are the stocks in the {sectorTitle[User.getSectorPref()]} sector that are suggesed to you, they are ordered {this.state.order}</Text>


          <Slider
            minimumValue={10}
            maximumValue={10000}
            value={this.state.invest}
            onValueChange={(value) => this.updateInvest(value)} />
          <Text>Investing: ${this.state.invest.toFixed(2)} on {Profile.getInvestDate()}</Text>
          <Icon
            reverse
            name={this.state.icon}
            onPress={() => this.switchOrder()}
          />
        </View>

        <View style={profileStyle.oneBot}>
          <List>
          {
            sector.map((company, i) => (
              <ListItem
                key={i}
                title={company['name']}
                titleContainerStyle={profileStyle.listContainer}
                rightTitle={this.simpleReturn(company['stock_data'])}
                subtitleNumberOfLines={2}
                subtitleContainerStyle={profileStyle.listContainer}
                subtitle={<Text>{'\t'} | {company['symbol']} {'\t'}| Cap: ${company['cap']}{'\t'}| Price: ${company['price']}</Text>}
              />
            ))
          }
          </List>
        </View>
      </View>
    );
  }
}
