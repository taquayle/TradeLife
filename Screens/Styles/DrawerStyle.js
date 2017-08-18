import { StyleSheet , BackHandler} from 'react-native'
import {  MAIN_BG_COLOR, DRAWER_BG_COLOR, MAIN_TEXT_COLOR,
          TEXT_SCHEME, MAIN_FONT_FAMILY, COLOR_SCHEME } from './Attributes'

export default StyleSheet.create({

  wrapper:{
    flex: 1,
    backgroundColor:MAIN_BG_COLOR
  },
  header:{
    flex: .1,
    flexDirection:'row',
    justifyContent: 'center'
  },
  topWrap:{
    flex:.2,
    backgroundColor:MAIN_BG_COLOR,
    justifyContent: 'center',
  },
  botWrap:{
    flex:.8,
    backgroundColor: DRAWER_BG_COLOR,
    justifyContent: 'center',
  },

  itemWrap:{
    backgroundColor: DRAWER_BG_COLOR,
    borderStyle: 'solid',
    borderColor: '#000000',
    borderWidth: 10,
  },
  title:{
    color: MAIN_TEXT_COLOR,
    fontFamily:MAIN_FONT_FAMILY,
    fontSize: 30
  },
  h1:{
    color: MAIN_TEXT_COLOR,
    fontFamily:MAIN_FONT_FAMILY,
    fontSize: 20
  },
  text:{
    color: TEXT_SCHEME[4],
    textAlign: 'center',
    fontFamily:MAIN_FONT_FAMILY,
    fontSize: 20
  },
  logo:{
    resizeMode: 'contain',
    height: 30,
    width: 220,
    backgroundColor: 'transparent',
  },
})
