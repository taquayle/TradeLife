// Author: Tyler Quayle
// File: Stocks.js
// Date: July 27, 2017

import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import { StackNavigator } from 'react-navigation';
import User from "./Stores/UserStore"
import Profile from "./Stores/ProfileStore"
import { Card, Slider, ListItem, Button, List, Icon, Header } from 'react-native-elements';
import tradeStyle from "./Styles/DefaultStyle"
import {observable} from "mobx"
import {observer} from "mobx-react"
import { COLOR_SCHEME, TEXT_SCHEME } from "./Styles/Attributes"
import { VictoryBar, VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native'
import Swiper from 'react-native-swiper'



@observer
export class StocksScreen extends React.Component {
  componentWillMount(){
    console.log("Current Screen: " + this.props.navigation.state.key)}

  @observable currentInvestment = 100; /*Mobx Variable*/

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
      if(closeValue[i] != null && closeValue[i]!= null){
        returnValue += ((closeValue[i]- closeValue[i-1])/closeValue[i-1])
      }
    }

    return ((this.currentInvestment * returnValue)).toFixed(2)
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

  formatData(company){
    if(company == null) // If quandl data could not be found
      return [0,0,0]
    var closeValue = Object.values(company)
    var format = []
    // DISPLAY SIMPLE RETURN
    // for (i = 1; i < closeValue.length; i++){
    //   if(closeValue[i] != null && closeValue[i]!= null){
    //     format.push(Number((closeValue[i]- closeValue[i-1])/closeValue[i-1]))
    //   }
    // }

    // DISPLAY DIFFERENCE
    for (i = 1; i < closeValue.length; i++){
      if(closeValue[i] != null && closeValue[i]!= null){
        format.push(Number(closeValue[i]- closeValue[i-1]))
      }
    }

    // DISPLAY STOCK VALUE
    // for (i = 0; i < closeValue.length; i++){
    //   if(closeValue[i] != null){
    //     format.push(Number(closeValue[i]))
    //   }
    // }

    return format;
  }

  foo(value){
    this.currentInvestment = value
  }
  render() {
    const { navigate } = this.props.navigation;
    var sectorTitle = Object.values(Profile.getTargetSectors())
    var stocksArray = Object.values(this.state.stocks)
    var sector = Object.values(stocksArray[User.getSectorPref()])
    return (
      <View style={tradeStyle.wrapper}>
        <View style={tradeStyle.header}>
          <Header
            leftComponent={   <Icon size={30} name='menu' onPress={()=>navigate('DrawerOpen')}/>}
            centerComponent={ <Image source={require('./Images/TradeLife.png')} style={tradeStyle.logo}/>}
            rightComponent={  <Icon size={30} name='home' onPress={()=>navigate('Home')}/>}
          />
        </View>

        <View style={stockStyle.botWrap}>
        <Slider
          minimumValue={10}
          maximumValue={10000}
          value={this.state.invest}
          onSlidingComplete={(value) => this.foo(value)} />
            <Swiper>
            {
              sector.map((company, i) => {
                return (
                  <View key={i} style={tradeStyle.wrapper,{backgroundColor: COLOR_SCHEME[i]}}>

                    <Text style={tradeStyle.h1}>{company['name']}</Text>
                    <Text style={tradeStyle.body}>Investing: ${this.currentInvestment.toFixed(2)} on {Profile.getInvestDate()}
                     would give you ${this.simpleReturn(company['stock_data'])}</Text>

                    <VictoryChart theme={VictoryTheme.material}>
                      <VictoryLine
                        key={i}
                        style={{ data: { stroke: TEXT_SCHEME[i]},
                          parent: { border: "10px solid #000"}}}
                        data={this.formatData(company['stock_data'])}
                        />
                    </VictoryChart>
                    <Text style={tradeStyle.body}> Just Temp stuff </Text>
                    <Text style={tradeStyle.body}> Just Temp stuff </Text>
                    <Text style={tradeStyle.body}> Just Temp stuff </Text>
                    <Text style={tradeStyle.body}> Just Temp stuff </Text>
                    <Text style={tradeStyle.body}> Just Temp stuff </Text>
                    <Text style={tradeStyle.body}> Just Temp stuff </Text>
                  </View>
                )
              })
            }
          </Swiper>
        </View>
      </View>
    );
  }
}

stockStyle = StyleSheet.create({
    topWrap:{
      flex:.15,
      backgroundColor:"#FFFFFF",
      justifyContent: 'center',
      alignItems: 'center'
    },
    botWrap:{
      flex:1,
      backgroundColor:"#FFFFFF",
    },
})
