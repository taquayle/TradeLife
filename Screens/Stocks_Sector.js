// Author: Tyler Quayle
// File: Stocks.js
// Date: July 29, 2017
// Desc: Show the mathcing stocks to the sector selected by the user.

/******************************************************************************/
// RN and Addons
import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, BackHandler, Dimensions} from 'react-native'
import { StackNavigator } from 'react-navigation';
import { Card, Slider, ListItem, Button, List, Icon, Header } from 'react-native-elements';
import { VictoryContainer, VictoryLine, VictoryAxis,
            VictoryChart, VictoryTheme} from 'victory-native'
import Swiper from 'react-native-swiper'
import {observable} from "mobx"
import {observer} from "mobx-react"
/******************************************************************************/
// STYLE
import tradeStyle from "./Styles/DefaultStyle"
import stockStyle from "./Styles/StockStyle"
import { COLOR_SCHEME, TEXT_SCHEME, MAIN_FONT_FAMILY, MAIN_BG_COLOR,
          STOCKS_COLOR_SCHEME, STOCKS_TEXT_SCHEME } from "./Styles/Attributes"

/******************************************************************************/
// STORE
import User from "./Stores/UserStore"
import Nav from './Stores/NavigationStore'
import Profile from "./Stores/ProfileStore"

@observer
export class StocksSectorScreen extends React.Component {
  // For debug purposes, will output to the console the current screen.
  componentWillMount(){
    console.log("Current Screen: " + this.props.navigation.state.key)}

  // Override the standard back button and navigate properly
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.navigate('StocksProfile');
      return true //Tell react-navigation that back button is handled
    }.bind(this));
  }
  @observable currentInvestment = 100; /*Mobx Variable*/

  constructor(props)
  {
      super(props);
      this.state = { invest: 100,
                    stocks: Profile.getCapStocks()}
  }

  /*
  * Calculate a simple return for the current investment, which is chosen by the
  * user by the slider. To Calculate simple return, we add a running total of
  * all the given data points using the formula:
  *   Return += (TodayClose - YesterdayClose) / YesterdayClose
  * @param company, an array of objects [closePrice, Date]
  * @return float, calculated simple return
  */
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


  /**
  * Keeps the page from refreshing when playing around with the slider
  */
  updateInvest(val){
    this.setState({invest: val})
  }


  /*
  * Creates the graph with the given stock prices, if nothing is available print
  * that message
  *
  * @param array of stocks prices @stockData
  * @param current index the user is looking at @index
  *
  */
  createGraph(stockData, index){
    if(stockData == null){
      return(
        <Text style={[tradeStyle.title, {color:  STOCKS_TEXT_SCHEME[(index%2)]}]}>
        NO STOCK DATA AVAILABLE
        </Text>
      )
    }
    else{
      return(
        <VictoryChart>
          <VictoryAxis
            style={{
              axis: {stroke: STOCKS_TEXT_SCHEME[(index%2)]},
              tickLabels: {fill: "none"},
            }}
            tickCount={10}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(y) => (`$${y}`)}
            style={{
              axis: {stroke: STOCKS_TEXT_SCHEME[(index%2)]},
              tickLabels: {fill: STOCKS_TEXT_SCHEME[(index%2)], fontSize: 12},
            }}
            crossAxis={false}
          />
          <VictoryLine
            key={index}
            data={this.formatData(stockData)}
            interpolation="natural"
            style={{
              data: { stroke: STOCKS_TEXT_SCHEME[(index%2)]}
            }}
          />
        </VictoryChart>
      )
    }
  }



  /**
  * Format the data given in the company[stock_data] into a format
  * Victory-native can use. Mainly this consists of getting rid of NULL values,
  * and converting from string to int
  *
  */
  formatData(company, formatType = 'value'){
    if(company == null) // If quandl data could not be found
      return [0,0,0]
    var closeValue = Object.values(company)
    var format = []

    // DISPLAY RETURN
    if(formatType == 'return'){
      for (i = 1; i < closeValue.length; i++){
        if(closeValue[i] != null && closeValue[i]!= null){
          format.push(Number((closeValue[i]- closeValue[i-1])/closeValue[i-1]))}}
      format.splice(0,1) //Get rid of first value,
    }

    // DISPLAY DIFFERENCE
    else if(formatType == 'difference'){
      for (i = 1; i < closeValue.length; i++){
        if(closeValue[i] != null && closeValue[i]!= null){
          format.push(Number(closeValue[i]- closeValue[i-1]))}}
      format.splice(0,1) //Get rid of first value,
    }

    // DISPLAY STOCK VALUE
    else{
      for (i = 0; i < closeValue.length; i++){
        if(closeValue[i] != null){
          format.push(Number(closeValue[i]))}}
    }


    return format;
  }

  foo(value){
    this.currentInvestment = value
  }
  render() {
    const { navigate } = this.props.navigation;
    var sectorTitle = Object.values(Profile.getTargetSectors())
    var stocksArray = Object.values(this.state.stocks)
    var sector = Object.values(stocksArray[Nav.getSectorPref()])
    // This 'custom' layout i made is super touchy. but it works for everything
    // I tested it on.
    return (
      <View style={stockStyle.wrapper}>

        <View style={stockStyle.profitWrap}>
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

                  <View style={stockStyle.profitWrap}>
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
                        Return
                      </Text>

                      <Text style={[tradeStyle.title, {color:  STOCKS_TEXT_SCHEME[(i%2)]}]}>
                        ${this.simpleReturn(company['stock_data'])}
                      </Text>

                    </View>

                  </View>

                  <View style={stockStyle.graphWrap}>
                    {this.createGraph(company['stock_data'], i)}
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
