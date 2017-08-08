// Author: Tyler Quayle
// Date: June 23, 2017

import React from 'react';
import {AppRegistry} from 'react-native';
import { StackNavigator } from 'react-navigation';

import { Router } from './Screens/Navigation/Router'

/******************************************************************************/
// Default class
export default class TradeLife extends React.Component {

  render() {
    return (<Router/>);
  }
}


AppRegistry.registerComponent('TradeLife', () => TradeLife);
