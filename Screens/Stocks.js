// Author: Tyler Quayle
// File: Stocks.js
// Date: July 27, 2017

import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, BackHandler, Dimensions} from 'react-native'
import { StackNavigator } from 'react-navigation';
import User from "./Stores/UserStore"
import Profile from "./Stores/ProfileStore"
import { Card, Slider, ListItem, Button, List, Icon, Header } from 'react-native-elements';
import tradeStyle from "./Styles/DefaultStyle"
import {observable} from "mobx"
import {observer} from "mobx-react"
import { COLOR_SCHEME, TEXT_SCHEME, MAIN_FONT_FAMILY, MAIN_BG_COLOR,
          STOCKS_COLOR_SCHEME, STOCKS_TEXT_SCHEME } from "./Styles/Attributes"
import { VictoryBar, VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native'
import Swiper from 'react-native-swiper'



@observer
export class StocksScreen extends React.Component {
  componentWillMount(){
    console.log("Current Screen: " + this.props.navigation.state.key)}

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('ProfileStocks');
      return true //Tell react-navigation that back button is handled
    }.bind(this));
  }
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
    for (i = 1; i < closeValue.length; i++){
      if(closeValue[i] != null && closeValue[i]!= null){
        format.push(Number((closeValue[i]- closeValue[i-1])/closeValue[i-1]))
      }
    }

    // DISPLAY DIFFERENCE
    // for (i = 1; i < closeValue.length; i++){
    //   if(closeValue[i] != null && closeValue[i]!= null){
    //     format.push(Number(closeValue[i]- closeValue[i-1]))
    //   }
    // }

    // DISPLAY STOCK VALUE
    // for (i = 0; i < closeValue.length; i++){
    //   if(closeValue[i] != null){
    //     format.push(Number(closeValue[i]))
    //   }
    // }
    format.splice(0,1)
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
            onSlidingComplete={(value) => this.foo(value)}
          />
          <Swiper>
          {
            sector.map((company, i) => {
              return (
                <View key={i} style={ [ stockStyle.wrapper, { backgroundColor:  STOCKS_COLOR_SCHEME[(i%3)] } ] }>

                  <View style={stockStyle.headerWrap}>
                    <Text style={[tradeStyle.title, {color:  STOCKS_TEXT_SCHEME[(i%2)]}]}> { company['name'] } </Text>
                  </View>

                  <View style={[stockStyle.profitWrap, {backgroundColor: STOCKS_COLOR_SCHEME[ ((i+1)%3) ]}]}>

                    <View style={stockStyle.profitLeft}>

                      <Text style={[tradeStyle.body, {textAlign: 'center', color:  STOCKS_TEXT_SCHEME[(i%2)]}]}>
                        Investing
                      </Text>

                      <Text style={[tradeStyle.title, {color:  STOCKS_TEXT_SCHEME[(i%2)]}]}>
                        ${this.currentInvestment.toFixed(2)}
                      </Text>

                    </View>

                    <View style={stockStyle.profitRight}>

                      <Text style={[tradeStyle.body, {textAlign: 'center', color:  STOCKS_TEXT_SCHEME[(i%2)]}]}>
                        Profit
                      </Text>

                      <Text style={[tradeStyle.title, {color:  STOCKS_TEXT_SCHEME[(i%2)]}]}>
                        ${this.simpleReturn(company['stock_data'])}
                      </Text>

                    </View>

                  </View>

                  <View style={stockStyle.graphWrap}>
                    <VictoryChart>

                      <VictoryLine
                        key={i}
                        style={{
                          data: { stroke: STOCKS_TEXT_SCHEME[(i%2)]},
                          parent: { border: "10px solid #000"},
                          labels: {color: STOCKS_TEXT_SCHEME[(i%2)]}
                        }}
                        data={this.formatData(company['stock_data'])}
                        />
                    </VictoryChart>

                  </View>

                  <View style={[stockStyle.profitWrap, {backgroundColor: STOCKS_COLOR_SCHEME[ ((i+1)%3) ]}]}>

                    <View style={stockStyle.profitLeft}>

                      <Text style={[tradeStyle.body, {textAlign: 'center', color:  STOCKS_TEXT_SCHEME[(i%2)]}]}>
                        Cap
                      </Text>

                      <Text style={[tradeStyle.title, {color:  STOCKS_TEXT_SCHEME[(i%2)]}]}>
                        ${company['cap']}M
                      </Text>

                    </View>

                    <View style={stockStyle.profitRight}>

                      <Text style={[tradeStyle.body, {textAlign: 'center', color:  STOCKS_TEXT_SCHEME[(i%2)]}]}>
                        Price
                      </Text>

                      <Text style={[tradeStyle.title, {color:  STOCKS_TEXT_SCHEME[(i%2)]}]}>
                        ${company['price']}
                      </Text>

                    </View>

                  </View>


                  <View style={[stockStyle.profitWrap, {backgroundColor: STOCKS_COLOR_SCHEME[ ((i+1)%3) ]}]}>

                    <View style={stockStyle.genericWrap}>

                      <Text style={[tradeStyle.body, {textAlign: 'center', color:  STOCKS_TEXT_SCHEME[(i%2)]}]}>
                        Industry
                      </Text>

                      <Text style={[tradeStyle.h1, {textAlign: 'center', color:  STOCKS_TEXT_SCHEME[(i%2)]}]}>
                        {company['industry']}
                      </Text>

                    </View>

                  </View>

                  <View style={[stockStyle.profitWrap, {backgroundColor: STOCKS_COLOR_SCHEME[ ((i+1)%3) ]}]}>

                    <View style={stockStyle.genericWrap}>

                      <Text style={[tradeStyle.body, {textAlign: 'center', color:  STOCKS_TEXT_SCHEME[(i%2)]}]}>
                        Sector
                      </Text>

                      <Text style={[tradeStyle.h1, {textAlign: 'center', color:  STOCKS_TEXT_SCHEME[(i%2)]}]}>
                        {company['sector']}
                      </Text>

                    </View>

                  </View>

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
    wrapper:{
      flex: 1
    },
    topWrap:{
      flex:.15,
      backgroundColor:"#FFFFFF",
      justifyContent: 'center',
      alignItems: 'center'
    },
    botWrap:{
      flex:1,
      backgroundColor: MAIN_BG_COLOR,
    },

    profitWrap:{
      height: 64,
      borderColor: MAIN_BG_COLOR,
      borderWidth: 2,
      flexDirection:'row',
      justifyContent: 'center'
    },
    profitLeft:{
      flex:.5,
      borderRightColor: MAIN_BG_COLOR,
      borderRightWidth: 2,
    },
    profitRight:{
      flex:.5,
      borderLeftColor: MAIN_BG_COLOR,
      borderLeftWidth: 2,
    },

    genericWrap:{
      flex: 1
    },
    headerWrap:{
      height: 70,
      borderColor: MAIN_BG_COLOR,
      borderWidth: 2,
    },

    graphWrap:{
      height: 240,
      borderColor: MAIN_BG_COLOR,
      borderWidth: 2,
      justifyContent: 'center'
    },
})
