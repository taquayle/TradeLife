import { StyleSheet , BackHandler} from 'react-native'
import {  MAIN_BG_COLOR, DRAWER_BG_COLOR, MAIN_TEXT_COLOR,
          TEXT_SCHEME, MAIN_FONT_FAMILY, COLOR_SCHEME } from './Attributes'

export default StyleSheet.create({

  wrapper:{
    flex: 1,
    backgroundColor:MAIN_BG_COLOR
  },
  topWrap:{
    flex:.2,
    backgroundColor:MAIN_BG_COLOR,
  },
  botWrap:{
    flex:.8,
    backgroundColor: DRAWER_BG_COLOR,
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
  text:{
    color: TEXT_SCHEME[4],
    textAlign: 'center',
    fontFamily:MAIN_FONT_FAMILY,
    fontSize: 20
  }
})
